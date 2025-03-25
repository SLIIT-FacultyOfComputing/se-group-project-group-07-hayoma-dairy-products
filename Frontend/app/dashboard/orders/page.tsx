"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Search } from "lucide-react"

// Sample orders data
const orders = [
  {
    id: "HD-1001",
    shop: "City Grocery",
    date: "2023-06-15",
    items: 8,
    total: "$1,245.00",
    status: "Delivered",
    paymentStatus: "Paid",
  },
  {
    id: "HD-1002",
    shop: "Fresh Market",
    date: "2023-06-16",
    items: 12,
    total: "$2,150.00",
    status: "Processing",
    paymentStatus: "Paid",
  },
  {
    id: "HD-1003",
    shop: "Corner Store",
    date: "2023-06-16",
    items: 5,
    total: "$780.00",
    status: "Pending",
    paymentStatus: "Unpaid",
  },
  {
    id: "HD-1004",
    shop: "Neighborhood Mart",
    date: "2023-06-17",
    items: 10,
    total: "$1,560.00",
    status: "Processing",
    paymentStatus: "Paid",
  },
  {
    id: "HD-1005",
    shop: "City Grocery",
    date: "2023-06-17",
    items: 7,
    total: "$950.00",
    status: "Pending",
    paymentStatus: "Unpaid",
  },
]

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.shop.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
        <p className="text-muted-foreground dark:text-gray-400">Manage and track customer orders</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search orders..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Order
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Orders</CardTitle>
          <CardDescription>Manage all customer orders in one place</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground dark:text-gray-400">
            This page has been simplified. The order management functionality will be implemented here.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

