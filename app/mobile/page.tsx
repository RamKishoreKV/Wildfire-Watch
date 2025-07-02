"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Camera, Upload, MapPin, Bell, AlertTriangle, CheckCircle, Clock, Smartphone, Users, Flame } from "lucide-react"
import Link from "next/link"

interface Detection {
  id: string
  type: "fire" | "smoke"
  confidence: number
  location: string
  timestamp: Date
  status: "pending" | "verified" | "false_positive"
  uploadedBy: string
}

export default function MobileAppPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [location, setLocation] = useState("")
  const [description, setDescription] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [recentDetections, setRecentDetections] = useState<Detection[]>([
    {
      id: "det-001",
      type: "fire",
      confidence: 0.89,
      location: "North Ridge Trail, 2.3km from parking",
      timestamp: new Date(Date.now() - 300000),
      status: "verified",
      uploadedBy: "Hiker_John",
    },
    {
      id: "det-002",
      type: "smoke",
      confidence: 0.76,
      location: "Valley View Point",
      timestamp: new Date(Date.now() - 900000),
      status: "pending",
      uploadedBy: "Ranger_Sarah",
    },
  ])

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile || !location) return

    setIsUploading(true)

    // Simulate AI processing
    setTimeout(() => {
      const newDetection: Detection = {
        id: `det-${Date.now()}`,
        type: Math.random() > 0.5 ? "fire" : "smoke",
        confidence: 0.6 + Math.random() * 0.4,
        location: location,
        timestamp: new Date(),
        status: "pending",
        uploadedBy: "Current_User",
      }

      setRecentDetections([newDetection, ...recentDetections])
      setSelectedFile(null)
      setLocation("")
      setDescription("")
      setIsUploading(false)

      // Show success message
      alert("Upload successful! AI analysis complete. Emergency services have been notified.")
    }, 3000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-red-100 text-red-800 border-red-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "false_positive":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="bg-red-600 text-white sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Flame className="h-6 w-6" />
              <h1 className="text-lg font-semibold">WildFire Watch</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-red-800 text-white">
                <Bell className="h-3 w-3 mr-1" />3 Alerts
              </Badge>
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="text-white">
                  Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-4 text-center">
              <Camera className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <p className="text-sm font-medium">Take Photo</p>
              <p className="text-xs text-gray-600">Capture suspicious activity</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-4 text-center">
              <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-red-600" />
              <p className="text-sm font-medium">Emergency</p>
              <p className="text-xs text-gray-600">Call 911 directly</p>
            </CardContent>
          </Card>
        </div>

        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Upload className="h-5 w-5 mr-2" />
              Report Fire/Smoke
            </CardTitle>
            <CardDescription>
              Upload photos or videos of suspicious fire activity. Our AI will analyze them immediately.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                className="w-full"
                disabled={isUploading}
              >
                <Camera className="h-4 w-4 mr-2" />
                {selectedFile ? selectedFile.name : "Select Photo/Video"}
              </Button>
            </div>

            <div>
              <label className="text-sm font-medium">Location</label>
              <div className="flex space-x-2 mt-1">
                <Input
                  placeholder="Enter location or use GPS"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  disabled={isUploading}
                />
                <Button variant="outline" size="sm" disabled={isUploading}>
                  <MapPin className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Description (Optional)</label>
              <Textarea
                placeholder="Describe what you observed..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={isUploading}
                className="mt-1"
              />
            </div>

            <Button
              onClick={handleUpload}
              disabled={!selectedFile || !location || isUploading}
              className="w-full bg-red-600 hover:bg-red-700"
            >
              {isUploading ? (
                <>
                  <Clock className="h-4 w-4 mr-2 animate-spin" />
                  AI Analyzing...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload & Analyze
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Recent Detections */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Community Reports</CardTitle>
            <CardDescription>Latest fire/smoke detections from citizens and rangers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentDetections.map((detection) => (
                <div key={detection.id} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Badge variant={detection.type === "fire" ? "destructive" : "secondary"}>{detection.type}</Badge>
                      <Badge className={getStatusColor(detection.status)}>
                        {detection.status === "verified" && <CheckCircle className="h-3 w-3 mr-1" />}
                        {detection.status === "pending" && <Clock className="h-3 w-3 mr-1" />}
                        {detection.status.replace("_", " ")}
                      </Badge>
                    </div>
                    <span className="text-xs text-gray-500">{(detection.confidence * 100).toFixed(0)}% confidence</span>
                  </div>

                  <p className="text-sm font-medium mb-1">{detection.location}</p>
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>By: {detection.uploadedBy}</span>
                    <span>{detection.timestamp.toLocaleTimeString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contacts */}
        <Card>
          <CardHeader>
            <CardTitle className="text-red-600">Emergency Contacts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start text-red-600 border-red-200">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Emergency Services: 911
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                Forest Service: (555) 123-4567
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Smartphone className="h-4 w-4 mr-2" />
                Park Rangers: (555) 987-6543
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
