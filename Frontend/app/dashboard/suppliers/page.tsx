"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Search, Plus, Bell, Truck } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample supplier data
const suppliersList = [
  {
    id: 1,
    name: "Green Meadows Farm",
    contact: "John Smith",
    email: "john@greenmeadows.com",
    phone: "555-123-4567",
    materials: ["Fresh Milk", "Cream"],
    status: "active",
  },
  {
    id: 2,
    name: "Sunny Valley Dairy",
    contact: "Sarah Johnson",
    email: "sarah@sunnyvalley.com",
    phone: "555-987-6543",
    materials: ["Fresh Milk", "Cream"],
    status: "active",
  },
  {
    id: 3,
    name: "Chemical Solutions Inc.",
    contact: "Robert Brown",
    email: "robert@chemsolutions.com",
    phone: "555-456-7890",
    materials: ["Preservatives", "Stabilizers"],
    status: "inactive",
  },
  {
    id: 4,
    name: "Sweet Supplies Co.",
    contact: "Lisa Chen",
    email: "lisa@sweetsupplies.com",
    phone: "555-789-0123",
    materials: ["Sugar", "Sweeteners"],
    status: "active",
  },
];

// Sample raw materials that can be supplied
const availableMaterials = [
  { id: 1, name: "Fresh Milk", unit: "liters" },
  { id: 2, name: "Cream", unit: "liters" },
  { id: 3, name: "Sugar", unit: "kg" },
  { id: 4, name: "Sweeteners", unit: "kg" },
  { id: 5, name: "Preservatives", unit: "kg" },
  { id: 6, name: "Stabilizers", unit: "kg" },
  { id: 7, name: "Fruit Puree", unit: "kg" },
  { id: 8, name: "Flavoring", unit: "liters" },
];

// Sample incoming requests from admin
const incomingRequests = [
  {
    id: 1,
    material: "Fresh Milk",
    quantity: 2000,
    unit: "liters",
    requestDate: "2023-06-18",
    status: "pending",
    notes: "Need delivery by end of week",
  },
  {
    id: 2,
    material: "Cream",
    quantity: 500,
    unit: "liters",
    requestDate: "2023-06-17",
    status: "accepted",
    notes: "",
  },
  {
    id: 3,
    material: "Sugar",
    quantity: 300,
    unit: "kg",
    requestDate: "2023-06-16",
    status: "delivered",
    notes: "Delivered on 2023-06-18",
  },
];

