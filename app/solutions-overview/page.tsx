"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DrillIcon as Drone,
  Camera,
  Smartphone,
  Map,
  Cpu,
  Phone,
  Monitor,
  Users,
  Satellite,
  Thermometer,
  CheckCircle,
  Clock,
  AlertTriangle,
} from "lucide-react"
import Link from "next/link"

interface Solution {
  id: number
  title: string
  description: string
  icon: React.ReactNode
  status: "implemented" | "in_progress" | "planned"
  features: string[]
  route?: string
}

export default function SolutionsOverviewPage() {
  const solutions: Solution[] = [
    {
      id: 1,
      title: "Drone-based Wildfire Patrol",
      description: "Autonomous drones with thermal cameras for proactive fire detection",
      icon: <Drone className="h-6 w-6" />,
      status: "planned",
      features: ["Thermal imaging", "GPS tracking", "Autonomous flight paths", "Real-time streaming"],
    },
    {
      id: 2,
      title: "Fixed Camera Surveillance Network",
      description: "Network of strategically placed cameras with AI detection",
      icon: <Camera className="h-6 w-6" />,
      status: "implemented",
      features: ["YOLOv8 AI detection", "24/7 monitoring", "Multi-camera management", "Alert system"],
      route: "/dashboard",
    },
    {
      id: 3,
      title: "Mobile App for Real-time Alerts",
      description: "Citizen reporting and ranger alert system",
      icon: <Smartphone className="h-6 w-6" />,
      status: "implemented",
      features: ["Photo/video upload", "GPS location", "Push notifications", "Community reports"],
      route: "/mobile",
    },
    {
      id: 4,
      title: "Heatmap Aggregator Over Time",
      description: "Historical fire risk analysis and prediction",
      icon: <Map className="h-6 w-6" />,
      status: "implemented",
      features: ["Risk visualization", "Historical data", "Predictive analytics", "Geographic insights"],
      route: "/analytics",
    },
    {
      id: 5,
      title: "Edge Device Offline Deployments",
      description: "Offline AI processing for remote locations",
      icon: <Cpu className="h-6 w-6" />,
      status: "in_progress",
      features: ["Offline processing", "Edge computing", "Low latency", "Remote deployment"],
    },
    {
      id: 6,
      title: "Emergency Dispatch Integration",
      description: "Direct integration with emergency services",
      icon: <Phone className="h-6 w-6" />,
      status: "implemented",
      features: ["911 integration", "Automated alerts", "Response tracking", "Emergency protocols"],
      route: "/emergency",
    },
    {
      id: 7,
      title: "Desktop Dashboard Monitoring",
      description: "Professional monitoring interface for control centers",
      icon: <Monitor className="h-6 w-6" />,
      status: "implemented",
      features: ["Real-time feeds", "Multi-screen support", "Analytics dashboard", "Incident management"],
      route: "/dashboard",
    },
    {
      id: 8,
      title: "Public Upload Portal",
      description: "Community-driven fire reporting platform",
      icon: <Users className="h-6 w-6" />,
      status: "implemented",
      features: ["Public submissions", "Community verification", "Social features", "Crowdsourced data"],
      route: "/public-portal",
    },
    {
      id: 9,
      title: "Satellite + Ground Data Fusion",
      description: "Multi-source data integration for comprehensive monitoring",
      icon: <Satellite className="h-6 w-6" />,
      status: "planned",
      features: ["Satellite imagery", "Ground sensors", "Data fusion", "Large-scale monitoring"],
    },
    {
      id: 10,
      title: "Multi-modal Thermal + Visual Detection",
      description: "Advanced AI using multiple sensor types",
      icon: <Thermometer className="h-6 w-6" />,
      status: "in_progress",
      features: ["Thermal cameras", "Visual spectrum", "Multi-modal AI", "Enhanced accuracy"],
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "implemented":
        return "bg-green-100 text-green-800 border-green-200"
      case "in_progress":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "planned":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "implemented":
        return <CheckCircle className="h-4 w-4" />
      case "in_progress":
        return <Clock className="h-4 w-4" />
      case "planned":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const implementedCount = solutions.filter((s) => s.status === "implemented").length
  const inProgressCount = solutions.filter((s) => s.status === "in_progress").length
  const plannedCount = solutions.filter((s) => s.status === "planned").length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-600 p-2 rounded-lg">
                <Monitor className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">10 Wildfire Detection Solutions</h1>
            </div>
            <Link href="/dashboard">
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                Main Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Implemented</p>
                  <p className="text-2xl font-bold text-green-600">{implementedCount}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">In Progress</p>
                  <p className="text-2xl font-bold text-yellow-600">{inProgressCount}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Planned</p>
                  <p className="text-2xl font-bold text-blue-600">{plannedCount}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((solution) => (
            <Card key={solution.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-100 rounded-lg">{solution.icon}</div>
                    <div>
                      <CardTitle className="text-lg">{solution.title}</CardTitle>
                    </div>
                  </div>
                  <Badge className={getStatusColor(solution.status)}>
                    {getStatusIcon(solution.status)}
                    <span className="ml-1 capitalize">{solution.status.replace("_", " ")}</span>
                  </Badge>
                </div>
                <CardDescription>{solution.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm mb-2">Key Features:</h4>
                    <ul className="space-y-1">
                      {solution.features.map((feature, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-center">
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {solution.route && solution.status === "implemented" && (
                    <Link href={solution.route}>
                      <Button className="w-full" size="sm">
                        View Implementation
                      </Button>
                    </Link>
                  )}

                  {solution.status === "in_progress" && (
                    <Button variant="outline" className="w-full" size="sm" disabled>
                      In Development
                    </Button>
                  )}

                  {solution.status === "planned" && (
                    <Button variant="outline" className="w-full" size="sm" disabled>
                      Coming Soon
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Implementation Roadmap */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Implementation Roadmap</CardTitle>
            <CardDescription>Our phased approach to building a comprehensive wildfire detection system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-green-600 mb-2">✅ Phase 1: Core System (Completed)</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Essential monitoring and alert capabilities for immediate deployment
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Fixed Camera Network</Badge>
                  <Badge variant="outline">Mobile App</Badge>
                  <Badge variant="outline">Dashboard Monitoring</Badge>
                  <Badge variant="outline">Emergency Integration</Badge>
                  <Badge variant="outline">Public Portal</Badge>
                  <Badge variant="outline">Analytics & Heatmaps</Badge>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-yellow-600 mb-2">🔄 Phase 2: Advanced Features (In Progress)</h3>
                <p className="text-sm text-gray-600 mb-2">Enhanced AI capabilities and edge computing deployment</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Edge Device Deployment</Badge>
                  <Badge variant="outline">Multi-modal Detection</Badge>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-blue-600 mb-2">📋 Phase 3: Future Expansion (Planned)</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Large-scale deployment with drone and satellite integration
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Drone Patrol System</Badge>
                  <Badge variant="outline">Satellite Data Fusion</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
