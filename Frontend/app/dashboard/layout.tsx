import type React from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { SidebarProvider, useSidebarState } from "@/hooks/use-sidebar-state"

function DashboardContent({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebarState()

  return (
    <div className="flex min-h-screen dashboard-layout">
      <DashboardSidebar />
      <div
        className={`flex-1 p-8 pt-6 overflow-auto transition-all duration-300 ${
          isCollapsed ? "ml-[80px]" : "ml-[280px]"
        }`}
      >
        {children}
      </div>
    </div>
  )
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <DashboardContent>{children}</DashboardContent>
    </SidebarProvider>
  )
}
