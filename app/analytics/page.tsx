"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Activity,
  Target,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  PieChart,
  LineChart,
} from "lucide-react"
import Link from "next/link"
import { AnalyticsChart } from "@/components/analytics-chart"
import { HeatMap } from "@/components/heat-map"
import { PerformanceMetrics } from "@/components/performance-metrics"

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("7d")

  const stats = {
    totalDetections: 1247,
    accuracyRate: 94.2,
    falsePositives: 73,
    responseTime: 2.3,
    camerasOnline: 5,
    totalCameras: 6,
    riskLevel: "Medium",
    trendsUp: 12,
    trendsDown: 3,
  }

  const detectionTrends = [
    { date: "2024-01-20", fires: 12, smoke: 8, falsePositives: 2 },
    { date: "2024-01-21", fires: 15, smoke: 11, falsePositives: 1 },
    { date: "2024-01-22", fires: 8, smoke: 6, falsePositives: 3 },
    { date: "2024-01-23", fires: 22, smoke: 18, falsePositives: 4 },
    { date: "2024-01-24", fires: 19, smoke: 14, falsePositives: 2 },
    { date: "2024-01-25", fires: 25, smoke: 20, falsePositives: 5 },
    { date: "2024-01-26", fires: 18, smoke: 13, falsePositives: 1 },
  ]

  const accuracyData = [
    { camera: "North Ridge", accuracy: 96.5, detections: 234 },
    { camera: "Valley View", accuracy: 92.1, detections: 189 },
    { camera: "Mountain Peak", accuracy: 94.8, detections: 156 },
    { camera: "Forest Edge", accuracy: 89.3, detections: 98 },
    { camera: "River Bend", accuracy: 97.2, detections: 267 },
    { camera: "Hilltop", accuracy: 93.7, detections: 203 },
  ]

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
              <h1 className="text-xl font-semibold text-gray-900">Analytics Dashboard</h1>
            </div>

            <div className="flex items-center space-x-4">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24h">Last 24h</SelectItem>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Detections</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalDetections.toLocaleString()}</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600">+{stats.trendsUp}% vs last period</span>
                  </div>
                </div>
                <Activity className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Accuracy Rate</p>
                  <p className="text-2xl font-bold text-green-600">{stats.accuracyRate}%</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600">+2.1% improvement</span>
                  </div>
                </div>
                <Target className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">False Positives</p>
                  <p className="text-2xl font-bold text-orange-600">{stats.falsePositives}</p>
                  <div className="flex items-center mt-1">
                    <TrendingDown className="h-4 w-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600">-{stats.trendsDown}% reduction</span>
                  </div>
                </div>
                <AlertTriangle className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Response Time</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.responseTime}s</p>
                  <div className="flex items-center mt-1">
                    <TrendingDown className="h-4 w-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600">-0.5s faster</span>
                  </div>
                </div>
                <BarChart3 className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Analytics */}
        <Tabs defaultValue="trends" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="trends">Detection Trends</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="heatmap">Heat Map</TabsTrigger>
            <TabsTrigger value="cameras">Camera Analysis</TabsTrigger>
            <TabsTrigger value="predictions">Predictions</TabsTrigger>
          </TabsList>

          <TabsContent value="trends" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <LineChart className="h-5 w-5 mr-2" />
                    Detection Trends Over Time
                  </CardTitle>
                  <CardDescription>Fire and smoke detections by day</CardDescription>
                </CardHeader>
                <CardContent>
                  <AnalyticsChart data={detectionTrends} type="line" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChart className="h-5 w-5 mr-2" />
                    Detection Types Distribution
                  </CardTitle>
                  <CardDescription>Breakdown of detection categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <AnalyticsChart
                    data={[
                      { name: "Fire", value: 687, color: "#ef4444" },
                      { name: "Smoke", value: 487, color: "#f97316" },
                      { name: "False Positive", value: 73, color: "#6b7280" },
                    ]}
                    type="pie"
                  />
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Hourly Detection Patterns</CardTitle>
                <CardDescription>Peak detection times throughout the day</CardDescription>
              </CardHeader>
              <CardContent>
                <AnalyticsChart
                  data={Array.from({ length: 24 }, (_, i) => ({
                    hour: i,
                    detections: Math.floor(Math.random() * 50) + 10,
                  }))}
                  type="bar"
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance">
            <PerformanceMetrics accuracyData={accuracyData} />
          </TabsContent>

          <TabsContent value="heatmap">
            <Card>
              <CardHeader>
                <CardTitle>Fire Risk Heat Map</CardTitle>
                <CardDescription>Geographic distribution of fire detections and risk levels</CardDescription>
              </CardHeader>
              <CardContent>
                <HeatMap />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cameras" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {accuracyData.map((camera, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {camera.camera}
                      <Badge
                        variant={camera.accuracy > 95 ? "default" : camera.accuracy > 90 ? "secondary" : "destructive"}
                      >
                        {camera.accuracy}% accuracy
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Total Detections</span>
                        <span className="font-medium">{camera.detections}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Status</span>
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-600 mr-1" />
                          <span className="text-sm text-green-600">Online</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Last Maintenance</span>
                        <span className="text-sm">2 days ago</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="predictions">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>24-Hour Fire Risk Forecast</CardTitle>
                  <CardDescription>Predicted fire risk levels for the next 24 hours</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Array.from({ length: 8 }, (_, i) => {
                      const hour = new Date()
                      hour.setHours(hour.getHours() + i * 3)
                      const risk = ["Low", "Medium", "High"][Math.floor(Math.random() * 3)]
                      const riskColor =
                        risk === "High" ? "text-red-600" : risk === "Medium" ? "text-orange-600" : "text-green-600"

                      return (
                        <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium">
                            {hour.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </span>
                          <Badge className={`${riskColor} bg-transparent border-current`}>{risk} Risk</Badge>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Weather Impact Analysis</CardTitle>
                  <CardDescription>How weather conditions affect detection accuracy</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span>Wind Speed Impact</span>
                      <span className="text-orange-600 font-medium">+15% false positives</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span>Humidity Level</span>
                      <span className="text-green-600 font-medium">Optimal conditions</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span>Temperature</span>
                      <span className="text-red-600 font-medium">High fire risk</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span>Visibility</span>
                      <span className="text-green-600 font-medium">Excellent</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
