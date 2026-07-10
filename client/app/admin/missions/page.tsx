"use client"

import { useDemoState } from "@/data/kopoinAdminMockData"
import { AdminShell } from "@/components/admin/AdminShell"
import { MissionPerformanceList } from "@/components/admin/MissionPerformanceList"
import { Target, TrendingUp, BarChart3, Star } from "lucide-react"

export default function MissionsPage() {
  const { missions } = useDemoState()

  // Calculate some aggregate values for display
  const totalMissions = missions.length
  const totalCompletions = missions.reduce((sum, m) => sum + m.completions, 0)
  const totalPoints = missions.reduce((sum, m) => sum + m.points_generated, 0)
  const mostPopular = missions.reduce((prev, current) => (prev.completions > current.completions) ? prev : current)

  return (
    <AdminShell breadcrumbPage="Kinerja Misi" loadingText="Memuat Kinerja Misi...">
      {/* Header Title */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Kinerja Misi & Engagement</h1>
        <p className="text-sm text-gray-500 mt-1">
          Bandingkan misi mana yang paling banyak disukai anggota muda untuk mengukur efektivitas kampanye.
        </p>
      </div>

      {/* Quick Metrics Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Jenis Misi</span>
            <Target className="h-4 w-4 text-teal-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mt-2">{totalMissions} Misi</h3>
          <p className="text-xs text-gray-500 mt-1">Tersedia dalam campaign aktif</p>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Penyelesaian</span>
            <TrendingUp className="h-4 w-4 text-emerald-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mt-2">{totalCompletions} kali</h3>
          <p className="text-xs text-emerald-600 font-medium mt-1">↑ Naik dari kemarin</p>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Kopoin Dihasilkan</span>
            <BarChart3 className="h-4 w-4 text-indigo-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mt-2">{totalPoints.toLocaleString("id-ID")} pts</h3>
          <p className="text-xs text-gray-500 mt-1">Total loyalitas dibagikan</p>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Terpopuler</span>
            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mt-2.5 truncate" title={mostPopular.mission_name}>
            {mostPopular.mission_name}
          </h3>
          <p className="text-xs text-amber-600 font-medium mt-1">
            {mostPopular.completions}x penyelesaian
          </p>
        </div>
      </div>

      {/* Missions List */}
      <MissionPerformanceList missions={missions} />

      {/* Engagement Insight Textbox */}
      <div className="rounded-xl border border-teal-100 bg-teal-50/10 p-5">
        <h4 className="text-xs font-bold text-teal-900 uppercase tracking-wider mb-2">Analisis & Rekomendasi Pengurus</h4>
        <p className="text-xs text-teal-800 leading-relaxed">
          Misi <strong>Beli Produk Lokal</strong> terus menduduki peringkat teratas dalam volume penyelesaian. Hal ini membuktikan bahwa anggota muda antusias mendukung produk lokal koperasi (Kopi Sukamaju) ketika difasilitasi dengan poin loyalitas instan. Disarankan untuk menambahkan opsi produk lokal baru pada campaign berikutnya guna memperluas dampak UMKM desa.
        </p>
      </div>
    </AdminShell>
  )
}
