"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sun, Wind, Droplets, Thermometer, Eye } from "lucide-react"

export function WeatherWidget() {
  const weatherData = {
    temperature: 32,
    humidity: 15,
    windSpeed: 25,
    windDirection: "NE",
    visibility: "Excellent",
    conditions: "Clear",
    fireRisk: "High",
    uvIndex: 8,
  }

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <Card className="w-64">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Sun className="h-5 w-5 text-yellow-500" />
            <span className="font-medium">Current Weather</span>
          </div>
          <Badge className={getRiskColor(weatherData.fireRisk)}>{weatherData.fireRisk} Risk</Badge>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center space-x-2">
            <Thermometer className="h-4 w-4 text-red-500" />
            <span>{weatherData.temperature}°C</span>
          </div>

          <div className="flex items-center space-x-2">
            <Droplets className="h-4 w-4 text-blue-500" />
            <span>{weatherData.humidity}%</span>
          </div>

          <div className="flex items-center space-x-2">
            <Wind className="h-4 w-4 text-gray-500" />
            <span>
              {weatherData.windSpeed} mph {weatherData.windDirection}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <Eye className="h-4 w-4 text-green-500" />
            <span>{weatherData.visibility}</span>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t">
          <div className="text-xs text-gray-600">Last updated: {new Date().toLocaleTimeString()}</div>
        </div>
      </CardContent>
    </Card>
  )
}
