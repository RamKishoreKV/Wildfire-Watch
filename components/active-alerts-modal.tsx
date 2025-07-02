"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, MapPin, Clock, Thermometer, Zap, Phone } from "lucide-react"

interface CameraData {
  id: string
  name: string
  location: string
  status: "active" | "alert" | "offline"
  lastUpdate: string
  confidence?: number
  temperature?: number
  image: string
}

interface ActiveAlertsModalProps {
  isOpen: boolean
  onClose: () => void
  cameras: CameraData[]
}

export function ActiveAlertsModal({ isOpen, onClose, cameras }: ActiveAlertsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <span>Active Fire Alerts ({cameras.length})</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {cameras.map((camera) => (
            <Card key={camera.id} className="border-red-200 bg-red-50/50">
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <div className="relative w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={camera.image || "/placeholder.svg"}
                      alt={camera.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-red-500/20" />
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg">{camera.name}</h3>
                      <Badge variant="destructive" className="animate-pulse">
                        🔥 FIRE DETECTED
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span>{camera.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>Detected {camera.lastUpdate}</span>
                      </div>
                      {camera.confidence && (
                        <div className="flex items-center space-x-1">
                          <Zap className="h-3 w-3 text-red-600" />
                          <span>
                            Confidence: <strong>{camera.confidence}%</strong>
                          </span>
                        </div>
                      )}
                      {camera.temperature && (
                        <div className="flex items-center space-x-1">
                          <Thermometer className="h-3 w-3 text-orange-600" />
                          <span>
                            Temp: <strong>{camera.temperature}°F</strong>
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2">
                    <Button variant="destructive" size="sm">
                      <Phone className="h-3 w-3 mr-1" />
                      Alert Fire Dept
                    </Button>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
