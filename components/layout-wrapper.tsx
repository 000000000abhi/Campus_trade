"use client"

import type React from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { usePathname } from "next/navigation"

interface LayoutWrapperProps {
  children: React.ReactNode
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname()

  // Pages that shouldn't have navbar/footer
  const excludeNavFooter = ["/login", "/signup"]
  const shouldShowNavFooter = !excludeNavFooter.includes(pathname)

  // Homepage doesn't need navbar since it has its own
  const shouldShowNavbar = shouldShowNavFooter && pathname !== "/"

  return (
    <div className="min-h-screen flex flex-col">
      {shouldShowNavbar && <Navbar />}
      <main className="flex-1">{children}</main>
      {shouldShowNavFooter && <Footer />}
    </div>
  )
}
