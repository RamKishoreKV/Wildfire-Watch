"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Camera, Flame, Thermometer, Users, Zap, MapPin } from "lucide-react"

interface MapLocation {
  id: string
  name: string
  type: "camera" | "fire" | "sensor" | "evacuation" | "resource"
  lat: number
  lng: number
  status: "active" | "alert" | "offline" | "warning"
  data?: any
}

interface InteractiveMapProps {
  locations: MapLocation[]
  onLocationSelect: (location: MapLocation) => void
  selectedLocation: MapLocation | null
}

export function InteractiveMap({ locations, onLocationSelect, selectedLocation }: InteractiveMapProps) {
  const [mapCenter] = useState({ lat: 34.0522, lng: -118.2437 })
  const [zoomLevel, setZoomLevel] = useState(12)

  const getLocationIcon = (type: string, status: string) => {
    const iconClass = `h-6 w-6 ${status === "alert" ? "text-red-600" : status === "active" ? "text-green-600" : "text-gray-400"}`

    switch (type) {
      case "camera":
        return <Camera className={iconClass} />
      case "fire":
        return <Flame className="h-6 w-6 text-red-600" />
      case "sensor":
        return <Thermometer className={iconClass} />
      case "evacuation":
        return <Users className={iconClass} />
      case "resource":
        return <Zap className={iconClass} />
      default:
        return <MapPin className={iconClass} />
    }
  }

  const getMarkerPosition = (lat: number, lng: number) => {
    // Convert lat/lng to pixel coordinates (simplified)
    const x = ((lng - (mapCenter.lng - 0.05)) / 0.1) * 100
    const y = ((mapCenter.lat + 0.05 - lat) / 0.1) * 100
    return { x: `${Math.max(0, Math.min(100, x))}%`, y: `${Math.max(0, Math.min(100, y))}%` }
  }

  return (
    <div className="relative w-full h-full bg-gray-100 rounded-lg overflow-hidden">
      {/* Map Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-green-200">
        {/* Terrain features */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-green-300 rounded-full opacity-50" />
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-green-400 rounded-full opacity-40" />
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-brown-300 rounded-full opacity-60" />

        {/* Roads */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-400 opacity-60" />
        <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-gray-400 opacity-60" />
      </div>

      {/* Location Markers */}
      {locations.map((location) => {
        const position = getMarkerPosition(location.lat, location.lng)
        const isSelected = selectedLocation?.id === location.id

        return (
          <div
            key={location.id}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 ${
              isSelected ? "scale-125 z-20" : "hover:scale-110 z-10"
            }`}
            style={{ left: position.x, top: position.y }}
            onClick={() => onLocationSelect(location)}
          >
            <div
              className={`p-2 rounded-full shadow-lg ${
                isSelected ? "bg-blue-600 text-white" : "bg-white"
              } ${location.status === "alert" ? "ring-4 ring-red-500 ring-opacity-50 animate-pulse" : ""}`}
            >
              {getLocationIcon(location.type, location.status)}
            </div>

            {/* Label */}
            <div
              className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-1 px-2 py-1 rounded text-xs whitespace-nowrap ${
                isSelected ? "bg-blue-600 text-white" : "bg-white shadow"
              }`}
            >
              {location.name}
            </div>
          </div>
        )
      })}

      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        <Button
          size="sm"
          variant="outline"
          className="bg-white"
          onClick={() => setZoomLevel(Math.min(18, zoomLevel + 1))}
        >
          +
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="bg-white"
          onClick={() => setZoomLevel(Math.max(8, zoomLevel - 1))}
        >
          -
        </Button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-lg">
        <h4 className="font-medium text-sm mb-2">Legend</h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center space-x-2">
            <Camera className="h-4 w-4 text-green-600" />
            <span>Active Camera</span>
          </div>
          <div className="flex items-center space-x-2">
            <Flame className="h-4 w-4 text-red-600" />
            <span>Fire Detection</span>
          </div>
          <div className="flex items-center space-x-2">
            <Thermometer className="h-4 w-4 text-blue-600" />
            <span>Weather Sensor</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-purple-600" />
            <span>Evacuation Route</span>
          </div>
        </div>
      </div>

      {/* Scale */}
      <div className="absolute bottom-4 right-4 bg-white p-2 rounded text-xs">Zoom: {zoomLevel}</div>
    </div>
  )
}
