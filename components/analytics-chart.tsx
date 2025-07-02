"use client"

interface ChartData {
  [key: string]: any
}

interface AnalyticsChartProps {
  data: ChartData[]
  type: "line" | "bar" | "pie"
}

export function AnalyticsChart({ data, type }: AnalyticsChartProps) {
  if (type === "pie") {
    const total = data.reduce((sum, item) => sum + item.value, 0)

    return (
      <div className="flex items-center justify-center h-64">
        <div className="relative w-48 h-48">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {data.map((item, index) => {
              const percentage = (item.value / total) * 100
              const strokeDasharray = `${percentage} ${100 - percentage}`
              const strokeDashoffset = data.slice(0, index).reduce((sum, prev) => sum + (prev.value / total) * 100, 0)

              return (
                <circle
                  key={index}
                  cx="50"
                  cy="50"
                  r="15.915"
                  fill="transparent"
                  stroke={item.color}
                  strokeWidth="8"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={-strokeDashoffset}
                  className="transition-all duration-300"
                />
              )
            })}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold">{total}</div>
              <div className="text-sm text-gray-600">Total</div>
            </div>
          </div>
        </div>
        <div className="ml-8 space-y-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-sm">
                {item.name}: {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (type === "bar") {
    const maxValue = Math.max(...data.map((item) => item.detections || item.value || 0))

    return (
      <div className="h-64 flex items-end justify-between space-x-1 p-4">
        {data.map((item, index) => {
          const height = ((item.detections || item.value || 0) / maxValue) * 200
          return (
            <div key={index} className="flex flex-col items-center">
              <div
                className="bg-blue-500 rounded-t transition-all duration-300 hover:bg-blue-600"
                style={{ height: `${height}px`, width: "20px" }}
              />
              <span className="text-xs mt-2 text-center">
                {item.hour !== undefined ? `${item.hour}:00` : item.name}
              </span>
            </div>
          )
        })}
      </div>
    )
  }

  // Line chart
  return (
    <div className="h-64 p-4">
      <svg className="w-full h-full" viewBox="0 0 400 200">
        {/* Grid lines */}
        {[0, 1, 2, 3, 4].map((i) => (
          <line key={i} x1="0" y1={i * 40} x2="400" y2={i * 40} stroke="#e5e7eb" strokeWidth="1" />
        ))}

        {/* Data lines */}
        <polyline
          fill="none"
          stroke="#ef4444"
          strokeWidth="2"
          points={data
            .map((item, index) => `${(index / (data.length - 1)) * 400},${200 - (item.fires / 30) * 200}`)
            .join(" ")}
        />
        <polyline
          fill="none"
          stroke="#f97316"
          strokeWidth="2"
          points={data
            .map((item, index) => `${(index / (data.length - 1)) * 400},${200 - (item.smoke / 30) * 200}`)
            .join(" ")}
        />

        {/* Data points */}
        {data.map((item, index) => (
          <g key={index}>
            <circle cx={(index / (data.length - 1)) * 400} cy={200 - (item.fires / 30) * 200} r="3" fill="#ef4444" />
            <circle cx={(index / (data.length - 1)) * 400} cy={200 - (item.smoke / 30) * 200} r="3" fill="#f97316" />
          </g>
        ))}
      </svg>

      <div className="flex justify-center space-x-6 mt-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full" />
          <span className="text-sm">Fire Detections</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-orange-500 rounded-full" />
          <span className="text-sm">Smoke Detections</span>
        </div>
      </div>
    </div>
  )
}
