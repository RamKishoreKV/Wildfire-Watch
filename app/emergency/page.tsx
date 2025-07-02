"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Phone, Users, MapPin, Clock, Radio, Siren } from "lucide-react"
import Link from "next/link"
import { EmergencyProtocol } from "@/components/emergency-protocol"
import { ResourceDeployment } from "@/components/resource-deployment"

interface EmergencyIncident {
  id: string
  type: "fire" | "evacuation" | "medical" | "equipment"
  severity: "low" | "medium" | "high" | "critical"
  location: string
  description: string
  timestamp: Date
  status: "active" | "responding" | "resolved"
  assignedUnits: string[]
  estimatedContainment?: string
}

export default function EmergencyPage() {
  const [activeIncidents, setActiveIncidents] = useState<EmergencyIncident[]>([
    {
      id: "INC-001",
      type: "fire",
      severity: "critical",
      location: "North Ridge Camera Area",
      description: "Large wildfire detected with 89% confidence. Fire spreading northeast due to high winds.",
      timestamp: new Date(Date.now() - 120000), // 2 minutes ago
      status: "responding",
      assignedUnits: ["Engine 12", "Engine 15", "Helicopter 3"],
      estimatedContainment: "4-6 hours",
    },
    {
      id: "INC-002",
      type: "evacuation",
      severity: "high",
      location: "Residential Area Sector B",
      description: "Mandatory evacuation order issued for 500 residents due to approaching fire.",
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      status: "active",
      assignedUnits: ["Police Unit 7", "Police Unit 12", "Emergency Bus 3"],
    },
  ])

  const [newIncident, setNewIncident] = useState({
    type: "fire",
    severity: "medium",
    location: "",
    description: "",
  })

  const emergencyContacts = [
    { name: "Fire Department", number: "911", type: "primary" },
    { name: "Police Department", number: "911", type: "primary" },
    { name: "Emergency Medical", number: "911", type: "primary" },
    { name: "Forest Service", number: "(555) 123-4567", type: "secondary" },
    { name: "Emergency Management", number: "(555) 987-6543", type: "secondary" },
    { name: "Red Cross", number: "(555) 456-7890", type: "support" },
  ]

  const availableResources = [
    { id: "ENG-12", name: "Engine 12", type: "Fire Truck", status: "available", location: "Station 12", eta: "8 min" },
    {
      id: "ENG-15",
      name: "Engine 15",
      type: "Fire Truck",
      status: "deployed",
      location: "North Ridge",
      eta: "On scene",
    },
    {
      id: "HEL-3",
      name: "Helicopter 3",
      type: "Air Support",
      status: "deployed",
      location: "North Ridge",
      eta: "On scene",
    },
    { id: "AMB-7", name: "Ambulance 7", type: "Medical", status: "available", location: "Station 7", eta: "12 min" },
    {
      id: "POL-7",
      name: "Police Unit 7",
      type: "Law Enforcement",
      status: "deployed",
      location: "Sector B",
      eta: "On scene",
    },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-red-100 text-red-800 border-red-200"
      case "responding":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "resolved":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const createIncident = () => {
    const incident: EmergencyIncident = {
      id: `INC-${String(activeIncidents.length + 1).padStart(3, "0")}`,
      type: newIncident.type as any,
      severity: newIncident.severity as any,
      location: newIncident.location,
      description: newIncident.description,
      timestamp: new Date(),
      status: "active",
      assignedUnits: [],
    }

    setActiveIncidents([incident, ...activeIncidents])
    setNewIncident({ type: "fire", severity: "medium", location: "", description: "" })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="text-white hover:bg-red-700">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <Siren className="h-6 w-6" />
                <h1 className="text-xl font-semibold">Emergency Response Center</h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Badge className="bg-red-800 text-white">
                {activeIncidents.filter((i) => i.status !== "resolved").length} Active Incidents
              </Badge>
              <Button variant="secondary" size="sm">
                <Phone className="h-4 w-4 mr-2" />
                Emergency Call
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="incidents" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="incidents">Active Incidents</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="protocols">Protocols</TabsTrigger>
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="incidents" className="space-y-6">
            {/* Create New Incident */}
            <Card>
              <CardHeader>
                <CardTitle>Create New Incident</CardTitle>
                <CardDescription>Report a new emergency incident</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Incident Type</label>
                    <select
                      className="w-full mt-1 p-2 border rounded-md"
                      value={newIncident.type}
                      onChange={(e) => setNewIncident({ ...newIncident, type: e.target.value })}
                    >
                      <option value="fire">Fire</option>
                      <option value="evacuation">Evacuation</option>
                      <option value="medical">Medical Emergency</option>
                      <option value="equipment">Equipment Failure</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Severity</label>
                    <select
                      className="w-full mt-1 p-2 border rounded-md"
                      value={newIncident.severity}
                      onChange={(e) => setNewIncident({ ...newIncident, severity: e.target.value })}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="critical">Critical</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Location</label>
                    <Input
                      placeholder="Enter incident location"
                      value={newIncident.location}
                      onChange={(e) => setNewIncident({ ...newIncident, location: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Description</label>
                    <Textarea
                      placeholder="Describe the incident"
                      value={newIncident.description}
                      onChange={(e) => setNewIncident({ ...newIncident, description: e.target.value })}
                    />
                  </div>
                </div>
                <Button
                  onClick={createIncident}
                  className="mt-4 bg-red-600 hover:bg-red-700"
                  disabled={!newIncident.location || !newIncident.description}
                >
                  Create Incident
                </Button>
              </CardContent>
            </Card>

            {/* Active Incidents List */}
            <div className="space-y-4">
              {activeIncidents.map((incident) => (
                <Card key={incident.id} className="border-l-4 border-l-red-500">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <CardTitle className="text-lg">{incident.id}</CardTitle>
                        <Badge className={getSeverityColor(incident.severity)}>{incident.severity.toUpperCase()}</Badge>
                        <Badge className={getStatusColor(incident.status)}>{incident.status.toUpperCase()}</Badge>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {incident.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      {incident.location}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{incident.description}</p>

                    {incident.assignedUnits.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-medium mb-2">Assigned Units:</h4>
                        <div className="flex flex-wrap gap-2">
                          {incident.assignedUnits.map((unit, index) => (
                            <Badge key={index} variant="outline">
                              {unit}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {incident.estimatedContainment && (
                      <div className="mb-4">
                        <span className="text-sm text-gray-600">Estimated Containment: </span>
                        <span className="font-medium">{incident.estimatedContainment}</span>
                      </div>
                    )}

                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Users className="h-4 w-4 mr-2" />
                        Assign Resources
                      </Button>
                      <Button size="sm" variant="outline">
                        <Radio className="h-4 w-4 mr-2" />
                        Communications
                      </Button>
                      <Button size="sm" variant="outline">
                        <MapPin className="h-4 w-4 mr-2" />
                        View on Map
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="resources">
            <ResourceDeployment resources={availableResources} />
          </TabsContent>

          <TabsContent value="protocols">
            <EmergencyProtocol />
          </TabsContent>

          <TabsContent value="contacts" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {emergencyContacts.map((contact, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {contact.name}
                      <Badge variant={contact.type === "primary" ? "default" : "secondary"}>{contact.type}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-mono">{contact.number}</span>
                      <Button size="sm">
                        <Phone className="h-4 w-4 mr-2" />
                        Call
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Incident Reports</CardTitle>
                <CardDescription>Generate and view incident reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button className="w-full">Generate Daily Report</Button>
                  <Button variant="outline" className="w-full">
                    Export Incident Data
                  </Button>
                  <Button variant="outline" className="w-full">
                    View Historical Reports
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
