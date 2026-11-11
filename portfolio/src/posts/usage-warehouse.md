I recently designed a small "meta" data warehouse. The setting: a company keeps its data as Apache Iceberg tables on S3 and queries them through Trino, and wants to know how those tables are used. How many distinct users queried table X last month? How much compute did team Y burn? And not just once: the answers should be kept as history, so you can watch usage change.

The deliverable was a design document: tables, SQL to fill them, example queries, and the reasoning behind it all. The usual way to write one is to think hard, write SQL that looks right, and hope a reviewer catches the rest. I wanted to know whether mine actually worked. So I made the document executable: every SQL block and the Python runner are pulled out of the Markdown file verbatim and run, first against a hand-built scenario, then on a real Trino with Iceberg on S3, and finally with 1M and 10M synthetic queries.

It broke fourteen times. This post is about the design, how I tested it, and what each failure taught me.

## The design in one screen

Trino already knows who read what. Every finished query emits a `QueryCompletedEvent` with the user, CPU time, memory, the tables it read (with the bytes read from each) and the table it wrote. An event listener ships those events into a raw Iceberg table, and a daily job turns them into a small star schema:

```
 dim_team ◄── dim_user  (SCD2: user → team, valid_from .. valid_to)
                 ▲
                 │ user + query date
 fct_query  ◄─────── fct_query_table_access
 (one row per query)  (one row per query × table × read/write)
     │
     ▼
 agg_user_usage_daily  (one row per day × user)
```

- **`fct_query`** carries the resource metrics: CPU, memory × time, bytes scanned and written, time spent queued.
- **The bridge, `fct_query_table_access`**, has one row per query and table. A query that joins three tables counts towards all three, and its CPU is split between them in proportion to the bytes read from each, so per-table numbers add up to the query total.
- **`dim_user`** is a slowly changing dimension built from daily snapshots of the company directory, so each query is charged to the team its user belonged to *that day*.
- **One aggregate**, per user per day, makes team questions cheap. It only holds counts and sums, so any period is a plain `SUM`, and distinct users stay exact.

Both questions are then short queries:

```sql
-- How many distinct users read a table in a period?
SELECT count(DISTINCT user_name)
FROM iceberg.meta.fct_query_table_access
WHERE table_id = 'iceberg.events.ide_actions' AND access_type = 'read'
  AND query_date BETWEEN DATE '2026-11-01' AND DATE '2026-11-07';

-- How much did a team consume?
SELECT sum(u.query_count) AS queries, round(sum(u.cpu_ms) / 3.6e6, 1) AS cpu_hours
FROM iceberg.meta.agg_user_usage_daily u
JOIN iceberg.meta.dim_team t ON t.team_id = u.team_id
WHERE t.team_name = 'product-analytics'
  AND u.usage_date BETWEEN DATE '2026-11-01' AND DATE '2026-11-07';
```

That much was in the first draft. The hard part turned out to be everything around it: late events, duplicate deliveries, people changing teams, reruns, and what all of it costs on Iceberg.

## Making a design doc executable

The test harness reads the design document and pulls out its code blocks. Every SQL file in the doc starts with a comment naming it, so extraction is a single regex:

```python
SQL_FILES = {m.group(1): b for b in blocks(SOLUTION)
             if (m := re.match(r"-- sql/(\S+)\n", b))}
```

The doc's Python runner gets executed too. It imports `trino` and connects to a host that doesn't exist on my laptop, so the harness first installs a fake `trino` module whose cursor forwards each statement to whichever engine is under test:

```python
trino = types.ModuleType("trino")
trino.dbapi = types.SimpleNamespace(connect=lambda **_: types.SimpleNamespace(cursor=Cursor))
sys.modules["trino"] = trino
exec(compile(RUNNER_SRC, "run_meta_dwh.py", "exec"), runner.__dict__)
```

On top of that sit three levels of tests:

