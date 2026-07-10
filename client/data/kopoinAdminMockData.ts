import { useState, useEffect } from "react"

export interface CampaignData {
  campaign_id: string
  name: string
  status: string
  day_current: number
  day_total: number
  start_date: string
  end_date: string
  reward_name: string
  reward_target_points: number
  current_points: number
  progress_percent: number
}

export interface KpiData {
  active_members: number
  mission_completions: number
  total_kopoin_issued: number
  team_progress_percent: number
  qr_verifications: number
  voting_participation: number
  completion_rate_percent: number
  avg_missions_per_member: number
  repeat_participation_percent: number
  streak_users: number
}

export interface TeamLeaderboardEntry {
  rank: number
  team_id: string
  team_name: string
  members: number
  points: number
  missions_completed: number
  trend: string
}

export interface RecentActivity {
  activity_id: string
  user_name: string
  team_name: string
  mission_name: string
  points_awarded: number
  verification_type: "QR" | "manual"
  status: "verified" | "pending" | "rejected"
  timestamp: string
}

export interface MissionPerformance {
  mission_id: string
  mission_name: string
  completions: number
  participants: number
  points_generated: number
  impact_label: string
  difficulty: "Mudah" | "Sedang" | "Sukar"
}

// ----------------------------------------------------
// BEFORE SCAN MOCK DATA
// ----------------------------------------------------
export const beforeCampaignData: CampaignData = {
  campaign_id: "cmp_sukamaju_7hari",
  name: "7 Hari Dukung Produk Koperasi Sukamaju",
  status: "active",
  day_current: 4,
  day_total: 7,
  start_date: "2026-07-04",
  end_date: "2026-07-10",
  reward_name: "Voucher Produk Lokal Bersama",
  reward_target_points: 25000,
  current_points: 18300,
  progress_percent: 73.2,
}

export const beforeKpiData: KpiData = {
  active_members: 127,
  mission_completions: 341,
  total_kopoin_issued: 18300,
  team_progress_percent: 73.2,
  qr_verifications: 95,
  voting_participation: 84,
  completion_rate_percent: 68,
  avg_missions_per_member: 2.7,
  repeat_participation_percent: 46,
  streak_users: 51,
}

export const beforeTeamLeaderboard: TeamLeaderboardEntry[] = [
  {
    rank: 1,
    team_id: "team_kreatif_desa",
    team_name: "Tim Kreatif Desa",
    members: 19,
    points: 8100,
    missions_completed: 91,
    trend: "+8%",
  },
  {
    rank: 2,
    team_id: "team_koperasi_muda",
    team_name: "Tim Koperasi Muda",
    members: 21,
    points: 7800,
    missions_completed: 72,
    trend: "+5%",
  },
  {
    rank: 3,
    team_id: "team_pemuda_sukamaju",
    team_name: "Tim Pemuda Sukamaju",
    members: 24,
    points: 7700,
    missions_completed: 117,
    trend: "+10%",
  },
]

export const beforeRecentActivities: RecentActivity[] = [
  {
    activity_id: "act_002",
    user_name: "Nadia",
    team_name: "Tim Kreatif Desa",
    mission_name: "Ajak Anggota Aktif",
    points_awarded: 200,
    verification_type: "manual",
    status: "verified",
    timestamp: "2026-07-04 14:12",
  },
  {
    activity_id: "act_003",
    user_name: "Bima",
    team_name: "Tim Koperasi Muda",
    mission_name: "Check-in Koperasi",
    points_awarded: 100,
    verification_type: "QR",
    status: "verified",
    timestamp: "2026-07-04 14:05",
  },
]

