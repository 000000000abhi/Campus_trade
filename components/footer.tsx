"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Heart,
  ArrowRight,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export function Footer() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail("")
      setTimeout(() => setSubscribed(false), 5000)
    }
  }

  return (
    <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      {/* Newsletter Section */}
      <div className="bg-blue-50 dark:bg-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 font-heading">Stay Connected</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Get the latest deals and updates delivered to your inbox
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex w-full max-w-md gap-2">
              <div className="relative flex-1">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="pr-24 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {subscribed && (
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center text-green-600 dark:text-green-400 text-sm">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Subscribed!
                  </div>
                )}
              </div>
              <Button type="submit" disabled={subscribed} className="btn-gradient">
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-heading">
              CampusTrade
            </div>
            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              Empowering students to trade sustainably within their campus community.
            </p>

            {/* Social Links */}
            <div className="flex space-x-3">
              <Button variant="outline" size="icon" className="rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20">
                <Linkedin className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white font-heading">Platform</h4>
            <div className="space-y-3">
              <Link
                href="/marketplace"
                className="block text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Marketplace
              </Link>
              <Link
                href="/sell"
                className="block text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Sell Items
              </Link>
              <Link
                href="/sustainability"
                className="block text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Sustainability
              </Link>
              <Link
                href="/how-it-works"
                className="block text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                How It Works
              </Link>
            </div>
          </div>

          {/* Community Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white font-heading">Community</h4>
            <div className="space-y-3">
              <Link
                href="/about"
                className="block text-slate-600 dark:text-slate-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              >
                About Us
              </Link>
              <Link
                href="/blog"
                className="block text-slate-600 dark:text-slate-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              >
                Blog
              </Link>
              <Link
                href="/help"
                className="block text-slate-600 dark:text-slate-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              >
                Help Center
              </Link>
              <Link
                href="/contact"
                className="block text-slate-600 dark:text-slate-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white font-heading">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span className="text-slate-600 dark:text-slate-400 text-sm">support@campustrade.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-green-600 dark:text-green-400" />
                <span className="text-slate-600 dark:text-slate-400 text-sm">1-800-CAMPUS-1</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                <span className="text-slate-600 dark:text-slate-400 text-sm">123 University Ave</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-slate-200 dark:bg-slate-700" />

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1 font-heading">
              10K+
            </div>
            <div className="text-slate-600 dark:text-slate-400 text-sm">Students</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-green-600 dark:text-green-400 mb-1 font-heading">
              50K+
            </div>
            <div className="text-slate-600 dark:text-slate-400 text-sm">Items Traded</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1 font-heading">
              100+
            </div>
            <div className="text-slate-600 dark:text-slate-400 text-sm">Universities</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-cyan-600 dark:text-cyan-400 mb-1 font-heading">
              2M kg
            </div>
            <div className="text-slate-600 dark:text-slate-400 text-sm">CO2 Saved</div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-slate-600 dark:text-slate-400 text-sm flex items-center gap-1">
              &copy; {new Date().getFullYear()} CampusTrade. Made with <Heart className="h-4 w-4 text-red-500" /> for
              students.
            </div>
            <div className="flex flex-wrap gap-6 text-sm">
              <Link
                href="/privacy"
                className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Terms
              </Link>
              <Link
                href="/cookies"
                className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
