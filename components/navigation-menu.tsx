"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Monitor, Smartphone, Users, BarChart3, Map, Phone, Settings, Camera, Lightbulb, GitBranch } from "lucide-react"

export function NavigationMenu() {
  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: Monitor, description: "Main monitoring interface" },
    { name: "Mobile App", href: "/mobile", icon: Smartphone, description: "Citizen reporting app" },
    { name: "Public Portal", href: "/public-portal", icon: Users, description: "Community fire watch" },
    { name: "Analytics", href: "/analytics", icon: BarChart3, description: "Performance metrics" },
    { name: "Map View", href: "/map", icon: Map, description: "Interactive monitoring" },
    { name: "Emergency", href: "/emergency", icon: Phone, description: "Emergency response" },
    { name: "Live Feed", href: "/live-feed", icon: Camera, description: "Real-time detection" },
    { name: "Settings", href: "/settings", icon: Settings, description: "System configuration" },
    { name: "Solutions", href: "/solutions-overview", icon: Lightbulb, description: "10 solution overview" },
    { name: "Conceptual Model", href: "/conceptual-model", icon: GitBranch, description: "System architecture" },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {menuItems.map((item) => (
        <Link key={item.name} href={item.href}>
          <Button variant="outline" className="h-20 w-full flex flex-col items-center justify-center space-y-2">
            <item.icon className="h-6 w-6" />
            <div className="text-center">
              <div className="font-medium text-sm">{item.name}</div>
              <div className="text-xs text-gray-500">{item.description}</div>
            </div>
          </Button>
        </Link>
      ))}
    </div>
  )
}
