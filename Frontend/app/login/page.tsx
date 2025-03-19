"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // For demo purposes, hardcoded admin credentials
      if (username === "admin" && password === "admin123") {
        // In a real app, you would call your Spring Boot backend here
        // const response = await fetch('/api/auth/login', {...})

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Store auth state (in a real app, you'd store a token)
        localStorage.setItem(
          "user",
          JSON.stringify({
            username: "admin",
            role: "admin",
            name: "Admin User",
          }),
        )

        router.push("/dashboard")
      } else if (username === "supplier" && password === "supplier123") {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        localStorage.setItem(
          "user",
          JSON.stringify({
            username: "supplier",
            role: "supplier",
            name: "Supplier User",
          }),
        )
        router.push("/dashboard")
      } else if (username === "shop" && password === "shop123") {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        localStorage.setItem(
          "user",
          JSON.stringify({
            username: "shop",
            role: "shop",
            name: "Shop User",
          }),
        )
        router.push("/dashboard")
      } else if (username === "driver" && password === "driver123") {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        localStorage.setItem(
          "user",
          JSON.stringify({
            username: "driver",
            role: "driver",
            name: "Driver User",
          }),
        )
        router.push("/dashboard")
      } else {
        setError("Invalid username or password")
      }
    } catch (err) {
      setError("An error occurred during login")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 items-center">
        <div className="hidden md:block">
          <div className="relative h-[500px] w-full">
            <Image src="/dairy-login.png" alt="Dairy Management" fill className="object-cover rounded-2xl shadow-2xl" />
            <div className="absolute inset-0 bg-blue-600/20 rounded-2xl flex items-center justify-center">
              <div className="bg-white/90 p-6 rounded-xl max-w-xs text-center">
                <Image src="/hayoma-logo.png" alt="Hayoma Dairy" width={80} height={80} className="mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-blue-700">Hayoma Dairy</h2>
                <p className="text-blue-600 mt-2">Complete dairy management solution for your business</p>
              </div>
            </div>
          </div>
        </div>

        <Card className="w-full shadow-xl border-blue-100">
          <CardHeader className="space-y-1">
            <div className="text-center mb-4 md:hidden">
              <Image src="/hayoma-logo.png" alt="Hayoma Dairy" width={60} height={60} className="mx-auto" />
              <h1 className="text-2xl font-bold text-blue-600 mt-2">Hayoma Dairy</h1>
            </div>
            <CardTitle className="text-2xl font-bold">Login</CardTitle>
            <CardDescription>Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="Enter your username"
                  className="border-blue-200 focus:border-blue-400"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  className="border-blue-200 focus:border-blue-400"
                />
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <p className="text-sm text-blue-600 text-center">
              For demo: use username <strong>admin</strong> and password <strong>admin123</strong>
            </p>
            <p className="text-sm text-blue-600 text-center">
              Or try: <strong>supplier/supplier123</strong>, <strong>shop/shop123</strong>,{" "}
              <strong>driver/driver123</strong>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

