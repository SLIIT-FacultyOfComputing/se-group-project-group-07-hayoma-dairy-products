"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Search, Plus, MapPin, Truck, CheckCircle, DollarSign, Bell } from "lucide-react"
import { toast } from "sonner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// Add these imports at the top if they don't exist
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Sample drivers data
const driversList = [
  {
    id: 1,
    name: "James Anderson",
    email: "james@example.com",
    phone: "555-123-7890",
    vehicle: "Truck #101",
    license: "DL-12345",
    status: "active",
    availability: "available",
    address: "123 Driver Lane, Transport City",
    joinDate: "2022-03-15",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Maria Garcia",
    email: "maria@example.com",
    phone: "555-456-7890",
    vehicle: "Van #202",
    license: "DL-67890",
    status: "active",
    availability: "unavailable",
    address: "456 Delivery Road, Logistics Town",
    joinDate: "2022-05-20",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Robert Johnson",
    email: "robert@example.com",
    phone: "555-789-1234",
    vehicle: "Truck #303",
    license: "DL-24680",
    status: "inactive",
    availability: "unavailable",
    address: "789 Transit Street, Shipping City",
    joinDate: "2022-01-10",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 4,
    name: "Linda Martinez",
    email: "linda@example.com",
    phone: "555-321-6547",
    vehicle: "Van #404",
    license: "DL-13579",
    status: "active",
    availability: "available",
    address: "101 Carrier Avenue, Dispatch City",
    joinDate: "2022-07-05",
    avatar: "/placeholder.svg?height=100&width=100",
  },
]

// Sample delivery routes
const deliveryRoutes = [
  { id: 1, name: "North Route", shops: ["City Grocery", "Corner Store"], distance: "45 km" },
  { id: 2, name: "South Route", shops: ["Fresh Market", "Neighborhood Mart"], distance: "38 km" },
  { id: 3, name: "East Route", shops: ["Eastside Mart", "Valley Grocery"], distance: "52 km" },
]

// Sample deliveries for driver view
const deliveriesList = [
  {
    id: "D-1001",
    orderId: "HD-1001",
    shop: "City Grocery",
    address: "123 Main St, Downtown",
    route: "North Route",
    scheduledDate: "2023-06-20",
    items: [
      { product: "Whole Milk 1L", quantity: 50 },
      { product: "Skim Milk 1L", quantity: 30 },
    ],
    status: "Pending",
    paymentStatus: "Unpaid",
    paymentMethod: "Cash on Delivery",
  },
  {
    id: "D-1002",
    orderId: "HD-1002",
    shop: "Fresh Market",
    address: "456 Oak Ave, Westside",
    route: "South Route",
    scheduledDate: "2023-06-20",
    items: [
      { product: "Strawberry Yogurt 200g", quantity: 100 },
      { product: "Butter 250g", quantity: 40 },
    ],
    status: "In Transit",
    paymentStatus: "Unpaid",
    paymentMethod: "Cash on Delivery",
  },
  {
    id: "D-1003",
    orderId: "HD-1003",
    shop: "Corner Store",
    address: "789 Pine Rd, Northside",
    route: "North Route",
    scheduledDate: "2023-06-21",
    items: [
      { product: "Cheddar Cheese 500g", quantity: 25 },
      { product: "Whole Milk 1L", quantity: 40 },
    ],
    status: "Pending",
    paymentStatus: "Prepaid",
    paymentMethod: "Credit Card",
  },
]

// Sample delivery history
const deliveryHistory = [
  {
    id: "D-0998",
    orderId: "HD-0998",
    shop: "City Grocery",
    date: "2023-06-15",
    status: "Delivered",
    paymentStatus: "Paid",
    paymentMethod: "Cash on Delivery",
  },
  {
    id: "D-0999",
    orderId: "HD-0999",
    shop: "Fresh Market",
    date: "2023-06-16",
    status: "Delivered",
    paymentStatus: "Paid",
    paymentMethod: "Credit Card",
  },
  {
    id: "D-1000",
    orderId: "HD-1000",
    shop: "Neighborhood Mart",
    date: "2023-06-17",
    status: "Delivered",
    paymentStatus: "Paid",
    paymentMethod: "Cash on Delivery",
  },
]

