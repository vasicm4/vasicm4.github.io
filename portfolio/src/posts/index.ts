import forkasm from "./forkasm.md?raw";

export type Post = {
    slug: string;
    title: string;
    summary: string;
    /** ISO date, YYYY-MM-DD. */
    date: string;
    tags: string[];
    body: string;
};

// Newest first.
export const posts: Post[] = [
    {
        slug: "forkasm",
        title: "Forking a running WebAssembly sandbox in 100 µs",
        summary:
            "How forkasm branches a live sandbox, a CPython interpreter included, using copy-on-write layers, userfaultfd write-protect and a lot of measuring. Plus what it still can't do.",
        date: "2026-11-08",
        tags: ["Rust", "WebAssembly", "Linux"],
        body: forkasm,
    },
];

export function findPost(slug: string | undefined): Post | undefined {
    return posts.find((p) => p.slug === slug);
}

export function formatDate(date: string): string {
    return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
    });
}
