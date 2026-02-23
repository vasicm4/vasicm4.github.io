import AppTimeline from "@/components/app/AppTimeline.tsx";


function AppAbout() {
    return (
        <>
            <div className="p-4 md:p-8 lg:p-10 bg-sidebar min-h-screen">
                <div className="w-full">
                    <h1 className="font-open-sans text-3xl md:text-4xl font-bold mb-8">About</h1>
                    <div className="flex flex-col xl:px-16 lg:flex-row items-center lg:items-center justify-start gap-10">
                        <div className="flex flex-col justify-start w-full lg:w-1/2 font-open-sans space-y-6 order-2 lg:order-1">
                            <p className="text-xl leading-relaxed text-center lg:text-left md:text-balance">
                                - Passionate about software development and systems design
                            </p>
                            <p className="text-xl leading-relaxed text-center lg:text-left md:text-balance">
                                - Eager to explore new ideas, concepts and technologies
                            </p>
                            <p className="text-xl leading-relaxed text-center lg:text-left md:text-balance">
                                - Blending teamwork, leadership and innovation in every project
                            </p>
                            <p className="text-xl leading-relaxed text-center lg:text-left md:text-balance">
                                - I enjoy turning challenges into opportunities for growth
                            </p>
                        </div>
                        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end order-1 lg:order-2">
                            <img className="w-full max-w-md lg:max-w-xl h-auto rounded-lg shadow-md object-cover" src="systems.jpg" alt="Systems design"/>
                        </div>
                    </div>
                    <div className="mt-16 border-t py-16">
                        <AppTimeline />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AppAbout;