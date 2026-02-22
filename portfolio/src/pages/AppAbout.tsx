import AppTimeline from "@/components/app/AppTimeline.tsx";


function AppAbout() {
    return (
        <>
            <div className="p-8 bg-sidebar">
                <div className="px-10">
                    <h1 className={"font-open-sans text-2xl font-bold"}>About</h1>
                    <div className="text-xl px-8 flex items-center justify-between">
                        <ul className="list-disc pl-8 mt-2 font-open-sans space-y-2">
                            <li className="text-2xl">Passionate about software development and systems design</li>
                            <li className="text-2xl">Eager to explore new ideas, concepts and technologies</li>
                            <li className="text-2xl">Blending teamwork, leadership and innovation in every project</li>
                            <li className="text-2xl">I enjoy turning challenges into opportunities for growth</li>
                        </ul>
                        <img className={"max-w-lg max-h-xl rounded-sm"} src={"src/assets/systems.jpg"}  alt={"Systems design"}/>
                    </div>
                </div>
                <div className="py-4">
                    <AppTimeline />
                </div>
            </div>
        </>
    )
}

export default AppAbout;