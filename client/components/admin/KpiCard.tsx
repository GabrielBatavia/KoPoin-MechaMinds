import React from "react"

export interface KpiCardProps {
  label: string
  value: string | number
  helper?: string
  trend?: string
  trendType?: "positive" | "negative" | "neutral"
  icon?: React.ReactNode
}

export function KpiCard({
  label,
  value,
  helper,
  trend,
  trendType = "positive",
  icon,
}: KpiCardProps) {
  const isPositive = trendType === "positive"
  const isNegative = trendType === "negative"

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-xs transition-all duration-200 hover:shadow-md">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
          {label}
        </p>
        {icon && <div className="text-teal-600 bg-teal-50/50 p-2 rounded-lg">{icon}</div>}
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <h3 className="text-2xl font-bold tracking-tight text-gray-900">{value}</h3>
        {trend && (
          <span
            className={`text-xs font-semibold px-1.5 py-0.5 rounded-sm ${
              isPositive
                ? "bg-emerald-50 text-emerald-700"
                : isNegative
                ? "bg-rose-50 text-rose-700"
                : "bg-gray-50 text-gray-600"
            }`}
          >
            {trend}
          </span>
        )}
      </div>
      {helper && <p className="text-xs text-gray-500 mt-1.5 font-medium">{helper}</p>}
    </div>
  )
}
