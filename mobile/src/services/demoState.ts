import {
  acceptedQrCodes,
  CompletionSummary,
  createInitialDemoState,
  createVerifiedActivity,
  createVerificationLog,
  DemoState,
  leaderboardAfter,
  VoteOption
} from "../data/kopoinSeed";

export type SubmitResult =
  | {
      status: "success";
      message: string;
      state: DemoState;
    }
  | {
      status: "duplicate";
      message: string;
      state: DemoState;
    }
  | {
      status: "error";
      message: string;
      state: DemoState;
    };

export type VoteResult =
  | {
      status: "success";
      message: string;
      state: DemoState;
    }
  | {
      status: "error";
      message: string;
      state: DemoState;
    };

export function getInitialDemoState(): DemoState {
  return createInitialDemoState();
}

export function joinPemudaSukamajuTeam(state: DemoState): DemoState {
  return {
    ...state,
    hasJoinedTeam: true,
    user: {
      ...state.user,
      teamId: state.team.id
    }
  };
}

export function resetDemoState(): DemoState {
  return createInitialDemoState();
}

export function submitVote(state: DemoState, optionId: string): VoteResult {
  const selectedOption = state.votePoll.options.find((option) => option.id === optionId);

  if (!selectedOption) {
    return {
      status: "error",
      message: "Opsi voting tidak tersedia pada campaign ini.",
      state
    };
  }

  if (state.userVote?.optionId === optionId) {
    return {
      status: "success",
      message: `Pilihan Gabriel tetap: ${selectedOption.label}.`,
      state
    };
  }

  const previousOptionId = state.userVote?.optionId;
  const nextOptions = recalculateVotePercentages(
    state.votePoll.options.map((option) => {
      let votes = option.votes;

      if (option.id === previousOptionId) {
        votes = Math.max(0, votes - 1);
      }

      if (option.id === optionId) {
        votes += 1;
      }

      return {
        ...option,
        votes
      };
    })
  );
  const nextSelectedOption = nextOptions.find((option) => option.id === optionId) ?? selectedOption;

  return {
    status: "success",
    message: `Voting tersimpan: ${nextSelectedOption.label}. Persentase komunitas ikut berubah.`,
    state: {
      ...state,
      userVote: {
        pollId: state.votePoll.id,
        optionId,
        optionLabel: nextSelectedOption.label,
        submittedAt: "2026-07-04 14:24"
      },
      votePoll: {
        ...state.votePoll,
        options: nextOptions
      }
    }
  };
}

export function isAcceptedQrCode(code: string): boolean {
  return acceptedQrCodes.includes(normalizeCode(code));
}

export function submitProductMission(state: DemoState, rawCode: string): SubmitResult {
  const code = normalizeCode(rawCode);

  if (!state.hasJoinedTeam) {
    const verificationLog = createVerificationLog(code || "EMPTY-CODE", "blocked", "Gabriel belum bergabung ke tim.");

    return {
      status: "error",
      message: "Gabriel perlu gabung ke Tim Pemuda Sukamaju dulu.",
      state: addVerificationLog(state, verificationLog)
    };
  }

  if (!isAcceptedQrCode(code)) {
    const verificationLog = createVerificationLog(code || "EMPTY-CODE", "rejected", "Kode tidak terdaftar pada campaign Sukamaju.");

    return {
      status: "error",
      message: "Kode tidak valid. Gunakan KOPI-SUKAMAJU-001 untuk fallback demo.",
      state: addVerificationLog(state, verificationLog)
    };
  }

  if (state.usedQrCodes.includes(code)) {
    const verificationLog = createVerificationLog(code, "blocked", "Duplicate guard: kode sudah pernah dipakai Gabriel.", "2026-07-04 14:21");

    return {
      status: "duplicate",
      message: "Kode ini sudah tercatat. Duplicate guard aktif agar poin tidak dihitung dua kali.",
      state: addVerificationLog(state, verificationLog)
    };
  }

  if (state.scanCompleted) {
    const verificationLog = createVerificationLog(code, "blocked", "Misi demo sudah selesai. Reset demo untuk mencoba before-after lagi.", "2026-07-04 14:21");

    return {
      status: "error",
      message: "Aksi demo sudah tercatat. Gunakan Reset Demo untuk mengulang before-after.",
      state: addVerificationLog(state, verificationLog)
    };
  }

  const activity = createVerifiedActivity(code);
  const verificationLog = createVerificationLog(code, "verified", "QR/manual code valid untuk produk Kopi Sukamaju.");
  const completionSummary = createCompletionSummary(state, code);

  return {
    status: "success",
    message: "Kontribusi kamu berhasil diverifikasi! +120 Kopoin masuk.",
    state: {
      ...state,
      scanCompleted: true,
      campaign: {
        ...state.campaign,
        currentValue: 74
      },
      user: {
        ...state.user,
        kopoinBalance: 1850,
        achievementUnlocked: true
      },
      leaderboard: leaderboardAfter,
      activityLedger: [activity, ...state.activityLedger],
      latestActivity: activity,
      latestCompletion: completionSummary,
      usedQrCodes: [code, ...state.usedQrCodes],
      verificationLogs: [verificationLog, ...state.verificationLogs]
    }
  };
}

function createCompletionSummary(state: DemoState, qrCode: string): CompletionSummary {
  const previousTeamScore = state.leaderboard.find((entry) => entry.teamId === state.team.id);
  const nextTeamScore = leaderboardAfter.find((entry) => entry.teamId === state.team.id);

  return {
    qrCode,
    productName: "Kopi Sukamaju",
    pointsEarned: 120,
    balanceBefore: state.user.kopoinBalance,
    balanceAfter: 1850,
    progressBefore: state.campaign.currentValue,
    progressAfter: 74,
    progressTarget: state.campaign.targetValue,
    rankBefore: previousTeamScore?.rank ?? 3,
    rankAfter: nextTeamScore?.rank ?? 2,
    scoreBefore: previousTeamScore?.score ?? 7810,
    scoreAfter: nextTeamScore?.score ?? 7930,
    achievementTitle: "Anak Lokal, Selera Global",
    timestamp: "2026-07-04 14:20"
  };
}

function addVerificationLog(state: DemoState, verificationLog: DemoState["verificationLogs"][number]): DemoState {
  return {
    ...state,
    verificationLogs: [verificationLog, ...state.verificationLogs]
  };
}

function recalculateVotePercentages(options: VoteOption[]): VoteOption[] {
  const totalVotes = options.reduce((total, option) => total + option.votes, 0);

  if (totalVotes === 0) {
    return options;
  }

  return options.map((option) => ({
    ...option,
    percent: Math.round((option.votes / totalVotes) * 100)
  }));
}

function normalizeCode(code: string): string {
  return code.trim().toUpperCase();
}
