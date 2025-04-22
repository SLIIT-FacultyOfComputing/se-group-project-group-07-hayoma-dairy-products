"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { ShoppingCart, Truck, DollarSign, ArrowUpRight, Bell, Plus, ClipboardList } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"

// Mock data for hardcoded display
const mockNotifications = [
  {
    id: "1",
    product: "Fresh Milk",
    quantity: "500 liters",
    availableDate: "2023-05-16",
    status: "pending",
    createdAt: "2023-05-14",
  },
  {
    id: "2",
    product: "Greek Yogurt",
    quantity: "200 cups",
    availableDate: "2023-05-18",
    status: "approved",
    createdAt: "2023-05-13",
  },
  {
    id: "3",
    product: "Cheddar Cheese",
    quantity: "100 kg",
    availableDate: "2023-05-20",
    status: "delivered",
    createdAt: "2023-05-10",
  },
]

// Mock data for material requests
const mockMaterialRequests = [
  {
    id: "req1",
    materialName: "Raw Milk",
    quantity: 500,
    unit: "liters",
    requestDate: "2023-05-16",
    status: "PENDING",
  },
  {
    id: "req2",
    materialName: "Sugar",
    quantity: 200,
    unit: "kg",
    requestDate: "2023-05-15",
    status: "ACCEPTED",
  },
]

export default function SupplierDashboard() {
  const { user } = useAuth()
  const [isNotificationDialogOpen, setIsNotificationDialogOpen] = useState(false)
  const [notifications, setNotifications] = useState(mockNotifications)
  const [formData, setFormData] = useState({
    product: "",
    quantity: "",
    availableDate: "",
    notes: "",
    urgent: false,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      urgent: checked,
    }))
  }

  const handleSubmitNotification = () => {
    // Validate form
    if (!formData.product || !formData.quantity || !formData.availableDate) {
      toast.error("Please fill in all required fields")
      return
    }

    // Add new notification
    const newNotification = {
      id: Math.random().toString(36).substring(7),
      product: formData.product,
      quantity: formData.quantity,
      availableDate: formData.availableDate,
      status: "pending",
      createdAt: new Date().toISOString().split("T")[0],
    }

    setNotifications((prev) => [newNotification, ...prev])
    toast.success("Supply availability notification sent to admin")
    setIsNotificationDialogOpen(false)

    // Reset form
    setFormData({
      product: "",
      quantity: "",
      availableDate: "",
      notes: "",
      urgent: false,
    })
  }

  // Count notifications by status
  const pendingNotifications = notifications.filter((n) => n.status === "pending").length
  const approvedNotifications = notifications.filter((n) => n.status === "approved").length
  const deliveredNotifications = notifications.filter((n) => n.status === "delivered").length

  // Count material requests by status
  const pendingRequests = mockMaterialRequests.filter((req) => req.status === "PENDING").length

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Supplier Dashboard</h1>
          <p className="text-muted-foreground">Welcome, {user?.name || "Supplier User"}!</p>
          <p className="text-muted-foreground">Your role is: {user?.role || "supplier"}</p>
        </div>
        <Dialog open={isNotificationDialogOpen} onOpenChange={setIsNotificationDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
              <Bell className="h-4 w-4" />
              Notify Supply Availability
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Notify Supply Availability</DialogTitle>
              <DialogDescription>
                Let the admin know about your available supplies for pickup or delivery.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="product">Product Name *</Label>
                  <Input
                    id="product"
                    name="product"
                    value={formData.product}
                    onChange={handleInputChange}
                    placeholder="Enter product name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity Available *</Label>
                  <Input
                    id="quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    placeholder="e.g., 500 liters, 200 kg"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="availableDate">Available Date *</Label>
                <Input
                  id="availableDate"
                  name="availableDate"
                  type="date"
                  value={formData.availableDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Any special handling instructions or details..."
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Switch id="urgent" checked={formData.urgent} onCheckedChange={handleSwitchChange} />
                  <Label htmlFor="urgent">Mark as Urgent</Label>
                </div>
                <p className="text-xs text-muted-foreground">
                  Use this for time-sensitive supplies that need immediate attention.
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsNotificationDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmitNotification}>Send Notification</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
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
        <Card className="bg-amber-50 dark:bg-amber-950 border-amber-100 dark:border-amber-900">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Material Requests</CardTitle>
            <ClipboardList className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">{pendingRequests}</div>
            <p className="text-xs text-muted-foreground">Pending requests from admin</p>
            <Button variant="link" className="mt-2 h-auto p-0 text-xs text-amber-600 dark:text-amber-400">
              <Link href="/dashboard/supplier/material-requests" className="flex items-center gap-1">
                View requests <ArrowUpRight className="h-3 w-3" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Supply Availability Notifications</CardTitle>
          <CardDescription>Manage your supply notifications to admin</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3 mb-6">
            <div className="flex items-center gap-2 rounded-md border border-blue-100 bg-blue-50 p-3 dark:border-blue-800 dark:bg-blue-950">
              <div className="text-center flex-1">
                <p className="text-sm font-medium text-blue-800 dark:text-blue-200">Pending</p>
                <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">{pendingNotifications}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-md border border-green-100 bg-green-50 p-3 dark:border-green-800 dark:bg-green-950">
              <div className="text-center flex-1">
                <p className="text-sm font-medium text-green-800 dark:text-green-200">Approved</p>
                <p className="text-2xl font-bold text-green-800 dark:text-green-200">{approvedNotifications}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-md border border-purple-100 bg-purple-50 p-3 dark:border-purple-800 dark:bg-purple-950">
              <div className="text-center flex-1">
                <p className="text-sm font-medium text-purple-800 dark:text-purple-200">Delivered</p>
                <p className="text-2xl font-bold text-purple-800 dark:text-purple-200">{deliveredNotifications}</p>
              </div>
            </div>
          </div>

          {notifications.length > 0 ? (
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`rounded-lg border p-4 ${
                    notification.status === "pending"
                      ? "border-blue-100 dark:border-blue-800"
                      : notification.status === "approved"
                        ? "border-green-100 dark:border-green-800"
                        : "border-purple-100 dark:border-purple-800"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{notification.product}</p>
                      <p className="text-sm text-muted-foreground">Quantity: {notification.quantity}</p>
                    </div>
                    <div className="text-right">
                      <span
                        className={`rounded-full px-2 py-1 text-xs ${
                          notification.status === "pending"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100"
                            : notification.status === "approved"
                              ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                              : "bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100"
                        }`}
                      >
                        {notification.status.charAt(0).toUpperCase() + notification.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Available Date</p>
                      <p className="text-sm font-medium">{notification.availableDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Notified On</p>
                      <p className="text-sm font-medium">{notification.createdAt}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <Bell className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No Notifications</h3>
              <p className="text-sm text-muted-foreground mt-2 max-w-md">
                You haven't sent any supply availability notifications yet. Click the button above to notify admin about
                your available supplies.
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center border-t pt-4">
          <Button variant="outline" className="gap-2" onClick={() => setIsNotificationDialogOpen(true)}>
            <Plus className="h-4 w-4" />
            Add New Notification
          </Button>
        </CardFooter>
      </Card>

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
