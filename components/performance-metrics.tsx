"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface PerformanceMetricsProps {
  accuracyData: Array<{
    camera: string
    accuracy: number
    detections: number
  }>
}

export function PerformanceMetrics({ accuracyData }: PerformanceMetricsProps) {
  const overallAccuracy = accuracyData.reduce((sum, camera) => sum + camera.accuracy, 0) / accuracyData.length
  const totalDetections = accuracyData.reduce((sum, camera) => sum + camera.detections, 0)

  return (
    <div className="space-y-6">
      {/* Overall Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Overall System Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{overallAccuracy.toFixed(1)}%</div>
              <div className="text-sm text-gray-600">Average Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{totalDetections.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Detections</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">2.3s</div>
              <div className="text-sm text-gray-600">Avg Response Time</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Individual Camera Performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {accuracyData.map((camera, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{camera.camera}</CardTitle>
                <Badge variant={camera.accuracy > 95 ? "default" : camera.accuracy > 90 ? "secondary" : "destructive"}>
                  {camera.accuracy}%
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Accuracy Rate</span>
                    <span>{camera.accuracy}%</span>
                  </div>
                  <Progress value={camera.accuracy} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Detections</span>
                    <div className="font-medium">{camera.detections}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Uptime</span>
                    <div className="font-medium text-green-600">99.2%</div>
                  </div>
                  <div>
                    <span className="text-gray-600">False Positives</span>
                    <div className="font-medium">{Math.floor((camera.detections * (100 - camera.accuracy)) / 100)}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Response Time</span>
                    <div className="font-medium">{(2 + Math.random()).toFixed(1)}s</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Performance Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Trends (Last 30 Days)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span>Detection Accuracy</span>
              <div className="flex items-center space-x-2">
                <span className="text-green-600 font-medium">↗ +2.1%</span>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  Improving
                </Badge>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <span>Response Time</span>
              <div className="flex items-center space-x-2">
                <span className="text-blue-600 font-medium">↘ -0.5s</span>
                <Badge variant="outline" className="text-blue-600 border-blue-600">
                  Faster
                </Badge>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <span>False Positive Rate</span>
              <div className="flex items-center space-x-2">
                <span className="text-orange-600 font-medium">↘ -1.3%</span>
                <Badge variant="outline" className="text-orange-600 border-orange-600">
                  Reducing
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
