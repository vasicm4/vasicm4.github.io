import {Link} from "react-router-dom";
import {ArrowUpRight, Github, NotebookPen, Users} from "lucide-react";
import {Badge} from "@/components/ui/badge.tsx";
import {type Project, projects} from "@/data/projects.ts";

function TechList({tech}: {tech: string[]}) {
    return (
        <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
            {tech.map((t) => (
                <li key={t}><Badge variant="secondary" className="font-normal">{t}</Badge></li>
            ))}
        </ul>
    );
}

function ProjectLinks({project}: {project: Project}) {
    return (
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium">
            <a href={project.repo} target="_blank" rel="noreferrer"
               className="inline-flex items-center gap-1.5 hover:underline underline-offset-4">
                <Github className="size-4" /> Code
            </a>
            {project.post && (
                <Link to={project.post} className="inline-flex items-center gap-1.5 hover:underline underline-offset-4">
                    <NotebookPen className="size-4" /> Read the write-up
                </Link>
            )}
        </div>
    );
}

function FeaturedCard({project}: {project: Project}) {
    return (
        <article className="flex flex-col gap-4 rounded-xl border bg-card p-6 shadow-sm transition-colors hover:border-foreground/30">
            <div className="flex flex-col gap-1">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{project.period}</p>
                <h3 className="text-xl font-semibold leading-snug">
                    <a href={project.repo} target="_blank" rel="noreferrer" className="group inline-flex items-start gap-1 hover:underline underline-offset-4">
                        {project.name}
                        <ArrowUpRight className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                </h3>
            </div>
            <p className="leading-relaxed text-muted-foreground">{project.tagline}</p>
            <div className="mt-auto flex flex-col gap-4 pt-2">
                <TechList tech={project.tech} />
                <ProjectLinks project={project} />
            </div>
        </article>
    );
}

function ProjectRow({project}: {project: Project}) {
    return (
        <li className="grid gap-2 py-6 md:grid-cols-[9rem_1fr] md:gap-8">
            <p className="pt-1 text-sm text-muted-foreground tabular-nums">{project.period}</p>
            <div className="flex flex-col gap-3">
                <h4 className="flex flex-wrap items-center gap-x-3 gap-y-1 text-lg font-semibold">
                    <a href={project.repo} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-1 hover:underline underline-offset-4">
                        {project.name}
                        <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                    {project.team && (
                        <span className="inline-flex items-center gap-1 text-xs font-normal text-muted-foreground">
                            <Users className="size-3.5" /> Team project
                        </span>
                    )}
                </h4>
                <p className="max-w-prose leading-relaxed text-muted-foreground">{project.description ?? project.tagline}</p>
                <TechList tech={project.tech} />
            </div>
        </li>
    );
}

function AppProjects() {
    const featured = projects.filter((p) => p.featured);
    const rest = projects.filter((p) => !p.featured);
    const years = [...new Set(rest.map((p) => p.year))].sort((a, b) => b - a);

    return (
        <div className="min-h-screen bg-sidebar p-6 font-open-sans md:p-10">
            <div className="mx-auto max-w-5xl">
                <header className="flex flex-col gap-3 pb-10">
                    <h1 className="text-3xl font-bold md:text-4xl">Projects</h1>
                    <p className="max-w-prose text-lg leading-relaxed text-muted-foreground">
                        Systems, machine learning and data work, mostly built to understand how something works from the inside.
                        Everything here is open source on <a href="https://github.com/vasicm4" target="_blank" rel="noreferrer" className="font-medium text-foreground underline underline-offset-4">GitHub</a>.
                    </p>
                </header>

                <section aria-labelledby="featured-heading">
                    <h2 id="featured-heading" className="pb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Featured</h2>
                    <div className="grid gap-4 lg:grid-cols-3">
                        {featured.map((p) => <FeaturedCard key={p.repo} project={p} />)}
                    </div>
                </section>

                <section aria-labelledby="all-heading" className="pt-16">
                    <h2 id="all-heading" className="pb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">More projects</h2>
                    {years.map((year) => (
                        <div key={year} className="pt-6">
                            <h3 className="border-b pb-3 text-2xl font-bold">{year}</h3>
                            <ul className="divide-y">
                                {rest.filter((p) => p.year === year).map((p) => <ProjectRow key={p.repo} project={p} />)}
                            </ul>
                        </div>
                    ))}
                </section>
            </div>
        </div>
    );
}

export default AppProjects;
