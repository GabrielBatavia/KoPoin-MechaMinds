"use client"

import { useCallback, useEffect, useState } from "react"
import { api } from "@/lib/api"

export interface CampaignData {
  campaign_id: string
  id: string
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
  cooperative_id: string
  description: string
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
  team_id?: string
  team_name: string
  mission_name: string
  points_awarded: number
  verification_type: "QR" | "manual"
  status: "verified" | "pending" | "rejected"
  timestamp: string
  qr_code?: string
}

export interface MissionPerformance {
  mission_id: string
  campaign_id: string
  mission_name: string
  title: string
  description: string
  points: number
  completions: number
  participants: number
  points_generated: number
  impact_label: string
  difficulty: "Mudah" | "Sedang" | "Sukar"
  action_type: "qr_scan" | "learning" | "vote"
  deadline_label: string
  product_name: string | null
  priority: "P0" | "P1"
  qr_code: string | null
  target: number
}

export interface VoteOptionData {
  id: string
  poll_id: string
  label: string
  votes: number
  percent: number
}

export interface CouponData {
  id: string
  title: string
  originalPrice: string
  promoPrice: string
  points: number
  merchant: string
  emoji: string
  category: string
  tags: string[]
  active: boolean
}

export interface AdminDashboardData {
  campaign?: CampaignData
  campaigns: CampaignData[]
  kpis: KpiData
  leaderboard: TeamLeaderboardEntry[]
  activities: RecentActivity[]
  missions: MissionPerformance[]
  voteOptions: VoteOptionData[]
  coupons: CouponData[]
}

export type CampaignInput = {
  id?: string
  title: string
  cooperativeId?: string
  targetValue: number
  currentValue: number
  rewardTitle: string
  deadlineLabel: string
  status: string
}

export type MissionInput = {
  id?: string
  campaignId: string
  title: string
  description: string
  points: number
  actionType: "qr_scan" | "learning" | "vote"
  deadlineLabel: string
  productName?: string
  priority: "P0" | "P1"
  qrCode?: string
  target: number
}

export type CouponInput = {
  id?: string
  title: string
  originalPrice: string
  promoPrice: string
  points: number
  merchant: string
  emoji: string
  category: string
  tags: string[]
  active: boolean
}

export type VoteOptionInput = {
  id?: string
  pollId?: string
  label: string
  votes: number
}

const emptyKpis: KpiData = {
  active_members: 0,
  mission_completions: 0,
  total_kopoin_issued: 0,
  team_progress_percent: 0,
  qr_verifications: 0,
  voting_participation: 0,
  completion_rate_percent: 0,
  avg_missions_per_member: 0,
  repeat_participation_percent: 0,
  streak_users: 0,
}

export const emptyAdminDashboard: AdminDashboardData = {
  campaigns: [],
  kpis: emptyKpis,
  leaderboard: [],
  activities: [],
  missions: [],
  voteOptions: [],
  coupons: [],
}

export function useAdminDashboard() {
  const [data, setData] = useState<AdminDashboardData>(emptyAdminDashboard)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const nextData = await api.get<unknown, AdminDashboardData>("/api/v1/admin/dashboard")
      setData(nextData)
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Gagal memuat data admin.")
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  return { data, isLoading, error, refresh, setData }
}

export async function createCampaign(payload: CampaignInput) {
  return api.post<unknown, CampaignData[]>("/api/v1/admin/campaigns", payload)
}

export async function updateCampaign(id: string, payload: Partial<CampaignInput>) {
  return api.patch<unknown, CampaignData[]>(`/api/v1/admin/campaigns/${id}`, payload)
}

export async function deleteCampaign(id: string) {
  return api.delete<unknown, CampaignData[]>(`/api/v1/admin/campaigns/${id}`)
}

export async function createMission(payload: MissionInput) {
  return api.post<unknown, MissionPerformance[]>("/api/v1/admin/missions", payload)
}

export async function updateMission(id: string, payload: Partial<MissionInput>) {
  return api.patch<unknown, MissionPerformance[]>(`/api/v1/admin/missions/${id}`, payload)
}

export async function deleteMission(id: string) {
  return api.delete<unknown, MissionPerformance[]>(`/api/v1/admin/missions/${id}`)
}

export async function createCoupon(payload: CouponInput) {
  return api.post<unknown, CouponData[]>("/api/v1/admin/coupons", payload)
}

export async function updateCoupon(id: string, payload: Partial<CouponInput>) {
  return api.patch<unknown, CouponData[]>(`/api/v1/admin/coupons/${id}`, payload)
}

export async function deleteCoupon(id: string) {
  return api.delete<unknown, CouponData[]>(`/api/v1/admin/coupons/${id}`)
}

export async function createVoteOption(payload: VoteOptionInput) {
  return api.post<unknown, VoteOptionData[]>("/api/v1/admin/vote-options", payload)
}

export async function updateVoteOption(id: string, payload: Partial<VoteOptionInput>) {
  return api.patch<unknown, VoteOptionData[]>(`/api/v1/admin/vote-options/${id}`, payload)
}

export async function deleteVoteOption(id: string) {
  return api.delete<unknown, VoteOptionData[]>(`/api/v1/admin/vote-options/${id}`)
}
