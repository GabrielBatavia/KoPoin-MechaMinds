import type { DemoState } from "../data/kopoinSeed";

export type TeamWrapData = {
  achievementTitle: string;
  campaignTitle: string;
  cta: string;
  generatedAtLabel: string;
  hasCompletedMission: boolean;
  hasVote: boolean;
  headline: string;
  pointsEarned: number;
  productName: string;
  progressCurrent: number;
  progressPercent: number;
  progressTarget: number;
  rank: number;
  remainingActions: number;
  score: number;
  teamName: string;
  voteLabel: string;
};

export function createTeamWrap(state: DemoState): TeamWrapData {
  const currentTeam = state.leaderboard.find((entry) => entry.teamId === state.team.id);
  const progressPercent = Math.round((state.campaign.currentValue / state.campaign.targetValue) * 100);
  const hasCompletedMission = Boolean(state.latestCompletion);
  const rank = currentTeam?.rank ?? 3;

  return {
    achievementTitle: state.latestCompletion?.achievementTitle ?? "Anak Lokal, Selera Global",
    campaignTitle: state.campaign.title,
    cta: "Ayo ikut dukung produk koperasi lokal!",
    generatedAtLabel: state.latestCompletion?.timestamp ?? "Siap dibuat setelah aksi pertama",
    hasCompletedMission,
    hasVote: Boolean(state.userVote),
    headline: hasCompletedMission ? `${state.team.name} naik ke #${rank}` : `${state.team.name} siap bergerak`,
    pointsEarned: state.latestCompletion?.pointsEarned ?? 0,
    productName: state.latestCompletion?.productName ?? "Kopi Sukamaju",
    progressCurrent: state.campaign.currentValue,
    progressPercent,
    progressTarget: state.campaign.targetValue,
    rank,
    remainingActions: state.campaign.targetValue - state.campaign.currentValue,
    score: currentTeam?.score ?? 7810,
    teamName: state.team.name,
    voteLabel: state.userVote?.optionLabel ?? "Belum memilih reward berikutnya"
  };
}
