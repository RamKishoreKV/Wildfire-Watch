"use client"

interface Detection {
  id: string
  type: "fire" | "smoke"
  confidence: number
  bbox: {
    x: number
    y: number
    width: number
    height: number
  }
  timestamp: Date
}

interface DetectionOverlayProps {
  detections: Detection[]
}

export function DetectionOverlay({ detections }: DetectionOverlayProps) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {detections.map((detection) => (
        <div
          key={detection.id}
          className={`absolute border-2 ${
            detection.type === "fire" ? "border-red-500 bg-red-500/20" : "border-yellow-500 bg-yellow-500/20"
          } rounded`}
          style={{
            left: `${detection.bbox.x * 100}%`,
            top: `${detection.bbox.y * 100}%`,
            width: `${detection.bbox.width * 100}%`,
            height: `${detection.bbox.height * 100}%`,
          }}
        >
          <div
            className={`absolute -top-8 left-0 px-2 py-1 rounded text-xs font-medium text-white ${
              detection.type === "fire" ? "bg-red-600" : "bg-yellow-600"
            }`}
          >
            {detection.type} {(detection.confidence * 100).toFixed(0)}%
          </div>
        </div>
      ))}
    </div>
  )
}
