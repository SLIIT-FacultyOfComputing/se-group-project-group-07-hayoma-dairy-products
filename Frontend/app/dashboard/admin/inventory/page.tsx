"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { Plus, Search, Filter, ArrowUpDown, AlertTriangle, CheckCircle2 } from "lucide-react"
import type { InventoryItem } from "@/lib/types"
import { toast } from "sonner"

// Mock data - would be replaced with actual API calls
const mockInventory: InventoryItem[] = [
  {
    id: "1",
    name: "Raw Milk",
    quantity: 500,
    unit: "liters",
    category: "Dairy Base",
    lastUpdated: "2023-04-01",
    threshold: 100,
    supplier: "Local Farms Co-op",
  },
  {
    id: "2",
    name: "Cocoa Powder",
    quantity: 75,
    unit: "kg",
    category: "Flavoring",
    lastUpdated: "2023-04-02",
    threshold: 20,
    supplier: "Global Ingredients",
  },
  {
    id: "3",
    name: "Sugar",
    quantity: 250,
    unit: "kg",
    category: "Sweeteners",
    lastUpdated: "2023-04-01",
    threshold: 50,
    supplier: "Sweet Supplies Inc.",
  },
  {
    id: "4",
    name: "Vanilla Extract",
    quantity: 15,
    unit: "liters",
    category: "Flavoring",
    lastUpdated: "2023-04-03",
    threshold: 5,
    supplier: "Flavor Masters",
  },
  {
    id: "5",
    name: "Cream",
    quantity: 180,
    unit: "liters",
    category: "Dairy Base",
    lastUpdated: "2023-04-02",
    threshold: 40,
    supplier: "Local Farms Co-op",
  },
  {
    id: "6",
    name: "Fruit Puree - Strawberry",
    quantity: 85,
    unit: "kg",
    category: "Flavoring",
    lastUpdated: "2023-04-03",
    threshold: 25,
    supplier: "Fresh Fruit Suppliers",
  },
  {
    id: "7",
    name: "Fruit Puree - Blueberry",
    quantity: 65,
    unit: "kg",
    category: "Flavoring",
    lastUpdated: "2023-04-01",
    threshold: 25,
    supplier: "Fresh Fruit Suppliers",
  },
  {
    id: "8",
    name: "Salt",
    quantity: 40,
    unit: "kg",
    category: "Additives",
    lastUpdated: "2023-04-02",
    threshold: 10,
    supplier: "Basic Ingredients Co.",
  },
  {
    id: "9",
    name: "Stabilizers",
    quantity: 30,
    unit: "kg",
    category: "Additives",
    lastUpdated: "2023-04-03",
    threshold: 8,
    supplier: "Dairy Tech Solutions",
  },
  {
    id: "10",
    name: "Cultures",
    quantity: 5,
    unit: "kg",
    category: "Cultures",
    lastUpdated: "2023-04-01",
    threshold: 2,
    supplier: "Bio Cultures Inc.",
  },
]

