import GithubLogo from "../icons/GithubLogo";

interface ProjectProps {
    title: string,
    description: string,
    link: string,
    image: React.ReactNode
    type: string,
}

function Project({title, description, link, image, type} : ProjectProps) {
    return (
        <div className={type}>
            <div className="border-b-2 p-4">
                <h1 className="subtitle">{title}</h1>
            </div>
            <div className="grid md:grid-cols-2 md:grid-rows-1 p-8">
                <div className="self-center justify-self-center">
                    {image}
                </div>
                <div className="">
                    <h1 className="font-semibold md:text-xl">
                        {description}
                    </h1>
                    <a href={link} className="flex justify-center space-x-4 p-4">
                        <GithubLogo/>
                        <h1 className="text-lg md:text-lg font-semibold font-mono text-gray-600 hover:text-black">Project</h1>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Project;
