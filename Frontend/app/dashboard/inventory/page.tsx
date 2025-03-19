"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample raw materials data
const rawMaterials = [
  {
    id: 1,
    name: "Fresh Milk",
    supplier: "Green Meadows Farm",
    quantity: "5,000 liters",
    lastDelivery: "2023-06-15",
    status: "In Stock",
    expiryDate: "2023-06-22",
  },
  {
    id: 2,
    name: "Cream",
    supplier: "Sunny Valley Dairy",
    quantity: "1,200 liters",
    lastDelivery: "2023-06-14",
    status: "In Stock",
    expiryDate: "2023-06-21",
  },
  {
    id: 3,
    name: "Sugar",
    supplier: "Sweet Supplies Inc.",
    quantity: "800 kg",
    lastDelivery: "2023-06-10",
    status: "Low Stock",
    expiryDate: "2023-12-10",
  },
  {
    id: 4,
    name: "Fruit Puree",
    supplier: "Fresh Fruit Co.",
    quantity: "350 kg",
    lastDelivery: "2023-06-12",
    status: "Low Stock",
    expiryDate: "2023-07-12",
  },
  {
    id: 5,
    name: "Flavoring",
    supplier: "Flavor Masters",
    quantity: "100 liters",
    lastDelivery: "2023-06-05",
    status: "In Stock",
    expiryDate: "2023-12-05",
  },
]

// Sample products data
const products = [
  {
    id: 1,
    name: "Whole Milk 1L",
    category: "Milk",
    quantity: "2,500 units",
    productionDate: "2023-06-15",
    status: "In Stock",
    expiryDate: "2023-06-29",
  },
  {
    id: 2,
    name: "Skim Milk 1L",
    category: "Milk",
    quantity: "1,800 units",
    productionDate: "2023-06-15",
    status: "In Stock",
    expiryDate: "2023-06-29",
  },
  {
    id: 3,
    name: "Strawberry Yogurt 200g",
    category: "Yogurt",
    quantity: "1,200 units",
    productionDate: "2023-06-14",
    status: "In Stock",
    expiryDate: "2023-07-05",
  },
  {
    id: 4,
    name: "Cheddar Cheese 500g",
    category: "Cheese",
    quantity: "500 units",
    productionDate: "2023-06-10",
    status: "Low Stock",
    expiryDate: "2023-08-10",
  },
  {
    id: 5,
    name: "Butter 250g",
    category: "Butter",
    quantity: "750 units",
    productionDate: "2023-06-12",
    status: "In Stock",
    expiryDate: "2023-07-12",
  },
]

export default function InventoryPage() {
  const [rawMaterialsSearch, setRawMaterialsSearch] = useState("")
  const [productsSearch, setProductsSearch] = useState("")

  const filteredRawMaterials = rawMaterials.filter(
    (material) =>
      material.name.toLowerCase().includes(rawMaterialsSearch.toLowerCase()) ||
      material.supplier.toLowerCase().includes(rawMaterialsSearch.toLowerCase()),
  )

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(productsSearch.toLowerCase()) ||
      product.category.toLowerCase().includes(productsSearch.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Inventory Management</h1>
        <p className="text-muted-foreground dark:text-gray-400">Manage raw materials and finished products</p>
      </div>

      <Tabs defaultValue="raw-materials" className="space-y-4">
        <TabsList>
          <TabsTrigger value="raw-materials">Raw Materials</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
        </TabsList>

        <TabsContent value="raw-materials" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Raw Materials Inventory</CardTitle>
              <CardDescription>Manage your raw materials stock</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground dark:text-gray-400">
                This section has been simplified. The raw materials inventory management functionality will be
                implemented here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Products Inventory</CardTitle>
              <CardDescription>Manage your finished products stock</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground dark:text-gray-400">
                This section has been simplified. The products inventory management functionality will be implemented
                here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

