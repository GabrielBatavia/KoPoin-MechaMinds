import { CampaignData } from "../entities/campaign"
import { TeamLeaderboardEntry } from "../entities/team"
import { RecentActivity } from "../entities/activity"
import { MissionPerformance } from "../entities/mission"

export interface CampaignRepository {
  getCampaign(campaignId: string): Promise<CampaignData>
  getLeaderboard(): Promise<TeamLeaderboardEntry[]>
  getRecentActivities(): Promise<RecentActivity[]>
  getMissionsPerformance(): Promise<MissionPerformance[]>
}
