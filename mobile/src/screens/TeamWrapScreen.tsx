import { StyleSheet, Text, View } from "react-native";

import { ProgressBar } from "../components/ui/ProgressBar";
import { Section } from "../components/ui/Section";
import type { TeamWrapData } from "../services/teamWrap";
import { colors, radii, spacing } from "../theme";
import { formatNumber } from "../utils/formatters";
import { SpotlightTarget } from "../components/guided/GuidedOverlay";

type TeamWrapScreenProps = {
  wrap: TeamWrapData;
};

export function TeamWrapScreen({ wrap }: TeamWrapScreenProps) {
  return (
    <Section title="Team Wrap" eyebrow="Sprint 2 P1">
      <SpotlightTarget targetKey="team-wrap.card">
      <View style={styles.wrapFrame}>
        <View style={styles.orbLarge} />
        <View style={styles.orbSmall} />

        <View style={styles.wrapHeader}>
          <View style={styles.brandPill}>
            <Text style={styles.brandPillText}>Kopoin Team Wrap</Text>
          </View>
          <Text style={styles.generatedText}>{wrap.generatedAtLabel}</Text>
        </View>

        <Text style={styles.headline}>{wrap.headline}</Text>
        <Text style={styles.subcopy}>{wrap.campaignTitle}</Text>

        <View style={styles.rankCard}>
          <Text style={styles.rankLabel}>Peringkat Tim</Text>
          <Text style={styles.rankValue}>#{wrap.rank}</Text>
          <Text style={styles.rankMeta}>{formatNumber(wrap.score)} skor sehat</Text>
        </View>

        <View style={styles.statGrid}>
          <WrapStat label="Produk lokal" value={wrap.productName} />
          <WrapStat label="Kopoin aksi" value={wrap.hasCompletedMission ? `+${wrap.pointsEarned}` : "Menunggu aksi"} />
          <WrapStat label="Badge" value={wrap.hasCompletedMission ? wrap.achievementTitle : "Siap dibuka"} />
          <WrapStat label="Voting" value={wrap.voteLabel} />
        </View>

        <View style={styles.progressCard}>
          <View style={styles.progressTopline}>
            <Text style={styles.progressTitle}>Reward bersama</Text>
            <Text style={styles.progressPercent}>{wrap.progressPercent}%</Text>
          </View>
          <ProgressBar percent={wrap.progressPercent} />
          <Text style={styles.progressCopy}>
            {wrap.progressCurrent}/{wrap.progressTarget} transaksi · {wrap.remainingActions} aksi lagi untuk kupon bersama.
          </Text>
        </View>

        <View style={styles.footerBand}>
          <Text style={styles.footerCta}>{wrap.cta}</Text>
          <Text style={styles.footerBrand}>Kopoin · Setiap Aksi Punya Nilai</Text>
        </View>
      </View>
      </SpotlightTarget>

      <View style={styles.noteBox}>
        <Text style={styles.noteText}>Card ini screenshot-ready untuk demo. Native share bisa ditambahkan setelah core loop tetap stabil.</Text>
      </View>
    </Section>
  );
}

function WrapStat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapFrame: {
    position: "relative",
    overflow: "hidden",
    borderRadius: 32,
    padding: spacing.lg,
    backgroundColor: colors.tealDark,
    borderWidth: 1,
    borderColor: colors.teal
  },
  orbLarge: {
    position: "absolute",
    right: -78,
    top: -62,
    width: 210,
    height: 210,
    borderRadius: 130,
    backgroundColor: colors.gold,
    opacity: 0.22
  },
  orbSmall: {
    position: "absolute",
    left: -40,
    bottom: 116,
    width: 120,
    height: 120,
    borderRadius: 70,
    backgroundColor: colors.turquoise,
    opacity: 0.2
  },
  wrapHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm
  },
  brandPill: {
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: "rgba(255,255,255,0.14)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)"
  },
  brandPillText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "900"
  },
  generatedText: {
    color: "#D6F7EE",
    fontSize: 11,
    fontWeight: "800",
    flex: 1,
    textAlign: "right"
  },
  headline: {
    color: colors.white,
    fontSize: 31,
    lineHeight: 37,
    fontWeight: "900",
    marginTop: spacing.lg,
    maxWidth: 292
  },
  subcopy: {
    color: "#D6F7EE",
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "800",
    marginTop: spacing.sm
  },
  rankCard: {
    marginTop: spacing.lg,
    borderRadius: radii.lg,
    padding: spacing.md,
    backgroundColor: colors.gold
  },
  rankLabel: {
    color: colors.tealDark,
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: 0.8
  },
  rankValue: {
    color: colors.tealDark,
    fontSize: 50,
    lineHeight: 56,
    fontWeight: "900"
  },
  rankMeta: {
    color: colors.tealDark,
    fontSize: 13,
    fontWeight: "900"
  },
  statGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    marginTop: spacing.md
  },
  statCard: {
    minWidth: "47%",
    flex: 1,
    borderRadius: radii.md,
    padding: spacing.md,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.14)"
  },
  statLabel: {
    color: colors.mint,
    fontSize: 11,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  statValue: {
    color: colors.white,
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "900",
    marginTop: 4
  },
  progressCard: {
    marginTop: spacing.md,
    borderRadius: radii.lg,
    padding: spacing.md,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.14)"
  },
  progressTopline: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.md
  },
  progressTitle: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "900"
  },
  progressPercent: {
    color: colors.gold,
    fontSize: 18,
    fontWeight: "900"
  },
  progressCopy: {
    color: "#D6F7EE",
    fontSize: 13,
    lineHeight: 20,
    fontWeight: "800"
  },
  footerBand: {
    marginTop: spacing.lg,
    borderRadius: radii.lg,
    padding: spacing.md,
    backgroundColor: colors.white
  },
  footerCta: {
    color: colors.tealDark,
    fontSize: 17,
    lineHeight: 23,
    fontWeight: "900"
  },
  footerBrand: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "900",
    marginTop: 4
  },
  noteBox: {
    marginTop: spacing.md,
    borderRadius: radii.md,
    padding: spacing.md,
    backgroundColor: colors.cream,
    borderWidth: 1,
    borderColor: colors.creamStrong
  },
  noteText: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 20,
    fontWeight: "800"
  }
});
