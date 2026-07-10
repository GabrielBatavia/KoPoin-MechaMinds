import React from "react"

export interface CampaignProgressCardProps {
  campaignName: string
  currentPoints: number
  targetPoints: number
  progressPercent: number
  rewardName: string
  dayCurrent: number
  dayTotal: number
  status: string
}

export function CampaignProgressCard({
  campaignName,
  currentPoints,
  targetPoints,
  progressPercent,
  rewardName,
  dayCurrent,
  dayTotal,
  status,
}: CampaignProgressCardProps) {
  const clampedProgress = Math.min(progressPercent, 100)

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-50 pb-4 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-teal-50 px-2 py-0.5 text-xs font-semibold text-teal-700 capitalize">
              {status === "active" ? "Aktif" : status}
            </span>
            <span className="text-xs text-gray-500 font-medium">
              Hari {dayCurrent} dari {dayTotal}
            </span>
          </div>
          <h2 className="text-lg font-bold text-gray-900 mt-1">{campaignName}</h2>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-xs text-gray-400 font-medium">Target Reward Bersama</p>
          <p className="text-sm font-bold text-amber-600 mt-0.5">{rewardName}</p>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between text-sm font-semibold mb-2">
          <span className="text-gray-600">Progres Pengumpulan Kopoin</span>
          <span className="text-teal-600 font-bold">{progressPercent.toFixed(1)}%</span>
        </div>

        <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden relative">
          <div
            className="h-full bg-linear-to-r from-teal-500 to-emerald-400 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${clampedProgress}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 mt-2 font-medium">
          <span>{currentPoints.toLocaleString("id-ID")} Kopoin terkumpul</span>
          <span>Target: {targetPoints.toLocaleString("id-ID")} Kopoin</span>
        </div>
      </div>
    </div>
  )
}
