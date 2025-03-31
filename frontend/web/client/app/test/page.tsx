"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Camera, Edit, Loader2, ChevronRight, Home, Trash2 } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { ProfileSidebar } from "@/components/profile-sidebar"

export default function ProfilePage() {
  const { toast } = useToast()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("account")

  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    bio: "Food enthusiast and QuickBite regular customer.",
    notifications: {
      email: true,
      push: true,
      sms: false,
      promotions: true,
    },
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleNotificationChange = (key, value) => {
    setProfileData((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value,
      },
    }))
  }

  const handleSaveProfile = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Profile updated",
        description: "Your profile information has been saved successfully.",
      })
    }, 1500)
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background to-muted/50">
      <MainNav />

      <div className="container px-4 py-8 md:py-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <ProfileSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Main Content */}
          <div className="md:col-span-3 space-y-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              {/* Account Tab */}
              <TabsContent value="account" className="space-y-6 animate-in slide-up">
                <Card className="glass-card">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Profile Information</CardTitle>
                        <CardDescription>Update your personal details</CardDescription>
                      </div>
                      <Button variant="outline" size="icon" className="rounded-full">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                      <div className="relative">
                        <Avatar className="h-24 w-24 border-4 border-background">
                          <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile" />
                          <AvatarFallback className="text-2xl">JD</AvatarFallback>
                        </Avatar>
                        <Button
                          variant="secondary"
                          size="icon"
                          className="absolute bottom-0 right-0 h-8 w-8 rounded-full shadow-lg"
                        >
                          <Camera className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="text-center sm:text-left">
                        <h2 className="text-2xl font-bold">
                          {profileData.firstName} {profileData.lastName}
                        </h2>
                        <p className="text-muted-foreground">{profileData.email}</p>
                        <p className="text-sm text-muted-foreground mt-1">Member since April 2023</p>
                      </div>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={profileData.firstName}
                          onChange={handleChange}
                          className="input-glass"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={profileData.lastName}
                          onChange={handleChange}
                          className="input-glass"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          value={profileData.email}
                          onChange={handleChange}
                          className="input-glass"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={profileData.phone}
                          onChange={handleChange}
                          className="input-glass"
                        />
                      </div>
                      <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          name="bio"
                          value={profileData.bio}
                          onChange={handleChange}
                          className="input-glass min-h-[100px]"
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="rounded-full gradient-bg ml-auto"
                      onClick={handleSaveProfile}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="glass-card">
                  <CardHeader className="pb-3">
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>Manage how you receive notifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-notifications">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive order updates via email</p>
                      </div>
                      <Switch
                        id="email-notifications"
                        checked={profileData.notifications.email}
                        onCheckedChange={(checked) => handleNotificationChange("email", checked)}
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="push-notifications">Push Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive real-time updates on your device</p>
                      </div>
                      <Switch
                        id="push-notifications"
                        checked={profileData.notifications.push}
                        onCheckedChange={(checked) => handleNotificationChange("push", checked)}
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="sms-notifications">SMS Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive text messages for important updates</p>
                      </div>
                      <Switch
                        id="sms-notifications"
                        checked={profileData.notifications.sms}
                        onCheckedChange={(checked) => handleNotificationChange("sms", checked)}
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="marketing-notifications">Marketing & Promotions</Label>
                        <p className="text-sm text-muted-foreground">Receive special offers and promotions</p>
                      </div>
                      <Switch
                        id="marketing-notifications"
                        checked={profileData.notifications.promotions}
                        onCheckedChange={(checked) => handleNotificationChange("promotions", checked)}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-destructive">Danger Zone</CardTitle>
                    <CardDescription>Irreversible account actions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Delete Account</h3>
                        <p className="text-sm text-muted-foreground">
                          Permanently delete your account and all associated data
                        </p>
                      </div>
                      <Button variant="destructive">Delete Account</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Orders Tab */}
              <TabsContent value="orders" className="animate-in slide-up">
                <Card className="glass-card">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Order History</CardTitle>
                        <CardDescription>View and manage your past orders</CardDescription>
                      </div>
                      <Link href="/profile/orders">
                        <Button variant="outline" className="rounded-full">
                          View All
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* This is a preview - the full order management is in the dedicated page */}
                      {[
                        {
                          id: "ORD-7829",
                          date: "Today, 2:30 PM",
                          restaurant: "Burger Palace",
                          items: ["Double Cheeseburger", "Fries", "Soda"],
                          total: "$24.97",
                          status: "Delivered",
                        },
                        {
                          id: "ORD-7814",
                          date: "Yesterday, 7:15 PM",
                          restaurant: "Pizza Heaven",
                          items: ["Pepperoni Pizza", "Garlic Bread"],
                          total: "$22.99",
                          status: "Delivered",
                        },
                        {
                          id: "ORD-7802",
                          date: "Apr 12, 2023",
                          restaurant: "Sushi Master",
                          items: ["California Roll", "Miso Soup", "Green Tea"],
                          total: "$32.50",
                          status: "Delivered",
                        },
                      ].map((order, index) => (
                        <div
                          key={index}
                          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-b last:border-0"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{order.restaurant}</h3>
                              <Badge variant={order.status === "Delivered" ? "outline" : "secondary"}>
                                {order.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{order.items.join(", ")}</p>
                            <div className="flex items-center gap-3 mt-2 text-sm">
                              <span className="text-muted-foreground">{order.id}</span>
                              <span className="text-muted-foreground">•</span>
                              <span className="text-muted-foreground">{order.date}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <span className="font-medium">{order.total}</span>
                            <Button variant="outline" size="sm" className="rounded-full">
                              Details
                            </Button>
                            <Button variant="secondary" size="sm" className="rounded-full">
                              Reorder
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Addresses Tab */}
              <TabsContent value="addresses" className="animate-in slide-up">
                <Card className="glass-card">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Saved Addresses</CardTitle>
                        <CardDescription>Manage your delivery addresses</CardDescription>
                      </div>
                      <Button variant="outline" className="rounded-full">
                        Add New Address
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {[
                        {
                          id: 1,
                          name: "Home",
                          address: "123 Main Street, Apt 4B",
                          city: "New York",
                          state: "NY",
                          zip: "10001",
                          isDefault: true,
                        },
                        {
                          id: 2,
                          name: "Work",
                          address: "456 Office Plaza, Suite 200",
                          city: "New York",
                          state: "NY",
                          zip: "10022",
                          isDefault: false,
                        },
                      ].map((address, index) => (
                        <div
                          key={index}
                          className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 py-4 border-b last:border-0"
                        >
                          <div className="flex gap-3">
                            <div className="mt-1">
                              {address.name === "Home" ? (
                                <Home className="h-5 w-5 text-primary" />
                              ) : (
                                <MapPin className="h-5 w-5 text-primary" />
                              )}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-medium">{address.name}</h3>
                                {address.isDefault && (
                                  <Badge variant="outline" className="text-xs">
                                    Default
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm mt-1">
                                {address.address}, {address.city}, {address.state} {address.zip}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" className="h-8 rounded-full">
                              <Edit className="h-4 w-4" />
                            </Button>
                            {!address.isDefault && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 rounded-full text-destructive hover:text-destructive hover:bg-destructive/10"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                            {!address.isDefault && (
                              <Button variant="outline" size="sm" className="h-8 rounded-full">
                                Set as Default
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Payment Tab */}
              <TabsContent value="payment" className="animate-in slide-up">
                <Card className="glass-card">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Payment Methods</CardTitle>
                        <CardDescription>Manage your payment options</CardDescription>
                      </div>
                      <Button variant="outline" className="rounded-full">
                        Add New Card
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {[
                        {
                          id: 1,
                          type: "Visa",
                          last4: "4242",
                          expiry: "04/25",
                          isDefault: true,
                        },
                        {
                          id: 2,
                          type: "Mastercard",
                          last4: "5678",
                          expiry: "09/24",
                          isDefault: false,
                        },
                      ].map((card, index) => (
                        <div
                          key={index}
                          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-b last:border-0"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-md flex items-center justify-center text-white font-bold text-xs">
                              {card.type}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-medium">
                                  {card.type} •••• {card.last4}
                                </h3>
                                {card.isDefault && (
                                  <Badge variant="outline" className="text-xs">
                                    Default
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">Expires {card.expiry}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" className="h-8 rounded-full">
                              <Edit className="h-4 w-4" />
                            </Button>
                            {!card.isDefault && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 rounded-full text-destructive hover:text-destructive hover:bg-destructive/10"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                            {!card.isDefault && (
                              <Button variant="outline" size="sm" className="h-8 rounded-full">
                                Set as Default
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Security Tab */}
              <TabsContent value="security" className="animate-in slide-up">
                <Card className="glass-card">
                  <CardHeader className="pb-3">
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>Manage your account security</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-medium">Change Password</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="current-password">Current Password</Label>
                          <Input id="current-password" type="password" className="input-glass" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="new-password">New Password</Label>
                          <Input id="new-password" type="password" className="input-glass" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Confirm New Password</Label>
                          <Input id="confirm-password" type="password" className="input-glass" />
                        </div>
                        <Button className="rounded-full gradient-bg">Update Password</Button>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="font-medium">Two-Factor Authentication</h3>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <p>Enhance your account security with 2FA</p>
                          <p className="text-sm text-muted-foreground">
                            We'll ask for a verification code in addition to your password when you sign in
                          </p>
                        </div>
                        <Switch id="2fa" />
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="font-medium">Active Sessions</h3>
                      <div className="space-y-4">
                        {[
                          {
                            device: "iPhone 13 Pro",
                            location: "New York, USA",
                            lastActive: "Active now",
                            isCurrent: true,
                          },
                          {
                            device: "MacBook Pro",
                            location: "New York, USA",
                            lastActive: "2 hours ago",
                            isCurrent: false,
                          },
                        ].map((session, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium">{session.device}</h4>
                                {session.isCurrent && (
                                  <Badge variant="outline" className="text-xs">
                                    Current
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {session.location} • {session.lastActive}
                              </p>
                            </div>
                            {!session.isCurrent && (
                              <Button variant="outline" size="sm" className="rounded-full">
                                Log Out
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

