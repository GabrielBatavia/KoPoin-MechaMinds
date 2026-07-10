"use client"

import { FormEvent, useMemo, useState } from "react"
import Link from "next/link"
import { AdminShell } from "@/components/admin/AdminShell"
import {
  CampaignInput,
  createCampaign,
  deleteCampaign,
  updateCampaign,
  useAdminDashboard,
} from "@/data/kopoinAdminApi"
import { ArrowRight, CheckCircle, Clock, Play, Plus, Save, Trash2 } from "lucide-react"

const defaultForm: CampaignInput = {
  title: "",
  cooperativeId: "coop_sukamaju",
  targetValue: 100,
  currentValue: 0,
  rewardTitle: "",
  deadlineLabel: "Minggu ini",
  status: "planned",
}

export default function CampaignsListPage() {
  const { data, isLoading, error, refresh } = useAdminDashboard()
  const [form, setForm] = useState<CampaignInput>(defaultForm)
  const [savingId, setSavingId] = useState<string | null>(null)

  const campaigns = useMemo(() => data.campaigns, [data.campaigns])

  async function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSavingId("create")
    try {
      await createCampaign(form)
      setForm(defaultForm)
      await refresh()
    } finally {
      setSavingId(null)
    }
  }

  async function handleUpdate(id: string, payload: Partial<CampaignInput>) {
    setSavingId(id)
    try {
      await updateCampaign(id, payload)
      await refresh()
    } finally {
      setSavingId(null)
    }
  }

  async function handleDelete(id: string) {
    setSavingId(id)
    try {
      await deleteCampaign(id)
      await refresh()
    } finally {
      setSavingId(null)
    }
  }

  return (
    <AdminShell breadcrumbPage="Daftar Kampanye" loadingText="Memuat Daftar Kampanye...">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Kampanye Loyalitas Koperasi</h1>
        <p className="text-sm text-gray-500 mt-1">
          Buat, ubah, dan hapus campaign yang dipakai admin serta ditampilkan ke mobile.
        </p>
      </div>

      {isLoading && <div className="rounded-xl border border-gray-100 bg-white p-5 text-sm text-gray-500">Memuat campaign...</div>}
      {error && (
        <div className="rounded-xl border border-rose-100 bg-rose-50 p-4 text-sm text-rose-700">
          {error}
          <button onClick={refresh} className="ml-3 font-bold underline">Coba lagi</button>
        </div>
      )}

      <form onSubmit={handleCreate} className="rounded-xl border border-gray-100 bg-white p-5 shadow-xs">
        <div className="flex items-center gap-2 border-b border-gray-50 pb-3">
          <Plus className="h-4 w-4 text-teal-600" />
          <h2 className="text-sm font-bold text-gray-900">Tambah Campaign</h2>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <input
            required
            value={form.title}
            onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
            placeholder="Nama campaign"
            className="h-10 rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-[#0F6B63]"
          />
          <input
            required
            value={form.rewardTitle}
            onChange={(event) => setForm((current) => ({ ...current, rewardTitle: event.target.value }))}
            placeholder="Nama reward"
            className="h-10 rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-[#0F6B63]"
          />
          <input
            type="number"
            min={1}
            value={form.targetValue}
            onChange={(event) => setForm((current) => ({ ...current, targetValue: Number(event.target.value) }))}
            className="h-10 rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-[#0F6B63]"
          />
          <select
            value={form.status}
            onChange={(event) => setForm((current) => ({ ...current, status: event.target.value }))}
            className="h-10 rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-[#0F6B63]"
          >
            <option value="planned">Direncanakan</option>
            <option value="active">Aktif</option>
            <option value="completed">Selesai</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={savingId === "create"}
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-teal-700 px-4 py-2 text-xs font-bold text-white hover:bg-teal-800 disabled:opacity-60"
        >
          <Save className="h-3.5 w-3.5" />
          {savingId === "create" ? "Menyimpan..." : "Simpan Campaign"}
        </button>
      </form>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {campaigns.map((item) => {
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
                <div className="flex items-center justify-between border-b border-gray-50 pb-2 mb-3.5">
                  <div className="flex items-center gap-1.5">
                    {isActive && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-teal-50 px-2 py-0.5 text-[10px] font-bold text-teal-700">
                        <Play className="h-2.5 w-2.5 fill-teal-600 text-teal-600" />
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
                  </div>
                  <span className="text-[9px] text-gray-400 font-mono whitespace-nowrap">{item.end_date}</span>
                </div>

                <h3 className="text-sm font-bold text-gray-900 line-clamp-1" title={item.name}>{item.name}</h3>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed line-clamp-2 h-10">{item.description}</p>

                <div className="mt-3 grid gap-2">
                  <input
                    defaultValue={item.name}
                    onBlur={(event) => event.target.value !== item.name && handleUpdate(item.id, { title: event.target.value })}
                    className="h-8 rounded-md border border-gray-100 px-2 text-xs font-semibold text-gray-700 outline-none focus:border-[#0F6B63]"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      defaultValue={item.current_points}
                      onBlur={(event) => handleUpdate(item.id, { currentValue: Number(event.target.value) })}
                      className="h-8 rounded-md border border-gray-100 px-2 text-xs outline-none focus:border-[#0F6B63]"
                    />
                    <select
                      defaultValue={item.status}
                      onChange={(event) => handleUpdate(item.id, { status: event.target.value })}
                      className="h-8 rounded-md border border-gray-100 px-2 text-xs outline-none focus:border-[#0F6B63]"
                    >
                      <option value="planned">planned</option>
                      <option value="active">active</option>
                      <option value="completed">completed</option>
                    </select>
                  </div>
                </div>

                <div className="mt-3.5">
                  <div className="flex items-center justify-between text-xs font-semibold mb-1">
                    <span className="text-gray-500">
                      {item.current_points.toLocaleString("id-ID")} / {item.reward_target_points.toLocaleString("id-ID")}
                    </span>
                    <span className="text-teal-600 font-bold">{item.progress_percent.toFixed(1)}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-teal-500 to-emerald-400 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(item.progress_percent, 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4 border-t border-gray-50 pt-3 flex justify-between gap-2">
                <button
                  onClick={() => handleDelete(item.id)}
                  disabled={savingId === item.id}
                  className="inline-flex items-center gap-1 rounded-md border border-rose-100 px-2.5 py-1.5 text-xs font-bold text-rose-600 hover:bg-rose-50 disabled:opacity-60"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Hapus
                </button>
                <Link
                  href={`/admin/campaigns/${item.id}`}
                  className="inline-flex items-center gap-1 rounded-md bg-teal-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-teal-700"
                >
                  Detail
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </AdminShell>
  )
}
