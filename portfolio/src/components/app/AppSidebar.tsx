import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import {HomeIcon, InfoIcon, PresentationIcon} from "lucide-react";
import {Link} from "react-router-dom";
import {Avatar, AvatarImage} from "@/components/ui/avatar.tsx";

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader className={"py-8 border-b"}>
                <div className={"flex items-center justify-center gap-4"}>
                    <Avatar size={"lg"}>
                        <AvatarImage src={"src/assets/picture.jpg"} />
                    </Avatar>
                    <div className={"flex flex-col justify-start items-start"}>
                        <h1 className={"font-open-sans text-center text-lg font-medium"}>Maksim Vasic</h1>
                        <h1 className={"font-open-sans text-center text-sm font-extralight"}>Software Developer</h1>
                    </div>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link to={"/home"}  className="flex w-full items-center justify-center py-8">
                                <div className="flex w-40 items-center gap-6">
                                      <span className="flex justify-center">
                                        <HomeIcon />
                                      </span>
                                    <span className="font-open-sans text-xl">Home</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link to={"/about"} className="flex w-full items-center justify-center py-8">
                                <div className="flex w-40 items-center gap-6">
                                      <span className="flex justify-center">
                                        <InfoIcon />
                                      </span>
                                    <span className="font-open-sans text-xl">About</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link to={"/projects"} className="flex w-full items-center justify-center py-8">
                                <div className="flex w-40 items-center gap-6">
                                      <span className="flex justify-center">
                                        <PresentationIcon />
                                      </span>
                                    <span className="font-open-sans text-xl">Projects</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <h1 className={"font-open-sans text-center text-sm"}>Maksim Vasic &copy; 2026</h1>
            </SidebarFooter>
        </Sidebar>
    )
}