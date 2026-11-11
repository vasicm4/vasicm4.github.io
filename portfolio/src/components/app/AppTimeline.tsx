import {ArrowUpRight} from "lucide-react";
import type {Entry} from "@/data/about.ts";

function TimelineEntry({entry}: {entry: Entry}) {
    return (
        <li className="grid gap-2 py-6 md:grid-cols-[9rem_1fr] md:gap-8">
            <p className="pt-1 text-sm text-muted-foreground tabular-nums">{entry.period}</p>
            <div className="flex flex-col gap-2">
                <div>
                    <h3 className="text-lg font-semibold leading-snug">{entry.title}</h3>
                    <p className="text-foreground/80">
                        {entry.org}
                        {entry.place && <span className="text-muted-foreground"> · {entry.place}</span>}
                    </p>
                </div>
                {entry.note && <p className="text-sm text-muted-foreground">{entry.note}</p>}
                {entry.points && (
                    <ul className="flex max-w-prose list-disc flex-col gap-1.5 pl-5 pt-1 leading-relaxed text-muted-foreground marker:text-muted-foreground/60">
                        {entry.points.map((point) => <li key={point}>{point}</li>)}
                    </ul>
                )}
                {entry.link && (
                    <a href={entry.link.href} target="_blank" rel="noreferrer"
                       className="inline-flex w-fit items-center gap-1 text-sm font-medium hover:underline underline-offset-4">
                        {entry.link.label} <ArrowUpRight className="size-3.5" />
                    </a>
                )}
            </div>
        </li>
    );
}

function Timeline({title, entries}: {title: string; entries: Entry[]}) {
    const id = `${title.toLowerCase().replace(/\W+/g, "-")}-heading`;
    return (
        <section aria-labelledby={id} className="pt-14">
            <h2 id={id} className="border-b pb-3 text-2xl font-bold">{title}</h2>
            <ul className="divide-y">
                {entries.map((entry) => <TimelineEntry key={entry.title + entry.org} entry={entry} />)}
            </ul>
        </section>
    );
}

export default Timeline;
