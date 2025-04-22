"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
import { Search, Plus, Filter, FileText, XCircle, Clock, DollarSign } from "lucide-react"
import { toast } from "@/hooks/use-toast"

// Sample orders data
const initialOrders = [
  {
    id: "HD-1001",
    shop: "City Grocery",
    date: "2023-06-15",
    items: [
      { product: "Whole Milk 1L", quantity: 50, price: 5.99 },
      { product: "Skim Milk 1L", quantity: 30, price: 4.99 },
    ],
    total: 1245.0,
    status: "Delivered",
    paymentStatus: "Paid",
    deliveryDate: "2023-06-17",
    driver: "James Anderson",
  },
  {
    id: "HD-1002",
    shop: "Fresh Market",
    date: "2023-06-16",
    items: [
      { product: "Strawberry Yogurt 200g", quantity: 100, price: 3.49 },
      { product: "Butter 250g", quantity: 40, price: 4.49 },
    ],
    total: 2150.0,
    status: "Processing",
    paymentStatus: "Paid",
    deliveryDate: "2023-06-19",
    driver: "Maria Garcia",
  },
  {
    id: "HD-1003",
    shop: "Corner Store",
    date: "2023-06-16",
    items: [
      { product: "Cheddar Cheese 500g", quantity: 25, price: 7.99 },
      { product: "Whole Milk 1L", quantity: 40, price: 5.99 },
    ],
    total: 780.0,
    status: "Pending",
    paymentStatus: "Unpaid",
    deliveryDate: "2023-06-20",
    driver: "James Anderson",
  },
  {
    id: "HD-1004",
    shop: "Neighborhood Mart",
    date: "2023-06-17",
    items: [
      { product: "Whole Milk 1L", quantity: 60, price: 5.99 },
      { product: "Cheddar Cheese 500g", quantity: 30, price: 7.99 },
    ],
    total: 1560.0,
    status: "Processing",
    paymentStatus: "Paid",
    deliveryDate: "2023-06-21",
    driver: "Linda Martinez",
  },
  {
    id: "HD-1005",
    shop: "City Grocery",
    date: "2023-06-17",
    items: [
      { product: "Strawberry Yogurt 200g", quantity: 80, price: 3.49 },
      { product: "Skim Milk 1L", quantity: 45, price: 4.99 },
    ],
    total: 950.0,
    status: "Pending",
    paymentStatus: "Unpaid",
    deliveryDate: "2023-06-22",
    driver: "Maria Garcia",
  },
]

// Sample products for creating orders
const availableProducts = [
  { id: 1, name: "Whole Milk 1L", category: "Milk", unit: "units", price: 5.99 },
  { id: 2, name: "Skim Milk 1L", category: "Milk", unit: "units", price: 4.99 },
  { id: 3, name: "Strawberry Yogurt 200g", category: "Yogurt", unit: "units", price: 3.49 },
  { id: 4, name: "Cheddar Cheese 500g", category: "Cheese", unit: "units", price: 7.99 },
  { id: 5, name: "Butter 250g", category: "Butter", unit: "units", price: 4.49 },
]

// Sample shops
const shops = [
  { id: 1, name: "City Grocery", address: "123 Main St, Downtown" },
  { id: 2, name: "Fresh Market", address: "456 Oak Ave, Westside" },
  { id: 3, name: "Corner Store", address: "789 Pine Rd, Northside" },
  { id: 4, name: "Neighborhood Mart", address: "101 Elm Blvd, Eastside" },
]

// Sample drivers
const drivers = [
  { id: 1, name: "James Anderson", vehicle: "Truck #101" },
  { id: 2, name: "Maria Garcia", vehicle: "Van #202" },
  { id: 3, name: "Linda Martinez", vehicle: "Van #404" },
]

