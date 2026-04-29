import Navbar from "@/components/ui/Navbar"
import Sidebar from "@/components/ui/Sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {



  return (
    <div className="flex flex-col min-h-screen">
      {/* sidebar will go here later */}
      
      <Navbar></Navbar>

      <div className="flex flex-1">
        <Sidebar></Sidebar>
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
        
    </div>
  )
}