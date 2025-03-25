import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Sample supplier data
const suppliers = [
  {
    id: 1,
    name: "Green Meadows Farm",
    contact: "John Smith",
    email: "john@greenmeadows.com",
    phone: "555-123-4567",
    products: ["Milk", "Cream"],
    status: "active",
  },
  {
    id: 2,
    name: "Sunny Valley Dairy",
    contact: "Sarah Johnson",
    email: "sarah@sunnyvalley.com",
    phone: "555-987-6543",
    products: ["Milk", "Cheese", "Yogurt"],
    status: "active",
  },
  {
    id: 3,
    name: "Highland Farms",
    contact: "Robert Brown",
    email: "robert@highland.com",
    phone: "555-456-7890",
    products: ["Milk", "Butter"],
    status: "inactive",
  },
  {
    id: 4,
    name: "Organic Dairy Co-op",
    contact: "Lisa Chen",
    email: "lisa@organicdairy.com",
    phone: "555-789-0123",
    products: ["Milk", "Cheese", "Cream"],
    status: "active",
  },
]

export default function SuppliersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Suppliers</h1>
        <p className="text-muted-foreground dark:text-gray-400">Manage your dairy suppliers</p>
      </div>

      {/*
      <div className="flex items-center justify-between">
        <div className="max-w-sm">
          <Input placeholder="Search suppliers..." />
        </div>
        <Button>Add Supplier</Button>
      </div>
      */}

      <Card>
        <CardHeader>
          <CardTitle>Supplier Directory</CardTitle>
          <CardDescription>A list of all suppliers providing dairy products to your company</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground dark:text-gray-400">
            This page has been simplified. The supplier management functionality will be implemented here.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

