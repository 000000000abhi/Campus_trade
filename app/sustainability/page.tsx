"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AuthGuard } from "@/components/auth-guard"
import { ThemeToggle } from "@/components/theme-toggle"
import { ArrowLeft, Leaf, Award, TrendingUp, Users, Target, Calendar, BarChart3 } from "lucide-react"
import Link from "next/link"
import { getCurrentUser } from "@/lib/auth"
import type { User } from "@/lib/auth"

export default function SustainabilityPage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  useEffect(() => {
    setCurrentUser(getCurrentUser())
  }, [])

  // Mock sustainability data
  const userStats = {
    totalCO2Saved: 127,
    itemsTraded: 23,
    campusRank: 15,
    monthlyGoal: 50,
    currentMonth: 32,
    streak: 12,
  }

  const leaderboard = [
    { rank: 1, name: "Emma Wilson", co2Saved: 245, items: 45, badge: "🏆" },
    { rank: 2, name: "Alex Chen", co2Saved: 198, items: 38, badge: "🥈" },
    { rank: 3, name: "Sarah Johnson", co2Saved: 176, items: 32, badge: "🥉" },
    { rank: 4, name: "Mike Davis", co2Saved: 165, items: 29, badge: "⭐" },
    { rank: 5, name: "Lisa Brown", co2Saved: 152, items: 27, badge: "⭐" },
    {
      rank: 15,
      name: currentUser?.name || "You",
      co2Saved: userStats.totalCO2Saved,
      items: userStats.itemsTraded,
      badge: "🌱",
      isCurrentUser: true,
    },
  ]

  const monthlyData = [
    { month: "Jan", co2: 15, items: 3 },
    { month: "Feb", co2: 28, items: 5 },
    { month: "Mar", co2: 42, items: 8 },
    { month: "Apr", co2: 35, items: 6 },
    { month: "May", co2: 55, items: 10 },
    { month: "Jun", co2: 32, items: 7 },
  ]

  const impactCategories = [
    { category: "Electronics", co2: 85, items: 8, color: "bg-blue-500" },
    { category: "Books", co2: 24, items: 12, color: "bg-green-500" },
    { category: "Furniture", co2: 18, items: 3, color: "bg-purple-500" },
  ]

  const achievements = [
    { title: "First Trade", description: "Complete your first transaction", earned: true, icon: "🎯" },
    { title: "Eco Warrior", description: "Save 100kg of CO2", earned: true, icon: "🌍" },
    { title: "Community Helper", description: "Help 10 fellow students", earned: true, icon: "🤝" },
    { title: "Sustainability Champion", description: "Save 200kg of CO2", earned: false, icon: "🏆" },
    { title: "Campus Legend", description: "Reach top 10 leaderboard", earned: false, icon: "⭐" },
  ]

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

        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-2 flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              Sustainability Dashboard
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              Track your environmental impact and see how you're helping build a more sustainable campus
            </p>
          </div>

          {/* Overview Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-600 dark:text-green-400 text-sm font-medium">Total CO2 Saved</p>
                    <p className="text-3xl font-bold text-green-700 dark:text-green-300">{userStats.totalCO2Saved}kg</p>
                  </div>
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <Leaf className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200 dark:border-blue-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">Items Traded</p>
                    <p className="text-3xl font-bold text-blue-700 dark:text-blue-300">{userStats.itemsTraded}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-600 dark:text-purple-400 text-sm font-medium">Campus Rank</p>
                    <p className="text-3xl font-bold text-purple-700 dark:text-purple-300">#{userStats.campusRank}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-orange-200 dark:border-orange-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-600 dark:text-orange-400 text-sm font-medium">Monthly Goal</p>
                    <p className="text-3xl font-bold text-orange-700 dark:text-orange-300">
                      {userStats.currentMonth}/{userStats.monthlyGoal}kg
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Monthly Progress */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Monthly Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>CO2 Saved This Month</span>
                          <span>
                            {userStats.currentMonth}kg / {userStats.monthlyGoal}kg
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-300"
                            style={{ width: `${(userStats.currentMonth / userStats.monthlyGoal) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                          {userStats.monthlyGoal - userStats.currentMonth}kg to go!
                        </div>
                        <div className="text-sm text-green-600 dark:text-green-400">
                          You're {Math.round((userStats.currentMonth / userStats.monthlyGoal) * 100)}% towards your
                          monthly goal
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Impact by Category */}
                <Card>
                  <CardHeader>
                    <CardTitle>Impact by Category</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {impactCategories.map((category) => (
                        <div key={category.category} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>{category.category}</span>
                            <span>
                              {category.co2}kg CO2 • {category.items} items
                            </span>
                          </div>
                          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                            <div
                              className={`${category.color} h-2 rounded-full transition-all duration-300`}
                              style={{ width: `${(category.co2 / userStats.totalCO2Saved) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Achievements */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    {achievements
                      .filter((a) => a.earned)
                      .slice(0, 3)
                      .map((achievement) => (
                        <div
                          key={achievement.title}
                          className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800"
                        >
                          <div className="text-2xl">{achievement.icon}</div>
                          <div>
                            <div className="font-medium text-green-700 dark:text-green-300">{achievement.title}</div>
                            <div className="text-sm text-green-600 dark:text-green-400">{achievement.description}</div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="leaderboard" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Campus Sustainability Leaderboard
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {leaderboard.map((user) => (
                      <div
                        key={user.rank}
                        className={`flex items-center gap-4 p-4 rounded-lg border ${
                          user.isCurrentUser
                            ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
                            : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                              user.rank <= 3
                                ? "bg-gradient-to-br from-yellow-400 to-orange-500 text-white"
                                : "bg-slate-200 dark:bg-slate-700"
                            }`}
                          >
                            {user.rank}
                          </div>
                          <div className="text-2xl">{user.badge}</div>
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">{user.items} items traded</div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-600">{user.co2Saved}kg</div>
                          <div className="text-sm text-slate-500">CO2 saved</div>
                        </div>
                        {user.isCurrentUser && <Badge className="bg-blue-500 text-white">You</Badge>}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Earned Achievements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {achievements
                        .filter((a) => a.earned)
                        .map((achievement) => (
                          <div
                            key={achievement.title}
                            className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800"
                          >
                            <div className="text-3xl">{achievement.icon}</div>
                            <div>
                              <div className="font-medium text-green-700 dark:text-green-300">{achievement.title}</div>
                              <div className="text-sm text-green-600 dark:text-green-400">
                                {achievement.description}
                              </div>
                            </div>
                            <Badge className="bg-green-500 text-white ml-auto">Earned</Badge>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Achievements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {achievements
                        .filter((a) => !a.earned)
                        .map((achievement) => (
                          <div
                            key={achievement.title}
                            className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 opacity-75"
                          >
                            <div className="text-3xl grayscale">{achievement.icon}</div>
                            <div>
                              <div className="font-medium">{achievement.title}</div>
                              <div className="text-sm text-slate-600 dark:text-slate-400">
                                {achievement.description}
                              </div>
                            </div>
                            <Badge variant="outline" className="ml-auto">
                              Locked
                            </Badge>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Monthly Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-6 gap-4">
                      {monthlyData.map((data, index) => (
                        <div key={data.month} className="text-center">
                          <div className="mb-2">
                            <div
                              className="bg-green-500 rounded-t mx-auto transition-all duration-300 hover:bg-green-600"
                              style={{
                                height: `${(data.co2 / 60) * 100}px`,
                                width: "20px",
                              }}
                            ></div>
                            <div className="text-xs text-slate-500 mt-1">{data.co2}kg</div>
                          </div>
                          <div className="text-sm font-medium">{data.month}</div>
                        </div>
                      ))}
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 pt-6 border-t">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {monthlyData.reduce((sum, data) => sum + data.co2, 0)}kg
                        </div>
                        <div className="text-sm text-slate-500">Total CO2 Saved</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {monthlyData.reduce((sum, data) => sum + data.items, 0)}
                        </div>
                        <div className="text-sm text-slate-500">Items Traded</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">
                          {Math.round(monthlyData.reduce((sum, data) => sum + data.co2, 0) / monthlyData.length)}kg
                        </div>
                        <div className="text-sm text-slate-500">Monthly Average</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AuthGuard>
  )
}
