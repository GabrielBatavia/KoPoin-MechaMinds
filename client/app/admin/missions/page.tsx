"use client"

import { FormEvent, useMemo, useState } from "react"
import { AdminShell } from "@/components/admin/AdminShell"
import { MissionPerformanceList } from "@/components/admin/MissionPerformanceList"
import {
  MissionInput,
  createMission,
  deleteMission,
  updateMission,
  useAdminDashboard,
} from "@/data/kopoinAdminApi"
import { BarChart3, Plus, Save, Star, Target, Trash2, TrendingUp } from "lucide-react"

const defaultMission: MissionInput = {
  campaignId: "",
  title: "",
  description: "",
  points: 50,
  actionType: "qr_scan",
  deadlineLabel: "Minggu ini",
  productName: "",
  priority: "P1",
  qrCode: "",
  target: 1,
}

export default function MissionsPage() {
  const { data, isLoading, error, refresh } = useAdminDashboard()
  const [form, setForm] = useState<MissionInput>(defaultMission)
  const [savingId, setSavingId] = useState<string | null>(null)
  const missions = data.missions

  const firstCampaignId = data.campaigns[0]?.id || ""
  const formCampaignId = form.campaignId || firstCampaignId

  const totalMissions = missions.length
  const totalCompletions = missions.reduce((sum, mission) => sum + mission.completions, 0)
  const totalPoints = missions.reduce((sum, mission) => sum + mission.points_generated, 0)
  const mostPopular = useMemo(
    () => missions.reduce((prev, current) => (prev.completions > current.completions ? prev : current), missions[0]),
    [missions],
  )

  async function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSavingId("create")
    try {
      await createMission({ ...form, campaignId: formCampaignId })
      setForm(defaultMission)
      await refresh()
    } finally {
      setSavingId(null)
    }
  }

  async function handleUpdate(id: string, payload: Partial<MissionInput>) {
    setSavingId(id)
    try {
      await updateMission(id, payload)
      await refresh()
    } finally {
      setSavingId(null)
    }
  }

  async function handleDelete(id: string) {
    setSavingId(id)
    try {
      await deleteMission(id)
      await refresh()
    } finally {
      setSavingId(null)
    }
  }

  return (
    <AdminShell breadcrumbPage="Kinerja Misi" loadingText="Memuat Kinerja Misi...">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Kinerja Misi & Engagement</h1>
        <p className="text-sm text-gray-500 mt-1">
          Data misi di sini tersimpan di server dan dipakai langsung oleh aplikasi mobile.
        </p>
      </div>

      {isLoading && <div className="rounded-xl border border-gray-100 bg-white p-5 text-sm text-gray-500">Memuat misi...</div>}
      {error && (
        <div className="rounded-xl border border-rose-100 bg-rose-50 p-4 text-sm text-rose-700">
          {error}
          <button onClick={refresh} className="ml-3 font-bold underline">Coba lagi</button>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Jenis Misi</span>
            <Target className="h-4 w-4 text-teal-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mt-2">{totalMissions} Misi</h3>
          <p className="text-xs text-gray-500 mt-1">Tersedia dari database</p>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Penyelesaian</span>
            <TrendingUp className="h-4 w-4 text-emerald-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mt-2">{totalCompletions} kali</h3>
          <p className="text-xs text-emerald-600 font-medium mt-1">Dari log user missions</p>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Kopoin Dihasilkan</span>
            <BarChart3 className="h-4 w-4 text-indigo-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mt-2">{totalPoints.toLocaleString("id-ID")} pts</h3>
          <p className="text-xs text-gray-500 mt-1">Akumulasi misi selesai</p>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Terpopuler</span>
            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mt-2.5 truncate" title={mostPopular?.mission_name}>
            {mostPopular?.mission_name || "-"}
          </h3>
          <p className="text-xs text-amber-600 font-medium mt-1">
            {mostPopular?.completions || 0}x penyelesaian
          </p>
        </div>
      </div>

      <form onSubmit={handleCreate} className="rounded-xl border border-gray-100 bg-white p-5 shadow-xs">
        <div className="flex items-center gap-2 border-b border-gray-50 pb-3">
          <Plus className="h-4 w-4 text-teal-600" />
          <h2 className="text-sm font-bold text-gray-900">Tambah Misi Mobile</h2>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <select
            value={formCampaignId}
            onChange={(event) => setForm((current) => ({ ...current, campaignId: event.target.value }))}
            className="h-10 rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-[#0F6B63]"
          >
            {data.campaigns.map((campaign) => (
              <option key={campaign.id} value={campaign.id}>{campaign.name}</option>
            ))}
          </select>
          <input
            required
            value={form.title}
            onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
            placeholder="Nama misi"
            className="h-10 rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-[#0F6B63]"
          />
          <input
            value={form.qrCode}
            onChange={(event) => setForm((current) => ({ ...current, qrCode: event.target.value }))}
            placeholder="Kode QR opsional"
            className="h-10 rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-[#0F6B63]"
          />
          <input
            type="number"
            min={0}
            value={form.points}
            onChange={(event) => setForm((current) => ({ ...current, points: Number(event.target.value) }))}
            className="h-10 rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-[#0F6B63]"
          />
          <textarea
            required
            value={form.description}
            onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
            placeholder="Deskripsi misi"
            className="min-h-20 rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#0F6B63] md:col-span-2"
          />
          <select
            value={form.actionType}
            onChange={(event) => setForm((current) => ({ ...current, actionType: event.target.value as MissionInput["actionType"] }))}
            className="h-10 rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-[#0F6B63]"
          >
            <option value="qr_scan">QR Scan</option>
            <option value="learning">Learning</option>
            <option value="vote">Vote</option>
          </select>
          <select
            value={form.priority}
            onChange={(event) => setForm((current) => ({ ...current, priority: event.target.value as MissionInput["priority"] }))}
            className="h-10 rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-[#0F6B63]"
          >
            <option value="P0">P0</option>
            <option value="P1">P1</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={savingId === "create" || !formCampaignId}
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-teal-700 px-4 py-2 text-xs font-bold text-white hover:bg-teal-800 disabled:opacity-60"
        >
          <Save className="h-3.5 w-3.5" />
          {savingId === "create" ? "Menyimpan..." : "Simpan Misi"}
        </button>
      </form>

      <div className="rounded-xl border border-gray-100 bg-white shadow-xs overflow-hidden">
        <div className="border-b border-gray-50 bg-gray-50/50 px-5 py-4">
          <h3 className="text-sm font-bold text-gray-900">Kelola Data Misi</h3>
        </div>
        <div className="divide-y divide-gray-50">
          {missions.map((mission) => (
            <div key={mission.mission_id} className="grid gap-3 p-4 lg:grid-cols-[1fr_120px_120px_90px] lg:items-center">
              <input
                defaultValue={mission.mission_name}
                onBlur={(event) => event.target.value !== mission.mission_name && handleUpdate(mission.mission_id, { title: event.target.value })}
                className="h-9 rounded-md border border-gray-100 px-2 text-sm font-semibold outline-none focus:border-[#0F6B63]"
              />
              <input
                type="number"
                defaultValue={mission.points}
                onBlur={(event) => handleUpdate(mission.mission_id, { points: Number(event.target.value) })}
                className="h-9 rounded-md border border-gray-100 px-2 text-sm outline-none focus:border-[#0F6B63]"
              />
              <input
                defaultValue={mission.qr_code || ""}
                onBlur={(event) => handleUpdate(mission.mission_id, { qrCode: event.target.value })}
                className="h-9 rounded-md border border-gray-100 px-2 text-xs outline-none focus:border-[#0F6B63]"
              />
              <button
                onClick={() => handleDelete(mission.mission_id)}
                disabled={savingId === mission.mission_id}
                className="inline-flex items-center justify-center gap-1 rounded-md border border-rose-100 px-2.5 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 disabled:opacity-60"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Hapus
              </button>
            </div>
          ))}
        </div>
      </div>

      <MissionPerformanceList missions={missions} />
    </AdminShell>
  )
}