1. **A 15-query scenario** in which every query is an edge case: a self-join, a duplicate delivery, an `INSERT … VALUES` that reads nothing, a user missing from the directory, a team move, a query that ends at 23:59 and arrives at 00:00, events three and five days late. The resulting tables are compared, row by row, with an independent Python implementation of the same rules. The suite runs on DuckDB in seconds, with the SQL translated by [sqlglot](https://github.com/tobymao/sqlglot), and on real Trino in about 25 seconds.
2. **Assumption tests** break one operational assumption at a time: an outage, a corrupt directory snapshot, a duplicate that isn't identical.
3. **Scale tests** run Trino 484 in Docker, with Iceberg tables in MinIO and the Iceberg catalog in Postgres. A generator inside Trino produces 33k queries a day from 2,000 users: 40 service accounts doing 40% of the work, 500 tables with skewed popularity, failures, duplicates, deliveries up to six days late, people changing teams, and users who appear in the directory weeks after they start querying. All the randomness comes from hashing the query key, so every run is reproducible.

DuckDB made iterating fast. Real Trino caught what DuckDB couldn't, and scale caught what neither of them could.

## What broke

### The hand-built scenario

**Late events vanished.** The first version re-processed a fixed three-day lookback and assumed nothing older could change. A query that ended on October 30 but arrived on November 4 was loaded into the raw table and then ignored, because the downstream tables only refreshed days inside the window. The fix changes how a run thinks about time. It selects raw events by *ingestion* date, asks which *query* days those events belong to, and refreshes exactly those days, however old they are:

```sql
SELECT DISTINCT CAST(end_time AT TIME ZONE 'UTC' AS date)
FROM iceberg.meta_raw.trino_query_completed
WHERE event_date >= DATE '{start}' AND event_date < DATE '{end}'
```

The runner passes the answer to every step as a list of date literals. Literal dates have a bonus: Trino prunes partitions with them when it plans a query. The same filter written as a subquery got no planning-time pruning at all, which `EXPLAIN (TYPE IO)` shows directly.

**Rerunning an old day corrupted the team history.** `dim_user` was maintained the classic way: when someone changes team, close their current row and open a new one. Rerun an earlier day after a later one (clearing an Airflow task, say, or a backfill) and the patch is applied backwards. One test user ended up with a period that ended before it started, plus two overlapping ones. I replaced the patching with a rebuild from the full snapshot history on every run, using gaps-and-islands. A few thousand users times a year of snapshots is nothing for Trino, and a table that is derived from scratch can't drift.

**New users stayed `unknown` forever.** Queries a user ran before they first appeared in the directory had no team to map to. The fix is a policy choice, now written down: a user's first known team also applies before it.

### Reading Trino's source

**Memory was off by 1000×.** The event's `cumulativeMemory` has no documented unit, and I had assumed byte-seconds. Trino's `TaskContext` accumulates `averageUserMemory * sinceLastPeriodMillis`, so it is byte-milliseconds, and every memory figure in the warehouse was a thousand times too high.

### Real Trino and Iceberg

**Every rerun rewrote everything.** The fact loads were `MERGE … WHEN MATCHED THEN UPDATE`, re-processing three days of events on each run. That's correct and idempotent, and Iceberg's snapshot metadata showed what it costs: in the 13-row scenario, the test runs rewrote 54 rows and left 23 delete files behind. Duplicate deliveries of a Trino event are identical, so the loads became insert-only, and rerunning a day that is already loaded writes no fact rows at all.

**Timestamps quietly changed type.** The DDL declared `timestamp(3) with time zone`. Iceberg only stores microseconds, so Trino created the columns as `timestamp(6)` without a word. Harmless here, but the DDL in the doc should say what the table really is, so it does now.

### One million queries

The first scale run passed every check. It also showed that one of my favourite parts of the design was dead weight.

**The table aggregate didn't pay for itself.** I had an aggregate at day × table × user, so that distinct users per table would be exact and cheap. At 1M queries a month it held 70% as many rows as the bridge it summarised: most users touch a given table once or twice a day, so there was little to collapse. Before compaction it took four times the bridge's storage, it was the slowest step of every load, and once both were compacted it was no faster to query. I dropped it. Table questions now read the bridge directly, in 0.08 s for the busiest table over 30 days.

**Nine days rewritten on every run.** A handful of very late events meant a typical run touched about nine query days, and the aggregate's `MERGE` rewrote all of them. After 37 daily runs the warehouse held 347 MiB in 551 data files and 122 delete files. Updating only the aggregate rows that actually changed, and compacting just the partitions each run touched, brought that down to 97 MiB, 67 files and no delete files. The daily run got faster, too.

![Storage after 37 daily runs](blog/meta-dwh/storage.svg)

### Breaking assumptions on purpose

**An outage longer than the window lost data silently.** If the job fails four days in a row, the next run's three-day window starts after the first day's events. No check noticed, because the checks only looked inside the window. A `load_log` table now records every successful load, and each run starts where the last successful one ended.

**A duplicate that wasn't identical.** With insert-only loads, a re-delivery carrying different numbers is either kept or ignored, depending on which run sees it first, so the daily runs and a backfill disagree. Trino emits one event per query, so this "can't happen", which is exactly why it gets a check: any re-delivery that differs from the loaded row fails the run.

**A broken directory snapshot was caught too late.** A user listed in two teams was detected, but only after that day's facts had been loaded against the broken dimension. The dimension check now runs before any fact is written.

### When snapshots arrive like they would in production

**A crash that only appeared once the test got more realistic.** In the earlier scale runs, every directory snapshot existed from the start. When I made them arrive one day at a time, a daily run died with `MERGE_TARGET_ROW_MULTIPLE_MATCHES`. A user who appeared in the directory late had queries from one day loaded in different runs: the early ones as `unknown`, a late-arriving one with the new team. The aggregate is keyed by day and user, so it received two source rows for one target row.

The fix re-maps the team of every query on the affected days, not just the new ones. I also took the team off the bridge entirely. Only one example query used it, and every copy of a value that can change is one more place for it to go stale.

What's left is small and fixable: 748 queries, 0.09% of CPU, were still `unknown` after the daily runs, because their users appeared more than a window later. A weekly run over the last 45 days fixes all of them in 19 seconds.

### Ten million queries

**One big backfill ran out of memory.** Deduplicating 290 days of events with `row_number()` in a single window needed more than Trino's 2.4 GB per-node limit. The runner now splits any window longer than 31 days into chunks, which also covers catching up after a long outage.

**Target tables were planned as full scans.** `EXPLAIN (TYPE IO)` showed that a `MERGE` into a day-partitioned table had no constraint on the target side, so Trino planned to scan the entire fact history on every run. At runtime its dynamic filtering hid most of that cost, but repeating the affected days on the target side of `ON` still saved half a second per run on a 10M-row history.

### The test harness broke too

Not every failure was the design's fault. Trino's container was killed by the kernel, because the JVM had sized its heap at 80% of the *host's* memory. The data generator ran out of memory writing 300 date partitions in one `INSERT`. And comparing an 18M-row bridge with `EXCEPT` exceeded memory as well, so the check that daily runs equal a backfill now compares order-independent `checksum()` fingerprints per day.

## Where it ended up

| | 1M queries | 10M queries |
|---|---|---|
| Daily run, median | 7.3 s | 7.5 s |
| Backfill of the whole period | 22 s | 198 s |
| Daily runs equal one backfill | yes | yes, on all 301 days |
| Example queries | 0.08–0.13 s | 0.05–0.09 s |

A daily run's cost follows the day's load, not the size of the history: ten times the data adds 0.2 s. Most of the time goes to the bridge's `MERGE`, compaction and loading `fct_query`. The data quality checks cost about a second, which I'm happy to pay.

![Where a daily run's time goes](blog/meta-dwh/run-time.svg)

To check that the tests themselves are worth something, I put six of the fixed bugs back, one at a time. Every one of them made a test fail.

## What this doesn't show

- **It's one Trino node** in a 10 GB container with local MinIO. The trends are real, but the absolute timings, and the memory limit behind the 31-day chunks, are not production numbers.
- **The traffic is synthetic.** Real dashboards refreshing the same tables all day would collapse much better, and might bring the table aggregate back.
- **DuckDB runs translated SQL**, so anything Trino-specific is only covered by the Trino runs.
- **The event listener and the ingestion job are assumed**, not built, and nothing tests concurrent writers.

## What I'd do again

- **Make the document executable.** The SQL in a design doc is code. Extracting it verbatim means the doc can't drift from what was tested.
- **Compare against an independent reference.** A few hundred lines of plain Python that compute the same tables caught bugs that "the query runs" never would.
- **Make the test environment realistic in the boring ways.** The worst bug only appeared once directory snapshots arrived one day at a time, the way they would in production.
- **Break assumptions on purpose.** Two of the fixes guard against things that "can't happen". Those are exactly the ones nobody checks.
- **Measure before you materialise.** The aggregate I liked most was the one the numbers removed.
