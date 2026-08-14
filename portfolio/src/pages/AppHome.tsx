import {Avatar, AvatarImage} from "@/components/ui/avatar.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Github, InfoIcon, Linkedin, MailIcon, PresentationIcon} from "lucide-react";
import {Link} from "react-router-dom";

function AppHome() {
    return (
        <>
            <div className="p-4 md:p-8 md:px-10 bg-sidebar h-full flex flex-col items-center justify-center">
                <div className="space-y-8 flex flex-col items-center justify-center py-16">
                    <Avatar className="w-36 h-36">
                        <AvatarImage src={"picture.jpg"} />
                    </Avatar>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight">Maksim Vasic</h1>
                    <p className="text-xl md:text-2xl leading-relaxed text-center">Building robust systems and industrial-grade software solutions.</p>
                    <div className="flex flex-row space-x-4 py-4">
                        <Link to={"/about"} className="flex rounded-xl items-center justify-center py-4 border-2 hover:bg-accent">
                            <div className="flex justify-center items-center px-6 gap-6 hover:">
                              <span className="flex justify-center">
                                <InfoIcon />
                              </span>
                                <span className="font-open-sans text-xl">About</span>
                            </div>
                        </Link>
                        <Link to={"/projects"} className="flex rounded-xl items-center justify-center py-4 border-2 hover:bg-accent">
                            <div className="flex justify-center items-center px-6 gap-6">
                              <span className="flex justify-center">
                                <PresentationIcon />
                              </span>
                                <span className="font-open-sans text-xl">Projects</span>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col space-y-4 border-t w-full py-16">
                    <p className="text-xl md:text-2xl leading-relaxed text-center">Stay in touch</p>
                    <div className="flex flex-row items-center justify-center space-x-4">
                        <a href="mailto:vasicmaksim4@gmail.com" target="_blank" rel="noreferrer">
                            <Button className="cursor-pointer font-open-sans">
                                <MailIcon className="w-36 h-36"/>
                                <h1>Email</h1>
                            </Button>
                        </a>
                        <a href="https://github.com/vasicm4" target="_blank" rel="noreferrer">
                            <Button className="cursor-pointer font-open-sans">
                                <Github className="w-36 h-36"/>
                                <h1>Github</h1>
                            </Button>
                        </a>
                        <a href="https://www.linkedin.com/in/maksim-vasi%C4%87-066762245/" target="_blank" rel="noreferrer">
                            <Button className="cursor-pointer font-open-sans">
                                <Linkedin className="w-36 h-36"/>
                                <h1>LinkedIn</h1>
                            </Button>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AppHome;