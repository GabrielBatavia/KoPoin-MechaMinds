import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";

import type { Campaign, CompletionSummary, LeaderboardEntry, Team, UserVote, VotePoll } from "../data/kopoinSeed";
import type { TeamWrapData } from "../services/teamWrap";
import { colors, radii, shadows, spacing } from "../theme";
import { formatNumber, formatRupiah } from "../utils/formatters";

type SegmentId = "leaderboard" | "voting" | "team";

type CommunityHubScreenProps = {
  campaign: Campaign;
  completionSummary: CompletionSummary | null;
  currentTeamId: string;
  hasJoinedTeam: boolean;
  leaderboard: LeaderboardEntry[];
  onJoinTeam: () => void;
  onOpenMission: () => void;
  onVote: (optionId: string) => void;
  scanCompleted: boolean;
  team: Team;
  teamWrap: TeamWrapData;
  userVote: UserVote | null;
  voteFeedback: string;
  votePoll: VotePoll;
};

const segments: { id: SegmentId; label: string }[] = [
  { id: "leaderboard", label: "Leaderboard" },
  { id: "voting", label: "Voting" },
  { id: "team", label: "Tim" }
];

export function CommunityHubScreen({
  campaign,
  completionSummary,
  currentTeamId,
  hasJoinedTeam,
  leaderboard,
  onJoinTeam,
  onOpenMission,
  onVote,
  scanCompleted,
  team,
  teamWrap,
  userVote,
  voteFeedback,
  votePoll
}: CommunityHubScreenProps) {
  const [activeSegment, setActiveSegment] = useState<SegmentId>("leaderboard");
  const topTeams = [...leaderboard].sort((left, right) => left.rank - right.rank).slice(0, 3);
  const currentTeam = leaderboard.find((entry) => entry.teamId === currentTeamId);

  return (
    <View style={styles.screen}>
      <View style={styles.headerRow}>
        <View style={{ alignItems: "flex-start" }}>
          <Image source={require("../assets/images/logo.png")} style={styles.logo} resizeMode="contain" />
          <Text style={styles.headerMeta}>Komunitas</Text>
        </View>
        <View style={styles.rankBadge}>
          <Text style={styles.rankBadgeText}>Rank #{currentTeam?.rank ?? teamWrap.rank}</Text>
        </View>
      </View>

      <View style={styles.identityCard}>
        <View style={styles.identityTopline}>
          <View style={styles.teamAvatar}>
            <Text style={styles.teamAvatarText}>TP</Text>
          </View>
          <View style={styles.flexOne}>
            <Text style={styles.identityLabel}>{hasJoinedTeam ? "Kamu bagian dari tim ini" : "Belum bergabung"}</Text>
            <Text style={styles.identityTitle}>{team.name}</Text>
            <Text style={styles.identityCopy}>Target minggu ini: Dukung produk lokal.</Text>
          </View>
        </View>
        <View style={styles.identityStats}>
          <MiniStat label="Anggota aktif" value="34" />
          <MiniStat label="Campaign" value={`${campaign.currentValue}/${campaign.targetValue}`} />
          <MiniStat label="Rank" value={`#${currentTeam?.rank ?? teamWrap.rank}`} />
        </View>
        {!hasJoinedTeam ? (
          <TouchableOpacity style={styles.joinButton} onPress={onJoinTeam}>
            <Text style={styles.joinButtonText}>Gabung Tim Pemuda Sukamaju</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      <View style={styles.segmentRow}>
        {segments.map((segment) => {
          const selected = segment.id === activeSegment;
          return (
            <TouchableOpacity key={segment.id} style={selected ? styles.segmentActive : styles.segment} onPress={() => setActiveSegment(segment.id)}>
              <Text style={selected ? styles.segmentActiveText : styles.segmentText}>{segment.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {activeSegment === "leaderboard" ? (
        <LeaderboardPanel
          completionSummary={completionSummary}
          currentTeam={currentTeam}
          currentTeamId={currentTeamId}
          leaderboard={leaderboard}
          onOpenMission={onOpenMission}
          scanCompleted={scanCompleted}
          topTeams={topTeams}
        />
      ) : null}

      {activeSegment === "voting" ? (
        <VotingPanel onVote={onVote} userVote={userVote} voteFeedback={voteFeedback} votePoll={votePoll} />
      ) : null}

      {activeSegment === "team" ? (
        <TeamPanel campaign={campaign} scanCompleted={scanCompleted} team={team} teamWrap={teamWrap} />
      ) : null}
    </View>
  );
}

function LeaderboardPanel({
  completionSummary,
  currentTeam,
  currentTeamId,
  leaderboard,
  onOpenMission,
  scanCompleted,
  topTeams
}: {
  completionSummary: CompletionSummary | null;
  currentTeam?: LeaderboardEntry;
  currentTeamId: string;
  leaderboard: LeaderboardEntry[];
  onOpenMission: () => void;
  scanCompleted: boolean;
  topTeams: LeaderboardEntry[];
}) {
  return (
    <View style={styles.panelStack}>
      <View style={styles.podiumRow}>
        {topTeams.map((entry) => {
          const active = entry.teamId === currentTeamId;
          return (
            <View key={entry.teamId} style={active ? styles.podiumCardActive : styles.podiumCard}>
              <View style={entry.rank === 1 ? styles.medalGold : entry.rank === 2 ? styles.medalSilver : styles.medalBronze}>
                <Text style={styles.medalText}>{entry.rank}</Text>
              </View>
              <Text style={active ? styles.podiumNameActive : styles.podiumName}>{entry.teamName}</Text>
              <Text style={active ? styles.podiumScoreActive : styles.podiumScore}>{formatNumber(entry.score)}</Text>
            </View>
          );
        })}
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionKicker}>Breakdown skor sehat</Text>
        <Text style={styles.sectionTitle}>Kontribusi, bukan nominal belanja saja</Text>
        {leaderboard.map((entry) => (
          <View key={entry.teamId} style={entry.teamId === currentTeamId ? styles.teamRowActive : styles.teamRow}>
            <Text style={styles.rankText}>#{entry.rank}</Text>
            <View style={styles.flexOne}>
              <Text style={styles.teamName}>{entry.teamName}</Text>
              <View style={styles.chipRow}>
                <ScoreChip label={`Konsistensi ${entry.breakdown.consistency}%`} />
                <ScoreChip label={`Produk ${entry.breakdown.localProduct}%`} />
              </View>
            </View>
            <Text style={styles.teamScore}>{formatNumber(entry.score)}</Text>
          </View>
        ))}
      </View>

      <View style={styles.myTeamCard}>
        <Text style={styles.sectionKicker}>Tim kamu</Text>
        <Text style={styles.myTeamTitle}>{currentTeam?.teamName ?? "Tim Pemuda Sukamaju"}</Text>
        <Text style={styles.myTeamCopy}>
          {completionSummary
            ? `Naik dari #${completionSummary.rankBefore}. Skor +${formatNumber(completionSummary.scoreAfter - completionSummary.scoreBefore)} masuk dari aksi Gabriel.`
            : "Aksi berikutnya bisa membantu tim naik peringkat dan membuka reward bersama."}
        </Text>
        <TouchableOpacity style={styles.primaryButton} onPress={onOpenMission}>
          <Text style={styles.primaryButtonText}>{scanCompleted ? "Cek Duplicate Guard" : "Naikkan Peringkat"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function VotingPanel({ onVote, userVote, voteFeedback, votePoll }: { onVote: (optionId: string) => void; userVote: UserVote | null; voteFeedback: string; votePoll: VotePoll }) {
  return (
    <View style={styles.panelStack}>
      <View style={styles.voteCard}>
        <Text style={styles.sectionKicker}>Voting komunitas</Text>
        <Text style={styles.sectionTitle}>{votePoll.title}</Text>
        <Text style={styles.sectionCopy}>{votePoll.note}</Text>
        {votePoll.options.map((option) => {
          const selected = userVote?.optionId === option.id;
          return (
            <TouchableOpacity key={option.id} style={selected ? styles.voteRowSelected : styles.voteRow} onPress={() => onVote(option.id)}>
              <View style={styles.voteTopline}>
                <Text style={styles.voteLabel}>{option.label}</Text>
                <Text style={styles.votePercent}>{option.percent}%</Text>
              </View>
              <View style={styles.voteTrack}>
                <View style={[selected ? styles.voteFillSelected : styles.voteFill, { width: `${option.percent}%` }]} />
              </View>
              <Text style={styles.voteCount}>{selected ? "Pilihan kamu - " : ""}{option.votes} suara demo</Text>
            </TouchableOpacity>
          );
        })}
        <View style={userVote ? styles.voteFeedbackSuccess : styles.voteFeedback}>
          <Text style={userVote ? styles.voteFeedbackTextSuccess : styles.voteFeedbackText}>{voteFeedback}</Text>
        </View>
      </View>

      <View style={styles.miniCardGrid}>
        <CategoryCard title="Misi Berikutnya" copy="Pilih campaign komunitas." />
        <CategoryCard title="Produk Lokal" copy="Angkat UMKM anggota." />
        <CategoryCard title="Reward Bersama" copy="Tentukan benefit tim." />
      </View>
    </View>
  );
}

function TeamPanel({ campaign, scanCompleted, team, teamWrap }: { campaign: Campaign; scanCompleted: boolean; team: Team; teamWrap: TeamWrapData }) {
  return (
    <View style={styles.panelStack}>
      <View style={styles.sectionCard}>
        <Text style={styles.sectionKicker}>Belonging</Text>
        <Text style={styles.sectionTitle}>{team.name}</Text>
        <View style={styles.teamMetricGrid}>
          <TeamMetric label="Anggota ikut" value="34" />
          <TeamMetric label="UMKM didukung" value="2" />
          <TeamMetric label="Dukungan lokal" value={formatRupiah(2400000)} />
          <TeamMetric label="Progress" value={`${campaign.currentValue}%`} />
        </View>
      </View>

      <View style={styles.unlockCard}>
        <Text style={styles.sectionKicker}>Community unlock</Text>
        <Text style={styles.unlockTitle}>{campaign.rewardTitle}</Text>
        <Text style={styles.sectionCopy}>{teamWrap.progressCurrent}/{teamWrap.progressTarget} aksi. {teamWrap.remainingActions} aksi lagi menuju reward berikutnya.</Text>
        <View style={styles.unlockTrack}>
          <View style={[styles.unlockFill, { width: `${teamWrap.progressPercent}%` }]} />
        </View>
      </View>

      <View style={styles.wrapCard}>
        <Text style={styles.wrapBrand}>Kopoin Team Wrap</Text>
        <Text style={styles.wrapHeadline}>{scanCompleted ? "Tim Pemuda Sukamaju naik ke #2" : "Aksi berikutnya bisa mengubah leaderboard"}</Text>
        <Text style={styles.wrapCopy}>{teamWrap.campaignTitle}</Text>
        <View style={styles.wrapGrid}>
          <WrapStat label="Rank" value={`#${teamWrap.rank}`} />
          <WrapStat label="Skor" value={formatNumber(teamWrap.score)} />
          <WrapStat label="Kopoin" value={teamWrap.hasCompletedMission ? `+${teamWrap.pointsEarned}` : "Menunggu"} />
          <WrapStat label="Voting" value={teamWrap.voteLabel} />
        </View>
      </View>
    </View>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.identityStat}>
      <Text style={styles.identityStatLabel}>{label}</Text>
      <Text style={styles.identityStatValue}>{value}</Text>
    </View>
  );
}

function ScoreChip({ label }: { label: string }) {
  return (
    <View style={styles.scoreChip}>
      <Text style={styles.scoreChipText}>{label}</Text>
    </View>
  );
}

function CategoryCard({ copy, title }: { copy: string; title: string }) {
  return (
    <View style={styles.categoryCard}>
      <Text style={styles.categoryTitle}>{title}</Text>
      <Text style={styles.categoryCopy}>{copy}</Text>
    </View>
  );
}

function TeamMetric({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.teamMetric}>
      <Text style={styles.teamMetricLabel}>{label}</Text>
      <Text style={styles.teamMetricValue}>{value}</Text>
    </View>
  );
}

function WrapStat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.wrapStat}>
      <Text style={styles.wrapStatLabel}>{label}</Text>
      <Text style={styles.wrapStatValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    gap: spacing.md
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  logo: {
    width: 90,
    height: 30,
    marginBottom: 10,
    alignSelf: "flex-start"
  },
  headerMeta: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "900",
    marginTop: -3
  },
  rankBadge: {
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surfaceGold,
    borderWidth: 1,
    borderColor: "#F1D98D"
  },
  rankBadgeText: {
    color: colors.tealDark,
    fontSize: 12,
    fontWeight: "900"
  },
  identityCard: {
    borderRadius: 34,
    padding: spacing.lg,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
    ...shadows.card
  },
  identityTopline: {
    flexDirection: "row",
    gap: spacing.md,
    alignItems: "center"
  },
  teamAvatar: {
    width: 64,
    height: 64,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.teal
  },
  teamAvatarText: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "900"
  },
  identityLabel: {
    color: colors.teal,
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  identityTitle: {
    color: colors.text,
    fontSize: 23,
    lineHeight: 29,
    fontWeight: "900",
    marginTop: 2
  },
  identityCopy: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 19,
    fontWeight: "800",
    marginTop: 2
  },
  identityStats: {
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.md
  },
  identityStat: {
    flex: 1,
    borderRadius: radii.md,
    padding: spacing.sm,
    backgroundColor: colors.surfaceMint,
    borderWidth: 1,
    borderColor: colors.line
  },
  identityStatLabel: {
    color: colors.muted,
    fontSize: 10,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  identityStatValue: {
    color: colors.teal,
    fontSize: 16,
    fontWeight: "900",
    marginTop: 2
  },
  joinButton: {
    marginTop: spacing.md,
    borderRadius: radii.md,
    paddingVertical: 14,
    alignItems: "center",
    backgroundColor: colors.teal
  },
  joinButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "900"
  },
  segmentRow: {
    flexDirection: "row",
    gap: spacing.xs,
    padding: spacing.xs,
    borderRadius: 999,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line
  },
  segmentActive: {
    flex: 1,
    borderRadius: 999,
    paddingVertical: spacing.sm,
    alignItems: "center",
    backgroundColor: colors.teal
  },
  segment: {
    flex: 1,
    borderRadius: 999,
    paddingVertical: spacing.sm,
    alignItems: "center"
  },
  segmentActiveText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "900"
  },
  segmentText: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "900"
  },
  panelStack: {
    gap: spacing.md
  },
  podiumRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: spacing.sm
  },
  podiumCard: {
    flex: 1,
    minHeight: 154,
    borderRadius: 28,
    padding: spacing.md,
    justifyContent: "flex-end",
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line
  },
  podiumCardActive: {
    flex: 1.08,
    minHeight: 184,
    borderRadius: 28,
    padding: spacing.md,
    justifyContent: "flex-end",
    backgroundColor: colors.surfaceMint,
    borderWidth: 1,
    borderColor: colors.turquoise
  },
  medalGold: {
    alignSelf: "center",
    width: 46,
    height: 46,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.gold,
    marginBottom: spacing.md
  },
  medalSilver: {
    alignSelf: "center",
    width: 42,
    height: 42,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DCE3E4",
    marginBottom: spacing.md
  },
  medalBronze: {
    alignSelf: "center",
    width: 42,
    height: 42,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D89B62",
    marginBottom: spacing.md
  },
  medalText: {
    color: colors.tealDark,
    fontSize: 17,
    fontWeight: "900"
  },
  podiumName: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 19,
    fontWeight: "900",
    textAlign: "center"
  },
  podiumNameActive: {
    color: colors.teal,
    fontSize: 14,
    lineHeight: 19,
    fontWeight: "900",
    textAlign: "center"
  },
  podiumScore: {
    color: colors.muted,
    fontSize: 15,
    fontWeight: "900",
    textAlign: "center",
    marginTop: spacing.sm
  },
  podiumScoreActive: {
    color: colors.teal,
    fontSize: 17,
    fontWeight: "900",
    textAlign: "center",
    marginTop: spacing.sm
  },
  sectionCard: {
    borderRadius: radii.lg,
    padding: spacing.md,
    gap: spacing.sm,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line
  },
  sectionKicker: {
    color: colors.teal,
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 20,
    lineHeight: 26,
    fontWeight: "900",
    marginTop: 3
  },
  sectionCopy: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 20,
    fontWeight: "800",
    marginTop: spacing.xs
  },
  teamRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    borderRadius: radii.md,
    padding: spacing.md,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.line
  },
  teamRowActive: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    borderRadius: radii.md,
    padding: spacing.md,
    backgroundColor: colors.surfaceMint,
    borderWidth: 1,
    borderColor: colors.turquoise
  },
  rankText: {
    width: 38,
    color: colors.gold,
    fontSize: 19,
    fontWeight: "900"
  },
  teamName: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "900"
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs,
    marginTop: spacing.xs
  },
  scoreChip: {
    borderRadius: 999,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line
  },
  scoreChipText: {
    color: colors.muted,
    fontSize: 10,
    fontWeight: "900"
  },
  teamScore: {
    color: colors.teal,
    fontSize: 14,
    fontWeight: "900"
  },
  myTeamCard: {
    borderRadius: radii.lg,
    padding: spacing.md,
    backgroundColor: colors.surfaceGold,
    borderWidth: 1,
    borderColor: "#F1D98D"
  },
  myTeamTitle: {
    color: colors.text,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "900",
    marginTop: 3
  },
  myTeamCopy: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 20,
    fontWeight: "800",
    marginTop: spacing.xs
  },
  primaryButton: {
    marginTop: spacing.md,
    borderRadius: radii.md,
    paddingVertical: 14,
    alignItems: "center",
    backgroundColor: colors.teal
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "900"
  },
  voteCard: {
    borderRadius: radii.lg,
    padding: spacing.md,
    gap: spacing.sm,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line
  },
  voteRow: {
    borderRadius: radii.md,
    padding: spacing.md,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.line
  },
  voteRowSelected: {
    borderRadius: radii.md,
    padding: spacing.md,
    backgroundColor: colors.surfaceMint,
    borderWidth: 1,
    borderColor: colors.turquoise
  },
  voteTopline: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.md
  },
  voteLabel: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "900",
    flex: 1
  },
  votePercent: {
    color: colors.teal,
    fontSize: 13,
    fontWeight: "900"
  },
  voteTrack: {
    height: 8,
    borderRadius: 999,
    backgroundColor: colors.white,
    overflow: "hidden",
    marginTop: spacing.sm
  },
  voteFill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: colors.turquoise
  },
  voteFillSelected: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: colors.gold
  },
  voteCount: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "800",
    marginTop: spacing.xs
  },
  voteFeedback: {
    borderRadius: radii.md,
    padding: spacing.md,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.line
  },
  voteFeedbackSuccess: {
    borderRadius: radii.md,
    padding: spacing.md,
    backgroundColor: colors.teal
  },
  voteFeedbackText: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 20,
    fontWeight: "800"
  },
  voteFeedbackTextSuccess: {
    color: colors.white,
    fontSize: 13,
    lineHeight: 20,
    fontWeight: "900"
  },
  miniCardGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm
  },
  categoryCard: {
    minWidth: "47%",
    flex: 1,
    borderRadius: radii.lg,
    padding: spacing.md,
    backgroundColor: colors.surfaceMint,
    borderWidth: 1,
    borderColor: colors.line
  },
  categoryTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "900"
  },
  categoryCopy: {
    color: colors.muted,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "800",
    marginTop: 3
  },
  teamMetricGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    marginTop: spacing.md
  },
  teamMetric: {
    minWidth: "47%",
    flex: 1,
    borderRadius: radii.md,
    padding: spacing.md,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.line
  },
  teamMetricLabel: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  teamMetricValue: {
    color: colors.teal,
    fontSize: 18,
    fontWeight: "900",
    marginTop: 4
  },
  unlockCard: {
    borderRadius: radii.lg,
    padding: spacing.md,
    backgroundColor: colors.surfaceGold,
    borderWidth: 1,
    borderColor: "#F1D98D"
  },
  unlockTitle: {
    color: colors.text,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "900",
    marginTop: 3
  },
  unlockTrack: {
    height: 11,
    borderRadius: 999,
    backgroundColor: colors.white,
    overflow: "hidden",
    marginTop: spacing.md
  },
  unlockFill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: colors.teal
  },
  wrapCard: {
    overflow: "hidden",
    borderRadius: 32,
    padding: spacing.lg,
    backgroundColor: colors.teal,
    borderWidth: 1,
    borderColor: colors.turquoise
  },
  wrapBrand: {
    color: "#D8FFF5",
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  wrapHeadline: {
    color: colors.white,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "900",
    marginTop: spacing.md
  },
  wrapCopy: {
    color: "#D8FFF5",
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "800",
    marginTop: spacing.sm
  },
  wrapGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    marginTop: spacing.md
  },
  wrapStat: {
    minWidth: "47%",
    flex: 1,
    borderRadius: radii.md,
    padding: spacing.md,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.16)"
  },
  wrapStatLabel: {
    color: "#D8FFF5",
    fontSize: 11,
    fontWeight: "900"
  },
  wrapStatValue: {
    color: colors.white,
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "900",
    marginTop: 3
  },
  flexOne: {
    flex: 1
  }
});
