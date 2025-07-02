"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Truck, Users, MapPin, Clock, Radio } from "lucide-react"

interface Resource {
  id: string
  name: string
  type: string
  status: "available" | "deployed" | "maintenance"
  location: string
  eta: string
}

interface ResourceDeploymentProps {
  resources: Resource[]
}

export function ResourceDeployment({ resources }: ResourceDeploymentProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800 border-green-200"
      case "deployed":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "maintenance":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getResourceIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "fire truck":
        return <Truck className="h-5 w-5 text-red-600" />
      case "air support":
        return <Radio className="h-5 w-5 text-blue-600" />
      case "medical":
        return <Users className="h-5 w-5 text-green-600" />
      case "law enforcement":
        return <Users className="h-5 w-5 text-blue-800" />
      default:
        return <Truck className="h-5 w-5 text-gray-600" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Resource Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Available Units</p>
                <p className="text-2xl font-bold text-green-600">
                  {resources.filter((r) => r.status === "available").length}
                </p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Deployed Units</p>
                <p className="text-2xl font-bold text-blue-600">
                  {resources.filter((r) => r.status === "deployed").length}
                </p>
              </div>
              <Truck className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">In Maintenance</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {resources.filter((r) => r.status === "maintenance").length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Resource List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {resources.map((resource) => (
          <Card key={resource.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  {getResourceIcon(resource.type)}
                  <span>{resource.name}</span>
                </CardTitle>
                <Badge className={getStatusColor(resource.status)}>{resource.status.toUpperCase()}</Badge>
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Type:</span>
                  <span className="text-sm font-medium">{resource.type}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Location:</span>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3 text-gray-400" />
                    <span className="text-sm font-medium">{resource.location}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">ETA:</span>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3 text-gray-400" />
                    <span className="text-sm font-medium">{resource.eta}</span>
                  </div>
                </div>

                <div className="flex space-x-2 pt-3 border-t">
                  {resource.status === "available" && (
                    <Button size="sm" className="flex-1">
                      Deploy
                    </Button>
                  )}
                  {resource.status === "deployed" && (
                    <Button size="sm" variant="outline" className="flex-1">
                      Recall
                    </Button>
                  )}
                  <Button size="sm" variant="outline">
                    <Radio className="h-3 w-3 mr-1" />
                    Contact
                  </Button>
                  <Button size="sm" variant="outline">
                    <MapPin className="h-3 w-3 mr-1" />
                    Track
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Deployment */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Deployment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <Button className="bg-red-600 hover:bg-red-700">Deploy Fire Units</Button>
            <Button className="bg-blue-600 hover:bg-blue-700">Deploy Police Units</Button>
            <Button className="bg-green-600 hover:bg-green-700">Deploy Medical Units</Button>
            <Button className="bg-purple-600 hover:bg-purple-700">Deploy All Available</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
