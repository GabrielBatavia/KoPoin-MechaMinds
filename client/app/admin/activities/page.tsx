"use client"

import { useState } from "react"
import { useDemoState } from "@/data/kopoinAdminMockData"
import { AdminShell } from "@/components/admin/AdminShell"
import { RecentActivityTable } from "@/components/admin/RecentActivityTable"
import { Filter } from "lucide-react"

export default function ActivitiesPage() {
  const { activities } = useDemoState()
  const [statusFilter, setStatusFilter] = useState<"all" | "verified" | "pending" | "rejected">("all")
  const filteredActivities = activities.filter((act) => {
    if (statusFilter === "all") return true
    return act.status === statusFilter
  })

  return (
    <AdminShell breadcrumbPage="Aktivitas Anggota" loadingText="Memuat Log Aktivitas...">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Log Aktivitas Partisipasi</h1>
        <p className="text-sm text-gray-500 mt-1">
          Seluruh rekam jejak kontribusi, verifikasi manual, dan scan QR transaksi dari anggota koperasi.
        </p>
      </div>

      {/* ponytail: Integrated the filter select dropdown directly inside the RecentActivityTable headerAction prop, unifying the layout and removing the duplicate cards. */}
      <RecentActivityTable
        activities={filteredActivities}
        compact={false}
        headerAction={
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 font-medium hidden sm:inline">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="flex h-8 w-40 rounded-lg border border-gray-200 bg-white px-2.5 py-1 text-xs font-bold text-gray-700 font-sans focus-visible:outline-none focus:border-[#0F6B63] focus:ring-1 focus:ring-[#0F6B63] transition-all cursor-pointer"
            >
              <option value="all">Semua ({activities.length})</option>
              <option value="verified">Terverifikasi ({activities.filter((a) => a.status === "verified").length})</option>
              <option value="pending">Menunggu ({activities.filter((a) => a.status === "pending").length})</option>
              <option value="rejected">Ditolak ({activities.filter((a) => a.status === "rejected").length})</option>
            </select>
          </div>
        }
      />
    </AdminShell>
  )
}
