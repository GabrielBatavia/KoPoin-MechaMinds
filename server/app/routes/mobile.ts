import { Router, Request, Response } from "express";
import { supabase } from "../utils/supabase";

const router = Router();

const defaultUserId = "00000000-0000-4000-8000-000000000001";
const teamId = "team_pemuda_sukamaju";
const mainMissionId = "mis_beli_kopi_sukamaju";

type ActionResponse = Response<any, Record<string, any>>;

function resolveUserId(req: Request): string {
  return String(req.query.userId || req.body?.userId || defaultUserId);
}

function formatDateTime(value: string | null | undefined): string {
  if (!value) return "Hari ini";
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Jakarta",
  }).format(new Date(value));
}

function buildLeaderboard(hasCompletedMission: boolean) {
  return hasCompletedMission
    ? [
        {
          teamId: "team_kreatif_desa",
          teamName: "Tim Kreatif Desa",
          rank: 1,
          score: 8040,
          breakdown: { consistency: 31, activeMembers: 27, localProduct: 24, learningVoting: 14 },
        },
        {
          teamId,
          teamName: "Tim Pemuda Sukamaju",
          rank: 2,
          score: 7930,
          breakdown: { consistency: 32, activeMembers: 28, localProduct: 25, learningVoting: 15 },
        },
        {
          teamId: "team_koperasi_muda",
          teamName: "Tim Koperasi Muda",
          rank: 3,
          score: 7920,
          breakdown: { consistency: 30, activeMembers: 26, localProduct: 24, learningVoting: 13 },
        },
      ]
    : [
        {
          teamId: "team_kreatif_desa",
          teamName: "Tim Kreatif Desa",
          rank: 1,
          score: 8040,
          breakdown: { consistency: 31, activeMembers: 27, localProduct: 24, learningVoting: 14 },
        },
        {
          teamId: "team_koperasi_muda",
          teamName: "Tim Koperasi Muda",
          rank: 2,
          score: 7920,
          breakdown: { consistency: 30, activeMembers: 26, localProduct: 24, learningVoting: 13 },
        },
        {
          teamId,
          teamName: "Tim Pemuda Sukamaju",
          rank: 3,
          score: 7810,
          breakdown: { consistency: 29, activeMembers: 25, localProduct: 23, learningVoting: 12 },
        },
      ];
}

async function ensureUserMissionRows(userId: string) {
  const { data: missions, error } = await supabase.from("kopoin_missions").select("id");
  if (error) throw error;

  const rows = (missions || []).map((mission: any) => ({
    user_id: userId,
    mission_id: mission.id,
  }));

  if (rows.length) {
    const { error: upsertError } = await supabase
      .from("kopoin_user_missions")
      .upsert(rows, { onConflict: "user_id,mission_id", ignoreDuplicates: true });
    if (upsertError) throw upsertError;
  }
}

