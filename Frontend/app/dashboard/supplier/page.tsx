"use client"

import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingCart, Truck, DollarSign, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SupplierDashboard() {
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-4">Supplier Dashboard</h1>
        <p>Welcome, {user?.name || "Supplier User"}!</p>
        <p>Your role is: {user?.role || "supplier"}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
            <Button variant="link" className="mt-2 h-auto p-0 text-xs" asChild>
              <Link href="/dashboard/supplier/products" className="flex items-center gap-1">
                View products <ArrowUpRight className="h-3 w-3" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">+1 from yesterday</p>
            <Button variant="link" className="mt-2 h-auto p-0 text-xs">
              <Link href="/dashboard/supplier/orders" className="flex items-center gap-1">
                View orders <ArrowUpRight className="h-3 w-3" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Revenue (Monthly)</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,450</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
            <Button variant="link" className="mt-2 h-auto p-0 text-xs">
              <Link href="/dashboard/supplier/revenue" className="flex items-center gap-1">
                View details <ArrowUpRight className="h-3 w-3" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest orders from shops</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* BACKEND INTEGRATION: Fetch and display recent orders */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Order #1234</p>
                  <p className="text-xs text-muted-foreground">Dairy Mart Shop</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">$450</p>
                  <p className="text-xs text-muted-foreground">Today</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Order #1233</p>
                  <p className="text-xs text-muted-foreground">Fresh Dairy Shop</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">$320</p>
                  <p className="text-xs text-muted-foreground">Yesterday</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Order #1232</p>
                  <p className="text-xs text-muted-foreground">Milk & More</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">$580</p>
                  <p className="text-xs text-muted-foreground">2 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
            <CardDescription>Your best-selling products this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* BACKEND INTEGRATION: Fetch and display top products */}
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-sm font-medium">Fresh Milk</span>
                  <span className="text-sm text-muted-foreground">42%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div className="h-full w-[42%] rounded-full bg-primary"></div>
                </div>
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-sm font-medium">Cheddar Cheese</span>
                  <span className="text-sm text-muted-foreground">28%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div className="h-full w-[28%] rounded-full bg-primary"></div>
                </div>
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-sm font-medium">Greek Yogurt</span>
                  <span className="text-sm text-muted-foreground">18%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div className="h-full w-[18%] rounded-full bg-primary"></div>
                </div>
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-sm font-medium">Butter</span>
                  <span className="text-sm text-muted-foreground">12%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div className="h-full w-[12%] rounded-full bg-primary"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

