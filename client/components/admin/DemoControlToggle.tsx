import React from "react"
import { useDemoState } from "@/data/kopoinAdminMockData"
import { Play, RotateCcw, AlertCircle } from "lucide-react"

export function DemoControlToggle() {
  const { isAfter, setDemoState, isMounted } = useDemoState()

  if (!isMounted) return null

  return (
    <div className="rounded-xl border border-teal-100 bg-teal-50/30 p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex items-start gap-2.5">
        <AlertCircle className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-bold text-teal-900">Panel Kontrol Simulasi Demo</h4>
          <p className="text-xs text-teal-700 mt-0.5">
            Gunakan tombol di samping untuk mensimulasikan alur presentasi di hadapan juri.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-xs font-semibold mr-2 flex items-center gap-1.5 bg-white px-2.5 py-1.5 rounded-lg border border-gray-100">
          <span>Status:</span>
          <span className={`inline-flex items-center gap-1 rounded-sm px-1.5 py-0.2 ${isAfter ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}>
            {isAfter ? "Sesudah Scan QR Gabriel" : "Sebelum Scan QR Gabriel"}
          </span>
        </div>

        {!isAfter ? (
          <button
            onClick={() => setDemoState(true)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-teal-600 px-4 py-2 text-xs font-bold text-white hover:bg-teal-700 active:bg-teal-800 shadow-xs cursor-pointer transition-colors duration-150"
          >
            <Play className="h-3.5 w-3.5 fill-white" />
            Simulasikan Scan QR Gabriel (+150 Pts)
          </button>
        ) : (
          <button
            onClick={() => setDemoState(false)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-gray-200 px-4 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50 active:bg-gray-100 shadow-xs cursor-pointer transition-colors duration-150"
          >
            <RotateCcw className="h-3.5 w-3.5 text-gray-500" />
            Reset State Demo
          </button>
        )}
      </div>
    </div>
  )
}
