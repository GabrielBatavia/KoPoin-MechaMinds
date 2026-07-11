import { createAdminDashboard } from "../src/services/adminDashboard";
import {
  advanceGuidedDemo,
  exitGuidedDemo,
  getGuidedCheckpoint,
  getGuidedMotionConfig,
  GUIDED_DEMO_TOTAL_CHECKPOINTS,
  normalizeGuidedDemoState,
  startGuidedDemo,
  syncGuidedDemoState
} from "../src/services/guidedDemo";
import {
  getInitialDemoState,
  joinPemudaSukamajuTeam,
  submitProductMission,
  submitVote
} from "../src/services/demoState";

function assert(condition: boolean, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

let appState = getInitialDemoState();
let tour = startGuidedDemo("overlay-tour-test");

assert(GUIDED_DEMO_TOTAL_CHECKPOINTS === 12, "The real-app overlay tour must contain 12 meaningful steps.");
assert(tour.isActive && tour.currentCheckpoint === 1, "Tour must start over the normal app at step 1.");
assert(getGuidedCheckpoint(1)?.targetScreen === "home", "Tour must begin on the real Home screen.");

tour = advanceGuidedDemo(tour, appState);
assert(tour.currentCheckpoint === 2, "Purpose must advance to member value.");
tour = advanceGuidedDemo(tour, appState);
assert(tour.currentCheckpoint === 3, "Member value must advance to the real join card.");

const blockedJoin = advanceGuidedDemo(tour, appState);
assert(blockedJoin.currentCheckpoint === 3, "Join spotlight must wait for the real team state.");

appState = joinPemudaSukamajuTeam(appState);
tour = syncGuidedDemoState(tour, appState);
assert(tour.isRequiredActionCompleted, "Join spotlight must complete from DemoState, not a timer.");
tour = advanceGuidedDemo(tour, appState);
assert(tour.currentCheckpoint === 4 && tour.targetScreen === "mission", "Tour must guide the same app to Mission Hub.");

tour = advanceGuidedDemo(tour, appState);
assert(tour.currentCheckpoint === 5, "Mission context must advance to the real scan component.");
const blockedScan = advanceGuidedDemo(tour, appState);
assert(blockedScan.currentCheckpoint === 5, "Scan spotlight must wait for verification.");

const verified = submitProductMission(appState, "KOPI-SUKAMAJU-001");
assert(verified.status === "success", "The existing demo scan must still succeed.");
appState = verified.state;
tour = syncGuidedDemoState(tour, appState);
assert(tour.isRequiredActionCompleted, "Scan spotlight must read the existing verified log.");
tour = advanceGuidedDemo(tour, appState);
assert(tour.currentCheckpoint === 6, "Verified scan must advance to the real impact card.");

tour = advanceGuidedDemo(tour, appState);
assert(tour.currentCheckpoint === 7, "Impact must advance to the real reward milestone.");
tour = advanceGuidedDemo(tour, appState);
assert(tour.currentCheckpoint === 8, "Reward must advance to the real voting card.");
const blockedVote = advanceGuidedDemo(tour, appState);
assert(blockedVote.currentCheckpoint === 8, "Voting spotlight must wait for the existing vote state.");

const voted = submitVote(appState, "reward_kopi");
assert(voted.status === "success", "Existing voting logic must still succeed.");
appState = voted.state;
tour = syncGuidedDemoState(tour, appState);
assert(tour.isRequiredActionCompleted, "Voting spotlight must complete from userVote.");

for (const expectedStep of [9, 10, 11, 12]) {
  tour = advanceGuidedDemo(tour, appState);
  assert(tour.currentCheckpoint === expectedStep, `Tour must advance to step ${expectedStep}.`);
}

const dashboard = createAdminDashboard(appState);
assert(dashboard.progressCurrent === 74, "Campaign Console must use the same 74/100 state.");
assert(dashboard.remainingActions === 26, "Campaign Console must use the same 26-action reward state.");
assert(dashboard.activityFeed[0]?.userName === "Gabriel", "Campaign Console must show the same verified activity.");
assert(dashboard.verificationLogs[0]?.status === "verified", "Campaign Console must show the same verification log.");
assert(dashboard.kpis.find((kpi) => kpi.label === "Partisipasi Voting")?.value === "1", "Campaign Console must show the same vote.");

tour = advanceGuidedDemo(tour, appState);
assert(tour.isFinished && !tour.isActive, "Final explanation must close only the overlay and leave the app usable.");

const closedTour = exitGuidedDemo(startGuidedDemo("close-test"));
const restoredTour = normalizeGuidedDemoState(JSON.parse(JSON.stringify(closedTour)));
assert(!restoredTour.isActive && restoredTour.currentCheckpoint === 1, "Closing the overlay must not alter app state or navigation data.");

const reducedMotion = getGuidedMotionConfig(true);
assert(!reducedMotion.allowPulse, "Reduce Motion must disable repeated spotlight pulse.");
assert(reducedMotion.contentDuration < getGuidedMotionConfig(false).contentDuration, "Reduce Motion must shorten card transitions.");

assert(appState.team.name === "Tim Pemuda Sukamaju", "The overlay must preserve the normal app's team identity.");
assert(appState.user.kopoinBalance === 1850, "The overlay must rely on the existing app balance state.");

console.log("PASS guided overlay: 12 real-screen steps, three state-gated actions, close behavior, and shared Console state are consistent.");
