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

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader className={"py-4 border-b"}>
                <div className={"flex items-center justify-center gap-4"}>
                    <img src={"src/assets/picture.jpg"} alt="My picture" className="w-8 h-8 rounded-full object-cover"/>
                    <div className={"flex flex-col justify-start items-start"}>
                        <h1 className={"font-open-sans text-center text-xl font-medium"}>Maksim Vasic</h1>
                        <h1 className={"font-open-sans text-center text-sm font-normal"}>Software Developer</h1>
                    </div>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <div className="flex w-full items-center justify-center py-8">
                                <div className="flex w-44 items-center gap-6">
                                      <span className="flex justify-center">
                                        <HomeIcon />
                                      </span>
                                    <span className="font-open-sans text-xl">Home</span>
                                </div>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <div className="flex w-full items-center justify-center py-8">
                                <div className="flex w-44 items-center gap-6">
                                      <span className="flex justify-center">
                                        <InfoIcon />
                                      </span>
                                    <span className="font-open-sans text-xl">About</span>
                                </div>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <div className="flex w-full items-center justify-center py-8">
                                <div className="flex w-44 items-center gap-6">
                                      <span className="flex justify-center">
                                        <PresentationIcon />
                                      </span>
                                    <span className="font-open-sans text-xl">Projects</span>
                                </div>
                            </div>
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