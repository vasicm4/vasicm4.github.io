An AI agent halfway through a task often wants to try several things from the same point: three ways to fix a bug, eight ways to sort a dataset, a few candidate next steps in a search. It's easy to say "fork here" and hard to do cheaply. You can re-run everything from scratch for each branch. You can snapshot a whole VM, which the fastest systems publish at around 150–250 ms per branch. Or you can `fork()` the host process, which copies the page tables of everything that process holds.

I built [forkasm](https://github.com/vasicm4/forkasm), a Rust library that forks a **running WebAssembly sandbox**: its memory, globals, WASI state and filesystem. On my laptop a fork takes **99 µs** for a 64 MiB sandbox. Branches nest hundreds of levels deep, and a thousand live branches fit comfortably in one process. This post is about how it works, where the time went, and what it still can't do.

Here's the demo. A CPython 3.12 interpreter, compiled to WebAssembly, sets up a task (sort 20,000 records) and a checker. Then it forks into eight branches, one per approach, which run in parallel:

```
$ forkasm-cli demo guests/py/out/py.wasm guests/py/out/lib
loaded CPython guest in 132.09 ms
root interpreter + task set up in 189.60 ms
forked 8 branches: snapshot 640.0 µs, spawning all 1.16 ms (7.4 MiB of memory each)

ran all branches in parallel in 334.90 ms

approach                                   time  verdict
builtin sorted                         59.36 ms  correct
list.sort on a copy                    55.77 ms  correct
heapq                                 108.16 ms  correct
merge sort                            334.19 ms  correct
bucket by key, then sort               74.83 ms  correct
cmp_to_key                            320.08 ms  correct
sort by first key only (wrong)                –  wrong answer
typo (raises)                                 –  NameError: name 'sortd' is not defined. Did you mean: 'sorted'?

winner: list.sort on a copy (55.77 ms); the other branches are gone
```

Forking the whole interpreter eight ways takes under 2 ms. The fastest correct branch keeps running; the other seven are dropped and their memory is freed.

## What "fork" means here

The rule that makes this tractable: **a sandbox can only be forked between top-level calls into the guest.** At that point no WebAssembly frames are on the stack, so there's no native stack or register state to capture. A sandbox's entire state is then four things:

1. one linear memory,
2. the mutable globals (including `__stack_pointer`),
3. the WASI state: fd table, args, environment, clock, RNG,
4. a filesystem.

forkasm owns all four. Guests expose their work as exports (`init`, `step`, `py_exec`, …), and the host calls them one at a time, forking whenever it likes in between.

Two of the four need help from a load-time rewrite of the module. Mutable globals aren't visible from the host unless they're exported, so the rewrite exports every one of them. And it strips the module's *data segments* and its `start` function. Wasmtime applies data segments to memory itself, right after the memory is created. If they stayed in the module, every spawned child would have its restored memory overwritten by the module's initial data, and `start` would rerun on every spawn. Instead the data goes into a base image built once at load time, and `start` runs only for the root sandbox.

## Memory: a stack of copy-on-write layers

The obvious implementation is to copy the whole memory on snapshot and copy it back on spawn. For 64 MiB that's **75 ms** per fork, and that copying strategy (S0 in the code) is kept around only as the test oracle.

The idea forkasm builds on comes from [Faasm](https://www.usenix.org/conference/atc20/presentation/shillaker)'s Proto-Faaslets: restore WebAssembly memory with copy-on-write `mmap` instead of copying it. Wasmtime lets the embedder supply its own linear memory implementation, so forkasm reserves the address range itself and composes each memory out of immutable **layers**:

```
 snapshot tree                a child's memory: one mmap per segment
 ─────────────                ──────────────────────────────────────
  L0  base image              page:   0    1    2    3    4    5
   │                                ┌────┬────┬────┬────┬────┬────┐
  L1  pages 1, 4              from: │ L0 │ L1 │ L0 │ L0 │ L2 │ L0 │
   │                                └────┴────┴────┴────┴────┴────┘
  L2  page 4                  each page comes from the newest layer
                              holding it; writes go to private pages
```

- **A layer** is a set of pages stored in a `memfd`, immutable once written, and reference-counted along the snapshot tree.
- **A snapshot** finds the pages written since the previous snapshot and copies just those into a new layer.
- **A spawn** maps each segment of the child's memory `MAP_PRIVATE` from the newest layer holding that page. The mapping plan is computed once per snapshot and shared by all its children.
- **A child's writes** hit the kernel's copy-on-write path and land on private anonymous pages, so siblings never see each other's changes.

Snapshot cost is proportional to the pages dirtied since the last snapshot, and spawn cost to the number of mapped segments. Neither depends on memory size: at 1 GiB, a spawn still takes 54 µs.

## Finding the dirty pages

Everything hinges on answering "which pages did the guest write since the last snapshot?" quickly. The `MAP_PRIVATE` setup gives a nice signal for free: a page that was only read is still backed by the layer file, while a page that was written has been replaced by a private anonymous copy. `/proc/self/pagemap` exposes that difference as a per-page "file-backed" bit.

I went through three ways of reading it:

1. **Read `/proc/self/pagemap` directly** and look at the bit for every page. It works, but walking all 16,384 entries of a 64 MiB memory costs real time.
2. **The `PAGEMAP_SCAN` ioctl** (Linux 6.7+), which does the filtering in the kernel and returns only the matching runs of pages.
3. **userfaultfd asynchronous write-protect.** Register the memory with `UFFD_FEATURE_WP_ASYNC`, and the kernel tracks writes itself. `PAGEMAP_SCAN` with `PM_SCAN_WP_MATCHING` then reports the pages *written since the last scan* and re-protects them atomically. The big win is that the parent no longer has to be remapped onto the new layer after each snapshot. It just keeps its private pages.

The third needs userfaultfd, which many distributions restrict for unprivileged processes. forkasm uses `UFFD_USER_MODE_ONLY`, which is allowed without privileges, and falls back to the slower scans when even that isn't available.

## Where the time actually went

The first working version forked in about 225 µs. I instrumented the snapshot path to see why:

| phase | time |
|---|---|
| dirty scan (`PAGEMAP_SCAN`) | ~14 µs |
| `memfd_create` + `ftruncate` | ~4 µs |
| **allocate 128 shmem pages for the layer** | **~130 µs** |
| copy 512 KiB of dirty pages | ~40 µs |
| remap the parent onto the new layer | ~37 µs |
| spawn | ~31 µs |

Scanning and copying weren't the problem. Over half the time went to the kernel allocating shmem pages for the new layer, at about 1 µs per page. Two changes fixed most of it:

- **A layer pool.** A background thread keeps a few `memfd` slabs allocated and pre-faulted. A snapshot carves its layer out of the current slab with a bump pointer and copies the dirty pages in, packed together; `mmap` doesn't care that a page's file offset differs from its memory offset.
- **Async write-protect tracking**, which removed the parent remap (point 3 above).

Each helps on its own, and together they bring the fork from 255 µs to 99 µs:

| configuration (64 MiB, 128 dirty pages) | median fork |
|---|---|
| pagemap read | 308 µs |
| `PAGEMAP_SCAN` | 255 µs |
| `PAGEMAP_SCAN` + layer pool | 128 µs |
| write-protect | 237 µs |
| **write-protect + layer pool (default)** | **99 µs** |

Two bugs from that work are worth sharing:

- **`MAP_POPULATE` on a background thread stalls everyone.** The first pool pre-faulted its slabs with `MAP_POPULATE`, which holds the process-wide `mmap_lock` for the whole 16 MiB. Every spawn running at the same time needs that lock for its own `mmap` calls, so the p99 fork went to **6.3 ms**. Touching one byte per page from the worker thread instead uses per-VMA-locked page faults, and the p99 dropped to 162 µs.
- **A layer must stay alive while anything maps it.** When a layer is dropped, the pool hole-punches its range of the slab. But a child that still maps that range `MAP_PRIVATE`, and hasn't copied the pages yet, then silently reads zeros. Every mapping now pins the layers it maps.

## Deep trees and the VMA problem

Each mapped segment is a VMA in the kernel, and `vm.max_map_count` caps VMAs for the *whole process*, not per sandbox. A long chain of snapshots with scattered writes produces more and more small segments. In an adversarial benchmark (256 levels of fork-of-fork, each writing 64 random pages across 64 MiB), a child at the bottom needs **14,023 mappings** and takes 37 ms to spawn. Hit the cap and every `mmap` in the process fails, including the allocator's and Wasmtime's.

So snapshots get compacted. When a new snapshot would exceed 32 layers or 512 segments, its newest layers are merged into one. The merging is tiered, LSM-style: merge the fewest newest layers such that the layer below is at least twice the size of the merged result. Layer sizes then grow geometrically towards the bottom of the stack, and each page is copied O(log n) times over a long chain instead of on every merge. The merged stack must also land within half of both thresholds, so the next merge is a while away; without that hysteresis, merges kept stopping just under the limit.

With the defaults, the same adversarial chain ends at 131 mappings per child and spawns in under 1 ms. The cost is visible too: on random writes every merge covers nearly the whole memory, so the p99 snapshot is a full 64 MiB copy of about 70 ms. Real programs cluster their writes much better. A CPython chain of 300 small statements snapshots in 63 µs and spawns in 367 µs with the same defaults.

## Everything else forks too

Memory is the hard part, but a fork has to capture the rest of the state:

- **WASI is implemented in the crate** rather than using Wasmtime's WASI, so every piece of state is plain data that can be cloned. The clock is virtual and the RNG is seeded per branch, so the same path through the tree replays identically.
- **The filesystem is a persistent copy-on-write tree:** `imbl` B-tree maps for inodes and directories, and files stored as shared 64 KiB chunks. Forking clones the root pointer in O(1), and writing one byte copies one chunk. Host directories, such as CPython's standard library, are mounted read-only and shared by every branch.
- **Captured stdout and stderr** are append-only logs of shared chunks, so a sandbox that printed a lot doesn't make every fork copy everything it printed.

## Testing it against the slow version

The full-copy strategy is slow, but it's obviously correct, which makes it a good oracle. A property test generates random sequences of operations: guest work, host writes, file operations, snapshots, compactions, spawns, fork-of-fork chains, and drops. It runs each sequence on two sandbox trees side by side, one copying and one layered, and after every step checks that memory, globals, output, RNG, clock and filesystem are identical. 10,000 cases pass, with trees reaching depth 134. Separate tests check that dropping everything returns memfds, VMAs and shared memory exactly to their baseline.

## The numbers

![Fork latency by strategy](blog/forkasm/strategies.svg)

| 64 MiB sandbox, 128 pages dirty | fork (snapshot + spawn) |
|---|---|
| **forkasm, default** | **99 µs** (p99 162 µs) |
| forkasm, lazy userfaultfd (S2) | 74 µs, then ~12 µs per first touch |
| process `fork()` of the host | 627 µs |
| copying all memory | 74.7 ms |
| VM branching (published figures, other hardware) | ~150–250 ms |

- **Fork time scales with what was written, not with memory size.** With 1 dirty page a fork takes 47 µs; at 10% dirty, 876 µs.
- **Idle branches are nearly free:** under 1 KiB of user memory (PSS) and 8 VMAs each. A thousand live children that each wrote 16 pages cost 68 KiB apiece. Kernel memory such as page tables isn't counted in PSS, so add a few KiB per child for that.
- **End to end,** a beam search over CPython (branching 8, keep 4, depth 6, 168 branches in total) runs in 133 ms on 16 threads, and forking is 1–4% of that time.

![Fork latency vs memory size](blog/forkasm/size.svg)

One honest comparison point: at 1 GiB with 0.78% of pages dirty, each snapshot copies 8 MiB and forkasm roughly ties process `fork()`. It wins whenever the dirty set is small in absolute terms, which is the common case for a program taking one step at a time.

## What it doesn't do

- **I set a target of under 50 µs and missed it by about 2×.** Spawning alone costs 35–40 µs: instantiating the module, a few `mmap` calls, and restoring globals. That's the floor right now.
- **Only WebAssembly.** Workloads must compile to `wasm32-wasip1`: no arbitrary Linux binaries, no threads, no sockets.
- **Linux on x86-64 only,** and the fast path needs kernel 6.7 or later.
- **No merging branches back together**, and no security hardening beyond WebAssembly's own isolation.
- **Python's `random` module keeps its state across forks**, just like with `os.fork`. Branches have to reseed it, and `random.seed()` then reads the per-branch RNG.

The lazy strategy (S2) is an interesting near-miss. It maps nothing at spawn and fills each page on first touch through a userfaultfd handler thread. That makes the fork 25 µs faster, but every first touch then costs ~12 µs instead of a ~3.4 µs copy-on-write fault, so it only wins for children that touch almost nothing.

## Try it

```sh
git clone https://github.com/vasicm4/forkasm && cd forkasm
rustup target add wasm32-wasip1
cargo test --release
guests/py/build.sh      # downloads wasi-sdk 20 and a prebuilt libpython
cargo run --release -p forkasm-cli -- demo guests/py/out/py.wasm guests/py/out/lib
```

The [repository](https://github.com/vasicm4/forkasm) has the full benchmark tables and the design notes, including the dead ends. It's dual-licensed MIT / Apache-2.0. If you're working on agent sandboxes, tree search, or anything else that wants cheap branching, I'd love to hear what you'd use it for, and what's missing.
