"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertCircle, Package, Store, Truck, Bell } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"

interface User {
  username: string
  role: string
  name: string
}

// Sample data for dashboard
const lowStockMaterials = [
  { id: 3, name: "Sugar", supplier: "Sweet Supplies Inc.", quantity: 200, threshold: 300, unit: "kg" },
  { id: 4, name: "Fruit Puree", supplier: "Fresh Fruit Co.", quantity: 150, threshold: 200, unit: "kg" },
]

const lowStockProducts = [
  { id: 4, name: "Cheddar Cheese 500g", category: "Cheese", quantity: 150, threshold: 200, unit: "units" },
]

const pendingDeliveries = [
  { id: "D-1001", shop: "City Grocery", route: "North Route", scheduledDate: "2023-06-20", status: "Pending" },
  { id: "D-1003", shop: "Corner Store", route: "North Route", scheduledDate: "2023-06-21", status: "Pending" },
]

const supplierNotifications = [
  { id: 1, supplier: "Green Meadows Farm", material: "Fresh Milk", quantity: 2000, availableDate: "2023-06-22" },
  { id: 2, supplier: "Sunny Valley Dairy", material: "Cream", quantity: 800, availableDate: "2023-06-23" },
]

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Get user from localStorage
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-blue-600 dark:text-blue-400">Welcome back, {user?.name || "User"}</p>
      </div>

      {user?.role === "admin" ? (
        <div className="grid gap-6 md:grid-cols-2">
          {/* Inventory Alerts */}
          <Card className="border-blue-100 dark:border-blue-900/30">
            <CardHeader className="bg-blue-50 dark:bg-blue-900/10">
              <CardTitle className="text-blue-800 dark:text-blue-300 flex items-center">
                <Package className="mr-2 h-5 w-5" />
                Inventory Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              {lowStockMaterials.length > 0 || lowStockProducts.length > 0 ? (
                <>
                  {lowStockMaterials.map((material) => (
                    <Alert key={material.id} variant="destructive" className="mb-2">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        Raw material <span className="font-bold">{material.name}</span> is below threshold (
                        {material.quantity}/{material.threshold} {material.unit})
                      </AlertDescription>
                    </Alert>
                  ))}

                  {lowStockProducts.map((product) => (
                    <Alert key={product.id} variant="destructive" className="mb-2">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        Product <span className="font-bold">{product.name}</span> is below threshold ({product.quantity}
                        /{product.threshold} {product.unit})
                      </AlertDescription>
                    </Alert>
                  ))}
                </>
              ) : (
                <p className="text-green-600 dark:text-green-400">All inventory levels are normal</p>
              )}
            </CardContent>
            <CardFooter>
              <Link href="/dashboard/inventory" className="w-full">
                <Button className="w-full">View Inventory</Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Supplier Notifications */}
          <Card className="border-blue-100 dark:border-blue-900/30">
            <CardHeader className="bg-blue-50 dark:bg-blue-900/10">
              <CardTitle className="text-blue-800 dark:text-blue-300 flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                Supplier Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              {supplierNotifications.length > 0 ? (
                supplierNotifications.map((notification) => (
                  <Alert key={notification.id} className="mb-2 bg-blue-50 border-blue-200 text-blue-800">
                    <Bell className="h-4 w-4" />
                    <AlertDescription>
                      <span className="font-bold">{notification.supplier}</span> has {notification.quantity} units of{" "}
                      {notification.material} available on {notification.availableDate}
                    </AlertDescription>
                  </Alert>
                ))
              ) : (
                <p className="text-blue-600 dark:text-blue-400">No new supplier notifications</p>
              )}
            </CardContent>
            <CardFooter>
              <Link href="/dashboard/suppliers" className="w-full">
                <Button className="w-full">View Suppliers</Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Shop Orders */}
          <Card className="border-blue-100 dark:border-blue-900/30">
            <CardHeader className="bg-blue-50 dark:bg-blue-900/10">
              <CardTitle className="text-blue-800 dark:text-blue-300 flex items-center">
                <Store className="mr-2 h-5 w-5" />
                Shop Orders
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">New Orders:</span>
                  <Badge>3</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Processing:</span>
                  <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
                    2
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Ready for Delivery:</span>
                  <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                    5
                  </Badge>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/dashboard/orders" className="w-full">
                <Button className="w-full">Manage Orders</Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Deliveries */}
          <Card className="border-blue-100 dark:border-blue-900/30">
            <CardHeader className="bg-blue-50 dark:bg-blue-900/10">
              <CardTitle className="text-blue-800 dark:text-blue-300 flex items-center">
                <Truck className="mr-2 h-5 w-5" />
                Deliveries
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {pendingDeliveries.map((delivery) => (
                  <div key={delivery.id} className="flex justify-between items-center border-b pb-2 last:border-0">
                    <div>
                      <p className="font-medium">{delivery.shop}</p>
                      <p className="text-sm text-gray-500">
                        {delivery.route} - {delivery.scheduledDate}
                      </p>
                    </div>
                    <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
                      {delivery.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/dashboard/drivers" className="w-full">
                <Button className="w-full">View Deliveries</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      ) : (
        <Card className="border-blue-100 dark:border-blue-900/30">
          <CardHeader className="bg-blue-50 dark:bg-blue-900/10">
            <CardTitle className="text-blue-800 dark:text-blue-300">Hayoma Dairy Management System</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-blue-600 dark:text-blue-400">
              Welcome to your dashboard. You are logged in as a{" "}
              <span className="font-semibold capitalize">{user?.role}</span>.
            </p>
            <p className="text-blue-600 dark:text-blue-400 mt-4">
              Use the sidebar to navigate to your available sections. If you need any assistance, please contact the
              system administrator.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

