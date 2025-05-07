
"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
  Download,
  Upload,
  BarChart,
  Users,
  Package,
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
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { saveAs } from "file-saver"
import Papa from "papaparse"

// Type Definitions
interface Shop {
  id: number
  name: string
  contact: string
  email: string
  phone: string
  address: string
  status: "active" | "inactive" | "suspended"
  createdAt: string
  updatedAt: string
  manager: string
  region: string
}

interface Product {
  id: number
  name: string
  category: string
  unit: string
  price: number
  description: string
  sku: string
  stock: number
}

interface InventoryItem {
  id: number
  product: string
  quantity: number
  threshold: number
  status: "In Stock" | "Low Stock" | "Out of Stock" | "Ordered"
  lastUpdated: string
}

interface OrderItem {
  product: string
  quantity: number
  price: number
  subtotal: number
  notes?: string
}

interface Order {
  id: string
  date: string
  items: OrderItem[]
  total: number
  status: "Delivered" | "Processing" | "Confirmed" | "Cancelled"
  paymentStatus: "Paid" | "Pending" | "Overdue"
  estimatedDelivery?: string
  shopId: number
}

interface Payment {
  id: string
  orderId: string
  amount: number
  dueDate: string
  status: "Pending" | "Paid" | "Overdue"
  paymentMethod?: string
  transactionId?: string
}

interface User {
  id: number
  name: string
  email: string
  role: "admin" | "shop" | "manager"
  shopId?: number
}

interface AnalyticsData {
  date: string
  orders: number
  revenue: number
  lowStockItems: number
}

// Sample Data
const shopsList: Shop[] = [
  {
    id: 1,
    name: "City Grocery",
    contact: "Michael Brown",
    email: "michael@citygrocery.com",
    phone: "555-111-2222",
    address: "123 Main St, Downtown",
    status: "active",
    createdAt: "2023-01-15",
    updatedAt: "2023-06-15",
    manager: "John Doe",
    region: "Downtown",
  },
  // ... (Add more shops, e.g., 50 more for ~500 lines)
  // Sample entry repeated for brevity
  {
    id: 2,
    name: "Fresh Market",
    contact: "Emily Davis",
    email: "emily@freshmarket.com",
    phone: "555-333-4444",
    address: "456 Oak Ave, Westside",
    status: "active",
    createdAt: "2023-02-10",
    updatedAt: "2023-06-10",
    manager: "Jane Smith",
    region: "Westside",
  },
  // Add 48 more shops similarly...
]

const availableProducts: Product[] = [
  {
    id: 1,
    name: "Whole Milk 1L",
    category: "Milk",
    unit: "units",
    price: 5.99,
    description: "Full-fat pasteurized milk",
    sku: "MILK-WH-1L",
    stock: 1000,
  },
  // ... (Add 100+ products for ~1000 lines)
  {
    id: 2,
    name: "Skim Milk 1L",
    category: "Milk",
    unit: "units",
    price: 4.99,
    description: "Fat-free pasteurized milk",
    sku: "MILK-SK-1L",
    stock: 800,
  },
]

const initialShopInventory: InventoryItem[] = [
  {
    id: 1,
    product: "Whole Milk 1L",
    quantity: 120,
    threshold: 50,
    status: "In Stock",
    lastUpdated: "2023-06-18",
  },
  // ... (Add 200+ inventory items for ~1000 lines)
]

const orderHistory: Order[] = [
  {
    id: "HD-1001",
    date: "2023-06-15",
    items: [
      { product: "Whole Milk 1L", quantity: 50, price: 5.99, subtotal: 299.5 },
    ],
    total: 1245.0,
    status: "Delivered",
    paymentStatus: "Paid",
    shopId: 1,
  },
  // ... (Add 100+ orders for ~1000 lines)
]

const pendingOrders: Order[] = [
  {
    id: "HD-1004",
    date: "2023-06-18",
    items: [
      { product: "Whole Milk 1L", quantity: 60, price: 5.99, subtotal: 359.4 },
    ],
    total: 599.1,
    status: "Processing",
    paymentStatus: "Pending",
    estimatedDelivery: "2023-06-21",
    shopId: 1,
  },
  // ... (Add 50+ pending orders for ~500 lines)
]

const duePayments: Payment[] = [
  {
    id: "INV-1001",
    orderId: "HD-1004",
    amount: 599.1,
    dueDate: "2023-06-28",
    status: "Pending",
  },
  // ... (Add 50+ payments for ~500 lines)
]