async function buildState(userId: string) {
  await ensureUserMissionRows(userId);

  const [
    userResult,
    campaignResult,
    missionsResult,
    userMissionsResult,
    transactionsResult,
    communitiesResult,
    membershipsResult,
    voteOptionsResult,
    userVoteResult,
    redemptionsResult,
  ] = await Promise.all([
    supabase.from("auth").select("*").eq("id", userId).maybeSingle(),
    supabase.from("kopoin_campaigns").select("*").eq("id", "camp_7hari_produk_lokal").maybeSingle(),
    supabase.from("kopoin_missions").select("*").order("priority", { ascending: true }),
    supabase.from("kopoin_user_missions").select("*").eq("user_id", userId),
    supabase.from("kopoin_transactions").select("*").eq("user_id", userId).order("occurred_at", { ascending: false }),
    supabase.from("kopoin_communities").select("*").order("formed_at", { ascending: true }),
    supabase.from("kopoin_community_memberships").select("*").eq("user_id", userId).eq("status", "approved"),
    supabase.from("kopoin_vote_options").select("*").eq("poll_id", "poll_reward_berikutnya"),
    supabase.from("kopoin_user_votes").select("*").eq("user_id", userId).eq("poll_id", "poll_reward_berikutnya").maybeSingle(),
    supabase.from("kopoin_coupon_redemptions").select("coupon_id").eq("user_id", userId),
  ]);

  for (const result of [
    userResult,
    campaignResult,
    missionsResult,
    userMissionsResult,
    transactionsResult,
    communitiesResult,
    membershipsResult,
    voteOptionsResult,
    userVoteResult,
    redemptionsResult,
  ]) {
    if (result.error) throw result.error;
  }

  const user = userResult.data;
  if (!user) {
    throw new Error("User tidak ditemukan. Jalankan migration.sql atau login ulang.");
  }

  const campaign = campaignResult.data;
  const userMissions = new Map((userMissionsResult.data || []).map((row: any) => [row.mission_id, row]));
  const hasCompletedMission = Boolean(userMissions.get(mainMissionId)?.completed);
  const leaderboard = buildLeaderboard(hasCompletedMission);
  const rank = leaderboard.find((entry) => entry.teamId === teamId)?.rank ?? 3;
  const votes = voteOptionsResult.data || [];
  const totalVotes = votes.reduce((sum: number, option: any) => sum + Number(option.votes || 0), 0);
  const selectedVote = votes.find((option: any) => option.id === userVoteResult.data?.option_id);

  const latestCompletion = hasCompletedMission
    ? {
        qrCode: userMissions.get(mainMissionId)?.used_code || "KOPI-SUKAMAJU-001",
        productName: "Kopi Sukamaju",
        pointsEarned: 120,
        balanceBefore: Math.max(0, Number(user.points_balance || 0) - 120),
        balanceAfter: Number(user.points_balance || 0),
        progressBefore: Math.max(0, Number(campaign?.current_value || 0) - 1),
        progressAfter: Number(campaign?.current_value || 0),
        progressTarget: Number(campaign?.target_value || 100),
        rankBefore: 3,
        rankAfter: rank,
        scoreBefore: 7810,
        scoreAfter: rank === 2 ? 7930 : 7810,
        achievementTitle: "Anak Lokal, Selera Global",
        timestamp: formatDateTime(userMissions.get(mainMissionId)?.completed_at),
      }
    : null;

  return {
    hasJoinedTeam: Boolean(user.has_joined_team),
    hasJoinedCommunity: Boolean(user.has_joined_community || (membershipsResult.data || []).length > 0),
    scanCompleted: hasCompletedMission,
    user: {
      id: user.id,
      name: user.name,
      ageGroup: "Gen Z",
      memberNo: user.anggota_ref || (user.nik ? `NIK-${String(user.nik).slice(0, 6)}` : "KMP-SKM-0001"),
      cooperativeId: "coop_sukamaju",
      teamId: user.selected_team_id,
      level: Number(user.level || 1),
      kopoinBalance: Number(user.points_balance || 0),
      monthlySaving: Number(user.monthly_saving || 0),
      status: "Anggota Aktif",
      streakLabel: "3 minggu dukung produk desa",
      achievementUnlocked: Boolean(user.achievement_unlocked),
    },
    cooperative: {
      id: "coop_sukamaju",
      name: user.koperasi_ref || "Koperasi Merah Putih Sukamaju",
      location: user.province || "Desa Sukamaju",
    },
    team: {
      id: teamId,
      name: "Tim Pemuda Sukamaju",
      members: 24,
      activeMembers: 18,
    },
    campaign: {
      id: campaign?.id || "camp_7hari_produk_lokal",
      title: campaign?.title || "7 Hari Dukung Produk Koperasi Sukamaju",
      cooperativeId: campaign?.cooperative_id || "coop_sukamaju",
      targetValue: Number(campaign?.target_value || 100),
      currentValue: Number(campaign?.current_value || 73),
      rewardTitle: campaign?.reward_title || "Kupon Bersama Produk Lokal",
      deadlineLabel: campaign?.deadline_label || "Minggu ini",
      status: "active",
    },
    missions: (missionsResult.data || []).map((mission: any) => {
      const userMission = userMissions.get(mission.id);
      return {
        id: mission.id,
        campaignId: mission.campaign_id,
        title: mission.title,
        description: mission.description,
        points: Number(mission.points || 0),
        actionType: mission.action_type,
        deadlineLabel: mission.deadline_label,
        productName: mission.product_name || undefined,
        priority: mission.priority,
        current: Number(userMission?.current_value || 0),
        target: Number(mission.target || 1),
        completed: Boolean(userMission?.completed),
      };
    }),
    communities: (communitiesResult.data || []).map((community: any) => ({
      id: community.id,
      name: community.name,
      formedDate: new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        month: "long",
        day: "2-digit",
        year: "numeric",
        timeZone: "Asia/Jakarta",
      }).format(new Date(community.formed_at)),
      formedTime: "07:00 AM GMT +7",
      membersCount: Number(community.members_count || 0),
      about: community.about,
      locationName: community.location_name,
      locationAddress: community.location_address,
      avatarUris: community.avatar_uris || [],
      tag: community.tag,
    })),
    leaderboard,
    activityLedger: [],
    latestActivity: null,
    latestCompletion,
    usedQrCodes: (userMissionsResult.data || []).map((row: any) => row.used_code).filter(Boolean),
    verificationLogs: [],
    redeemedCoupons: (redemptionsResult.data || []).map((row: any) => row.coupon_id),
    transactions: (transactionsResult.data || []).map((tx: any) => ({
      id: tx.id,
      title: tx.title,
      subtitle: tx.subtitle,
      date: formatDateTime(tx.occurred_at),
      type: tx.transaction_type,
      amountText:
        tx.transaction_type === "grocery"
          ? `-Rp${Math.abs(Number(tx.cash_amount || 0)).toLocaleString("id-ID")}`
          : `${Number(tx.points_amount || 0) > 0 ? "+" : ""}${Number(tx.points_amount || 0)} Poin`,
      pointsBadge: Number(tx.points_amount || 0) > 0 && tx.transaction_type === "grocery" ? `+${tx.points_amount} Poin` : undefined,
      iconName: tx.icon_name,
    })),
    votePoll: {
      id: "poll_reward_berikutnya",
      title: "Pilih reward komunitas berikutnya",
      note: "Voting ini untuk campaign dan reward komunitas, bukan keputusan formal RAT.",
      options: votes.map((option: any) => ({
        id: option.id,
        label: option.label,
        votes: Number(option.votes || 0),
        percent: totalVotes ? Math.round((Number(option.votes || 0) / totalVotes) * 100) : 0,
      })),
    },
    userVote: selectedVote
      ? {
          pollId: "poll_reward_berikutnya",
          optionId: selectedVote.id,
          optionLabel: selectedVote.label,
          submittedAt: formatDateTime(userVoteResult.data?.submitted_at),
        }
      : null,
  };
}

