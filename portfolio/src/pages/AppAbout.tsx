import {Link} from "react-router-dom";
import Timeline from "@/components/app/AppTimeline.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {education, experience, programs, skills} from "@/data/about.ts";

function AppAbout() {
    return (
        <div className="min-h-screen bg-sidebar p-6 font-open-sans md:p-10">
            <div className="mx-auto max-w-5xl">
                <header className="grid items-center gap-10 lg:grid-cols-[1fr_22rem]">
                    <div className="flex flex-col gap-5">
                        <h1 className="text-3xl font-bold md:text-4xl">About</h1>
                        <p className="max-w-prose text-lg leading-relaxed">
                            I'm a Software Engineer at <span className="font-semibold">WolkAbout</span> in Novi Sad, where I work
                            with the R&amp;D team on agentic AI for industrial data. I'm also studying Software
                            Engineering at the Faculty of Technical Sciences, University of Novi Sad.
                        </p>
                        <p className="max-w-prose text-lg leading-relaxed text-muted-foreground">
                            I like building things from the ground up to see how they really work: a storage engine, a
                            WebAssembly sandbox that forks in microseconds, a GPT with hand-derived gradients. Lately I've been
                            focused on ML systems and zero-knowledge proofs.
                        </p>
                        <p className="text-muted-foreground">
                            See my <Link to="/projects" className="font-medium text-foreground underline underline-offset-4">projects</Link> or
                            read the <Link to="/blog" className="font-medium text-foreground underline underline-offset-4">blog</Link>.
                        </p>
                    </div>
                    <img className="mx-auto w-full max-w-sm rounded-xl object-cover shadow-md" src="systems.jpg" alt="" />
                </header>

                <Timeline title="Experience" entries={experience} />
                <Timeline title="Education" entries={education} />
                <Timeline title="Programs & schools" entries={programs} />

                <section aria-labelledby="skills-heading" className="pt-14 pb-10">
                    <h2 id="skills-heading" className="border-b pb-3 text-2xl font-bold">Skills</h2>
                    <dl className="divide-y">
                        {skills.map((group) => (
                            <div key={group.label} className="grid gap-3 py-5 md:grid-cols-[9rem_1fr] md:gap-8">
                                <dt className="pt-0.5 text-sm text-muted-foreground">{group.label}</dt>
                                <dd className="flex flex-wrap gap-1.5">
                                    {group.items.map((item) => (
                                        <Badge key={item} variant="secondary" className="font-normal">{item}</Badge>
                                    ))}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </section>
            </div>
        </div>
    );
}

export default AppAbout;