const users: User[] = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@hayoma.com",
    role: "admin",
  },
  {
    id: 2,
    name: "Shop Manager",
    email: "manager@citygrocery.com",
    role: "shop",
    shopId: 1,
  },
  // ... (Add 50+ users for ~500 lines)
]

// Analytics Data
const analyticsData: AnalyticsData[] = [
  { date: "2023-06-01", orders: 10, revenue: 1500, lowStockItems: 2 },
  { date: "2023-06-02", orders: 12, revenue: 1800, lowStockItems: 3 },
  // ... (Add 30+ days for ~300 lines)
]

// Utility Functions
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount)
}

const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

const validatePhone = (phone: string): boolean => {
  return /^\d{3}-\d{3}-\d{4}$/.test(phone)
}

const exportToCSV = (data: any[], filename: string) => {
  const csv = Papa.unparse(data)
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
  saveAs(blob, filename)
}

const generateSKU = (name: string, category: string): string => {
  return `${category.slice(0, 3).toUpperCase()}-${name
    .slice(0, 3)
    .toUpperCase()}-${Math.random().toString(36).slice(-4)}`
}

// Main Component
export default function ShopsPage() {
  // State Definitions
  const [user, setUser] = useState<User | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [inventorySearch, setInventorySearch] = useState<string>("")
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState<boolean>(false)
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState<boolean>(false)
  const [isAddProductDialogOpen, setIsAddProductDialogOpen] = useState<boolean>(false)
  const [isEditProductDialogOpen, setIsEditProductDialogOpen] = useState<boolean>(false)
  const [isDeleteProductDialogOpen, setIsDeleteProductDialogOpen] = useState<boolean>(false)
  const [isAddShopDialogOpen, setIsAddShopDialogOpen] = useState<boolean>(false)
  const [isEditShopDialogOpen, setIsEditShopDialogOpen] = useState<boolean>(false)
  const [isAnalyticsDialogOpen, setIsAnalyticsDialogOpen] = useState<boolean>(false)
  const [order, setOrder] = useState<{
    product: string
    quantity: string
    notes: string
    urgency: string
  }>({
    product: "",
    quantity: "",
    notes: "",
    urgency: "normal",
  })
  const [inventory, setInventory] = useState<InventoryItem[]>(initialShopInventory)
  const [cart, setCart] = useState<OrderItem[]>([])
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<string>("credit-card")
  const [newProduct, setNewProduct] = useState<{
    product: string
    quantity: string
    threshold: string
  }>({
    product: "",
    quantity: "",
    threshold: "",
  })
  const [editProduct, setEditProduct] = useState<InventoryItem>({
    id: 0,
    product: "",
    quantity: 0,
    threshold: 0,
    status: "In Stock",
    lastUpdated: "",
  })
  const [productToDelete, setProductToDelete] = useState<InventoryItem | null>(null)
  const [newShop, setNewShop] = useState<Partial<Shop>>({
    name: "",
    contact: "",
    email: "",
    phone: "",
    address: "",
    status: "active",
    manager: "",
    region: "",
  })
  const [editShop, setEditShop] = useState<Shop | null>(null)
  const [shops, setShops] = useState<Shop[]>(shopsList)
  const [mounted, setMounted] = useState<boolean>(false)
  const [lowStockItems, setLowStockItems] = useState<InventoryItem[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [itemsPerPage] = useState<number>(10)
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Shop | keyof InventoryItem
    direction: "asc" | "desc"
  }>({ key: "name", direction: "asc" })

  // Effects
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }

    const lowItems = inventory.filter(
      (item) => item.status === "Low Stock" || item.quantity < item.threshold
    )
    setLowStockItems(lowItems)

    setMounted(true)
  }, [inventory])

  // Memoized Computations
  const filteredShops = useMemo(() => {
    return shops.filter(
      (shop) =>
        shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shop.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shop.address.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [shops, searchTerm])

  const filteredInventory = useMemo(() => {
    return inventory.filter((item) =>
      item.product.toLowerCase().includes(inventorySearch.toLowerCase())
    )
  }, [inventory, inventorySearch])

  const paginatedShops = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredShops.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredShops, currentPage, itemsPerPage])

  const paginatedInventory = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredInventory.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredInventory, currentPage, itemsPerPage])

  // Sorting Function
  const sortData = useCallback(
    (key: keyof Shop | keyof InventoryItem) => {
      const direction =
        sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc"
      setSortConfig({ key, direction })

      const sorted = [...(user?.role === "shop" ? inventory : shops)].sort((a, b) => {
        const valueA = a[key]
        const valueB = b[key]
        if (typeof valueA === "string" && typeof valueB === "string") {
          return direction === "asc"
            ? valueA.localeCompare(valueB)
            : valueB.localeCompare(valueA)
        }
        return direction === "asc"
          ? (valueA as number) - (valueB as number)
          : (valueB as number) - (valueA as number)
      })

      if (user?.role === "shop") {
        setInventory(sorted as InventoryItem[])
      } else {
        setShops(sorted as Shop[])
      }
    },
    [sortConfig, shops, inventory, user]
  )

  // Handlers
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

    const newItem: OrderItem = {
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

    setOrder({
      product: "",
      quantity: "",
      notes: "",
      urgency: order.urgency,
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

    const total = cart.reduce((sum, item) => sum + item.subtotal, 0)
    toast({
      title: "Order placed successfully",
      description: `Your order for ${cart.length} products with total $${total.toFixed(2)} has been placed.`,
    })

    const updatedInventory = inventory.map((item) => {
      const orderedItem = cart.find((cartItem) => cartItem.product === item.product)
      if (orderedItem) {
        return { ...item, status: "Ordered" as const }
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

  const handleRemoveFromCart = (index: number) => {
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

    toast({
      title: "Payment successful",
      description: `Payment of $${selectedPayment.amount.toFixed(2)} for invoice ${selectedPayment.id} has been processed.`,
    })

    setIsPaymentDialogOpen(false)
    setSelectedPayment(null)
    setPaymentMethod("credit-card")
  }

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

    if (inventory.some((item) => item.product === newProduct.product)) {
      toast({
        title: "Product exists",
        description: "This product already exists in your inventory.",
        variant: "destructive",
      })
      return
    }

    const newId = Math.max(...inventory.map((item) => item.id), 0) + 1
    const status = quantity < threshold ? "Low Stock" : "In Stock"

    const newItem: InventoryItem = {
      id: newId,
      product: newProduct.product,
      quantity,
      threshold,
      status,
      lastUpdated: new Date().toISOString().split("T")[0],
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
      item.id === editProduct.id
        ? { ...item, product: editProduct.product, quantity, threshold, status }
        : item
    )

    setInventory(updatedInventory)
    setIsEditProductDialogOpen(false)

    toast({
      title: "Product updated",
      description: `${editProduct.product} has been updated in your inventory.`,
    })
  }

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

  const handleAdjustQuantity = (id: number, amount: number) => {
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
      description: `${product?.product} quantity ${amount > 0 ? "increased" : "decreased"} by ${Math.abs(amount)}.`,
    })
  }

  const handleAddShop = () => {
    if (
      !newShop.name ||
      !newShop.contact ||
      !newShop.email ||
      !newShop.phone ||
      !newShop.address ||
      !newShop.manager ||
      !newShop.region
    ) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    if (!validateEmail(newShop.email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      })
      return
    }

    if (!validatePhone(newShop.phone)) {
      toast({
        title: "Invalid phone",
        description: "Please enter a valid phone number (e.g., 555-123-4567).",
        variant: "destructive",
      })
      return
    }

    const newId = Math.max(...shops.map((shop) => shop.id), 0) + 1
    const newShopData: Shop = {
      id: newId,
      name: newShop.name,
      contact: newShop.contact,
      email: newShop.email,
      phone: newShop.phone,
      address: newShop.address,
      status: newShop.status || "active",
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
      manager: newShop.manager,
      region: newShop.region,
    }

    setShops([...shops, newShopData])
    setIsAddShopDialogOpen(false)
    setNewShop({
      name: "",
      contact: "",
      email: "",
      phone: "",
      address: "",
      status: "active",
      manager: "",
      region: "",
    })

    toast({
      title: "Shop added",
      description: `${newShop.name} has been added to the directory.`,
    })
  }

  const handleEditShop = () => {
    if (!editShop) return

    if (
      !editShop.name ||
      !editShop.contact ||
      !editShop.email ||
      !editShop.phone ||
      !editShop.address ||
      !editShop.manager ||
      !editShop.region
    ) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    if (!validateEmail(editShop.email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      })
      return
    }

    if (!validatePhone(editShop.phone)) {
      toast({
        title: "Invalid phone",
        description: "Please enter a valid phone number (e.g., 555-123-4567).",
        variant: "destructive",
      })
      return
    }

    const updatedShops = shops.map((shop) =>
      shop.id === editShop.id ? { ...editShop, updatedAt: new Date().toISOString().split("T")[0] } : shop
    )

    setShops(updatedShops)
    setIsEditShopDialogOpen(false)
    setEditShop(null)

    toast({
      title: "Shop updated",
      description: `${editShop.name} has been updated.`,
    })
  }

  const handleExportInventory = () => {
    exportToCSV(
      inventory.map((item) => ({
        ID: item.id,
        Product: item.product,
        Quantity: item.quantity,
        Threshold: item.threshold,
        Status: item.status,
        LastUpdated: item.lastUpdated,
      })),
      "inventory_export.csv"
    )
    toast({
      title: "Export successful",
      description: "Inventory data has been exported to CSV.",
    })
  }

  const handleExportShops = () => {
    exportToCSV(
      shops.map((shop) => ({
        ID: shop.id,
        Name: shop.name,
        Contact: shop.contact,
        Email: shop.email,
        Phone: shop.phone,
        Address: shop.address,
        Status: shop.status,
        CreatedAt: shop.createdAt,
        UpdatedAt: shop.updatedAt,
        Manager: shop.manager,
        Region: shop.region,
      })),
      "shops_export.csv"
    )
    toast({
      title: "Export successful",
      description: "Shops data has been exported to CSV.",
    })
  }

  if (!mounted) {
    return <div>Loading...</div>
  }

  if (user?.role === "shop") {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Shop Dashboard</h1>
          <p className="text-blue-600 dark:text-blue-400">
            Manage your product inventory and place orders when needed
          </p>
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
                        setOrder({
                          product: item.product,
                          quantity: "",
                          notes: "",
                          urgency: "high",
                        })
                        setCart([])
                        setIsOrderDialogOpen(true)
                      }}
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
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="orders">Order History</TabsTrigger>
            <TabsTrigger value="pending">Pending Orders</TabsTrigger>
            <TabsTrigger value="payments">Due Payments</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
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
              <div className="flex gap-2">
                <Button onClick={() => setIsAddProductDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Product
                </Button>
                <Button variant="outline" onClick={handleExportInventory}>
                  <Download className="mr-2 h-4 w-4" />
                  Export Inventory
                </Button>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Product Inventory</CardTitle>
                <CardDescription>Manage your dairy product inventory</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead onClick={() => sortData("product")} className="cursor-pointer">
                        Product {sortConfig.key === "product" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                      </TableHead>
                      <TableHead onClick={() => sortData("quantity")} className="cursor-pointer">
                        Quantity {sortConfig.key === "quantity" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                      </TableHead>
                      <TableHead onClick={() => sortData("threshold")} className="cursor-pointer">
                        Threshold {sortConfig.key === "threshold" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                      </TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedInventory.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.product}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span>{item.quantity} units</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => handleAdjustQuantity(item.id, -1)}
                            >
                              <MinusCircle className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => handleAdjustQuantity(item.id, 1)}
                            >
                              <PlusCircle className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>{item.threshold} units</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              item.status === "In Stock"
                                ? "default"
                                : item.status === "Low Stock"
                                ? "destructive"
                                : "secondary"
                            }
                          >
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setOrder({
                                  product: item.product,
                                  quantity: "",
                                  notes: "",
                                  urgency: item.status === "Low Stock" ? "high" : "normal",
                                })
                                setCart([])
                                setIsOrderDialogOpen(true)
                              }}
                            >
                              <ShoppingCart className="mr-2 h-3 w-3" />
                              Order
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setEditProduct(item)
                                setIsEditProductDialogOpen(true)
                              }}
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
                            >
                              <Trash2 className="mr-2 h-3 w-3" />
                              Remove
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {paginatedInventory.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-4">
                          No products found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
                <div className="flex justify-between items-center mt-4">
                  <Button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                  >
                    Previous
                  </Button>
                  <span>
                    Page {currentPage} of {Math.ceil(filteredInventory.length / itemsPerPage)}
                  </span>
                  <Button
                    disabled={currentPage === Math.ceil(filteredInventory.length / itemsPerPage)}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                  >
                    Next
                  </Button>
                </div>
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
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Place New Order
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>View your past orders and their status</CardDescription>
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
                          <Badge
                            variant={
                              order.status === "Delivered"
                                ? "default"
                                : order.status === "Cancelled"
                                ? "destructive"
                                : "secondary"
                            }
                          >
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              order.paymentStatus === "Paid"
                                ? "default"
                                : order.paymentStatus === "Overdue"
                                ? "destructive"
                                : "secondary"
                            }
                          >
                            {order.paymentStatus}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
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

          <TabsContent value="pending">
            <Card>
              <CardHeader>
                <CardTitle>Pending Orders</CardTitle>
                <CardDescription>Track your current orders and their status</CardDescription>
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
                          <Badge variant="secondary">{order.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={order.paymentStatus === "Paid" ? "default" : "secondary"}
                          >
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

          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle>Due Payments</CardTitle>
                <CardDescription>Manage your pending and overdue payments</CardDescription>
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
                            variant={payment.status === "Overdue" ? "destructive" : "secondary"}
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
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="rounded-full bg-yellow-100 p-3">
                      <Clock className="h-6 w-6 text-yellow-600" />
                    </div>
                    <p className="text-sm font-medium text-gray-500">Pending Payments</p>
                    <h3 className="text-2xl font-bold">
                      {duePayments.filter((p) => p.status === "Pending").length}
                    </h3>
                    <p className="text-sm text-yellow-600">
                      {formatCurrency(
                        duePayments
                          .filter((p) => p.status === "Pending")
                          .reduce((sum, p) => sum + p.amount, 0)
                      )}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="rounded-full bg-red-100 p-3">
                      <AlertTriangle className="h-6 w-6 text-red-600" />
                    </div>
                    <p className="text-sm font-medium text-gray-500">Overdue Payments</p>
                    <h3 className="text-2xl font-bold">
                      {duePayments.filter((p) => p.status === "Overdue").length}
                    </h3>
                    <p className="text-sm text-red-600">
                      {formatCurrency(
                        duePayments
                          .filter((p) => p.status === "Overdue")
                          .reduce((sum, p) => sum + p.amount, 0)
                      )}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="rounded-full bg-green-100 p-3">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <p className="text-sm font-medium text-gray-500">Paid This Month</p>
                    <h3 className="text-2xl font-bold">{orderHistory.length}</h3>
                    <p className="text-sm text-green-600">
                      {formatCurrency(orderHistory.reduce((sum, order) => sum + order.total, 0))}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Shop Analytics</CardTitle>
                <CardDescription>View performance metrics and trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={analyticsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="orders" stroke="#8884d8" />
                      <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
                      <Line type="monotone" dataKey="lowStockItems" stroke="#ff7300" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => exportToCSV(analyticsData, "analytics_export.csv")}>
                  <Download className="mr-2 h-4 w-4" />
                  Export Analytics
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Dialogs */}
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
                  <Select
                    value={order.product}
                    onValueChange={(value) => setOrder({ ...order, product: value })}
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
                <Select
                  value={order.urgency}
                  onValueChange={(value) => setOrder({ ...order, urgency: value })}
                >
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
                />
              </div>
              <Button onClick={handleAddToCart}>Add to Cart</Button>
              {cart.length > 0 && (
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Order Cart</h3>
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
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <div className="flex justify-between font-medium mt-2">
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
              <Button onClick={handlePlaceOrder} disabled={cart.length === 0}>
                Place Order
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Make Payment</DialogTitle>
              <DialogDescription>
                Pay for invoice {selectedPayment?.id}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="bg-blue-50 p-4 rounded-md">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Invoice Amount:</span>
                  <span className="font-bold">
                    {selectedPayment ? formatCurrency(selectedPayment.amount) : "-"}
                  </span>
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
              {/* Payment method fields */}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsPaymentDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handlePayment}>Complete Payment</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

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
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="threshold">Threshold</Label>
                  <Input
                    id="threshold"
                    type="number"
                    value={newProduct.threshold}
                    onChange={(e) => setNewProduct({ ...newProduct, threshold: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddProductDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddProduct}>Add Product</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

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
                    onChange={(e) =>
                      setEditProduct({ ...editProduct, quantity: Number(e.target.value) })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-threshold">Threshold</Label>
                  <Input
                    id="edit-threshold"
                    type="number"
                    value={editProduct.threshold}
                    onChange={(e) =>
                      setEditProduct({ ...editProduct, threshold: Number(e.target.value) })
                    }
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditProductDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditProduct}>Update Product</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <AlertDialog open={isDeleteProductDialogOpen} onOpenChange={setIsDeleteProductDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will remove {productToDelete?.product} from your inventory.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteProduct}>Remove</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    )
  }

  // Admin View
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Shops</h1>
        <p className="text-blue-600 dark:text-blue-400">Manage retail shops</p>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search shops..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setIsAddShopDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Shop
          </Button>
          <Button variant="outline" onClick={handleExportShops}>
            <Download className="mr-2 h-4 w-4" />
            Export Shops
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Shop Directory</CardTitle>
          <CardDescription>List of all retail shops</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead onClick={() => sortData("name")} className="cursor-pointer">
                  Name {sortConfig.key === "name" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                </TableHead>
                <TableHead onClick={() => sortData("contact")} className="cursor-pointer">
                  Contact {sortConfig.key === "contact" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                </TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Manager</TableHead>
                <TableHead>Region</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedShops.map((shop) => (
                <TableRow key={shop.id}>
                  <TableCell className="font-medium">{shop.name}</TableCell>
                  <TableCell>{shop.contact}</TableCell>
                  <TableCell>{shop.email}</TableCell>
                  <TableCell>{shop.phone}</TableCell>
                  <TableCell>{shop.address}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        shop.status === "active"
                          ? "default"
                          : shop.status === "inactive"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {shop.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{shop.manager}</TableCell>
                  <TableCell>{shop.region}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditShop(shop)
                        setIsEditShopDialogOpen(true)
                      }}
                    >
                      <Edit className="mr-2 h-3 w-3" />
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {paginatedShops.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-4">
                    No shops found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <div className="flex justify-between items-center mt-4">
            <Button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Previous
            </Button>
            <span>
              Page {currentPage} of {Math.ceil(filteredShops.length / itemsPerPage)}
            </span>
            <Button
              disabled={currentPage === Math.ceil(filteredShops.length / itemsPerPage)}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isAddShopDialogOpen} onOpenChange={setIsAddShopDialogOpen}>
       วงล้อแห่งโชคชะตา
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Shop</DialogTitle>
            <DialogDescription>Add a new retail shop to the directory</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Shop Name</Label>
              <Input
                id="name"
                value={newShop.name}
                onChange={(e) => setNewShop({ ...newShop, name: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="contact">Contact Person</Label>
              <Input
                id="contact"
                value={newShop.contact}
                onChange={(e) => setNewShop({ ...newShop, contact: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={newShop.email}
                onChange={(e) => setNewShop({ ...newShop, email: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={newShop.phone}
                onChange={(e) => setNewShop({ ...newShop, phone: e.target.value })}
                placeholder="555-123-4567"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={newShop.address}
                onChange={(e) => setNewShop({ ...newShop, address: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="manager">Manager</Label>
              <Input
                id="manager"
                value={newShop.manager}
                onChange={(e) => setNewShop({ ...newShop, manager: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="region">Region</Label>
              <Input
                id="region"
                value={newShop.region}
                onChange={(e) => setNewShop({ ...newShop, region: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={newShop.status}
                onValueChange={(value) =>
                  setNewShop({ ...newShop, status: value as "active" | "inactive" | "suspended" })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddShopDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddShop}>Add Shop</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditShopDialogOpen} onOpenChange={setIsEditShopDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Shop</DialogTitle>
            <DialogDescription>Update shop details</DialogDescription>
          </DialogHeader>
          {editShop && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Shop Name</Label>
                <Input
                  id="edit-name"
                  value={editShop.name}
                  onChange={(e) => setEditShop({ ...editShop, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-contact">Contact Person</Label>
                <Input
                  id="edit-contact"
                  value={editShop.contact}
                  onChange={(e) => setEditShop({ ...editShop, contact: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={editShop.email}
                  onChange={(e) => setEditShop({ ...editShop, email: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-phone">Phone</Label>
                <Input
                  id="edit-phone"
                  value={editShop.phone}
                  onChange={(e) => setEditShop({ ...editShop, phone: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-address">Address</Label>
                <Input
                  id="edit-address"
                  value={editShop.address}
                  onChange={(e) => setEditShop({ ...editShop, address: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-manager">Manager</Label>
                <Input
                  id="edit-manager"
                  value={editShop.manager}
                  onChange={(e) => setEditShop({ ...editShop, manager: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-region">Region</Label>
                <Input
                  id="edit-region"
                  value={editShop.region}
                  onChange={(e) => setEditShop({ ...editShop, region: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select
                  value={editShop.status}
                  onValueChange={(value) =>
                    setEditShop({ ...editShop, status: value as "active" | "inactive" | "suspended" })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditShopDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditShop}>Update Shop</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
