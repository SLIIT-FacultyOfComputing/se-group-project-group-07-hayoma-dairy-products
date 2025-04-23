"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Loader2, Lock, Truck, Eye, EyeOff, Calendar } from "lucide-react"
import { toast } from "sonner"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function DriverSettingsPage() {
  const { user, updatePassword, isLoading } = useAuth()
  const [activeTab, setActiveTab] = useState("account")

  // Password change state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  // Driver settings state
  const [driverSettings, setDriverSettings] = useState({
    fullName: "John Driver",
    phone: "+1 (555) 123-4567",
    email: "driver@example.com",
    address: "789 Driver St, Anytown, USA",
    licenseNumber: "DL-12345678",
    licenseExpiry: "2025-12-31",
    vehicleType: "Refrigerated Truck",
    vehicleNumber: "TR-789",
    preferredArea: "North Region",
    maxDistance: "50",
    availableDays: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    startTime: "08:00",
    endTime: "17:00",
    receiveNotifications: true,
  })

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleDriverSettingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setDriverSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate passwords
    if (!passwordForm.currentPassword) {
      toast.error("Please enter your current password")
      return
    }

    if (!passwordForm.newPassword) {
      toast.error("Please enter a new password")
      return
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("New passwords do not match")
      return
    }

    if (passwordForm.newPassword.length < 8) {
      toast.error("New password must be at least 8 characters long")
      return
    }

    try {
      await updatePassword(passwordForm.currentPassword, passwordForm.newPassword)

      // Reset form
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    } catch (error) {
      // Error is handled in the updatePassword function
    }
  }

  const handleSaveDriverSettings = () => {
    toast.success("Driver settings saved successfully")
  }

  const toggleAvailableDay = (day: string) => {
    setDriverSettings((prev) => {
      const currentDays = [...prev.availableDays]
      if (currentDays.includes(day)) {
        return { ...prev, availableDays: currentDays.filter((d) => d !== day) }
      } else {
        return { ...prev, availableDays: [...currentDays, day] }
      }
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Driver Settings</h1>
        <p className="text-muted-foreground">Manage your driver settings and account preferences</p>
      </div>

      <Tabs defaultValue="account" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="driver">Driver Details</TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>View and update your account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input value={user?.name || ""} readOnly />
                </div>
                <div className="space-y-2">
                  <Label>Username</Label>
                  <Input value={user?.username || ""} readOnly />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <Input value={user?.role || ""} readOnly />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Update your password to keep your account secure</CardDescription>
            </CardHeader>
            <form onSubmit={handlePasswordSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      name="currentPassword"
                      type={showCurrentPassword ? "text" : "password"}
                      value={passwordForm.currentPassword}
                      onChange={handlePasswordChange}
                      placeholder="Enter your current password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    >
                      {showCurrentPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      name="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      value={passwordForm.newPassword}
                      onChange={handlePasswordChange}
                      placeholder="Enter your new password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">Password must be at least 8 characters long</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={handlePasswordChange}
                    placeholder="Confirm your new password"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="gap-2" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Updating...
                    </>
                  ) : (
                    <>
                      <Lock className="h-4 w-4" /> Update Password
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="driver" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Driver Details</CardTitle>
              <CardDescription>Manage your driver information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={driverSettings.fullName}
                    onChange={handleDriverSettingChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" name="phone" value={driverSettings.phone} onChange={handleDriverSettingChange} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={driverSettings.email}
                  onChange={handleDriverSettingChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={driverSettings.address}
                  onChange={handleDriverSettingChange}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="licenseNumber">License Number</Label>
                  <Input
                    id="licenseNumber"
                    name="licenseNumber"
                    value={driverSettings.licenseNumber}
                    onChange={handleDriverSettingChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="licenseExpiry">License Expiry Date</Label>
                  <Input
                    id="licenseExpiry"
                    name="licenseExpiry"
                    type="date"
                    value={driverSettings.licenseExpiry}
                    onChange={handleDriverSettingChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vehicleType">Vehicle Type</Label>
                  <Select
                    value={driverSettings.vehicleType}
                    onValueChange={(value) => setDriverSettings((prev) => ({ ...prev, vehicleType: value }))}
                  >
                    <SelectTrigger id="vehicleType">
                      <SelectValue placeholder="Select vehicle type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Refrigerated Truck">Refrigerated Truck</SelectItem>
                      <SelectItem value="Van">Van</SelectItem>
                      <SelectItem value="Pickup Truck">Pickup Truck</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vehicleNumber">Vehicle Number</Label>
                  <Input
                    id="vehicleNumber"
                    name="vehicleNumber"
                    value={driverSettings.vehicleNumber}
                    onChange={handleDriverSettingChange}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveDriverSettings} className="gap-2">
                <Truck className="h-4 w-4" /> Save Driver Details
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Availability Settings</CardTitle>
              <CardDescription>Configure your work schedule and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Available Days</Label>
                <div className="grid grid-cols-7 gap-2">
                  {["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map((day) => (
                    <Button
                      key={day}
                      type="button"
                      variant={driverSettings.availableDays.includes(day) ? "default" : "outline"}
                      className="capitalize"
                      onClick={() => toggleAvailableDay(day)}
                    >
                      {day.slice(0, 3)}
                    </Button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">Select the days you are available to work</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input
                    id="startTime"
                    name="startTime"
                    type="time"
                    value={driverSettings.startTime}
                    onChange={handleDriverSettingChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime">End Time</Label>
                  <Input
                    id="endTime"
                    name="endTime"
                    type="time"
                    value={driverSettings.endTime}
                    onChange={handleDriverSettingChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="preferredArea">Preferred Area</Label>
                  <Select
                    value={driverSettings.preferredArea}
                    onValueChange={(value) => setDriverSettings((prev) => ({ ...prev, preferredArea: value }))}
                  >
                    <SelectTrigger id="preferredArea">
                      <SelectValue placeholder="Select preferred area" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All Areas">All Areas</SelectItem>
                      <SelectItem value="North Region">North Region</SelectItem>
                      <SelectItem value="South Region">South Region</SelectItem>
                      <SelectItem value="East Region">East Region</SelectItem>
                      <SelectItem value="West Region">West Region</SelectItem>
                      <SelectItem value="Central">Central</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxDistance">Maximum Distance (km)</Label>
                  <Input
                    id="maxDistance"
                    name="maxDistance"
                    type="number"
                    value={driverSettings.maxDistance}
                    onChange={handleDriverSettingChange}
                    min="1"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="receiveNotifications">Receive Notifications</Label>
                  <p className="text-xs text-muted-foreground">
                    Get notified about new deliveries and schedule changes
                  </p>
                </div>
                <Switch
                  id="receiveNotifications"
                  name="receiveNotifications"
                  checked={driverSettings.receiveNotifications}
                  onCheckedChange={(checked) =>
                    setDriverSettings((prev) => ({ ...prev, receiveNotifications: checked }))
                  }
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveDriverSettings} className="gap-2">
                <Calendar className="h-4 w-4" /> Save Availability Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
