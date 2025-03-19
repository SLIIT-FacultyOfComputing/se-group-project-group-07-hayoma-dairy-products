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
import { Moon, Sun } from "lucide-react"

export default function SettingsPage() {
  const [companyName, setCompanyName] = useState("Hayoma Dairy")
  const [email, setEmail] = useState("admin@hayoma.com")
  const [address, setAddress] = useState("123 Dairy Lane, Milk City, MC 12345")
  const [phone, setPhone] = useState("555-HAYOMA")
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Ensure theme component is only rendered after mounting to prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-blue-600 dark:text-blue-400">Manage your account settings and preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="bg-blue-100 dark:bg-blue-900/30">
          <TabsTrigger value="profile" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
            Company Profile
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

