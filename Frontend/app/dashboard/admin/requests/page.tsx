"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { Search, Filter, CheckCircle, X, Truck } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

// Mock data for supply requests
const mockSupplyRequests = [
  {
    id: "req1",
    supplier: "Farm Fresh Dairy",
    product: "Fresh Milk",
    quantity: "500 liters",
    requestDate: "2023-05-10",
    deliveryDate: "2023-05-15",
    status: "approved",
    notes: "Regular weekly order",
  },
  {
    id: "req2",
    supplier: "Greek Delights",
    product: "Greek Yogurt",
    quantity: "200 kg",
    requestDate: "2023-05-12",
    deliveryDate: "2023-05-18",
    status: "pending",
    notes: "Special order for new product line",
  },
  {
    id: "req3",
    supplier: "Cheese Masters",
    product: "Cheddar Cheese",
    quantity: "100 kg",
    requestDate: "2023-05-14",
    deliveryDate: "2023-05-20",
    status: "pending",
    notes: "Urgent order for restaurant client",
  },
  {
    id: "req4",
    supplier: "Dairy Delights",
    product: "Butter",
    quantity: "150 kg",
    requestDate: "2023-05-08",
    deliveryDate: "2023-05-12",
    status: "completed",
    notes: "Monthly order",
  },
  {
    id: "req5",
    supplier: "Cream Supreme",
    product: "Cream",
    quantity: "300 liters",
    requestDate: "2023-05-09",
    deliveryDate: "2023-05-14",
    status: "rejected",
    notes: "Quality issues with previous batch",
  },
]

export default function AdminSupplyRequestsPage() {
  const [supplyRequests, setSupplyRequests] = useState(mockSupplyRequests)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [supplierFilter, setSupplierFilter] = useState("all")
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [currentRequest, setCurrentRequest] = useState<any>(null)
  const [responseNote, setResponseNote] = useState("")

  // Get unique suppliers for filter
  const suppliers = Array.from(new Set(supplyRequests.map((req) => req.supplier)))

  // Filter requests based on search term, status filter, and supplier filter
  const filteredRequests = supplyRequests.filter((request) => {
    const matchesSearch =
      request.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.notes.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || request.status === statusFilter
    const matchesSupplier = supplierFilter === "all" || request.supplier === supplierFilter

    return matchesSearch && matchesStatus && matchesSupplier
  })

  // Count requests by status
  const pendingCount = supplyRequests.filter((req) => req.status === "pending").length
  const approvedCount = supplyRequests.filter((req) => req.status === "approved").length
  const completedCount = supplyRequests.filter((req) => req.status === "completed").length
  const rejectedCount = supplyRequests.filter((req) => req.status === "rejected").length

  const handleViewRequest = (request: any) => {
    setCurrentRequest(request)
    setResponseNote("")
    setIsViewDialogOpen(true)
  }

  const handleUpdateStatus = (id: string, newStatus: string) => {
    setSupplyRequests((prev) => prev.map((req) => (req.id === id ? { ...req, status: newStatus } : req)))
    toast.success(`Request ${id} status updated to ${newStatus}`)
    setIsViewDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Supply Requests</h1>
        <p className="text-muted-foreground">Manage supplier supply requests</p>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card className="bg-blue-50 dark:bg-blue-950 border-blue-100 dark:border-blue-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{pendingCount}</div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>
        <Card className="bg-green-50 dark:bg-green-950 border-green-100 dark:border-green-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{approvedCount}</div>
            <p className="text-xs text-muted-foreground">Ready for delivery</p>
          </CardContent>
        </Card>
        <Card className="bg-purple-50 dark:bg-purple-950 border-purple-100 dark:border-purple-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{completedCount}</div>
            <p className="text-xs text-muted-foreground">Successfully delivered</p>
          </CardContent>
        </Card>
        <Card className="bg-red-50 dark:bg-red-950 border-red-100 dark:border-red-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">{rejectedCount}</div>
            <p className="text-xs text-muted-foreground">Not approved</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Supply Requests</CardTitle>
          <CardDescription>View and manage all supplier supply requests</CardDescription>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search requests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <span>Status</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Select value={supplierFilter} onValueChange={setSupplierFilter}>
                <SelectTrigger className="w-[180px]">
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Supplier</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Request Date</TableHead>
                <TableHead>Delivery Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.length > 0 ? (
                filteredRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.supplier}</TableCell>
                    <TableCell>{request.product}</TableCell>
                    <TableCell>{request.quantity}</TableCell>
                    <TableCell>{request.requestDate}</TableCell>
                    <TableCell>{request.deliveryDate}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          request.status === "pending"
                            ? "bg-blue-500"
                            : request.status === "approved"
                              ? "bg-green-500"
                              : request.status === "completed"
                                ? "bg-purple-500"
                                : "bg-red-500"
                        }
                      >
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => handleViewRequest(request)}>
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                    No supply requests found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View Request Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          {currentRequest && (
            <>
              <DialogHeader>
                <DialogTitle>Supply Request Details</DialogTitle>
                <DialogDescription>Review and respond to this supply request</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Supplier</h3>
                    <p className="font-medium">{currentRequest.supplier}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Product</h3>
                    <p className="font-medium">{currentRequest.product}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Quantity</h3>
                    <p className="font-medium">{currentRequest.quantity}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                    <Badge
                      className={
                        currentRequest.status === "pending"
                          ? "bg-blue-500"
                          : currentRequest.status === "approved"
                            ? "bg-green-500"
                            : currentRequest.status === "completed"
                              ? "bg-purple-500"
                              : "bg-red-500"
                      }
                    >
                      {currentRequest.status.charAt(0).toUpperCase() + currentRequest.status.slice(1)}
                    </Badge>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Request Date</h3>
                    <p className="font-medium">{currentRequest.requestDate}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Delivery Date</h3>
                    <p className="font-medium">{currentRequest.deliveryDate}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Notes</h3>
                  <p className="text-sm">{currentRequest.notes}</p>
                </div>
                {currentRequest.status === "pending" && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground">Response Note</h3>
                    <Textarea
                      value={responseNote}
                      onChange={(e) => setResponseNote(e.target.value)}
                      placeholder="Add a note to your response..."
                      rows={3}
                    />
                  </div>
                )}
              </div>
              <DialogFooter className="flex flex-col sm:flex-row gap-2">
                {currentRequest.status === "pending" && (
                  <>
                    <Button
                      onClick={() => handleUpdateStatus(currentRequest.id, "approved")}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleUpdateStatus(currentRequest.id, "rejected")}
                      className="text-red-600 border-red-200 hover:bg-red-50 dark:hover:bg-red-950"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                  </>
                )}
                {currentRequest.status === "approved" && (
                  <Button
                    onClick={() => handleUpdateStatus(currentRequest.id, "completed")}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <Truck className="h-4 w-4 mr-2" />
                    Mark as Delivered
                  </Button>
                )}
                <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
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
