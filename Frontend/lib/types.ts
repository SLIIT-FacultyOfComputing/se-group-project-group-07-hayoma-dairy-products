export type UserRole = "ADMIN" | "SHOP" | "SUPPLIER" | "DRIVER"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
}

export interface ShopData {
  id: string
  name: string
  inventory: InventoryItem[]
}

export interface SupplierData {
  id: string
  name: string
  products: Product[]
}

export interface DriverData {
  id: string
  name: string
  isActive: boolean
  currentDeliveries: Delivery[]
}

export interface InventoryItem {
  id: string
  name: string
  quantity: number
  unit: string
  category: string
  lastUpdated: string
  threshold: number
  supplier: string
}

export interface Product {
  id: string
  name: string
  price: number
  unit: string
  category: string
  description: string
  image?: string
  inStock: boolean
  supplier: string
}

export interface Order {
  id: string
  shopId: string
  shopName: string
  date: string
  status: "PENDING" | "APPROVED" | "SHIPPED" | "DELIVERED" | "CANCELLED"
  items: OrderItem[]
  total: number
  paymentStatus: "PAID" | "UNPAID"
  deliveryDate?: string
}

export interface OrderItem {
  productId: string
  productName: string
  quantity: number
  price: number
  subtotal: number
}

export interface Delivery {
  id: string
  from: string
  to: string
  items: DeliveryItem[]
  status: "PENDING" | "IN_PROGRESS" | "DELIVERED"
}

export interface DeliveryItem {
  productId: string
  quantity: number
}

export interface SalesData {
  date: string
  revenue: number
  orders: number
}

