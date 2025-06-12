"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AuthGuard } from "@/components/auth-guard"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  ArrowLeft,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  MessageCircle,
  Download,
  Star,
  MapPin,
  Calendar,
  Truck,
} from "lucide-react"
import Link from "next/link"
import { getCurrentUser } from "@/lib/auth"
import type { User } from "@/lib/auth"

interface Order {
  id: string
  items: Array<{
    id: string
    title: string
    price: number
    image: string
    seller: string
  }>
  total: number
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled"
  orderDate: string
  deliveryMethod: string
  deliveryAddress?: string
  trackingNumber?: string
  estimatedDelivery?: string
}

export default function OrdersPage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  useEffect(() => {
    setCurrentUser(getCurrentUser())
  }, [])

  // Mock orders data
  const orders: Order[] = [
    {
      id: "ORD-001",
      items: [
        {
          id: "1",
          title: 'MacBook Pro 13" 2021',
          price: 899,
          image: "/placeholder.svg?height=60&width=60",
          seller: "John Doe",
        },
      ],
      total: 906.99,
      status: "delivered",
      orderDate: "2024-01-15",
      deliveryMethod: "Campus Pickup",
      estimatedDelivery: "2024-01-16",
    },
    {
      id: "ORD-002",
      items: [
        {
          id: "2",
          title: "Calculus Textbook Bundle",
          price: 45,
          image: "/placeholder.svg?height=60&width=60",
          seller: "Sarah Smith",
        },
        {
          id: "3",
          title: "Physics Lab Manual",
          price: 25,
          image: "/placeholder.svg?height=60&width=60",
          seller: "Mike Johnson",
        },
      ],
      total: 77.99,
      status: "confirmed",
      orderDate: "2024-01-20",
      deliveryMethod: "Dorm Delivery",
      deliveryAddress: "Dorm A, Room 204",
      estimatedDelivery: "2024-01-22",
    },
    {
      id: "ORD-003",
      items: [
        {
          id: "4",
          title: "Gaming Chair",
          price: 120,
          image: "/placeholder.svg?height=60&width=60",
          seller: "Alex Chen",
        },
      ],
      total: 127.99,
      status: "pending",
      orderDate: "2024-01-21",
      deliveryMethod: "Campus Pickup",
      estimatedDelivery: "2024-01-23",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "confirmed":
        return <CheckCircle className="h-4 w-4 text-blue-500" />
      case "shipped":
        return <Truck className="h-4 w-4 text-purple-500" />
      case "delivered":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500"
      case "confirmed":
        return "bg-blue-500"
      case "shipped":
        return "bg-purple-500"
      case "delivered":
        return "bg-green-500"
      case "cancelled":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const activeOrders = orders.filter((order) => !["delivered", "cancelled"].includes(order.status))
  const completedOrders = orders.filter((order) => ["delivered", "cancelled"].includes(order.status))

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
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-2 flex items-center gap-3">
              <Package className="h-10 w-10" />
              My Orders
            </h1>
            <p className="text-slate-600 dark:text-slate-400">Track and manage your purchases</p>
          </div>

          <Tabs defaultValue="active" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="active">Active Orders ({activeOrders.length})</TabsTrigger>
              <TabsTrigger value="completed">Order History ({completedOrders.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-6">
              {activeOrders.length === 0 ? (
                <Card className="text-center py-12">
                  <CardContent>
                    <Package className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No active orders</h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-6">
                      You don't have any active orders at the moment
                    </p>
                    <Button asChild>
                      <Link href="/marketplace">Start Shopping</Link>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {activeOrders.map((order) => (
                    <Card key={order.id} className="overflow-hidden">
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-lg">Order {order.id}</CardTitle>
                            <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400 mt-1">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {new Date(order.orderDate).toLocaleDateString()}
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {order.deliveryMethod}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge className={`${getStatusColor(order.status)} text-white`}>
                              {getStatusIcon(order.status)}
                              <span className="ml-1 capitalize">{order.status}</span>
                            </Badge>
                            <div className="text-lg font-bold mt-1">${order.total}</div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Order Items */}
                        <div className="space-y-3">
                          {order.items.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg"
                            >
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.title}
                                className="w-12 h-12 object-cover rounded"
                              />
                              <div className="flex-1">
                                <div className="font-medium">{item.title}</div>
                                <div className="text-sm text-slate-600 dark:text-slate-400">by {item.seller}</div>
                              </div>
                              <div className="font-medium">${item.price}</div>
                            </div>
                          ))}
                        </div>

                        {/* Delivery Info */}
                        {order.estimatedDelivery && (
                          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                            <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400">
                              <Truck className="h-4 w-4" />
                              <span className="font-medium">
                                Estimated {order.deliveryMethod === "Campus Pickup" ? "Pickup" : "Delivery"}:{" "}
                                {new Date(order.estimatedDelivery).toLocaleDateString()}
                              </span>
                            </div>
                            {order.deliveryAddress && (
                              <div className="text-sm text-blue-600 dark:text-blue-300 mt-1">
                                Delivery to: {order.deliveryAddress}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-2 pt-2">
                          <Button variant="outline" size="sm">
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Contact Seller
                          </Button>
                          {order.trackingNumber && (
                            <Button variant="outline" size="sm">
                              Track Order
                            </Button>
                          )}
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Receipt
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="completed" className="space-y-6">
              {completedOrders.length === 0 ? (
                <Card className="text-center py-12">
                  <CardContent>
                    <CheckCircle className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No completed orders</h3>
                    <p className="text-slate-600 dark:text-slate-400">Your completed orders will appear here</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {completedOrders.map((order) => (
                    <Card key={order.id} className="overflow-hidden">
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-lg">Order {order.id}</CardTitle>
                            <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400 mt-1">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {new Date(order.orderDate).toLocaleDateString()}
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {order.deliveryMethod}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge className={`${getStatusColor(order.status)} text-white`}>
                              {getStatusIcon(order.status)}
                              <span className="ml-1 capitalize">{order.status}</span>
                            </Badge>
                            <div className="text-lg font-bold mt-1">${order.total}</div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Order Items */}
                        <div className="space-y-3">
                          {order.items.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg"
                            >
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.title}
                                className="w-12 h-12 object-cover rounded"
                              />
                              <div className="flex-1">
                                <div className="font-medium">{item.title}</div>
                                <div className="text-sm text-slate-600 dark:text-slate-400">by {item.seller}</div>
                              </div>
                              <div className="font-medium">${item.price}</div>
                            </div>
                          ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 pt-2">
                          {order.status === "delivered" && (
                            <Button variant="outline" size="sm">
                              <Star className="h-4 w-4 mr-2" />
                              Rate & Review
                            </Button>
                          )}
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Receipt
                          </Button>
                          <Button variant="outline" size="sm">
                            Buy Again
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AuthGuard>
  )
}
