"use client"

export function HeatMap() {
  const heatMapData = Array.from({ length: 20 }, (_, i) =>
    Array.from({ length: 20 }, (_, j) => ({
      x: i,
      y: j,
      intensity: Math.random(),
    })),
  ).flat()

  const getHeatColor = (intensity: number) => {
    if (intensity > 0.8) return "#dc2626" // High risk - red
    if (intensity > 0.6) return "#ea580c" // Medium-high risk - orange
    if (intensity > 0.4) return "#facc15" // Medium risk - yellow
    if (intensity > 0.2) return "#65a30d" // Low-medium risk - lime
    return "#16a34a" // Low risk - green
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-20 gap-0 w-full h-96 border rounded-lg overflow-hidden">
        {heatMapData.map((cell, index) => (
          <div
            key={index}
            className="aspect-square transition-all duration-200 hover:scale-110 hover:z-10 relative"
            style={{
              backgroundColor: getHeatColor(cell.intensity),
              opacity: 0.7 + cell.intensity * 0.3,
            }}
            title={`Risk Level: ${(cell.intensity * 100).toFixed(1)}%`}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-gray-600">Fire Risk Level</span>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-500">Low</span>
          <div className="flex">
            {[0.1, 0.3, 0.5, 0.7, 0.9].map((intensity, index) => (
              <div key={index} className="w-4 h-4" style={{ backgroundColor: getHeatColor(intensity) }} />
            ))}
          </div>
          <span className="text-xs text-gray-500">High</span>
        </div>
      </div>

      {/* Overlay markers for cameras */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/3 w-3 h-3 bg-blue-600 rounded-full border-2 border-white"
          title="North Ridge Camera"
        />
        <div
          className="absolute top-1/2 left-1/2 w-3 h-3 bg-blue-600 rounded-full border-2 border-white"
          title="Valley View Camera"
        />
        <div
          className="absolute top-3/4 right-1/3 w-3 h-3 bg-blue-600 rounded-full border-2 border-white"
          title="Mountain Peak Camera"
        />
      </div>
    </div>
  )
}
