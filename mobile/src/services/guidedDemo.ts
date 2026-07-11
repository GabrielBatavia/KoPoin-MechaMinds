import type { DemoState } from "../data/kopoinSeed";

export type GuidedTourScreen = "home" | "mission" | "profile" | "team_wrap" | "console";
export type GuidedTourRequiredAction = "join_team" | "scan_demo_code" | "submit_vote" | null;
export type GuidedCardPlacement = "top" | "bottom" | "center";

export type GuidedDemoState = {
  isActive: boolean;
  currentCheckpoint: number;
  completedCheckpoints: number[];
  targetScreen: GuidedTourScreen;
  requiredAction: GuidedTourRequiredAction;
  isRequiredActionCompleted: boolean;
  allowFreeInteraction: boolean;
  isFinished: boolean;
  demoSessionId: string;
};

export type GuidedCheckpoint = {
  id: string;
  order: number;
  title: string;
  description: string;
  targetScreen: GuidedTourScreen;
  targetKey: string | null;
  requiredAction: GuidedTourRequiredAction;
  placement: GuidedCardPlacement;
  scrollY: number;
  actionHint?: string;
  isCompleted: (appState: DemoState) => boolean;
};

export const guidedDemoCheckpoints: readonly GuidedCheckpoint[] = [
  {
    id: "purpose",
    order: 1,
    title: "Kopoin menghidupkan partisipasi",
    description: "Kopoin adalah lapisan aktivasi anggota muda: bukan dompet, tetapi penghubung antara aksi anggota, progres komunitas, reward, dan data koperasi.",
    targetScreen: "home",
    targetKey: null,
    requiredAction: null,
    placement: "center",
    scrollY: 0,
    isCompleted: () => true
  },
  {
    id: "member-value",
    order: 2,
    title: "Manfaat anggota terlihat sejak beranda",
    description: "Identitas anggota, Kopoin, dan akses layanan berada dalam satu pengalaman yang dekat dengan kebiasaan pengguna muda.",
    targetScreen: "home",
    targetKey: "home.balance",
    requiredAction: null,
    placement: "bottom",
    scrollY: 0,
    isCompleted: () => true
  },
  {
    id: "join-team",
    order: 3,
    title: "Anggota bergerak melalui tim",
    description: "Tim membuat kontribusi pribadi menjadi bagian dari identitas dan target bersama desa, kampus, organisasi, atau komunitas.",
    targetScreen: "home",
    targetKey: "home.join-team",
    requiredAction: "join_team",
    placement: "top",
    scrollY: 300,
    actionHint: "Tekan kartu yang disorot untuk bergabung.",
    isCompleted: (appState) => appState.hasJoinedTeam && appState.user.teamId === appState.team.id
  },
  {
    id: "mission-context",
    order: 4,
    title: "Misi memberi alasan untuk kembali",
    description: "Ajakan koperasi diterjemahkan menjadi aksi yang jelas, terukur, dan terkait langsung dengan produk serta target campaign.",
    targetScreen: "mission",
    targetKey: "mission.campaign",
    requiredAction: null,
    placement: "bottom",
    scrollY: 0,
    isCompleted: () => true
  },
  {
    id: "verify-action",
    order: 5,
    title: "Kontribusi harus dapat diverifikasi",
    description: "QR atau kode transaksi memastikan kontribusi bukan sekadar klaim. Duplicate guard mencegah satu aksi dihitung dua kali.",
    targetScreen: "mission",
    targetKey: "mission.scan",
    requiredAction: "scan_demo_code",
    placement: "top",
    scrollY: 2600,
    actionHint: "Tekan Scan Kode Demo pada area yang disorot.",
    isCompleted: (appState) =>
      appState.scanCompleted && appState.verificationLogs.some((log) => log.status === "verified")
  },
  {
    id: "impact",
    order: 6,
    title: "Satu aksi mengubah banyak hal",
    description: "Poin anggota bertambah, progres campaign bergerak, achievement terbuka, dan posisi tim naik dari aksi terverifikasi yang sama.",
    targetScreen: "mission",
    targetKey: "mission.impact",
    requiredAction: null,
    placement: "top",
    scrollY: 3050,
    isCompleted: () => true
  },
  {
    id: "shared-reward",
    order: 7,
    title: "Progres mendekatkan reward bersama",
    description: "Setiap aksi membantu target tim. Saat milestone tercapai, manfaat dibuka untuk seluruh anggota, bukan hanya satu pengguna.",
    targetScreen: "mission",
    targetKey: "mission.reward",
    requiredAction: null,
    placement: "top",
    scrollY: 600,
    isCompleted: () => true
  },
  {
    id: "vote",
    order: 8,
    title: "Anggota ikut menentukan arah berikutnya",
    description: "Voting menghubungkan reward dengan suara komunitas: anggota memilih campaign, produk lokal, atau manfaat yang ingin dikejar bersama.",
    targetScreen: "mission",
    targetKey: "mission.vote",
    requiredAction: "submit_vote",
    placement: "top",
    scrollY: 850,
    actionHint: "Pilih satu opsi voting pada kartu yang disorot.",
    isCompleted: (appState) => Boolean(appState.userVote)
  },
  {
    id: "healthy-competition",
    order: 9,
    title: "Kompetisi membuat progres terlihat",
    description: "Leaderboard membangun kebanggaan dan kompetisi sehat berdasarkan konsistensi, anggota aktif, produk lokal, pembelajaran, dan voting.",
    targetScreen: "mission",
    targetKey: "mission.leaderboard",
    requiredAction: null,
    placement: "bottom",
    scrollY: 500,
    isCompleted: () => true
  },
  {
    id: "team-wrap",
    order: 10,
    title: "Pencapaian menjadi identitas komunitas",
    description: "Team Wrap merangkum rank, kontribusi, achievement, reward, dan voting menjadi cerita yang dapat dibanggakan serta dibagikan.",
    targetScreen: "team_wrap",
    targetKey: "team-wrap.card",
    requiredAction: null,
    placement: "bottom",
    scrollY: 0,
    isCompleted: () => true
  },
  {
    id: "operator-kpi",
    order: 11,
    title: "Aksi anggota terbaca oleh pengurus",
    description: "Campaign Console memakai state yang sama untuk memperlihatkan progress, anggota aktif, aksi terverifikasi, voting, dan performa tim.",
    targetScreen: "console",
    targetKey: "console.kpis",
    requiredAction: null,
    placement: "bottom",
    scrollY: 0,
    isCompleted: () => true
  },
  {
    id: "operator-proof",
    order: 12,
    title: "Satu alur, satu sumber dampak",
    description: "Gabung tim, misi, verifikasi, progres, reward, voting, hingga data pengurus terhubung dalam satu state. Inilah cara Kopoin membuat anggota muda terus kembali.",
    targetScreen: "console",
    targetKey: "console.activity",
    requiredAction: null,
    placement: "top",
    scrollY: 720,
    isCompleted: () => true
  }
] as const;

