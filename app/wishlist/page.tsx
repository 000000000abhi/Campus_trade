"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AuthGuard } from "@/components/auth-guard"
import { ThemeToggle } from "@/components/theme-toggle"
import { ArrowLeft, Heart, ShoppingCart, Share2, Trash2, Star, MapPin, Calendar } from "lucide-react"
import Link from "next/link"
import { getCurrentUser } from "@/lib/auth"
import type { User } from "@/lib/auth"

interface WishlistItem {
  id: string
  title: string
  price: number
  originalPrice?: number
  condition: string
  image: string
  seller: string
  location: string
  dateAdded: string
  isAvailable: boolean
  trustScore: number
  views: number
}

export default function WishlistPage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  useEffect(() => {
    setCurrentUser(getCurrentUser())
  }, [])

  // Mock wishlist items
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    {
      id: "1",
      title: 'MacBook Pro 13" 2021 - M1 Chip',
      price: 899,
      originalPrice: 1299,
      condition: "Excellent",
      image: "/placeholder.svg?height=200&width=300",
      seller: "John Doe",
      location: "Engineering Building",
      dateAdded: "2024-01-15",
      isAvailable: true,
      trustScore: 4.8,
      views: 45,
    },
    {
      id: "2",
      title: "iPhone 13 Pro - 128GB",
      price: 650,
      originalPrice: 999,
      condition: "Like New",
      image: "/placeholder.svg?height=200&width=300",
      seller: "Sarah Smith",
      location: "Student Center",
      dateAdded: "2024-01-12",
      isAvailable: true,
      trustScore: 4.9,
      views: 32,
    },
    {
      id: "3",
      title: "Gaming Chair - Ergonomic",
      price: 120,
      originalPrice: 250,
      condition: "Good",
      image: "/placeholder.svg?height=200&width=300",
      seller: "Mike Johnson",
      location: "Dorm A",
      dateAdded: "2024-01-10",
      isAvailable: false,
      trustScore: 4.6,
      views: 28,
    },
  ])

  const removeFromWishlist = (id: string) => {
    setWishlistItems((items) => items.filter((item) => item.id !== id))
  }

  const addToCart = (id: string) => {
    console.log("Adding to cart:", id)
    // Handle add to cart logic
  }

  const shareItem = (id: string) => {
    console.log("Sharing item:", id)
    // Handle share logic
  }

  const availableItems = wishlistItems.filter((item) => item.isAvailable)
  const unavailableItems = wishlistItems.filter((item) => !item.isAvailable)

  return (
    <AuthGuard>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        {/* Header */}
        <header className="bg-white dark:bg-slate-800 shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Link
                href="/marketplace"
                className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Marketplace
              </Link>
              <div className="flex items-center gap-4">
                <ThemeToggle />
                <Link href="/cart">
                  <Button variant="outline">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Cart
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-2 flex items-center gap-3">
              <Heart className="h-10 w-10 text-red-500 fill-current" />
              My Wishlist
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"} saved for later
            </p>
          </div>

          {wishlistItems.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <Heart className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Your wishlist is empty</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Save items you love by clicking the heart icon
                </p>
                <Button asChild>
                  <Link href="/marketplace">Browse Items</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-8">
              {/* Available Items */}
              {availableItems.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                    Available Items
                    <Badge className="bg-green-500 text-white">{availableItems.length}</Badge>
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {availableItems.map((item) => (
                      <Card
                        key={item.id}
                        className="overflow-hidden hover:shadow-lg transition-all duration-300 card-hover"
                      >
                        <div className="relative">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            className="w-full h-48 object-cover"
                          />
                          <Button
                            size="sm"
                            variant="ghost"
                            className="absolute top-2 right-2 bg-white/80 hover:bg-white text-red-500"
                            onClick={() => removeFromWishlist(item.id)}
                          >
                            <Heart className="h-4 w-4 fill-current" />
                          </Button>
                          <Badge className="absolute top-2 left-2 bg-green-500 text-white">Available</Badge>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{item.title}</h3>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-2xl font-bold text-green-600">${item.price}</span>
                            {item.originalPrice && (
                              <span className="text-lg text-slate-500 line-through">${item.originalPrice}</span>
                            )}
                            <Badge variant="secondary">{item.condition}</Badge>
                          </div>

                          <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400 mb-4">
                            <div className="flex items-center justify-between">
                              <span>Seller: {item.seller}</span>
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 text-yellow-500 fill-current" />
                                <span>{item.trustScore}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {item.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              Added {new Date(item.dateAdded).toLocaleDateString()}
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button size="sm" className="flex-1" onClick={() => addToCart(item.id)}>
                              <ShoppingCart className="h-4 w-4 mr-1" />
                              Add to Cart
                            </Button>
                            <Button size="sm" variant="outline" asChild>
                              <Link href={`/item/${item.id}`}>View</Link>
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => shareItem(item.id)}>
                              <Share2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Unavailable Items */}
              {unavailableItems.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                    No Longer Available
                    <Badge variant="secondary">{unavailableItems.length}</Badge>
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {unavailableItems.map((item) => (
                      <Card key={item.id} className="overflow-hidden opacity-75">
                        <div className="relative">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            className="w-full h-48 object-cover grayscale"
                          />
                          <Button
                            size="sm"
                            variant="ghost"
                            className="absolute top-2 right-2 bg-white/80 hover:bg-white text-red-500"
                            onClick={() => removeFromWishlist(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <Badge className="absolute top-2 left-2 bg-red-500 text-white">Sold</Badge>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{item.title}</h3>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-2xl font-bold text-slate-500">${item.price}</span>
                            <Badge variant="outline">{item.condition}</Badge>
                          </div>

                          <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400 mb-4">
                            <div>Seller: {item.seller}</div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {item.location}
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="flex-1" disabled>
                              No Longer Available
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => removeFromWishlist(item.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  )
}