// Sample daily route details
const dailyRouteDetails = {
  routeName: "North Route",
  date: "2023-06-20",
  totalDistance: "45 km",
  estimatedTime: "3 hours",
  stops: [
    {
      id: 1,
      shop: "City Grocery",
      address: "123 Main St, Downtown",
      deliveryTime: "10:00 AM",
      items: [
        { product: "Whole Milk 1L", quantity: 50, total: "$250.00" },
        { product: "Skim Milk 1L", quantity: 30, total: "$135.00" },
      ],
      paymentMethod: "Cash on Delivery",
      paymentStatus: "Unpaid",
      totalAmount: "$385.00",
    },
    {
      id: 2,
      shop: "Corner Store",
      address: "789 Pine Rd, Northside",
      deliveryTime: "11:30 AM",
      items: [
        { product: "Cheddar Cheese 500g", quantity: 25, total: "$187.50" },
        { product: "Whole Milk 1L", quantity: 40, total: "$200.00" },
      ],
      paymentMethod: "Prepaid",
      paymentStatus: "Paid",
      totalAmount: "$387.50",
    },
    {
      id: 3,
      shop: "Neighborhood Mart",
      address: "101 Elm Blvd, Eastside",
      deliveryTime: "1:00 PM",
      items: [
        { product: "Strawberry Yogurt 200g", quantity: 60, total: "$180.00" },
        { product: "Butter 250g", quantity: 35, total: "$157.50" },
      ],
      paymentMethod: "Cash on Delivery",
      paymentStatus: "Unpaid",
      totalAmount: "$337.50",
    },
  ],
}

