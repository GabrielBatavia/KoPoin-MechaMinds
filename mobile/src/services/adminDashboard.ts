import type { Activity, DemoState, LeaderboardEntry, VerificationLog } from "../data/kopoinSeed";

export type AdminKpi = {
  label: string;
  value: string;
  helper: string;
};

export type AdminTeamPerformance = {
  teamId: string;
  teamName: string;
  rank: number;
  score: number;
  isCurrentTeam: boolean;
  scoreBreakdown: string;
};

export type AdminMissionPerformance = {
  missionTitle: string;
  completions: number;
  pointsIssued: number;
  latestUser: string;
};

export type AdminDashboardData = {
  kpis: AdminKpi[];
  campaignTitle: string;
  campaignStatus: string;
  progressCurrent: number;
  progressTarget: number;
  progressPercent: number;
  rewardTitle: string;
  remainingActions: number;
  activityFeed: Activity[];
  verificationLogs: VerificationLog[];
  teamPerformance: AdminTeamPerformance[];
  missionPerformance: AdminMissionPerformance[];
  syncNote: string;
};

export function createAdminDashboard(state: DemoState): AdminDashboardData {
  const activeMembers = countUnique(state.activityLedger.map((activity) => activity.userName));
  const missionCompletions = state.activityLedger.length;
  const totalKopoinIssued = sum(state.activityLedger.map((activity) => activity.pointsEarned));
  const verifiedLogCount = state.verificationLogs.filter((log) => log.status === "verified").length;
  const blockedLogCount = state.verificationLogs.filter((log) => log.status === "blocked").length;
  const rejectedLogCount = state.verificationLogs.filter((log) => log.status === "rejected").length;
  const progressPercent = Math.round((state.campaign.currentValue / state.campaign.targetValue) * 100);
  const votingParticipation = state.userVote ? 1 : 0;

  return {
    kpis: [
      {
        label: "Anggota Aktif",
        value: String(activeMembers),
        helper: "User unik dengan aktivitas ledger."
      },
      {
        label: "Misi Selesai",
        value: String(missionCompletions),
        helper: "Semua aksi verified di activity ledger."
      },
      {
        label: "Kopoin Dibagikan",
        value: formatCompactNumber(totalKopoinIssued),
        helper: "Total poin dari aksi verified."
      },
      {
        label: "Progress Campaign",
        value: `${state.campaign.currentValue}/${state.campaign.targetValue}`,
        helper: `${progressPercent}% menuju reward bersama.`
      },
      {
        label: "Log Valid",
        value: String(verifiedLogCount),
        helper: "Percobaan Gabriel yang lolos validasi."
      },
      {
        label: "Guard Aktif",
        value: `${blockedLogCount}/${rejectedLogCount}`,
        helper: "Blocked/rejected dari duplicate atau invalid."
      },
      {
        label: "Partisipasi Voting",
        value: String(votingParticipation),
        helper: state.userVote ? `Gabriel memilih ${state.userVote.optionLabel}.` : "Belum ada voting dari Gabriel."
      }
    ],
    campaignTitle: state.campaign.title,
    campaignStatus: state.campaign.status === "active" ? "Aktif" : state.campaign.status,
    progressCurrent: state.campaign.currentValue,
    progressTarget: state.campaign.targetValue,
    progressPercent,
    rewardTitle: state.campaign.rewardTitle,
    remainingActions: state.campaign.targetValue - state.campaign.currentValue,
    activityFeed: state.activityLedger.slice(0, 5),
    verificationLogs: state.verificationLogs.slice(0, 5),
    teamPerformance: createTeamPerformance(state.leaderboard, state.team.id),
    missionPerformance: createMissionPerformance(state.activityLedger),
    syncNote: state.latestActivity
      ? "Aksi Gabriel sudah sinkron ke KPI, ledger, log verifikasi, progress campaign, dan leaderboard."
      : "Menunggu aksi Gabriel dari QR/manual fallback untuk memperbarui KPI dashboard."
  };
}

function createTeamPerformance(leaderboard: LeaderboardEntry[], currentTeamId: string): AdminTeamPerformance[] {
  return leaderboard.map((entry) => ({
    teamId: entry.teamId,
    teamName: entry.teamName,
    rank: entry.rank,
    score: entry.score,
    isCurrentTeam: entry.teamId === currentTeamId,
    scoreBreakdown: `Konsistensi ${entry.breakdown.consistency}% · Aktif ${entry.breakdown.activeMembers}% · Produk ${entry.breakdown.localProduct}%`
  }));
}

function createMissionPerformance(activityLedger: Activity[]): AdminMissionPerformance[] {
  const missionMap = new Map<string, AdminMissionPerformance>();

  for (const activity of activityLedger) {
    const current = missionMap.get(activity.missionTitle);

    if (current) {
      current.completions += 1;
      current.pointsIssued += activity.pointsEarned;
      current.latestUser = activity.userName;
      continue;
    }

    missionMap.set(activity.missionTitle, {
      missionTitle: activity.missionTitle,
      completions: 1,
      pointsIssued: activity.pointsEarned,
      latestUser: activity.userName
    });
  }

  return Array.from(missionMap.values()).sort((left, right) => right.completions - left.completions);
}

function countUnique(values: string[]): number {
  return new Set(values).size;
}

function sum(values: number[]): number {
  return values.reduce((total, value) => total + value, 0);
}

function formatCompactNumber(value: number): string {
  return new Intl.NumberFormat("id-ID").format(value);
}
