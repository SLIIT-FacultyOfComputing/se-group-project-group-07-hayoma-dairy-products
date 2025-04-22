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
import {
  Search,
  Plus,
  ShoppingCart,
  AlertTriangle,
  DollarSign,
  Clock,
  CheckCircle,
  FileText,
  Trash2,
  Edit,
  MinusCircle,
  PlusCircle,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

// Sample shops data
const shopsList = [
  {
    id: 1,
    name: "City Grocery",
    contact: "Michael Brown",
    email: "michael@citygrocery.com",
    phone: "555-111-2222",
    address: "123 Main St, Downtown",
    status: "active",
  },
  {
    id: 2,
    name: "Fresh Market",
    contact: "Emily Davis",
    email: "emily@freshmarket.com",
    phone: "555-333-4444",
    address: "456 Oak Ave, Westside",
    status: "active",
  },
  {
    id: 3,
    name: "Corner Store",
    contact: "David Wilson",
    email: "david@cornerstore.com",
    phone: "555-555-6666",
    address: "789 Pine Rd, Northside",
    status: "inactive",
  },
  {
    id: 4,
    name: "Neighborhood Mart",
    contact: "Jessica Taylor",
    email: "jessica@neighborhoodmart.com",
    phone: "555-777-8888",
    address: "101 Elm Blvd, Eastside",
    status: "active",
  },
]

// Sample products that can be ordered
const availableProducts = [
  { id: 1, name: "Whole Milk 1L", category: "Milk", unit: "units", price: 5.99 },
  { id: 2, name: "Skim Milk 1L", category: "Milk", unit: "units", price: 4.99 },
  { id: 3, name: "Strawberry Yogurt 200g", category: "Yogurt", unit: "units", price: 3.49 },
  { id: 4, name: "Cheddar Cheese 500g", category: "Cheese", unit: "units", price: 7.99 },
  { id: 5, name: "Butter 250g", category: "Butter", unit: "units", price: 4.49 },
]

// Sample inventory for shop view
const initialShopInventory = [
  { id: 1, product: "Whole Milk 1L", quantity: 120, threshold: 50, status: "In Stock" },
  { id: 2, product: "Skim Milk 1L", quantity: 85, threshold: 40, status: "In Stock" },
  { id: 3, product: "Strawberry Yogurt 200g", quantity: 25, threshold: 30, status: "Low Stock" },
  { id: 4, product: "Cheddar Cheese 500g", quantity: 15, threshold: 20, status: "Low Stock" },
  { id: 5, product: "Butter 250g", quantity: 45, threshold: 25, status: "In Stock" },
]

// Sample order history
const orderHistory = [
  {
    id: "HD-1001",
    date: "2023-06-15",
    items: [
      { product: "Whole Milk 1L", quantity: 50, price: 5.99 },
      { product: "Skim Milk 1L", quantity: 30, price: 4.99 },
    ],
    total: 1245.0,
    status: "Delivered",
    paymentStatus: "Paid",
  },
  {
    id: "HD-1002",
    date: "2023-06-10",
    items: [
      { product: "Strawberry Yogurt 200g", quantity: 100, price: 3.49 },
      { product: "Butter 250g", quantity: 40, price: 4.49 },
    ],
    total: 980.0,
    status: "Delivered",
    paymentStatus: "Paid",
  },
  {
    id: "HD-1003",
    date: "2023-06-05",
    items: [
      { product: "Cheddar Cheese 500g", quantity: 25, price: 7.99 },
      { product: "Whole Milk 1L", quantity: 40, price: 5.99 },
    ],
    total: 875.0,
    status: "Delivered",
    paymentStatus: "Paid",
  },
]

// Sample pending orders
const pendingOrders = [
  {
    id: "HD-1004",
    date: "2023-06-18",
    items: [
      { product: "Whole Milk 1L", quantity: 60, price: 5.99 },
      { product: "Cheddar Cheese 500g", quantity: 30, price: 7.99 },
    ],
    total: 599.1,
    status: "Processing",
    paymentStatus: "Pending",
    estimatedDelivery: "2023-06-21",
  },
  {
    id: "HD-1005",
    date: "2023-06-19",
    items: [
      { product: "Strawberry Yogurt 200g", quantity: 80, price: 3.49 },
      { product: "Skim Milk 1L", quantity: 45, price: 4.99 },
    ],
    total: 503.75,
    status: "Confirmed",
    paymentStatus: "Pending",
    estimatedDelivery: "2023-06-22",
  },
]

// Sample due payments
const duePayments = [
  {
    id: "INV-1001",
    orderId: "HD-1004",
    amount: 599.1,
    dueDate: "2023-06-28",
    status: "Pending",
  },
  {
    id: "INV-1002",
    orderId: "HD-1005",
    amount: 503.75,
    dueDate: "2023-06-29",
    status: "Pending",
  },
  {
    id: "INV-1003",
    orderId: "HD-0998",
    amount: 450.25,
    dueDate: "2023-06-20",
    status: "Overdue",
  },
]

export default function ShopsPage() {
  const [user, setUser] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false)
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false)
  const [isAddProductDialogOpen, setIsAddProductDialogOpen] = useState(false)
  const [isEditProductDialogOpen, setIsEditProductDialogOpen] = useState(false)
  const [isDeleteProductDialogOpen, setIsDeleteProductDialogOpen] = useState(false)
  const [order, setOrder] = useState({
    product: "",
    quantity: "",
    notes: "",
    urgency: "normal",
  })
  const [inventory, setInventory] = useState(initialShopInventory)
  const [mounted, setMounted] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [lowStockItems, setLowStockItems] = useState([])
  const [cart, setCart] = useState([])
  const [selectedPayment, setSelectedPayment] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [newProduct, setNewProduct] = useState({
    product: "",
    quantity: "",
    threshold: "",
  })
  const [editProduct, setEditProduct] = useState({
    id: 0,
    product: "",
    quantity: "",
    threshold: "",
    status: "",
  })
  const [productToDelete, setProductToDelete] = useState(null)
  const [inventorySearch, setInventorySearch] = useState("")

  useEffect(() => {
    // Get user from localStorage
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }

    // Calculate low stock items
    const lowItems = inventory.filter((item) => item.status === "Low Stock" || item.quantity < item.threshold)
    setLowStockItems(lowItems)

    setMounted(true)
  }, [inventory])

  const filteredShops = shopsList.filter(
    (shop) =>
      shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shop.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shop.address.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredInventory = inventory.filter((item) =>
    item.product.toLowerCase().includes(inventorySearch.toLowerCase()),
  )

  const handleAddToCart = () => {
    if (!order.product || !order.quantity || Number(order.quantity) <= 0) {
      toast({
        title: "Missing information",
        description: "Please select a product and enter a valid quantity.",
        variant: "destructive",
      })
      return
    }

    const selectedProductDetails = availableProducts.find((p) => p.name === order.product)

    if (!selectedProductDetails) {
      toast({
        title: "Product not found",
        description: "The selected product could not be found.",
        variant: "destructive",
      })
      return
    }

    const newItem = {
      product: order.product,
      quantity: Number(order.quantity),
      price: selectedProductDetails.price,
      subtotal: selectedProductDetails.price * Number(order.quantity),
      notes: order.notes,
    }

    setCart([...cart, newItem])

    toast({
      title: "Product added to cart",
      description: `Added ${order.quantity} units of ${order.product} to your order.`,
    })

    // Reset form
    setOrder({
      product: "",
      quantity: "",
      notes: "",
      urgency: order.urgency, // Keep the urgency
    })
  }

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      toast({
        title: "Empty cart",
        description: "Please add at least one product to your order.",
        variant: "destructive",
      })
      return
    }

    // Calculate total
    const total = cart.reduce((sum, item) => sum + item.subtotal, 0)

    // In a real app, you would send this order to your backend
    toast({
      title: "Order placed successfully",
      description: `Your order for ${cart.length} products with total $${total.toFixed(2)} has been placed.`,
    })

    // Update the inventory status for ordered products
    const updatedInventory = inventory.map((item) => {
      const orderedItem = cart.find((cartItem) => cartItem.product === item.product)
      if (orderedItem) {
        return { ...item, status: "Ordered" }
      }
      return item
    })

    setInventory(updatedInventory)
    setIsOrderDialogOpen(false)
    setCart([])
    setOrder({
      product: "",
      quantity: "",
      notes: "",
      urgency: "normal",
    })
  }

  const handleRemoveFromCart = (index) => {
    const newCart = [...cart]
    newCart.splice(index, 1)
    setCart(newCart)
  }

  const handlePayment = () => {
    if (!selectedPayment) {
      toast({
        title: "No payment selected",
        description: "Please select an invoice to pay.",
        variant: "destructive",
      })
      return
    }

    // In a real app, you would process the payment through your backend
    toast({
      title: "Payment successful",
      description: `Payment of $${selectedPayment.amount.toFixed(2)} for invoice ${selectedPayment.id} has been processed.`,
    })

    setIsPaymentDialogOpen(false)
    setSelectedPayment(null)
    setPaymentMethod("credit-card")
  }

  // Add new product to inventory
  const handleAddProduct = () => {
    if (!newProduct.product || !newProduct.quantity || !newProduct.threshold) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    const quantity = Number(newProduct.quantity)
    const threshold = Number(newProduct.threshold)

    if (isNaN(quantity) || isNaN(threshold) || quantity < 0 || threshold < 0) {
      toast({
        title: "Invalid values",
        description: "Please enter valid numbers for quantity and threshold.",
        variant: "destructive",
      })
      return
    }

    // Check if product already exists
    if (inventory.some((item) => item.product === newProduct.product)) {
      toast({
        title: "Product exists",
        description: "This product already exists in your inventory. Please update the existing product instead.",
        variant: "destructive",
      })
      return
    }

    const newId = Math.max(...inventory.map((item) => item.id), 0) + 1
    const status = quantity < threshold ? "Low Stock" : "In Stock"

    const newItem = {
      id: newId,
      product: newProduct.product,
      quantity,
      threshold,
      status,
    }

    setInventory([...inventory, newItem])
    setIsAddProductDialogOpen(false)
    setNewProduct({
      product: "",
      quantity: "",
      threshold: "",
    })

    toast({
      title: "Product added",
      description: `${newProduct.product} has been added to your inventory.`,
    })
  }

  // Update existing product
  const handleEditProduct = () => {
    if (!editProduct.product || !editProduct.quantity || !editProduct.threshold) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    const quantity = Number(editProduct.quantity)
    const threshold = Number(editProduct.threshold)

    if (isNaN(quantity) || isNaN(threshold) || quantity < 0 || threshold < 0) {
      toast({
        title: "Invalid values",
        description: "Please enter valid numbers for quantity and threshold.",
        variant: "destructive",
      })
      return
    }

    const status = quantity < threshold ? "Low Stock" : "In Stock"

    const updatedInventory = inventory.map((item) =>
      item.id === editProduct.id ? { ...item, product: editProduct.product, quantity, threshold, status } : item,
    )

    setInventory(updatedInventory)
    setIsEditProductDialogOpen(false)

    toast({
      title: "Product updated",
      description: `${editProduct.product} has been updated in your inventory.`,
    })
  }

  // Delete product from inventory
  const handleDeleteProduct = () => {
    if (!productToDelete) return

    const updatedInventory = inventory.filter((item) => item.id !== productToDelete.id)
    setInventory(updatedInventory)
    setIsDeleteProductDialogOpen(false)
    setProductToDelete(null)

    toast({
      title: "Product removed",
      description: `${productToDelete.product} has been removed from your inventory.`,
    })
  }

  // Adjust product quantity
  const handleAdjustQuantity = (id, amount) => {
    const updatedInventory = inventory.map((item) => {
      if (item.id === id) {
        const newQuantity = Math.max(0, item.quantity + amount)
        const status = newQuantity < item.threshold ? "Low Stock" : "In Stock"
        return { ...item, quantity: newQuantity, status }
      }
      return item
    })

    setInventory(updatedInventory)

    const product = inventory.find((item) => item.id === id)
    toast({
      title: amount > 0 ? "Quantity increased" : "Quantity decreased",
      description: `${product.product} quantity ${amount > 0 ? "increased" : "decreased"} by ${Math.abs(amount)}.`,
    })
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount)
  }

  if (!mounted) {
    return <div>Loading...</div>
  }

  // If user is a shop, show shop dashboard
  if (user?.role === "shop") {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Shop Dashboard</h1>
          <p className="text-blue-600 dark:text-blue-400">Manage your product inventory and place orders when needed</p>
        </div>

        {lowStockItems.length > 0 && (
          <Card className="border-amber-100 bg-amber-50 dark:border-amber-900/30 dark:bg-amber-900/10">
            <CardHeader>
              <CardTitle className="text-amber-800 dark:text-amber-300 flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5" />
                Low Stock Alert
              </CardTitle>
              <CardDescription className="text-amber-600 dark:text-amber-400">
                The following products are running low and need to be reordered
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {lowStockItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center p-2 bg-white dark:bg-gray-800 rounded-md border border-amber-200 dark:border-amber-900/50"
                  >
                    <div>
                      <p className="font-medium">{item.product}</p>
                      <p className="text-sm text-gray-500">
                        Current stock: {item.quantity} units (Threshold: {item.threshold})
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedProduct(item)
                        setOrder({
                          product: item.product,
                          quantity: "",
                          notes: "",
                          urgency: "high",
                        })
                        setCart([])
                        setIsOrderDialogOpen(true)
                      }}
                      className="text-amber-600 border-amber-200 hover:bg-amber-50 hover:text-amber-700 dark:text-amber-400 dark:border-amber-900/50 dark:hover:bg-amber-900/20"
                    >
                      <ShoppingCart className="mr-2 h-3 w-3" />
                      Order Now
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="inventory" className="space-y-4">
          <TabsList className="bg-blue-100 dark:bg-blue-900/30">
            <TabsTrigger
              value="inventory"
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800"
            >
              Inventory
            </TabsTrigger>
            <TabsTrigger value="orders" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
              Order History
            </TabsTrigger>
            <TabsTrigger value="pending" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
              Pending Orders
            </TabsTrigger>
            <TabsTrigger value="payments" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
              Due Payments
            </TabsTrigger>
          </TabsList>

          <TabsContent value="inventory" className="space-y-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="relative w-full md:max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search inventory..."
                  className="pl-8"
                  value={inventorySearch}
                  onChange={(e) => setInventorySearch(e.target.value)}
                />
              </div>
              <Button
                onClick={() => {
                  setNewProduct({
                    product: "",
                    quantity: "",
                    threshold: "",
                  })
                  setIsAddProductDialogOpen(true)
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add New Product
              </Button>
            </div>

            <Card className="border-blue-100 dark:border-blue-900/30">
              <CardHeader className="bg-blue-50 dark:bg-blue-900/10 rounded-t-lg">
                <CardTitle className="text-blue-800 dark:text-blue-300">Product Inventory</CardTitle>
                <CardDescription className="text-blue-600 dark:text-blue-400">
                  Manage your dairy product inventory and place orders when needed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Threshold</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInventory.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.product}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span>{item.quantity} units</span>
                            <div className="flex gap-1">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-6 w-6 rounded-full"
                                onClick={() => handleAdjustQuantity(item.id, -1)}
                              >
                                <MinusCircle className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-6 w-6 rounded-full"
                                onClick={() => handleAdjustQuantity(item.id, 1)}
                              >
                                <PlusCircle className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{item.threshold} units</TableCell>
                        <TableCell>
                          {item.status === "In Stock" && <Badge className="bg-green-500">In Stock</Badge>}
                          {item.status === "Low Stock" && <Badge variant="destructive">Low Stock</Badge>}
                          {item.status === "Ordered" && (
                            <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
                              Ordered
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedProduct(item)
                                setOrder({
                                  product: item.product,
                                  quantity: "",
                                  notes: "",
                                  urgency: item.status === "Low Stock" ? "high" : "normal",
                                })
                                setCart([])
                                setIsOrderDialogOpen(true)
                              }}
                              className="text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                            >
                              <ShoppingCart className="mr-2 h-3 w-3" />
                              Order
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setEditProduct({
                                  id: item.id,
                                  product: item.product,
                                  quantity: item.quantity.toString(),
                                  threshold: item.threshold.toString(),
                                  status: item.status,
                                })
                                setIsEditProductDialogOpen(true)
                              }}
                              className="text-amber-600 border-amber-200 hover:bg-amber-50 hover:text-amber-700"
                            >
                              <Edit className="mr-2 h-3 w-3" />
                              Edit
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setProductToDelete(item)
                                setIsDeleteProductDialogOpen(true)
                              }}
                              className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                            >
                              <Trash2 className="mr-2 h-3 w-3" />
                              Remove
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredInventory.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-4">
                          No products found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => {
                    setCart([])
                    setOrder({
                      product: "",
                      quantity: "",
                      notes: "",
                      urgency: "normal",
                    })
                    setIsOrderDialogOpen(true)
                  }}
                  className="ml-auto"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Place New Order
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-4">
            <Card className="border-blue-100 dark:border-blue-900/30">
              <CardHeader className="bg-blue-50 dark:bg-blue-900/10 rounded-t-lg">
                <CardTitle className="text-blue-800 dark:text-blue-300">Order History</CardTitle>
                <CardDescription className="text-blue-600 dark:text-blue-400">
                  View your past orders and their status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orderHistory.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>
                          {order.items.map((item, index) => (
                            <div key={index}>
                              {item.quantity} x {item.product}
                            </div>
                          ))}
                        </TableCell>
                        <TableCell>{formatCurrency(order.total)}</TableCell>
                        <TableCell>
                          <Badge className={order.status === "Delivered" ? "bg-green-500" : "bg-blue-500"}>
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={order.paymentStatus === "Paid" ? "default" : "destructive"}>
                            {order.paymentStatus}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" className="text-blue-600">
                            <FileText className="mr-2 h-3 w-3" />
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            <Card className="border-blue-100 dark:border-blue-900/30">
              <CardHeader className="bg-blue-50 dark:bg-blue-900/10 rounded-t-lg">
                <CardTitle className="text-blue-800 dark:text-blue-300">Pending Orders</CardTitle>
                <CardDescription className="text-blue-600 dark:text-blue-400">
                  Track your current orders and their status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead>Est. Delivery</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>
                          {order.items.map((item, index) => (
                            <div key={index}>
                              {item.quantity} x {item.product}
                            </div>
                          ))}
                        </TableCell>
                        <TableCell>{formatCurrency(order.total)}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              order.status === "Processing"
                                ? "bg-yellow-100 text-yellow-800 border-yellow-300"
                                : "bg-blue-100 text-blue-800 border-blue-300"
                            }
                          >
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={order.paymentStatus === "Paid" ? "default" : "secondary"}>
                            {order.paymentStatus}
                          </Badge>
                        </TableCell>
                        <TableCell>{order.estimatedDelivery}</TableCell>
                      </TableRow>
                    ))}
                    {pendingOrders.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-4">
                          No pending orders found
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
                <CardTitle className="text-blue-800 dark:text-blue-300">Due Payments</CardTitle>
                <CardDescription className="text-blue-600 dark:text-blue-400">
                  Manage your pending and overdue payments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice ID</TableHead>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {duePayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">{payment.id}</TableCell>
                        <TableCell>{payment.orderId}</TableCell>
                        <TableCell>{formatCurrency(payment.amount)}</TableCell>
                        <TableCell>{payment.dueDate}</TableCell>
                        <TableCell>
                          <Badge
                            variant={payment.status === "Overdue" ? "destructive" : "outline"}
                            className={
                              payment.status !== "Overdue" ? "bg-yellow-100 text-yellow-800 border-yellow-300" : ""
                            }
                          >
                            {payment.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedPayment(payment)
                              setIsPaymentDialogOpen(true)
                            }}
                            className="text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700"
                          >
                            <DollarSign className="mr-2 h-3 w-3" />
                            Pay Now
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {duePayments.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-4">
                          No due payments found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-3">
              <Card className="bg-white dark:bg-gray-800">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="rounded-full bg-yellow-100 p-3">
                      <Clock className="h-6 w-6 text-yellow-600" />
                    </div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Pending Payments</p>
                    <h3 className="text-2xl font-bold">{duePayments.filter((p) => p.status === "Pending").length}</h3>
                    <p className="text-sm text-yellow-600">
                      {formatCurrency(
                        duePayments.filter((p) => p.status === "Pending").reduce((sum, p) => sum + p.amount, 0),
                      )}
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
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Overdue Payments</p>
                    <h3 className="text-2xl font-bold">{duePayments.filter((p) => p.status === "Overdue").length}</h3>
                    <p className="text-sm text-red-600">
                      {formatCurrency(
                        duePayments.filter((p) => p.status === "Overdue").reduce((sum, p) => sum + p.amount, 0),
                      )}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="rounded-full bg-green-100 p-3">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Paid This Month</p>
                    <h3 className="text-2xl font-bold">{orderHistory.length}</h3>
                    <p className="text-sm text-green-600">
                      {formatCurrency(orderHistory.reduce((sum, order) => sum + order.total, 0))}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Order Dialog */}
        <Dialog open={isOrderDialogOpen} onOpenChange={setIsOrderDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Place Product Order</DialogTitle>
              <DialogDescription>Order additional products from Hayoma Dairy factory.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="product">Product</Label>
                  <Select value={order.product} onValueChange={(value) => setOrder({ ...order, product: value })}>
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
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="quantity">Quantity (units)</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={order.quantity}
                    onChange={(e) => setOrder({ ...order, quantity: e.target.value })}
                    placeholder="Enter quantity"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="urgency">Urgency</Label>
                <Select value={order.urgency} onValueChange={(value) => setOrder({ ...order, urgency: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select urgency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low - Within 2 weeks</SelectItem>
                    <SelectItem value="normal">Normal - Within 1 week</SelectItem>
                    <SelectItem value="high">High - Within 3 days</SelectItem>
                    <SelectItem value="urgent">Urgent - Next day delivery</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  value={order.notes}
                  onChange={(e) => setOrder({ ...order, notes: e.target.value })}
                  placeholder="Add any special instructions"
                  rows={2}
                />
              </div>
              <Button onClick={handleAddToCart} disabled={!order.product || !order.quantity} className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>

              {cart.length > 0 && (
                <div className="border rounded-md p-4 mt-2">
                  <h3 className="font-medium mb-2">Order Cart</h3>
                  <div className="space-y-2 max-h-40 overflow-y-auto mb-2">
                    {cart.map((item, index) => (
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
                          onClick={() => handleRemoveFromCart(index)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Total:</span>
                    <span>{formatCurrency(cart.reduce((sum, item) => sum + item.subtotal, 0))}</span>
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsOrderDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handlePlaceOrder} disabled={cart.length === 0} className="bg-blue-600 hover:bg-blue-700">
                Place Order
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Payment Dialog */}
        <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Make Payment</DialogTitle>
              <DialogDescription>
                Pay for invoice {selectedPayment?.id} related to order {selectedPayment?.orderId}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="bg-blue-50 p-4 rounded-md">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Invoice Amount:</span>
                  <span className="font-bold">{selectedPayment ? formatCurrency(selectedPayment.amount) : "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Due Date:</span>
                  <span>{selectedPayment?.dueDate || "-"}</span>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="payment-method">Payment Method</Label>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="credit-card">Credit Card</SelectItem>
                    <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                    <SelectItem value="paypal">PayPal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {paymentMethod === "credit-card" && (
                <>
                  <div className="grid gap-2">
                    <Label htmlFor="card-number">Card Number</Label>
                    <Input id="card-number" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" placeholder="123" />
                    </div>
                  </div>
                </>
              )}
              {paymentMethod === "bank-transfer" && (
                <div className="grid gap-2">
                  <Label htmlFor="reference">Payment Reference</Label>
                  <Input id="reference" placeholder="Enter payment reference" />
                </div>
              )}
              {paymentMethod === "paypal" && (
                <div className="grid gap-2">
                  <Label htmlFor="paypal-email">PayPal Email</Label>
                  <Input id="paypal-email" type="email" placeholder="Enter your PayPal email" />
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsPaymentDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handlePayment} className="bg-green-600 hover:bg-green-700">
                Complete Payment
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add Product Dialog */}
        <Dialog open={isAddProductDialogOpen} onOpenChange={setIsAddProductDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>Add a new product to your inventory</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="product">Product</Label>
                <Select
                  value={newProduct.product}
                  onValueChange={(value) => setNewProduct({ ...newProduct, product: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select product" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableProducts
                      .filter((product) => !inventory.some((item) => item.product === product.name))
                      .map((product) => (
                        <SelectItem key={product.id} value={product.name}>
                          {product.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="quantity">Initial Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={newProduct.quantity}
                    onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
                    placeholder="Enter quantity"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="threshold">Threshold</Label>
                  <Input
                    id="threshold"
                    type="number"
                    value={newProduct.threshold}
                    onChange={(e) => setNewProduct({ ...newProduct, threshold: e.target.value })}
                    placeholder="Enter threshold"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddProductDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddProduct} className="bg-blue-600 hover:bg-blue-700">
                Add Product
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Product Dialog */}
        <Dialog open={isEditProductDialogOpen} onOpenChange={setIsEditProductDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
              <DialogDescription>Update product details in your inventory</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-product">Product</Label>
                <Input id="edit-product" value={editProduct.product} readOnly />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-quantity">Quantity</Label>
                  <Input
                    id="edit-quantity"
                    type="number"
                    value={editProduct.quantity}
                    onChange={(e) => setEditProduct({ ...editProduct, quantity: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-threshold">Threshold</Label>
                  <Input
                    id="edit-threshold"
                    type="number"
                    value={editProduct.threshold}
                    onChange={(e) => setEditProduct({ ...editProduct, threshold: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditProductDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditProduct} className="bg-blue-600 hover:bg-blue-700">
                Update Product
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Product Confirmation */}
        <AlertDialog open={isDeleteProductDialogOpen} onOpenChange={setIsDeleteProductDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will remove {productToDelete?.product} from your inventory. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteProduct} className="bg-red-600 hover:bg-red-700">
                Remove
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    )
  }

  // Admin view of shops
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Shops</h1>
        <p className="text-blue-600 dark:text-blue-400">Manage retail shops that sell your dairy products</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search shops..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Shop
        </Button>
      </div>

      <Card className="border-blue-100 dark:border-blue-900/30">
        <CardHeader className="bg-blue-50 dark:bg-blue-900/10 rounded-t-lg">
          <CardTitle className="text-blue-800 dark:text-blue-300">Shop Directory</CardTitle>
          <CardDescription className="text-blue-600 dark:text-blue-400">
            A list of all retail shops selling your dairy products
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredShops.map((shop) => (
                <TableRow key={shop.id}>
                  <TableCell className="font-medium">{shop.name}</TableCell>
                  <TableCell>{shop.contact}</TableCell>
                  <TableCell>{shop.email}</TableCell>
                  <TableCell>{shop.phone}</TableCell>
                  <TableCell>{shop.address}</TableCell>
                  <TableCell>
                    <Badge variant={shop.status === "active" ? "default" : "secondary"} className="capitalize">
                      {shop.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
              {filteredShops.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    No shops found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

