"use client"

import * as React from "react"
import { AdminShell } from "@/components/admin/AdminShell"
import { CampaignProgressCard } from "@/components/admin/CampaignProgressCard"
import { KpiCard } from "@/components/admin/KpiCard"
import { TeamLeaderboardTable } from "@/components/admin/TeamLeaderboardTable"
import { VerificationLogTable } from "@/components/admin/VerificationLogTable"
import {
  CouponInput,
  VoteOptionInput,
  createCoupon,
  createVoteOption,
  deleteCoupon,
  deleteVoteOption,
  updateCoupon,
  useAdminDashboard,
} from "@/data/kopoinAdminApi"
import { Calendar, Gift, Plus, QrCode, Save, Target, ThumbsUp, Trash2, Trophy } from "lucide-react"

interface PageProps {
  params: Promise<{ campaignId: string }>
}

const defaultVote: VoteOptionInput = {
  label: "",
  pollId: "poll_reward_berikutnya",
  votes: 0,
}

const defaultCoupon: CouponInput = {
  title: "",
  originalPrice: "",
  promoPrice: "",
  points: 30,
  merchant: "Koperasi Sukamaju",
  emoji: "🎁",
  category: "Penawaran Khusus",
  tags: ["Makanan"],
  active: true,
}

export default function CampaignDetailPage({ params }: PageProps) {
  const { campaignId } = React.use(params)
  const { data, isLoading, error, refresh } = useAdminDashboard()
  const [voteForm, setVoteForm] = React.useState<VoteOptionInput>(defaultVote)
  const [couponForm, setCouponForm] = React.useState<CouponInput>(defaultCoupon)
  const [savingId, setSavingId] = React.useState<string | null>(null)

  const campaign = data.campaigns.find((item) => item.id === campaignId) || data.campaign
  const campaignMissions = data.missions.filter((mission) => !campaign || mission.campaign_id === campaign.id)
  const breadcrumbs = [{ label: "Kampanye", href: "/admin/campaigns" }]

  async function handleCreateVote(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSavingId("vote")
    try {
      await createVoteOption(voteForm)
      setVoteForm(defaultVote)
      await refresh()
    } finally {
      setSavingId(null)
    }
  }

  async function handleDeleteVote(id: string) {
    setSavingId(id)
    try {
      await deleteVoteOption(id)
      await refresh()
    } finally {
      setSavingId(null)
    }
  }

  async function handleCreateCoupon(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSavingId("coupon")
    try {
      await createCoupon(couponForm)
      setCouponForm(defaultCoupon)
      await refresh()
    } finally {
      setSavingId(null)
    }
  }

  async function handleToggleCoupon(id: string, active: boolean) {
    setSavingId(id)
    try {
      await updateCoupon(id, { active })
      await refresh()
    } finally {
      setSavingId(null)
    }
  }

  async function handleDeleteCoupon(id: string) {
    setSavingId(id)
    try {
      await deleteCoupon(id)
      await refresh()
    } finally {
      setSavingId(null)
    }
  }

  return (
    <AdminShell
      breadcrumbPage={campaign?.name || campaignId}
      breadcrumbLinks={breadcrumbs}
      loadingText="Memuat Detail Kampanye..."
    >
      {isLoading && <div className="rounded-xl border border-gray-100 bg-white p-5 text-sm text-gray-500">Memuat detail campaign...</div>}
      {error && (
        <div className="rounded-xl border border-rose-100 bg-rose-50 p-4 text-sm text-rose-700">
          {error}
          <button onClick={refresh} className="ml-3 font-bold underline">Coba lagi</button>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-teal-600 font-bold uppercase tracking-wider">
            <Calendar className="h-3.5 w-3.5" />
            <span>Rentang: {campaign?.start_date || "-"} s/d {campaign?.end_date || "-"}</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 mt-1">{campaign?.name || "Campaign"}</h1>
          <p className="text-sm text-gray-500">
            Detail performa, misi, voting reward, dan kupon yang tersinkron ke mobile.
          </p>
        </div>
        <div className="text-xs text-gray-400 font-mono">
          ID Kampanye: {campaign?.campaign_id || campaignId}
        </div>
      </div>

      {campaign && (
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
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          label="Poin Terkumpul"
          value={`${(campaign?.current_points || 0).toLocaleString("id-ID")} pts`}
          helper={`Target ${(campaign?.reward_target_points || 0).toLocaleString("id-ID")} pts`}
          trend={`${(campaign?.progress_percent || 0).toFixed(1)}%`}
          icon={<Trophy className="h-4 w-4" />}
        />
        <KpiCard
          label="Verifikasi QR"
          value={data.kpis.qr_verifications}
          helper="Aksi scan transaksi valid"
          trend="Database"
          icon={<QrCode className="h-4 w-4" />}
        />
        <KpiCard
          label="Penyelesaian Misi"
          value={data.kpis.mission_completions}
          helper="Total kontribusi terdaftar"
          trend="Live"
          icon={<Target className="h-4 w-4" />}
        />
        <KpiCard
          label="Voter Reward"
          value={`${data.kpis.voting_participation} voter`}
          helper="Partisipasi penentuan reward"
          trend={`${data.voteOptions.length} opsi`}
          icon={<ThumbsUp className="h-4 w-4" />}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Daftar Misi Aktif</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {campaignMissions.map((mission) => (
                <div key={mission.mission_id} className="rounded-xl border border-gray-100 bg-white p-5 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center rounded-sm bg-green-50 px-1.5 py-0.5 text-[10px] font-bold uppercase text-green-700">
                      {mission.difficulty}
                    </span>
                    <span className="text-[10px] text-gray-400 font-bold bg-gray-50 px-2 py-0.5 rounded-full">
                      {mission.action_type}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-gray-900 mt-2.5">{mission.mission_name}</h4>
                  <p className="mt-1 line-clamp-2 text-xs text-gray-500">{mission.description}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-gray-50 pt-3">
                    <div>
                      <p className="text-[10px] text-gray-400 font-medium">Sukses</p>
                      <p className="text-xs font-bold text-gray-700">{mission.completions} kali</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-gray-400 font-medium">Loyalitas</p>
                      <p className="text-xs font-bold text-emerald-600">+{mission.points_generated.toLocaleString("id-ID")} pts</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <VerificationLogTable activities={data.activities} />
        </div>

        <div className="flex flex-col gap-6">
          <TeamLeaderboardTable teams={data.leaderboard} compact={false} />

          <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-xs">
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <ThumbsUp className="h-4 w-4 text-teal-600" />
              CRUD Voting Reward
            </h3>
            <form onSubmit={handleCreateVote} className="mt-4 flex gap-2">
              <input
                required
                value={voteForm.label}
                onChange={(event) => setVoteForm((current) => ({ ...current, label: event.target.value }))}
                placeholder="Label opsi voting"
                className="h-9 min-w-0 flex-1 rounded-md border border-gray-200 px-2 text-xs outline-none focus:border-[#0F6B63]"
              />
              <button className="inline-flex items-center gap-1 rounded-md bg-teal-600 px-3 py-1.5 text-xs font-bold text-white">
                <Plus className="h-3.5 w-3.5" />
                Tambah
              </button>
            </form>
            <div className="mt-4 flex flex-col gap-3">
              {data.voteOptions.map((vote) => (
                <div key={vote.id}>
                  <div className="mb-1 flex items-center justify-between gap-2 text-xs font-semibold">
                    <span className="truncate text-gray-700">{vote.label}</span>
                    <button onClick={() => handleDeleteVote(vote.id)} className="text-rose-600">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                    <div className="h-full rounded-full bg-teal-500" style={{ width: `${vote.percent}%` }} />
                  </div>
                  <p className="mt-1 text-[10px] text-gray-400">{vote.votes} suara ({vote.percent}%)</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-xs">
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <Gift className="h-4 w-4 text-amber-500" />
              CRUD Kupon Mobile
            </h3>
            <form onSubmit={handleCreateCoupon} className="mt-4 grid gap-2">
              <input
                required
                value={couponForm.title}
                onChange={(event) => setCouponForm((current) => ({ ...current, title: event.target.value }))}
                placeholder="Judul kupon"
                className="h-9 rounded-md border border-gray-200 px-2 text-xs outline-none focus:border-[#0F6B63]"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  required
                  value={couponForm.promoPrice}
                  onChange={(event) => setCouponForm((current) => ({ ...current, promoPrice: event.target.value }))}
                  placeholder="Harga promo"
                  className="h-9 rounded-md border border-gray-200 px-2 text-xs outline-none focus:border-[#0F6B63]"
                />
                <input
                  type="number"
                  min={0}
                  value={couponForm.points}
                  onChange={(event) => setCouponForm((current) => ({ ...current, points: Number(event.target.value) }))}
                  className="h-9 rounded-md border border-gray-200 px-2 text-xs outline-none focus:border-[#0F6B63]"
                />
              </div>
              <button
                disabled={savingId === "coupon"}
                className="inline-flex items-center justify-center gap-1 rounded-md bg-teal-600 px-3 py-2 text-xs font-bold text-white disabled:opacity-60"
              >
                <Save className="h-3.5 w-3.5" />
                Simpan Kupon
              </button>
            </form>
            <div className="mt-4 divide-y divide-gray-50">
              {data.coupons.map((coupon) => (
                <div key={coupon.id} className="flex items-center justify-between gap-3 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-xs font-bold text-gray-900">{coupon.title}</p>
                    <p className="text-[10px] text-gray-400">{coupon.points} poin - {coupon.active ? "aktif" : "nonaktif"}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleCoupon(coupon.id, !coupon.active)}
                      className="rounded-md border border-gray-100 px-2 py-1 text-[10px] font-bold text-gray-600"
                    >
                      {coupon.active ? "Nonaktifkan" : "Aktifkan"}
                    </button>
                    <button onClick={() => handleDeleteCoupon(coupon.id)} className="text-rose-600">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  )
}
