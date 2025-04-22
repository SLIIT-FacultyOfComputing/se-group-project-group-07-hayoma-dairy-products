"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Search, Plus, RefreshCw, Edit, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Sample raw materials data
const initialRawMaterials = [
  {
    id: 1,
    name: "Fresh Milk",
    supplier: "Green Meadows Farm",
    quantity: 5000,
    unit: "liters",
    lastDelivery: "2023-06-15",
    status: "In Stock",
    expiryDate: "2023-06-22",
    threshold: 1000,
  },
  {
    id: 2,
    name: "Cream",
    supplier: "Sunny Valley Dairy",
    quantity: 1200,
    unit: "liters",
    lastDelivery: "2023-06-14",
    status: "In Stock",
    expiryDate: "2023-06-21",
    threshold: 500,
  },
  {
    id: 3,
    name: "Sugar",
    supplier: "Sweet Supplies Inc.",
    quantity: 200,
    unit: "kg",
    lastDelivery: "2023-06-10",
    status: "Low Stock",
    expiryDate: "2023-12-10",
    threshold: 300,
  },
  {
    id: 4,
    name: "Fruit Puree",
    supplier: "Fresh Fruit Co.",
    quantity: 150,
    unit: "kg",
    lastDelivery: "2023-06-12",
    status: "Low Stock",
    expiryDate: "2023-07-12",
    threshold: 200,
  },
  {
    id: 5,
    name: "Flavoring",
    supplier: "Flavor Masters",
    quantity: 100,
    unit: "liters",
    lastDelivery: "2023-06-05",
    status: "In Stock",
    expiryDate: "2023-12-05",
    threshold: 50,
  },
];

// Sample products data
const initialProducts = [
  {
    id: 1,
    name: "Whole Milk 1L",
    category: "Milk",
    quantity: 2500,
    unit: "units",
    productionDate: "2023-06-15",
    status: "In Stock",
    expiryDate: "2023-06-29",
    threshold: 500,
    price: 5.99,
  },
  {
    id: 2,
    name: "Skim Milk 1L",
    category: "Milk",
    quantity: 1800,
    unit: "units",
    productionDate: "2023-06-15",
    status: "In Stock",
    expiryDate: "2023-06-29",
    threshold: 400,
    price: 4.99,
  },
  {
    id: 3,
    name: "Strawberry Yogurt 200g",
    category: "Yogurt",
    quantity: 1200,
    unit: "units",
    productionDate: "2023-06-14",
    status: "In Stock",
    expiryDate: "2023-07-05",
    threshold: 300,
    price: 3.49,
  },
  {
    id: 4,
    name: "Cheddar Cheese 500g",
    category: "Cheese",
    quantity: 150,
    unit: "units",
    productionDate: "2023-06-10",
    status: "Low Stock",
    expiryDate: "2023-08-10",
    threshold: 200,
    price: 7.99,
  },
  {
    id: 5,
    name: "Butter 250g",
    category: "Butter",
    quantity: 750,
    unit: "units",
    productionDate: "2023-06-12",
    status: "In Stock",
    expiryDate: "2023-07-12",
    threshold: 200,
    price: 4.49,
  },
];

// Sample suppliers
const suppliers = [
  { id: 1, name: "Green Meadows Farm", materials: ["Fresh Milk", "Cream"] },
  {
    id: 2,
    name: "Sunny Valley Dairy",
    materials: ["Fresh Milk", "Cream", "Butter"],
  },
  { id: 3, name: "Sweet Supplies Inc.", materials: ["Sugar"] },
  { id: 4, name: "Fresh Fruit Co.", materials: ["Fruit Puree"] },
  { id: 5, name: "Flavor Masters", materials: ["Flavoring"] },
];

// Product categories
const productCategories = [
  "Milk",
  "Yogurt",
  "Cheese",
  "Butter",
  "Cream",
  "Other",
];

// Units
const units = ["liters", "kg", "units", "boxes", "packages"];

