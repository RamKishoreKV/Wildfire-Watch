"use client"

import { useState, useEffect } from "react"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Flame, MapPin, Clock, AlertTriangle, Camera, BarChart3 } from "lucide-react"
import { VideoFeedModal } from "@/components/video-feed-modal"
import { NotificationPanel } from "@/components/notification-panel"
import { ActiveCamerasModal } from "@/components/active-cameras-modal"
import { ActiveAlertsModal } from "@/components/active-alerts-modal"
import { DetectionRateModal } from "@/components/detection-rate-modal"
import { QuickActionsPanel } from "@/components/quick-actions-panel"
import { AIAssistant } from "@/components/ai-assistant"
import { CameraAssistant } from "@/components/camera-assistant"
import { UserPreferences } from "@/components/user-preferences"
import { SidebarSlider } from "@/components/sidebar-slider"

interface CameraFeed {
  id: string
  name: string
  location: string
  status: "active" | "offline" | "alert"
  lastDetection?: {
    timestamp: string
    confidence: number
    type: "fire" | "smoke"
  }
  thumbnail: string
  uptime: number
  lastMaintenance: string
  networkStatus: "excellent" | "good" | "poor"
}

const mockCameraFeeds: CameraFeed[] = [
  {
    id: "cam-001",
    name: "North Ridge Camera",
    location: "Sector A-1",
    status: "alert",
    lastDetection: {
      timestamp: "2 minutes ago",
      confidence: 0.89,
      type: "fire",
    },
    thumbnail: "https://images.unsplash.com/photo-1574482620881-2f235c4e6d3d?w=800&h=450&fit=crop",
    uptime: 99.2,
    lastMaintenance: "2024-01-15",
    networkStatus: "excellent",
  },
  {
    id: "cam-002",
    name: "Valley View Camera",
    location: "Sector B-3",
    status: "active",
    thumbnail: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=450&fit=crop",
    uptime: 98.7,
    lastMaintenance: "2024-01-10",
    networkStatus: "good",
  },
  {
    id: "cam-003",
    name: "Mountain Peak Camera",
    location: "Sector C-2",
    status: "active",
    lastDetection: {
      timestamp: "1 hour ago",
      confidence: 0.65,
      type: "smoke",
    },
    thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=450&fit=crop",
    uptime: 97.5,
    lastMaintenance: "2024-01-12",
    networkStatus: "excellent",
  },
  {
    id: "cam-004",
    name: "Forest Edge Camera",
    location: "Sector D-1",
    status: "offline",
    thumbnail: "/placeholder.svg?height=200&width=300",
    uptime: 0,
    lastMaintenance: "2024-01-08",
    networkStatus: "poor",
  },
  {
    id: "cam-005",
    name: "River Bend Camera",
    location: "Sector E-2",
    status: "active",
    thumbnail: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=450&fit=crop",
    uptime: 99.8,
    lastMaintenance: "2024-01-18",
    networkStatus: "excellent",
  },
  {
    id: "cam-006",
    name: "Hilltop Camera",
    location: "Sector F-1",
    status: "active",
    thumbnail: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&h=450&fit=crop",
    uptime: 96.3,
    lastMaintenance: "2024-01-05",
    networkStatus: "good",
  },
]