async function sendState(res: ActionResponse, userId: string, message?: string) {
  const state = await buildState(userId);
  res.json({ success: true, message, data: state });
}

router.get("/state", async (req: Request, res: Response) => {
  try {
    await sendState(res, resolveUserId(req));
  } catch (error: any) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
});

router.post("/join-team", async (req: Request, res: Response) => {
  try {
    const userId = resolveUserId(req);
    const { error } = await supabase
      .from("auth")
      .update({ has_joined_team: true, selected_team_id: teamId })
      .eq("id", userId);
    if (error) throw error;
    await sendState(res, userId, "Berhasil bergabung ke Tim Pemuda Sukamaju.");
  } catch (error: any) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
});

router.post("/join-community", async (req: Request, res: Response) => {
  try {
    const userId = resolveUserId(req);
    const communityId = String(req.body?.communityId || "pemuda_sukamaju_hijau");
    const reason = String(req.body?.reason || "");

    const { error: membershipError } = await supabase.from("kopoin_community_memberships").upsert(
      {
        user_id: userId,
        community_id: communityId,
        reason,
        status: "approved",
      },
      { onConflict: "user_id,community_id" },
    );
    if (membershipError) throw membershipError;

    const { error: userError } = await supabase.from("auth").update({ has_joined_community: true }).eq("id", userId);
    if (userError) throw userError;

    await sendState(res, userId, "Permohonan komunitas disetujui.");
  } catch (error: any) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
});

