"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Camera, MapPin, Clock, Eye, Settings } from "lucide-react"

interface CameraData {
  id: string
  name: string
  location: string
  status: "active" | "alert" | "offline"
  lastUpdate: string
  image: string
}

interface ActiveCamerasModalProps {
  isOpen: boolean
  onClose: () => void
  cameras: CameraData[]
}

export function ActiveCamerasModal({ isOpen, onClose, cameras }: ActiveCamerasModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Camera className="h-5 w-5 text-green-600" />
            <span>Active Cameras ({cameras.length})</span>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cameras.map((camera) => (
            <Card key={camera.id} className="overflow-hidden">
              <div className="relative aspect-video">
                <img
                  src={camera.image || "/placeholder.svg"}
                  alt={camera.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Badge variant="default" className="bg-green-600">
                    ACTIVE
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold">{camera.name}</h3>
                <div className="flex items-center space-x-1 text-sm text-muted-foreground mb-2">
                  <MapPin className="h-3 w-3" />
                  <span>{camera.location}</span>
                </div>
                <div className="flex items-center space-x-1 text-sm text-muted-foreground mb-3">
                  <Clock className="h-3 w-3" />
                  <span>Updated {camera.lastUpdate}</span>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                  <Button size="sm" variant="outline">
                    <Settings className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
