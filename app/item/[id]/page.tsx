"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { AuthGuard } from "@/components/auth-guard"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import {
  Heart,
  Share2,
  MessageCircle,
  MapPin,
  Calendar,
  Eye,
  Star,
  ChevronLeft,
  ChevronRight,
  Flag,
  DollarSign,
} from "lucide-react"
import Link from "next/link"
import { getCurrentUser } from "@/lib/auth"
import type { User } from "@/lib/auth"

export default function ItemDetailPage({ params }: { params: { id: string } }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [showBidForm, setShowBidForm] = useState(false)
  const [bidAmount, setBidAmount] = useState("")

  useEffect(() => {
    setCurrentUser(getCurrentUser())
  }, [])

  // Mock item data
  const item = {
    id: params.id,
    title: 'MacBook Pro 13" 2021 - M1 Chip',
    price: 899,
    originalPrice: 1299,
    condition: "Excellent",
    category: "Electronics",
    description: `Selling my MacBook Pro 13" with M1 chip in excellent condition. Used primarily for coding and design work. 
    
    Specifications:
    - Apple M1 chip with 8-core CPU
    - 8GB unified memory
    - 256GB SSD storage
    - 13.3-inch Retina display
    - Touch Bar and Touch ID
    - Two Thunderbolt/USB 4 ports
    
    Includes original charger, box, and documentation. No scratches or dents. Battery health at 94%. Perfect for students in CS or design programs.`,
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    seller: {
      name: "John Doe",
      year: "Senior",
      major: "Computer Science",
      trustScore: 4.8,
      totalSales: 12,
      responseTime: "Usually responds within 2 hours",
      joinedDate: "2023-09-01",
      profilePic: "/placeholder.svg?height=100&width=100",
    },
    location: "Engineering Building",
    postedDate: "2024-01-15",
    views: 45,
    isNegotiable: true,
    deliveryMethods: ["Campus Pickup", "Dorm Delivery"],
    tags: ["laptop", "macbook", "m1", "programming", "design"],
    co2Saved: 35, // kg of CO2 saved by buying second-hand
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % item.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + item.images.length) % item.images.length)
  }

  const handleBidSubmit = () => {
    // Handle bid submission
    console.log("Bid submitted:", bidAmount)
    setShowBidForm(false)
    setBidAmount("")
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <Navbar />

        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Image Carousel */}
            <div className="space-y-4">
              <Card className="overflow-hidden">
                <div className="relative aspect-video bg-slate-200 dark:bg-slate-700">
                  <img
                    src={item.images[currentImageIndex] || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  {item.images.length > 1 && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                        onClick={prevImage}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                        onClick={nextImage}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {item.images.map((_, index) => (
                      <button
                        key={index}
                        className={`w-2 h-2 rounded-full ${index === currentImageIndex ? "bg-white" : "bg-white/50"}`}
                        onClick={() => setCurrentImageIndex(index)}
                      />
                    ))}
                  </div>
                </div>
              </Card>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-4 gap-2">
                {item.images.map((image, index) => (
                  <button
                    key={index}
                    className={`aspect-square rounded-lg overflow-hidden border-2 ${
                      index === currentImageIndex
                        ? "border-blue-500"
                        : "border-transparent hover:border-slate-300 dark:hover:border-slate-600"
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${item.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Item Details */}
            <div className="space-y-6">
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">{item.title}</h1>
                    <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {item.views} views
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Posted {new Date(item.postedDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsBookmarked(!isBookmarked)}
                      className={isBookmarked ? "text-red-500" : ""}
                    >
                      <Heart className={`h-4 w-4 mr-2 ${isBookmarked ? "fill-current" : ""}`} />
                      {isBookmarked ? "Saved" : "Save"}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                    <Button variant="outline" size="sm">
                      <Flag className="h-4 w-4 mr-2" />
                      Report
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="text-4xl font-bold text-green-600">${item.price}</div>
                  {item.originalPrice && (
                    <div className="text-lg text-slate-500 line-through">${item.originalPrice}</div>
                  )}
                  <Badge variant="secondary">{item.condition}</Badge>
                  {item.isNegotiable && <Badge variant="outline">Negotiable</Badge>}
                </div>

                {/* Sustainability Impact */}
                <Card className="mb-6 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">🌱</span>
                      </div>
                      <div>
                        <div className="font-semibold">Environmental Impact</div>
                        <div className="text-sm">Save ~{item.co2Saved}kg CO2 by buying second-hand</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message Seller
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => setShowBidForm(!showBidForm)}>
                    <DollarSign className="h-4 w-4 mr-2" />
                    Make Offer
                  </Button>
                </div>

                {/* Bid Form */}
                {showBidForm && (
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle>Make an Offer</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Your Offer ($)</label>
                        <input
                          type="number"
                          value={bidAmount}
                          onChange={(e) => setBidAmount(e.target.value)}
                          placeholder="Enter your offer"
                          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleBidSubmit} className="flex-1">
                          Submit Offer
                        </Button>
                        <Button variant="outline" onClick={() => setShowBidForm(false)}>
                          Cancel
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Item Info */}
                <Card>
                  <CardHeader>
                    <CardTitle>Item Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-slate-600 dark:text-slate-400">Category:</span>
                        <span className="ml-2 font-medium">{item.category}</span>
                      </div>
                      <div>
                        <span className="text-slate-600 dark:text-slate-400">Condition:</span>
                        <span className="ml-2 font-medium">{item.condition}</span>
                      </div>
                      <div>
                        <span className="text-slate-600 dark:text-slate-400">Location:</span>
                        <span className="ml-2 font-medium flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {item.location}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-600 dark:text-slate-400">Delivery:</span>
                        <span className="ml-2 font-medium">{item.deliveryMethods.join(", ")}</span>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="font-medium mb-2">Description</h4>
                      <p className="text-slate-600 dark:text-slate-400 whitespace-pre-line">{item.description}</p>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="font-medium mb-2">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <Badge key={tag} variant="outline">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Seller Information */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Seller Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  {item.seller.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{item.seller.name}</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    {item.seller.year} • {item.seller.major}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="font-medium">{item.seller.trustScore}</span>
                      <span className="text-slate-500">Trust Score</span>
                    </div>
                    <div className="text-slate-500">{item.seller.totalSales} sales</div>
                    <div className="text-slate-500">{item.seller.responseTime}</div>
                  </div>
                </div>
                <Button asChild>
                  <Link href={`/profile/${item.seller.name.toLowerCase().replace(" ", "-")}`}>View Profile</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Footer />
      </div>
    </AuthGuard>
  )
}
