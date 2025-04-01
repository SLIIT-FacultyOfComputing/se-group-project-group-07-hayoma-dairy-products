const API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL

/**
 * Generic fetch function with error handling
 */
export async function fetchApi(endpoint: string, options?: RequestInit) {
  try {
    const url = `${API_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      throw new Error(error.message || `API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`API error for ${endpoint}:`, error)
    throw error
  }
}

/**
 * API functions for different entities
 */

// Users
export const userApi = {
  getAll: () => fetchApi("/users"),
  getById: (id: string) => fetchApi(`/users/${id}`),
  create: (data: any) => fetchApi("/users", { method: "POST", body: JSON.stringify(data) }),
  update: (id: string, data: any) => fetchApi(`/users/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  delete: (id: string) => fetchApi(`/users/${id}`, { method: "DELETE" }),
}

// Shops
export const shopApi = {
  getAll: () => fetchApi("/shops"),
  getById: (id: string) => fetchApi(`/shops/${id}`),
  create: (data: any) => fetchApi("/shops", { method: "POST", body: JSON.stringify(data) }),
  update: (id: string, data: any) => fetchApi(`/shops/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  delete: (id: string) => fetchApi(`/shops/${id}`, { method: "DELETE" }),
}

// Suppliers
export const supplierApi = {
  getAll: () => fetchApi("/suppliers"),
  getById: (id: string) => fetchApi(`/suppliers/${id}`),
  create: (data: any) => fetchApi("/suppliers", { method: "POST", body: JSON.stringify(data) }),
  update: (id: string, data: any) => fetchApi(`/suppliers/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  delete: (id: string) => fetchApi(`/suppliers/${id}`, { method: "DELETE" }),
}

// Products
export const productApi = {
  getAll: () => fetchApi("/products"),
  getById: (id: string) => fetchApi(`/products/${id}`),
  create: (data: any) => fetchApi("/products", { method: "POST", body: JSON.stringify(data) }),
  update: (id: string, data: any) => fetchApi(`/products/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  delete: (id: string) => fetchApi(`/products/${id}`, { method: "DELETE" }),
}

// Orders
export const orderApi = {
  getAll: () => fetchApi("/orders"),
  getById: (id: string) => fetchApi(`/orders/${id}`),
  create: (data: any) => fetchApi("/orders", { method: "POST", body: JSON.stringify(data) }),
  update: (id: string, data: any) => fetchApi(`/orders/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  updateStatus: (id: string, status: string) =>
    fetchApi(`/orders/${id}/status`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    }),
  delete: (id: string) => fetchApi(`/orders/${id}`, { method: "DELETE" }),
}

// Analytics
export const analyticsApi = {
  getSales: (timeRange: string) => fetchApi(`/analytics/sales?timeRange=${timeRange}`),
  getInventory: () => fetchApi("/analytics/inventory"),
  getOrders: () => fetchApi("/analytics/orders"),
}