export const GUIDED_DEMO_TOTAL_CHECKPOINTS = guidedDemoCheckpoints.length;

export type GuidedMotionConfig = {
  contentDuration: number;
  spotlightDuration: number;
  allowPulse: boolean;
};

export function getGuidedMotionConfig(reduceMotion: boolean): GuidedMotionConfig {
  return reduceMotion
    ? { contentDuration: 120, spotlightDuration: 140, allowPulse: false }
    : { contentDuration: 340, spotlightDuration: 560, allowPulse: true };
}

export function createInitialGuidedDemoState(sessionId = "not-started"): GuidedDemoState {
  const first = guidedDemoCheckpoints[0]!;
  return {
    isActive: false,
    currentCheckpoint: 1,
    completedCheckpoints: [],
    targetScreen: first.targetScreen,
    requiredAction: first.requiredAction,
    isRequiredActionCompleted: true,
    allowFreeInteraction: true,
    isFinished: false,
    demoSessionId: sessionId
  };
}

export function startGuidedDemo(sessionId = createSessionId()): GuidedDemoState {
  return {
    ...createInitialGuidedDemoState(sessionId),
    isActive: true,
    allowFreeInteraction: false
  };
}

export function exitGuidedDemo(state: GuidedDemoState): GuidedDemoState {
  return { ...state, isActive: false, allowFreeInteraction: true };
}

