"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Users,
  Truck,
  Store,
  Package,
  Settings,
  LogOut,
  Menu,
  X,
  Boxes,
  ShoppingCart,
  Moon,
  Sun,
} from "lucide-react"
import { useTheme } from "next-themes"

interface User {
  username: string
  role: string
  name: string
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [sidebarExpanded, setSidebarExpanded] = useState(true)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check if user is logged in
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    } else {
      router.push("/login")
    }
    setLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/login")
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!user) {
    return null
  }

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, roles: ["admin", "supplier", "shop", "driver"] },
    { name: "Users", href: "/dashboard/users", icon: Users, roles: ["admin"] },
    { name: "Inventory", href: "/dashboard/inventory", icon: Boxes, roles: ["admin", "supplier"] },
    { name: "Suppliers", href: "/dashboard/suppliers", icon: Package, roles: ["admin"] },
    { name: "Shops", href: "/dashboard/shops", icon: Store, roles: ["admin"] },
    { name: "Drivers", href: "/dashboard/drivers", icon: Truck, roles: ["admin"] },
    { name: "Orders", href: "/dashboard/orders", icon: ShoppingCart, roles: ["admin", "shop"] },
    { name: "Settings", href: "/dashboard/settings", icon: Settings, roles: ["admin", "supplier", "shop", "driver"] },
  ]

  const filteredNavigation = navigation.filter((item) => item.roles.includes(user.role))

  return (
    <div className="min-h-screen bg-blue-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-white dark:bg-gray-800 border-b dark:border-gray-700 p-4 flex justify-between items-center transition-colors duration-300">
        <div className="flex items-center">
          <Image src="/hayoma-logo.png" alt="Hayoma Dairy" width={40} height={40} className="mr-2" />
          <h1 className="font-bold text-lg text-blue-600 dark:text-blue-400">Hayoma Dairy</h1>
        </div>
        <div className="flex items-center gap-2">
          {mounted && (
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-gray-500 dark:text-gray-400">
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          )}
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile sidebar */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-20 bg-black/20 backdrop-blur-sm dark:bg-black/50"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-gray-800 p-4 pt-20 transition-all duration-300 ease-in-out transform"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-4">
              <div className="px-3 py-2">
                <div className="font-medium dark:text-white">{user.name}</div>
                <div className="text-sm text-blue-600 dark:text-blue-400 capitalize">{user.role}</div>
              </div>
              <nav className="space-y-1">
                {filteredNavigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                      pathname === item.href || (item.href !== "/dashboard" && pathname?.startsWith(item.href))
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
                        : "text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                ))}
              </nav>
              <div className="pt-4 mt-4 border-t dark:border-gray-700">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-600 dark:text-gray-300"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-3 h-5 w-5" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop sidebar - now on the right */}
      <div
        className={`hidden lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:flex-col transition-all duration-300 ease-in-out ${
          sidebarExpanded ? "lg:w-64" : "lg:w-20"
        }`}
      >
        <div className="flex min-h-0 flex-1 flex-col border-l bg-white dark:bg-gray-800 dark:border-gray-700 transition-colors duration-300">
          <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
            <div className="flex flex-shrink-0 items-center px-4">
              <div className="flex items-center">
                <Image src="/hayoma-logo.png" alt="Hayoma Dairy" width={40} height={40} className="flex-shrink-0" />
                <h1
                  className={`text-xl font-bold text-blue-600 dark:text-blue-400 ml-2 transition-opacity duration-200 ${sidebarExpanded ? "opacity-100" : "opacity-0 hidden"}`}
                >
                  Hayoma Dairy
                </h1>
              </div>
            </div>
            <div
              className={`mt-8 px-4 transition-opacity duration-200 ${sidebarExpanded ? "opacity-100" : "opacity-0"}`}
            >
              <div className="font-medium dark:text-white">{user.name}</div>
              <div className="text-sm text-blue-600 dark:text-blue-400 capitalize">{user.role}</div>
            </div>
            <nav className="mt-5 flex-1 space-y-1 px-2">
              {filteredNavigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                    pathname === item.href || (item.href !== "/dashboard" && pathname?.startsWith(item.href))
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
                      : "text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700"
                  }`}
                  title={!sidebarExpanded ? item.name : undefined}
                >
                  <item.icon
                    className={`h-5 w-5 flex-shrink-0 ${
                      pathname === item.href || (item.href !== "/dashboard" && pathname?.startsWith(item.href))
                        ? "text-blue-700 dark:text-blue-300"
                        : "text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-300"
                    }`}
                  />
                  <span
                    className={`ml-3 transition-opacity duration-200 ${sidebarExpanded ? "opacity-100" : "opacity-0 hidden"}`}
                  >
                    {item.name}
                  </span>
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex flex-shrink-0 border-t dark:border-gray-700 p-4">
            <div className="flex items-center w-full">
              {mounted && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="mr-2 text-gray-500 dark:text-gray-400"
                  onClick={toggleTheme}
                >
                  {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
              )}
              <Button
                variant="ghost"
                className={`text-gray-600 dark:text-gray-300 ${sidebarExpanded ? "w-full justify-start" : "w-full justify-center"}`}
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5 flex-shrink-0" />
                <span
                  className={`ml-2 transition-opacity duration-200 ${sidebarExpanded ? "opacity-100" : "opacity-0 hidden"}`}
                >
                  Logout
                </span>
              </Button>
            </div>
          </div>
          {/* Sidebar toggle button - now on the left side of the sidebar */}
          <button
            onClick={() => setSidebarExpanded(!sidebarExpanded)}
            className="absolute -right-3 top-10 bg-blue-100 dark:bg-gray-700 rounded-full p-1 border border-blue-200 dark:border-gray-600 transition-colors duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 text-blue-700 dark:text-blue-300 transition-transform duration-300 ${sidebarExpanded ? "rotate-0" : "rotate-180"}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main content - adjusted for right sidebar */}
      <div className={`lg:pl-64 pt-16 lg:pt-0 transition-all duration-300 ${!sidebarExpanded ? "lg:pl-20" : ""}`}>
        <main className="py-6 px-4 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  )
}

