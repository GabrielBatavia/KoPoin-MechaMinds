import { Router, Request, Response } from "express";
import { supabase } from "../utils/supabase";

const router = Router();

type AdminResponse = Response<any, Record<string, any>>;

function sendSuccess(res: AdminResponse, data: unknown, message?: string) {
  res.json({ success: true, message, data });
}

function sendError(res: AdminResponse, error: unknown) {
  const message = error instanceof Error ? error.message : "Terjadi kesalahan pada server admin.";
  res.status(500).json({ success: false, error: { message } });
}

function normalizeId(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function formatTeamName(teamId: string) {
  return teamId
    .split("_")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function formatTimestamp(value: string | null | undefined) {
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

async function deactivateOtherCampaigns(activeCampaignId: string) {
  const { error } = await supabase
    .from("kopoin_campaigns")
    .update({ status: "planned" })
    .neq("id", activeCampaignId)
    .eq("status", "active");
  if (error) throw error;
}

function dayDiff(startDate?: string | null, endLabel?: string | null) {
  const total = 7;
  if (!startDate) return { current: 1, total };
  const start = new Date(startDate);
  const now = new Date();
  const current = Math.max(1, Math.min(total, Math.ceil((now.getTime() - start.getTime()) / 86_400_000) + 1));
  return { current, total: endLabel?.match(/\d+/) ? Number(endLabel.match(/\d+/)?.[0]) || total : total };
}

async function getCampaigns() {
  const { data, error } = await supabase.from("kopoin_campaigns").select("*").order("status", { ascending: true });
  if (error) throw error;

  return (data || []).map((campaign: any) => {
    const progress = Number(campaign.target_value || 0)
      ? (Number(campaign.current_value || 0) / Number(campaign.target_value || 1)) * 100
      : 0;
    const days = dayDiff(campaign.created_at, campaign.deadline_label);

    return {
      campaign_id: campaign.id,
      id: campaign.id,
      name: campaign.title,
      status: campaign.status,
      day_current: days.current,
      day_total: days.total,
      start_date: campaign.created_at ? String(campaign.created_at).slice(0, 10) : "",
      end_date: campaign.deadline_label,
      reward_name: campaign.reward_title,
      reward_target_points: Number(campaign.target_value || 0),
      current_points: Number(campaign.current_value || 0),
      progress_percent: Math.round(progress * 10) / 10,
      cooperative_id: campaign.cooperative_id,
      description: campaign.description || "Campaign aktivasi anggota koperasi.",
    };
  });
}

async function getMissionPerformance() {
  const { data: missions, error: missionsError } = await supabase
    .from("kopoin_missions")
    .select("*")
    .order("priority", { ascending: true });
  if (missionsError) throw missionsError;

  const { data: userMissions, error: userMissionsError } = await supabase.from("kopoin_user_missions").select("*");
  if (userMissionsError) throw userMissionsError;

  return (missions || []).map((mission: any) => {
    const rows = (userMissions || []).filter((row: any) => row.mission_id === mission.id);
    const completed = rows.filter((row: any) => row.completed);
    const participants = new Set(rows.map((row: any) => row.user_id)).size;

    return {
      mission_id: mission.id,
      campaign_id: mission.campaign_id,
      mission_name: mission.title,
      title: mission.title,
      description: mission.description,
      points: Number(mission.points || 0),
      completions: completed.length,
      participants,
      points_generated: completed.length * Number(mission.points || 0),
      impact_label: mission.product_name || mission.action_type,
      difficulty: Number(mission.target || 1) > 3 ? "Sukar" : Number(mission.target || 1) > 1 ? "Sedang" : "Mudah",
      action_type: mission.action_type,
      deadline_label: mission.deadline_label,
      product_name: mission.product_name,
      priority: mission.priority,
      qr_code: mission.qr_code,
      target: Number(mission.target || 1),
    };
  });
}

async function getActivities() {
  const { data: userMissions, error } = await supabase
    .from("kopoin_user_missions")
    .select("*")
    .order("completed_at", { ascending: false, nullsFirst: false });
  if (error) throw error;

  const [{ data: missions, error: missionsError }, { data: users, error: usersError }] = await Promise.all([
    supabase.from("kopoin_missions").select("*"),
    supabase.from("auth").select("id,name,selected_team_id"),
  ]);
  if (missionsError) throw missionsError;
  if (usersError) throw usersError;

  const missionById = new Map((missions || []).map((mission: any) => [mission.id, mission]));
  const userById = new Map((users || []).map((user: any) => [user.id, user]));

  return (userMissions || [])
    .filter((row: any) => row.completed || row.completed_at)
    .map((row: any) => {
      const mission = missionById.get(row.mission_id);
      const user = userById.get(row.user_id);
      const teamId = user?.selected_team_id || "team_pemuda_sukamaju";
      return {
        activity_id: row.id,
        user_name: user?.name || "Anggota",
        team_id: teamId,
        team_name: formatTeamName(teamId),
        mission_name: mission?.title || row.mission_id,
        points_awarded: Number(mission?.points || 0),
        verification_type: mission?.action_type === "qr_scan" ? "QR" : "manual",
        status: row.completed ? "verified" : "pending",
        timestamp: formatTimestamp(row.completed_at),
        qr_code: row.used_code,
      };
    });
}

async function getVoteOptions() {
  const { data, error } = await supabase.from("kopoin_vote_options").select("*").order("votes", { ascending: false });
  if (error) throw error;
  const totalVotes = (data || []).reduce((sum: number, option: any) => sum + Number(option.votes || 0), 0);

  return (data || []).map((option: any) => ({
    id: option.id,
    poll_id: option.poll_id,
    label: option.label,
    votes: Number(option.votes || 0),
    percent: totalVotes ? Math.round((Number(option.votes || 0) / totalVotes) * 100) : 0,
  }));
}

async function getCoupons() {
  const { data, error } = await supabase.from("kopoin_coupons").select("*").order("points", { ascending: true });
  if (error) throw error;

  return (data || []).map((coupon: any) => ({
    id: coupon.id,
    title: coupon.title,
    originalPrice: coupon.original_price,
    promoPrice: coupon.promo_price,
    points: Number(coupon.points || 0),
    merchant: coupon.merchant,
    emoji: coupon.emoji,
    category: coupon.category,
    tags: coupon.tags || [],
    active: Boolean(coupon.active),
  }));
}

async function buildDashboard() {
  const [campaigns, missions, activities, voteOptions, coupons, usersResult] = await Promise.all([
    getCampaigns(),
    getMissionPerformance(),
    getActivities(),
    getVoteOptions(),
    getCoupons(),
    supabase.from("auth").select("id,points_balance,selected_team_id,has_joined_team"),
  ]);
  if (usersResult.error) throw usersResult.error;

  const activeCampaign = campaigns.find((campaign) => campaign.status === "active") || campaigns[0];
  const completedActivities = activities.filter((activity) => activity.status === "verified");
  const totalIssued = missions.reduce((sum, mission) => sum + mission.points_generated, 0);
  const activeMembers = (usersResult.data || []).filter((user: any) => user.has_joined_team).length || (usersResult.data || []).length;
  const totalVotes = voteOptions.reduce((sum, option) => sum + option.votes, 0);

  const teamScores = new Map<string, { team_id: string; team_name: string; members: number; points: number; missions_completed: number }>();
  for (const user of usersResult.data || []) {
    const teamId = user.selected_team_id || "team_pemuda_sukamaju";
    const current = teamScores.get(teamId) || {
      team_id: teamId,
      team_name: formatTeamName(teamId),
      members: 0,
      points: 0,
      missions_completed: 0,
    };
    current.members += 1;
    current.points += Number(user.points_balance || 0);
    teamScores.set(teamId, current);
  }
  for (const activity of completedActivities) {
    const teamId = activity.team_id || normalizeId(activity.team_name);
    const current = teamScores.get(teamId) || {
      team_id: teamId,
      team_name: activity.team_name,
      members: 0,
      points: 0,
      missions_completed: 0,
    };
    current.points += Number(activity.points_awarded || 0);
    current.missions_completed += 1;
    teamScores.set(teamId, current);
  }

  const leaderboard = Array.from(teamScores.values())
    .sort((a, b) => b.points - a.points)
    .map((team, index) => ({ ...team, rank: index + 1, trend: "+0%" }));

  return {
    campaign: activeCampaign,
    campaigns,
    kpis: {
      active_members: activeMembers,
      mission_completions: completedActivities.length,
      total_kopoin_issued: totalIssued,
      team_progress_percent: activeCampaign?.progress_percent || 0,
      qr_verifications: completedActivities.filter((activity) => activity.verification_type === "QR").length,
      voting_participation: totalVotes,
      completion_rate_percent: activeMembers ? Math.round((completedActivities.length / activeMembers) * 100) : 0,
      avg_missions_per_member: activeMembers ? Math.round((completedActivities.length / activeMembers) * 10) / 10 : 0,
      repeat_participation_percent: 0,
      streak_users: activeMembers,
    },
    leaderboard,
    activities,
    missions,
    voteOptions,
    coupons,
  };
}

router.get("/dashboard", async (_req: Request, res: Response) => {
  try {
    sendSuccess(res, await buildDashboard());
  } catch (error) {
    sendError(res, error);
  }
});

router.get("/campaigns", async (_req: Request, res: Response) => {
  try {
    sendSuccess(res, await getCampaigns());
  } catch (error) {
    sendError(res, error);
  }
});

router.post("/campaigns", async (req: Request, res: Response) => {
  try {
    const title = String(req.body.title || "").trim();
    const id = normalizeId(String(req.body.id || title));
    if (req.body.status === "active") {
      await deactivateOtherCampaigns(id);
    }
    const { error } = await supabase.from("kopoin_campaigns").insert({
      id,
      title,
      cooperative_id: req.body.cooperativeId || "coop_sukamaju",
      target_value: Number(req.body.targetValue || 1),
      current_value: Number(req.body.currentValue || 0),
      reward_title: req.body.rewardTitle || "Reward Kopoin",
      deadline_label: req.body.deadlineLabel || "Minggu ini",
      status: req.body.status || "planned",
    });
    if (error) throw error;
    sendSuccess(res, await getCampaigns(), "Campaign berhasil dibuat.");
  } catch (error) {
    sendError(res, error);
  }
});

router.patch("/campaigns/:id", async (req: Request, res: Response) => {
  try {
    const campaignId = String(req.params.id);
    const payload: Record<string, unknown> = {};
    if (req.body.title !== undefined) payload.title = req.body.title;
    if (req.body.cooperativeId !== undefined) payload.cooperative_id = req.body.cooperativeId;
    if (req.body.targetValue !== undefined) payload.target_value = Number(req.body.targetValue);
    if (req.body.currentValue !== undefined) payload.current_value = Number(req.body.currentValue);
    if (req.body.rewardTitle !== undefined) payload.reward_title = req.body.rewardTitle;
    if (req.body.deadlineLabel !== undefined) payload.deadline_label = req.body.deadlineLabel;
    if (req.body.status !== undefined) payload.status = req.body.status;

    const { error } = await supabase.from("kopoin_campaigns").update(payload).eq("id", campaignId);
    if (error) throw error;
    if (req.body.status === "active") {
      await deactivateOtherCampaigns(campaignId);
    }
    sendSuccess(res, await getCampaigns(), "Campaign berhasil diperbarui.");
  } catch (error) {
    sendError(res, error);
  }
});

router.delete("/campaigns/:id", async (req: Request, res: Response) => {
  try {
    const { error } = await supabase.from("kopoin_campaigns").delete().eq("id", req.params.id);
    if (error) throw error;
    sendSuccess(res, await getCampaigns(), "Campaign berhasil dihapus.");
  } catch (error) {
    sendError(res, error);
  }
});

router.get("/missions", async (_req: Request, res: Response) => {
  try {
    sendSuccess(res, await getMissionPerformance());
  } catch (error) {
    sendError(res, error);
  }
});

router.post("/missions", async (req: Request, res: Response) => {
  try {
    const title = String(req.body.title || "").trim();
    const id = normalizeId(String(req.body.id || title));
    const { error } = await supabase.from("kopoin_missions").insert({
      id,
      campaign_id: req.body.campaignId,
      title,
      description: req.body.description || "",
      points: Number(req.body.points || 0),
      action_type: req.body.actionType || "qr_scan",
      deadline_label: req.body.deadlineLabel || "Minggu ini",
      product_name: req.body.productName || null,
      priority: req.body.priority || "P1",
      qr_code: req.body.qrCode || null,
      target: Number(req.body.target || 1),
    });
    if (error) throw error;
    sendSuccess(res, await getMissionPerformance(), "Misi berhasil dibuat.");
  } catch (error) {
    sendError(res, error);
  }
});

router.patch("/missions/:id", async (req: Request, res: Response) => {
  try {
    const payload: Record<string, unknown> = {};
    if (req.body.campaignId !== undefined) payload.campaign_id = req.body.campaignId;
    if (req.body.title !== undefined) payload.title = req.body.title;
    if (req.body.description !== undefined) payload.description = req.body.description;
    if (req.body.points !== undefined) payload.points = Number(req.body.points);
    if (req.body.actionType !== undefined) payload.action_type = req.body.actionType;
    if (req.body.deadlineLabel !== undefined) payload.deadline_label = req.body.deadlineLabel;
    if (req.body.productName !== undefined) payload.product_name = req.body.productName || null;
    if (req.body.priority !== undefined) payload.priority = req.body.priority;
    if (req.body.qrCode !== undefined) payload.qr_code = req.body.qrCode || null;
    if (req.body.target !== undefined) payload.target = Number(req.body.target);

    const { error } = await supabase.from("kopoin_missions").update(payload).eq("id", req.params.id);
    if (error) throw error;
    sendSuccess(res, await getMissionPerformance(), "Misi berhasil diperbarui.");
  } catch (error) {
    sendError(res, error);
  }
});

router.delete("/missions/:id", async (req: Request, res: Response) => {
  try {
    const { error } = await supabase.from("kopoin_missions").delete().eq("id", req.params.id);
    if (error) throw error;
    sendSuccess(res, await getMissionPerformance(), "Misi berhasil dihapus.");
  } catch (error) {
    sendError(res, error);
  }
});

router.get("/activities", async (_req: Request, res: Response) => {
  try {
    sendSuccess(res, await getActivities());
  } catch (error) {
    sendError(res, error);
  }
});

router.get("/coupons", async (_req: Request, res: Response) => {
  try {
    sendSuccess(res, await getCoupons());
  } catch (error) {
    sendError(res, error);
  }
});

router.post("/coupons", async (req: Request, res: Response) => {
  try {
    const title = String(req.body.title || "").trim();
    const id = normalizeId(String(req.body.id || title));
    const { error } = await supabase.from("kopoin_coupons").insert({
      id,
      title,
      original_price: req.body.originalPrice || "",
      promo_price: req.body.promoPrice || "",
      points: Number(req.body.points || 0),
      merchant: req.body.merchant || "Koperasi",
      emoji: req.body.emoji || "🎁",
      category: req.body.category || "Penawaran Khusus",
      tags: req.body.tags || [],
      active: req.body.active ?? true,
    });
    if (error) throw error;
    sendSuccess(res, await getCoupons(), "Kupon berhasil dibuat.");
  } catch (error) {
    sendError(res, error);
  }
});

router.patch("/coupons/:id", async (req: Request, res: Response) => {
  try {
    const payload: Record<string, unknown> = {};
    if (req.body.title !== undefined) payload.title = req.body.title;
    if (req.body.originalPrice !== undefined) payload.original_price = req.body.originalPrice;
    if (req.body.promoPrice !== undefined) payload.promo_price = req.body.promoPrice;
    if (req.body.points !== undefined) payload.points = Number(req.body.points);
    if (req.body.merchant !== undefined) payload.merchant = req.body.merchant;
    if (req.body.emoji !== undefined) payload.emoji = req.body.emoji;
    if (req.body.category !== undefined) payload.category = req.body.category;
    if (req.body.tags !== undefined) payload.tags = req.body.tags;
    if (req.body.active !== undefined) payload.active = Boolean(req.body.active);

    const { error } = await supabase.from("kopoin_coupons").update(payload).eq("id", req.params.id);
    if (error) throw error;
    sendSuccess(res, await getCoupons(), "Kupon berhasil diperbarui.");
  } catch (error) {
    sendError(res, error);
  }
});

router.delete("/coupons/:id", async (req: Request, res: Response) => {
  try {
    const { error } = await supabase.from("kopoin_coupons").delete().eq("id", req.params.id);
    if (error) throw error;
    sendSuccess(res, await getCoupons(), "Kupon berhasil dihapus.");
  } catch (error) {
    sendError(res, error);
  }
});

router.get("/vote-options", async (_req: Request, res: Response) => {
  try {
    sendSuccess(res, await getVoteOptions());
  } catch (error) {
    sendError(res, error);
  }
});

router.post("/vote-options", async (req: Request, res: Response) => {
  try {
    const label = String(req.body.label || "").trim();
    const id = normalizeId(String(req.body.id || label));
    const { error } = await supabase.from("kopoin_vote_options").insert({
      id,
      poll_id: req.body.pollId || "poll_reward_berikutnya",
      label,
      votes: Number(req.body.votes || 0),
    });
    if (error) throw error;
    sendSuccess(res, await getVoteOptions(), "Opsi voting berhasil dibuat.");
  } catch (error) {
    sendError(res, error);
  }
});

router.patch("/vote-options/:id", async (req: Request, res: Response) => {
  try {
    const payload: Record<string, unknown> = {};
    if (req.body.label !== undefined) payload.label = req.body.label;
    if (req.body.pollId !== undefined) payload.poll_id = req.body.pollId;
    if (req.body.votes !== undefined) payload.votes = Number(req.body.votes);
    const { error } = await supabase.from("kopoin_vote_options").update(payload).eq("id", req.params.id);
    if (error) throw error;
    sendSuccess(res, await getVoteOptions(), "Opsi voting berhasil diperbarui.");
  } catch (error) {
    sendError(res, error);
  }
});

router.delete("/vote-options/:id", async (req: Request, res: Response) => {
  try {
    const { error } = await supabase.from("kopoin_vote_options").delete().eq("id", req.params.id);
    if (error) throw error;
    sendSuccess(res, await getVoteOptions(), "Opsi voting berhasil dihapus.");
  } catch (error) {
    sendError(res, error);
  }
});

export default router;
