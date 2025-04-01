"use client"

import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Home,
  Package,
  Truck,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  BarChart3,
  ClipboardList,
  ChevronLeft,
  ChevronRight,
  Store,
  Factory,
} from "lucide-react"
import { useState, useEffect } from "react"
import { Logo } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"

export default function DashboardSidebar() {
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  // Extract role from user or pathname
  const pathParts = pathname.split("/")
  const role = user?.role?.toLowerCase() || (pathParts.length > 2 ? pathParts[2] : "admin")

  // Save sidebar state in localStorage
  useEffect(() => {
    const savedState = localStorage.getItem("sidebarCollapsed")
    if (savedState) {
      setIsCollapsed(savedState === "true")
    }
  }, [])

  const toggleSidebar = () => {
    const newState = !isCollapsed
    setIsCollapsed(newState)
    localStorage.setItem("sidebarCollapsed", String(newState))
  }

  const navItems = [
    {
      title: "Dashboard",
      href: `/dashboard/${role}`,
      icon: Home,
      roles: ["admin", "shop", "supplier", "driver"],
    },
    {
      title: "Inventory",
      href: `/dashboard/${role}/inventory`,
      icon: Package,
      roles: ["admin", "shop"],
    },
    {
      title: "Products",
      href: `/dashboard/${role}/products`,
      icon: ShoppingCart,
      roles: ["admin", "supplier"],
    },
    {
      title: "Orders",
      href: `/dashboard/${role}/orders`,
      icon: ClipboardList,
      roles: ["admin", "shop"],
    },
    {
      title: "Deliveries",
      href: `/dashboard/${role}/deliveries`,
      icon: Truck,
      roles: ["admin", "driver", "shop"],
    },
    {
      title: "Sales Analytics",
      href: `/dashboard/${role}/analytics`,
      icon: BarChart3,
      roles: ["admin"],
    },
    {
      title: "User Management",
      href: `/dashboard/${role}/users`,
      icon: Users,
      roles: ["admin"],
    },
    {
      title: "Shop Management",
      href: `/dashboard/${role}/shops`,
      icon: Store,
      roles: ["admin"],
    },
    {
      title: "Supplier Management",
      href: `/dashboard/${role}/suppliers`,
      icon: Factory,
      roles: ["admin"],
    },
    {
      title: "Settings",
      href: `/dashboard/${role}/settings`,
      icon: Settings,
      roles: ["admin", "shop", "supplier", "driver"],
    },
  ]

  const filteredNavItems = navItems.filter((item) => item.roles.includes(role))

  return (
    <>
      {/* Mobile header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b bg-white dark:bg-gray-900">
        <Logo />
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-50 bg-white dark:bg-gray-900 overflow-y-auto pb-20">
          <div className="p-4">
            <div className="flex flex-col space-y-2">
              {filteredNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    pathname === item.href
                      ? "bg-blue-500 text-white dark:bg-blue-600"
                      : "text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-800",
                  )}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  <span>{item.title}</span>
                </Link>
              ))}
            </div>
            <div className="mt-6 border-t pt-4 border-gray-200 dark:border-gray-800">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
                <p className="text-xs font-medium text-blue-600 dark:text-blue-400">{user?.role}</p>
              </div>
              <Button variant="outline" className="mt-4 w-full justify-start gap-2" onClick={logout}>
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop sidebar - with animation */}
      <div
        className={cn(
          "hidden md:block h-screen border-r border-blue-100 dark:border-gray-800 flex-shrink-0 bg-white dark:bg-gray-900 fixed z-30 transition-all duration-300 ease-in-out",
          isCollapsed ? "w-20" : "w-64",
        )}
      >
        <div className="flex h-full flex-col">
          <div
            className={cn(
              "p-6 flex items-center justify-between bg-gradient-to-r from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 transition-all duration-300",
              isCollapsed && "p-4 justify-center",
            )}
          >
            {!isCollapsed ? (
              <Logo />
            ) : (
              <div className="relative h-8 w-8">
                <Logo />
              </div>
            )}
            {!isCollapsed && <ThemeToggle />}
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid gap-1 px-2">
              {filteredNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    pathname === item.href
                      ? "bg-blue-500 text-white dark:bg-blue-600"
                      : "text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-800",
                    isCollapsed && "justify-center px-2",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {!isCollapsed && <span>{item.title}</span>}
                </Link>
              ))}
            </nav>
          </div>
          <div
            className={cn(
              "p-4 border-t border-blue-100 dark:border-gray-800 bg-gradient-to-r from-blue-50 to-white dark:from-gray-900 dark:to-gray-800",
              isCollapsed && "p-2",
            )}
          >
            {!isCollapsed ? (
              <>
                <div className="flex items-center gap-3 rounded-lg px-3 py-2">
                  <div className="flex-1 overflow-hidden">
                    <p className="text-sm font-medium leading-none">{user?.name || "User"}</p>
                    <p className="text-xs text-muted-foreground">{user?.email || "user@example.com"}</p>
                    <p className="mt-1 text-xs font-medium text-blue-600 dark:text-blue-400">{user?.role || "guest"}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="mt-2 w-full justify-start gap-2 border-blue-200 dark:border-gray-700"
                  onClick={logout}
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                size="icon"
                className="w-full h-10 border-blue-200 dark:border-gray-700"
                onClick={logout}
              >
                <LogOut className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Toggle button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="absolute -right-3 top-20 h-6 w-6 rounded-full border border-blue-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm"
        >
          {isCollapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
        </Button>
      </div>
    </>
  )
}

