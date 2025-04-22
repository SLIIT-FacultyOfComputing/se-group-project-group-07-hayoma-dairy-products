"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Search, Filter, ArrowUpDown, Eye, TruckIcon, DollarSign } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Mock data for supply history
const mockSupplyHistory = [
  {
    id: "SUP-001",
    product: "Fresh Milk",
    quantity: "500 liters",
    date: "2023-05-10",
    status: "DELIVERED",
    paymentStatus: "PAID",
    amount: 750.0,
    recipient: "Hayoma Dairy Processing Plant",
  },
  {
    id: "SUP-002",
    product: "Greek Yogurt",
    quantity: "200 cups",
    date: "2023-05-12",
    status: "DELIVERED",
    paymentStatus: "PAID",
    amount: 450.0,
    recipient: "Hayoma Dairy Processing Plant",
  },
  {
    id: "SUP-003",
    product: "Cheddar Cheese",
    quantity: "100 kg",
    date: "2023-05-14",
    status: "IN_TRANSIT",
    paymentStatus: "PENDING",
    amount: 600.0,
    recipient: "Hayoma Dairy Processing Plant",
  },
  {
    id: "SUP-004",
    product: "Fresh Milk",
    quantity: "300 liters",
    date: "2023-05-15",
    status: "SCHEDULED",
    paymentStatus: "PENDING",
    amount: 450.0,
    recipient: "Hayoma Dairy Processing Plant",
  },
  {
    id: "SUP-005",
    product: "Butter",
    quantity: "50 kg",
    date: "2023-05-08",
    status: "DELIVERED",
    paymentStatus: "PAID",
    amount: 375.0,
    recipient: "Hayoma Dairy Processing Plant",
  },
  {
    id: "SUP-006",
    product: "Cream",
    quantity: "100 liters",
    date: "2023-05-16",
    status: "SCHEDULED",
    paymentStatus: "PENDING",
    amount: 300.0,
    recipient: "Hayoma Dairy Processing Plant",
  },
  {
    id: "SUP-007",
    product: "Whipped Cream",
    quantity: "75 cans",
    date: "2023-05-05",
    status: "DELIVERED",
    paymentStatus: "PAID",
    amount: 225.0,
    recipient: "Hayoma Dairy Processing Plant",
  },
]