export const beforeMissionsPerformance: MissionPerformance[] = [
  {
    mission_id: "mission_beli_produk_lokal",
    mission_name: "Beli Produk Lokal",
    completions: 131,
    participants: 75,
    points_generated: 9750,
    impact_label: "Paling berdampak",
    difficulty: "Mudah",
  },
  {
    mission_id: "mission_ajak_anggota",
    mission_name: "Ajak Anggota Aktif",
    completions: 64,
    participants: 39,
    points_generated: 4800,
    impact_label: "Akuisisi anggota",
    difficulty: "Sedang",
  },
  {
    mission_id: "mission_checkin",
    mission_name: "Check-in ke Koperasi",
    completions: 87,
    participants: 58,
    points_generated: 4350,
    impact_label: "Kunjungan fisik",
    difficulty: "Mudah",
  },
  {
    mission_id: "mission_belajar",
    mission_name: "Selesaikan Pembelajaran",
    completions: 59,
    participants: 44,
    points_generated: 2950,
    impact_label: "Literasi koperasi",
    difficulty: "Mudah",
  },
]

// ----------------------------------------------------
// AFTER SCAN MOCK DATA
// ----------------------------------------------------
export const afterCampaignData: CampaignData = {
  ...beforeCampaignData,
  current_points: 18450,
  progress_percent: 73.8,
}

export const afterKpiData: KpiData = {
  active_members: 128,
  mission_completions: 342,
  total_kopoin_issued: 18450,
  team_progress_percent: 73.8,
  qr_verifications: 96,
  voting_participation: 84,
  completion_rate_percent: 68,
  avg_missions_per_member: 2.7,
  repeat_participation_percent: 46,
  streak_users: 51,
}

export const afterTeamLeaderboard: TeamLeaderboardEntry[] = [
  {
    rank: 1,
    team_id: "team_kreatif_desa",
    team_name: "Tim Kreatif Desa",
    members: 19,
    points: 8100,
    missions_completed: 91,
    trend: "+8%",
  },
  {
    rank: 2,
    team_id: "team_pemuda_sukamaju",
    team_name: "Tim Pemuda Sukamaju",
    members: 24,
    points: 7850,
    missions_completed: 118,
    trend: "+12%",
  },
  {
    rank: 3,
    team_id: "team_koperasi_muda",
    team_name: "Tim Koperasi Muda",
    members: 21,
    points: 7800,
    missions_completed: 72,
    trend: "+5%",
  },
]

export const afterRecentActivities: RecentActivity[] = [
  {
    activity_id: "act_001",
    user_name: "Gabriel",
    team_name: "Tim Pemuda Sukamaju",
    mission_name: "Beli Produk Lokal",
    points_awarded: 150,
    verification_type: "QR",
    status: "verified",
    timestamp: "2026-07-04 14:20",
  },
  ...beforeRecentActivities,
]

export const afterMissionsPerformance: MissionPerformance[] = [
  {
    mission_id: "mission_beli_produk_lokal",
    mission_name: "Beli Produk Lokal",
    completions: 132,
    participants: 76,
    points_generated: 9900,
    impact_label: "Paling berdampak",
    difficulty: "Mudah",
  },
  ...beforeMissionsPerformance.slice(1),
]

// ----------------------------------------------------
// DEMO STATE HOOK & PERSISTENCE
// ----------------------------------------------------
const DEMO_STATE_KEY = "kopoin_demo_state_is_after"

export function useDemoState() {
  const [isAfter, setIsAfter] = useState<boolean>(false)
  const [isMounted, setIsMounted] = useState<boolean>(false)

  useEffect(() => {
    setIsMounted(true)
    const stored = localStorage.getItem(DEMO_STATE_KEY)
    setIsAfter(stored === "true")

    const handleStateChange = () => {
      const current = localStorage.getItem(DEMO_STATE_KEY)
      setIsAfter(current === "true")
    }

    window.addEventListener("demoStateChange", handleStateChange)
    window.addEventListener("storage", handleStateChange)

    return () => {
      window.removeEventListener("demoStateChange", handleStateChange)
      window.removeEventListener("storage", handleStateChange)
    }
  }, [])

  const setDemoState = (value: boolean) => {
    localStorage.setItem(DEMO_STATE_KEY, String(value))
    setIsAfter(value)
    window.dispatchEvent(new Event("demoStateChange"))
  }

  // Get active dataset based on state
  const campaign = isAfter ? afterCampaignData : beforeCampaignData
  const kpis = isAfter ? afterKpiData : beforeKpiData
  const leaderboard = isAfter ? afterTeamLeaderboard : beforeTeamLeaderboard
  const activities = isAfter ? afterRecentActivities : beforeRecentActivities
  const missions = isAfter ? afterMissionsPerformance : beforeMissionsPerformance
  const mapData = getIndonesiaGeoJSON(isAfter)

  return {
    isAfter,
    setDemoState,
    campaign,
    kpis,
    leaderboard,
    activities,
    missions,
    mapData,
    isMounted,
  }
}