router.post("/leave-community", async (req: Request, res: Response) => {
  try {
    const userId = resolveUserId(req);
    const communityId = String(req.body?.communityId || "pemuda_sukamaju_hijau");

    const { error: membershipError } = await supabase
      .from("kopoin_community_memberships")
      .delete()
      .eq("user_id", userId)
      .eq("community_id", communityId);
    if (membershipError) throw membershipError;

    const { data: remainingMemberships, error: remainingError } = await supabase
      .from("kopoin_community_memberships")
      .select("id")
      .eq("user_id", userId)
      .eq("status", "approved");
    if (remainingError) throw remainingError;

    const { error: userError } = await supabase
      .from("auth")
      .update({ has_joined_community: Boolean(remainingMemberships?.length) })
      .eq("id", userId);
    if (userError) throw userError;

    await sendState(res, userId, "Berhasil keluar dari komunitas.");
  } catch (error: any) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
});

router.post("/missions/submit", async (req: Request, res: Response) => {
  try {
    const userId = resolveUserId(req);
    const code = String(req.body?.code || "").trim().toUpperCase();

    const { data: mission, error: missionError } = await supabase
      .from("kopoin_missions")
      .select("*")
      .eq("qr_code", code)
      .maybeSingle();
    if (missionError) throw missionError;
    if (!mission) {
      res.status(400).json({ success: false, error: { message: "Kode misi tidak terdaftar." } });
      return;
    }

    const { data: user, error: userError } = await supabase.from("auth").select("*").eq("id", userId).maybeSingle();
    if (userError) throw userError;
    if (!user?.has_joined_team) {
      res.status(400).json({ success: false, error: { message: "Gabung tim dulu sebelum menjalankan misi." } });
      return;
    }

    const { data: existing, error: existingError } = await supabase
      .from("kopoin_user_missions")
      .select("*")
      .eq("user_id", userId)
      .eq("mission_id", mission.id)
      .maybeSingle();
    if (existingError) throw existingError;
    if (existing?.completed) {
      res.status(409).json({ success: false, error: { message: "Misi ini sudah pernah diselesaikan." } });
      return;
    }

    const nextCurrent = Math.min(Number(mission.target || 1), Number(existing?.current_value || 0) + 1);
    const completed = nextCurrent >= Number(mission.target || 1);

    const { error: upsertError } = await supabase.from("kopoin_user_missions").upsert(
      {
        user_id: userId,
        mission_id: mission.id,
        current_value: nextCurrent,
        completed,
        completed_at: completed ? new Date().toISOString() : null,
        used_code: code,
      },
      { onConflict: "user_id,mission_id" },
    );
    if (upsertError) throw upsertError;

    if (completed) {
      const { error: authError } = await supabase
        .from("auth")
        .update({
          points_balance: Number(user.points_balance || 0) + Number(mission.points || 0),
          achievement_unlocked: mission.id === mainMissionId ? true : user.achievement_unlocked,
        })
        .eq("id", userId);
      if (authError) throw authError;

      const { data: campaign } = await supabase
        .from("kopoin_campaigns")
        .select("current_value")
        .eq("id", mission.campaign_id)
        .maybeSingle();
      await supabase
        .from("kopoin_campaigns")
        .update({ current_value: Number(campaign?.current_value || 0) + 1 })
        .eq("id", mission.campaign_id);

      await supabase.from("kopoin_transactions").insert({
        id: `tx_${userId}_${mission.id}_${Date.now()}`,
        user_id: userId,
        title: `${mission.title} ${mission.product_name || ""}`.trim(),
        subtitle: `Reward misi ${mission.action_type}`,
        transaction_type: "points_earn",
        points_amount: Number(mission.points || 0),
        icon_name: "rewards",
      });
    }

    await sendState(res, userId, completed ? `Misi selesai. +${mission.points} Poin masuk.` : "Progress misi bertambah.");
  } catch (error: any) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
});

