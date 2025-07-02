"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { User, Palette, Bell, Globe, Save, Sparkles } from "lucide-react"

interface UserPreferencesProps {
  isOpen: boolean
  onClose: () => void
}

export function UserPreferences({ isOpen, onClose }: UserPreferencesProps) {
  const [theme, setTheme] = useState("system")
  const [accentColor, setAccentColor] = useState("blue")
  const [dashboardLayout, setDashboardLayout] = useState("grid")
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    desktop: true,
  })
  const [alertSensitivity, setAlertSensitivity] = useState([75])
  const [autoRefresh, setAutoRefresh] = useState([30])
  const [language, setLanguage] = useState("en")
  const [timezone, setTimezone] = useState("UTC-8")
  const [userName, setUserName] = useState("Fire Chief Johnson")
  const [department, setDepartment] = useState("Los Angeles Fire Department")
  const [aiAssistant, setAiAssistant] = useState({
    enabled: true,
    voice: true,
    proactive: true,
    suggestions: true,
  })

  const themes = [
    { value: "light", label: "Light", preview: "bg-white border-gray-200" },
    { value: "dark", label: "Dark", preview: "bg-gray-900 border-gray-700" },
    { value: "system", label: "System", preview: "bg-gradient-to-r from-white to-gray-900" },
  ]

  const accentColors = [
    { value: "blue", label: "Ocean Blue", color: "bg-blue-500" },
    { value: "red", label: "Fire Red", color: "bg-red-500" },
    { value: "green", label: "Forest Green", color: "bg-green-500" },
    { value: "purple", label: "Royal Purple", color: "bg-purple-500" },
    { value: "orange", label: "Sunset Orange", color: "bg-orange-500" },
    { value: "teal", label: "Ocean Teal", color: "bg-teal-500" },
  ]

  const savePreferences = () => {
    const preferences = {
      theme,
      accentColor,
      dashboardLayout,
      notifications,
      alertSensitivity: alertSensitivity[0],
      autoRefresh: autoRefresh[0],
      language,
      timezone,
      userName,
      department,
      aiAssistant,
    }

    localStorage.setItem("wildfire-preferences", JSON.stringify(preferences))
    alert("Preferences saved successfully! 🎉")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl">
            <User className="h-6 w-6 mr-2 text-blue-600" />
            User Preferences & Personalization
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Profile Settings */}
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-900">
                <User className="h-5 w-5 mr-2" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="user-name">Full Name</Label>
                  <Input
                    id="user-name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="border-blue-200"
                  />
                </div>
                <div>
                  <Label htmlFor="department">Department/Organization</Label>
                  <Input
                    id="department"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="border-blue-200"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Appearance Settings */}
          <Card className="border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center text-purple-900">
                <Palette className="h-5 w-5 mr-2" />
                Appearance & Theme
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-medium mb-3 block">Theme Preference</Label>
                <div className="grid grid-cols-3 gap-3">
                  {themes.map((themeOption) => (
                    <div
                      key={themeOption.value}
                      className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        theme === themeOption.value ? "border-purple-500 bg-purple-50" : "border-gray-200"
                      }`}
                      onClick={() => setTheme(themeOption.value)}
                    >
                      <div className={`w-full h-8 rounded mb-2 ${themeOption.preview}`} />
                      <p className="text-sm font-medium text-center">{themeOption.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-base font-medium mb-3 block">Accent Color</Label>
                <div className="grid grid-cols-6 gap-3">
                  {accentColors.map((color) => (
                    <div
                      key={color.value}
                      className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        accentColor === color.value ? "border-purple-500 bg-purple-50" : "border-gray-200"
                      }`}
                      onClick={() => setAccentColor(color.value)}
                    >
                      <div className={`w-full h-8 rounded mb-2 ${color.color}`} />
                      <p className="text-xs text-center">{color.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="dashboard-layout">Dashboard Layout</Label>
                <Select value={dashboardLayout} onValueChange={setDashboardLayout}>
                  <SelectTrigger className="border-purple-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="grid">Grid View</SelectItem>
                    <SelectItem value="list">List View</SelectItem>
                    <SelectItem value="compact">Compact View</SelectItem>
                    <SelectItem value="detailed">Detailed View</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center text-green-900">
                <Bell className="h-5 w-5 mr-2" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-gray-600">Receive alerts via email</p>
                  </div>
                  <Switch
                    checked={notifications.email}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-gray-600">Browser push notifications</p>
                  </div>
                  <Switch
                    checked={notifications.push}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>SMS Alerts</Label>
                    <p className="text-sm text-gray-600">Text message alerts</p>
                  </div>
                  <Switch
                    checked={notifications.sms}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Desktop Notifications</Label>
                    <p className="text-sm text-gray-600">System notifications</p>
                  </div>
                  <Switch
                    checked={notifications.desktop}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, desktop: checked })}
                  />
                </div>
              </div>

              <div>
                <Label>Alert Sensitivity: {alertSensitivity[0]}%</Label>
                <Slider
                  value={alertSensitivity}
                  onValueChange={setAlertSensitivity}
                  max={100}
                  min={10}
                  step={5}
                  className="w-full mt-2"
                />
                <p className="text-sm text-gray-600 mt-1">Higher values = fewer false positives</p>
              </div>
            </CardContent>
          </Card>

          {/* AI Assistant Settings */}
          <Card className="border-indigo-200">
            <CardHeader>
              <CardTitle className="flex items-center text-indigo-900">
                <Sparkles className="h-5 w-5 mr-2" />
                AI Assistant (ARIA) Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable AI Assistant</Label>
                    <p className="text-sm text-gray-600">Turn on ARIA assistant</p>
                  </div>
                  <Switch
                    checked={aiAssistant.enabled}
                    onCheckedChange={(checked) => setAiAssistant({ ...aiAssistant, enabled: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Voice Responses</Label>
                    <p className="text-sm text-gray-600">Speak responses aloud</p>
                  </div>
                  <Switch
                    checked={aiAssistant.voice}
                    onCheckedChange={(checked) => setAiAssistant({ ...aiAssistant, voice: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Proactive Alerts</Label>
                    <p className="text-sm text-gray-600">AI suggests actions</p>
                  </div>
                  <Switch
                    checked={aiAssistant.proactive}
                    onCheckedChange={(checked) => setAiAssistant({ ...aiAssistant, proactive: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Smart Suggestions</Label>
                    <p className="text-sm text-gray-600">Show helpful tips</p>
                  </div>
                  <Switch
                    checked={aiAssistant.suggestions}
                    onCheckedChange={(checked) => setAiAssistant({ ...aiAssistant, suggestions: checked })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Settings */}
          <Card className="border-orange-200">
            <CardHeader>
              <CardTitle className="flex items-center text-orange-900">
                <Globe className="h-5 w-5 mr-2" />
                System & Regional Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="language">Language</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="border-orange-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={timezone} onValueChange={setTimezone}>
                    <SelectTrigger className="border-orange-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC-8">Pacific Time (UTC-8)</SelectItem>
                      <SelectItem value="UTC-7">Mountain Time (UTC-7)</SelectItem>
                      <SelectItem value="UTC-6">Central Time (UTC-6)</SelectItem>
                      <SelectItem value="UTC-5">Eastern Time (UTC-5)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Auto-refresh: {autoRefresh[0]}s</Label>
                  <Slider
                    value={autoRefresh}
                    onValueChange={setAutoRefresh}
                    max={120}
                    min={5}
                    step={5}
                    className="w-full mt-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preview */}
          <Card className="border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
            <CardHeader>
              <CardTitle>Preview Your Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <Badge variant="outline">Theme: {theme}</Badge>
                </div>
                <div>
                  <Badge variant="outline" className={accentColors.find((c) => c.value === accentColor)?.color}>
                    {accentColors.find((c) => c.value === accentColor)?.label}
                  </Badge>
                </div>
                <div>
                  <Badge variant="outline">Layout: {dashboardLayout}</Badge>
                </div>
                <div>
                  <Badge variant="outline">AI: {aiAssistant.enabled ? "Enabled" : "Disabled"}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-between pt-6 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={savePreferences}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Preferences
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
