import {Avatar, AvatarImage} from "@/components/ui/avatar.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Github, Linkedin, MailIcon} from "lucide-react";

function AppHome() {
    return (
        <>
            <div className="p-4 md:p-8 md:px-10 bg-sidebar h-full flex flex-col items-center justify-center">
                <div className="space-y-8 flex flex-col items-center justify-center py-32">
                    <Avatar className="w-36 h-36">
                        <AvatarImage src={"src/assets/picture.jpg"} />
                    </Avatar>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight">Maksim Vasic</h1>
                    <p className="text-xl md:text-2xl leading-relaxed text-center">Building robust systems and industrial-grade software solutions.</p>
                </div>
                <div className="flex flex-col space-y-4 border-t w-full py-8">
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
                        <a href="https://rs.linkedin.com/in/maksim-vasi%C4%87-514b11327" target="_blank" rel="noreferrer">
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