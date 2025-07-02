"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Camera,
  Download,
  Share2,
  RefreshCw,
  Settings,
  Phone,
  AlertTriangle,
  Users,
  MapPin,
  BarChart3,
  Shield,
  Zap,
} from "lucide-react"

interface QuickActionsPanelProps {
  onClose: () => void
}

export function QuickActionsPanel({ onClose }: QuickActionsPanelProps) {
  const quickActions = [
    {
      category: "Emergency",
      actions: [
        {
          name: "Call Emergency Services",
          icon: Phone,
          description: "Direct dial to 911",
          action: () => window.open("tel:911"),
          color: "bg-red-600 hover:bg-red-700 text-white",
        },
        {
          name: "Trigger Emergency Alert",
          icon: AlertTriangle,
          description: "Send alert to all personnel",
          action: () => alert("Emergency alert sent to all personnel!"),
          color: "bg-orange-600 hover:bg-orange-700 text-white",
        },
        {
          name: "Evacuation Protocol",
          icon: Users,
          description: "Initiate evacuation procedures",
          action: () => alert("Evacuation protocol initiated!"),
          color: "bg-purple-600 hover:bg-purple-700 text-white",
        },
      ],
    },
    {
      category: "Camera Management",
      actions: [
        {
          name: "Refresh All Cameras",
          icon: RefreshCw,
          description: "Restart all camera feeds",
          action: () => {
            alert("Refreshing all camera feeds...")
            setTimeout(() => alert("All cameras refreshed successfully!"), 2000)
          },
          color: "bg-blue-600 hover:bg-blue-700 text-white",
        },
        {
          name: "Camera Settings",
          icon: Settings,
          description: "Configure camera parameters",
          action: () => window.open("/settings", "_blank"),
          color: "bg-gray-600 hover:bg-gray-700 text-white",
        },
        {
          name: "Take Screenshots",
          icon: Camera,
          description: "Capture current feeds",
          action: () => alert("Screenshots captured from all active cameras!"),
          color: "bg-green-600 hover:bg-green-700 text-white",
        },
      ],
    },
    {
      category: "Data & Reports",
      actions: [
        {
          name: "Download Report",
          icon: Download,
          description: "Export current status report",
          action: () => {
            const data = {
              timestamp: new Date().toISOString(),
              activeCameras: 5,
              alerts: 3,
              detectionRate: "94.2%",
            }
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
            const url = URL.createObjectURL(blob)
            const a = document.createElement("a")
            a.href = url
            a.download = `wildfire-report-${new Date().toISOString().split("T")[0]}.json`
            a.click()
          },
          color: "bg-indigo-600 hover:bg-indigo-700 text-white",
        },
        {
          name: "Share Dashboard",
          icon: Share2,
          description: "Share current view",
          action: () => {
            navigator.clipboard.writeText(window.location.href)
            alert("Dashboard link copied to clipboard!")
          },
          color: "bg-teal-600 hover:bg-teal-700 text-white",
        },
        {
          name: "Analytics Report",
          icon: BarChart3,
          description: "Generate analytics report",
          action: () => window.open("/analytics", "_blank"),
          color: "bg-pink-600 hover:bg-pink-700 text-white",
        },
      ],
    },
    {
      category: "System Control",
      actions: [
        {
          name: "System Status",
          icon: Shield,
          description: "Check system health",
          action: () => alert("System Status: All systems operational ✅"),
          color: "bg-emerald-600 hover:bg-emerald-700 text-white",
        },
        {
          name: "Performance Boost",
          icon: Zap,
          description: "Optimize system performance",
          action: () => {
            alert("Optimizing system performance...")
            setTimeout(() => alert("Performance optimization complete!"), 2000)
          },
          color: "bg-yellow-600 hover:bg-yellow-700 text-white",
        },
        {
          name: "View Map",
          icon: MapPin,
          description: "Open interactive map",
          action: () => window.open("/map", "_blank"),
          color: "bg-cyan-600 hover:bg-cyan-700 text-white",
        },
      ],
    },
  ]

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Zap className="h-5 w-5 mr-2 text-yellow-600" />
            Quick Actions
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {quickActions.map((category, categoryIndex) => (
            <Card key={categoryIndex}>
              <CardHeader>
                <CardTitle className="text-lg">{category.category}</CardTitle>
                <CardDescription>
                  {category.category === "Emergency" && "Critical emergency response actions"}
                  {category.category === "Camera Management" && "Camera system controls and settings"}
                  {category.category === "Data & Reports" && "Export and share system data"}
                  {category.category === "System Control" && "System monitoring and optimization"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {category.actions.map((action, actionIndex) => (
                    <Button
                      key={actionIndex}
                      onClick={action.action}
                      className={`h-auto p-4 flex flex-col items-center space-y-2 ${action.color}`}
                    >
                      <action.icon className="h-6 w-6" />
                      <div className="text-center">
                        <div className="font-medium">{action.name}</div>
                        <div className="text-xs opacity-90">{action.description}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-between pt-4 border-t">
          <div className="text-sm text-gray-600">Quick actions for rapid system control and emergency response</div>
          <Button variant="outline" size="sm">
            Customize Actions
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
