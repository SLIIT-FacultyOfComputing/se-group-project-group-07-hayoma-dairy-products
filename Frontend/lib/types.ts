export type UserRole = "admin" | "shop" | "supplier" | "driver"

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
}

export interface Product {
  id: string
  name: string
  price: number
  unit: string
}

export interface Delivery {
  id: string
  from: string
  to: string
  items: DeliveryItem[]
  status: "pending" | "in-progress" | "delivered"
}

export interface DeliveryItem {
  productId: string
  quantity: number
}

