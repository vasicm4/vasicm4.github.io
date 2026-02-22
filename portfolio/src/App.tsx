import './App.css'
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar.tsx";
import {AppSidebar} from "@/components/app/AppSidebar.tsx";

function App() {
  return (
    <>
        <SidebarProvider>
            <AppSidebar />
            <main>
            </main>
        </SidebarProvider>
    </>
  )
}

export default App
