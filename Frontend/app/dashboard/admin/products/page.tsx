"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Search, Filter, ArrowUpDown, Edit, Trash2, Eye } from "lucide-react"
import type { Product } from "@/lib/types"
import { toast } from "sonner"
import { Switch } from "@/components/ui/switch"
import Image from "next/image"

// Mock data - would be replaced with actual API calls
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Whole Milk",
    price: 3.99,
    unit: "liter",
    category: "Milk",
    description: "Fresh whole milk, pasteurized and homogenized for the perfect taste.",
    image: "/products/milk.jpg",
    inStock: true,
    supplier: "Farm Fresh Dairy",
  },
  {
    id: "2",
    name: "Greek Yogurt",
    price: 4.49,
    unit: "cup",
    category: "Yogurt",
    description: "Creamy Greek yogurt made from the finest milk, perfect for breakfast or snacks.",
    image: "/products/yogurt.jpg",
    inStock: true,
    supplier: "Farm Fresh Dairy",
  },
  {
    id: "3",
    name: "Cheddar Cheese",
    price: 5.99,
    unit: "kg",
    category: "Cheese",
    description: "Aged cheddar cheese with a rich, sharp flavor. Perfect for sandwiches and cooking.",
    image: "/products/cheese.jpg",
    inStock: true,
    supplier: "Cheese Masters",
  },
  {
    id: "4",
    name: "Salted Butter",
    price: 3.49,
    unit: "pack",
    category: "Butter",
    description: "Creamy, salted butter made from pure cream. Ideal for cooking and baking.",
    image: "/products/butter.jpg",
    inStock: true,
    supplier: "Dairy Delights",
  },
  {
    id: "5",
    name: "Chocolate Milk",
    price: 4.29,
    unit: "liter",
    category: "Milk",
    description: "Delicious chocolate milk that's a favorite with kids and adults alike.",
    image: "/products/chocolate-milk.jpg",
    inStock: false,
    supplier: "Farm Fresh Dairy",
  },
  {
    id: "6",
    name: "Whipped Cream",
    price: 2.99,
    unit: "can",
    category: "Cream",
    description: "Light and fluffy whipped cream, perfect for desserts and hot beverages.",
    image: "/products/whipped-cream.jpg",
    inStock: true,
    supplier: "Dairy Delights",
  },
]

