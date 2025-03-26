"use client"

import type React from "react"

import { createContext, useContext } from "react"
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

  const isLoading = status === "loading"
  const user = session?.user || null

  const login = async (email: string, password: string) => {
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        toast.error("Invalid credentials")
        throw new Error(result.error)
      }

      if (result?.ok) {
        toast.success("Login successful")
        router.refresh()

        // Give time for the session to update
        setTimeout(() => {
          if (session?.user?.role) {
            router.push(`/dashboard/${session.user.role}`)
          } else {
            router.push("/dashboard/admin")
          }
        }, 300)
      }
    } catch (error) {
      console.error("Login error:", error)
      throw error
    }
  }

  const logout = async () => {
    await signOut({ redirect: false })
    toast.success("Logged out successfully")
    router.push("/login")
    router.refresh()
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