router.post("/coupons/redeem", async (req: Request, res: Response) => {
  try {
    const userId = resolveUserId(req);
    const couponId = String(req.body?.couponId || "");

    const { data: coupon, error: couponError } = await supabase.from("kopoin_coupons").select("*").eq("id", couponId).maybeSingle();
    if (couponError) throw couponError;
    if (!coupon) {
      res.status(404).json({ success: false, error: { message: "Kupon tidak ditemukan." } });
      return;
    }

    const { data: user, error: userError } = await supabase.from("auth").select("points_balance").eq("id", userId).maybeSingle();
    if (userError) throw userError;
    if (Number(user?.points_balance || 0) < Number(coupon.points || 0)) {
      res.status(400).json({ success: false, error: { message: "Poin belum cukup untuk menukar kupon ini." } });
      return;
    }

    const { error: redeemError } = await supabase.from("kopoin_coupon_redemptions").insert({
      user_id: userId,
      coupon_id: couponId,
      points_spent: coupon.points,
    });
    if (redeemError && redeemError.code !== "23505") throw redeemError;

    const { error: authError } = await supabase
      .from("auth")
      .update({ points_balance: Number(user?.points_balance || 0) - Number(coupon.points || 0) })
      .eq("id", userId);
    if (authError) throw authError;

    await supabase.from("kopoin_transactions").insert({
      id: `tx_${userId}_${couponId}_${Date.now()}`,
      user_id: userId,
      title: coupon.title,
      subtitle: "Penukaran Loyalty Points",
      transaction_type: "points_redemption",
      points_amount: -Number(coupon.points || 0),
      icon_name: "points",
    });

    await sendState(res, userId, "Kupon berhasil ditukar.");
  } catch (error: any) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
});

router.post("/vote", async (req: Request, res: Response) => {
  try {
    const userId = resolveUserId(req);
    const optionId = String(req.body?.optionId || "");
    const pollId = "poll_reward_berikutnya";

    const { data: previous } = await supabase
      .from("kopoin_user_votes")
      .select("option_id")
      .eq("user_id", userId)
      .eq("poll_id", pollId)
      .maybeSingle();

    if (previous?.option_id && previous.option_id !== optionId) {
      const { data: oldOption } = await supabase.from("kopoin_vote_options").select("votes").eq("id", previous.option_id).maybeSingle();
      await supabase
        .from("kopoin_vote_options")
        .update({ votes: Math.max(0, Number(oldOption?.votes || 0) - 1) })
        .eq("id", previous.option_id);
    }

    if (previous?.option_id !== optionId) {
      const { data: newOption } = await supabase.from("kopoin_vote_options").select("votes").eq("id", optionId).maybeSingle();
      await supabase
        .from("kopoin_vote_options")
        .update({ votes: Number(newOption?.votes || 0) + 1 })
        .eq("id", optionId);
    }

    const { error } = await supabase.from("kopoin_user_votes").upsert(
      { user_id: userId, poll_id: pollId, option_id: optionId },
      { onConflict: "user_id,poll_id" },
    );
    if (error) throw error;

    await sendState(res, userId, "Voting tersimpan.");
  } catch (error: any) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
});

export default router;
