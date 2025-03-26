"use client";

import { useAuth } from "@/contexts/auth-context";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
} from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";

export default function DashboardSidebar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (!user) return null;

  const role = user.role || "admin";

  const navItems = [
    {
      title: "Dashboard",
      href: `/dashboard/${role.toLowerCase()}`,
      icon: Home,
      roles: ["ADMIN", "SHOP", "SUPPLIER", "DRIVER"],
    },
    {
      title: "Stats",
      href: `/dashboard/${role.toLowerCase()}/products`,
      icon: ShoppingCart,
      roles: ["ADMIN"],
    },
    {
      title: "User Management",
      href: `/dashboard/${role.toLowerCase()}/users`,
      icon: Users,
      roles: ["ADMIN"],
    },
    {
      title: "Inventory",
      href: `/dashboard/${role.toLowerCase()}/inventory`,
      icon: Package,
      roles: ["ADMIN", "SHOP"],
    },
    {
      title: "Products",
      href: `/dashboard/${role.toLowerCase()}/products`,
      icon: ShoppingCart,
      roles: ["ADMIN"],
    },
    {
      title: "Drivers",
      href: `/dashboard/${role.toLowerCase()}/deliveries`,
      icon: Truck,
      roles: ["ADMIN", "DRIVER", "SHOP"],
    },
    {
      title: "Shops",
      href: `/dashboard/${role.toLowerCase()}/products`,
      icon: ShoppingCart,
      roles: ["ADMIN"],
    },
    {
      title: "Suppliers",
      href: `/dashboard/${role.toLowerCase()}/products`,
      icon: ShoppingCart,
      roles: ["ADMIN"],
    },
    {
      title: "Settings",
      href: `/dashboard/${role.toLowerCase()}/settings`,
      icon: Settings,
      roles: ["ADMIN", "SHOP", "SUPPLIER", "DRIVER"],
    },
  ];

  const filteredNavItems = navItems.filter((item) => item.roles.includes(role));

  return (
    <>
      <div className="md:hidden flex items-center justify-between p-4 border-b">
        <Logo />
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      <div
        className={cn(
          "fixed inset-0 z-50 bg-white dark:bg-gray-950 md:static md:block",
          isMobileMenuOpen ? "block" : "hidden"
        )}
      >
        <div className="flex h-full flex-col border-r">
          <div className="p-6 flex items-center justify-between">
            <Logo />
            <ThemeToggle className="hidden md:flex" />
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid gap-1 px-4">
              {filteredNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium",
                    pathname === item.href
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>
          <div className="mt-auto p-4 border-t">
            <div className="flex items-center gap-3 rounded-lg px-3 py-2">
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
                <p className="mt-1 text-xs font-medium capitalize">{role}</p>
              </div>
            </div>
            <Button
              variant="outline"
              className="mt-2 w-full justify-start gap-2"
              onClick={logout}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
