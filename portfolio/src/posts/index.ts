import forkasm from "./forkasm.md?raw";
import usageWarehouse from "./usage-warehouse.md?raw";
import kwsAccent from "./kws-accent-robustness.md?raw";

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
        slug: "usage-warehouse",
        title: "I ran my data warehouse design doc until it broke",
        summary:
            "A warehouse for Trino and Iceberg table usage, tested by extracting the SQL straight from the design doc and running it: against a Python reference, on real Trino over S3, and with 10M synthetic queries. Fourteen things broke.",
        date: "2026-11-11",
        tags: ["Trino", "Iceberg", "Data engineering"],
        body: usageWarehouse,
    },
    {
        slug: "forkasm",
        title: "Forking a running WebAssembly sandbox in 100 µs",
        summary:
            "How forkasm branches a live sandbox, a CPython interpreter included, using copy-on-write layers, userfaultfd write-protect and a lot of measuring. Plus what it still can't do.",
        date: "2026-11-08",
        tags: ["Rust", "WebAssembly", "Linux"],
        body: forkasm,
    },
    {
        slug: "kws-accent-robustness",
        title: "Does a keyword spotter understand a Serbian accent?",
        summary:
            "A 99k-parameter CNN trained on Speech Commands, tested on 19 Serbian-accented speakers I recorded. The accuracy gap is small and uncertain, the errors change kind, augmentation doesn't help, and 50 clips of fine-tuning do.",
        date: "2026-10-13",
        tags: ["PyTorch", "Speech", "Machine learning"],
        body: kwsAccent,
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
