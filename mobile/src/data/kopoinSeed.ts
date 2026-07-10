export type User = {
  id: string;
  name: string;
  ageGroup: string;
  memberNo: string;
  cooperativeId: string;
  teamId: string | null;
  level: number;
  kopoinBalance: number;
  monthlySaving: number;
  status: string;
  streakLabel: string;
  achievementUnlocked: boolean;
};

export type Cooperative = {
  id: string;
  name: string;
  location: string;
};

export type Team = {
  id: string;
  name: string;
  members: number;
  activeMembers: number;
};

export type Campaign = {
  id: string;
  title: string;
  cooperativeId: string;
  targetValue: number;
  currentValue: number;
  rewardTitle: string;
  deadlineLabel: string;
  status: "active";
};

export type Mission = {
  id: string;
  campaignId: string;
  title: string;
  description: string;
  points: number;
  actionType: "qr_scan" | "learning" | "vote";
  deadlineLabel: string;
  productName?: string;
  priority: "P0" | "P1";
  current?: number;
  target?: number;
  completed?: boolean;
};

export type Community = {
  id: string;
  name: string;
  formedDate: string;
  formedTime: string;
  membersCount: number;
  about: string;
  locationName: string;
  locationAddress: string;
  avatarUris: string[];
  tag: string;
};

export type Transaction = {
  id: string;
  title: string;
  date: string;
  type: "grocery" | "points_redemption" | "points_earn";
  amountText: string;
  pointsBadge?: string;
  iconName: "grocery" | "points" | "rewards";
  subtitle: string;
};

export type LeaderboardEntry = {
  teamId: string;
  teamName: string;
  rank: number;
  score: number;
  breakdown: {
    consistency: number;
    activeMembers: number;
    localProduct: number;
    learningVoting: number;
  };
};

export type Activity = {
  id: string;
  qrCode: string;
  userName: string;
  teamName: string;
  missionTitle: string;
  productName: string;
  pointsEarned: number;
  verificationType: "QR" | "Manual Code";
  status: "verified";
  timestamp: string;
};

export type VerificationStatus = "verified" | "rejected" | "blocked";

export type VerificationLog = {
  id: string;
  qrCode: string;
  userName: string;
  missionTitle: string;
  status: VerificationStatus;
  reason: string;
  timestamp: string;
};

export type CompletionSummary = {
  qrCode: string;
  productName: string;
  pointsEarned: number;
  balanceBefore: number;
  balanceAfter: number;
  progressBefore: number;
  progressAfter: number;
  progressTarget: number;
  rankBefore: number;
  rankAfter: number;
  scoreBefore: number;
  scoreAfter: number;
  achievementTitle: string;
  timestamp: string;
};

export type VoteOption = {
  id: string;
  label: string;
  percent: number;
  votes: number;
};

export type VotePoll = {
  id: string;
  title: string;
  note: string;
  options: VoteOption[];
};

export type Coupon = {
  id: string;
  title: string;
  originalPrice: string;
  promoPrice: string;
  points: number;
  merchant: string;
  emoji: string;
  category: string;
  tags: string[];
};

export type UserVote = {
  pollId: string;
  optionId: string;
  optionLabel: string;
  submittedAt: string;
};

export type DemoState = {
  hasJoinedTeam: boolean;
  scanCompleted: boolean;
  user: User;
  cooperative: Cooperative;
  team: Team;
  campaign: Campaign;
  missions: Mission[];
  leaderboard: LeaderboardEntry[];
  activityLedger: Activity[];
  latestActivity: Activity | null;
  latestCompletion: CompletionSummary | null;
  usedQrCodes: string[];
  userVote: UserVote | null;
  verificationLogs: VerificationLog[];
  votePoll: VotePoll;
  redeemedCoupons?: string[];
  coupons?: Coupon[];
  hasJoinedCommunity?: boolean;
  communities?: Community[];
  transactions?: Transaction[];
};

export const acceptedQrCodes = ["KOPI-SUKAMAJU-001", "KOPI-SUKAMAJU-QR-001"];

export const mainMissionId = "mis_beli_kopi_sukamaju";

const leaderboardBefore: LeaderboardEntry[] = [
  {
    teamId: "team_kreatif_desa",
    teamName: "Tim Kreatif Desa",
    rank: 1,
    score: 8040,
    breakdown: {
      consistency: 31,
      activeMembers: 27,
      localProduct: 24,
      learningVoting: 14
    }
  },
  {
    teamId: "team_koperasi_muda",
    teamName: "Tim Koperasi Muda",
    rank: 2,
    score: 7920,
    breakdown: {
      consistency: 30,
      activeMembers: 26,
      localProduct: 24,
      learningVoting: 13
    }
  },
  {
    teamId: "team_pemuda_sukamaju",
    teamName: "Tim Pemuda Sukamaju",
    rank: 3,
    score: 7810,
    breakdown: {
      consistency: 29,
      activeMembers: 25,
      localProduct: 23,
      learningVoting: 12
    }
  }
];

export const leaderboardAfter: LeaderboardEntry[] = [
  {
    teamId: "team_kreatif_desa",
    teamName: "Tim Kreatif Desa",
    rank: 1,
    score: 8040,
    breakdown: {
      consistency: 31,
      activeMembers: 27,
      localProduct: 24,
      learningVoting: 14
    }
  },
  {
    teamId: "team_pemuda_sukamaju",
    teamName: "Tim Pemuda Sukamaju",
    rank: 2,
    score: 7930,
    breakdown: {
      consistency: 32,
      activeMembers: 28,
      localProduct: 25,
      learningVoting: 15
    }
  },
  {
    teamId: "team_koperasi_muda",
    teamName: "Tim Koperasi Muda",
    rank: 3,
    score: 7920,
    breakdown: {
      consistency: 30,
      activeMembers: 26,
      localProduct: 24,
      learningVoting: 13
    }
  }
];