export function finishGuidedDemo(state: GuidedDemoState): GuidedDemoState {
  return {
    ...state,
    isActive: false,
    isFinished: true,
    allowFreeInteraction: true,
    isRequiredActionCompleted: true,
    completedCheckpoints: addCompleted(state.completedCheckpoints, GUIDED_DEMO_TOTAL_CHECKPOINTS)
  };
}

export function advanceGuidedDemo(state: GuidedDemoState, appState: DemoState): GuidedDemoState {
  const synced = syncGuidedDemoState(state, appState);
  if (!synced.isRequiredActionCompleted) {
    return synced;
  }

  const completedCheckpoints = addCompleted(synced.completedCheckpoints, synced.currentCheckpoint);
  if (synced.currentCheckpoint >= GUIDED_DEMO_TOTAL_CHECKPOINTS) {
    return finishGuidedDemo({ ...synced, completedCheckpoints });
  }

  return moveToCheckpoint({ ...synced, completedCheckpoints }, synced.currentCheckpoint + 1, appState);
}

export function goBackGuidedDemo(state: GuidedDemoState, appState: DemoState): GuidedDemoState {
  return moveToCheckpoint(state, Math.max(1, state.currentCheckpoint - 1), appState);
}

export function syncGuidedDemoState(state: GuidedDemoState, appState: DemoState): GuidedDemoState {
  const checkpoint = getGuidedCheckpoint(state.currentCheckpoint)!;
  const completed = checkpoint.isCompleted(appState);
  if (
    state.targetScreen === checkpoint.targetScreen &&
    state.requiredAction === checkpoint.requiredAction &&
    state.isRequiredActionCompleted === completed
  ) {
    return state;
  }

  return {
    ...state,
    targetScreen: checkpoint.targetScreen,
    requiredAction: checkpoint.requiredAction,
    isRequiredActionCompleted: completed
  };
}

export function getGuidedCheckpoint(order: number): GuidedCheckpoint | undefined {
  return guidedDemoCheckpoints.find((checkpoint) => checkpoint.order === order);
}

export function normalizeGuidedDemoState(value: unknown): GuidedDemoState {
  if (!value || typeof value !== "object") {
    return createInitialGuidedDemoState();
  }

  const candidate = value as Partial<GuidedDemoState>;
  const currentCheckpoint = clamp(candidate.currentCheckpoint ?? 1);
  const checkpoint = getGuidedCheckpoint(currentCheckpoint)!;
  const completedCheckpoints = Array.isArray(candidate.completedCheckpoints)
    ? Array.from(new Set(candidate.completedCheckpoints.filter(isValidCheckpoint))).sort((a, b) => a - b)
    : [];

  return {
    isActive: Boolean(candidate.isActive),
    currentCheckpoint,
    completedCheckpoints,
    targetScreen: checkpoint.targetScreen,
    requiredAction: checkpoint.requiredAction,
    isRequiredActionCompleted: Boolean(candidate.isRequiredActionCompleted),
    allowFreeInteraction: candidate.allowFreeInteraction ?? !candidate.isActive,
    isFinished: Boolean(candidate.isFinished),
    demoSessionId: typeof candidate.demoSessionId === "string" ? candidate.demoSessionId : "restored-session"
  };
}

function moveToCheckpoint(state: GuidedDemoState, order: number, appState: DemoState): GuidedDemoState {
  const checkpoint = getGuidedCheckpoint(order)!;
  return {
    ...state,
    currentCheckpoint: order,
    targetScreen: checkpoint.targetScreen,
    requiredAction: checkpoint.requiredAction,
    isRequiredActionCompleted: checkpoint.isCompleted(appState),
    isFinished: false
  };
}

function addCompleted(completed: number[], order: number): number[] {
  return Array.from(new Set([...completed, order])).sort((a, b) => a - b);
}

function clamp(value: number): number {
  return Math.min(GUIDED_DEMO_TOTAL_CHECKPOINTS, Math.max(1, Math.round(value)));
}

function isValidCheckpoint(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && value >= 1 && value <= GUIDED_DEMO_TOTAL_CHECKPOINTS;
}

function createSessionId(): string {
  return `guided-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
