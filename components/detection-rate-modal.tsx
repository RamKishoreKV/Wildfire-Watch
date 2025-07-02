"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Activity, TrendingUp, Target, Zap } from "lucide-react"

interface DetectionRateModalProps {
  isOpen: boolean
  onClose: () => void
}

export function DetectionRateModal({ isOpen, onClose }: DetectionRateModalProps) {
  const metrics = [
    { label: "Overall Accuracy", value: 94.2, color: "text-green-600" },
    { label: "Fire Detection", value: 96.8, color: "text-red-600" },
    { label: "Smoke Detection", value: 91.5, color: "text-orange-600" },
    { label: "False Positive Rate", value: 2.1, color: "text-blue-600", inverse: true },
  ]

  const recentDetections = [
    { time: "2 min ago", location: "North Ridge", confidence: 94.2, type: "Fire" },
    { time: "5 min ago", location: "Pine Forest", confidence: 87.5, type: "Fire" },
    { time: "12 min ago", location: "Desert Edge", confidence: 91.8, type: "Fire" },
    { time: "18 min ago", location: "Valley View", confidence: 89.3, type: "Smoke" },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-blue-600" />
            <span>Detection Performance Analytics</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {metrics.map((metric) => (
              <Card key={metric.label}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">{metric.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <div className={`text-2xl font-bold ${metric.color}`}>{metric.value}%</div>
                    <Badge variant={metric.value > 90 ? "default" : "secondary"}>
                      {metric.value > 90 ? "Excellent" : "Good"}
                    </Badge>
                  </div>
                  <Progress value={metric.inverse ? 100 - metric.value : metric.value} className="mt-2" />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Detections */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-4 w-4" />
                <span>Recent Detections</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentDetections.map((detection, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-3 h-3 rounded-full ${detection.type === "Fire" ? "bg-red-500" : "bg-orange-500"}`}
                      />
                      <div>
                        <div className="font-medium">{detection.location}</div>
                        <div className="text-sm text-muted-foreground">{detection.time}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1">
                        <Zap className="h-3 w-3" />
                        <span className="font-semibold">{detection.confidence}%</span>
                      </div>
                      <Badge variant={detection.type === "Fire" ? "destructive" : "secondary"}>{detection.type}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Performance Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4" />
                <span>Performance Trends</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-600">+1.2%</div>
                  <div className="text-sm text-muted-foreground">vs Last Week</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">847</div>
                  <div className="text-sm text-muted-foreground">Total Detections</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">99.1%</div>
                  <div className="text-sm text-muted-foreground">Uptime</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
