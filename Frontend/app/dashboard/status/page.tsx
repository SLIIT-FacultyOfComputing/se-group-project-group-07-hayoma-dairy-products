"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  LineChart,
  PieChart,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Truck,
  Package,
  Store,
  AlertTriangle,
  Search,
} from "lucide-react"

// Sample data for sales overview
const salesData = {
  today: 12850,
  yesterday: 10500,
  thisWeek: 78500,
  lastWeek: 72000,
  thisMonth: 325000,
  lastMonth: 310000,
  topProducts: [
    { name: "Whole Milk 1L", sales: 2500, change: 5.2 },
    { name: "Skim Milk 1L", sales: 1800, change: -2.1 },
    { name: "Strawberry Yogurt 200g", sales: 1200, change: 8.7 },
    { name: "Cheddar Cheese 500g", sales: 950, change: 3.2 },
    { name: "Butter 250g", sales: 750, change: 1.5 },
  ],
  topShops: [
    { name: "City Grocery", sales: 4500, change: 7.2 },
    { name: "Fresh Market", sales: 3800, change: 5.1 },
    { name: "Corner Store", sales: 2200, change: -1.7 },
    { name: "Neighborhood Mart", sales: 1950, change: 2.2 },
  ],
}

// Sample data for supplier raw materials
const supplierRequests = [
  {
    id: "SR-1001",
    supplier: "Green Meadows Farm",
    material: "Fresh Milk",
    quantity: "5000 liters",
    requestDate: "2023-06-18",
    status: "accepted",
    deliveryDate: "2023-06-22",
  },
  {
    id: "SR-1002",
    supplier: "Sunny Valley Dairy",
    material: "Cream",
    quantity: "1200 liters",
    requestDate: "2023-06-18",
    status: "pending",
    deliveryDate: "-",
  },
  {
    id: "SR-1003",
    supplier: "Sweet Supplies Inc.",
    material: "Sugar",
    quantity: "500 kg",
    requestDate: "2023-06-17",
    status: "accepted",
    deliveryDate: "2023-06-21",
  },
  {
    id: "SR-1004",
    supplier: "Fresh Fruit Co.",
    material: "Fruit Puree",
    quantity: "300 kg",
    requestDate: "2023-06-17",
    status: "rejected",
    deliveryDate: "-",
  },
  {
    id: "SR-1005",
    supplier: "Flavor Masters",
    material: "Flavoring",
    quantity: "100 liters",
    requestDate: "2023-06-16",
    status: "delivered",
    deliveryDate: "2023-06-19",
  },
]

// Sample data for driver deliveries
const driverDeliveries = [
  {
    id: "D-1001",
    driver: "James Anderson",
    shop: "City Grocery",
    route: "North Route",
    scheduledDate: "2023-06-20",
    status: "pending",
    paymentStatus: "unpaid",
  },
  {
    id: "D-1002",
    driver: "Maria Garcia",
    shop: "Fresh Market",
    route: "South Route",
    scheduledDate: "2023-06-20",
    status: "in-transit",
    paymentStatus: "unpaid",
  },
  {
    id: "D-1003",
    driver: "James Anderson",
    shop: "Corner Store",
    route: "North Route",
    scheduledDate: "2023-06-21",
    status: "pending",
    paymentStatus: "prepaid",
  },
  {
    id: "D-1004",
    driver: "Linda Martinez",
    shop: "Neighborhood Mart",
    route: "East Route",
    scheduledDate: "2023-06-21",
    status: "pending",
    paymentStatus: "unpaid",
  },
  {
    id: "D-1005",
    driver: "Maria Garcia",
    shop: "Valley Grocery",
    route: "South Route",
    scheduledDate: "2023-06-22",
    status: "scheduled",
    paymentStatus: "prepaid",
  },
]

