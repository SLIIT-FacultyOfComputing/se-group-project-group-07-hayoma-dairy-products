"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { Logo } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  ShoppingCart,
  Package,
  Truck,
  Users,
  BarChart,
  Settings,
  LogOut,
  Calendar,
  ClipboardList,
  FileText,
  Boxes,
  Store,
  Factory,
} from "lucide-react"
import { useSidebarState } from "@/hooks/use-sidebar-state"

export function DashboardSidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const { isCollapsed, toggleSidebar } = useSidebarState()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  const adminNavItems = [
    {
      title: "Dashboard",
      href: "/dashboard/admin",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Orders",
      href: "/dashboard/admin/orders",
      icon: <ShoppingCart className="h-5 w-5" />,
    },
    {
      title: "Products",
      href: "/dashboard/admin/products",
      icon: <Package className="h-5 w-5" />,
    },
    {
      title: "Inventory",
      href: "/dashboard/admin/inventory",
      icon: <Boxes className="h-5 w-5" />,
    },
    {
      title: "Shops",
      href: "/dashboard/admin/shops",
      icon: <Store className="h-5 w-5" />,
    },
    {
      title: "Suppliers",
      href: "/dashboard/admin/suppliers",
      icon: <Factory className="h-5 w-5" />,
    },
    {
      title: "Deliveries",
      href: "/dashboard/admin/deliveries",
      icon: <Truck className="h-5 w-5" />,
    },
    {
      title: "Drivers",
      href: "/dashboard/admin/drivers",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Users",
      href: "/dashboard/admin/users",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Supply Requests",
      href: "/dashboard/admin/requests",
      icon: <ClipboardList className="h-5 w-5" />,
    },
    {
      title: "Analytics",
      href: "/dashboard/admin/analytics",
      icon: <BarChart className="h-5 w-5" />,
    },
    {
      title: "Settings",
      href: "/dashboard/admin/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  const shopNavItems = [
    {
      title: "Dashboard",
      href: "/dashboard/shop",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Orders",
      href: "/dashboard/shop/orders",
      icon: <ShoppingCart className="h-5 w-5" />,
    },
    {
      title: "Inventory",
      href: "/dashboard/shop/inventory",
      icon: <Package className="h-5 w-5" />,
    },
    {
      title: "Settings",
      href: "/dashboard/shop/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  const supplierNavItems = [
    {
      title: "Dashboard",
      href: "/dashboard/supplier",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Supply Requests",
      href: "/dashboard/supplier/requests",
      icon: <ClipboardList className="h-5 w-5" />,
    },
    {
      title: "Material Requests",
      href: "/dashboard/supplier/material-requests",
      icon: <ClipboardList className="h-5 w-5" />,
    },
    {
      title: "Supply History",
      href: "/dashboard/supplier/history",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: "Settings",
      href: "/dashboard/supplier/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  const driverNavItems = [
    {
      title: "Dashboard",
      href: "/dashboard/driver",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Deliveries",
      href: "/dashboard/driver/deliveries",
      icon: <Truck className="h-5 w-5" />,
    },
    {
      title: "My Schedule",
      href: "/dashboard/driver/schedule",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      title: "Settings",
      href: "/dashboard/driver/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  let navItems = []

  switch (user?.role) {
    case "admin":
      navItems = adminNavItems
      break
    case "shop":
      navItems = shopNavItems
      break
    case "supplier":
      navItems = supplierNavItems
      break
    case "driver":
      navItems = driverNavItems
      break
    default:
      navItems = adminNavItems
  }

  return (
    <motion.div
      initial={{ width: isCollapsed ? 80 : 280 }}
      animate={{ width: isCollapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn(
        "fixed top-0 left-0 z-30 h-screen flex flex-col border-r bg-white dark:bg-gray-950 dark:border-gray-800",
        isCollapsed ? "items-center" : "",
      )}
    >
      <div className={cn("flex h-16 items-center border-b px-4", isCollapsed ? "justify-center" : "justify-between")}>
        {!isCollapsed && <Logo />}
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="h-8 w-8 rounded-full">
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto py-2 no-scrollbar">
        <nav className="grid items-start px-2 gap-1">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                pathname === item.href
                  ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                  : "hover:bg-gray-50 dark:hover:bg-gray-800",
                isCollapsed ? "justify-center" : "",
              )}
            >
              {item.icon}
              {!isCollapsed && <span>{item.title}</span>}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mt-auto border-t p-4 flex flex-col gap-2">
        <div className={cn("flex", isCollapsed ? "justify-center" : "justify-start")}>
          <ThemeToggle />
        </div>
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start gap-3 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
            isCollapsed ? "justify-center" : "",
          )}
          onClick={logout}
        >
          <LogOut className="h-5 w-5" />
          {!isCollapsed && <span>Logout</span>}
        </Button>
      </div>
    </motion.div>
  )
}