export default function OrdersPage() {
  const [orders, setOrders] = useState(initialOrders)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [paymentFilter, setPaymentFilter] = useState("all")
  const [isCreateOrderOpen, setIsCreateOrderOpen] = useState(false)
  const [isViewOrderOpen, setIsViewOrderOpen] = useState(false)
  const [isUpdateStatusOpen, setIsUpdateStatusOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [newOrderItems, setNewOrderItems] = useState([])
  const [newOrderShop, setNewOrderShop] = useState("")
  const [newOrderDriver, setNewOrderDriver] = useState("")
  const [newOrderDeliveryDate, setNewOrderDeliveryDate] = useState("")
  const [newOrderNotes, setNewOrderNotes] = useState("")
  const [newStatus, setNewStatus] = useState("")
  const [newPaymentStatus, setNewPaymentStatus] = useState("")
  const [currentProduct, setCurrentProduct] = useState({ product: "", quantity: "", price: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const filteredOrders = orders.filter(
    (order) =>
      (statusFilter === "all" || order.status.toLowerCase() === statusFilter) &&
      (paymentFilter === "all" || order.paymentStatus.toLowerCase() === paymentFilter.toLowerCase()) &&
      (order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.shop.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const handleAddProduct = () => {
    if (!currentProduct.product || !currentProduct.quantity || Number(currentProduct.quantity) <= 0) {
      toast({
        title: "Invalid product",
        description: "Please select a product and enter a valid quantity.",
        variant: "destructive",
      })
      return
    }

    const selectedProduct = availableProducts.find((p) => p.name === currentProduct.product)
    if (!selectedProduct) return

    const newItem = {
      product: currentProduct.product,
      quantity: Number(currentProduct.quantity),
      price: selectedProduct.price,
      subtotal: selectedProduct.price * Number(currentProduct.quantity),
    }

    setNewOrderItems([...newOrderItems, newItem])
    setCurrentProduct({ product: "", quantity: "", price: 0 })
  }

  const handleRemoveProduct = (index) => {
    const updatedItems = [...newOrderItems]
    updatedItems.splice(index, 1)
    setNewOrderItems(updatedItems)
  }

  const handleCreateOrder = () => {
    if (!newOrderShop || !newOrderDriver || !newOrderDeliveryDate || newOrderItems.length === 0) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields and add at least one product.",
        variant: "destructive",
      })
      return
    }

    const total = newOrderItems.reduce((sum, item) => sum + item.subtotal, 0)
    const newOrder = {
      id: `HD-${1000 + orders.length + 1}`,
      shop: newOrderShop,
      date: new Date().toISOString().split("T")[0],
      items: newOrderItems,
      total,
      status: "Pending",
      paymentStatus: "Unpaid",
      deliveryDate: newOrderDeliveryDate,
      driver: newOrderDriver,
      notes: newOrderNotes,
    }

    setOrders([newOrder, ...orders])
    resetNewOrderForm()
    setIsCreateOrderOpen(false)

    toast({
      title: "Order created",
      description: `Order ${newOrder.id} has been created successfully.`,
    })
  }

  const handleUpdateStatus = () => {
    if (!selectedOrder || !newStatus) return

    const updatedOrders = orders.map((order) =>
      order.id === selectedOrder.id
        ? {
            ...order,
            status: newStatus,
            paymentStatus: newPaymentStatus || order.paymentStatus,
          }
        : order,
    )

    setOrders(updatedOrders)
    setIsUpdateStatusOpen(false)

    toast({
      title: "Order updated",
      description: `Order ${selectedOrder.id} status has been updated to ${newStatus}.`,
    })
  }

  const resetNewOrderForm = () => {
    setNewOrderItems([])
    setNewOrderShop("")
    setNewOrderDriver("")
    setNewOrderDeliveryDate("")
    setNewOrderNotes("")
    setCurrentProduct({ product: "", quantity: "", price: 0 })
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount)
  }

  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return <Badge className="bg-green-500">Delivered</Badge>
      case "processing":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
            Processing
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
            Pending
          </Badge>
        )
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getPaymentBadge = (status) => {
    switch (status.toLowerCase()) {
      case "paid":
        return <Badge className="bg-green-500">Paid</Badge>
      case "unpaid":
        return <Badge variant="destructive">Unpaid</Badge>
      case "partial":
        return (
          <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-300">
            Partial
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  if (!mounted) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
          <p className="text-blue-600 dark:text-blue-400">Manage and track customer orders</p>
        </div>
        <Button
          onClick={() => {
            resetNewOrderForm()
            setIsCreateOrderOpen(true)
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Order
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search orders..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <Select value={paymentFilter} onValueChange={setPaymentFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter by payment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Payments</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="unpaid">Unpaid</SelectItem>
                <SelectItem value="partial">Partial</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Card className="border-blue-100 dark:border-blue-900/30">
        <CardHeader className="bg-blue-50 dark:bg-blue-900/10 rounded-t-lg">
          <CardTitle className="text-blue-800 dark:text-blue-300">Order Management</CardTitle>
          <CardDescription className="text-blue-600 dark:text-blue-400">
            View and manage all customer orders in one place
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Shop</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Delivery Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.shop}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>{formatCurrency(order.total)}</TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell>{getPaymentBadge(order.paymentStatus)}</TableCell>
                    <TableCell>{order.deliveryDate}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedOrder(order)
                            setIsViewOrderOpen(true)
                          }}
                          className="text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                        >
                          <FileText className="mr-2 h-3 w-3" />
                          View
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedOrder(order)
                            setNewStatus(order.status)
                            setNewPaymentStatus(order.paymentStatus)
                            setIsUpdateStatusOpen(true)
                          }}
                          className="text-amber-600 border-amber-200 hover:bg-amber-50 hover:text-amber-700"
                        >
                          <Clock className="mr-2 h-3 w-3" />
                          Update
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-4">
                    No orders found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Create Order Dialog */}
      <Dialog open={isCreateOrderOpen} onOpenChange={setIsCreateOrderOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Create New Order</DialogTitle>
            <DialogDescription>Create a new order for a shop.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="shop">Shop</Label>
                <Select value={newOrderShop} onValueChange={setNewOrderShop}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select shop" />
                  </SelectTrigger>
                  <SelectContent>
                    {shops.map((shop) => (
                      <SelectItem key={shop.id} value={shop.name}>
                        {shop.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="driver">Driver</Label>
                <Select value={newOrderDriver} onValueChange={setNewOrderDriver}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select driver" />
                  </SelectTrigger>
                  <SelectContent>
                    {drivers.map((driver) => (
                      <SelectItem key={driver.id} value={driver.name}>
                        {driver.name} ({driver.vehicle})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="delivery-date">Delivery Date</Label>
              <Input
                id="delivery-date"
                type="date"
                value={newOrderDeliveryDate}
                onChange={(e) => setNewOrderDeliveryDate(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>Add Products</Label>
              <div className="grid grid-cols-3 gap-2">
                <Select
                  value={currentProduct.product}
                  onValueChange={(value) => {
                    const product = availableProducts.find((p) => p.name === value)
                    setCurrentProduct({ ...currentProduct, product: value, price: product?.price || 0 })
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select product" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableProducts.map((product) => (
                      <SelectItem key={product.id} value={product.name}>
                        {product.name} ({formatCurrency(product.price)})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  type="number"
                  placeholder="Quantity"
                  value={currentProduct.quantity}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, quantity: e.target.value })}
                />
                <Button onClick={handleAddProduct} disabled={!currentProduct.product || !currentProduct.quantity}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add
                </Button>
              </div>
            </div>
            {newOrderItems.length > 0 && (
              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-2">Order Items</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto mb-2">
                  {newOrderItems.map((item, index) => (
                    <div key={index} className="flex justify-between items-center border-b pb-2">
                      <div>
                        <p>
                          {item.quantity} x {item.product}
                        </p>
                        <p className="text-sm text-gray-500">{formatCurrency(item.subtotal)}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveProduct(index)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between font-medium">
                  <span>Total:</span>
                  <span>{formatCurrency(newOrderItems.reduce((sum, item) => sum + item.subtotal, 0))}</span>
                </div>
              </div>
            )}
            <div className="grid gap-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                value={newOrderNotes}
                onChange={(e) => setNewOrderNotes(e.target.value)}
                placeholder="Add any special instructions or notes"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateOrderOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateOrder} className="bg-blue-600 hover:bg-blue-700">
              Create Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Order Dialog */}
      {selectedOrder && (
        <Dialog open={isViewOrderOpen} onOpenChange={setIsViewOrderOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Order Details</DialogTitle>
              <DialogDescription>View details for order {selectedOrder.id}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Order ID</p>
                  <p className="font-medium">{selectedOrder.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Date</p>
                  <p>{selectedOrder.date}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Shop</p>
                  <p>{selectedOrder.shop}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Driver</p>
                  <p>{selectedOrder.driver}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <div className="mt-1">{getStatusBadge(selectedOrder.status)}</div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Payment</p>
                  <div className="mt-1">{getPaymentBadge(selectedOrder.paymentStatus)}</div>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-2">Order Items</p>
                <div className="border rounded-md p-3 space-y-2">
                  {selectedOrder.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center border-b pb-2 last:border-0 last:pb-0"
                    >
                      <div>
                        <p>
                          {item.quantity} x {item.product}
                        </p>
                        <p className="text-sm text-gray-500">Unit Price: {formatCurrency(item.price)}</p>
                      </div>
                      <p className="font-medium">{formatCurrency(item.price * item.quantity)}</p>
                    </div>
                  ))}
                  <div className="flex justify-between font-bold pt-2 border-t">
                    <span>Total:</span>
                    <span>{formatCurrency(selectedOrder.total)}</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Delivery Date</p>
                  <p>{selectedOrder.deliveryDate}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Notes</p>
                  <p>{selectedOrder.notes || "No notes"}</p>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsViewOrderOpen(false)}>
                Close
              </Button>
              <Button
                onClick={() => {
                  setIsViewOrderOpen(false)
                  setNewStatus(selectedOrder.status)
                  setNewPaymentStatus(selectedOrder.paymentStatus)
                  setIsUpdateStatusOpen(true)
                }}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Update Status
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Update Status Dialog */}
      {selectedOrder && (
        <Dialog open={isUpdateStatusOpen} onOpenChange={setIsUpdateStatusOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Order Status</DialogTitle>
              <DialogDescription>Update status for order {selectedOrder.id}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="status">Order Status</Label>
                <Select value={newStatus} onValueChange={setNewStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Processing">Processing</SelectItem>
                    <SelectItem value="Delivered">Delivered</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="payment-status">Payment Status</Label>
                <Select value={newPaymentStatus} onValueChange={setNewPaymentStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Paid">Paid</SelectItem>
                    <SelectItem value="Unpaid">Unpaid</SelectItem>
                    <SelectItem value="Partial">Partial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsUpdateStatusOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateStatus} className="bg-blue-600 hover:bg-blue-700">
                Update Status
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

