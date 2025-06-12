"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { AuthGuard } from "@/components/auth-guard"
import { ThemeToggle } from "@/components/theme-toggle"
import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag, CreditCard, Truck, Shield, Tag, MapPin } from "lucide-react"
import Link from "next/link"
import { getCurrentUser } from "@/lib/auth"
import type { User } from "@/lib/auth"

interface CartItem {
  id: string
  title: string
  price: number
  originalPrice?: number
  condition: string
  image: string
  seller: string
  location: string
  quantity: number
  deliveryMethod: string
  co2Savings: number
}

export default function CartPage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [promoCode, setPromoCode] = useState("")
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null)

  useEffect(() => {
    setCurrentUser(getCurrentUser())
  }, [])

  // Mock cart items
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      title: 'MacBook Pro 13" 2021 - M1 Chip',
      price: 899,
      originalPrice: 1299,
      condition: "Excellent",
      image: "/placeholder.svg?height=100&width=100",
      seller: "John Doe",
      location: "Engineering Building",
      quantity: 1,
      deliveryMethod: "Campus Pickup",
      co2Savings: 35,
    },
    {
      id: "2",
      title: "Calculus Textbook Bundle",
      price: 45,
      originalPrice: 120,
      condition: "Good",
      image: "/placeholder.svg?height=100&width=100",
      seller: "Sarah Smith",
      location: "Library",
      quantity: 1,
      deliveryMethod: "Dorm Delivery",
      co2Savings: 2,
    },
  ])

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id)
      return
    }
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const applyPromoCode = () => {
    // Mock promo code validation
    const validCodes = {
      STUDENT10: 10,
      SAVE15: 15,
      NEWUSER: 20,
    }

    if (validCodes[promoCode as keyof typeof validCodes]) {
      setAppliedPromo({
        code: promoCode,
        discount: validCodes[promoCode as keyof typeof validCodes],
      })
      setPromoCode("")
    }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalSavings = cartItems.reduce((sum, item) => {
    const originalPrice = item.originalPrice || item.price
    return sum + (originalPrice - item.price) * item.quantity
  }, 0)
  const promoDiscount = appliedPromo ? (subtotal * appliedPromo.discount) / 100 : 0
  const deliveryFee = 5 // Flat delivery fee
  const serviceFee = 2.99
  const total = subtotal - promoDiscount + deliveryFee + serviceFee
  const totalCO2Savings = cartItems.reduce((sum, item) => sum + item.co2Savings * item.quantity, 0)

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
                Continue Shopping
              </Link>
              <div className="flex items-center gap-4">
                <ThemeToggle />
                <Link href="/wishlist">
                  <Button variant="outline">Wishlist</Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-2 flex items-center gap-3">
              <ShoppingBag className="h-10 w-10" />
              Shopping Cart
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
            </p>
          </div>

          {cartItems.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <ShoppingBag className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Discover amazing deals from your fellow students
                </p>
                <Button asChild>
                  <Link href="/marketplace">Start Shopping</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-semibold text-lg">{item.title}</h3>
                              <p className="text-slate-600 dark:text-slate-400">Sold by {item.seller}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="secondary">{item.condition}</Badge>
                                <div className="flex items-center gap-1 text-sm text-slate-500">
                                  <MapPin className="h-3 w-3" />
                                  {item.location}
                                </div>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem(item.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-2">
                                <span className="text-2xl font-bold text-green-600">${item.price}</span>
                                {item.originalPrice && (
                                  <span className="text-lg text-slate-500 line-through">${item.originalPrice}</span>
                                )}
                              </div>
                              <div className="text-sm text-green-600">🌱 {item.co2Savings}kg CO2 saved</div>
                            </div>

                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-12 text-center font-medium">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          <div className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                            <Truck className="h-4 w-4 inline mr-1" />
                            {item.deliveryMethod}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Promo Code */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Tag className="h-5 w-5" />
                      Promo Code
                    </h3>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                      />
                      <Button onClick={applyPromoCode} disabled={!promoCode}>
                        Apply
                      </Button>
                    </div>
                    {appliedPromo && (
                      <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                        <div className="flex items-center justify-between">
                          <span className="text-green-700 dark:text-green-400 font-medium">
                            {appliedPromo.code} applied!
                          </span>
                          <span className="text-green-700 dark:text-green-400">-{appliedPromo.discount}%</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary */}
              <div className="space-y-6">
                <Card className="sticky top-6">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      {totalSavings > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>You save</span>
                          <span>-${totalSavings.toFixed(2)}</span>
                        </div>
                      )}
                      {appliedPromo && (
                        <div className="flex justify-between text-green-600">
                          <span>Promo ({appliedPromo.code})</span>
                          <span>-${promoDiscount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>Delivery Fee</span>
                        <span>${deliveryFee.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Service Fee</span>
                        <span>${serviceFee.toFixed(2)}</span>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>

                    <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                      <div className="text-center text-green-700 dark:text-green-400">
                        <div className="font-semibold">🌱 Environmental Impact</div>
                        <div className="text-sm">You'll save {totalCO2Savings}kg of CO2!</div>
                      </div>
                    </div>

                    <Button size="lg" className="w-full" asChild>
                      <Link href="/checkout">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Proceed to Checkout
                      </Link>
                    </Button>

                    <div className="flex items-center justify-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <Shield className="h-4 w-4" />
                      Secure checkout with 256-bit SSL encryption
                    </div>
                  </CardContent>
                </Card>

                {/* Recommended Items */}
                <Card>
                  <CardHeader>
                    <CardTitle>You might also like</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { title: "iPhone 13 Pro", price: 650, image: "/placeholder.svg?height=60&width=60" },
                        { title: "Gaming Chair", price: 120, image: "/placeholder.svg?height=60&width=60" },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg cursor-pointer"
                        >
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div className="flex-1">
                            <div className="font-medium text-sm">{item.title}</div>
                            <div className="text-green-600 font-bold">${item.price}</div>
                          </div>
                          <Button size="sm" variant="outline">
                            Add
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  )
}
