"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AuthGuard } from "@/components/auth-guard"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Star, Calendar, Award, Package, MessageSquare } from "lucide-react"
import Link from "next/link"
import { getCurrentUser } from "@/lib/auth"
import type { User } from "@/lib/auth"

export default function ProfilePage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  useEffect(() => {
    setCurrentUser(getCurrentUser())
  }, [])

  // Mock user listings
  const userListings = [
    {
      id: 1,
      title: 'MacBook Pro 13" 2021',
      price: 899,
      status: "Active",
      views: 45,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      title: "Calculus Textbook",
      price: 45,
      status: "Sold",
      views: 23,
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  return (
    <AuthGuard>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <Navbar />

        <div className="max-w-4xl mx-auto px-6 py-8">
          {/* Profile Header */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {currentUser?.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="text-center md:text-left flex-1">
                  <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">{currentUser?.name}</h1>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    {currentUser?.year} • {currentUser?.major}
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="font-semibold">{currentUser?.trustScore}</span>
                      <span className="text-slate-500">Trust Score</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-blue-500" />
                      <span className="text-slate-500">
                        Joined {new Date(currentUser?.joinedDate || "").toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <Button asChild>
                  <Link href="/profile/edit">Edit Profile</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Profile Tabs */}
          <Tabs defaultValue="listings" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="listings">My Listings</TabsTrigger>
              <TabsTrigger value="purchases">Purchases</TabsTrigger>
              <TabsTrigger value="sustainability">Eco Impact</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="listings" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">My Listings</h2>
                <Button asChild>
                  <Link href="/sell">Add New Item</Link>
                </Button>
              </div>
              <div className="grid gap-4">
                {userListings.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold">{item.title}</h3>
                          <p className="text-slate-600 dark:text-slate-400">${item.price}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant={item.status === "Active" ? "default" : "secondary"}>{item.status}</Badge>
                          <p className="text-sm text-slate-500 mt-1">{item.views} views</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="purchases" className="space-y-4">
              <h2 className="text-2xl font-bold">Purchase History</h2>
              <Card>
                <CardContent className="p-8 text-center">
                  <Package className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-500">No purchases yet</p>
                  <Button className="mt-4" asChild>
                    <Link href="/marketplace">Browse Items</Link>
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sustainability" className="space-y-4">
              <h2 className="text-2xl font-bold">Environmental Impact</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-green-500" />
                      CO2 Saved
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-600">45 kg</div>
                    <p className="text-slate-500">This year</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="h-5 w-5 text-blue-500" />
                      Items Traded
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-600">12</div>
                    <p className="text-slate-500">Total items</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-purple-500" />
                      Eco Rank
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-purple-600">#23</div>
                    <p className="text-slate-500">Campus ranking</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-4">
              <h2 className="text-2xl font-bold">Reviews & Ratings</h2>
              <Card>
                <CardContent className="p-8 text-center">
                  <MessageSquare className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-500">No reviews yet</p>
                  <p className="text-sm text-slate-400 mt-2">
                    Complete your first transaction to start receiving reviews
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <Footer />
      </div>
    </AuthGuard>
  )
}
