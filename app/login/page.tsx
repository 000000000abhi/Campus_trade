"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Chrome, Mail, ArrowLeft, Info, Loader2 } from "lucide-react"
import Link from "next/link"
import { authenticateUser, setCurrentUser, DEMO_USERS } from "@/lib/auth"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const user = authenticateUser(email, password)

    if (user) {
      setCurrentUser(user)
      router.push("/marketplace")
    } else {
      setError("Invalid email or password. Please try the demo credentials.")
    }

    setIsLoading(false)
  }

  const handleDemoLogin = (demoUser: (typeof DEMO_USERS)[0]) => {
    setEmail(demoUser.email)
    setPassword(demoUser.password)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <Navbar showSearch={false} />

      <div className="flex items-center justify-center p-6 min-h-[calc(100vh-80px)]">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">Welcome Back</h1>
            <p className="text-slate-600 dark:text-slate-400">Sign in to your CampusTrade account</p>
          </div>

          {/* Demo Credentials Alert */}
          <Alert className="mb-6 border-blue-200 bg-blue-50 dark:bg-blue-900/20">
            <Info className="h-4 w-4" />
            <AlertDescription>
              <strong>Demo Mode:</strong> Use any of these credentials to test the platform:
              <div className="mt-2 space-y-1 text-sm">
                {DEMO_USERS.map((user, index) => (
                  <div key={user.id} className="flex justify-between items-center">
                    <span>{user.email}</span>
                    <Button size="sm" variant="outline" onClick={() => handleDemoLogin(user)} className="h-6 text-xs">
                      Use
                    </Button>
                  </div>
                ))}
                <div className="text-xs text-slate-500 mt-2">Password for all: demo123</div>
              </div>
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle>Sign In</CardTitle>
              <CardDescription>Use your university email to access your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Google OAuth Button (Disabled for demo) */}
              <Button variant="outline" className="w-full opacity-50" size="lg" disabled>
                <Chrome className="h-5 w-5 mr-2" />
                Continue with Google (Coming Soon)
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white dark:bg-slate-800 px-2 text-slate-500">Demo Login</span>
                </div>
              </div>

              {/* Login Form */}
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="email">University Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@university.edu"
                    className="mt-1"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    className="mt-1"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button className="w-full" size="lg" type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    <>
                      <Mail className="h-4 w-4 mr-2" />
                      Sign In
                    </>
                  )}
                </Button>
              </form>

              <div className="text-center text-sm">
                <Link href="/forgot-password" className="text-blue-600 hover:underline">
                  Forgot your password?
                </Link>
              </div>

              <Separator />

              <div className="text-center text-sm text-slate-600 dark:text-slate-400">
                Don't have an account?{" "}
                <Link href="/signup" className="text-blue-600 hover:underline font-medium">
                  Sign up
                </Link>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 text-center text-xs text-slate-500">
            By signing in, you agree to our{" "}
            <Link href="/terms" className="hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
