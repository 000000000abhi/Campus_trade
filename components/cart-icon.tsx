"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart } from "lucide-react"
import Link from "next/link"

export function CartIcon() {
  const [cartCount, setCartCount] = useState(2) // Mock cart count

  return (
    <Button variant="ghost" size="sm" className="relative" asChild>
      <Link href="/cart">
        <ShoppingCart className="h-5 w-5" />
        {cartCount > 0 && (
          <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-red-500 text-white text-xs">
            {cartCount}
          </Badge>
        )}
      </Link>
    </Button>
  )
}
