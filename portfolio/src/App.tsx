import './App.css'
import {SidebarProvider} from "@/components/ui/sidebar.tsx";
import {AppSidebar} from "@/components/app/AppSidebar.tsx";
import {Navigate, Route, Routes} from "react-router-dom";
import AppHome from "@/pages/AppHome.tsx";
import AppAbout from "@/pages/AppAbout.tsx";
import AppProjects from "@/pages/AppProjects.tsx";
import {ThemeProvider} from "@/components/providers/ThemeProvider.tsx";

function App() {
  return (
    <ThemeProvider defaultTheme={"dark"} storageKey={"vite-ui-theme"}>
        <SidebarProvider>
            <AppSidebar />
            <main>
                <Routes>
                    <Route path="/home" element={<AppHome />} />
                    <Route path="/about" element={<AppAbout />} />
                    <Route path="/projects" element={<AppProjects />} />
                    <Route path="*" element={<Navigate to="/home" replace />} />
                </Routes>
            </main>
        </SidebarProvider>
    </ThemeProvider>
  )
}

export default App;
