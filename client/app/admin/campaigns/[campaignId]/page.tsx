"use client"

import * as React from "react"
import { useDemoState } from "@/data/kopoinAdminMockData"
import { AdminShell } from "@/components/admin/AdminShell"
import { CampaignProgressCard } from "@/components/admin/CampaignProgressCard"
import { KpiCard } from "@/components/admin/KpiCard"
import { TeamLeaderboardTable } from "@/components/admin/TeamLeaderboardTable"
import { VerificationLogTable } from "@/components/admin/VerificationLogTable"
import { QrCode, Trophy, ThumbsUp, Calendar, Target, Star } from "lucide-react"

interface PageProps {
  params: Promise<{ campaignId: string }>
}

export default function CampaignDetailPage({ params }: PageProps) {
  const resolvedParams = React.use(params)
  const { campaignId } = resolvedParams

  const { campaign, kpis, leaderboard, activities, missions } = useDemoState()

  const votingResults = [
    { name: "Diskon Kopi Susu Aren Koperasi", votes: 42, percent: 50 },
    { name: "Voucher Sembako Murah", votes: 25, percent: 30 },
    { name: "Kupon Internet Desa Gratis", votes: 17, percent: 20 },
  ]

  const breadcrumbs = [
    { label: "Kampanye", href: "/admin/campaigns" },
  ]

  return (
    <AdminShell
      breadcrumbPage={campaignId.replace(/-/g, " ")}
      breadcrumbLinks={breadcrumbs}
      loadingText="Memuat Detail Kampanye..."
    >
      {/* Header Title with Campaign Name */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-teal-600 font-bold uppercase tracking-wider">
            <Calendar className="h-3.5 w-3.5" />
            <span>Rentang: {campaign.start_date} s/d {campaign.end_date}</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 mt-1">{campaign.name}</h1>
          <p className="text-sm text-gray-500">
            Analisis mendalam performa target kolektif komunitas, verifikasi transaksi QR, dan opsi voting reward.
          </p>
        </div>
        <div className="text-xs text-gray-400 font-mono">
          ID Kampanye: {campaign.campaign_id}
        </div>
      </div>

      {/* Large Progress Indicator */}
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

      {/* KPI Row specific to Campaign */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          label="Poin Terkumpul"
          value={`${campaign.current_points.toLocaleString("id-ID")} pts`}
          helper={`Menuju target ${campaign.reward_target_points.toLocaleString("id-ID")} pts`}
          trend={`${campaign.progress_percent.toFixed(1)}%`}
          icon={<Trophy className="h-4 w-4" />}
        />
        <KpiCard
          label="Verifikasi QR"
          value={kpis.qr_verifications}
          helper="Aksi scan transaksi valid"
          trend="96% rasio"
          icon={<QrCode className="h-4 w-4" />}
        />
        <KpiCard
          label="Penyelesaian Misi"
          value={kpis.mission_completions}
          helper="Total kontribusi terdaftar"
          trend="+1"
          icon={<Target className="h-4 w-4" />}
        />
        <KpiCard
          label="Voter Reward"
          value={`${kpis.voting_participation} voter`}
          helper="Partisipasi penentuan reward"
          trend="65% kuorum"
          icon={<ThumbsUp className="h-4 w-4" />}
        />
      </div>

      {/* Detailed Campaign Sections Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left/Middle Column (takes 2/3 cols) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Mission Cards Grid */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Daftar Misi Aktif</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {missions.map((mis) => {
                const isBeli = mis.mission_id === "mission_beli_produk_lokal"
                return (
                  <div
                    key={mis.mission_id}
                    className={`rounded-xl border border-gray-100 bg-white p-5 shadow-xs transition-all duration-200 hover:shadow-md ${
                      isBeli ? "ring-1 ring-teal-500 bg-teal-50/5" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`inline-flex items-center rounded-sm px-1.5 py-0.5 text-[10px] font-bold uppercase ${
                        mis.difficulty === "Mudah"
                          ? "bg-green-50 text-green-700 border border-green-100"
                          : "bg-amber-50 text-amber-700 border border-amber-100"
                      }`}>
                        Level: {mis.difficulty}
                      </span>
                      <span className="text-[10px] text-gray-400 font-bold bg-gray-50 px-2 py-0.5 rounded-full">
                        {mis.impact_label}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-gray-900 mt-2.5">{mis.mission_name}</h4>
                    <div className="mt-4 flex items-center justify-between border-t border-gray-50 pt-3">
                      <div className="text-left">
                        <p className="text-[10px] text-gray-400 font-medium">Sukses</p>
                        <p className="text-xs font-bold text-gray-700">{mis.completions} kali</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-gray-400 font-medium">Loyalitas</p>
                        <p className="text-xs font-bold text-emerald-600">+{mis.points_generated.toLocaleString("id-ID")} pts</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* QR Verification Log */}
          <VerificationLogTable activities={activities} />
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6">
          <TeamLeaderboardTable teams={leaderboard} compact={false} />

          {/* Voting Summary Card */}
          <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-xs">
            <div className="border-b border-gray-50 pb-3 mb-4">
              <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <ThumbsUp className="h-4 w-4 text-teal-600" />
                Partisipasi Voting Reward
              </h3>
              <p className="text-[10px] text-gray-400 font-medium mt-0.5">
                Anggota memilih reward untuk campaign periode berikutnya.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {votingResults.map((vote) => (
                <div key={vote.name}>
                  <div className="flex items-center justify-between text-xs font-semibold mb-1">
                    <span className="text-gray-700 max-w-[170px] truncate">{vote.name}</span>
                    <span className="text-gray-500 font-mono">
                      {vote.votes} suara ({vote.percent}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-teal-500 rounded-full"
                      style={{ width: `${vote.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 rounded-lg p-3 mt-4 text-[10px] text-gray-500 leading-normal border border-gray-100">
              Total Suara Masuk: <strong>{kpis.voting_participation} voter</strong>. Voting ini hanya berlaku untuk alokasi reward campaign, bukan keputusan RAT legal.
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  )
}
