"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import {
  ZoomIn,
  ZoomOut,
  RotateCw,
  Move,
  Settings,
  AlertTriangle,
  Thermometer,
  Wind,
  MapPin,
  Clock,
  Camera,
  Maximize,
  Download,
  Share,
} from "lucide-react"

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

interface VideoFeedModalProps {
  camera: CameraData
  isOpen: boolean
  onClose: () => void
}

export function VideoFeedModal({ camera, isOpen, onClose }: VideoFeedModalProps) {
  const [zoom, setZoom] = useState([100])
  const [isFullscreen, setIsFullscreen] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "alert":
        return "text-red-600 bg-red-50 border-red-200"
      case "active":
        return "text-green-600 bg-green-50 border-green-200"
      case "offline":
        return "text-gray-600 bg-gray-50 border-gray-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "alert":
        return (
          <Badge variant="destructive" className="animate-pulse">
            🔥 FIRE DETECTED
          </Badge>
        )
      case "active":
        return (
          <Badge variant="default" className="bg-green-600">
            ✅ ACTIVE
          </Badge>
        )
      case "offline":
        return <Badge variant="secondary">⚠️ OFFLINE</Badge>
      default:
        return <Badge variant="secondary">UNKNOWN</Badge>
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[90vh] p-0">
        <DialogHeader className="p-6 pb-4">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <DialogTitle className="text-2xl flex items-center space-x-3">
                <Camera className="h-6 w-6" />
                <span>{camera.name}</span>
                {getStatusBadge(camera.status)}
              </DialogTitle>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <MapPin className="h-3 w-3" />
                  <span>{camera.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>Updated {camera.lastUpdate}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Share className="h-4 w-4 mr-1" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 flex">
          {/* Main Video Feed */}
          <div className="flex-1 p-6 pt-0">
            <div className="relative bg-black rounded-lg overflow-hidden h-full">
              <img
                src={camera.image || "/placeholder.svg"}
                alt={camera.name}
                className="w-full h-full object-cover"
                style={{ transform: `scale(${zoom[0] / 100})` }}
              />

              {/* Fire Detection Overlay */}
              {camera.status === "alert" && (
                <>
                  <div className="absolute inset-0 bg-red-500/10" />
                  <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-2 rounded-lg animate-pulse">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4" />
                      <span className="font-bold">FIRE DETECTED</span>
                    </div>
                    {camera.confidence && <div className="text-sm mt-1">Confidence: {camera.confidence}%</div>}
                  </div>

                  {/* Detection Box */}
                  <div className="absolute top-1/3 left-1/3 w-1/3 h-1/3 border-2 border-red-500 bg-red-500/20 rounded">
                    <div className="absolute -top-6 left-0 bg-red-600 text-white text-xs px-2 py-1 rounded">
                      Fire Detected
                    </div>
                  </div>
                </>
              )}

              {/* Zoom Controls */}
              <div className="absolute bottom-4 left-4 bg-black/70 text-white p-2 rounded-lg">
                <div className="text-xs mb-2">Zoom: {zoom[0]}%</div>
                <Slider value={zoom} onValueChange={setZoom} max={300} min={50} step={10} className="w-32" />
              </div>

              {/* PTZ Controls */}
              <div className="absolute bottom-4 right-4 bg-black/70 text-white p-3 rounded-lg">
                <div className="grid grid-cols-3 gap-1">
                  <div></div>
                  <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                    ↑
                  </Button>
                  <div></div>
                  <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                    ←
                  </Button>
                  <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                    <Move className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                    →
                  </Button>
                  <div></div>
                  <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                    ↓
                  </Button>
                  <div></div>
                </div>
                <div className="flex justify-center space-x-1 mt-2">
                  <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                    <ZoomIn className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                    <ZoomOut className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Side Panel */}
          <div className="w-80 border-l bg-muted/30 p-6">
            <div className="space-y-6">
              {/* Status Card */}
              <div className={`p-4 rounded-lg border-2 ${getStatusColor(camera.status)}`}>
                <h3 className="font-semibold mb-2">Camera Status</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span className="font-medium">{camera.status.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Update:</span>
                    <span>{camera.lastUpdate}</span>
                  </div>
                  {camera.confidence && (
                    <div className="flex justify-between">
                      <span>Detection Confidence:</span>
                      <span className="font-bold text-red-600">{camera.confidence}%</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Environmental Data */}
              <div className="space-y-4">
                <h3 className="font-semibold">Environmental Conditions</h3>

                {camera.temperature && (
                  <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Thermometer className="h-4 w-4 text-orange-500" />
                      <span>Temperature</span>
                    </div>
                    <span className={`font-semibold ${camera.temperature > 85 ? "text-red-600" : "text-foreground"}`}>
                      {camera.temperature}°F
                    </span>
                  </div>
                )}

                {camera.windSpeed && (
                  <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Wind className="h-4 w-4 text-blue-500" />
                      <span>Wind Speed</span>
                    </div>
                    <span className="font-semibold">{camera.windSpeed} mph</span>
                  </div>
                )}

                <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    <span>Risk Level</span>
                  </div>
                  <Badge variant={camera.status === "alert" ? "destructive" : "default"}>
                    {camera.status === "alert" ? "CRITICAL" : "LOW"}
                  </Badge>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-3">
                <h3 className="font-semibold">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm">
                    <Settings className="h-3 w-3 mr-1" />
                    Settings
                  </Button>
                  <Button variant="outline" size="sm">
                    <RotateCw className="h-3 w-3 mr-1" />
                    Reset View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Maximize className="h-3 w-3 mr-1" />
                    Fullscreen
                  </Button>
                  <Button variant="outline" size="sm">
                    <Camera className="h-3 w-3 mr-1" />
                    Snapshot
                  </Button>
                </div>
              </div>

              {/* Alert Actions (if fire detected) */}
              {camera.status === "alert" && (
                <div className="space-y-3">
                  <h3 className="font-semibold text-red-600">Emergency Actions</h3>
                  <div className="space-y-2">
                    <Button variant="destructive" className="w-full">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Alert Fire Department
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      Notify Park Rangers
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      Evacuate Area
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