export function createInitialDemoState(): DemoState {
  return {
    hasJoinedTeam: false,
    scanCompleted: false,
    user: {
      id: "usr_gabriel",
      name: "Gabriel",
      ageGroup: "Gen Z",
      memberNo: "KMP-SKM-0001",
      cooperativeId: "coop_sukamaju",
      teamId: null,
      level: 3,
      kopoinBalance: 1730,
      monthlySaving: 37500,
      status: "Anggota Aktif",
      streakLabel: "3 minggu dukung produk desa",
      achievementUnlocked: false
    },
    cooperative: {
      id: "coop_sukamaju",
      name: "Koperasi Merah Putih Sukamaju",
      location: "Desa Sukamaju"
    },
    team: {
      id: "team_pemuda_sukamaju",
      name: "Tim Pemuda Sukamaju",
      members: 24,
      activeMembers: 18
    },
    campaign: {
      id: "camp_7hari_produk_lokal",
      title: "7 Hari Dukung Produk Koperasi Sukamaju",
      cooperativeId: "coop_sukamaju",
      targetValue: 100,
      currentValue: 73,
      rewardTitle: "Kupon Bersama Produk Lokal",
      deadlineLabel: "Berakhir 7 Juli 2026",
      status: "active"
    },
    missions: [
      {
        id: mainMissionId,
        campaignId: "camp_7hari_produk_lokal",
        title: "Beli Produk Lokal",
        description: "Beli Kopi Sukamaju dan input kode QR transaksi demo.",
        points: 120,
        actionType: "qr_scan",
        deadlineLabel: "Sampai 7 Juli",
        productName: "Kopi Sukamaju",
        priority: "P0"
      },
      {
        id: "mis_belajar_koperasi",
        campaignId: "camp_7hari_produk_lokal",
        title: "Belajar Koperasi 5 Menit",
        description: "Selesaikan materi ringan tentang manfaat koperasi desa.",
        points: 60,
        actionType: "learning",
        deadlineLabel: "Minggu ini",
        priority: "P1"
      },
      {
        id: "mis_vote_reward",
        campaignId: "camp_7hari_produk_lokal",
        title: "Pilih Reward Berikutnya",
        description: "Ikut voting campaign atau reward komunitas berikutnya.",
        points: 30,
        actionType: "vote",
        deadlineLabel: "Hari ini",
        priority: "P1"
      }
    ],
    leaderboard: leaderboardBefore,
    activityLedger: createBaselineActivities(),
    latestActivity: null,
    latestCompletion: null,
    usedQrCodes: [],
    userVote: null,
    verificationLogs: [],
    redeemedCoupons: [],
    votePoll: {
      id: "poll_reward_berikutnya",
      title: "Pilih reward komunitas berikutnya",
      note: "Voting ini untuk campaign dan reward komunitas, bukan keputusan formal RAT.",
      options: [
        { id: "reward_kopi", label: "Kupon Kopi Sukamaju", percent: 48, votes: 48 },
        { id: "reward_sembako", label: "Paket Sembako Lokal", percent: 32, votes: 32 },
        { id: "reward_merch", label: "Merch Tim Pemuda", percent: 20, votes: 20 }
      ]
    }
  };
}

export function createVerifiedActivity(qrCode: string): Activity {
  return {
    id: "act_gabriel_kopi_sukamaju",
    qrCode,
    userName: "Gabriel",
    teamName: "Tim Pemuda Sukamaju",
    missionTitle: "Beli Produk Lokal",
    productName: "Kopi Sukamaju",
    pointsEarned: 120,
    verificationType: "Manual Code",
    status: "verified",
    timestamp: "2026-07-04 14:20"
  };
}

export function createVerificationLog(
  qrCode: string,
  status: VerificationStatus,
  reason: string,
  timestamp = "2026-07-04 14:20"
): VerificationLog {
  return {
    id: `verify_${status}_${qrCode.toLowerCase().replace(/[^a-z0-9]+/g, "_")}_${timestamp.replace(/[^0-9]+/g, "")}`,
    qrCode,
    userName: "Gabriel",
    missionTitle: "Beli Produk Lokal",
    status,
    reason,
    timestamp
  };
}

function createBaselineActivities(): Activity[] {
  return [
    {
      id: "act_nadia_ajak_anggota",
      qrCode: "MANUAL-REF-NADIA-001",
      userName: "Nadia",
      teamName: "Tim Kreatif Desa",
      missionTitle: "Ajak Anggota Aktif",
      productName: "Referral Komunitas",
      pointsEarned: 80,
      verificationType: "Manual Code",
      status: "verified",
      timestamp: "2026-07-04 14:12"
    },
    {
      id: "act_bima_checkin_koperasi",
      qrCode: "CHECKIN-SUKAMAJU-001",
      userName: "Bima",
      teamName: "Tim Koperasi Muda",
      missionTitle: "Check-in Koperasi",
      productName: "Koperasi Sukamaju",
      pointsEarned: 60,
      verificationType: "QR",
      status: "verified",
      timestamp: "2026-07-04 14:05"
    }
  ];
}
