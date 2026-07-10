import React from "react"
import { MissionPerformance } from "@/data/kopoinAdminApi"
import { Target, Star } from "lucide-react"

export interface MissionPerformanceListProps {
  missions: MissionPerformance[]
}

export function MissionPerformanceList({ missions }: MissionPerformanceListProps) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white shadow-xs overflow-hidden">
      <div className="border-b border-gray-50 bg-gray-50/50 px-5 py-4 flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
          <Target className="h-4 w-4 text-emerald-600" />
          Kinerja Misi Koperasi
        </h3>
        <span className="text-xs text-gray-400 font-medium">Analisis Engagement</span>
      </div>

      <div className="divide-y divide-gray-50 p-2">
        {missions.map((mis) => {
          const isBeliProduk = mis.mission_id === "mission_beli_produk_lokal"

          return (
            <div
              key={mis.mission_id}
              className={`p-3 rounded-lg transition-colors flex items-center justify-between gap-3 hover:bg-gray-50/40 ${
                isBeliProduk ? "bg-emerald-50/10" : ""
              }`}
            >
              <div className="flex items-start gap-3 min-w-0">
                <div className={`mt-0.5 rounded-lg p-2 shrink-0 ${
                  isBeliProduk ? "bg-emerald-50 text-emerald-600" : "bg-gray-50 text-gray-400"
                }`}>
                  <Target className="h-4 w-4" />
                </div>
                
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-bold text-gray-900 text-sm truncate" title={mis.mission_name}>
                      {mis.mission_name}
                    </span>
                    <span className={`inline-flex items-center rounded-sm px-1.5 py-0.5 text-[10px] font-semibold shrink-0 ${
                      mis.difficulty === "Mudah"
                        ? "bg-green-50 text-green-700"
                        : mis.difficulty === "Sedang"
                        ? "bg-amber-50 text-amber-700"
                        : "bg-rose-50 text-rose-700"
                    }`}>
                      {mis.difficulty}
                    </span>
                    <span className="inline-flex items-center rounded-sm bg-slate-50 px-1.5 py-0.5 text-[10px] font-medium text-slate-600 border border-slate-100 shrink-0">
                      {mis.impact_label}
                    </span>
                  </div>
 
                  <div className="text-xs text-gray-500 mt-1 flex items-center gap-2 flex-wrap">
                    <span>{mis.completions}x selesai</span>
                    <span className="text-gray-300">•</span>
                    <span>{mis.participants} anggota</span>
                  </div>

                  {isBeliProduk && (
                    <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1 mt-1 bg-emerald-50/50 border border-emerald-100/50 rounded px-1.5 py-0.5 w-max">
                      <Star className="h-2.5 w-2.5 fill-emerald-500 text-emerald-500" />
                      Misi Terpopuler
                    </span>
                  )}
                </div>
              </div>

              <div className="text-right shrink-0">
                <div className="font-bold text-gray-900 text-sm">
                  +{mis.points_generated.toLocaleString("id-ID")}
                </div>
                <div className="text-[10px] text-gray-400 font-medium">Kopoin</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
