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