// Sample data for payment status
const paymentStatus = {
  totalSales: 325000,
  collected: 275000,
  pending: 50000,
  overduePayments: [
    { id: "INV-1001", shop: "Corner Store", amount: 12500, dueDate: "2023-06-15", daysOverdue: 5 },
    { id: "INV-1002", shop: "Eastside Mart", amount: 8750, dueDate: "2023-06-16", daysOverdue: 4 },
    { id: "INV-1003", shop: "Valley Grocery", amount: 15000, dueDate: "2023-06-17", daysOverdue: 3 },
  ],
  recentPayments: [
    { id: "PAY-1001", shop: "City Grocery", amount: 24500, date: "2023-06-19", method: "Bank Transfer" },
    { id: "PAY-1002", shop: "Fresh Market", amount: 18750, date: "2023-06-18", method: "Credit Card" },
    { id: "PAY-1003", shop: "Neighborhood Mart", amount: 12000, date: "2023-06-18", method: "Cash" },
  ],
}

// Sample data for alerts
const systemAlerts = [
  {
    id: 1,
    type: "inventory",
    message: "Low stock alert: Cheddar Cheese 500g is below threshold (150/200 units)",
    timestamp: "2023-06-20 09:15",
    severity: "warning",
  },
  {
    id: 2,
    type: "supplier",
    message: "Fresh Fruit Co. rejected material request for Fruit Puree (300 kg)",
    timestamp: "2023-06-19 14:30",
    severity: "high",
  },
  {
    id: 3,
    type: "delivery",
    message: "Driver James Anderson marked delivery D-0998 as completed",
    timestamp: "2023-06-19 11:45",
    severity: "info",
  },
  {
    id: 4,
    type: "payment",
    message: "Payment received from City Grocery: $24,500",
    timestamp: "2023-06-19 10:20",
    severity: "info",
  },
  {
    id: 5,
    type: "inventory",
    message: "Sugar is below threshold (200/300 kg)",
    timestamp: "2023-06-18 16:10",
    severity: "warning",
  },
]

