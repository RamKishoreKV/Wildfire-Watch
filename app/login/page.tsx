"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { ThemeToggle } from "@/components/theme-toggle"
import { Flame, Shield, Eye, AlertTriangle } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 1500)
  }

  const handleDemoLogin = () => {
    setEmail("demo@wildfirewatch.com")
    setPassword("demo123")
  }

  const handleEmergencyAccess = () => {
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 flex flex-col justify-center items-center text-white p-12">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center space-x-3 mb-8">
              <Flame className="h-12 w-12 text-orange-300" />
              <h1 className="text-4xl font-bold">WildFire Watch</h1>
            </div>
            <h2 className="text-2xl font-semibold">AI-Powered Fire Detection</h2>
            <p className="text-lg opacity-90 max-w-md">
              Advanced monitoring system protecting forests and communities with real-time detection and emergency
              response coordination.
            </p>
            <div className="grid grid-cols-1 gap-4 mt-8">
              <div className="flex items-center space-x-3">
                <Eye className="h-5 w-5 text-orange-300" />
                <span>24/7 Monitoring</span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-orange-300" />
                <span>94.2% Detection Accuracy</span>
              </div>
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-5 w-5 text-orange-300" />
                <span>Instant Emergency Alerts</span>
              </div>
            </div>
          </div>
        </div>
        {/* Animated background elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse" />
        <div className="absolute bottom-20 right-20 w-16 h-16 bg-white/10 rounded-full animate-pulse delay-1000" />
        <div className="absolute top-1/2 right-10 w-12 h-12 bg-white/10 rounded-full animate-pulse delay-500" />
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 lg:hidden">
              <Flame className="h-8 w-8 text-orange-500" />
              <span className="text-2xl font-bold">WildFire Watch</span>
            </div>
            <ThemeToggle />
          </div>

          {/* Login Card */}
          <Card className="border-2">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Welcome Back</CardTitle>
              <CardDescription className="text-center">Sign in to access the monitoring dashboard</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  />
                  <Label htmlFor="remember" className="text-sm">
                    Remember me
                  </Label>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>

              {/* Demo Account */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Demo Access</span>
                </div>
              </div>

              <Button variant="outline" className="w-full bg-transparent" onClick={handleDemoLogin}>
                Try Demo Account
              </Button>

              {/* Emergency Access */}
              <Button
                variant="destructive"
                className="w-full bg-red-600 hover:bg-red-700"
                onClick={handleEmergencyAccess}
              >
                <AlertTriangle className="h-4 w-4 mr-2" />
                Emergency Access
              </Button>

              {/* Footer Links */}
              <div className="text-center space-y-2 text-sm text-muted-foreground">
                <p>
                  <a href="#" className="hover:text-primary">
                    Forgot password?
                  </a>
                </p>
                <p>
                  Need help?{" "}
                  <a href="#" className="hover:text-primary">
                    Contact Support
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Demo Credentials Info */}
          <Card className="bg-muted/50">
            <CardContent className="pt-6">
              <div className="text-sm space-y-2">
                <p className="font-semibold">Demo Credentials:</p>
                <p>Email: demo@wildfirewatch.com</p>
                <p>Password: demo123</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
