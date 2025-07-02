"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, MapPin, Camera, Flame, Wind, Thermometer, Droplets, Eye, Zap, Users } from "lucide-react"
import Link from "next/link"
import { InteractiveMap } from "@/components/interactive-map"
import { WeatherWidget } from "@/components/weather-widget"

interface MapLocation {
  id: string
  name: string
  type: "camera" | "fire" | "sensor" | "evacuation" | "resource"
  lat: number
  lng: number
  status: "active" | "alert" | "offline" | "warning"
  data?: any
}

export default function MapPage() {
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null)
  const [mapLayer, setMapLayer] = useState("all")

  const locations: MapLocation[] = [
    {
      id: "cam-001",
      name: "North Ridge Camera",
      type: "camera",
      lat: 34.0522,
      lng: -118.2437,
      status: "alert",
      data: { lastDetection: "Fire - 89% confidence", coverage: "2.5km radius" },
    },
    {
      id: "cam-002",
      name: "Valley View Camera",
      type: "camera",
      lat: 34.0622,
      lng: -118.2537,
      status: "active",
      data: { coverage: "3.0km radius", nightVision: true },
    },
    {
      id: "fire-001",
      name: "Active Fire Zone",
      type: "fire",
      lat: 34.0522,
      lng: -118.24,
      status: "alert",
      data: { size: "15 acres", spread: "Northeast", severity: "High" },
    },
    {
      id: "sensor-001",
      name: "Weather Station Alpha",
      type: "sensor",
      lat: 34.0422,
      lng: -118.2337,
      status: "active",
      data: { temp: "32°C", humidity: "15%", windSpeed: "25 mph" },
    },
    {
      id: "evac-001",
      name: "Evacuation Route 1",
      type: "evacuation",
      lat: 34.0322,
      lng: -118.2237,
      status: "active",
      data: { capacity: "5000 people", status: "Clear" },
    },
    {
      id: "resource-001",
      name: "Fire Station 12",
      type: "resource",
      lat: 34.0722,
      lng: -118.2637,
      status: "active",
      data: { units: "3 trucks", personnel: "12 firefighters", eta: "8 minutes" },
    },
  ]

  const getLocationIcon = (type: string) => {
    switch (type) {
      case "camera":
        return <Camera className="h-4 w-4" />
      case "fire":
        return <Flame className="h-4 w-4" />
      case "sensor":
        return <Thermometer className="h-4 w-4" />
      case "evacuation":
        return <Users className="h-4 w-4" />
      case "resource":
        return <Zap className="h-4 w-4" />
      default:
        return <MapPin className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "alert":
        return "bg-red-100 text-red-800 border-red-200"
      case "active":
        return "bg-green-100 text-green-800 border-green-200"
      case "offline":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "warning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const filteredLocations = mapLayer === "all" ? locations : locations.filter((loc) => loc.type === mapLayer)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <h1 className="text-xl font-semibold text-gray-900">Interactive Map</h1>
            </div>

            <div className="flex items-center space-x-4">
              <WeatherWidget />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Map */}
          <div className="lg:col-span-3">
            <Card className="h-[600px]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Real-time Monitoring Map</CardTitle>
                  <Tabs value={mapLayer} onValueChange={setMapLayer}>
                    <TabsList>
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="camera">Cameras</TabsTrigger>
                      <TabsTrigger value="fire">Fires</TabsTrigger>
                      <TabsTrigger value="sensor">Sensors</TabsTrigger>
                      <TabsTrigger value="evacuation">Routes</TabsTrigger>
                      <TabsTrigger value="resource">Resources</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </CardHeader>
              <CardContent className="h-full p-0">
                <InteractiveMap
                  locations={filteredLocations}
                  onLocationSelect={setSelectedLocation}
                  selectedLocation={selectedLocation}
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Location Details */}
            {selectedLocation && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    {getLocationIcon(selectedLocation.type)}
                    <span className="ml-2">{selectedLocation.name}</span>
                  </CardTitle>
                  <Badge className={getStatusColor(selectedLocation.status)}>{selectedLocation.status}</Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Type:</span>
                      <span className="text-sm font-medium capitalize">{selectedLocation.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Coordinates:</span>
                      <span className="text-sm font-medium">
                        {selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)}
                      </span>
                    </div>
                    {selectedLocation.data &&
                      Object.entries(selectedLocation.data).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-sm text-gray-600 capitalize">{key.replace(/([A-Z])/g, " $1")}:</span>
                          <span className="text-sm font-medium">{value}</span>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Active Alerts */}
            <Card>
              <CardHeader>
                <CardTitle>Active Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="destructive">High Priority</Badge>
                      <span className="text-xs text-gray-500">2 min ago</span>
                    </div>
                    <p className="text-sm">Fire detected at North Ridge Camera</p>
                    <p className="text-xs text-gray-600">Confidence: 89% | Size: 15 acres</p>
                  </div>

                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className="bg-yellow-100 text-yellow-800">Medium Priority</Badge>
                      <span className="text-xs text-gray-500">15 min ago</span>
                    </div>
                    <p className="text-sm">High wind conditions detected</p>
                    <p className="text-xs text-gray-600">Wind speed: 25 mph | Direction: NE</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Environmental Conditions */}
            <Card>
              <CardHeader>
                <CardTitle>Environmental Conditions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Thermometer className="h-4 w-4 text-red-500 mr-2" />
                      <span className="text-sm">Temperature</span>
                    </div>
                    <span className="text-sm font-medium text-red-600">32°C</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Droplets className="h-4 w-4 text-blue-500 mr-2" />
                      <span className="text-sm">Humidity</span>
                    </div>
                    <span className="text-sm font-medium text-orange-600">15%</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Wind className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-sm">Wind Speed</span>
                    </div>
                    <span className="text-sm font-medium text-orange-600">25 mph</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">Visibility</span>
                    </div>
                    <span className="text-sm font-medium text-green-600">Excellent</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Flame className="h-4 w-4 mr-2" />
                    Report Fire
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    Evacuation Plan
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Zap className="h-4 w-4 mr-2" />
                    Deploy Resources
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Camera className="h-4 w-4 mr-2" />
                    Camera Control
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
