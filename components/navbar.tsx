"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/theme-toggle"
import { CartIcon } from "@/components/cart-icon"
import {
  Search,
  Heart,
  Bell,
  User,
  Settings,
  LogOut,
  Package,
  MessageCircle,
  Leaf,
  Plus,
  Menu,
  X,
  ShoppingBag,
  TrendingUp,
  BookOpen,
  Home,
  HelpCircle,
  ChevronDown,
  Sparkles,
  Zap,
} from "lucide-react"
import Link from "next/link"
import { getCurrentUser, logout } from "@/lib/auth"
import { useRouter } from "next/navigation"
import type { User as AuthUser } from "@/lib/auth"
import { getNotifications, getUnreadCount, markAsRead, markAllAsRead, formatTimeAgo } from "@/lib/notifications"
import type { Notification } from "@/lib/notifications"

interface NavbarProps {
  showSearch?: boolean
}

export function Navbar({ showSearch = true }: NavbarProps) {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [isScrolled, setIsScrolled] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setCurrentUser(getCurrentUser())
    setNotifications(getNotifications())
    setUnreadCount(getUnreadCount())

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/marketplace?search=${encodeURIComponent(searchQuery)}`)
  }

  const handleMarkAllAsRead = () => {
    markAllAsRead()
    setNotifications(getNotifications())
    setUnreadCount(0)
  }

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      markAsRead(notification.id)
      setNotifications(getNotifications())
      setUnreadCount(getUnreadCount())
    }
    if (notification.actionUrl) {
      router.push(notification.actionUrl)
    }
  }

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-2xl border-b border-slate-200/50 dark:border-slate-700/50"
          : "bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border-b border-slate-200/30 dark:border-slate-700/30"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-300">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
            </div>
            <Link
              href="/marketplace"
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 font-heading"
            >
              CampusTrade
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          {showSearch && (
            <div className="hidden md:flex flex-1 max-w-xl mx-8">
              <form onSubmit={handleSearch} className="relative w-full group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5 group-hover:text-blue-500 transition-colors duration-300" />
                  <Input
                    type="text"
                    placeholder="Search for amazing deals..."
                    className="pl-12 pr-20 py-3 w-full bg-slate-50/80 dark:bg-slate-800/80 border-slate-200/50 dark:border-slate-700/50 focus:border-blue-500 dark:focus:border-blue-400 rounded-2xl text-base backdrop-blur-sm transition-all duration-300 focus:shadow-lg focus:shadow-blue-500/25"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button
                    type="submit"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-xl px-4 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Zap className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Quick Actions */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all duration-300 group"
                >
                  <ShoppingBag className="h-5 w-5 group-hover:text-blue-500 transition-colors" />
                  <span className="font-medium">Shop</span>
                  <ChevronDown className="h-4 w-4 group-hover:rotate-180 transition-transform duration-300" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-slate-200/50 dark:border-slate-700/50 shadow-2xl rounded-2xl"
              >
                <DropdownMenuItem asChild className="rounded-xl m-1">
                  <Link href="/marketplace" className="flex items-center px-3 py-2">
                    <Home className="mr-3 h-5 w-5 text-blue-500" />
                    <span>All Items</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="rounded-xl m-1">
                  <Link href="/marketplace?category=electronics" className="flex items-center px-3 py-2">
                    <TrendingUp className="mr-3 h-5 w-5 text-purple-500" />
                    <span>Electronics</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="rounded-xl m-1">
                  <Link href="/marketplace?category=books" className="flex items-center px-3 py-2">
                    <BookOpen className="mr-3 h-5 w-5 text-green-500" />
                    <span>Books</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all duration-300 group"
              asChild
            >
              <Link href="/sell">
                <Plus className="h-5 w-5 group-hover:text-green-500 transition-colors" />
                <span className="font-medium">Sell</span>
              </Link>
            </Button>

            <Button
              variant="ghost"
              className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all duration-300 group"
              asChild
            >
              <Link href="/sustainability">
                <Leaf className="h-5 w-5 group-hover:text-emerald-500 transition-colors" />
                <span className="font-medium">Impact</span>
              </Link>
            </Button>

            {/* Divider */}
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-2"></div>

            {/* Icons */}
            <div className="flex items-center space-x-1">
              <CartIcon />

              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-xl hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all duration-300 group"
                asChild
              >
                <Link href="/wishlist">
                  <Heart className="h-5 w-5 group-hover:text-red-500 transition-colors" />
                </Link>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-xl hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all duration-300 group"
                asChild
              >
                <Link href="/chat">
                  <MessageCircle className="h-5 w-5 group-hover:text-blue-500 transition-colors" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs shadow-lg">
                    2
                  </Badge>
                </Link>
              </Button>

              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative rounded-xl hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all duration-300 group"
                  >
                    <Bell className="h-5 w-5 group-hover:text-yellow-500 transition-colors" />
                    {unreadCount > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs shadow-lg animate-pulse">
                        {unreadCount}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-slate-200/50 dark:border-slate-700/50 shadow-2xl rounded-2xl"
                >
                  <DropdownMenuLabel className="flex items-center justify-between px-4 py-3">
                    <span className="font-semibold">Notifications</span>
                    {unreadCount > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 text-xs rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30"
                        onClick={handleMarkAllAsRead}
                      >
                        Mark all read
                      </Button>
                    )}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-slate-200/50 dark:bg-slate-700/50" />
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center text-slate-500">
                      <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>No notifications yet</p>
                    </div>
                  ) : (
                    notifications.slice(0, 5).map((notification) => (
                      <DropdownMenuItem
                        key={notification.id}
                        className="p-4 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 cursor-pointer rounded-xl m-1"
                        onClick={() => handleNotificationClick(notification)}
                      >
                        <div className="flex gap-3 items-start w-full">
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg ${
                              notification.type === "message"
                                ? "bg-gradient-to-br from-blue-500 to-cyan-500"
                                : notification.type === "sale"
                                  ? "bg-gradient-to-br from-green-500 to-emerald-500"
                                  : notification.type === "price_drop"
                                    ? "bg-gradient-to-br from-purple-500 to-pink-500"
                                    : "bg-gradient-to-br from-slate-500 to-slate-600"
                            }`}
                          >
                            {notification.type === "message" && <MessageCircle className="h-5 w-5 text-white" />}
                            {notification.type === "sale" && <ShoppingBag className="h-5 w-5 text-white" />}
                            {notification.type === "price_drop" && <TrendingUp className="h-5 w-5 text-white" />}
                            {notification.type === "system" && <Bell className="h-5 w-5 text-white" />}
                          </div>
                          <div className="flex flex-col space-y-1 flex-1">
                            <div className="flex items-center justify-between">
                              <p
                                className={`text-sm font-medium ${!notification.read ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-400"}`}
                              >
                                {notification.title}
                              </p>
                              {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{notification.message}</p>
                            <p className="text-xs text-slate-400 dark:text-slate-500">
                              {formatTimeAgo(notification.timestamp)}
                            </p>
                          </div>
                        </div>
                      </DropdownMenuItem>
                    ))
                  )}
                  <DropdownMenuSeparator className="bg-slate-200/50 dark:bg-slate-700/50" />
                  <DropdownMenuItem asChild className="rounded-xl m-1">
                    <Link
                      href="/notifications"
                      className="flex justify-center text-sm text-blue-600 dark:text-blue-400 hover:underline py-3"
                    >
                      View all notifications
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <ThemeToggle />

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-xl hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all duration-300"
                  >
                    <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 flex items-center justify-center text-white text-sm font-semibold shadow-lg">
                      {currentUser?.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-64 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-slate-200/50 dark:border-slate-700/50 shadow-2xl rounded-2xl"
                  align="end"
                  forceMount
                >
                  <DropdownMenuLabel className="font-normal px-4 py-3">
                    <div className="flex flex-col space-y-1">
                      <p className="text-base font-semibold leading-none">{currentUser?.name}</p>
                      <p className="text-sm leading-none text-slate-500 dark:text-slate-400">
                        {currentUser?.year} • {currentUser?.major}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-slate-200/50 dark:bg-slate-700/50" />
                  <DropdownMenuItem asChild className="rounded-xl m-1">
                    <Link href="/profile" className="flex items-center px-3 py-2">
                      <User className="mr-3 h-5 w-5 text-blue-500" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="rounded-xl m-1">
                    <Link href="/orders" className="flex items-center px-3 py-2">
                      <Package className="mr-3 h-5 w-5 text-green-500" />
                      <span>My Orders</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="rounded-xl m-1">
                    <Link href="/sustainability" className="flex items-center px-3 py-2">
                      <Leaf className="mr-3 h-5 w-5 text-emerald-500" />
                      <span>Sustainability</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="rounded-xl m-1">
                    <Link href="/settings" className="flex items-center px-3 py-2">
                      <Settings className="mr-3 h-5 w-5 text-purple-500" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="rounded-xl m-1">
                    <Link href="/help" className="flex items-center px-3 py-2">
                      <HelpCircle className="mr-3 h-5 w-5 text-orange-500" />
                      <span>Help & Support</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-slate-200/50 dark:bg-slate-700/50" />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600 dark:text-red-400 rounded-xl m-1">
                    <LogOut className="mr-3 h-5 w-5" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-xl hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        {showSearch && (
          <div className="md:hidden pb-4">
            <form onSubmit={handleSearch} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5 group-hover:text-blue-500 transition-colors duration-300" />
                <Input
                  type="text"
                  placeholder="Search..."
                  className="pl-12 pr-16 py-3 w-full bg-slate-50/80 dark:bg-slate-800/80 border-slate-200/50 dark:border-slate-700/50 rounded-2xl backdrop-blur-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button
                  type="submit"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-xl h-8"
                >
                  <Zap className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-200/50 dark:border-slate-700/50 py-4 space-y-1 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-b-2xl">
            <Link
              href="/marketplace"
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              <ShoppingBag className="h-5 w-5 text-blue-500" />
              <span className="font-medium">Shop</span>
            </Link>
            <Link
              href="/sell"
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              <Plus className="h-5 w-5 text-green-500" />
              <span className="font-medium">Sell Item</span>
            </Link>
            <Link
              href="/cart"
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              <ShoppingBag className="h-5 w-5 text-purple-500" />
              <span className="font-medium">Cart</span>
              <Badge className="ml-auto bg-gradient-to-r from-red-500 to-pink-500 text-white">2</Badge>
            </Link>
            <Link
              href="/wishlist"
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              <Heart className="h-5 w-5 text-red-500" />
              <span className="font-medium">Wishlist</span>
            </Link>
            <Link
              href="/chat"
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              <MessageCircle className="h-5 w-5 text-blue-500" />
              <span className="font-medium">Messages</span>
              <Badge className="ml-auto bg-gradient-to-r from-blue-500 to-purple-500 text-white">2</Badge>
            </Link>
            <Link
              href="/notifications"
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              <Bell className="h-5 w-5 text-yellow-500" />
              <span className="font-medium">Notifications</span>
              <Badge className="ml-auto bg-gradient-to-r from-red-500 to-pink-500 text-white">3</Badge>
            </Link>
            <Link
              href="/profile"
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              <User className="h-5 w-5 text-slate-600 dark:text-slate-400" />
              <span className="font-medium">Profile</span>
            </Link>
            <Link
              href="/orders"
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              <Package className="h-5 w-5 text-green-500" />
              <span className="font-medium">Orders</span>
            </Link>
            <Link
              href="/sustainability"
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              <Leaf className="h-5 w-5 text-emerald-500" />
              <span className="font-medium">Sustainability</span>
            </Link>
            <div className="px-4 py-3">
              <ThemeToggle />
            </div>
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 justify-start text-red-600 dark:text-red-400 w-full rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Logout</span>
            </Button>
          </div>
        )}
      </div>
    </nav>
  )
}