export default function StatusPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount)
  }

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "accepted":
        return <Badge className="bg-green-500">Accepted</Badge>
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
            Pending
          </Badge>
        )
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>
      case "delivered":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
            Delivered
          </Badge>
        )
      case "in-transit":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
            In Transit
          </Badge>
        )
      case "scheduled":
        return (
          <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-300">
            Scheduled
          </Badge>
        )
      case "unpaid":
        return <Badge variant="destructive">Unpaid</Badge>
      case "prepaid":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
            Prepaid
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "inventory":
        return <Package className="h-5 w-5 text-yellow-500" />
      case "supplier":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case "delivery":
        return <Truck className="h-5 w-5 text-blue-500" />
      case "payment":
        return <DollarSign className="h-5 w-5 text-green-500" />
      default:
        return <AlertTriangle className="h-5 w-5" />
    }
  }

  if (!mounted) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Status Monitor</h1>
        <p className="text-blue-600 dark:text-blue-400">
          Real-time monitoring of sales, suppliers, deliveries, and payments
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white dark:bg-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-4">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Today's Sales</p>
                <h3 className="text-2xl font-bold">{formatCurrency(salesData.today)}</h3>
                <p className="text-sm text-green-600 dark:text-green-400 flex items-center">
                  <TrendingUp className="mr-1 h-4 w-4" />+
                  {(((salesData.today - salesData.yesterday) / salesData.yesterday) * 100).toFixed(1)}%
                </p>
              </div>
              <BarChart className="h-10 w-10 text-blue-600 dark:text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-4">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Supplier Requests</p>
                <h3 className="text-2xl font-bold">{supplierRequests.length}</h3>
                <p className="text-sm text-yellow-600 dark:text-yellow-400 flex items-center">
                  <Clock className="mr-1 h-4 w-4" />
                  {supplierRequests.filter((r) => r.status === "pending").length} pending
                </p>
              </div>
              <Package className="h-10 w-10 text-blue-600 dark:text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-4">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Deliveries</p>
                <h3 className="text-2xl font-bold">{driverDeliveries.length}</h3>
                <p className="text-sm text-blue-600 dark:text-blue-400 flex items-center">
                  <Truck className="mr-1 h-4 w-4" />
                  {driverDeliveries.filter((d) => d.status === "in-transit").length} in transit
                </p>
              </div>
              <LineChart className="h-10 w-10 text-blue-600 dark:text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-4">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Payment Collection</p>
                <h3 className="text-2xl font-bold">
                  {((paymentStatus.collected / paymentStatus.totalSales) * 100).toFixed(1)}%
                </h3>
                <p className="text-sm text-red-600 dark:text-red-400 flex items-center">
                  <AlertTriangle className="mr-1 h-4 w-4" />
                  {formatCurrency(paymentStatus.pending)} pending
                </p>
              </div>
              <PieChart className="h-10 w-10 text-blue-600 dark:text-blue-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Alerts */}
      <Card className="border-blue-100 dark:border-blue-900/30">
        <CardHeader className="bg-blue-50 dark:bg-blue-900/10 rounded-t-lg">
          <CardTitle className="text-blue-800 dark:text-blue-300">System Alerts</CardTitle>
          <CardDescription className="text-blue-600 dark:text-blue-400">
            Recent alerts and notifications from the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {systemAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`flex items-start p-3 rounded-md border ${
                  alert.severity === "high"
                    ? "bg-red-50 border-red-200 dark:bg-red-900/10 dark:border-red-900/30"
                    : alert.severity === "warning"
                      ? "bg-yellow-50 border-yellow-200 dark:bg-yellow-900/10 dark:border-yellow-900/30"
                      : "bg-blue-50 border-blue-200 dark:bg-blue-900/10 dark:border-blue-900/30"
                }`}
              >
                <div className="mr-3 mt-0.5">{getAlertIcon(alert.type)}</div>
                <div className="flex-1">
                  <p className="font-medium">{alert.message}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{alert.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Tabs */}
      <Tabs defaultValue="sales" className="space-y-4">
        <TabsList className="bg-blue-100 dark:bg-blue-900/30">
          <TabsTrigger value="sales" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
            Sales Overview
          </TabsTrigger>
          <TabsTrigger value="suppliers" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
            Supplier Requests
          </TabsTrigger>
          <TabsTrigger value="deliveries" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
            Driver Deliveries
          </TabsTrigger>
          <TabsTrigger value="payments" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
            Payment Status
          </TabsTrigger>
        </TabsList>

        {/* Sales Overview Tab */}
        <TabsContent value="sales" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-blue-100 dark:border-blue-900/30">
              <CardHeader className="bg-blue-50 dark:bg-blue-900/10 rounded-t-lg">
                <CardTitle className="text-blue-800 dark:text-blue-300">Top Selling Products</CardTitle>
                <CardDescription className="text-blue-600 dark:text-blue-400">
                  Best performing products this month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Sales</TableHead>
                      <TableHead>Change</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {salesData.topProducts.map((product, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{formatCurrency(product.sales)}</TableCell>
                        <TableCell>
                          <span
                            className={`flex items-center ${product.change >= 0 ? "text-green-600" : "text-red-600"}`}
                          >
                            {product.change >= 0 ? (
                              <TrendingUp className="mr-1 h-4 w-4" />
                            ) : (
                              <TrendingDown className="mr-1 h-4 w-4" />
                            )}
                            {Math.abs(product.change)}%
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card className="border-blue-100 dark:border-blue-900/30">
              <CardHeader className="bg-blue-50 dark:bg-blue-900/10 rounded-t-lg">
                <CardTitle className="text-blue-800 dark:text-blue-300">Top Shops by Sales</CardTitle>
                <CardDescription className="text-blue-600 dark:text-blue-400">
                  Best performing shops this month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Shop</TableHead>
                      <TableHead>Sales</TableHead>
                      <TableHead>Change</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {salesData.topShops.map((shop, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{shop.name}</TableCell>
                        <TableCell>{formatCurrency(shop.sales)}</TableCell>
                        <TableCell>
                          <span className={`flex items-center ${shop.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                            {shop.change >= 0 ? (
                              <TrendingUp className="mr-1 h-4 w-4" />
                            ) : (
                              <TrendingDown className="mr-1 h-4 w-4" />
                            )}
                            {Math.abs(shop.change)}%
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          <Card className="border-blue-100 dark:border-blue-900/30">
            <CardHeader className="bg-blue-50 dark:bg-blue-900/10 rounded-t-lg">
              <CardTitle className="text-blue-800 dark:text-blue-300">Sales Performance</CardTitle>
              <CardDescription className="text-blue-600 dark:text-blue-400">
                Comparison of current and previous periods
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Today</span>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">vs Yesterday</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-2xl font-bold">{formatCurrency(salesData.today)}</span>
                    <span
                      className={`text-sm ${salesData.today >= salesData.yesterday ? "text-green-600" : "text-red-600"}`}
                    >
                      {salesData.today >= salesData.yesterday ? "+" : ""}
                      {(((salesData.today - salesData.yesterday) / salesData.yesterday) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">This Week</span>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">vs Last Week</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-2xl font-bold">{formatCurrency(salesData.thisWeek)}</span>
                    <span
                      className={`text-sm ${salesData.thisWeek >= salesData.lastWeek ? "text-green-600" : "text-red-600"}`}
                    >
                      {salesData.thisWeek >= salesData.lastWeek ? "+" : ""}
                      {(((salesData.thisWeek - salesData.lastWeek) / salesData.lastWeek) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">This Month</span>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">vs Last Month</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-2xl font-bold">{formatCurrency(salesData.thisMonth)}</span>
                    <span
                      className={`text-sm ${salesData.thisMonth >= salesData.lastMonth ? "text-green-600" : "text-red-600"}`}
                    >
                      {salesData.thisMonth >= salesData.lastMonth ? "+" : ""}
                      {(((salesData.thisMonth - salesData.lastMonth) / salesData.lastMonth) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Supplier Requests Tab */}
        <TabsContent value="suppliers" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="relative max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search suppliers..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card className="border-blue-100 dark:border-blue-900/30">
            <CardHeader className="bg-blue-50 dark:bg-blue-900/10 rounded-t-lg">
              <CardTitle className="text-blue-800 dark:text-blue-300">Supplier Material Requests</CardTitle>
              <CardDescription className="text-blue-600 dark:text-blue-400">
                Status of raw material requests to suppliers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Material</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Request Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Delivery Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {supplierRequests
                    .filter(
                      (request) =>
                        (filterStatus === "all" || request.status === filterStatus) &&
                        (request.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          request.material.toLowerCase().includes(searchTerm.toLowerCase())),
                    )
                    .map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.id}</TableCell>
                        <TableCell>{request.supplier}</TableCell>
                        <TableCell>{request.material}</TableCell>
                        <TableCell>{request.quantity}</TableCell>
                        <TableCell>{request.requestDate}</TableCell>
                        <TableCell>{getStatusBadge(request.status)}</TableCell>
                        <TableCell>{request.deliveryDate}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-4">
            <Card className="bg-white dark:bg-gray-800">
              <CardContent className="p-6">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="rounded-full bg-green-100 p-3">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Accepted</p>
                  <h3 className="text-2xl font-bold">
                    {supplierRequests.filter((r) => r.status === "accepted").length}
                  </h3>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800">
              <CardContent className="p-6">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="rounded-full bg-yellow-100 p-3">
                    <Clock className="h-6 w-6 text-yellow-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Pending</p>
                  <h3 className="text-2xl font-bold">
                    {supplierRequests.filter((r) => r.status === "pending").length}
                  </h3>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800">
              <CardContent className="p-6">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="rounded-full bg-red-100 p-3">
                    <XCircle className="h-6 w-6 text-red-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Rejected</p>
                  <h3 className="text-2xl font-bold">
                    {supplierRequests.filter((r) => r.status === "rejected").length}
                  </h3>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800">
              <CardContent className="p-6">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="rounded-full bg-blue-100 p-3">
                    <Package className="h-6 w-6 text-blue-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Delivered</p>
                  <h3 className="text-2xl font-bold">
                    {supplierRequests.filter((r) => r.status === "delivered").length}
                  </h3>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Driver Deliveries Tab */}
        <TabsContent value="deliveries" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="relative max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search deliveries..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-transit">In Transit</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card className="border-blue-100 dark:border-blue-900/30">
            <CardHeader className="bg-blue-50 dark:bg-blue-900/10 rounded-t-lg">
              <CardTitle className="text-blue-800 dark:text-blue-300">Driver Deliveries</CardTitle>
              <CardDescription className="text-blue-600 dark:text-blue-400">
                Status of all scheduled and active deliveries
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Driver</TableHead>
                    <TableHead>Shop</TableHead>
                    <TableHead>Route</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Payment</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {driverDeliveries
                    .filter(
                      (delivery) =>
                        (filterStatus === "all" || delivery.status === filterStatus) &&
                        (delivery.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          delivery.shop.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          delivery.route.toLowerCase().includes(searchTerm.toLowerCase())),
                    )
                    .map((delivery) => (
                      <TableRow key={delivery.id}>
                        <TableCell className="font-medium">{delivery.id}</TableCell>
                        <TableCell>{delivery.driver}</TableCell>
                        <TableCell>{delivery.shop}</TableCell>
                        <TableCell>{delivery.route}</TableCell>
                        <TableCell>{delivery.scheduledDate}</TableCell>
                        <TableCell>{getStatusBadge(delivery.status)}</TableCell>
                        <TableCell>{getStatusBadge(delivery.paymentStatus)}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card className="bg-white dark:bg-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between space-x-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Pending Deliveries</p>
                    <h3 className="text-2xl font-bold">
                      {driverDeliveries.filter((d) => d.status === "pending").length}
                    </h3>
                  </div>
                  <div className="rounded-full bg-yellow-100 p-3">
                    <Clock className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between space-x-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">In Transit</p>
                    <h3 className="text-2xl font-bold">
                      {driverDeliveries.filter((d) => d.status === "in-transit").length}
                    </h3>
                  </div>
                  <div className="rounded-full bg-blue-100 p-3">
                    <Truck className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between space-x-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Scheduled</p>
                    <h3 className="text-2xl font-bold">
                      {driverDeliveries.filter((d) => d.status === "scheduled").length}
                    </h3>
                  </div>
                  <div className="rounded-full bg-purple-100 p-3">
                    <Store className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Payment Status Tab */}
        <TabsContent value="payments" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="bg-white dark:bg-gray-800">
              <CardContent className="p-6">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="rounded-full bg-blue-100 p-3">
                    <DollarSign className="h-6 w-6 text-blue-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Sales</p>
                  <h3 className="text-2xl font-bold">{formatCurrency(paymentStatus.totalSales)}</h3>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800">
              <CardContent className="p-6">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="rounded-full bg-green-100 p-3">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Collected</p>
                  <h3 className="text-2xl font-bold">{formatCurrency(paymentStatus.collected)}</h3>
                  <p className="text-sm text-green-600">
                    {((paymentStatus.collected / paymentStatus.totalSales) * 100).toFixed(1)}% of total
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800">
              <CardContent className="p-6">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="rounded-full bg-red-100 p-3">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Pending</p>
                  <h3 className="text-2xl font-bold">{formatCurrency(paymentStatus.pending)}</h3>
                  <p className="text-sm text-red-600">
                    {((paymentStatus.pending / paymentStatus.totalSales) * 100).toFixed(1)}% of total
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-blue-100 dark:border-blue-900/30">
            <CardHeader className="bg-blue-50 dark:bg-blue-900/10 rounded-t-lg">
              <CardTitle className="text-blue-800 dark:text-blue-300">Overdue Payments</CardTitle>
              <CardDescription className="text-blue-600 dark:text-blue-400">
                Payments that are past their due date
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Shop</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Days Overdue</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paymentStatus.overduePayments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.id}</TableCell>
                      <TableCell>{payment.shop}</TableCell>
                      <TableCell>{formatCurrency(payment.amount)}</TableCell>
                      <TableCell>{payment.dueDate}</TableCell>
                      <TableCell>
                        <Badge variant="destructive">{payment.daysOverdue} days</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" className="text-blue-600 border-blue-200">
                          Send Reminder
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="border-blue-100 dark:border-blue-900/30">
            <CardHeader className="bg-blue-50 dark:bg-blue-900/10 rounded-t-lg">
              <CardTitle className="text-blue-800 dark:text-blue-300">Recent Payments</CardTitle>
              <CardDescription className="text-blue-600 dark:text-blue-400">Recently received payments</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Payment ID</TableHead>
                    <TableHead>Shop</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paymentStatus.recentPayments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.id}</TableCell>
                      <TableCell>{payment.shop}</TableCell>
                      <TableCell>{formatCurrency(payment.amount)}</TableCell>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell>{payment.method}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="text-blue-600">
                          View Receipt
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

