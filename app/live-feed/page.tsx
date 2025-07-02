"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Play, Pause, Camera, AlertTriangle, Flame, Eye } from "lucide-react"
import { DetectionOverlay } from "@/components/detection-overlay"
import Link from "next/link"

interface Detection {
  id: string
  type: "fire" | "smoke"
  confidence: number
  bbox: {
    x: number
    y: number
    width: number
    height: number
  }
  timestamp: Date
}

export default function LiveFeedPage() {
  const [isDetecting, setIsDetecting] = useState(false)
  const [detections, setDetections] = useState<Detection[]>([])
  const [recentAlerts, setRecentAlerts] = useState<Detection[]>([])

  // Simulate detection process
  useEffect(() => {
    if (!isDetecting) return

    const interval = setInterval(() => {
      // Randomly generate detections
      if (Math.random() > 0.7) {
        const detection: Detection = {
          id: Date.now().toString(),
          type: Math.random() > 0.6 ? "fire" : "smoke",
          confidence: 0.6 + Math.random() * 0.4,
          bbox: {
            x: Math.random() * 60 + 10,
            y: Math.random() * 60 + 10,
            width: Math.random() * 20 + 10,
            height: Math.random() * 20 + 10,
          },
          timestamp: new Date(),
        }

        setDetections((prev) => [...prev.slice(-4), detection])
        setRecentAlerts((prev) => [...prev.slice(-9), detection])
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [isDetecting])

  const startDetection = () => {
    setIsDetecting(true)
    setDetections([])
  }

  const stopDetection = () => {
    setIsDetecting(false)
    setDetections([])
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-sm shadow-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-lg shadow-lg">
                  <Camera className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-xl font-bold">Live Detection Feed</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant={isDetecting ? "default" : "secondary"} className="px-3 py-1">
                <div
                  className={`w-2 h-2 rounded-full mr-2 ${isDetecting ? "bg-green-400 animate-pulse" : "bg-gray-400"}`}
                />
                {isDetecting ? "Detecting..." : "Stopped"}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Video Feed */}
          <div className="lg:col-span-3">
            <Card className="bg-card border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <Camera className="h-5 w-5 mr-2" />
                      North Ridge Camera - Live Feed
                    </CardTitle>
                    <CardDescription>Real-time wildfire detection monitoring</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      onClick={startDetection}
                      disabled={isDetecting}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Start Detection
                    </Button>
                    <Button onClick={stopDetection} disabled={!isDetecting} variant="destructive">
                      <Pause className="h-4 w-4 mr-2" />
                      Stop
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                  {/* Video Feed */}
                  <video className="w-full h-full object-cover" autoPlay muted loop playsInline>
                    <source
                      src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
                      type="video/mp4"
                    />
                  </video>

                  {/* Detection Overlay */}
                  <DetectionOverlay detections={detections} />

                  {/* Status Overlay */}
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-red-600 text-white">
                      <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
                      LIVE
                    </Badge>
                  </div>

                  {/* Detection Status */}
                  {isDetecting && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-blue-600 text-white">
                        <Eye className="h-3 w-3 mr-1" />
                        AI Monitoring
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Current Detections */}
                {detections.length > 0 && (
                  <div className="mt-4 p-4 bg-muted rounded-lg">
                    <h3 className="font-semibold mb-2 flex items-center">
                      <AlertTriangle className="h-4 w-4 mr-2 text-orange-500" />
                      Current Detections
                    </h3>
                    <div className="space-y-2">
                      {detections.map((detection) => (
                        <div key={detection.id} className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-2">
                            {detection.type === "fire" ? (
                              <Flame className="h-4 w-4 text-red-500" />
                            ) : (
                              <div className="w-4 h-4 bg-yellow-500 rounded-full" />
                            )}
                            <span className="capitalize font-medium">{detection.type} detected</span>
                          </div>
                          <Badge variant={detection.type === "fire" ? "destructive" : "secondary"}>
                            {(detection.confidence * 100).toFixed(1)}% confidence
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Camera Info */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg">Camera Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location:</span>
                  <span className="font-medium">Sector A-1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Active</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Uptime:</span>
                  <span className="font-medium">99.2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Resolution:</span>
                  <span className="font-medium">1920x1080</span>
                </div>
              </CardContent>
            </Card>

            {/* Recent Alerts */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-orange-500" />
                  Recent Alerts
                  {recentAlerts.length > 0 && (
                    <Badge className="ml-2 bg-red-600 text-white">{recentAlerts.length}</Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {recentAlerts.length === 0 ? (
                  <p className="text-muted-foreground text-sm">No recent alerts</p>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {recentAlerts
                      .slice()
                      .reverse()
                      .map((alert) => (
                        <div key={alert.id} className="p-3 bg-muted rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              {alert.type === "fire" ? (
                                <Flame className="h-4 w-4 text-red-500" />
                              ) : (
                                <div className="w-4 h-4 bg-yellow-500 rounded-full" />
                              )}
                              <span className="font-medium capitalize">{alert.type}</span>
                            </div>
                            <Badge variant={alert.type === "fire" ? "destructive" : "secondary"} className="text-xs">
                              {(alert.confidence * 100).toFixed(1)}%
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">{alert.timestamp.toLocaleTimeString()}</p>
                        </div>
                      ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Detection Stats */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg">Detection Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Detections:</span>
                  <span className="font-bold">{recentAlerts.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Fire Alerts:</span>
                  <span className="font-bold text-red-600">{recentAlerts.filter((a) => a.type === "fire").length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Smoke Alerts:</span>
                  <span className="font-bold text-yellow-600">
                    {recentAlerts.filter((a) => a.type === "smoke").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Avg Confidence:</span>
                  <span className="font-bold">
                    {recentAlerts.length > 0
                      ? ((recentAlerts.reduce((acc, a) => acc + a.confidence, 0) / recentAlerts.length) * 100).toFixed(
                          1,
                        ) + "%"
                      : "N/A"}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
