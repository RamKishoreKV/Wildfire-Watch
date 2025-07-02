"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Upload,
  Users,
  MapPin,
  Clock,
  CheckCircle,
  AlertTriangle,
  Eye,
  ThumbsUp,
  MessageSquare,
  Share2,
} from "lucide-react"
import Link from "next/link"

interface PublicReport {
  id: string
  title: string
  location: string
  description: string
  imageUrl: string
  timestamp: Date
  reporter: string
  status: "pending" | "verified" | "investigating" | "resolved"
  upvotes: number
  comments: number
  aiConfidence?: number
}

export default function PublicPortalPage() {
  const [reports, setReports] = useState<PublicReport[]>([
    {
      id: "pub-001",
      title: "Smoke spotted near hiking trail",
      location: "Mount Wilson Trail, Mile 3.2",
      description: "Noticed thick smoke rising from the valley while hiking. Appears to be getting larger.",
      imageUrl: "/placeholder.svg?height=200&width=300",
      timestamp: new Date(Date.now() - 1800000),
      reporter: "HikerMike92",
      status: "investigating",
      upvotes: 12,
      comments: 3,
      aiConfidence: 0.84,
    },
    {
      id: "pub-002",
      title: "Possible fire in residential area",
      location: "Oak Street, near elementary school",
      description: "Saw orange glow and smoke from my backyard. Fire department should check this out.",
      imageUrl: "/placeholder.svg?height=200&width=300",
      timestamp: new Date(Date.now() - 3600000),
      reporter: "ConcernedCitizen",
      status: "verified",
      upvotes: 28,
      comments: 7,
      aiConfidence: 0.92,
    },
  ])

  const [newReport, setNewReport] = useState({
    title: "",
    location: "",
    description: "",
    image: null as File | null,
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-red-100 text-red-800 border-red-200"
      case "investigating":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "pending":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "resolved":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <AlertTriangle className="h-3 w-3" />
      case "investigating":
        return <Eye className="h-3 w-3" />
      case "resolved":
        return <CheckCircle className="h-3 w-3" />
      default:
        return <Clock className="h-3 w-3" />
    }
  }

  const submitReport = () => {
    if (!newReport.title || !newReport.location || !newReport.description) return

    const report: PublicReport = {
      id: `pub-${Date.now()}`,
      title: newReport.title,
      location: newReport.location,
      description: newReport.description,
      imageUrl: "/placeholder.svg?height=200&width=300",
      timestamp: new Date(),
      reporter: "Anonymous",
      status: "pending",
      upvotes: 0,
      comments: 0,
      aiConfidence: 0.7 + Math.random() * 0.3,
    }

    setReports([report, ...reports])
    setNewReport({ title: "", location: "", description: "", image: null })
    alert("Report submitted! Our AI is analyzing your submission and will notify authorities if needed.")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Users className="h-6 w-6 text-blue-600" />
              <h1 className="text-xl font-semibold text-gray-900">Community Fire Watch</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/mobile">
                <Button variant="outline" size="sm">
                  Mobile App
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  Professional Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Submit Report */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="h-5 w-5 mr-2" />
                  Report Fire/Smoke
                </CardTitle>
                <CardDescription>Help protect your community by reporting suspicious fire activity</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    placeholder="Brief description of what you saw"
                    value={newReport.title}
                    onChange={(e) => setNewReport({ ...newReport, title: e.target.value })}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Location</label>
                  <Input
                    placeholder="Where did you see this?"
                    value={newReport.location}
                    onChange={(e) => setNewReport({ ...newReport, location: e.target.value })}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    placeholder="Provide details about what you observed..."
                    value={newReport.description}
                    onChange={(e) => setNewReport({ ...newReport, description: e.target.value })}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Photo/Video (Optional)</label>
                  <Input
                    type="file"
                    accept="image/*,video/*"
                    onChange={(e) => setNewReport({ ...newReport, image: e.target.files?.[0] || null })}
                  />
                </div>

                <Button
                  onClick={submitReport}
                  className="w-full bg-red-600 hover:bg-red-700"
                  disabled={!newReport.title || !newReport.location || !newReport.description}
                >
                  Submit Report
                </Button>

                <div className="text-xs text-gray-600 text-center">
                  Reports are analyzed by AI and verified by professionals
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Community Reports */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Community Reports</h2>
              <div className="flex items-center space-x-2">
                <Badge variant="outline">{reports.length} Active Reports</Badge>
                <Button variant="outline" size="sm">
                  Filter
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              {reports.map((report) => (
                <Card key={report.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">{report.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {report.location}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {report.timestamp.toLocaleString()}
                          </div>
                        </div>
                        <p className="text-gray-700 mb-4">{report.description}</p>
                      </div>

                      <div className="flex flex-col items-end space-y-2">
                        <Badge className={getStatusColor(report.status)}>
                          {getStatusIcon(report.status)}
                          <span className="ml-1 capitalize">{report.status}</span>
                        </Badge>
                        {report.aiConfidence && (
                          <Badge variant="outline">AI: {(report.aiConfidence * 100).toFixed(0)}%</Badge>
                        )}
                      </div>
                    </div>

                    {/* Image */}
                    <div className="mb-4">
                      <img
                        src={report.imageUrl || "/placeholder.svg"}
                        alt="Report evidence"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="sm">
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          {report.upvotes}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          {report.comments}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Share2 className="h-4 w-4 mr-1" />
                          Share
                        </Button>
                      </div>

                      <div className="text-sm text-gray-600">Reported by: {report.reporter}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
