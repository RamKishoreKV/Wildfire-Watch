"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Clock, Phone } from "lucide-react"

export function EmergencyProtocol() {
  const protocols = [
    {
      id: "fire-detection",
      title: "Fire Detection Protocol",
      severity: "critical",
      steps: [
        "Verify detection with secondary camera",
        "Assess fire size and spread direction",
        "Alert fire department immediately",
        "Notify emergency management",
        "Initiate evacuation if necessary",
        "Deploy fire suppression resources",
        "Monitor fire progression",
        "Update incident status regularly",
      ],
      timeLimit: "5 minutes",
      contacts: ["Fire Department: 911", "Emergency Management: (555) 123-4567"],
    },
    {
      id: "evacuation",
      title: "Evacuation Protocol",
      severity: "high",
      steps: [
        "Determine evacuation zones",
        "Alert residents via emergency broadcast",
        "Deploy law enforcement to evacuation routes",
        "Set up evacuation centers",
        "Coordinate transportation",
        "Account for all residents",
        "Provide regular updates",
        "Maintain security in evacuated areas",
      ],
      timeLimit: "15 minutes",
      contacts: ["Police: 911", "Red Cross: (555) 456-7890"],
    },
    {
      id: "equipment-failure",
      title: "Equipment Failure Protocol",
      severity: "medium",
      steps: [
        "Identify failed equipment",
        "Switch to backup systems",
        "Notify technical support",
        "Assess impact on monitoring",
        "Deploy mobile units if needed",
        "Schedule repair/replacement",
        "Update system status",
        "Document incident",
      ],
      timeLimit: "30 minutes",
      contacts: ["Tech Support: (555) 789-0123"],
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
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      {protocols.map((protocol) => (
        <Card key={protocol.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5" />
                <span>{protocol.title}</span>
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Badge className={getSeverityColor(protocol.severity)}>{protocol.severity.toUpperCase()}</Badge>
                <Badge variant="outline" className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{protocol.timeLimit}</span>
                </Badge>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              {/* Steps */}
              <div>
                <h4 className="font-medium mb-3">Protocol Steps:</h4>
                <div className="space-y-2">
                  {protocol.steps.map((step, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-xs font-medium">
                        {index + 1}
                      </div>
                      <span className="text-sm">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Emergency Contacts */}
              <div>
                <h4 className="font-medium mb-3">Emergency Contacts:</h4>
                <div className="space-y-2">
                  {protocol.contacts.map((contact, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm">{contact}</span>
                      <Button size="sm" variant="outline">
                        <Phone className="h-3 w-3 mr-1" />
                        Call
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex space-x-2 pt-4 border-t">
                <Button size="sm" className="bg-red-600 hover:bg-red-700">
                  Activate Protocol
                </Button>
                <Button size="sm" variant="outline">
                  View Checklist
                </Button>
                <Button size="sm" variant="outline">
                  Print Protocol
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
