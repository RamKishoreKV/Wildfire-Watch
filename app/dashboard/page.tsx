"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Camera,
  AlertTriangle,
  Activity,
  MapPin,
  Clock,
  Thermometer,
  Wind,
  Eye,
  Settings,
  Zap,
  Shield,
} from "lucide-react"
import { VideoFeedModal } from "@/components/video-feed-modal"
import { SidebarSlider } from "@/components/sidebar-slider"
import { AIAssistant } from "@/components/ai-assistant"
import { CameraAssistant } from "@/components/camera-assistant"
import { ActiveCamerasModal } from "@/components/active-cameras-modal"
import { ActiveAlertsModal } from "@/components/active-alerts-modal"
import { DetectionRateModal } from "@/components/detection-rate-modal"

interface CameraData {
  id: string
  name: string
  location: string
  status: "active" | "alert" | "offline"
  lastUpdate: string
  confidence?: number
  temperature?: number
  windSpeed?: number
  image: string
}

export default function DashboardPage() {
  const [selectedCamera, setSelectedCamera] = useState<CameraData | null>(null)
  const [showActiveCameras, setShowActiveCameras] = useState(false)
  const [showActiveAlerts, setShowActiveAlerts] = useState(false)
  const [showDetectionRate, setShowDetectionRate] = useState(false)

  const cameras: CameraData[] = [
    {
      id: "cam-001",
      name: "North Ridge Camera",
      location: "Sector A-1",
      status: "alert",
      lastUpdate: "2 minutes ago",
      confidence: 94.2,
      temperature: 89,
      windSpeed: 15,
      image: "https://images.unsplash.com/photo-1574482620881-2eb7c8c50b8e?w=400&h=300&fit=crop",
    },
    {
      id: "cam-002",
      name: "Valley View Camera",
      location: "Sector B-3",
      status: "active",
      lastUpdate: "1 minute ago",
      temperature: 72,
      windSpeed: 8,
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
    },
    {
      id: "cam-003",
      name: "Pine Forest Camera",
      location: "Sector C-2",
      status: "alert",
      lastUpdate: "5 minutes ago",
      confidence: 87.5,
      temperature: 95,
      windSpeed: 22,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    },
    {
      id: "cam-004",
      name: "Mountain Peak Camera",
      location: "Sector D-1",
      status: "active",
      lastUpdate: "3 minutes ago",
      temperature: 68,
      windSpeed: 12,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    },
    {
      id: "cam-005",
      name: "Riverside Camera",
      location: "Sector E-4",
      status: "offline",
      lastUpdate: "15 minutes ago",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
    },
    {
      id: "cam-006",
      name: "Desert Edge Camera",
      location: "Sector F-2",
      status: "alert",
      lastUpdate: "1 minute ago",
      confidence: 91.8,
      temperature: 102,
      windSpeed: 18,
      image: "https://images.unsplash.com/photo-1574482620881-2eb7c8c50b8e?w=400&h=300&fit=crop",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "alert":
        return "bg-red-500"
      case "active":
        return "bg-green-500"
      case "offline":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "alert":
        return <Badge variant="destructive">FIRE DETECTED</Badge>
      case "active":
        return (
          <Badge variant="default" className="bg-green-600">
            ACTIVE
          </Badge>
        )
      case "offline":
        return <Badge variant="secondary">OFFLINE</Badge>
      default:
        return <Badge variant="secondary">UNKNOWN</Badge>
    }
  }

  const activeCameras = cameras.filter((cam) => cam.status === "active").length
  const alertCameras = cameras.filter((cam) => cam.status === "alert").length
  const offlineCameras = cameras.filter((cam) => cam.status === "offline").length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-red-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <SidebarSlider />

      {/* Header */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
                <Camera className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                WildFire Watch Dashboard
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card
            className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-2 hover:shadow-lg transition-all cursor-pointer"
            onClick={() => setShowActiveCameras(true)}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Cameras</CardTitle>
              <Camera className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{activeCameras}</div>
              <p className="text-xs text-muted-foreground">+2 from last hour</p>
            </CardContent>
          </Card>

          <Card
            className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-2 hover:shadow-lg transition-all cursor-pointer"
            onClick={() => setShowActiveAlerts(true)}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{alertCameras}</div>
              <p className="text-xs text-muted-foreground">Critical attention needed</p>
            </CardContent>
          </Card>

          <Card
            className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-2 hover:shadow-lg transition-all cursor-pointer"
            onClick={() => setShowDetectionRate(true)}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Detection Rate</CardTitle>
              <Activity className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">94.2%</div>
              <p className="text-xs text-muted-foreground">+1.2% from last week</p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Status</CardTitle>
              <Shield className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">Optimal</div>
              <p className="text-xs text-muted-foreground">All systems operational</p>
            </CardContent>
          </Card>
        </div>

        {/* Camera Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cameras.map((camera) => (
            <Card
              key={camera.id}
              className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-2 hover:shadow-xl transition-all duration-300 cursor-pointer group"
              onClick={() => setSelectedCamera(camera)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{camera.name}</CardTitle>
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(camera.status)} animate-pulse`} />
                </div>
                <CardDescription className="flex items-center space-x-1">
                  <MapPin className="h-3 w-3" />
                  <span>{camera.location}</span>
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Camera Feed */}
                <div className="relative aspect-video bg-slate-100 dark:bg-slate-700 rounded-lg overflow-hidden group-hover:scale-105 transition-transform">
                  <img
                    src={camera.image || "/placeholder.svg"}
                    alt={camera.name}
                    className="w-full h-full object-cover"
                  />
                  {camera.status === "alert" && (
                    <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center">
                      <div className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                        FIRE DETECTED
                      </div>
                    </div>
                  )}
                  {camera.status === "offline" && (
                    <div className="absolute inset-0 bg-gray-500/50 flex items-center justify-center">
                      <div className="bg-gray-600 text-white px-3 py-1 rounded-full text-sm">OFFLINE</div>
                    </div>
                  )}
                  <div className="absolute top-2 right-2">{getStatusBadge(camera.status)}</div>
                </div>

                {/* Camera Info */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>Last Update</span>
                    </span>
                    <span className="text-muted-foreground">{camera.lastUpdate}</span>
                  </div>

                  {camera.confidence && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center space-x-1">
                        <Zap className="h-3 w-3" />
                        <span>Confidence</span>
                      </span>
                      <span className="font-semibold text-red-600">{camera.confidence}%</span>
                    </div>
                  )}

                  {camera.temperature && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center space-x-1">
                        <Thermometer className="h-3 w-3" />
                        <span>Temperature</span>
                      </span>
                      <span
                        className={camera.temperature > 85 ? "text-red-600 font-semibold" : "text-muted-foreground"}
                      >
                        {camera.temperature}°F
                      </span>
                    </div>
                  )}

                  {camera.windSpeed && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center space-x-1">
                        <Wind className="h-3 w-3" />
                        <span>Wind Speed</span>
                      </span>
                      <span className="text-muted-foreground">{camera.windSpeed} mph</span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 bg-transparent"
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedCamera(camera)
                    }}
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation()
                      window.location.href = `/camera-settings/${camera.id}`
                    }}
                  >
                    <Settings className="h-3 w-3 mr-1" />
                    Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Modals */}
      {selectedCamera && (
        <VideoFeedModal camera={selectedCamera} isOpen={!!selectedCamera} onClose={() => setSelectedCamera(null)} />
      )}

      <ActiveCamerasModal
        isOpen={showActiveCameras}
        onClose={() => setShowActiveCameras(false)}
        cameras={cameras.filter((cam) => cam.status === "active")}
      />

      <ActiveAlertsModal
        isOpen={showActiveAlerts}
        onClose={() => setShowActiveAlerts(false)}
        cameras={cameras.filter((cam) => cam.status === "alert")}
      />

      <DetectionRateModal isOpen={showDetectionRate} onClose={() => setShowDetectionRate(false)} />

      {/* AI Assistants */}
      <AIAssistant />
      <CameraAssistant />
    </div>
  )
}
