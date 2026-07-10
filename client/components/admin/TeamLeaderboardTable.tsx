import React from "react"
import { TeamLeaderboardEntry } from "@/data/kopoinAdminMockData"
import { Award, ArrowUp, Users, CheckCircle2 } from "lucide-react"

export interface TeamLeaderboardTableProps {
  teams: TeamLeaderboardEntry[]
  compact?: boolean
}

export function TeamLeaderboardTable({ teams, compact = false }: TeamLeaderboardTableProps) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white shadow-xs overflow-hidden">
      <div className="border-b border-gray-50 bg-gray-50/50 px-5 py-4 flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
          <Award className="h-4 w-4 text-amber-500" />
          Peringkat Tim Komunitas
        </h3>
        {compact && (
          <span className="text-xs text-gray-400 font-medium">3 Tim Teraktif</span>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 text-xs font-semibold uppercase tracking-wider text-gray-400 bg-gray-50/20">
              <th className="px-5 py-3 text-center w-12">Rank</th>
              <th className="px-5 py-3">Nama Tim</th>
              <th className="px-5 py-3 text-center">Anggota</th>
              <th className="px-5 py-3 text-right">Kopoin</th>
              {!compact && <th className="px-5 py-3 text-center">Misi Selesai</th>}
              <th className="px-5 py-3 text-center w-20">Tren</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-sm">
            {teams.map((team) => {
              const isTargetTeam = team.team_id === "team_pemuda_sukamaju"

              return (
                <tr
                  key={team.team_id}
                  className={`transition-colors duration-150 hover:bg-gray-50/40 ${
                    isTargetTeam ? "bg-teal-50/20 font-medium" : ""
                  }`}
                >
                  <td className="px-5 py-3.5 text-center">
                    <span
                      className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                        team.rank === 1
                          ? "bg-amber-100 text-amber-800"
                          : team.rank === 2
                          ? "bg-slate-100 text-slate-800"
                          : "bg-orange-100 text-orange-800"
                      }`}
                    >
                      {team.rank}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-900 font-bold">{team.team_name}</span>
                      {isTargetTeam && (
                        <span className="inline-flex items-center rounded-sm bg-teal-100 px-1.5 py-0.2 text-[10px] font-bold text-teal-800 uppercase">
                          Tim Gabriel
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-center text-gray-500 font-medium">
                    <div className="flex items-center justify-center gap-1">
                      <Users className="h-3.5 w-3.5" />
                      {team.members}
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-right font-semibold text-gray-900">
                    {team.points.toLocaleString("id-ID")} pts
                  </td>
                  {!compact && (
                    <td className="px-5 py-3.5 text-center text-gray-600 font-medium">
                      <div className="flex items-center justify-center gap-1">
                        <CheckCircle2 className="h-3.5 w-3.5 text-teal-600" />
                        {team.missions_completed}
                      </div>
                    </td>
                  )}
                  <td className="px-5 py-3.5 text-center">
                    <span className="inline-flex items-center gap-0.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-sm">
                      <ArrowUp className="h-3 w-3" />
                      {team.trend}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