export default function AdminProductsDashboard() {
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [stockFilter, setStockFilter] = useState<string>("all")
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  const [isViewProductOpen, setIsViewProductOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null)
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Product
    direction: "ascending" | "descending"
  } | null>(null)

  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    unit: "",
    category: "",
    description: "",
    inStock: true,
    supplier: "", // Still needed for backend but not displayed
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number.parseFloat(value) || 0 : value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, inStock: checked }))
  }

  const handleAddProduct = () => {
    // BACKEND INTEGRATION: Add product API call
    const newProduct: Product = {
      id: Math.random().toString(36).substring(7),
      name: formData.name,
      price: formData.price,
      unit: formData.unit,
      category: formData.category,
      description: formData.description,
      inStock: formData.inStock,
      supplier: formData.supplier, // Still needed for backend but not displayed
      image: "/placeholder.svg?height=100&width=100", // Default placeholder
    }

    setProducts((prev) => [...prev, newProduct])
    toast.success("Product added successfully")
    setIsAddProductOpen(false)
    resetForm()
  }

  const handleToggleStock = (id: string) => {
    // BACKEND INTEGRATION: Update product stock status API call
    const updatedProducts = products.map((product) =>
      product.id === id ? { ...product, inStock: !product.inStock } : product,
    )

    setProducts(updatedProducts)
    toast.success("Product stock status updated")
  }

  const handleDeleteProduct = (id: string) => {
    // BACKEND INTEGRATION: Delete product API call
    setProducts((prev) => prev.filter((product) => product.id !== id))
    toast.success("Product deleted successfully")
  }

  const viewProduct = (product: Product) => {
    setCurrentProduct(product)
    setIsViewProductOpen(true)
  }

  const resetForm = () => {
    setFormData({
      name: "",
      price: 0,
      unit: "",
      category: "",
      description: "",
      inStock: true,
      supplier: "",
    })
  }

  const requestSort = (key: keyof Product) => {
    let direction: "ascending" | "descending" = "ascending"
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }
    setSortConfig({ key, direction })
  }

  // Get unique categories for filters
  const categories = Array.from(new Set(products.map((product) => product.category)))

  // Apply filters and search
  let filteredProducts = [...products]

  if (categoryFilter !== "all") {
    filteredProducts = filteredProducts.filter((product) => product.category === categoryFilter)
  }

  if (stockFilter !== "all") {
    filteredProducts = filteredProducts.filter((product) =>
      stockFilter === "inStock" ? product.inStock : !product.inStock,
    )
  }

  if (searchTerm) {
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }

  // Apply sorting
  if (sortConfig !== null) {
    filteredProducts.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1
      }
      return 0
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Products Management</h1>
          <p className="text-muted-foreground">Manage your product catalog</p>
        </div>
        <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>Add a new product to your catalog. Fill in all the details below.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter product name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="Enter price"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unit">Unit</Label>
                  <Input
                    id="unit"
                    name="unit"
                    value={formData.unit}
                    onChange={handleInputChange}
                    placeholder="e.g., liter, kg, pack"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter product description"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="inStock" className="block mb-2">
                  Stock Status
                </Label>
                <div className="flex items-center gap-2">
                  <Switch id="inStock" checked={formData.inStock} onCheckedChange={handleSwitchChange} />
                  <Label htmlFor="inStock">{formData.inStock ? "In Stock" : "Out of Stock"}</Label>
                </div>
              </div>
              {/* Hidden supplier field - still needed for backend but not displayed to user */}
              <input type="hidden" name="supplier" value={formData.supplier} />

              {/* BACKEND INTEGRATION: Add image upload functionality */}
              <div className="space-y-2">
                <Label>Product Image</Label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-md p-6 text-center">
                  <p className="text-sm text-muted-foreground">Image upload functionality would be integrated here</p>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddProductOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddProduct}>Add Product</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 border-blue-100 dark:border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{products.length}</div>
            <p className="text-sm text-muted-foreground">Across {categories.length} categories</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 border-blue-100 dark:border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">In Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">
              {products.filter((product) => product.inStock).length}
            </div>
            <p className="text-sm text-muted-foreground">Products available for order</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 border-blue-100 dark:border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Out of Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-500">
              {products.filter((product) => !product.inStock).length}
            </div>
            <p className="text-sm text-muted-foreground">Products unavailable</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-blue-100 dark:border-gray-700">
        <CardHeader>
          <CardTitle>Product Catalog</CardTitle>
          <CardDescription>Manage your products and their availability</CardDescription>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 bg-white dark:bg-gray-950"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[150px] bg-white dark:bg-gray-950">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <span>Category</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={stockFilter} onValueChange={setStockFilter}>
                <SelectTrigger className="w-[150px] bg-white dark:bg-gray-950">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <span>Stock</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Products</SelectItem>
                  <SelectItem value="inStock">In Stock</SelectItem>
                  <SelectItem value="outOfStock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-blue-100 dark:border-gray-800">
            <Table>
              <TableHeader className="bg-blue-50 dark:bg-gray-900">
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead className="cursor-pointer" onClick={() => requestSort("name")}>
                    <div className="flex items-center gap-1">
                      Product Name
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => requestSort("category")}>
                    <div className="flex items-center gap-1">
                      Category
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => requestSort("price")}>
                    <div className="flex items-center gap-1">
                      Price
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => requestSort("inStock")}>
                    <div className="flex items-center gap-1">
                      Status
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id} className="bg-white dark:bg-gray-950">
                    <TableCell>
                      <div className="relative h-10 w-10 overflow-hidden rounded-md">
                        <Image
                          src={product.image || "/placeholder.svg?height=40&width=40"}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>
                      ${product.price.toFixed(2)}/{product.unit}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div
                          className={`h-2 w-2 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-500"}`}
                        ></div>
                        <span>{product.inStock ? "In Stock" : "Out of Stock"}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => viewProduct(product)} className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleToggleStock(product.id)}
                          className="h-8 w-8"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteProduct(product.id)}
                          className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredProducts.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                      No products found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Product View Dialog */}
      <Dialog open={isViewProductOpen} onOpenChange={setIsViewProductOpen}>
        <DialogContent className="sm:max-w-[550px]">
          {currentProduct && (
            <>
              <DialogHeader>
                <DialogTitle>{currentProduct.name}</DialogTitle>
                <DialogDescription>Product details and information</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="relative h-48 w-full overflow-hidden rounded-md">
                  <Image
                    src={currentProduct.image || "/placeholder.svg?height=200&width=500"}
                    alt={currentProduct.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Category</h3>
                    <p>{currentProduct.category}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Price</h3>
                    <p>
                      ${currentProduct.price.toFixed(2)}/{currentProduct.unit}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-2 w-2 rounded-full ${currentProduct.inStock ? "bg-green-500" : "bg-red-500"}`}
                      ></div>
                      <span>{currentProduct.inStock ? "In Stock" : "Out of Stock"}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
                  <p className="mt-1">{currentProduct.description}</p>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsViewProductOpen(false)}>
                  Close
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

