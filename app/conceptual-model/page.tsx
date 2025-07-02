"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Shield, Monitor, Cpu, Camera, AlertTriangle, MapPin, Bell, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function ConceptualModelPage() {
  const actors = [
    {
      name: "Citizens / Hikers",
      icon: <Users className="h-6 w-6" />,
      description: "Upload suspicious fire-related media through mobile app",
      actions: [
        "Upload photo/video from app",
        "Report location and description",
        "Receive community alerts",
        "View nearby incidents",
      ],
      color: "bg-blue-100 text-blue-800",
    },
    {
      name: "Forest Rangers / Firefighters",
      icon: <Shield className="h-6 w-6" />,
      description: "Receive mobile alerts for active detections and coordinate response",
      actions: [
        "Receive alert and location info",
        "Verify incident reports",
        "Coordinate emergency response",
        "Update incident status",
      ],
      color: "bg-green-100 text-green-800",
    },
    {
      name: "Emergency Control Center Officers",
      icon: <Monitor className="h-6 w-6" />,
      description: "Monitor real-time camera streams and detections via dashboard",
      actions: [
        "View detection streams",
        "Analyze risk zones",
        "Manage camera network",
        "Coordinate multi-agency response",
      ],
      color: "bg-purple-100 text-purple-800",
    },
    {
      name: "AI System",
      icon: <Cpu className="h-6 w-6" />,
      description: "Processes media streams and outputs detections with confidence scores",
      actions: [
        "Analyze input media",
        "Output detection and confidence",
        "Trigger automated alerts",
        "Learn from verified incidents",
      ],
      color: "bg-orange-100 text-orange-800",
    },
  ]

  const objects = [
    {
      name: "Media Inputs",
      description: "Images, videos, live camera feeds",
      icon: <Camera className="h-5 w-5" />,
      examples: ["Citizen photos", "Security cameras", "Drone footage", "Thermal imagery"],
    },
    {
      name: "Detection Results",
      description: "Bounding boxes, confidence values, timestamps",
      icon: <AlertTriangle className="h-5 w-5" />,
      examples: ["Fire detection: 89%", "Smoke detection: 76%", "Location coordinates", "Time stamps"],
    },
    {
      name: "Alerts",
      description: "Push notifications, emails, dashboard alerts",
      icon: <Bell className="h-5 w-5" />,
      examples: ["Mobile push notifications", "Email alerts", "Dashboard warnings", "Emergency broadcasts"],
    },
    {
      name: "Geospatial Data",
      description: "Location data for heatmaps and analysis",
      icon: <MapPin className="h-5 w-5" />,
      examples: ["GPS coordinates", "Risk heatmaps", "Coverage areas", "Evacuation routes"],
    },
  ]

  const systemFlow = [
    {
      step: 1,
      actor: "Citizens/Cameras",
      action: "Upload data or stream footage",
      description: "Citizens upload photos/videos or field cameras stream live footage",
    },
    {
      step: 2,
      actor: "AI System",
      action: "Detect and analyze",
      description: "YOLOv8-based AI detects smoke or fire, assigns confidence score",
    },
    {
      step: 3,
      actor: "System",
      action: "Trigger alerts",
      description: "High-confidence detections automatically trigger notifications",
    },
    {
      step: 4,
      actor: "Rangers",
      action: "Receive alerts",
      description: "Rangers see alerts in mobile app with location and details",
    },
    {
      step: 5,
      actor: "Officers",
      action: "Monitor and coordinate",
      description: "Officers monitor live feeds and heatmaps from dashboard",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">Conceptual Model</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/solutions-overview">
                <Button variant="outline" size="sm">
                  View Solutions
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                  Main Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* System Actors */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">System Actors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {actors.map((actor, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${actor.color}`}>{actor.icon}</div>
                    <span>{actor.name}</span>
                  </CardTitle>
                  <CardDescription>{actor.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <h4 className="font-medium mb-3">Key Actions:</h4>
                  <ul className="space-y-2">
                    {actor.actions.map((action, actionIndex) => (
                      <li key={actionIndex} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                        {action}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Main Objects */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Main System Objects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {objects.map((object, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-lg">
                    {object.icon}
                    <span>{object.name}</span>
                  </CardTitle>
                  <CardDescription>{object.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    {object.examples.map((example, exampleIndex) => (
                      <Badge key={exampleIndex} variant="outline" className="text-xs">
                        {example}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* High-Level System Flow */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">High-Level System Flow</h2>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                {systemFlow.map((flow, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-semibold">
                        {flow.step}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <Badge variant="outline">{flow.actor}</Badge>
                        <span className="font-medium">{flow.action}</span>
                      </div>
                      <p className="text-gray-600 text-sm">{flow.description}</p>
                    </div>
                    {index < systemFlow.length - 1 && <ArrowRight className="h-5 w-5 text-gray-400 mt-1" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Actor-Action Matrix */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Actor-Action Matrix</h2>
          <Card>
            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Actor</th>
                      <th className="text-left py-3 px-4 font-medium">Primary Action</th>
                      <th className="text-left py-3 px-4 font-medium">System Response</th>
                      <th className="text-left py-3 px-4 font-medium">Implementation Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 px-4">Citizen</td>
                      <td className="py-3 px-4">Upload photo/video from app</td>
                      <td className="py-3 px-4">AI analysis → Alert generation</td>
                      <td className="py-3 px-4">
                        <Badge className="bg-green-100 text-green-800">✅ Implemented</Badge>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">Ranger</td>
                      <td className="py-3 px-4">Receive alert and location info</td>
                      <td className="py-3 px-4">Mobile notification → Response coordination</td>
                      <td className="py-3 px-4">
                        <Badge className="bg-green-100 text-green-800">✅ Implemented</Badge>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">Officer</td>
                      <td className="py-3 px-4">View detection streams, analyze risk zones</td>
                      <td className="py-3 px-4">Dashboard updates → Incident management</td>
                      <td className="py-3 px-4">
                        <Badge className="bg-green-100 text-green-800">✅ Implemented</Badge>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">AI System</td>
                      <td className="py-3 px-4">Analyze input, output detection and confidence</td>
                      <td className="py-3 px-4">Trigger alerts → Update confidence models</td>
                      <td className="py-3 px-4">
                        <Badge className="bg-green-100 text-green-800">✅ Implemented</Badge>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
