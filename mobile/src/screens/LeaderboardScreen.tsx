import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

import { Section } from "../components/ui/Section";
import type { CompletionSummary, LeaderboardEntry } from "../data/kopoinSeed";
import { colors, radii, spacing } from "../theme";
import { formatNumber } from "../utils/formatters";

type LeaderboardScreenProps = {
  completionSummary: CompletionSummary | null;
  currentTeamId: string;
  leaderboard: LeaderboardEntry[];
  scanCompleted: boolean;
};

export function LeaderboardScreen({ completionSummary, currentTeamId, leaderboard, scanCompleted }: LeaderboardScreenProps) {
  const scoreDelta = completionSummary ? completionSummary.scoreAfter - completionSummary.scoreBefore : 0;

  return (
    <Section title="Leaderboard Komunitas" eyebrow="Step 6">
      <Text style={styles.bodyText}>
        Skor dihitung dari konsistensi, anggota aktif, produk lokal, belajar, dan voting. Tidak hanya nominal belanja.
      </Text>

      {completionSummary ? (
        <View style={styles.transitionBanner}>
          <Text style={styles.transitionTitle}>Tim Pemuda Sukamaju naik peringkat</Text>
          <Text style={styles.transitionCopy}>
            Rank #{completionSummary.rankBefore} → #{completionSummary.rankAfter} · skor +{formatNumber(scoreDelta)} setelah aksi Anda.
          </Text>
        </View>
      ) : (
        <View style={styles.beforeBanner}>
          <Text style={styles.beforeCopy}>Before demo: Tim Pemuda Sukamaju masih di rank #3. Scan QR untuk melihat transisi leaderboard.</Text>
        </View>
      )}

      {leaderboard.map((entry) => (
        <LeaderboardRow
          completionSummary={completionSummary}
          entry={entry}
          isCurrentTeam={entry.teamId === currentTeamId}
          key={entry.teamId}
          scanCompleted={scanCompleted}
        />
      ))}
    </Section>
  );
}

function LeaderboardRow({
  completionSummary,
  entry,
  isCurrentTeam,
  scanCompleted
}: {
  completionSummary: CompletionSummary | null;
  entry: LeaderboardEntry;
  isCurrentTeam: boolean;
  scanCompleted: boolean;
}) {
  const rowAnim = useRef(new Animated.Value(isCurrentTeam && scanCompleted ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(rowAnim, {
      toValue: isCurrentTeam && scanCompleted ? 1 : 0,
      friction: 8,
      tension: 95,
      useNativeDriver: true
    }).start();
  }, [isCurrentTeam, rowAnim, scanCompleted]);

  const rowStyle = isCurrentTeam ? styles.leaderboardRowActive : styles.leaderboardRow;
  const animatedRowStyle = {
    transform: [
      {
        scale: rowAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.018]
        })
      }
    ]
  };

  return (
    <Animated.View style={[rowStyle, animatedRowStyle]}>
      <Text style={styles.rankText}>#{entry.rank}</Text>
      <View style={styles.flexOne}>
        <View style={styles.teamTitleRow}>
          <Text style={styles.cardTitle}>{entry.teamName}</Text>
          {isCurrentTeam && completionSummary ? <Text style={styles.movePill}>Naik dari #{completionSummary.rankBefore}</Text> : null}
        </View>
        <Text style={styles.bodyText}>
          Konsistensi {entry.breakdown.consistency}% · Produk lokal {entry.breakdown.localProduct}%
        </Text>
      </View>
      <View style={styles.scoreBlock}>
        <Text style={styles.scoreText}>{formatNumber(entry.score)}</Text>
        {isCurrentTeam && completionSummary ? (
          <Text style={styles.scoreDelta}>+{formatNumber(completionSummary.scoreAfter - completionSummary.scoreBefore)}</Text>
        ) : null}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  bodyText: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 4
  },
  transitionBanner: {
    marginTop: spacing.md,
    borderRadius: radii.lg,
    padding: spacing.md,
    backgroundColor: colors.teal,
    borderWidth: 1,
    borderColor: colors.tealDark
  },
  transitionTitle: {
    color: colors.gold,
    fontSize: 17,
    fontWeight: "900"
  },
  transitionCopy: {
    color: colors.white,
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "800",
    marginTop: 4
  },
  beforeBanner: {
    marginTop: spacing.md,
    borderRadius: radii.lg,
    padding: spacing.md,
    backgroundColor: colors.cream,
    borderWidth: 1,
    borderColor: colors.creamStrong
  },
  beforeCopy: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "800"
  },
  leaderboardRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    borderRadius: radii.md,
    padding: spacing.md,
    backgroundColor: colors.cream,
    marginTop: spacing.sm
  },
  leaderboardRowActive: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    borderRadius: radii.md,
    padding: spacing.md,
    backgroundColor: "#E5F8EF",
    borderWidth: 1,
    borderColor: "#A9DFC5",
    marginTop: spacing.sm
  },
  rankText: {
    color: colors.teal,
    fontSize: 22,
    fontWeight: "900",
    width: 42
  },
  flexOne: {
    flex: 1
  },
  teamTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: spacing.xs
  },
  cardTitle: {
    color: colors.slate,
    fontSize: 17,
    lineHeight: 23,
    fontWeight: "900"
  },
  movePill: {
    overflow: "hidden",
    borderRadius: 999,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    backgroundColor: colors.gold,
    color: colors.tealDark,
    fontSize: 11,
    fontWeight: "900"
  },
  scoreBlock: {
    alignItems: "flex-end"
  },
  scoreText: {
    color: colors.slate,
    fontSize: 15,
    fontWeight: "900"
  },
  scoreDelta: {
    color: colors.success,
    fontSize: 12,
    fontWeight: "900",
    marginTop: 2
  }
});
