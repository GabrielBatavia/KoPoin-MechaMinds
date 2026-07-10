import { createAdminDashboard } from "../src/services/adminDashboard";
import {
  getInitialDemoState,
  joinPemudaSukamajuTeam,
  resetDemoState,
  submitProductMission,
  submitVote
} from "../src/services/demoState";
import { createTeamWrap } from "../src/services/teamWrap";

const passLabel = process.argv[2] ?? "manual";

function assert(condition: boolean, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

let state = getInitialDemoState();

assert(state.campaign.currentValue === 73, "Initial campaign progress must be 73/100.");
assert(state.user.kopoinBalance === 1730, "Initial Gabriel balance must be 1.730 Kopoin.");
assert(state.leaderboard.find((entry) => entry.teamId === state.team.id)?.rank === 3, "Initial team rank must be #3.");

const blockedBeforeJoin = submitProductMission(state, "KOPI-SUKAMAJU-001");
assert(blockedBeforeJoin.status === "error", "Submit before joining team must be blocked.");
assert(blockedBeforeJoin.state.verificationLogs[0]?.status === "blocked", "Submit before joining must create blocked log.");

state = joinPemudaSukamajuTeam(state);
assert(state.hasJoinedTeam, "Gabriel must join Tim Pemuda Sukamaju.");
assert(state.user.teamId === state.team.id, "Gabriel teamId must match Tim Pemuda Sukamaju.");

let submitResult = submitProductMission(state, "KOPI-SUKAMAJU-001");
assert(submitResult.status === "success", "Valid QR/manual code must verify successfully.");
state = submitResult.state;

assert(state.campaign.currentValue === 74, "Campaign progress must update to 74/100.");
assert(state.user.kopoinBalance === 1850, "Gabriel balance must update to 1.850 Kopoin.");
assert(state.user.achievementUnlocked, "Achievement must unlock after valid QR.");
assert(state.latestActivity?.userName === "Gabriel", "Latest activity must be Gabriel.");
assert(state.latestCompletion?.rankAfter === 2, "Completion summary must record rank #2.");
assert(state.leaderboard.find((entry) => entry.teamId === state.team.id)?.rank === 2, "Leaderboard must show Tim Pemuda Sukamaju rank #2.");

submitResult = submitProductMission(state, "KOPI-SUKAMAJU-001");
assert(submitResult.status === "duplicate", "Duplicate QR/manual code must be blocked by duplicate guard.");
state = submitResult.state;
assert(state.campaign.currentValue === 74, "Duplicate submit must not increase campaign progress.");
assert(state.user.kopoinBalance === 1850, "Duplicate submit must not increase balance.");
assert(state.verificationLogs[0]?.status === "blocked", "Duplicate submit must create blocked verification log.");

const invalidBase = joinPemudaSukamajuTeam(resetDemoState());
const invalidResult = submitProductMission(invalidBase, "KOPI-SUKAMAJU-999");
assert(invalidResult.status === "error", "Invalid QR/manual code must fail.");
assert(invalidResult.state.verificationLogs[0]?.status === "rejected", "Invalid QR/manual code must create rejected log.");
assert(invalidResult.state.campaign.currentValue === 73, "Invalid submit must not change progress.");

const voteResult = submitVote(state, "reward_kopi");
assert(voteResult.status === "success", "Voting must succeed for reward_kopi.");
state = voteResult.state;
assert(state.userVote?.optionId === "reward_kopi", "Gabriel vote must be stored.");
assert(state.votePoll.options.find((option) => option.id === "reward_kopi")?.votes === 49, "Selected vote count must increment.");

const adminDashboard = createAdminDashboard(state);
const votingKpi = adminDashboard.kpis.find((kpi) => kpi.label === "Partisipasi Voting");
assert(votingKpi?.value === "1", "Campaign Console voting KPI must update to 1.");
assert(adminDashboard.activityFeed[0]?.userName === "Gabriel", "Campaign Console activity feed must show Gabriel first.");
assert(adminDashboard.progressCurrent === 74, "Campaign Console progress must be 74.");

const teamWrap = createTeamWrap(state);
assert(teamWrap.hasCompletedMission, "Team Wrap must know mission is completed.");
assert(teamWrap.hasVote, "Team Wrap must include voting state.");
assert(teamWrap.rank === 2, "Team Wrap must show rank #2 after scan.");
assert(teamWrap.progressCurrent === 74, "Team Wrap must show progress 74/100.");
assert(teamWrap.voteLabel === "Kupon Kopi Sukamaju", "Team Wrap must show selected reward vote.");

const resetState = resetDemoState();
assert(resetState.campaign.currentValue === 73, "Reset must restore progress to 73/100.");
assert(resetState.user.kopoinBalance === 1730, "Reset must restore balance to 1.730 Kopoin.");
assert(resetState.leaderboard.find((entry) => entry.teamId === resetState.team.id)?.rank === 3, "Reset must restore rank #3.");
assert(resetState.userVote === null, "Reset must clear voting state.");

console.log(`PASS rehearsal ${passLabel}: setup state, QR flow, guard, voting, Team Wrap, Campaign Console, and reset are consistent.`);
