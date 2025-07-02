"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Camera,
  Wifi,
  ZoomIn,
  ZoomOut,
  Move,
  Save,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"

export default function CameraSettingsPage({ params }: { params: { id: string } }) {
  const [brightness, setBrightness] = useState([50])
  const [contrast, setContrast] = useState([50])
  const [saturation, setSaturation] = useState([50])
  const [zoom, setZoom] = useState([100])
  const [nightVision, setNightVision] = useState(true)
  const [motionDetection, setMotionDetection] = useState(true)
  const [fireDetection, setFireDetection] = useState(true)
  const [recordingEnabled, setRecordingEnabled] = useState(true)
  const [resolution, setResolution] = useState("1080p")
  const [frameRate, setFrameRate] = useState("30")

  const cameraId = params.id
  const cameraName = `Camera ${cameraId.toUpperCase()}`

  const handleSaveSettings = () => {
    alert("Camera settings saved successfully!")
  }

  const handleRestartCamera = () => {
    if (confirm("Are you sure you want to restart this camera? It will be offline for about 30 seconds.")) {
      alert("Camera restart initiated. Please wait...")
    }
  }

  const handleFactoryReset = () => {
    if (confirm("Are you sure you want to reset this camera to factory defaults? This cannot be undone.")) {
      alert("Factory reset initiated. Camera will restart with default settings.")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-blue-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Link href="/dashboard">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg shadow-lg">
                <Camera className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {cameraName} Settings
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-green-100 text-green-800">
                <CheckCircle className="h-4 w-4 mr-1" />
                Online
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Live Preview */}
          <div className="lg:col-span-1">
            <Card className="bg-gradient-to-br from-gray-50 to-slate-100 border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Camera className="h-5 w-5 mr-2 text-blue-600" />
                  Live Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-black rounded-lg overflow-hidden relative">
                  <video className="w-full h-full object-cover" autoPlay muted loop playsInline>
                    <source
                      src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                      type="video/mp4"
                    />
                  </video>
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-red-600 text-white">
                      <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
                      LIVE
                    </Badge>
                  </div>
                </div>

                {/* PTZ Controls */}
                <div className="mt-4">
                  <h4 className="font-medium mb-3">PTZ Controls</h4>
                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" size="sm">
                      ↖
                    </Button>
                    <Button variant="outline" size="sm">
                      ↑
                    </Button>
                    <Button variant="outline" size="sm">
                      ↗
                    </Button>
                    <Button variant="outline" size="sm">
                      ←
                    </Button>
                    <Button variant="outline" size="sm">
                      <Move className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      →
                    </Button>
                    <Button variant="outline" size="sm">
                      ↙
                    </Button>
                    <Button variant="outline" size="sm">
                      ↓
                    </Button>
                    <Button variant="outline" size="sm">
                      ↘
                    </Button>
                  </div>
                  <div className="flex justify-center space-x-2 mt-3">
                    <Button variant="outline" size="sm">
                      <ZoomIn className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <ZoomOut className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Settings Tabs */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="image" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="image">Image</TabsTrigger>
                <TabsTrigger value="detection">Detection</TabsTrigger>
                <TabsTrigger value="network">Network</TabsTrigger>
                <TabsTrigger value="system">System</TabsTrigger>
              </TabsList>

              {/* Image Settings */}
              <TabsContent value="image">
                <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-900">Image Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label>Resolution</Label>
                        <Select value={resolution} onValueChange={setResolution}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="4k">4K (3840x2160)</SelectItem>
                            <SelectItem value="1080p">1080p (1920x1080)</SelectItem>
                            <SelectItem value="720p">720p (1280x720)</SelectItem>
                            <SelectItem value="480p">480p (854x480)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>Frame Rate</Label>
                        <Select value={frameRate} onValueChange={setFrameRate}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="60">60 FPS</SelectItem>
                            <SelectItem value="30">30 FPS</SelectItem>
                            <SelectItem value="15">15 FPS</SelectItem>
                            <SelectItem value="10">10 FPS</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label>Brightness: {brightness[0]}%</Label>
                      <Slider
                        value={brightness}
                        onValueChange={setBrightness}
                        max={100}
                        min={0}
                        step={1}
                        className="w-full mt-2"
                      />
                    </div>

                    <div>
                      <Label>Contrast: {contrast[0]}%</Label>
                      <Slider
                        value={contrast}
                        onValueChange={setContrast}
                        max={100}
                        min={0}
                        step={1}
                        className="w-full mt-2"
                      />
                    </div>

                    <div>
                      <Label>Saturation: {saturation[0]}%</Label>
                      <Slider
                        value={saturation}
                        onValueChange={setSaturation}
                        max={100}
                        min={0}
                        step={1}
                        className="w-full mt-2"
                      />
                    </div>

                    <div>
                      <Label>Zoom: {zoom[0]}%</Label>
                      <Slider
                        value={zoom}
                        onValueChange={setZoom}
                        max={500}
                        min={100}
                        step={10}
                        className="w-full mt-2"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Night Vision</Label>
                        <p className="text-sm text-gray-600">Automatic infrared mode</p>
                      </div>
                      <Switch checked={nightVision} onCheckedChange={setNightVision} />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Detection Settings */}
              <TabsContent value="detection">
                <Card className="bg-gradient-to-br from-red-50 to-orange-100 border-red-200">
                  <CardHeader>
                    <CardTitle className="text-red-900">AI Detection Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Fire Detection</Label>
                        <p className="text-sm text-gray-600">AI-powered fire detection</p>
                      </div>
                      <Switch checked={fireDetection} onCheckedChange={setFireDetection} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Motion Detection</Label>
                        <p className="text-sm text-gray-600">General motion detection</p>
                      </div>
                      <Switch checked={motionDetection} onCheckedChange={setMotionDetection} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Recording</Label>
                        <p className="text-sm text-gray-600">Continuous recording</p>
                      </div>
                      <Switch checked={recordingEnabled} onCheckedChange={setRecordingEnabled} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="sensitivity">Detection Sensitivity</Label>
                        <Input id="sensitivity" placeholder="75%" />
                      </div>
                      <div>
                        <Label htmlFor="confidence">Confidence Threshold</Label>
                        <Input id="confidence" placeholder="80%" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Network Settings */}
              <TabsContent value="network">
                <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-900">Network Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="ip">IP Address</Label>
                        <Input id="ip" placeholder="192.168.1.100" />
                      </div>
                      <div>
                        <Label htmlFor="port">Port</Label>
                        <Input id="port" placeholder="554" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="username">Username</Label>
                        <Input id="username" placeholder="admin" />
                      </div>
                      <div>
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" placeholder="••••••••" />
                      </div>
                    </div>

                    <div>
                      <Label>Connection Status</Label>
                      <div className="flex items-center space-x-2 mt-2">
                        <Wifi className="h-5 w-5 text-green-600" />
                        <span className="text-green-600 font-medium">Connected</span>
                        <Badge className="bg-green-100 text-green-800">Signal: Excellent</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* System Settings */}
              <TabsContent value="system">
                <Card className="bg-gradient-to-br from-purple-50 to-pink-100 border-purple-200">
                  <CardHeader>
                    <CardTitle className="text-purple-900">System Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Camera Model</Label>
                        <p className="text-sm font-medium">WildFire Pro 4K</p>
                      </div>
                      <div>
                        <Label>Firmware Version</Label>
                        <p className="text-sm font-medium">v2.1.3</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Uptime</Label>
                        <p className="text-sm font-medium">15 days, 4 hours</p>
                      </div>
                      <div>
                        <Label>Temperature</Label>
                        <p className="text-sm font-medium">42°C (Normal)</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Button onClick={handleRestartCamera} variant="outline" className="w-full justify-start">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Restart Camera
                      </Button>

                      <Button
                        onClick={handleFactoryReset}
                        variant="outline"
                        className="w-full justify-start text-red-600 border-red-300 hover:bg-red-50"
                      >
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Factory Reset
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Save Button */}
            <div className="flex justify-end mt-6">
              <Button
                onClick={handleSaveSettings}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                <Save className="h-4 w-4 mr-2" />
                Save All Settings
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
