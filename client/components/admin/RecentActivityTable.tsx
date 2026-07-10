import React from "react"
import { RecentActivity } from "@/data/kopoinAdminApi"
import { Activity, QrCode, ClipboardCheck } from "lucide-react"

export interface RecentActivityTableProps {
  activities: RecentActivity[]
  compact?: boolean
  headerAction?: React.ReactNode
}

export function RecentActivityTable({ activities, compact = false, headerAction }: RecentActivityTableProps) {
  const displayedActivities = compact ? activities.slice(0, 3) : activities

  return (
    <div className="rounded-xl border border-gray-100 bg-white shadow-xs overflow-hidden">
      <div className="border-b border-gray-50 bg-gray-50/50 px-5 py-3 flex items-center justify-between gap-4">
        <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
          <Activity className="h-4 w-4 text-teal-600 animate-pulse" />
          Aktivitas Terbaru
        </h3>
        {headerAction ? (
          headerAction
        ) : (
          compact && (
            <span className="text-xs text-gray-400 font-medium">Umpan Waktu Nyata</span>
          )
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 text-xs font-semibold uppercase tracking-wider text-gray-400 bg-gray-50/20">
              <th className="px-5 py-3">Waktu</th>
              <th className="px-5 py-3">Anggota</th>
              <th className="px-5 py-3">Tim</th>
              <th className="px-5 py-3">Misi</th>
              <th className="px-5 py-3 text-right">Poin</th>
              <th className="px-5 py-3 text-center">Verifikasi</th>
              <th className="px-5 py-3 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-sm">
            {displayedActivities.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-5 py-8 text-center text-gray-400 font-medium">
                  Belum ada aktivitas terbaru masuk.
                </td>
              </tr>
            ) : (
              displayedActivities.map((act) => {
                const isGabriel = act.user_name === "Gabriel"

                return (
                  <tr
                    key={act.activity_id}
                    className={`transition-colors duration-150 hover:bg-gray-50/40 ${
                      isGabriel ? "bg-teal-50/30 font-medium border-l-4 border-l-teal-500" : ""
                    }`}
                  >
                    <td className="px-5 py-3.5 text-xs text-gray-400 font-mono whitespace-nowrap">
                      {act.timestamp}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-900 font-bold">{act.user_name}</span>
                        {isGabriel && (
                          <span className="inline-flex items-center rounded-sm bg-emerald-100 px-1.5 py-0.2 text-[10px] font-bold text-emerald-800 uppercase">
                            Baru
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-gray-500 whitespace-nowrap">
                      {act.team_name}
                    </td>
                    <td className="px-5 py-3.5 text-gray-700 whitespace-nowrap max-w-[150px] truncate" title={act.mission_name}>
                      {act.mission_name}
                    </td>
                    <td className="px-5 py-3.5 text-right font-semibold text-emerald-600">
                      +{act.points_awarded} pts
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      <div className="inline-flex items-center justify-center gap-1 text-xs text-gray-500 font-medium">
                        {act.verification_type === "QR" ? (
                          <>
                            <QrCode className="h-3.5 w-3.5 text-teal-600" />
                            <span>Scan QR</span>
                          </>
                        ) : (
                          <>
                            <ClipboardCheck className="h-3.5 w-3.5 text-indigo-500" />
                            <span>Manual</span>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-center whitespace-nowrap">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${
                          act.status === "verified"
                            ? "bg-emerald-50 text-emerald-700"
                            : act.status === "pending"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-rose-50 text-rose-700"
                        }`}
                      >
                        {act.status === "verified"
                          ? "Terverifikasi"
                          : act.status === "pending"
                          ? "Menunggu"
                          : "Ditolak"}
                      </span>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
