# Mission Reward Voting Design

## Goal

Let team members choose the reward for the next mission before they begin it. The existing reward poll becomes visible in Mission Hub as an inline pre-mission decision card.

## Experience

- The card appears after the campaign/milestone context and before the active mission list.
- Members see three reward options, current vote share, total votes, and the remaining decision state.
- Each member can select one option and change their selection before the poll closes.
- The selected option gets a clear visual state and a short confirmation message.
- The UI uses a warm cream/mint panel, teal progress bars, gold reward accents, staggered option reveal, and a press animation for a friendly cooperative feel.

## Data flow

`App.tsx` passes the existing `votePoll`, `userVote`, `voteFeedback`, and `handleSubmitVote` callback into `MissionHubScreen`. The existing local `submitVote` helper and remote `/vote` endpoint remain the source of truth for one-vote-per-user behavior and vote count recalculation. No new database table is required for this iteration.

## Scope

- Add the voting props to `MissionHubScreen`.
- Add the pre-mission reward voting card and its animated option rows.
- Keep the existing community poll data and backend endpoint, but present it in the mission context.
- Preserve the current local redesign and unrelated screens.

## Verification

- `pnpm typecheck`
- `pnpm rehearse`
- Review the focused diff for state wiring and visual regressions.
