"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AuthGuard } from "@/components/auth-guard"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import {
  Heart,
  MessageCircle,
  ShoppingCart,
  Star,
  MapPin,
  BookOpen,
  Laptop,
  Sofa,
  Shirt,
  Dumbbell,
  Music,
  Grid3X3,
} from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"

// Define item type
interface Item {
  id: number
  title: string
  price: number
  originalPrice?: number
  condition: string
  category: string
  image: string
  seller: string
  location: string
  co2Savings: number
  rating: number
  views: number
  tags?: string[]
  description?: string
  date: string
}

// Mock data for demonstration
const mockItems: Item[] = [
  {
    id: 1,
    title: 'MacBook Pro 13" 2021 M1 Chip with 8GB RAM and 256GB SSD',
    price: 899,
    originalPrice: 1299,
    condition: "Excellent",
    category: "Electronics",
    image: "/placeholder.svg?height=200&width=300",
    seller: "John D.",
    location: "Engineering Building",
    co2Savings: 35,
    rating: 4.8,
    views: 45,
    tags: ["laptop", "apple", "macbook", "m1"],
    description: "Barely used MacBook Pro with M1 chip. Great for students and professionals.",
    date: "2024-05-28",
  },
  {
    id: 2,
    title: "Calculus Textbook Bundle with Solutions Manual",
    price: 45,
    originalPrice: 120,
    condition: "Good",
    category: "Books",
    image: "/placeholder.svg?height=200&width=300",
    seller: "Sarah M.",
    location: "Library",
    co2Savings: 2,
    rating: 4.9,
    views: 32,
    tags: ["textbook", "math", "calculus"],
    description: "Complete calculus textbook with solutions manual. Perfect for MATH 101.",
    date: "2024-05-25",
  },
  {
    id: 3,
    title: "Ergonomic Gaming Chair with Lumbar Support",
    price: 120,
    originalPrice: 250,
    condition: "Like New",
    category: "Furniture",
    image: "/placeholder.svg?height=200&width=300",
    seller: "Mike R.",
    location: "Dorm A",
    co2Savings: 15,
    rating: 4.6,
    views: 28,
    tags: ["chair", "gaming", "furniture"],
    description: "Comfortable gaming chair with adjustable height and lumbar support.",
    date: "2024-05-22",
  },
  {
    id: 4,
    title: "iPhone 13 Pro 128GB Graphite Unlocked",
    price: 650,
    originalPrice: 999,
    condition: "Excellent",
    category: "Electronics",
    image: "/placeholder.svg?height=200&width=300",
    seller: "Alex K.",
    location: "Student Center",
    co2Savings: 25,
    rating: 4.7,
    views: 67,
    tags: ["phone", "apple", "iphone"],
    description: "iPhone 13 Pro in excellent condition. Comes with original box and accessories.",
    date: "2024-05-30",
  },
  {
    id: 5,
    title: "Organic Chemistry Textbook 5th Edition",
    price: 85,
    originalPrice: 200,
    condition: "Good",
    category: "Books",
    image: "/placeholder.svg?height=200&width=300",
    seller: "Emma L.",
    location: "Science Building",
    co2Savings: 3,
    rating: 4.5,
    views: 19,
    tags: ["textbook", "chemistry", "science"],
    description: "Organic Chemistry textbook with minimal highlighting. Great for CHEM 301.",
    date: "2024-05-18",
  },
  {
    id: 6,
    title: "Adjustable Study Desk with Bookshelf",
    price: 75,
    originalPrice: 150,
    condition: "Fair",
    category: "Furniture",
    image: "/placeholder.svg?height=200&width=300",
    seller: "David P.",
    location: "Dorm B",
    co2Savings: 8,
    rating: 4.3,
    views: 23,
    tags: ["desk", "furniture", "study"],
    description: "Adjustable desk with built-in bookshelf. Perfect for small dorm rooms.",
    date: "2024-05-15",
  },
  {
    id: 7,
    title: "Wireless Noise-Cancelling Headphones",
    price: 120,
    originalPrice: 220,
    condition: "Excellent",
    category: "Electronics",
    image: "/placeholder.svg?height=200&width=300",
    seller: "Lisa T.",
    location: "Music Building",
    co2Savings: 10,
    rating: 4.7,
    views: 38,
    tags: ["headphones", "audio", "wireless"],
    description: "Premium noise-cancelling headphones with 30-hour battery life.",
    date: "2024-05-27",
  },
  {
    id: 8,
    title: "Psychology 101 Textbook with Study Guide",
    price: 40,
    originalPrice: 95,
    condition: "Good",
    category: "Books",
    image: "/placeholder.svg?height=200&width=300",
    seller: "Mark S.",
    location: "Psychology Department",
    co2Savings: 2,
    rating: 4.4,
    views: 15,
    tags: ["textbook", "psychology"],
    description: "Psychology 101 textbook with bonus study guide. No highlighting.",
    date: "2024-05-20",
  },
]

