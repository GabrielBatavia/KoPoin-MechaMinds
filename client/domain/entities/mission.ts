export interface MissionPerformance {
  mission_id: string
  mission_name: string
  completions: number
  participants: number
  points_generated: number
  impact_label: string
  difficulty: "Mudah" | "Sedang" | "Sukar"
}
