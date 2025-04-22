"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"
import { useTheme } from "next-themes"
import { Moon, Sun, Building, Truck, Store, Package } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SettingsPage() {
  const [companyName, setCompanyName] = useState("Hayoma Dairy")
  const [email, setEmail] = useState("admin@hayoma.com")
  const [address, setAddress] = useState("123 Dairy Lane, Milk City, MC 12345")
  const [phone, setPhone] = useState("555-HAYOMA")
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [user, setUser] = useState<{ username: string; role: string; name: string } | null>(null)

  // Role-specific states
  // Shop settings
  const [shopName, setShopName] = useState("My Shop")
  const [shopAddress, setShopAddress] = useState("456 Shop Street")
  const [shopPhone, setShopPhone] = useState("555-1234")
  const [deliveryPreference, setDeliveryPreference] = useState("morning")
  const [paymentMethod, setPaymentMethod] = useState("bank_transfer")

  // Supplier settings
  const [supplierName, setSupplierName] = useState("My Farm")
  const [supplierAddress, setSupplierAddress] = useState("789 Farm Road")
  const [supplierPhone, setSupplierPhone] = useState("555-5678")
  const [milkType, setMilkType] = useState("cow")
  const [pickupTime, setPickupTime] = useState("morning")

  // Driver settings
  const [driverName, setDriverName] = useState("John Driver")
  const [driverPhone, setDriverPhone] = useState("555-9012")
  const [vehicleType, setVehicleType] = useState("truck")
  const [vehicleNumber, setVehicleNumber] = useState("HD-1234")
  const [preferredRoute, setPreferredRoute] = useState("route_a")

  // Ensure theme component is only rendered after mounting to prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
    // Get user from localStorage
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleSaveProfile = () => {
    toast({
      title: "Profile updated",
      description: "Your company profile has been updated successfully.",
    })
  }

  const handleSaveNotifications = () => {
    toast({
      title: "Notification settings updated",
      description: "Your notification preferences have been saved.",
    })
  }

  const handleChangePassword = () => {
    toast({
      title: "Password updated",
      description: "Your password has been changed successfully.",
    })
  }

  const handleSaveRoleSettings = () => {
    toast({
      title: "Role settings updated",
      description: "Your role-specific settings have been saved successfully.",
    })

    // Update user name in localStorage
    if (user) {
      const updatedName =
        user.role === "admin"
          ? companyName
          : user.role === "shop"
            ? shopName
            : user.role === "supplier"
              ? supplierName
              : driverName

      const updatedUser = { ...user, name: updatedName }
      localStorage.setItem("user", JSON.stringify(updatedUser))
      setUser(updatedUser)
    }
  }

  if (!user) return null

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-blue-600 dark:text-blue-400">Manage your account settings and preferences</p>
      </div>

      <Tabs defaultValue={user.role === "admin" ? "profile" : "role-settings"} className="space-y-4">
        <TabsList className="bg-blue-100 dark:bg-blue-900/30">
          {user.role === "admin" && (
            <TabsTrigger value="profile" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
              <Building className="mr-2 h-4 w-4" />
              Company Profile
            </TabsTrigger>
          )}
          <TabsTrigger
            value="role-settings"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800"
          >
            {user.role === "admin" && <Building className="mr-2 h-4 w-4" />}
            {user.role === "shop" && <Store className="mr-2 h-4 w-4" />}
            {user.role === "supplier" && <Package className="mr-2 h-4 w-4" />}
            {user.role === "driver" && <Truck className="mr-2 h-4 w-4" />}
            {user.role === "admin"
              ? "Admin"
              : user.role === "shop"
                ? "Shop"
                : user.role === "supplier"
                  ? "Supplier"
                  : "Driver"}{" "}
            Settings
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800"
          >
            Notifications
          </TabsTrigger>
          <TabsTrigger value="appearance" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
            Appearance
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
            Security
          </TabsTrigger>
        </TabsList>

        {user.role === "admin" && (
          <TabsContent value="profile" className="space-y-4">
            <Card className="border-blue-100 dark:border-blue-900/30">
              <CardHeader className="bg-blue-50 dark:bg-blue-900/10 rounded-t-lg">
                <CardTitle className="text-blue-800 dark:text-blue-300">Company Profile</CardTitle>
                <CardDescription className="text-blue-600 dark:text-blue-400">
                  Update your company information and contact details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="space-y-2">
                  <Label htmlFor="company-name" className="text-blue-700 dark:text-blue-300">
                    Company Name
                  </Label>
                  <Input
                    id="company-name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="border-blue-200 dark:border-blue-900/30 focus:border-blue-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-blue-700 dark:text-blue-300">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-blue-200 dark:border-blue-900/30 focus:border-blue-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-blue-700 dark:text-blue-300">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="border-blue-200 dark:border-blue-900/30 focus:border-blue-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-blue-700 dark:text-blue-300">
                    Business Address
                  </Label>
                  <Textarea
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    rows={3}
                    className="border-blue-200 dark:border-blue-900/30 focus:border-blue-400"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={handleSaveProfile}
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                >
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        )}

        <TabsContent value="role-settings" className="space-y-4">
          <Card className="border-blue-100 dark:border-blue-900/30">
            <CardHeader className="bg-blue-50 dark:bg-blue-900/10 rounded-t-lg">
              <CardTitle className="text-blue-800 dark:text-blue-300">
                {user.role === "admin"
                  ? "Admin"
                  : user.role === "shop"
                    ? "Shop"
                    : user.role === "supplier"
                      ? "Supplier"
                      : "Driver"}{" "}
                Settings
              </CardTitle>
              <CardDescription className="text-blue-600 dark:text-blue-400">
                Update your {user.role}-specific information and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              {/* Admin Settings */}
              {user.role === "admin" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="admin-name" className="text-blue-700 dark:text-blue-300">
                      Admin Name
                    </Label>
                    <Input
                      id="admin-name"
                      value={user.name}
                      onChange={(e) => setUser({ ...user, name: e.target.value })}
                      className="border-blue-200 dark:border-blue-900/30 focus:border-blue-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin-email" className="text-blue-700 dark:text-blue-300">
                      Admin Email
                    </Label>
                    <Input
                      id="admin-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border-blue-200 dark:border-blue-900/30 focus:border-blue-400"
                    />
                  </div>
                </>
              )}

              {/* Shop Settings */}
              {user.role === "shop" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="shop-name" className="text-blue-700 dark:text-blue-300">
                      Shop Name
                    </Label>
                    <Input
                      id="shop-name"
                      value={shopName}
                      onChange={(e) => setShopName(e.target.value)}
                      className="border-blue-200 dark:border-blue-900/30 focus:border-blue-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="shop-address" className="text-blue-700 dark:text-blue-300">
                      Shop Address
                    </Label>
                    <Textarea
                      id="shop-address"
                      value={shopAddress}
                      onChange={(e) => setShopAddress(e.target.value)}
                      rows={2}
                      className="border-blue-200 dark:border-blue-900/30 focus:border-blue-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="shop-phone" className="text-blue-700 dark:text-blue-300">
                      Shop Phone
                    </Label>
                    <Input
                      id="shop-phone"
                      value={shopPhone}
                      onChange={(e) => setShopPhone(e.target.value)}
                      className="border-blue-200 dark:border-blue-900/30 focus:border-blue-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="delivery-preference" className="text-blue-700 dark:text-blue-300">
                      Preferred Delivery Time
                    </Label>
                    <Select value={deliveryPreference} onValueChange={setDeliveryPreference}>
                      <SelectTrigger className="border-blue-200 dark:border-blue-900/30 focus:border-blue-400">
                        <SelectValue placeholder="Select delivery time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="morning">Morning (6AM - 10AM)</SelectItem>
                        <SelectItem value="afternoon">Afternoon (12PM - 4PM)</SelectItem>
                        <SelectItem value="evening">Evening (5PM - 8PM)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="payment-method" className="text-blue-700 dark:text-blue-300">
                      Preferred Payment Method
                    </Label>
                    <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                      <SelectTrigger className="border-blue-200 dark:border-blue-900/30 focus:border-blue-400">
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cash">Cash on Delivery</SelectItem>
                        <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                        <SelectItem value="mobile_money">Mobile Money</SelectItem>
                        <SelectItem value="credit_card">Credit Card</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              {/* Supplier Settings */}
              {user.role === "supplier" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="supplier-name" className="text-blue-700 dark:text-blue-300">
                      Farm/Supplier Name
                    </Label>
                    <Input
                      id="supplier-name"
                      value={supplierName}
                      onChange={(e) => setSupplierName(e.target.value)}
                      className="border-blue-200 dark:border-blue-900/30 focus:border-blue-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="supplier-address" className="text-blue-700 dark:text-blue-300">
                      Farm/Supplier Address
                    </Label>
                    <Textarea
                      id="supplier-address"
                      value={supplierAddress}
                      onChange={(e) => setSupplierAddress(e.target.value)}
                      rows={2}
                      className="border-blue-200 dark:border-blue-900/30 focus:border-blue-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="supplier-phone" className="text-blue-700 dark:text-blue-300">
                      Contact Phone
                    </Label>
                    <Input
                      id="supplier-phone"
                      value={supplierPhone}
                      onChange={(e) => setSupplierPhone(e.target.value)}
                      className="border-blue-200 dark:border-blue-900/30 focus:border-blue-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="milk-type" className="text-blue-700 dark:text-blue-300">
                      Primary Milk Type
                    </Label>
                    <Select value={milkType} onValueChange={setMilkType}>
                      <SelectTrigger className="border-blue-200 dark:border-blue-900/30 focus:border-blue-400">
                        <SelectValue placeholder="Select milk type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cow">Cow Milk</SelectItem>
                        <SelectItem value="goat">Goat Milk</SelectItem>
                        <SelectItem value="buffalo">Buffalo Milk</SelectItem>
                        <SelectItem value="sheep">Sheep Milk</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pickup-time" className="text-blue-700 dark:text-blue-300">
                      Preferred Pickup Time
                    </Label>
                    <Select value={pickupTime} onValueChange={setPickupTime}>
                      <SelectTrigger className="border-blue-200 dark:border-blue-900/30 focus:border-blue-400">
                        <SelectValue placeholder="Select pickup time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="morning">Early Morning (4AM - 7AM)</SelectItem>
                        <SelectItem value="midday">Midday (11AM - 1PM)</SelectItem>
                        <SelectItem value="evening">Evening (4PM - 6PM)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              {/* Driver Settings */}
              {user.role === "driver" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="driver-name" className="text-blue-700 dark:text-blue-300">
                      Driver Name
                    </Label>
                    <Input
                      id="driver-name"
                      value={driverName}
                      onChange={(e) => setDriverName(e.target.value)}
                      className="border-blue-200 dark:border-blue-900/30 focus:border-blue-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="driver-phone" className="text-blue-700 dark:text-blue-300">
                      Contact Phone
                    </Label>
                    <Input
                      id="driver-phone"
                      value={driverPhone}
                      onChange={(e) => setDriverPhone(e.target.value)}
                      className="border-blue-200 dark:border-blue-900/30 focus:border-blue-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vehicle-type" className="text-blue-700 dark:text-blue-300">
                      Vehicle Type
                    </Label>
                    <Select value={vehicleType} onValueChange={setVehicleType}>
                      <SelectTrigger className="border-blue-200 dark:border-blue-900/30 focus:border-blue-400">
                        <SelectValue placeholder="Select vehicle type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="truck">Refrigerated Truck</SelectItem>
                        <SelectItem value="van">Delivery Van</SelectItem>
                        <SelectItem value="pickup">Pickup Truck</SelectItem>
                        <SelectItem value="motorcycle">Motorcycle</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vehicle-number" className="text-blue-700 dark:text-blue-300">
                      Vehicle Registration Number
                    </Label>
                    <Input
                      id="vehicle-number"
                      value={vehicleNumber}
                      onChange={(e) => setVehicleNumber(e.target.value)}
                      className="border-blue-200 dark:border-blue-900/30 focus:border-blue-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="preferred-route" className="text-blue-700 dark:text-blue-300">
                      Preferred Route
                    </Label>
                    <Select value={preferredRoute} onValueChange={setPreferredRoute}>
                      <SelectTrigger className="border-blue-200 dark:border-blue-900/30 focus:border-blue-400">
                        <SelectValue placeholder="Select preferred route" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="route_a">Route A - North District</SelectItem>
                        <SelectItem value="route_b">Route B - East District</SelectItem>
                        <SelectItem value="route_c">Route C - South District</SelectItem>
                        <SelectItem value="route_d">Route D - West District</SelectItem>
                        <SelectItem value="route_e">Route E - Central District</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleSaveRoleSettings}
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
              >
                Save{" "}
                {user.role === "admin"
                  ? "Admin"
                  : user.role === "shop"
                    ? "Shop"
                    : user.role === "supplier"
                      ? "Supplier"
                      : "Driver"}{" "}
                Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card className="border-blue-100 dark:border-blue-900/30">
            <CardHeader className="bg-blue-50 dark:bg-blue-900/10 rounded-t-lg">
              <CardTitle className="text-blue-800 dark:text-blue-300">Notification Settings</CardTitle>
              <CardDescription className="text-blue-600 dark:text-blue-400">
                Configure how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications" className="text-blue-700 dark:text-blue-300">
                    Email Notifications
                  </Label>
                  <p className="text-sm text-blue-600 dark:text-blue-400">Receive notifications via email</p>
                </div>
                <Switch id="email-notifications" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sms-notifications" className="text-blue-700 dark:text-blue-300">
                    SMS Notifications
                  </Label>
                  <p className="text-sm text-blue-600 dark:text-blue-400">Receive notifications via text message</p>
                </div>
                <Switch id="sms-notifications" checked={smsNotifications} onCheckedChange={setSmsNotifications} />
              </div>

              {/* Role-specific notification settings */}
              {user.role === "admin" && (
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="new-order-notifications" className="text-blue-700 dark:text-blue-300">
                      New Order Notifications
                    </Label>
                    <p className="text-sm text-blue-600 dark:text-blue-400">Get notified when new orders are placed</p>
                  </div>
                  <Switch id="new-order-notifications" defaultChecked />
                </div>
              )}

              {user.role === "shop" && (
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="delivery-notifications" className="text-blue-700 dark:text-blue-300">
                      Delivery Notifications
                    </Label>
                    <p className="text-sm text-blue-600 dark:text-blue-400">Get notified about upcoming deliveries</p>
                  </div>
                  <Switch id="delivery-notifications" defaultChecked />
                </div>
              )}

              {user.role === "supplier" && (
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="pickup-notifications" className="text-blue-700 dark:text-blue-300">
                      Pickup Notifications
                    </Label>
                    <p className="text-sm text-blue-600 dark:text-blue-400">
                      Get notified about scheduled milk pickups
                    </p>
                  </div>
                  <Switch id="pickup-notifications" defaultChecked />
                </div>
              )}

              {user.role === "driver" && (
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="route-notifications" className="text-blue-700 dark:text-blue-300">
                      Route Update Notifications
                    </Label>
                    <p className="text-sm text-blue-600 dark:text-blue-400">Get notified about route changes</p>
                  </div>
                  <Switch id="route-notifications" defaultChecked />
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleSaveNotifications}
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
              >
                Save Preferences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card className="border-blue-100 dark:border-blue-900/30">
            <CardHeader className="bg-blue-50 dark:bg-blue-900/10 rounded-t-lg">
              <CardTitle className="text-blue-800 dark:text-blue-300">Appearance Settings</CardTitle>
              <CardDescription className="text-blue-600 dark:text-blue-400">
                Customize the look and feel of your dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-blue-700 dark:text-blue-300">Theme Mode</Label>
                  <p className="text-sm text-blue-600 dark:text-blue-400">Choose between light and dark mode</p>
                </div>
                <div className="flex items-center space-x-2">
                  {mounted && (
                    <div className="flex items-center space-x-4">
                      <Button
                        variant={theme === "light" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setTheme("light")}
                        className={`flex items-center gap-2 ${
                          theme === "light"
                            ? "bg-blue-600 hover:bg-blue-700 text-white"
                            : "text-blue-600 border-blue-200 hover:bg-blue-50"
                        }`}
                      >
                        <Sun className="h-4 w-4" />
                        Light
                      </Button>
                      <Button
                        variant={theme === "dark" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setTheme("dark")}
                        className={`flex items-center gap-2 ${
                          theme === "dark"
                            ? "bg-blue-600 hover:bg-blue-700 text-white"
                            : "text-blue-600 border-blue-200 hover:bg-blue-50"
                        }`}
                      >
                        <Moon className="h-4 w-4" />
                        Dark
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card className="border-blue-100 dark:border-blue-900/30">
            <CardHeader className="bg-blue-50 dark:bg-blue-900/10 rounded-t-lg">
              <CardTitle className="text-blue-800 dark:text-blue-300">Security Settings</CardTitle>
              <CardDescription className="text-blue-600 dark:text-blue-400">
                Update your password and security preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-2">
                <Label htmlFor="current-password" className="text-blue-700 dark:text-blue-300">
                  Current Password
                </Label>
                <Input
                  id="current-password"
                  type="password"
                  className="border-blue-200 dark:border-blue-900/30 focus:border-blue-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password" className="text-blue-700 dark:text-blue-300">
                  New Password
                </Label>
                <Input
                  id="new-password"
                  type="password"
                  className="border-blue-200 dark:border-blue-900/30 focus:border-blue-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-blue-700 dark:text-blue-300">
                  Confirm New Password
                </Label>
                <Input
                  id="confirm-password"
                  type="password"
                  className="border-blue-200 dark:border-blue-900/30 focus:border-blue-400"
                />
              </div>

              {/* Two-factor authentication option */}
              <div className="flex items-center justify-between pt-4">
                <div className="space-y-0.5">
                  <Label htmlFor="two-factor" className="text-blue-700 dark:text-blue-300">
                    Two-Factor Authentication
                  </Label>
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Switch id="two-factor" />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleChangePassword}
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
              >
                Change Password
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

