"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Truck, MapPin, CheckCircle, Clock, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import Link from "next/link"

export default function DriverDashboard() {
  const { user } = useAuth()
  const [isActive, setIsActive] = useState(true)

  const handleStatusChange = (checked: boolean) => {
    // BACKEND INTEGRATION: Update driver status API call
    setIsActive(checked)
    toast.success(`Status updated to ${checked ? "Active" : "Inactive"}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Driver Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.name}</p>
        </div>
        <Card className="w-full sm:w-auto">
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center gap-2">
              <Label htmlFor="active-status">Active Status</Label>
              <Switch id="active-status" checked={isActive} onCheckedChange={handleStatusChange} />
            </div>
            <div
              className={`ml-2 rounded-full px-2 py-1 text-xs ${
                isActive
                  ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                  : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
              }`}
            >
              {isActive ? "Active" : "Inactive"}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Today's Deliveries</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">2 completed, 2 pending</p>
            <Button variant="link" className="mt-2 h-auto p-0 text-xs" asChild>
              <Link href="/dashboard/driver/deliveries" className="flex items-center gap-1">
                View deliveries <ArrowUpRight className="h-3 w-3" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Distance</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42 km</div>
            <p className="text-xs text-muted-foreground">Today's route</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Delivery Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.5 hrs</div>
            <p className="text-xs text-muted-foreground">Average time today</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Deliveries</CardTitle>
          <CardDescription>Manage your ongoing deliveries</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* BACKEND INTEGRATION: Fetch and display current deliveries */}
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Truck className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Delivery #1001</p>
                    <p className="text-sm text-muted-foreground">Dairy Mart Shop</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100">
                    In Progress
                  </span>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Estimated arrival</p>
                  <p className="text-sm font-medium">10:30 AM</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Items</p>
                  <p className="text-sm font-medium">5 products</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Distance</p>
                  <p className="text-sm font-medium">3.2 km</p>
                </div>
                <Button size="sm" className="gap-1">
                  <CheckCircle className="h-4 w-4" />
                  Complete
                </Button>
              </div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Truck className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Delivery #1002</p>
                    <p className="text-sm text-muted-foreground">Fresh Dairy Shop</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100">
                    In Progress
                  </span>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Estimated arrival</p>
                  <p className="text-sm font-medium">11:15 AM</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Items</p>
                  <p className="text-sm font-medium">3 products</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Distance</p>
                  <p className="text-sm font-medium">5.7 km</p>
                </div>
                <Button size="sm" className="gap-1">
                  <CheckCircle className="h-4 w-4" />
                  Complete
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

