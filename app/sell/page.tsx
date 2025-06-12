"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { AuthGuard } from "@/components/auth-guard"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Upload,
  Camera,
  Sparkles,
  X,
  ArrowLeft,
  MapPin,
  DollarSign,
  Calendar,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"

export default function SellPage() {
  const [images, setImages] = useState<string[]>([])
  const [aiSuggestions, setAiSuggestions] = useState(false)
  const [isAiProcessing, setIsAiProcessing] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    condition: "",
    price: "",
    originalPrice: "",
    description: "",
    location: "",
    isNegotiable: false,
    deliveryMethods: [] as string[],
    tags: "",
    autoExpiry: true,
  })

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file))
      setImages((prev) => [...prev, ...newImages].slice(0, 5))
    }
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleAiScan = async () => {
    setIsAiProcessing(true)
    setAiSuggestions(true)

    // Simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Mock AI suggestions
    setFormData((prev) => ({
      ...prev,
      title: 'MacBook Pro 13" 2021 - M1 Chip',
      category: "electronics",
      condition: "excellent",
      price: "899",
      originalPrice: "1299",
      description:
        'MacBook Pro 13" with M1 chip in excellent condition. Perfect for students and professionals. Includes original charger and documentation.',
      tags: "laptop, macbook, m1, programming, design",
    }))

    setIsAiProcessing(false)
  }

  const handleDeliveryMethodChange = (method: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      deliveryMethods: checked ? [...prev.deliveryMethods, method] : prev.deliveryMethods.filter((m) => m !== method),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Handle form submission
  }

  const estimatedCO2Savings =
    formData.category === "electronics"
      ? 35
      : formData.category === "books"
        ? 2
        : formData.category === "furniture"
          ? 15
          : 5

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
                <Button variant="outline" asChild>
                  <Link href="/sell/drafts">My Drafts</Link>
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-2">List Your Item</h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              Create a listing for your item and reach students in your campus community
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Image Upload Section */}
              <div className="lg:col-span-1">
                <Card className="sticky top-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Camera className="h-5 w-5" />
                      Photos (up to 5)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      {images.map((image, index) => (
                        <div
                          key={index}
                          className="relative aspect-square bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden"
                        >
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`Upload ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <Button
                            type="button"
                            size="sm"
                            variant="destructive"
                            className="absolute top-2 right-2"
                            onClick={() => removeImage(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                          {index === 0 && (
                            <Badge className="absolute bottom-2 left-2" variant="secondary">
                              Main
                            </Badge>
                          )}
                        </div>
                      ))}
                      {images.length < 5 && (
                        <label className="aspect-square border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-colors">
                          <Upload className="h-8 w-8 text-slate-400 mb-2" />
                          <span className="text-sm text-slate-500">Add Photo</span>
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageUpload}
                          />
                        </label>
                      )}
                    </div>

                    {images.length > 0 && (
                      <Button
                        type="button"
                        onClick={handleAiScan}
                        className="w-full"
                        variant="outline"
                        disabled={isAiProcessing}
                      >
                        {isAiProcessing ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            AI Analyzing...
                          </>
                        ) : (
                          <>
                            <Sparkles className="h-4 w-4 mr-2" />
                            Use AI to Generate Details
                          </>
                        )}
                      </Button>
                    )}

                    {aiSuggestions && !isAiProcessing && (
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                        <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 text-sm">
                          <CheckCircle className="h-4 w-4" />
                          AI suggestions applied! Review and edit as needed.
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Item Details Form */}
              <div className="lg:col-span-2 space-y-6">
                {/* Basic Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                    {aiSuggestions && (
                      <Badge variant="secondary" className="w-fit">
                        <Sparkles className="h-3 w-3 mr-1" />
                        AI Enhanced
                      </Badge>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="title">Title *</Label>
                      <Input
                        id="title"
                        placeholder="e.g., MacBook Pro 13-inch 2021"
                        className="mt-1"
                        value={formData.title}
                        onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="category">Category *</Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="electronics">Electronics</SelectItem>
                            <SelectItem value="books">Books & Textbooks</SelectItem>
                            <SelectItem value="furniture">Furniture</SelectItem>
                            <SelectItem value="clothing">Clothing & Accessories</SelectItem>
                            <SelectItem value="sports">Sports & Recreation</SelectItem>
                            <SelectItem value="music">Musical Instruments</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="condition">Condition *</Label>
                        <Select
                          value={formData.condition}
                          onValueChange={(value) => setFormData((prev) => ({ ...prev, condition: value }))}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select condition" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="new">Brand New</SelectItem>
                            <SelectItem value="like-new">Like New</SelectItem>
                            <SelectItem value="excellent">Excellent</SelectItem>
                            <SelectItem value="good">Good</SelectItem>
                            <SelectItem value="fair">Fair</SelectItem>
                            <SelectItem value="poor">Poor</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="description">Description *</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe your item, its condition, and any important details..."
                        className="mt-1 min-h-[120px]"
                        value={formData.description}
                        onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="tags">Tags (comma-separated)</Label>
                      <Input
                        id="tags"
                        placeholder="e.g., laptop, programming, design"
                        className="mt-1"
                        value={formData.tags}
                        onChange={(e) => setFormData((prev) => ({ ...prev, tags: e.target.value }))}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Pricing */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5" />
                      Pricing
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="price">Selling Price ($) *</Label>
                        <Input
                          id="price"
                          type="number"
                          placeholder="0.00"
                          className="mt-1"
                          value={formData.price}
                          onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="originalPrice">Original Price ($)</Label>
                        <Input
                          id="originalPrice"
                          type="number"
                          placeholder="0.00"
                          className="mt-1"
                          value={formData.originalPrice}
                          onChange={(e) => setFormData((prev) => ({ ...prev, originalPrice: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="negotiable"
                        checked={formData.isNegotiable}
                        onCheckedChange={(checked) =>
                          setFormData((prev) => ({ ...prev, isNegotiable: checked as boolean }))
                        }
                      />
                      <Label htmlFor="negotiable">Price is negotiable</Label>
                    </div>

                    {formData.price && formData.originalPrice && (
                      <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                        <div className="text-green-700 dark:text-green-400 text-sm">
                          💰 Buyer saves ${Number(formData.originalPrice) - Number(formData.price)} (
                          {Math.round(
                            ((Number(formData.originalPrice) - Number(formData.price)) /
                              Number(formData.originalPrice)) *
                              100,
                          )}
                          % off)
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Location & Delivery */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Location & Delivery
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="location">Pickup Location *</Label>
                      <Select
                        value={formData.location}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, location: value }))}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select pickup location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="engineering">Engineering Building</SelectItem>
                          <SelectItem value="library">Main Library</SelectItem>
                          <SelectItem value="student-center">Student Center</SelectItem>
                          <SelectItem value="dorm-a">Dorm A</SelectItem>
                          <SelectItem value="dorm-b">Dorm B</SelectItem>
                          <SelectItem value="dorm-c">Dorm C</SelectItem>
                          <SelectItem value="science">Science Building</SelectItem>
                          <SelectItem value="business">Business School</SelectItem>
                          <SelectItem value="arts">Arts Building</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Delivery Methods *</Label>
                      <div className="mt-2 space-y-2">
                        {["Campus Pickup", "Dorm Delivery", "Meet at Location"].map((method) => (
                          <div key={method} className="flex items-center space-x-2">
                            <Checkbox
                              id={method}
                              checked={formData.deliveryMethods.includes(method)}
                              onCheckedChange={(checked) => handleDeliveryMethodChange(method, checked as boolean)}
                            />
                            <Label htmlFor={method}>{method}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Sustainability Impact */}
                {formData.category && (
                  <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
                        🌱 Environmental Impact
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-green-700 dark:text-green-400">
                        <div className="text-2xl font-bold">{estimatedCO2Savings}kg CO2</div>
                        <div className="text-sm">Estimated savings by buying second-hand</div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Listing Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Listing Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="autoExpiry"
                        checked={formData.autoExpiry}
                        onCheckedChange={(checked) =>
                          setFormData((prev) => ({ ...prev, autoExpiry: checked as boolean }))
                        }
                      />
                      <Label htmlFor="autoExpiry">Auto-expire listing after 30 days</Label>
                    </div>

                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                      <div className="flex items-start gap-2 text-blue-700 dark:text-blue-400 text-sm">
                        <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-medium">Listing Guidelines</div>
                          <ul className="mt-1 space-y-1 text-xs">
                            <li>• Be honest about item condition</li>
                            <li>• Use clear, well-lit photos</li>
                            <li>• Respond to messages promptly</li>
                            <li>• Meet in safe, public campus locations</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Submit Buttons */}
                <div className="flex gap-4 pt-4">
                  <Button type="submit" size="lg" className="flex-1">
                    Publish Listing
                  </Button>
                  <Button type="button" variant="outline" size="lg">
                    Save Draft
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </AuthGuard>
  )
}
