"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import { useRouter } from "next/navigation"
import { signIn, signOut, useSession } from "next-auth/react"
import { toast } from "sonner"

interface AuthContextType {
  user: any
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [isLoading, setIsLoading] = useState(false)

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true)

      // BACKEND INTEGRATION: Authentication with NextAuth
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        toast.error("Invalid credentials")
        throw new Error("Invalid credentials")
      }

      if (result?.ok) {
        // BACKEND INTEGRATION: Redirect based on user role
        // This will be handled by the session callback in NextAuth
        router.push("/dashboard/admin")
        router.refresh()
        toast.success("Logged in successfully")
      }
    } catch (error) {
      console.error("Login error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    // BACKEND INTEGRATION: Sign out with NextAuth
    await signOut({ redirect: false })
    router.push("/login")
    toast.success("Logged out successfully")
  }

  return (
    <AuthContext.Provider
      value={{
        user: session?.user,
        login,
        logout,
        isLoading: status === "loading" || isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

