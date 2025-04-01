"use client"

import type React from "react"
import { useAuth } from "@/contexts/auth-context"
import DashboardSidebar from "@/components/dashboard-sidebar"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user } = useAuth()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const router = useRouter()

  // Check if user is authenticated
  useEffect(() => {
    // BACKEND INTEGRATION: Redirect to login if not authenticated
    if (!user && typeof window !== "undefined") {
      router.push("/login")
    }
  }, [user, router])

  // Get sidebar state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem("sidebarCollapsed")
    if (savedState) {
      setIsCollapsed(savedState === "true")
    }

    // Listen for changes to sidebar state
    const handleStorageChange = () => {
      const currentState = localStorage.getItem("sidebarCollapsed")
      setIsCollapsed(currentState === "true")
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  // If user is not authenticated, show nothing until redirect happens
  if (!user) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <DashboardSidebar />
      <div
        className="flex-1 bg-background transition-all duration-300 ease-in-out"
        style={{ marginLeft: isCollapsed ? "5rem" : "16rem" }}
      >
        <main className="p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}

