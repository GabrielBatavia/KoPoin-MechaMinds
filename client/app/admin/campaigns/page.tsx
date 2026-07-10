"use client"

import { useDemoState } from "@/data/kopoinAdminMockData"
import { AdminShell } from "@/components/admin/AdminShell"
import Link from "next/link"
import { ArrowRight, Play, CheckCircle, Clock } from "lucide-react"

export default function CampaignsListPage() {
  const { campaign } = useDemoState()

  const campaignsList = [
    {
      id: "sukamaju-7hari",
      name: campaign.name,
      status: "active",
      startDate: campaign.start_date,
      endDate: campaign.end_date,
      targetPoints: campaign.reward_target_points,
      currentPoints: campaign.current_points,
      progressPercent: campaign.progress_percent,
      rewardName: campaign.reward_name,
      dayCurrent: campaign.day_current,
      dayTotal: campaign.day_total,
      description: "Dukungan produk lokal Kopi Sukamaju melalui transaksi belanja terverifikasi QR untuk anggota muda.",
    },
    {
      id: "literasi-koperasi",
      name: "Literasi Koperasi Anggota Muda",
      status: "completed",
      startDate: "2026-06-15",
      endDate: "2026-06-22",
      targetPoints: 10000,
      currentPoints: 10000,
      progressPercent: 100.0,
      rewardName: "Kupon Kelas Bisnis Digital",
      dayCurrent: 7,
      dayTotal: 7,
      description: "Pembelajaran koperasi dasar interaktif untuk Gen Z di Desa Sukamaju guna meningkatkan literasi perkoperasian.",
    },
    {
      id: "festival-umkm",
      name: "Festival UMKM Digital Desa 2026",
      status: "completed",
      startDate: "2026-05-10",
      endDate: "2026-05-13",
      targetPoints: 15000,
      currentPoints: 15420,
      progressPercent: 100.0,
      rewardName: "Voucher Merchant Festival",
      dayCurrent: 3,
      dayTotal: 3,
      description: "Kampanye promosi transaksi pembayaran digital nontunai pada tenant-tenant UMKM binaan koperasi Sukamaju.",
    },
    {
      id: "koperasi-hijau",
      name: "Gerakan Koperasi Hijau - Pilah Sampah",
      status: "planned",
      startDate: "2026-07-20",
      endDate: "2026-07-27",
      targetPoints: 20000,
      currentPoints: 0,
      progressPercent: 0.0,
      rewardName: "Tumbler Ramah Lingkungan",
      dayCurrent: 0,
      dayTotal: 7,
      description: "Misi aksi memilah sampah plastik desa dan menyetor ke bank sampah mitra koperasi untuk mendapatkan Kopoin.",
    },
  ]

  return (
    <AdminShell breadcrumbPage="Daftar Kampanye" loadingText="Memuat Daftar Kampanye...">
      {/* Header Title */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Kampanye Loyalitas Koperasi</h1>
        <p className="text-sm text-gray-500 mt-1">
          Kelola dan lihat seluruh daftar campaign aktivasi komunitas yang sedang berjalan, selesai, atau direncanakan.
        </p>
      </div>

      {/* Campaign Card Grid */}
      {/* ponytail: Optimized card sizes to be compact (p-4), merged progress details to one line, line-clamped descriptions, and replaced the bulky reward box with a sleek inline badge to avoid vertical bloat. */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {campaignsList.map((item) => {
          const isActive = item.status === "active"
          const isCompleted = item.status === "completed"
          const isPlanned = item.status === "planned"

          return (
            <div
              key={item.id}
              className={`rounded-xl border border-gray-100 bg-white p-4 shadow-xs flex flex-col justify-between transition-all duration-200 hover:shadow-md ${
                isActive ? "ring-2 ring-teal-500/80 bg-teal-50/5" : ""
              }`}
            >
              <div>
                {/* Status Badge & Header */}
                <div className="flex items-center justify-between border-b border-gray-50 pb-2 mb-3.5">
                  <div className="flex items-center gap-1.5">
                    {isActive && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-teal-50 px-2 py-0.5 text-[10px] font-bold text-teal-700">
                        <Play className="h-2.5 w-2.5 fill-teal-600 text-teal-600 animate-pulse" />
                        Aktif
                      </span>
                    )}
                    {isCompleted && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">
                        <CheckCircle className="h-2.5 w-2.5 text-slate-500" />
                        Selesai
                      </span>
                    )}
                    {isPlanned && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-700">
                        <Clock className="h-2.5 w-2.5 text-indigo-600" />
                        Direncanakan
                      </span>
                    )}
                    <span className="text-[10px] text-gray-400 font-medium">
                      {item.dayCurrent > 0 ? `Hari ${item.dayCurrent}/${item.dayTotal}` : `${item.dayTotal} Hari`}
                    </span>
                  </div>
                  <span className="text-[9px] text-gray-400 font-mono whitespace-nowrap">
                    {item.startDate} - {item.endDate}
                  </span>
                </div>

                {/* Campaign Title & Description */}
                <h3 className="text-sm font-bold text-gray-900 line-clamp-1" title={item.name}>{item.name}</h3>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed line-clamp-2 h-10">
                  {item.description}
                </p>

                {/* Reward Name Display (Sleek Inline Badge) */}
                <div className="flex items-center gap-1.5 mt-3 text-[11px] text-gray-600 bg-amber-50/50 border border-amber-100/50 rounded-md px-2 py-1">
                  <span className="text-gray-400 font-medium">Hadiah:</span>
                  <span className="font-semibold text-amber-700 truncate">{item.rewardName}</span>
                </div>

                {/* Progress details (Merged into single row above progress bar) */}
                <div className="mt-3.5">
                  <div className="flex items-center justify-between text-xs font-semibold mb-1">
                    <span className="text-gray-500">
                      {item.currentPoints.toLocaleString("id-ID")} / {item.targetPoints.toLocaleString("id-ID")} pts
                    </span>
                    <span className="text-teal-600 font-bold">{item.progressPercent.toFixed(1)}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-teal-500 to-emerald-400 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(item.progressPercent, 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-4 border-t border-gray-50 pt-3 flex justify-end">
                {isActive ? (
                  <Link
                    href={`/admin/campaigns/${item.id}`}
                    className="inline-flex items-center gap-1 rounded-md bg-teal-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-teal-700 active:bg-teal-800 transition-colors shadow-xs"
                  >
                    Lihat Konsol Detil
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                ) : (
                  <button
                    disabled
                    className="inline-flex items-center gap-1 rounded-md bg-gray-100 px-3 py-1.5 text-xs font-bold text-gray-400 cursor-not-allowed border border-gray-100"
                  >
                    {isCompleted ? "Kampanye Selesai" : "Belum Dimulai"}
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </AdminShell>
  )
}