export default function SuppliersPage() {
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isNotifyDialogOpen, setIsNotifyDialogOpen] = useState(false);
  const [notification, setNotification] = useState({
    material: "",
    quantity: "",
    availableDate: "",
    notes: "",
  });
  const [requests, setRequests] = useState(incomingRequests);
  const [mounted, setMounted] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    // Get user from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setMounted(true);
  }, []);

  const filteredSuppliers = suppliersList.filter(
    (supplier) =>
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.materials.some((material) =>
        material.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const handleNotifyAvailability = () => {
    if (
      !notification.material ||
      !notification.quantity ||
      !notification.availableDate
    ) {
      toast("Please fill in all required fields.");
      return;
    }

    // In a real app, you would send this notification to your backend
    toast(
      `Admin notified about ${notification.quantity} ${notification.material} available on ${notification.availableDate}`
    );

    setIsNotifyDialogOpen(false);
    setNotification({
      material: "",
      quantity: "",
      availableDate: "",
      notes: "",
    });
  };

  const handleRequestAction = (id, action) => {
    const updatedRequests = requests.map((request) =>
      request.id === id
        ? { ...request, status: action === "accept" ? "accepted" : "rejected" }
        : request
    );

    setRequests(updatedRequests);

    toast({
      title: action === "accept" ? "Request accepted" : "Request rejected",
      description:
        action === "accept"
          ? "You have accepted the request. Please prepare the materials for delivery."
          : "You have rejected the request. The admin will be notified.",
    });
  };

  if (!mounted) {
    return <div>Loading...</div>;
  }

  // If user is a supplier, show supplier dashboard
  if (user?.role === "supplier") {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Supplier Dashboard
          </h1>
          <p className="text-blue-600 dark:text-blue-400">
            Manage your raw material supplies and notify availability
          </p>
        </div>

        <Card className="border-blue-100 dark:border-blue-900/30">
          <CardHeader className="bg-blue-50 dark:bg-blue-900/10 rounded-t-lg">
            <CardTitle className="text-blue-800 dark:text-blue-300">
              <Bell className="inline-block mr-2 h-5 w-5" />
              New Material Requests from Hayoma Dairy
            </CardTitle>
            <CardDescription className="text-blue-600 dark:text-blue-400">
              The factory has requested the following raw materials
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Material</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Request Date</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests
                  .filter((req) => req.status === "pending")
                  .map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">
                        {request.material}
                      </TableCell>
                      <TableCell>
                        {request.quantity} {request.unit}
                      </TableCell>
                      <TableCell>{request.requestDate}</TableCell>
                      <TableCell>{request.notes || "-"}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="bg-yellow-100 text-yellow-800 border-yellow-300"
                        >
                          Pending
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleRequestAction(request.id, "accept")
                            }
                            className="text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700"
                          >
                            Accept
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleRequestAction(request.id, "reject")
                            }
                            className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                          >
                            Reject
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                {requests.filter((req) => req.status === "pending").length ===
                  0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                      No pending requests found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Tabs defaultValue="notify" className="space-y-4">
          <TabsList className="bg-blue-100 dark:bg-blue-900/30">
            <TabsTrigger
              value="notify"
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800"
            >
              Notify Availability
            </TabsTrigger>
            <TabsTrigger
              value="active"
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800"
            >
              Active Requests
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800"
            >
              Supply History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="notify" className="space-y-4">
            <Card className="border-blue-100 dark:border-blue-900/30">
              <CardHeader className="bg-blue-50 dark:bg-blue-900/10 rounded-t-lg">
                <CardTitle className="text-blue-800 dark:text-blue-300">
                  Notify Raw Material Availability
                </CardTitle>
                <CardDescription className="text-blue-600 dark:text-blue-400">
                  Let Hayoma Dairy know when you have raw materials available
                  for their production
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="material">Raw Material</Label>
                    <Select
                      value={notification.material}
                      onValueChange={(value) =>
                        setNotification({ ...notification, material: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select material" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableMaterials.map((material) => (
                          <SelectItem key={material.id} value={material.name}>
                            {material.name} ({material.unit})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={notification.quantity}
                      onChange={(e) =>
                        setNotification({
                          ...notification,
                          quantity: e.target.value,
                        })
                      }
                      placeholder="Enter quantity"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="availableDate">Available Date</Label>
                    <Input
                      id="availableDate"
                      type="date"
                      value={notification.availableDate}
                      onChange={(e) =>
                        setNotification({
                          ...notification,
                          availableDate: e.target.value,
                        })
                      }
                      placeholder="Select available date"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="notes">Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      value={notification.notes}
                      onChange={(e) =>
                        setNotification({
                          ...notification,
                          notes: e.target.value,
                        })
                      }
                      placeholder="Add any additional information about quality, pricing, etc."
                      rows={3}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={handleNotifyAvailability}
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                >
                  <Bell className="mr-2 h-4 w-4" />
                  Notify Availability
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="active" className="space-y-4">
            <Card className="border-blue-100 dark:border-blue-900/30">
              <CardHeader className="bg-blue-50 dark:bg-blue-900/10 rounded-t-lg">
                <CardTitle className="text-blue-800 dark:text-blue-300">
                  Active Requests
                </CardTitle>
                <CardDescription className="text-blue-600 dark:text-blue-400">
                  Manage accepted requests that are in progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Material</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Request Date</TableHead>
                      <TableHead>Notes</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {requests
                      .filter((req) => req.status === "accepted")
                      .map((request) => (
                        <TableRow key={request.id}>
                          <TableCell className="font-medium">
                            {request.material}
                          </TableCell>
                          <TableCell>
                            {request.quantity} {request.unit}
                          </TableCell>
                          <TableCell>{request.requestDate}</TableCell>
                          <TableCell>{request.notes || "-"}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className="bg-blue-100 text-blue-800 border-blue-300"
                            >
                              Accepted
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                              onClick={() => {
                                setSelectedRequest(request);
                                handleRequestAction(request.id, "delivered");
                              }}
                            >
                              <Truck className="mr-2 h-3 w-3" />
                              Mark Delivered
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    {requests.filter((req) => req.status === "accepted")
                      .length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-4">
                          No active requests found
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
                <CardTitle className="text-blue-800 dark:text-blue-300">
                  Supply History
                </CardTitle>
                <CardDescription className="text-blue-600 dark:text-blue-400">
                  View your past raw material deliveries to Hayoma Dairy
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Material</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Delivery Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead>Invoice</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {requests
                      .filter((req) => req.status === "delivered")
                      .map((request) => (
                        <TableRow key={request.id}>
                          <TableCell className="font-medium">
                            {request.material}
                          </TableCell>
                          <TableCell>
                            {request.quantity} {request.unit}
                          </TableCell>
                          <TableCell>{request.requestDate}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className="bg-green-100 text-green-800 border-green-300"
                            >
                              Delivered
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className="bg-green-500">Paid</Badge>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-blue-600"
                            >
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    <TableRow>
                      <TableCell className="font-medium">Fresh Milk</TableCell>
                      <TableCell>5000 liters</TableCell>
                      <TableCell>2023-06-15</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="bg-green-100 text-green-800 border-green-300"
                        >
                          Delivered
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-green-500">Paid</Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-600"
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Cream</TableCell>
                      <TableCell>1200 liters</TableCell>
                      <TableCell>2023-06-14</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="bg-green-100 text-green-800 border-green-300"
                        >
                          Delivered
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-green-500">Paid</Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-600"
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  // Admin view of suppliers
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Suppliers</h1>
        <p className="text-blue-600 dark:text-blue-400">
          Manage your raw material suppliers
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search suppliers..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Supplier
        </Button>
      </div>

      <Card className="border-blue-100 dark:border-blue-900/30">
        <CardHeader className="bg-blue-50 dark:bg-blue-900/10 rounded-t-lg">
          <CardTitle className="text-blue-800 dark:text-blue-300">
            Supplier Directory
          </CardTitle>
          <CardDescription className="text-blue-600 dark:text-blue-400">
            A list of all suppliers providing raw materials to your dairy
            factory
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
                <TableHead>Materials</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSuppliers.map((supplier) => (
                <TableRow key={supplier.id}>
                  <TableCell className="font-medium">{supplier.name}</TableCell>
                  <TableCell>{supplier.contact}</TableCell>
                  <TableCell>{supplier.email}</TableCell>
                  <TableCell>{supplier.phone}</TableCell>
                  <TableCell>{supplier.materials.join(", ")}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        supplier.status === "active" ? "default" : "secondary"
                      }
                      className="capitalize"
                    >
                      {supplier.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
              {filteredSuppliers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    No suppliers found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Notification Dialog */}
      {isNotifyDialogOpen && (
        <Dialog open={isNotifyDialogOpen} onOpenChange={setIsNotifyDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Notify Material Availability</DialogTitle>
              <DialogDescription>
                Let Hayoma Dairy know when you have raw materials available.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="material">Material</Label>
                <Select
                  value={notification.material}
                  onValueChange={(value) =>
                    setNotification({ ...notification, material: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select material" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableMaterials.map((material) => (
                      <SelectItem key={material.id} value={material.name}>
                        {material.name} ({material.unit})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={notification.quantity}
                  onChange={(e) =>
                    setNotification({
                      ...notification,
                      quantity: e.target.value,
                    })
                  }
                  placeholder="Enter quantity"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="availableDate">Available Date</Label>
                <Input
                  id="availableDate"
                  type="date"
                  value={notification.availableDate}
                  onChange={(e) =>
                    setNotification({
                      ...notification,
                      availableDate: e.target.value,
                    })
                  }
                  placeholder="Select available date"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  value={notification.notes}
                  onChange={(e) =>
                    setNotification({ ...notification, notes: e.target.value })
                  }
                  placeholder="Add any additional information"
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsNotifyDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleNotifyAvailability}>
                Send Notification
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
