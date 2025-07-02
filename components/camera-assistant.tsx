"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Camera,
  Minimize2,
  Maximize2,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Settings,
  AlertTriangle,
  Eye,
  Move,
} from "lucide-react"

export function CameraAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)

  const quickActions = [
    { icon: Eye, label: "View All Cameras", color: "bg-blue-500" },
    { icon: AlertTriangle, label: "Check Alerts", color: "bg-red-500" },
    { icon: ZoomIn, label: "Zoom Controls", color: "bg-green-500" },
    { icon: Settings, label: "Camera Settings", color: "bg-purple-500" },
  ]

  const cameraControls = [
    { icon: Move, label: "Pan/Tilt", action: "ptz" },
    { icon: ZoomIn, label: "Zoom In", action: "zoom_in" },
    { icon: ZoomOut, label: "Zoom Out", action: "zoom_out" },
    { icon: RotateCw, label: "Reset View", action: "reset" },
  ]

  if (!isOpen) {
    return (
      <Button
        className="fixed bottom-6 left-6 h-14 w-14 rounded-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 shadow-lg z-40"
        onClick={() => setIsOpen(true)}
      >
        <Camera className="h-6 w-6 text-white" />
      </Button>
    )
  }

  return (
    <Card
      className={`fixed bottom-6 left-6 w-80 shadow-2xl z-40 transition-all duration-300 ${
        isMinimized ? "h-16" : "h-96"
      }`}
    >
      <CardHeader className="pb-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Camera className="h-5 w-5" />
            <CardTitle className="text-lg">Fire Cam</CardTitle>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              PTZ
            </Badge>
          </div>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
              onClick={() => setIsMinimized(!isMinimized)}
            >
              {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
              onClick={() => setIsOpen(false)}
            >
              ×
            </Button>
          </div>
        </div>
      </CardHeader>

      {!isMinimized && (
        <CardContent className="p-4 space-y-4">
          {/* Quick Actions */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-muted-foreground">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((action) => (
                <Button key={action.label} variant="outline" size="sm" className="justify-start h-10 bg-transparent">
                  <div className={`w-3 h-3 rounded-full ${action.color} mr-2`} />
                  <span className="text-xs">{action.label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Camera Controls */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-muted-foreground">Camera Controls</h3>
            <div className="grid grid-cols-2 gap-2">
              {cameraControls.map((control) => (
                <Button key={control.label} variant="outline" size="sm" className="justify-start h-10 bg-transparent">
                  <control.icon className="h-3 w-3 mr-2" />
                  <span className="text-xs">{control.label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-muted-foreground">System Status</h3>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span>Active Cameras</span>
                <Badge variant="default" className="bg-green-600">
                  5 Online
                </Badge>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span>Fire Alerts</span>
                <Badge variant="destructive">3 Active</Badge>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span>Detection Rate</span>
                <Badge variant="outline">94.2%</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
