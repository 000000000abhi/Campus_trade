"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { AuthGuard } from "@/components/auth-guard"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Users,
  Package,
  Flag,
  Search,
  Ban,
  Eye,
  CheckCircle,
  XCircle,
  TrendingUp,
  DollarSign,
  AlertTriangle,
} from "lucide-react"
import Link from "next/link"

export default function AdminPanel() {
  const [searchTerm, setSearchTerm] = useState("")

  // Mock admin data
  const stats = {
    totalUsers: 1247,
    activeListings: 342,
    reportedItems: 12,
    totalTransactions: 856,
    monthlyRevenue: 4250,
    newUsersThisMonth: 89,
  }

  const users = [
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@university.edu",
      joinDate: "2024-01-15",
      status: "active",
      trustScore: 4.8,
      totalSales: 12,
      totalPurchases: 8,
      reportCount: 0,
    },
    {
      id: "2",
      name: "Sarah Smith",
      email: "sarah.smith@university.edu",
      joinDate: "2024-01-10",
      status: "active",
      trustScore: 4.9,
      totalSales: 18,
      totalPurchases: 15,
      reportCount: 0,
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike.johnson@university.edu",
      joinDate: "2024-01-20",
      status: "suspended",
      trustScore: 3.2,
      totalSales: 3,
      totalPurchases: 2,
      reportCount: 3,
    },
  ]

  const reportedItems = [
    {
      id: "1",
      title: 'MacBook Pro 13" 2021',
      seller: "John Doe",
      reportReason: "Misleading description",
      reportDate: "2024-01-20",
      status: "pending",
      reportCount: 2,
    },
    {
      id: "2",
      title: "iPhone 13 Pro",
      seller: "Mike Johnson",
      reportReason: "Suspected fake item",
      reportDate: "2024-01-19",
      status: "under_review",
      reportCount: 4,
    },
  ]

  const recentTransactions = [
    {
      id: "1",
      buyer: "Sarah Smith",
      seller: "John Doe",
      item: 'MacBook Pro 13"',
      amount: 899,
      date: "2024-01-20",
      status: "completed",
    },
    {
      id: "2",
      buyer: "Mike Johnson",
      seller: "Sarah Smith",
      item: "Calculus Textbook",
      amount: 45,
      date: "2024-01-19",
      status: "completed",
    },
  ]

  const handleUserAction = (userId: string, action: "ban" | "unban" | "view") => {
    console.log(`${action} user:`, userId)
  }

  const handleItemAction = (itemId: string, action: "approve" | "remove" | "hide") => {
    console.log(`${action} item:`, itemId)
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        {/* Header */}
        <header className="bg-white dark:bg-slate-800 shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Admin Panel</h1>
                <Badge className="bg-red-500 text-white">Admin Access</Badge>
              </div>
              <div className="flex items-center gap-4">
                <ThemeToggle />
                <Button variant="outline" asChild>
                  <Link href="/marketplace">Back to Marketplace</Link>
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Overview Stats */}
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Total Users</p>
                    <p className="text-2xl font-bold">{stats.totalUsers}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Active Listings</p>
                    <p className="text-2xl font-bold">{stats.activeListings}</p>
                  </div>
                  <Package className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Reported Items</p>
                    <p className="text-2xl font-bold text-red-600">{stats.reportedItems}</p>
                  </div>
                  <Flag className="h-8 w-8 text-red-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Transactions</p>
                    <p className="text-2xl font-bold">{stats.totalTransactions}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Monthly Revenue</p>
                    <p className="text-2xl font-bold">${stats.monthlyRevenue}</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">New Users</p>
                    <p className="text-2xl font-bold">{stats.newUsersThisMonth}</p>
                  </div>
                  <Users className="h-8 w-8 text-cyan-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="users" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="users">User Management</TabsTrigger>
              <TabsTrigger value="reports">Reported Items</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="users" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>User Management</CardTitle>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                      <Input
                        placeholder="Search users..."
                        className="pl-10 w-64"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {users.map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div>
                            <h3 className="font-medium">{user.name}</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">{user.email}</p>
                            <div className="flex items-center gap-4 mt-1 text-xs text-slate-500">
                              <span>Joined: {new Date(user.joinDate).toLocaleDateString()}</span>
                              <span>Trust: {user.trustScore}/5</span>
                              <span>Sales: {user.totalSales}</span>
                              <span>Purchases: {user.totalPurchases}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={user.status === "active" ? "default" : "destructive"}
                            className={user.status === "active" ? "bg-green-500" : ""}
                          >
                            {user.status}
                          </Badge>
                          {user.reportCount > 0 && (
                            <Badge variant="destructive" className="bg-red-500">
                              {user.reportCount} reports
                            </Badge>
                          )}
                          <Button variant="ghost" size="sm" onClick={() => handleUserAction(user.id, "view")}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleUserAction(user.id, user.status === "active" ? "ban" : "unban")}
                          >
                            <Ban className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    Reported Items
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {reportedItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-4 border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 rounded-lg"
                      >
                        <div>
                          <h3 className="font-medium">{item.title}</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400">Seller: {item.seller}</p>
                          <p className="text-sm text-red-600 dark:text-red-400">Reason: {item.reportReason}</p>
                          <div className="flex items-center gap-4 mt-1 text-xs text-slate-500">
                            <span>Reported: {new Date(item.reportDate).toLocaleDateString()}</span>
                            <span>{item.reportCount} reports</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              item.status === "pending"
                                ? "secondary"
                                : item.status === "under_review"
                                  ? "default"
                                  : "destructive"
                            }
                          >
                            {item.status.replace("_", " ")}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleItemAction(item.id, "approve")}
                            className="text-green-600 hover:text-green-700"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleItemAction(item.id, "remove")}
                            className="text-red-600 hover:text-red-700"
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleItemAction(item.id, "hide")}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="transactions" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentTransactions.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg"
                      >
                        <div>
                          <h3 className="font-medium">{transaction.item}</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {transaction.buyer} ← {transaction.seller}
                          </p>
                          <p className="text-xs text-slate-500">{new Date(transaction.date).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-600">${transaction.amount}</div>
                          <Badge className="bg-green-500 text-white">{transaction.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Platform Growth</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>User Growth Rate</span>
                        <span className="text-green-600 font-medium">+12.5%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Transaction Volume</span>
                        <span className="text-blue-600 font-medium">+8.3%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Average Order Value</span>
                        <span className="text-purple-600 font-medium">$127.50</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Category Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Electronics</span>
                        <span className="font-medium">45%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Books</span>
                        <span className="font-medium">28%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Furniture</span>
                        <span className="font-medium">18%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Other</span>
                        <span className="font-medium">9%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AuthGuard>
  )
}
