import React from "react"
import { RecentActivity } from "@/data/kopoinAdminMockData"
import { ShieldCheck, QrCode, UserCheck } from "lucide-react"

export interface VerificationLogTableProps {
  activities: RecentActivity[]
}

export function VerificationLogTable({ activities }: VerificationLogTableProps) {
  const qrActivities = activities.filter((act) => act.verification_type === "QR")

  return (
    <div className="rounded-xl border border-gray-100 bg-white shadow-xs overflow-hidden">
      <div className="border-b border-gray-50 bg-gray-50/50 px-5 py-4 flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          Log Verifikasi QR Campaign
        </h3>
        <span className="text-xs text-gray-400 font-medium">Bukti Anti-Fraud</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 text-xs font-semibold uppercase tracking-wider text-gray-400 bg-gray-50/20">
              <th className="px-5 py-3">Waktu Verifikasi</th>
              <th className="px-5 py-3">Nama Anggota</th>
              <th className="px-5 py-3">Nama Tim</th>
              <th className="px-5 py-3">Misi Terkait</th>
              <th className="px-5 py-3">ID QR Produk (Mock)</th>
              <th className="px-5 py-3 text-right">Kopoin</th>
              <th className="px-5 py-3 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-sm">
            {qrActivities.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-5 py-8 text-center text-gray-400 font-medium">
                  Belum ada verifikasi QR masuk.
                </td>
              </tr>
            ) : (
              qrActivities.map((act, index) => {
                const isGabriel = act.user_name === "Gabriel"
                const qrId = act.user_name === "Gabriel" 
                  ? "KOPI-SUKAMAJU-QR-001" 
                  : act.user_name === "Bima" 
                  ? "CHECKIN-SKM-QR-087" 
                  : `PROD-LOKAL-QR-00${index + 2}`

                return (
                  <tr
                    key={act.activity_id}
                    className={`transition-colors duration-150 hover:bg-gray-50/40 ${
                      isGabriel ? "bg-teal-50/20 font-medium" : ""
                    }`}
                  >
                    <td className="px-5 py-3.5 text-xs text-gray-400 font-mono whitespace-nowrap">
                      {act.timestamp}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <UserCheck className="h-3.5 w-3.5 text-gray-400" />
                        <span className="text-gray-900 font-bold">{act.user_name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-gray-500 whitespace-nowrap">
                      {act.team_name}
                    </td>
                    <td className="px-5 py-3.5 text-gray-700 whitespace-nowrap">
                      {act.mission_name}
                    </td>
                    <td className="px-5 py-3.5 text-xs text-indigo-600 font-mono whitespace-nowrap flex items-center gap-1 mt-1">
                      <QrCode className="h-3 w-3" />
                      {qrId}
                    </td>
                    <td className="px-5 py-3.5 text-right font-semibold text-emerald-600">
                      +{act.points_awarded} pts
                    </td>
                    <td className="px-5 py-3.5 text-center whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 border border-emerald-100">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        QR Verified
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