export default function DashboardPage() {
  const [selectedCamera, setSelectedCamera] = useState<CameraFeed | null>(null)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showActiveCameras, setShowActiveCameras] = useState(false)
  const [showActiveAlerts, setShowActiveAlerts] = useState(false)
  const [showDetectionRate, setShowDetectionRate] = useState(false)
  const [showQuickActions, setShowQuickActions] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)
  const [aiMinimized, setAiMinimized] = useState(true)
  const [cameraMinimized, setCameraMinimized] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Check if user is logged in (simulate login check)
    const loggedIn = localStorage.getItem("wildfire_logged_in")
    if (loggedIn === "true") {
      setIsLoggedIn(true)
    } else {
      redirect("/login")
    }
  }, [])

  const [alerts] = useState([
    {
      id: 1,
      message: "Fire detected at North Ridge Camera",
      time: "2 min ago",
      severity: "high",
      location: "Sector A-1",
      confidence: 89,
      status: "active",
    },
    {
      id: 2,
      message: "Smoke detected at Mountain Peak Camera",
      time: "1 hour ago",
      severity: "medium",
      location: "Sector C-2",
      confidence: 65,
      status: "investigating",
    },
    {
      id: 3,
      message: "Camera offline: Forest Edge Camera",
      time: "3 hours ago",
      severity: "low",
      location: "Sector D-1",
      confidence: 0,
      status: "maintenance",
    },
  ])

  const activeCameras = mockCameraFeeds.filter((cam) => cam.status === "active")
  const offlineCameras = mockCameraFeeds.filter((cam) => cam.status === "offline")
  const alertCameras = mockCameraFeeds.filter((cam) => cam.status === "alert")
  const activeAlerts = alerts.filter((alert) => alert.status === "active")

  // Calculate detection rate
  const totalDetections = 1247
  const successfulDetections = 1174
  const detectionRate = ((successfulDetections / totalDetections) * 100).toFixed(1)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "alert":
        return "bg-red-500/10 text-red-600 border-red-500/20 dark:text-red-400"
      case "active":
        return "bg-green-500/10 text-green-600 border-green-500/20 dark:text-green-400"
      case "offline":
        return "bg-gray-500/10 text-gray-600 border-gray-500/20 dark:text-gray-400"
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-500/20 dark:text-gray-400"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "alert":
        return <AlertTriangle className="h-4 w-4" />
      case "active":
        return <Camera className="h-4 w-4" />
      case "offline":
        return <Camera className="h-4 w-4 opacity-50" />
      default:
        return <Camera className="h-4 w-4" />
    }
  }

  // Get camera image based on status with real images
  const getCameraImage = (camera: CameraFeed) => {
    if (camera.status === "alert" || camera.lastDetection?.type === "fire") {
      // Real fire image from Unsplash
      return "https://images.unsplash.com/photo-1574482620881-2f235c4e6d3d?w=800&h=450&fit=crop"
    } else if (camera.status === "offline") {
      return ""
    } else {
      // Real forest images from Unsplash
      const forestImages = [
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=450&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=450&fit=crop",
        "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=450&fit=crop",
        "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&h=450&fit=crop",
      ]
      return forestImages[Math.floor(Math.random() * forestImages.length)]
    }
  }

  const handleOfflineCameraClick = (camera: CameraFeed) => {
    if (camera.status === "offline") {
      const shouldTroubleshoot = confirm(
        `${camera.name} is currently offline. Would you like to troubleshoot this camera?`,
      )
      if (shouldTroubleshoot) {
        window.open(`/camera-settings/${camera.id}`, "_blank")
      }
    } else {
      setSelectedCamera(camera)
    }
  }

  // Redirect to login if not logged in
  if (!isLoggedIn) {
    redirect("/login")
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Simplified Header */}
      <header className="bg-background/80 backdrop-blur-sm shadow-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-lg shadow-lg">
                <Flame className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                WildFire Watch
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar Slider */}
      <SidebarSlider
        alerts={alerts}
        onShowNotifications={() => setShowNotifications(true)}
        onShowQuickActions={() => setShowQuickActions(true)}
        onShowPreferences={() => setShowPreferences(true)}
        onShowAI={() => setAiMinimized(false)}
        onShowCamera={() => setCameraMinimized(false)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card
            className="cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20 hover:border-green-500/40"
            onClick={() => setShowActiveCameras(true)}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600 dark:text-green-400">Active Cameras</p>
                  <p className="text-3xl font-bold text-green-700 dark:text-green-300">{activeCameras.length}</p>
                  <p className="text-xs text-green-600/80 dark:text-green-400/80 mt-1 animate-pulse">
                    Click to view details
                  </p>
                </div>
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-full shadow-lg">
                  <Camera className="h-8 w-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-gradient-to-br from-red-500/10 to-rose-500/10 border-red-500/20 hover:border-red-500/40"
            onClick={() => setShowActiveAlerts(true)}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-red-600 dark:text-red-400">Active Alerts</p>
                  <p className="text-3xl font-bold text-red-700 dark:text-red-300">{alertCameras.length}</p>
                  <p className="text-xs text-red-600/80 dark:text-red-400/80 mt-1 animate-pulse">
                    Click to view details
                  </p>
                </div>
                <div className="bg-gradient-to-r from-red-500 to-rose-500 p-3 rounded-full animate-pulse shadow-lg">
                  <AlertTriangle className="h-8 w-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-gradient-to-br from-gray-500/10 to-slate-500/10 border-gray-500/20 hover:border-gray-500/40">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Offline Cameras</p>
                  <p className="text-3xl font-bold text-gray-700 dark:text-gray-300">{offlineCameras.length}</p>
                  <p className="text-xs text-gray-600/80 dark:text-gray-400/80 mt-1">Needs attention</p>
                </div>
                <div className="bg-gradient-to-r from-gray-400 to-slate-400 p-3 rounded-full shadow-lg">
                  <Camera className="h-8 w-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border-blue-500/20 hover:border-blue-500/40"
            onClick={() => setShowDetectionRate(true)}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Detection Rate</p>
                  <p className="text-3xl font-bold text-blue-700 dark:text-blue-300">{detectionRate}%</p>
                  <p className="text-xs text-blue-600/80 dark:text-blue-400/80 mt-1 animate-pulse">
                    Click for analytics
                  </p>
                </div>
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-3 rounded-full shadow-lg">
                  <BarChart3 className="h-8 w-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Camera Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCameraFeeds.map((camera) => (
            <Card
              key={camera.id}
              className={`cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
                camera.status === "alert"
                  ? "bg-gradient-to-br from-red-500/10 to-orange-500/10 border-red-500/30 ring-2 ring-red-500/20 animate-pulse"
                  : camera.status === "offline"
                    ? "bg-gradient-to-br from-gray-500/10 to-slate-500/10 border-gray-500/30"
                    : "bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/30"
              }`}
              onClick={() => handleOfflineCameraClick(camera)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-bold">{camera.name}</CardTitle>
                  <Badge className={`${getStatusColor(camera.status)} shadow-sm border`}>
                    {getStatusIcon(camera.status)}
                    <span className="ml-1 capitalize font-medium">{camera.status}</span>
                  </Badge>
                </div>
                <CardDescription className="flex items-center font-medium">
                  <MapPin className="h-4 w-4 mr-1" />
                  {camera.location}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="aspect-video bg-black rounded-lg mb-4 overflow-hidden relative group">
                  {camera.status === "offline" ? (
                    <div className="w-full h-full flex items-center justify-center bg-gray-900">
                      <div className="text-center">
                        <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-2" />
                        <p className="text-white font-medium">Camera Offline</p>
                        <p className="text-gray-400 text-sm">Click to troubleshoot</p>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Camera Image Display with Real Images */}
                      <img
                        src={getCameraImage(camera) || "/placeholder.svg"}
                        alt={`${camera.name} feed`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = camera.thumbnail
                        }}
                      />

                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="bg-white/90 rounded-full p-3">
                            <Camera className="h-6 w-6 text-gray-800" />
                          </div>
                        </div>
                      </div>

                      <div className="absolute top-2 left-2">
                        <Badge className="bg-red-600 text-white">
                          <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
                          LIVE
                        </Badge>
                      </div>

                      {camera.status === "alert" && (
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-red-600 text-white animate-pulse">🔥 FIRE DETECTED</Badge>
                        </div>
                      )}
                    </>
                  )}
                </div>

                {camera.lastDetection && (
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground font-medium">Last Detection:</span>
                      <Badge
                        variant={camera.lastDetection.type === "fire" ? "destructive" : "secondary"}
                        className="shadow-sm"
                      >
                        {camera.lastDetection.type}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground font-medium">Confidence:</span>
                      <span className="font-bold text-lg">{(camera.lastDetection.confidence * 100).toFixed(1)}%</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      {camera.lastDetection.timestamp}
                    </div>
                  </div>
                )}

                <div className="mt-4 pt-4 border-t border-border space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground font-medium">Uptime:</span>
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-2 h-2 rounded-full ${camera.uptime > 95 ? "bg-green-500" : "bg-orange-500"}`}
                      ></div>
                      <span
                        className={`font-bold ${camera.uptime > 95 ? "text-green-600 dark:text-green-400" : "text-orange-600 dark:text-orange-400"}`}
                      >
                        {camera.uptime}%
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground font-medium">Network:</span>
                    <Badge
                      variant="outline"
                      className={`shadow-sm ${
                        camera.networkStatus === "excellent"
                          ? "text-green-600 border-green-600 bg-green-500/10 dark:text-green-400"
                          : camera.networkStatus === "good"
                            ? "text-blue-600 border-blue-600 bg-blue-500/10 dark:text-blue-400"
                            : "text-orange-600 border-orange-600 bg-orange-500/10 dark:text-orange-400"
                      }`}
                    >
                      {camera.networkStatus}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Modals */}
      {selectedCamera && <VideoFeedModal camera={selectedCamera} onClose={() => setSelectedCamera(null)} />}
      {showNotifications && <NotificationPanel alerts={alerts} onClose={() => setShowNotifications(false)} />}
      {showActiveCameras && <ActiveCamerasModal cameras={activeCameras} onClose={() => setShowActiveCameras(false)} />}
      {showActiveAlerts && <ActiveAlertsModal alerts={activeAlerts} onClose={() => setShowActiveAlerts(false)} />}
      {showDetectionRate && (
        <DetectionRateModal detectionRate={detectionRate} onClose={() => setShowDetectionRate(false)} />
      )}
      {showQuickActions && <QuickActionsPanel onClose={() => setShowQuickActions(false)} />}
      {showPreferences && <UserPreferences isOpen={showPreferences} onClose={() => setShowPreferences(false)} />}

      <AIAssistant isMinimized={aiMinimized} onToggleMinimize={() => setAiMinimized(!aiMinimized)} />
      <CameraAssistant isMinimized={cameraMinimized} onToggleMinimize={() => setCameraMinimized(!cameraMinimized)} />
    </div>
  )
}