export default function AdminInventoryDashboard() {
  const [inventory, setInventory] = useState<InventoryItem[]>(mockInventory)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [supplierFilter, setSupplierFilter] = useState<string>("all")
  const [isAddItemOpen, setIsAddItemOpen] = useState(false)
  const [sortConfig, setSortConfig] = useState<{
    key: keyof InventoryItem
    direction: "ascending" | "descending"
  } | null>(null)

  const [formData, setFormData] = useState({
    name: "",
    quantity: 0,
    unit: "",
    category: "",
    threshold: 0,
    supplier: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" || name === "threshold" ? Number.parseInt(value) || 0 : value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddItem = () => {
    // BACKEND INTEGRATION: Add inventory item API call
    const newItem: InventoryItem = {
      id: Math.random().toString(36).substring(7),
      name: formData.name,
      quantity: formData.quantity,
      unit: formData.unit,
      category: formData.category,
      lastUpdated: new Date().toISOString().split("T")[0],
      threshold: formData.threshold,
      supplier: formData.supplier,
    }

    setInventory((prev) => [...prev, newItem])
    toast.success("Raw material added to inventory")
    setIsAddItemOpen(false)
    resetForm()
  }

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    // BACKEND INTEGRATION: Update inventory quantity API call
    const updatedInventory = inventory.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: newQuantity,
            lastUpdated: new Date().toISOString().split("T")[0],
          }
        : item,
    )

    setInventory(updatedInventory)
    toast.success("Inventory updated")
  }

  const resetForm = () => {
    setFormData({
      name: "",
      quantity: 0,
      unit: "",
      category: "",
      threshold: 0,
      supplier: "",
    })
  }

  const requestSort = (key: keyof InventoryItem) => {
    let direction: "ascending" | "descending" = "ascending"
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }
    setSortConfig({ key, direction })
  }

  // Get unique categories and suppliers for filters
  const categories = Array.from(new Set(inventory.map((item) => item.category)))
  const suppliers = Array.from(new Set(inventory.map((item) => item.supplier)))

  // Apply filters and search
  let filteredInventory = [...inventory]

  if (categoryFilter !== "all") {
    filteredInventory = filteredInventory.filter((item) => item.category === categoryFilter)
  }

  if (supplierFilter !== "all") {
    filteredInventory = filteredInventory.filter((item) => item.supplier === supplierFilter)
  }

  if (searchTerm) {
    filteredInventory = filteredInventory.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.supplier.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }

  // Apply sorting
  if (sortConfig !== null) {
    filteredInventory.sort((a, b) => {
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
          <h1 className="text-3xl font-bold">Raw Materials Inventory</h1>
          <p className="text-muted-foreground">Manage and track all raw materials for production</p>
        </div>
        <Dialog open={isAddItemOpen} onOpenChange={setIsAddItemOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4" />
              Add Material
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Add Raw Material</DialogTitle>
              <DialogDescription>
                Add a new raw material to your inventory. Fill in all the details below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Material Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter material name"
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
                      <SelectItem value="Dairy Base">Dairy Base</SelectItem>
                      <SelectItem value="Flavoring">Flavoring</SelectItem>
                      <SelectItem value="Sweeteners">Sweeteners</SelectItem>
                      <SelectItem value="Additives">Additives</SelectItem>
                      <SelectItem value="Cultures">Cultures</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    name="quantity"
                    type="number"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    placeholder="Enter quantity"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unit">Unit</Label>
                  <Input
                    id="unit"
                    name="unit"
                    value={formData.unit}
                    onChange={handleInputChange}
                    placeholder="e.g., liters, kg, packs"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="threshold">Low Stock Threshold</Label>
                  <Input
                    id="threshold"
                    name="threshold"
                    type="number"
                    value={formData.threshold}
                    onChange={handleInputChange}
                    placeholder="Enter threshold"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supplier">Supplier</Label>
                  <Select value={formData.supplier} onValueChange={(value) => handleSelectChange("supplier", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select supplier" />
                    </SelectTrigger>
                    <SelectContent>
                      {suppliers.map((supplier) => (
                        <SelectItem key={supplier} value={supplier}>
                          {supplier}
                        </SelectItem>
                      ))}
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddItemOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddItem}>Add Material</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 border-blue-100 dark:border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Total Materials</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{inventory.length}</div>
            <p className="text-sm text-muted-foreground">Across {categories.length} categories</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 border-blue-100 dark:border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Low Stock Materials</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-500">
              {inventory.filter((item) => item.quantity <= item.threshold).length}
            </div>
            <p className="text-sm text-muted-foreground">Materials below threshold</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 border-blue-100 dark:border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Suppliers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{suppliers.length}</div>
            <p className="text-sm text-muted-foreground">Active suppliers</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-blue-100 dark:border-gray-700">
        <CardHeader>
          <CardTitle>Raw Materials</CardTitle>
          <CardDescription>Manage your raw materials inventory for production</CardDescription>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search materials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 bg-white dark:bg-gray-950"
              />
            </div>
            <div className="flex gap-2">
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
              <Select value={supplierFilter} onValueChange={setSupplierFilter}>
                <SelectTrigger className="w-[150px] bg-white dark:bg-gray-950">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <span>Supplier</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Suppliers</SelectItem>
                  {suppliers.map((supplier) => (
                    <SelectItem key={supplier} value={supplier}>
                      {supplier}
                    </SelectItem>
                  ))}
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
                  <TableHead className="cursor-pointer" onClick={() => requestSort("name")}>
                    <div className="flex items-center gap-1">
                      Material Name
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => requestSort("category")}>
                    <div className="flex items-center gap-1">
                      Category
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => requestSort("quantity")}>
                    <div className="flex items-center gap-1">
                      Quantity
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead className="cursor-pointer" onClick={() => requestSort("supplier")}>
                    <div className="flex items-center gap-1">
                      Supplier
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => requestSort("lastUpdated")}>
                    <div className="flex items-center gap-1">
                      Last Updated
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInventory.map((item) => (
                  <TableRow key={item.id} className="bg-white dark:bg-gray-950">
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className={item.quantity <= item.threshold ? "text-red-500 font-medium" : ""}>
                          {item.quantity}
                        </span>
                        {item.quantity <= item.threshold && <AlertTriangle className="h-4 w-4 text-amber-500" />}
                      </div>
                    </TableCell>
                    <TableCell>{item.unit}</TableCell>
                    <TableCell>{item.supplier}</TableCell>
                    <TableCell>{item.lastUpdated}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          className="h-8 w-8 p-0 border-blue-200 dark:border-gray-700"
                        >
                          +
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                          disabled={item.quantity <= 0}
                          className="h-8 w-8 p-0 border-blue-200 dark:border-gray-700"
                        >
                          -
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredInventory.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                      No materials found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-100 dark:border-gray-700 bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <CardHeader>
          <CardTitle>Stock Status</CardTitle>
          <CardDescription>Overview of current raw materials levels</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categories.map((category) => {
              const categoryItems = inventory.filter((item) => item.category === category)
              const totalItems = categoryItems.length
              const lowStockItems = categoryItems.filter((item) => item.quantity <= item.threshold).length
              const healthyStockItems = totalItems - lowStockItems
              const healthyPercentage = totalItems > 0 ? (healthyStockItems / totalItems) * 100 : 0

              return (
                <div key={category}>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm font-medium">{category}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {healthyStockItems}/{totalItems} items healthy
                      </span>
                      {lowStockItems > 0 ? (
                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                      ) : (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                    <div className="h-full rounded-full bg-blue-500" style={{ width: `${healthyPercentage}%` }}></div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