export default function SupplierHistoryDashboard() {
  const { user } = useAuth()
  const [supplyHistory, setSupplyHistory] = useState(mockSupplyHistory)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [paymentFilter, setPaymentFilter] = useState("all")
  const [sortConfig, setSortConfig] = useState<{
    key: string
    direction: "ascending" | "descending"
  } | null>(null)
  const [isViewSupplyOpen, setIsViewSupplyOpen] = useState(false)
  const [currentSupply, setCurrentSupply] = useState<any>(null)

  const viewSupply = (supply: any) => {
    setCurrentSupply(supply)
    setIsViewSupplyOpen(true)
  }

  const requestSort = (key: string) => {
    let direction: "ascending" | "descending" = "ascending"
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }
    setSortConfig({ key, direction })
  }

  // Apply filters and search
  let filteredSupplies = [...supplyHistory]

  if (statusFilter !== "all") {
    filteredSupplies = filteredSupplies.filter((supply) => supply.status === statusFilter)
  }

  if (paymentFilter !== "all") {
    filteredSupplies = filteredSupplies.filter((supply) => supply.paymentStatus === paymentFilter)
  }

  if (searchTerm) {
    filteredSupplies = filteredSupplies.filter(
      (supply) =>
        supply.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supply.product.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }

  // Apply sorting
  if (sortConfig !== null) {
    filteredSupplies.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1
      }
      return 0
    })
  }

  // Calculate statistics
  const totalSupplies = supplyHistory.length
  const deliveredSupplies = supplyHistory.filter((supply) => supply.status === "DELIVERED").length
  const inTransitSupplies = supplyHistory.filter((supply) => supply.status === "IN_TRANSIT").length
  const scheduledSupplies = supplyHistory.filter((supply) => supply.status === "SCHEDULED").length
  const totalRevenue = supplyHistory.reduce((sum, supply) => sum + supply.amount, 0)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "DELIVERED":
        return <Badge className="bg-green-500">Delivered</Badge>
      case "IN_TRANSIT":
        return <Badge className="bg-blue-500">In Transit</Badge>
      case "SCHEDULED":
        return <Badge className="bg-amber-500">Scheduled</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getPaymentBadge = (status: string) => {
    switch (status) {
      case "PAID":
        return <Badge className="bg-green-500">Paid</Badge>
      case "PENDING":
        return <Badge variant="outline">Pending</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Supply History</h1>
        <p className="text-muted-foreground">Track your supply history and payments</p>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 border-blue-100 dark:border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Total Supplies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{totalSupplies}</div>
            <p className="text-sm text-muted-foreground">All time supplies</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-white dark:from-gray-900 dark:to-gray-800 border-green-100 dark:border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Delivered</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">{deliveredSupplies}</div>
            <p className="text-sm text-muted-foreground">Successfully delivered</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-amber-50 to-white dark:from-gray-900 dark:to-gray-800 border-amber-100 dark:border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Scheduled</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">
              {scheduledSupplies + inTransitSupplies}
            </div>
            <p className="text-sm text-muted-foreground">Upcoming & in transit</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-white dark:from-gray-900 dark:to-gray-800 border-purple-100 dark:border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">${totalRevenue.toFixed(2)}</div>
            <p className="text-sm text-muted-foreground">All time earnings</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-blue-100 dark:border-gray-700">
        <CardHeader>
          <CardTitle>Supply Records</CardTitle>
          <CardDescription>View your complete supply history</CardDescription>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search supplies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 bg-white dark:bg-gray-950"
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px] bg-white dark:bg-gray-950">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <span>Status</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="DELIVERED">Delivered</SelectItem>
                  <SelectItem value="IN_TRANSIT">In Transit</SelectItem>
                  <SelectItem value="SCHEDULED">Scheduled</SelectItem>
                </SelectContent>
              </Select>
              <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                <SelectTrigger className="w-[150px] bg-white dark:bg-gray-950">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    <span>Payment</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Payments</SelectItem>
                  <SelectItem value="PAID">Paid</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
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
                  <TableHead className="cursor-pointer" onClick={() => requestSort("id")}>
                    <div className="flex items-center gap-1">
                      ID
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => requestSort("product")}>
                    <div className="flex items-center gap-1">
                      Product
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead className="cursor-pointer" onClick={() => requestSort("date")}>
                    <div className="flex items-center gap-1">
                      Date
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => requestSort("status")}>
                    <div className="flex items-center gap-1">
                      Status
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => requestSort("paymentStatus")}>
                    <div className="flex items-center gap-1">
                      Payment
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => requestSort("amount")}>
                    <div className="flex items-center gap-1">
                      Amount
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSupplies.map((supply) => (
                  <TableRow key={supply.id} className="bg-white dark:bg-gray-950">
                    <TableCell className="font-medium">{supply.id}</TableCell>
                    <TableCell>{supply.product}</TableCell>
                    <TableCell>{supply.quantity}</TableCell>
                    <TableCell>{new Date(supply.date).toLocaleDateString()}</TableCell>
                    <TableCell>{getStatusBadge(supply.status)}</TableCell>
                    <TableCell>{getPaymentBadge(supply.paymentStatus)}</TableCell>
                    <TableCell>${supply.amount.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => viewSupply(supply)} className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredSupplies.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-4 text-muted-foreground">
                      No supplies found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Supply View Dialog */}
      <Dialog open={isViewSupplyOpen} onOpenChange={setIsViewSupplyOpen}>
        <DialogContent className="sm:max-w-[600px]">
          {currentSupply && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">Supply {currentSupply.id}</DialogTitle>
                <DialogDescription>Supply details and information</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Product</h3>
                    <p className="font-medium">{currentSupply.product}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Quantity</h3>
                    <p>{currentSupply.quantity}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Date</h3>
                    <p>{new Date(currentSupply.date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                    <div className="flex items-center gap-2 mt-1">{getStatusBadge(currentSupply.status)}</div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Payment</h3>
                    <div className="flex items-center gap-2 mt-1">{getPaymentBadge(currentSupply.paymentStatus)}</div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Amount</h3>
                    <p className="font-medium">${currentSupply.amount.toFixed(2)}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Recipient</h3>
                  <p>{currentSupply.recipient}</p>
                </div>
                <div className="rounded-md border p-4 bg-blue-50 dark:bg-blue-950 border-blue-100 dark:border-blue-900 mt-2">
                  <div className="flex items-center gap-2 mb-2">
                    <TruckIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <h3 className="font-medium">Delivery Information</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {currentSupply.status === "DELIVERED"
                      ? `This supply was successfully delivered on ${new Date(currentSupply.date).toLocaleDateString()}.`
                      : currentSupply.status === "IN_TRANSIT"
                        ? "This supply is currently in transit and will be delivered soon."
                        : `This supply is scheduled for delivery on ${new Date(currentSupply.date).toLocaleDateString()}.`}
                  </p>
                </div>
                <div className="rounded-md border p-4 bg-green-50 dark:bg-green-950 border-green-100 dark:border-green-900">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
                    <h3 className="font-medium">Payment Information</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {currentSupply.paymentStatus === "PAID"
                      ? `Payment of $${currentSupply.amount.toFixed(2)} has been processed and completed.`
                      : `Payment of $${currentSupply.amount.toFixed(2)} is pending and will be processed upon delivery.`}
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsViewSupplyOpen(false)}>
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