// Category icons mapping
const categoryIcons: Record<string, React.ReactNode> = {
  "All Categories": <Grid3X3 className="h-4 w-4" />,
  Electronics: <Laptop className="h-4 w-4" />,
  Books: <BookOpen className="h-4 w-4" />,
  Furniture: <Sofa className="h-4 w-4" />,
  Clothing: <Shirt className="h-4 w-4" />,
  Sports: <Dumbbell className="h-4 w-4" />,
  Music: <Music className="h-4 w-4" />,
}

export default function MarketplacePage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // State for filters
  const [likedItems, setLikedItems] = useState<Set<number>>(new Set())
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "")
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "All Categories")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1500])
  const [sortBy, setSortBy] = useState("newest")
  const [conditions, setConditions] = useState<string[]>([])
  const [filteredItems, setFilteredItems] = useState<Item[]>(mockItems)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Apply filters when they change
  useEffect(() => {
    let filtered = [...mockItems]

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.tags?.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    // Apply category filter
    if (selectedCategory && selectedCategory !== "All Categories") {
      filtered = filtered.filter((item) => item.category === selectedCategory)
    }

    // Apply price range filter
    filtered = filtered.filter((item) => item.price >= priceRange[0] && item.price <= priceRange[1])

    // Apply condition filter
    if (conditions.length > 0) {
      filtered = filtered.filter((item) => conditions.includes(item.condition))
    }

    // Apply sorting
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        break
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "popular":
        filtered.sort((a, b) => b.views - a.views)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
    }

    setFilteredItems(filtered)
  }, [searchQuery, selectedCategory, priceRange, conditions, sortBy])

  // Initialize filters from URL params
  useEffect(() => {
    const category = searchParams.get("category")
    const search = searchParams.get("search")
    const sort = searchParams.get("sort")

    if (category) setSelectedCategory(category)
    if (search) setSearchQuery(search)
    if (sort) setSortBy(sort)
  }, [searchParams])

  const toggleLike = (itemId: number) => {
    setLikedItems((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(itemId)) {
        newSet.delete(itemId)
      } else {
        newSet.add(itemId)
      }
      return newSet
    })
  }

  const addToCart = (itemId: number) => {
    console.log("Adding to cart:", itemId)
    const item = mockItems.find((item) => item.id === itemId)

    if (item) {
      // Show a simple alert for now
      alert(`${item.title.substring(0, 30)}... has been added to your cart.`)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(
      `/marketplace?search=${encodeURIComponent(searchQuery)}${selectedCategory !== "All Categories" ? `&category=${selectedCategory}` : ""}`,
    )
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    router.push(`/marketplace?category=${encodeURIComponent(category)}${searchQuery ? `&search=${searchQuery}` : ""}`)
  }

  const handleSortChange = (sort: string) => {
    setSortBy(sort)
    router.push(
      `/marketplace?sort=${sort}${searchQuery ? `&search=${searchQuery}` : ""}${selectedCategory !== "All Categories" ? `&category=${selectedCategory}` : ""}`,
    )
  }

  const handleConditionChange = (condition: string, checked: boolean) => {
    setConditions((prev) => (checked ? [...prev, condition] : prev.filter((c) => c !== condition)))
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("All Categories")
    setPriceRange([0, 1500])
    setConditions([])
    setSortBy("newest")
    router.push("/marketplace")
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <Navbar />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Banner */}
          <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl border border-blue-200/50 dark:border-blue-700/50 shadow-sm">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
                  Welcome to the Marketplace! 🛍️
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                  Discover amazing deals from your fellow students. Save money and help the environment!
                </p>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{mockItems.length}</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">Active Items</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">1.2k</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">Students</div>
                </div>
                <div className="hidden lg:block text-center">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">2M kg</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">CO2 Saved</div>
                </div>
              </div>
            </div>
          </div>

          {/* Items Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <Card
                key={item.id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] group"
              >
                <div className="relative aspect-video bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    className={`absolute top-2 right-2 bg-white/90 hover:bg-white shadow-lg ${
                      likedItems.has(item.id) ? "text-red-500" : "text-slate-600"
                    }`}
                    onClick={() => toggleLike(item.id)}
                  >
                    <Heart className={`h-4 w-4 ${likedItems.has(item.id) ? "fill-current" : ""}`} />
                  </Button>
                  {item.originalPrice && (
                    <Badge className="absolute top-2 left-2 bg-green-500 text-white shadow-lg">
                      {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                    </Badge>
                  )}
                  <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/70 text-white px-2 py-1 rounded-full text-xs">
                    <Star className="h-3 w-3 fill-current text-yellow-400" />
                    {item.rating}
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl font-bold text-green-600">${item.price}</span>
                    {item.originalPrice && (
                      <span className="text-lg text-slate-500 line-through">${item.originalPrice}</span>
                    )}
                    <Badge variant="secondary" className="ml-auto">
                      {item.condition}
                    </Badge>
                  </div>

                  <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400 mb-4">
                    <div className="flex items-center justify-between">
                      <span>Seller: {item.seller}</span>
                      <span className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        {item.rating}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {item.location}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-green-600">🌱 Save {item.co2Savings}kg CO2</span>
                      <span className="text-xs text-slate-500">{item.views} views</span>
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
                    <Button variant="outline" size="sm">
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Footer />
      </div>
    </AuthGuard>
  )
}
