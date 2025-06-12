"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, MessageCircle, ShoppingBag, TrendingUp, Check } from "lucide-react"
import { getNotifications, markAsRead, markAllAsRead, formatTimeAgo } from "@/lib/notifications"
import type { Notification } from "@/lib/notifications"
import Link from "next/link"

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [filter, setFilter] = useState<"all" | "unread">("all")

  useEffect(() => {
    setNotifications(getNotifications())
  }, [])

  const handleMarkAsRead = (notificationId: string) => {
    markAsRead(notificationId)
    setNotifications(getNotifications())
  }

  const handleMarkAllAsRead = () => {
    markAllAsRead()
    setNotifications(getNotifications())
  }

  const filteredNotifications = filter === "unread" ? notifications.filter((n) => !n.read) : notifications

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 font-heading">Notifications</h1>
          <p className="text-slate-600 dark:text-slate-400">Stay updated with your latest activities and messages</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex gap-2">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
              className="font-medium"
            >
              All ({notifications.length})
            </Button>
            <Button
              variant={filter === "unread" ? "default" : "outline"}
              onClick={() => setFilter("unread")}
              className="font-medium"
            >
              Unread ({unreadCount})
            </Button>
          </div>

          {unreadCount > 0 && (
            <Button variant="outline" onClick={handleMarkAllAsRead} className="flex items-center gap-2">
              <Check className="h-4 w-4" />
              Mark all as read
            </Button>
          )}
        </div>

        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Bell className="h-12 w-12 text-slate-400 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  {filter === "unread" ? "No unread notifications" : "No notifications yet"}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-center">
                  {filter === "unread"
                    ? "You're all caught up! Check back later for new updates."
                    : "When you receive notifications, they'll appear here."}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredNotifications.map((notification) => (
              <Card
                key={notification.id}
                className={`transition-all duration-200 hover:shadow-md ${
                  !notification.read ? "border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/10" : ""
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex gap-4 items-start">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        notification.type === "message"
                          ? "bg-blue-100 dark:bg-blue-900"
                          : notification.type === "sale"
                            ? "bg-green-100 dark:bg-green-900"
                            : notification.type === "price_drop"
                              ? "bg-purple-100 dark:bg-purple-900"
                              : "bg-slate-100 dark:bg-slate-800"
                      }`}
                    >
                      {notification.type === "message" && (
                        <MessageCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      )}
                      {notification.type === "sale" && (
                        <ShoppingBag className="h-5 w-5 text-green-600 dark:text-green-400" />
                      )}
                      {notification.type === "price_drop" && (
                        <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      )}
                      {notification.type === "system" && (
                        <Bell className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3
                          className={`font-semibold ${!notification.read ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-400"}`}
                        >
                          {notification.title}
                        </h3>
                        <div className="flex items-center gap-2">
                          {!notification.read && (
                            <Badge
                              variant="secondary"
                              className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                            >
                              New
                            </Badge>
                          )}
                          <span className="text-xs text-slate-500 dark:text-slate-400">
                            {formatTimeAgo(notification.timestamp)}
                          </span>
                        </div>
                      </div>

                      <p className="text-slate-600 dark:text-slate-400 mb-3">{notification.message}</p>

                      <div className="flex items-center gap-2">
                        {notification.actionUrl && (
                          <Button variant="outline" size="sm" asChild>
                            <Link href={notification.actionUrl}>View Details</Link>
                          </Button>
                        )}

                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleMarkAsRead(notification.id)}
                            className="text-blue-600 dark:text-blue-400"
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Mark as read
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
