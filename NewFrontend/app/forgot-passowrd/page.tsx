"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, ArrowLeft, Check } from "lucide-react"

export default function ForgotPasswordPage() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [otp, setOtp] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [step, setStep] = useState(1) // 1: Email, 2: OTP, 3: New Password, 4: Success

    const handleRequestOTP = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        try {
            // In a real app, you would call your Spring Boot backend here
            // const response = await fetch('/api/auth/forgot-password', {...})

            // Simulate API delay
            await new Promise((resolve) => setTimeout(resolve, 1500))

            // Move to OTP step
            setStep(2)
        } catch (err) {
            setError("An error occurred while sending OTP")
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const handleVerifyOTP = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        try {
            // In a real app, you would verify the OTP with your backend
            // const response = await fetch('/api/auth/verify-otp', {...})

            // Simulate API delay
            await new Promise((resolve) => setTimeout(resolve, 1500))

            // For demo, any 6-digit OTP is accepted
            if (otp.length === 6 && /^\d+$/.test(otp)) {
                setStep(3)
            } else {
                setError("Invalid OTP. Please enter a 6-digit code.")
            }
        } catch (err) {
            setError("An error occurred while verifying OTP")
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        try {
            if (newPassword !== confirmPassword) {
                setError("Passwords do not match")
                setLoading(false)
                return
            }

            if (newPassword.length < 8) {
                setError("Password must be at least 8 characters long")
                setLoading(false)
                return
            }

            // In a real app, you would reset the password with your backend
            // const response = await fetch('/api/auth/reset-password', {...})

            // Simulate API delay
            await new Promise((resolve) => setTimeout(resolve, 1500))

            // Move to success step
            setStep(4)
        } catch (err) {
            setError("An error occurred while resetting password")
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <div className="text-center mb-4">
                        <h1 className="text-3xl font-bold text-primary">Hayoma Dairy</h1>
                    </div>
                    <CardTitle className="text-2xl font-bold">Forgot Password</CardTitle>
                    <CardDescription>
                        {step === 1 && "Enter your email to receive a password reset code"}
                        {step === 2 && "Enter the 6-digit code sent to your email"}
                        {step === 3 && "Create a new password for your account"}
                        {step === 4 && "Your password has been reset successfully"}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {error && (
                        <Alert variant="destructive" className="mb-4">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    {step === 1 && (
                        <form onSubmit={handleRequestOTP} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="Enter your email address"
                                />
                            </div>
                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? "Sending..." : "Send Reset Code"}
                            </Button>
                        </form>
                    )}

                    {step === 2 && (
                        <form onSubmit={handleVerifyOTP} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="otp">Verification Code</Label>
                                <Input
                                    id="otp"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    required
                                    placeholder="Enter 6-digit code"
                                    maxLength={6}
                                />
                                <p className="text-sm text-muted-foreground">We've sent a 6-digit code to {email}</p>
                            </div>
                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? "Verifying..." : "Verify Code"}
                            </Button>
                            <Button type="button" variant="ghost" className="w-full" onClick={() => setStep(1)}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Email
                            </Button>
                        </form>
                    )}

                    {step === 3 && (
                        <form onSubmit={handleResetPassword} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="new-password">New Password</Label>
                                <Input
                                    id="new-password"
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                    placeholder="Enter new password"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirm-password">Confirm Password</Label>
                                <Input
                                    id="confirm-password"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    placeholder="Confirm new password"
                                />
                            </div>
                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? "Resetting..." : "Reset Password"}
                            </Button>
                        </form>
                    )}

                    {step === 4 && (
                        <div className="text-center space-y-4">
                            <div className="flex justify-center">
                                <div className="rounded-full bg-green-100 p-3">
                                    <Check className="h-8 w-8 text-green-600" />
                                </div>
                            </div>
                            <p>Your password has been reset successfully.</p>
                            <Button className="w-full" onClick={() => router.push("/login")}>
                                Return to Login
                            </Button>
                        </div>
                    )}
                </CardContent>
                {step !== 4 && (
                    <CardFooter>
                        <div className="w-full text-center">
                            <Link href="/login" className="text-sm text-primary hover:underline">
                                Back to login
                            </Link>
                        </div>
                    </CardFooter>
                )}
            </Card>
        </div>
    )
}

