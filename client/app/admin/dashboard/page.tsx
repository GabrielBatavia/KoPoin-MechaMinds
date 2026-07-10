"use client"

import { useDemoState } from "@/data/kopoinAdminMockData"
import { AdminShell } from "@/components/admin/AdminShell"
import { KpiCard } from "@/components/admin/KpiCard"
import { CampaignProgressCard } from "@/components/admin/CampaignProgressCard"
import { TeamLeaderboardTable } from "@/components/admin/TeamLeaderboardTable"
import { RecentActivityTable } from "@/components/admin/RecentActivityTable"
import { MissionPerformanceList } from "@/components/admin/MissionPerformanceList"

import { Users, CheckCircle2, Award, QrCode, Flame, Percent } from "lucide-react"

export default function Page() {
  const { campaign, kpis, leaderboard, activities, missions } = useDemoState()

  return (
    <AdminShell breadcrumbPage="Ringkasan Dasbor" loadingText="Memuat Dasbor Admin...">
      {/* Header Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Campaign Console Kopoin</h1>
          <p className="text-sm text-gray-500 mt-1">
            Pantau tingkat keaktifan, pencapaian misi, dan partisipasi produk lokal anggota muda koperasi.
          </p>
        </div>
        <div className="text-xs text-gray-400 font-mono text-right hidden lg:block">
          Tanggal: 5 Juli 2026
        </div>
      </div>

      {/* KPI Metrics Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <KpiCard
          label="Anggota Aktif"
          value={kpis.active_members}
          helper="Dari total anggota terdaftar"
          trend="+12%"
          icon={<Users className="h-4 w-4" />}
        />
        <KpiCard
          label="Misi Selesai"
          value={kpis.mission_completions}
          helper="Total verifikasi sukses"
          trend="+24%"
          icon={<CheckCircle2 className="h-4 w-4" />}
        />
        <KpiCard
          label="Kopoin Dibagikan"
          value={kpis.total_kopoin_issued.toLocaleString("id-ID")}
          helper="Loyalitas terdistribusi"
          trend="+18%"
          icon={<Award className="h-4 w-4" />}
        />
        <KpiCard
          label="Verifikasi QR"
          value={kpis.qr_verifications}
          helper="Kontribusi transaksi produk"
          trend="+15%"
          icon={<QrCode className="h-4 w-4" />}
        />
        <KpiCard
          label="Rasio Selesai"
          value={`${kpis.completion_rate_percent}%`}
          helper="Penyelesaian minimal 1 misi"
          trend="+4%"
          icon={<Percent className="h-4 w-4" />}
        />
        <KpiCard
          label="Streak Aktif"
          value={kpis.streak_users}
          helper="Anggota streak 3+ minggu"
          trend="+9%"
          icon={<Flame className="h-4 w-4" />}
        />
      </div>

      {/* Campaign Progress Panel */}
      <CampaignProgressCard
        campaignName={campaign.name}
        currentPoints={campaign.current_points}
        targetPoints={campaign.reward_target_points}
        progressPercent={campaign.progress_percent}
        rewardName={campaign.reward_name}
        dayCurrent={campaign.day_current}
        dayTotal={campaign.day_total}
        status={campaign.status}
      />

      {/* Detailed Lists & Tables Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Side: Leaderboard & Activity (takes 2/3 cols) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <TeamLeaderboardTable teams={leaderboard} compact={true} />
          <RecentActivityTable activities={activities} compact={true} />
        </div>

        {/* Right Side: Mission Performance (takes 1/3 col) */}
        <div className="flex flex-col gap-6">
          <MissionPerformanceList missions={missions} />
          
          <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-xs">
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">Narasi Kampanye</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              "Melalui Campaign Console Kopoin, koperasi Sukamaju dapat membuktikan adanya peningkatan aktivitas anggota muda secara sosial dan terukur. Anggota muda yang termotivasi oleh reward bersama bekerja sama dalam tim komunitas untuk mencapai tujuan ekonomi lokal."
            </p>
          </div>
        </div>
      </div>
    </AdminShell>
  )
}