export default function InventoryPage() {
  const [user, setUser] = useState(null);
  const [rawMaterialsList, setRawMaterialsList] = useState(initialRawMaterials);
  const [productsList, setProductsList] = useState(initialProducts);
  const [rawMaterialsSearch, setRawMaterialsSearch] = useState("");
  const [productsSearch, setProductsSearch] = useState("");
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false);
  const [currentRequest, setCurrentRequest] = useState({
    id: 0,
    name: "",
    supplier: "",
    quantity: 0,
    unit: "",
  });
  const [requestQuantity, setRequestQuantity] = useState("");
  const [requestNote, setRequestNote] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [mounted, setMounted] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(null);

  // New state for add/edit dialogs
  const [isAddRawMaterialOpen, setIsAddRawMaterialOpen] = useState(false);
  const [isEditRawMaterialOpen, setIsEditRawMaterialOpen] = useState(false);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isEditProductOpen, setIsEditProductOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentRawMaterial, setCurrentRawMaterial] = useState({
    id: 0,
    name: "",
    supplier: "",
    quantity: "",
    unit: "liters",
    lastDelivery: "",
    status: "In Stock",
    expiryDate: "",
    threshold: "",
  });
  const [currentProduct, setCurrentProduct] = useState({
    id: 0,
    name: "",
    category: "",
    quantity: "",
    unit: "units",
    productionDate: "",
    status: "In Stock",
    expiryDate: "",
    threshold: "",
    price: "",
  });
  const [itemToDelete, setItemToDelete] = useState({ id: 0, type: "" });

  useEffect(() => {
    setMounted(true);
    // Get user from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const filteredRawMaterials = rawMaterialsList.filter(
    (material) =>
      material.name.toLowerCase().includes(rawMaterialsSearch.toLowerCase()) ||
      material.supplier.toLowerCase().includes(rawMaterialsSearch.toLowerCase())
  );

  const filteredProducts = productsList.filter(
    (product) =>
      product.name.toLowerCase().includes(productsSearch.toLowerCase()) ||
      product.category.toLowerCase().includes(productsSearch.toLowerCase())
  );

  const handleRequestMaterial = (material: any) => {
    setSelectedMaterial(material);
    setCurrentRequest({
      id: material.id,
      name: material.name,
      supplier: material.supplier,
      quantity: 0,
      unit: material.unit,
    });
    setRequestQuantity("");
    setRequestNote("");
    setSelectedSupplier(material.supplier);
    setIsRequestDialogOpen(true);
  };

  const handleSubmitRequest = () => {
    if (!requestQuantity || Number.parseInt(requestQuantity) <= 0) {
      toast({
        title: "Invalid quantity",
        description: "Please enter a valid quantity.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, you would send this request to your backend
    toast({
      title: "Request sent",
      description: `Requested ${requestQuantity} ${currentRequest.unit} of ${currentRequest.name} from ${selectedSupplier}`,
    });

    // Update the status to "Requested"
    const updatedMaterials = rawMaterialsList.map((material) =>
      material.id === currentRequest.id
        ? { ...material, status: "Requested" }
        : material
    );

    setRawMaterialsList(updatedMaterials);
    setIsRequestDialogOpen(false);
  };

  // Add new raw material
  const handleAddRawMaterial = () => {
    // Validate form
    if (
      !currentRawMaterial.name ||
      !currentRawMaterial.supplier ||
      !currentRawMaterial.quantity ||
      !currentRawMaterial.threshold
    ) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const newId = Math.max(...rawMaterialsList.map((item) => item.id), 0) + 1;
    const newMaterial = {
      ...currentRawMaterial,
      id: newId,
      quantity: Number(currentRawMaterial.quantity),
      threshold: Number(currentRawMaterial.threshold),
      lastDelivery:
        currentRawMaterial.lastDelivery ||
        new Date().toISOString().split("T")[0],
      status:
        Number(currentRawMaterial.quantity) <
        Number(currentRawMaterial.threshold)
          ? "Low Stock"
          : "In Stock",
    };

    setRawMaterialsList([...rawMaterialsList, newMaterial]);
    setIsAddRawMaterialOpen(false);
    resetRawMaterialForm();

    toast({
      title: "Raw material added",
      description: `${newMaterial.name} has been added to inventory.`,
    });
  };

  // Edit raw material
  const handleEditRawMaterial = () => {
    // Validate form
    if (
      !currentRawMaterial.name ||
      !currentRawMaterial.supplier ||
      !currentRawMaterial.quantity ||
      !currentRawMaterial.threshold
    ) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const updatedMaterials = rawMaterialsList.map((material) =>
      material.id === currentRawMaterial.id
        ? {
            ...currentRawMaterial,
            quantity: Number(currentRawMaterial.quantity),
            threshold: Number(currentRawMaterial.threshold),
            status:
              Number(currentRawMaterial.quantity) <
              Number(currentRawMaterial.threshold)
                ? "Low Stock"
                : "In Stock",
          }
        : material
    );

    setRawMaterialsList(updatedMaterials);
    setIsEditRawMaterialOpen(false);
    resetRawMaterialForm();

    toast({
      title: "Raw material updated",
      description: `${currentRawMaterial.name} has been updated.`,
    });
  };

  // Add new product
  const handleAddProduct = () => {
    // Validate form
    if (
      !currentProduct.name ||
      !currentProduct.category ||
      !currentProduct.quantity ||
      !currentProduct.threshold ||
      !currentProduct.price
    ) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const newId = Math.max(...productsList.map((item) => item.id), 0) + 1;
    const newProduct = {
      ...currentProduct,
      id: newId,
      quantity: Number(currentProduct.quantity),
      threshold: Number(currentProduct.threshold),
      price: Number(currentProduct.price),
      productionDate:
        currentProduct.productionDate || new Date().toISOString().split("T")[0],
      status:
        Number(currentProduct.quantity) < Number(currentProduct.threshold)
          ? "Low Stock"
          : "In Stock",
    };

    setProductsList([...productsList, newProduct]);
    setIsAddProductOpen(false);
    resetProductForm();

    toast({
      title: "Product added",
      description: `${newProduct.name} has been added to inventory.`,
    });
  };

  // Edit product
  const handleEditProduct = () => {
    // Validate form
    if (
      !currentProduct.name ||
      !currentProduct.category ||
      !currentProduct.quantity ||
      !currentProduct.threshold ||
      !currentProduct.price
    ) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const updatedProducts = productsList.map((product) =>
      product.id === currentProduct.id
        ? {
            ...currentProduct,
            quantity: Number(currentProduct.quantity),
            threshold: Number(currentProduct.threshold),
            price: Number(currentProduct.price),
            status:
              Number(currentProduct.quantity) < Number(currentProduct.threshold)
                ? "Low Stock"
                : "In Stock",
          }
        : product
    );

    setProductsList(updatedProducts);
    setIsEditProductOpen(false);
    resetProductForm();

    toast({
      title: "Product updated",
      description: `${currentProduct.name} has been updated.`,
    });
  };

  // Delete item (raw material or product)
  const handleDeleteItem = () => {
    if (itemToDelete.type === "raw-material") {
      const updatedMaterials = rawMaterialsList.filter(
        (material) => material.id !== itemToDelete.id
      );
      setRawMaterialsList(updatedMaterials);

      toast({
        title: "Raw material deleted",
        description: "The raw material has been removed from inventory.",
      });
    } else if (itemToDelete.type === "product") {
      const updatedProducts = productsList.filter(
        (product) => product.id !== itemToDelete.id
      );
      setProductsList(updatedProducts);

      toast({
        title: "Product deleted",
        description: "The product has been removed from inventory.",
      });
    }

    setIsDeleteDialogOpen(false);
  };

  // Reset forms
  const resetRawMaterialForm = () => {
    setCurrentRawMaterial({
      id: 0,
      name: "",
      supplier: "",
      quantity: "",
      unit: "liters",
      lastDelivery: "",
      status: "In Stock",
      expiryDate: "",
      threshold: "",
    });
  };

  const resetProductForm = () => {
    setCurrentProduct({
      id: 0,
      name: "",
      category: "",
      quantity: "",
      unit: "units",
      productionDate: "",
      status: "In Stock",
      expiryDate: "",
      threshold: "",
      price: "",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "In Stock":
        return <Badge className="bg-green-500">In Stock</Badge>;
      case "Low Stock":
        return <Badge variant="destructive">Low Stock</Badge>;
      case "Requested":
        return (
          <Badge
            variant="outline"
            className="bg-blue-100 text-blue-800 border-blue-300"
          >
            Requested
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  if (!mounted) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Inventory Management
        </h1>
        <p className="text-blue-600 dark:text-blue-400">
          Manage raw materials and finished products
        </p>
      </div>

      <Tabs defaultValue="raw-materials" className="space-y-4">
        <TabsList className="bg-blue-100 dark:bg-blue-900/30">
          <TabsTrigger
            value="raw-materials"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800"
          >
            Raw Materials
          </TabsTrigger>
          <TabsTrigger
            value="products"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800"
          >
            Products
          </TabsTrigger>
        </TabsList>

        <TabsContent value="raw-materials" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="relative max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search raw materials..."
                className="pl-8"
                value={rawMaterialsSearch}
                onChange={(e) => setRawMaterialsSearch(e.target.value)}
              />
            </div>
            <Button
              onClick={() => {
                resetRawMaterialForm();
                setIsAddRawMaterialOpen(true);
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Raw Material
            </Button>
          </div>

          <Card className="border-blue-100 dark:border-blue-900/30">
            <CardHeader className="bg-blue-50 dark:bg-blue-900/10 rounded-t-lg">
              <CardTitle className="text-blue-800 dark:text-blue-300">
                Raw Materials Inventory
              </CardTitle>
              <CardDescription className="text-blue-600 dark:text-blue-400">
                Manage your raw materials stock and request supplies when low
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Last Delivery</TableHead>
                    <TableHead>Expiry Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRawMaterials.map((material) => (
                    <TableRow key={material.id}>
                      <TableCell className="font-medium">
                        {material.name}
                      </TableCell>
                      <TableCell>{material.supplier}</TableCell>
                      <TableCell>
                        {material.quantity} {material.unit}
                      </TableCell>
                      <TableCell>{material.lastDelivery}</TableCell>
                      <TableCell>{material.expiryDate}</TableCell>
                      <TableCell>{getStatusBadge(material.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {(material.status === "Low Stock" ||
                            material.quantity < material.threshold) && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleRequestMaterial(material)}
                              className="text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                            >
                              <RefreshCw className="mr-2 h-3 w-3" />
                              Request
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setCurrentRawMaterial({
                                ...material,
                                quantity: material.quantity.toString(),
                                threshold: material.threshold.toString(),
                              });
                              setIsEditRawMaterialOpen(true);
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
                              setItemToDelete({
                                id: material.id,
                                type: "raw-material",
                              });
                              setIsDeleteDialogOpen(true);
                            }}
                            className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                          >
                            <Trash2 className="mr-2 h-3 w-3" />
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredRawMaterials.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-4">
                        No raw materials found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="relative max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="pl-8"
                value={productsSearch}
                onChange={(e) => setProductsSearch(e.target.value)}
              />
            </div>
            <Button
              onClick={() => {
                resetProductForm();
                setIsAddProductOpen(true);
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </div>

          <Card className="border-blue-100 dark:border-blue-900/30">
            <CardHeader className="bg-blue-50 dark:bg-blue-900/10 rounded-t-lg">
              <CardTitle className="text-blue-800 dark:text-blue-300">
                Products Inventory
              </CardTitle>
              <CardDescription className="text-blue-600 dark:text-blue-400">
                Manage your finished products stock
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Production Date</TableHead>
                    <TableHead>Expiry Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">
                        {product.name}
                      </TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>
                        {product.quantity} {product.unit}
                      </TableCell>
                      <TableCell>${product.price?.toFixed(2)}</TableCell>
                      <TableCell>{product.productionDate}</TableCell>
                      <TableCell>{product.expiryDate}</TableCell>
                      <TableCell>
                        {product.quantity < product.threshold ? (
                          <Badge variant="destructive">Low Stock</Badge>
                        ) : (
                          <Badge className="bg-green-500">In Stock</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setCurrentProduct({
                                ...product,
                                quantity: product.quantity.toString(),
                                threshold: product.threshold.toString(),
                                price: product.price.toString(),
                              });
                              setIsEditProductOpen(true);
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
                              setItemToDelete({
                                id: product.id,
                                type: "product",
                              });
                              setIsDeleteDialogOpen(true);
                            }}
                            className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                          >
                            <Trash2 className="mr-2 h-3 w-3" />
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredProducts.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-4">
                        No products found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Request Dialog */}
      {isRequestDialogOpen && selectedMaterial && (
        <Dialog
          open={isRequestDialogOpen}
          onOpenChange={setIsRequestDialogOpen}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Request Raw Material</DialogTitle>
              <DialogDescription>
                Send a request to the supplier for additional raw materials.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="material">Material</Label>
                <Input id="material" value={currentRequest.name} readOnly />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="supplier">Supplier</Label>
                <Select
                  value={selectedSupplier}
                  onValueChange={setSelectedSupplier}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select supplier" />
                  </SelectTrigger>
                  <SelectContent>
                    {suppliers
                      .filter((supplier) =>
                        supplier.materials.includes(currentRequest.name)
                      )
                      .map((supplier) => (
                        <SelectItem key={supplier.id} value={supplier.name}>
                          {supplier.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="quantity">
                  Quantity ({currentRequest.unit})
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  value={requestQuantity}
                  onChange={(e) => setRequestQuantity(e.target.value)}
                  placeholder={`Enter quantity in ${currentRequest.unit}`}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="note">Note (Optional)</Label>
                <Input
                  id="note"
                  value={requestNote}
                  onChange={(e) => setRequestNote(e.target.value)}
                  placeholder="Add any special instructions"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsRequestDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleSubmitRequest}>Send Request</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Add Raw Material Dialog */}
      <Dialog
        open={isAddRawMaterialOpen}
        onOpenChange={setIsAddRawMaterialOpen}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Raw Material</DialogTitle>
            <DialogDescription>
              Add a new raw material to your inventory.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Material Name</Label>
              <Input
                id="name"
                value={currentRawMaterial.name}
                onChange={(e) =>
                  setCurrentRawMaterial({
                    ...currentRawMaterial,
                    name: e.target.value,
                  })
                }
                placeholder="Enter material name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="supplier">Supplier</Label>
              <Select
                value={currentRawMaterial.supplier}
                onValueChange={(value) =>
                  setCurrentRawMaterial({
                    ...currentRawMaterial,
                    supplier: value,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select supplier" />
                </SelectTrigger>
                <SelectContent>
                  {suppliers.map((supplier) => (
                    <SelectItem key={supplier.id} value={supplier.name}>
                      {supplier.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={currentRawMaterial.quantity}
                  onChange={(e) =>
                    setCurrentRawMaterial({
                      ...currentRawMaterial,
                      quantity: e.target.value,
                    })
                  }
                  placeholder="Enter quantity"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="unit">Unit</Label>
                <Select
                  value={currentRawMaterial.unit}
                  onValueChange={(value) =>
                    setCurrentRawMaterial({
                      ...currentRawMaterial,
                      unit: value,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {units.map((unit) => (
                      <SelectItem key={unit} value={unit}>
                        {unit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="threshold">Threshold</Label>
                <Input
                  id="threshold"
                  type="number"
                  value={currentRawMaterial.threshold}
                  onChange={(e) =>
                    setCurrentRawMaterial({
                      ...currentRawMaterial,
                      threshold: e.target.value,
                    })
                  }
                  placeholder="Enter threshold"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  type="date"
                  value={currentRawMaterial.expiryDate}
                  onChange={(e) =>
                    setCurrentRawMaterial({
                      ...currentRawMaterial,
                      expiryDate: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddRawMaterialOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleAddRawMaterial}>Add Material</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Raw Material Dialog */}
      <Dialog
        open={isEditRawMaterialOpen}
        onOpenChange={setIsEditRawMaterialOpen}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Raw Material</DialogTitle>
            <DialogDescription>
              Update raw material details in your inventory.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Material Name</Label>
              <Input
                id="edit-name"
                value={currentRawMaterial.name}
                onChange={(e) =>
                  setCurrentRawMaterial({
                    ...currentRawMaterial,
                    name: e.target.value,
                  })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-supplier">Supplier</Label>
              <Select
                value={currentRawMaterial.supplier}
                onValueChange={(value) =>
                  setCurrentRawMaterial({
                    ...currentRawMaterial,
                    supplier: value,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select supplier" />
                </SelectTrigger>
                <SelectContent>
                  {suppliers.map((supplier) => (
                    <SelectItem key={supplier.id} value={supplier.name}>
                      {supplier.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-quantity">Quantity</Label>
                <Input
                  id="edit-quantity"
                  type="number"
                  value={currentRawMaterial.quantity}
                  onChange={(e) =>
                    setCurrentRawMaterial({
                      ...currentRawMaterial,
                      quantity: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-unit">Unit</Label>
                <Select
                  value={currentRawMaterial.unit}
                  onValueChange={(value) =>
                    setCurrentRawMaterial({
                      ...currentRawMaterial,
                      unit: value,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {units.map((unit) => (
                      <SelectItem key={unit} value={unit}>
                        {unit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-threshold">Threshold</Label>
                <Input
                  id="edit-threshold"
                  type="number"
                  value={currentRawMaterial.threshold}
                  onChange={(e) =>
                    setCurrentRawMaterial({
                      ...currentRawMaterial,
                      threshold: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-expiryDate">Expiry Date</Label>
                <Input
                  id="edit-expiryDate"
                  type="date"
                  value={currentRawMaterial.expiryDate}
                  onChange={(e) =>
                    setCurrentRawMaterial({
                      ...currentRawMaterial,
                      expiryDate: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditRawMaterialOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleEditRawMaterial}>Update Material</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Product Dialog */}
      <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>
              Add a new product to your inventory.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="product-name">Product Name</Label>
              <Input
                id="product-name"
                value={currentProduct.name}
                onChange={(e) =>
                  setCurrentProduct({ ...currentProduct, name: e.target.value })
                }
                placeholder="Enter product name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="product-category">Category</Label>
              <Select
                value={currentProduct.category}
                onValueChange={(value) =>
                  setCurrentProduct({ ...currentProduct, category: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {productCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="product-quantity">Quantity</Label>
                <Input
                  id="product-quantity"
                  type="number"
                  value={currentProduct.quantity}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      quantity: e.target.value,
                    })
                  }
                  placeholder="Enter quantity"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="product-unit">Unit</Label>
                <Select
                  value={currentProduct.unit}
                  onValueChange={(value) =>
                    setCurrentProduct({ ...currentProduct, unit: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {units.map((unit) => (
                      <SelectItem key={unit} value={unit}>
                        {unit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="product-threshold">Threshold</Label>
                <Input
                  id="product-threshold"
                  type="number"
                  value={currentProduct.threshold}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      threshold: e.target.value,
                    })
                  }
                  placeholder="Enter threshold"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="product-price">Price ($)</Label>
                <Input
                  id="product-price"
                  type="number"
                  step="0.01"
                  value={currentProduct.price}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      price: e.target.value,
                    })
                  }
                  placeholder="Enter price"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="product-productionDate">Production Date</Label>
                <Input
                  id="product-productionDate"
                  type="date"
                  value={currentProduct.productionDate}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      productionDate: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="product-expiryDate">Expiry Date</Label>
                <Input
                  id="product-expiryDate"
                  type="date"
                  value={currentProduct.expiryDate}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      expiryDate: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddProductOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleAddProduct}>Add Product</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog open={isEditProductOpen} onOpenChange={setIsEditProductOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Update product details in your inventory.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-product-name">Product Name</Label>
              <Input
                id="edit-product-name"
                value={currentProduct.name}
                onChange={(e) =>
                  setCurrentProduct({ ...currentProduct, name: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-product-category">Category</Label>
              <Select
                value={currentProduct.category}
                onValueChange={(value) =>
                  setCurrentProduct({ ...currentProduct, category: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {productCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-product-quantity">Quantity</Label>
                <Input
                  id="edit-product-quantity"
                  type="number"
                  value={currentProduct.quantity}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      quantity: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-product-unit">Unit</Label>
                <Select
                  value={currentProduct.unit}
                  onValueChange={(value) =>
                    setCurrentProduct({ ...currentProduct, unit: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {units.map((unit) => (
                      <SelectItem key={unit} value={unit}>
                        {unit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-product-threshold">Threshold</Label>
                <Input
                  id="edit-product-threshold"
                  type="number"
                  value={currentProduct.threshold}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      threshold: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-product-price">Price ($)</Label>
                <Input
                  id="edit-product-price"
                  type="number"
                  step="0.01"
                  value={currentProduct.price}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      price: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-product-productionDate">
                  Production Date
                </Label>
                <Input
                  id="edit-product-productionDate"
                  type="date"
                  value={currentProduct.productionDate}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      productionDate: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-product-expiryDate">Expiry Date</Label>
                <Input
                  id="edit-product-expiryDate"
                  type="date"
                  value={currentProduct.expiryDate}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      expiryDate: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditProductOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleEditProduct}>Update Product</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the{" "}
              {itemToDelete.type === "raw-material"
                ? "raw material"
                : "product"}{" "}
              from your inventory.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteItem}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
