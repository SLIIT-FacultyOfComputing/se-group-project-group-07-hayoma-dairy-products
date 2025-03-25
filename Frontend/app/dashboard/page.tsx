"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface User {
  username: string
  role: string
  name: string
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Get user from localStorage
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-blue-600 dark:text-blue-400">Welcome back, {user?.name || "User"}</p>
      </div>

      {user?.role === "admin" ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-blue-100 dark:border-blue-900/30">
            <CardHeader className="bg-blue-50 dark:bg-blue-900/10 pb-2">
              <CardTitle className="text-blue-800 dark:text-blue-300 text-lg">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-700 dark:text-blue-400">24</p>
            </CardContent>
          </Card>

          <Card className="border-blue-100 dark:border-blue-900/30">
            <CardHeader className="bg-blue-50 dark:bg-blue-900/10 pb-2">
              <CardTitle className="text-blue-800 dark:text-blue-300 text-lg">Inventory Items</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-700 dark:text-blue-400">156</p>
            </CardContent>
          </Card>

          <Card className="border-blue-100 dark:border-blue-900/30">
            <CardHeader className="bg-blue-50 dark:bg-blue-900/10 pb-2">
              <CardTitle className="text-blue-800 dark:text-blue-300 text-lg">Active Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-700 dark:text-blue-400">12</p>
            </CardContent>
          </Card>

          <Card className="border-blue-100 dark:border-blue-900/30">
            <CardHeader className="bg-blue-50 dark:bg-blue-900/10 pb-2">
              <CardTitle className="text-blue-800 dark:text-blue-300 text-lg">Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-700 dark:text-blue-400">$24,500</p>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card className="border-blue-100 dark:border-blue-900/30">
          <CardHeader className="bg-blue-50 dark:bg-blue-900/10">
            <CardTitle className="text-blue-800 dark:text-blue-300">Hayoma Dairy Management System</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-blue-600 dark:text-blue-400">
              Welcome to your dashboard. You are logged in as a{" "}
              <span className="font-semibold capitalize">{user?.role}</span>.
            </p>
            <p className="text-blue-600 dark:text-blue-400 mt-4">
              Use the sidebar to navigate to your available sections. If you need any assistance, please contact the
              system administrator.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