// ----------------------------------------------------
// GEOGRAPHIC DATA: INDONESIA SIMPLIFIED MAP
// ----------------------------------------------------
import type { FeatureCollection, Geometry } from "geojson"

export interface IndonesiaMapProperties {
  name: string
  cooperativeName: string
  completions: number
  points: number
  [key: string]: unknown
}

export function getIndonesiaGeoJSON(isAfter: boolean): FeatureCollection<Geometry, IndonesiaMapProperties> {
  return {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        id: "sumatera",
        properties: {
          name: "Sumatera",
          cooperativeName: "Koperasi Makmur Sumatera",
          completions: 120,
          points: 4800,
        },
        geometry: {
          type: "Polygon",
          coordinates: [
            [[95.0, 5.5], [98.0, 2.0], [101.0, -0.5], [105.0, -5.5], [106.0, -6.0], [104.0, -4.5], [101.0, -1.5], [97.0, 2.5], [95.0, 5.5]]
          ]
        }
      },
      {
        type: "Feature",
        id: "jawa",
        properties: {
          name: "Jawa",
          cooperativeName: "Koperasi Sukamaju Jawa",
          completions: isAfter ? 342 : 341,
          points: isAfter ? 18450 : 18300,
        },
        geometry: {
          type: "Polygon",
          coordinates: [
            [[105.0, -6.0], [115.0, -8.0], [115.5, -8.5], [114.0, -8.5], [105.5, -6.8], [105.0, -6.0]]
          ]
        }
      },
      {
        type: "Feature",
        id: "kalimantan",
        properties: {
          name: "Kalimantan",
          cooperativeName: "Koperasi Lestari Kalimantan",
          completions: 95,
          points: 3800,
        },
        geometry: {
          type: "Polygon",
          coordinates: [
            [[109.0, 2.0], [112.0, 4.5], [118.0, 4.0], [119.0, 2.0], [117.5, -3.5], [114.5, -4.2], [111.5, -3.0], [109.0, 0.5], [109.0, 2.0]]
          ]
        }
      },
      {
        type: "Feature",
        id: "sulawesi",
        properties: {
          name: "Sulawesi",
          cooperativeName: "Koperasi Mandiri Sulawesi",
          completions: 84,
          points: 3360,
        },
        geometry: {
          type: "Polygon",
          coordinates: [
            [[119.5, -1.5], [121.0, 1.2], [125.0, 1.5], [124.0, 0.8], [121.0, 0.2], [124.5, -3.0], [123.0, -5.5], [120.0, -5.8], [119.2, -3.5], [119.5, -1.5]]
          ]
        }
      },
      {
        type: "Feature",
        id: "papua",
        properties: {
          name: "Papua",
          cooperativeName: "Koperasi Cendrawasih Papua",
          completions: 52,
          points: 2080,
        },
        geometry: {
          type: "Polygon",
          coordinates: [
            [[131.0, -1.0], [135.0, -1.5], [140.5, -2.5], [141.0, -9.0], [137.0, -6.5], [134.5, -4.0], [131.5, -1.8], [131.0, -1.0]]
          ]
        }
      }
    ]
  }
}