export default function DriversPage() {
  const [user, setUser] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false)
  const [currentDelivery, setCurrentDelivery] = useState(null)
  const [deliveries, setDeliveries] = useState(deliveriesList)
  const [selectedRoute, setSelectedRoute] = useState("")
  const [updateNote, setUpdateNote] = useState("")
  const [amountCollected, setAmountCollected] = useState("")
  const [mounted, setMounted] = useState(false)
  // Add this state variable in the component
  const [driverAvailability, setDriverAvailability] = useState("available")

  useEffect(() => {
    // Get user from localStorage
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setMounted(true)
  }, [])

  const filteredDrivers = driversList.filter(
    (driver) =>
      driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.vehicle.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleUpdateDelivery = (status) => {
    if (!currentDelivery) return

    // In a real app, you would send this update to your backend
    const updatedDeliveries = deliveries.map((delivery) =>
      delivery.id === currentDelivery.id ? { ...delivery, status } : delivery,
    )

    setDeliveries(updatedDeliveries)

    toast({
      title: "Delivery updated",
      description: `Delivery ${currentDelivery.id} status updated to ${status}`,
    })

    setIsUpdateDialogOpen(false)
  }

  const handleCollectPayment = () => {
    if (!currentDelivery || !amountCollected) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid payment amount.",
        variant: "destructive",
      })
      return
    }

    // In a real app, you would send this payment to your backend
    const updatedDeliveries = deliveries.map((delivery) =>
      delivery.id === currentDelivery.id ? { ...delivery, paymentStatus: "Paid" } : delivery,
    )

    setDeliveries(updatedDeliveries)

    toast({
      title: "Payment collected",
      description: `Payment of $${amountCollected} collected for delivery ${currentDelivery.id}`,
    })

    setIsPaymentDialogOpen(false)
  }

  if (!mounted) {
    return <div>Loading...</div>
  }

  // If user is a driver, show driver dashboard
  if (user?.role === "driver") {
    // Find the current driver's data (in a real app, this would come from the backend)
    const currentDriver = driversList.find((d) => d.name === "James Anderson") || driversList[0]

    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Driver Dashboard</h1>
          <p className="text-blue-600 dark:text-blue-400">Manage your deliveries and routes</p>
        </div>

        {/* Driver Profile Card */}
        <Card className="border-blue-100 dark:border-blue-900/30">
          <CardHeader className="bg-blue-50 dark:bg-blue-900/10 rounded-t-lg">
            <CardTitle className="text-blue-800 dark:text-blue-300">Driver Profile</CardTitle>
            <CardDescription className="text-blue-600 dark:text-blue-400">
              Your personal information and availability status
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center space-y-3">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={currentDriver.avatar} alt={currentDriver.name} />
                  <AvatarFallback>
                    {currentDriver.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h3 className="font-bold text-lg">{currentDriver.name}</h3>
                  <p className="text-sm text-gray-500">Driver ID: {currentDriver.id}</p>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <Switch
                    id="availability"
                    checked={driverAvailability === "available"}
                    onCheckedChange={(checked) => {
                      setDriverAvailability(checked ? "available" : "unavailable")
                      toast({
                        title: `You are now ${checked ? "available" : "unavailable"}`,
                        description: `Your availability status has been updated.`,
                      })
                    }}
                  />
                  <Label htmlFor="availability" className="font-medium">
                    {driverAvailability === "available" ? (
                      <span className="text-green-600">Available for Deliveries</span>
                    ) : (
                      <span className="text-red-600">Unavailable</span>
                    )}
                  </Label>
                </div>
              </div>

              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Email</h4>
                    <p>{currentDriver.email}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Phone</h4>
                    <p>{currentDriver.phone}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Vehicle</h4>
                    <p>{currentDriver.vehicle}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">License</h4>
                    <p>{currentDriver.license}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Address</h4>
                    <p>{currentDriver.address}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Join Date</h4>
                    <p>{currentDriver.joinDate}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-100 dark:border-blue-900/30">
          <CardHeader className="bg-blue-50 dark:bg-blue-900/10 rounded-t-lg">
            <CardTitle className="text-blue-800 dark:text-blue-300 flex items-center">
              <MapPin className="mr-2 h-5 w-5" />
              Today's Route: {dailyRouteDetails.routeName}
            </CardTitle>
            <CardDescription className="text-blue-600 dark:text-blue-400">
              {dailyRouteDetails.date} • {dailyRouteDetails.totalDistance} • Est. time:{" "}
              {dailyRouteDetails.estimatedTime}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="relative">
              <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-blue-200 dark:bg-blue-800"></div>
              {dailyRouteDetails.stops.map((stop, index) => (
                <div key={stop.id} className="relative pl-8 pb-6">
                  <div className="absolute left-0 top-2 h-6 w-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg border border-blue-100 dark:border-blue-900/30 p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-lg">{stop.shop}</h3>
                        <p className="text-gray-500 dark:text-gray-400">{stop.address}</p>
                        <p className="text-sm text-blue-600 dark:text-blue-400">Delivery Time: {stop.deliveryTime}</p>
                      </div>
                      <Badge
                        variant={stop.paymentStatus === "Paid" ? "default" : "destructive"}
                        className={stop.paymentStatus === "Paid" ? "bg-green-500" : ""}
                      >
                        {stop.paymentStatus}
                      </Badge>
                    </div>

                    <div className="border-t border-blue-100 dark:border-blue-900/30 pt-3 mb-3">
                      <h4 className="font-medium mb-2">Delivery Items:</h4>
                      <div className="space-y-1">
                        {stop.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between text-sm">
                            <span>
                              {item.quantity} x {item.product}
                            </span>
                            <span>{item.total}</span>
                          </div>
                        ))}
                        <div className="flex justify-between font-bold pt-1 border-t border-dashed border-blue-100 dark:border-blue-900/30">
                          <span>Total</span>
                          <span>{stop.totalAmount}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="text-sm">
                        <span className="font-medium">Payment Method:</span> {stop.paymentMethod}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setCurrentDelivery({
                              id: `D-${1000 + stop.id}`,
                              shop: stop.shop,
                              status: "Pending",
                            })
                            setUpdateNote("")
                            setIsUpdateDialogOpen(true)
                          }}
                          className="text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                        >
                          <Truck className="mr-2 h-3 w-3" />
                          Update Status
                        </Button>
                        {stop.paymentMethod === "Cash on Delivery" && stop.paymentStatus === "Unpaid" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setCurrentDelivery({
                                id: `D-${1000 + stop.id}`,
                                shop: stop.shop,
                                paymentStatus: "Unpaid",
                                paymentMethod: stop.paymentMethod,
                                totalAmount: stop.totalAmount,
                              })
                              setAmountCollected(stop.totalAmount.replace("$", ""))
                              setIsPaymentDialogOpen(true)
                            }}
                            className="text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700"
                          >
                            <DollarSign className="mr-2 h-3 w-3" />
                            Collect Payment
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t border-blue-100 dark:border-blue-900/30 pt-4">
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
              onClick={() => {
                toast({
                  title: "Route information sent",
                  description: "Your route information and status has been sent to the admin.",
                })
              }}
            >
              <Bell className="mr-2 h-4 w-4" />
              Notify Admin About Route Status
            </Button>
          </CardFooter>
        </Card>

        <Tabs defaultValue="pending" className="space-y-4">
          <TabsList className="bg-blue-100 dark:bg-blue-900/30">
            <TabsTrigger value="pending" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
              Pending Deliveries
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
              Delivery History
            </TabsTrigger>
            <TabsTrigger value="payments" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
              Payment Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            <Card className="border-blue-100 dark:border-blue-900/30">
              <CardHeader className="bg-blue-50 dark:bg-blue-900/10 rounded-t-lg">
                <CardTitle className="text-blue-800 dark:text-blue-300">Pending Deliveries</CardTitle>
                <CardDescription className="text-blue-600 dark:text-blue-400">
                  Manage your scheduled deliveries
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Shop</TableHead>
                      <TableHead>Route</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {deliveries.map((delivery) => (
                      <TableRow key={delivery.id}>
                        <TableCell className="font-medium">{delivery.id}</TableCell>
                        <TableCell>{delivery.shop}</TableCell>
                        <TableCell>{delivery.route}</TableCell>
                        <TableCell>{delivery.scheduledDate}</TableCell>
                        <TableCell>
                          {delivery.status === "Pending" && (
                            <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
                              Pending
                            </Badge>
                          )}
                          {delivery.status === "In Transit" && (
                            <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
                              In Transit
                            </Badge>
                          )}
                          {delivery.status === "Delivered" && (
                            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                              Delivered
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {delivery.paymentStatus === "Unpaid" && <Badge variant="destructive">Unpaid</Badge>}
                          {delivery.paymentStatus === "Paid" && <Badge className="bg-green-500">Paid</Badge>}
                          {delivery.paymentStatus === "Prepaid" && (
                            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                              Prepaid
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setCurrentDelivery(delivery)
                                setUpdateNote("")
                                setIsUpdateDialogOpen(true)
                              }}
                              className="text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                            >
                              <Truck className="mr-2 h-3 w-3" />
                              Update
                            </Button>
                            {delivery.paymentMethod === "Cash on Delivery" && delivery.paymentStatus === "Unpaid" && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setCurrentDelivery(delivery)
                                  setAmountCollected("")
                                  setIsPaymentDialogOpen(true)
                                }}
                                className="text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700"
                              >
                                <DollarSign className="mr-2 h-3 w-3" />
                                Collect
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {deliveries.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-4">
                          No pending deliveries
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card className="border-blue-100 dark:border-blue-900/30">
              <CardHeader className="bg-blue-50 dark:bg-blue-900/10 rounded-t-lg">
                <CardTitle className="text-blue-800 dark:text-blue-300">Delivery History</CardTitle>
                <CardDescription className="text-blue-600 dark:text-blue-400">
                  View your past deliveries
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Shop</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Payment</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {deliveryHistory.map((delivery) => (
                      <TableRow key={delivery.id}>
                        <TableCell className="font-medium">{delivery.id}</TableCell>
                        <TableCell>{delivery.orderId}</TableCell>
                        <TableCell>{delivery.shop}</TableCell>
                        <TableCell>{delivery.date}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                            {delivery.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-green-500">{delivery.paymentStatus}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                    {deliveryHistory.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-4">
                          No delivery history
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments" className="space-y-4">
            <Card className="border-blue-100 dark:border-blue-900/30">
              <CardHeader className="bg-blue-50 dark:bg-blue-900/10 rounded-t-lg">
                <CardTitle className="text-blue-800 dark:text-blue-300">Payment Reports</CardTitle>
                <CardDescription className="text-blue-600 dark:text-blue-400">
                  Track payments collected from shops
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-green-50 dark:bg-green-900/10 border-green-100 dark:border-green-900/30">
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <p className="text-green-600 dark:text-green-400 text-sm font-medium">
                            Total Collected Today
                          </p>
                          <h3 className="text-2xl font-bold text-green-700 dark:text-green-300">$1,110.00</h3>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-yellow-50 dark:bg-yellow-900/10 border-yellow-100 dark:border-yellow-900/30">
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <p className="text-yellow-600 dark:text-yellow-400 text-sm font-medium">
                            Pending Collections
                          </p>
                          <h3 className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">$722.50</h3>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-blue-50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900/30">
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">Total Prepaid Orders</p>
                          <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-300">$387.50</h3>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Shop</TableHead>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Payment Method</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>2023-06-20</TableCell>
                        <TableCell>City Grocery</TableCell>
                        <TableCell>HD-1001</TableCell>
                        <TableCell>$385.00</TableCell>
                        <TableCell>Cash</TableCell>
                        <TableCell>
                          <Badge className="bg-green-500">Collected</Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" className="text-blue-600">
                            Receipt
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>2023-06-20</TableCell>
                        <TableCell>Corner Store</TableCell>
                        <TableCell>HD-1003</TableCell>
                        <TableCell>$387.50</TableCell>
                        <TableCell>Credit Card</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
                            Prepaid
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" className="text-blue-600">
                            Receipt
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>2023-06-20</TableCell>
                        <TableCell>Neighborhood Mart</TableCell>
                        <TableCell>HD-1005</TableCell>
                        <TableCell>$337.50</TableCell>
                        <TableCell>Cash</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
                            Pending
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700"
                            onClick={() => {
                              setCurrentDelivery({
                                id: "D-1005",
                                shop: "Neighborhood Mart",
                                paymentStatus: "Unpaid",
                                paymentMethod: "Cash on Delivery",
                                totalAmount: "$337.50",
                              })
                              setAmountCollected("337.50")
                              setIsPaymentDialogOpen(true)
                            }}
                          >
                            <DollarSign className="mr-2 h-3 w-3" />
                            Collect
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  onClick={() => {
                    toast({
                      title: "Payment report sent",
                      description: "Your payment collection report has been sent to the admin.",
                    })
                  }}
                >
                  Send Payment Report to Admin
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Update Delivery Dialog */}
        {isUpdateDialogOpen && currentDelivery && (
          <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Update Delivery Status</DialogTitle>
                <DialogDescription>
                  Update the status of delivery {currentDelivery.id} to {currentDelivery.shop}.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>Current Status</Label>
                  <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded">{currentDelivery.status || "Pending"}</div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="status">New Status</Label>
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="outline"
                      className={`justify-start text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700 ${currentDelivery.status === "Pending" ? "" : "opacity-50"}`}
                      disabled={currentDelivery.status !== "Pending"}
                      onClick={() => handleUpdateDelivery("In Transit")}
                    >
                      <Truck className="mr-2 h-4 w-4" />
                      In Transit
                    </Button>
                    <Button
                      variant="outline"
                      className={`justify-start text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700 ${currentDelivery.status === "In Transit" ? "" : "opacity-50"}`}
                      disabled={currentDelivery.status !== "In Transit"}
                      onClick={() => handleUpdateDelivery("Delivered")}
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Delivered
                    </Button>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="note">Note (Optional)</Label>
                  <Textarea
                    id="note"
                    value={updateNote}
                    onChange={(e) => setUpdateNote(e.target.value)}
                    placeholder="Add any additional information"
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsUpdateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={() =>
                    handleUpdateDelivery(currentDelivery.status === "Pending" ? "In Transit" : "Delivered")
                  }
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Update Status
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        {/* Collect Payment Dialog */}
        {isPaymentDialogOpen && currentDelivery && (
          <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Collect Payment</DialogTitle>
                <DialogDescription>
                  Collect payment for delivery {currentDelivery.id} to {currentDelivery.shop}.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="amount">Amount to Collect</Label>
                  <Input
                    id="amount"
                    type="text"
                    value={amountCollected}
                    onChange={(e) => setAmountCollected(e.target.value)}
                    placeholder="Enter amount"
                    className="font-mono"
                  />
                  {currentDelivery.totalAmount && (
                    <p className="text-sm text-muted-foreground">Expected amount: {currentDelivery.totalAmount}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label>Payment Method</Label>
                  <Select defaultValue="cash">
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="card">Credit/Debit Card</SelectItem>
                      <SelectItem value="mobile">Mobile Payment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="paymentNote">Note (Optional)</Label>
                  <Textarea id="paymentNote" placeholder="Add any payment notes" rows={2} />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsPaymentDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCollectPayment} className="bg-green-600 hover:bg-green-700">
                  Confirm Payment
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    )
  }

  // Admin view of drivers
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Drivers</h1>
        <p className="text-blue-600 dark:text-blue-400">Manage delivery drivers for your dairy products</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search drivers..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Driver
        </Button>
      </div>

      <Card className="border-blue-100 dark:border-blue-900/30">
        <CardHeader className="bg-blue-50 dark:bg-blue-900/10 rounded-t-lg">
          <CardTitle className="text-blue-800 dark:text-blue-300">Driver Directory</CardTitle>
          <CardDescription className="text-blue-600 dark:text-blue-400">
            A list of all drivers delivering your dairy products
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Vehicle</TableHead>
                <TableHead>License</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDrivers.map((driver) => (
                <TableRow key={driver.id}>
                  <TableCell className="font-medium">{driver.name}</TableCell>
                  <TableCell>{driver.email}</TableCell>
                  <TableCell>{driver.phone}</TableCell>
                  <TableCell>{driver.vehicle}</TableCell>
                  <TableCell>{driver.license}</TableCell>
                  <TableCell>
                    <Badge variant={driver.status === "active" ? "default" : "secondary"} className="capitalize">
                      {driver.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
              {filteredDrivers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    No drivers found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="border-blue-100 dark:border-blue-900/30">
        <CardHeader className="bg-blue-50 dark:bg-blue-900/10 rounded-t-lg">
          <CardTitle className="text-blue-800 dark:text-blue-300">Delivery Routes</CardTitle>
          <CardDescription className="text-blue-600 dark:text-blue-400">
            Manage predefined delivery routes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Route Name</TableHead>
                <TableHead>Shops</TableHead>
                <TableHead>Distance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deliveryRoutes.map((route) => (
                <TableRow key={route.id}>
                  <TableCell className="font-medium">{route.name}</TableCell>
                  <TableCell>{route.shops.join(", ")}</TableCell>
                  <TableCell>{route.distance}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

