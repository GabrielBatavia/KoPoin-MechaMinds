import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

import { Section } from "../components/ui/Section";
import type { CompletionSummary, User } from "../data/kopoinSeed";
import { colors, radii, spacing } from "../theme";
import { formatNumber } from "../utils/formatters";

type SuccessStateScreenProps = {
  completionSummary: CompletionSummary | null;
  scanCompleted: boolean;
  user: User;
};

export function SuccessStateScreen({ completionSummary, scanCompleted, user }: SuccessStateScreenProps) {
  const successAnim = useRef(new Animated.Value(scanCompleted ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(successAnim, {
      toValue: scanCompleted ? 1 : 0,
      friction: 7,
      tension: 90,
      useNativeDriver: true
    }).start();
  }, [scanCompleted, successAnim]);

  const animatedImpactStyle = {
    opacity: successAnim,
    transform: [
      {
        translateY: successAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [16, 0]
        })
      },
      {
        scale: successAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0.97, 1]
        })
      }
    ]
  };

  return (
    <Section title="Reward dan Achievement" eyebrow="Step 5">
      <View style={styles.rewardGrid}>
        <View style={scanCompleted ? styles.rewardCardActive : styles.rewardCard}>
          <Text style={scanCompleted ? styles.successKickerActive : styles.successKicker}>
            {scanCompleted ? "Kontribusi diverifikasi" : "Menunggu verifikasi"}
          </Text>
          <Text style={scanCompleted ? styles.rewardNumberActive : styles.rewardNumber}>+{completionSummary?.pointsEarned ?? 120}</Text>
          <Text style={scanCompleted ? styles.bodyTextOnDark : styles.bodyText}>Kopoin untuk dukungan produk lokal</Text>
        </View>

        {completionSummary ? (
          <Animated.View style={[styles.impactPanel, animatedImpactStyle]}>
            <Text style={styles.impactTitle}>Misi Tim Bertambah!</Text>
            <Text style={styles.impactCopy}>
              {completionSummary.productName} berhasil masuk ledger. Progres pribadi dan tim langsung berubah.
            </Text>
            <ImpactRow
              label={`Saldo ${user.name || "Tamu"}`}
              before={formatNumber(completionSummary.balanceBefore)}
              after={formatNumber(completionSummary.balanceAfter)}
              suffix="Kopoin"
            />
            <ImpactRow
              label="Progress campaign"
              before={`${completionSummary.progressBefore}/${completionSummary.progressTarget}`}
              after={`${completionSummary.progressAfter}/${completionSummary.progressTarget}`}
            />
            <ImpactRow
              label="Rank tim"
              before={`#${completionSummary.rankBefore}`}
              after={`#${completionSummary.rankAfter}`}
            />
          </Animated.View>
        ) : (
          <View style={styles.pendingPanel}>
            <Text style={styles.pendingTitle}>Before state terkunci</Text>
            <Text style={styles.bodyText}>Scan kode demo untuk melihat saldo, progress, dan rank berubah di sini.</Text>
          </View>
        )}

        <View style={scanCompleted ? styles.rewardCardGoldActive : styles.rewardCardGold}>
          <Text style={styles.achievementIcon}>{user.achievementUnlocked ? "Unlocked" : "Locked"}</Text>
          <Text style={styles.cardTitle}>{completionSummary?.achievementTitle ?? "Anak Lokal, Selera Global"}</Text>
          <Text style={styles.bodyText}>
            {scanCompleted
              ? "Badge terbuka setelah kontribusi Kopi Sukamaju diverifikasi."
              : "Badge akan terbuka setelah QR/manual code valid."}
          </Text>
        </View>
      </View>
    </Section>
  );
}

function ImpactRow({ after, before, label, suffix }: { after: string; before: string; label: string; suffix?: string }) {
  return (
    <View style={styles.impactRow}>
      <Text style={styles.impactLabel}>{label}</Text>
      <Text style={styles.impactValue}>
        {before} <Text style={styles.arrowText}>→</Text> {after}{suffix ? ` ${suffix}` : ""}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  rewardGrid: {
    gap: spacing.sm
  },
  rewardCard: {
    borderRadius: radii.lg,
    padding: spacing.md,
    backgroundColor: "#E9FFF0",
    borderWidth: 1,
    borderColor: "#C7EFD2"
  },
  rewardCardActive: {
    borderRadius: radii.lg,
    padding: spacing.md,
    backgroundColor: colors.teal,
    borderWidth: 1,
    borderColor: colors.tealDark
  },
  rewardCardGold: {
    borderRadius: radii.lg,
    padding: spacing.md,
    backgroundColor: "#FFF6D7",
    borderWidth: 1,
    borderColor: "#F5D878",
    opacity: 0.74
  },
  rewardCardGoldActive: {
    borderRadius: radii.lg,
    padding: spacing.md,
    backgroundColor: "#FFF6D7",
    borderWidth: 1,
    borderColor: "#F5D878"
  },
  successKicker: {
    color: colors.success,
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 0.8,
    textTransform: "uppercase"
  },
  successKickerActive: {
    color: colors.mint,
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 0.8,
    textTransform: "uppercase"
  },
  rewardNumber: {
    color: colors.success,
    fontSize: 38,
    fontWeight: "900",
    marginTop: 2
  },
  rewardNumberActive: {
    color: colors.white,
    fontSize: 38,
    fontWeight: "900",
    marginTop: 2
  },
  impactPanel: {
    borderRadius: radii.lg,
    padding: spacing.md,
    backgroundColor: "#ECFFFA",
    borderWidth: 1,
    borderColor: "#BDEEE3"
  },
  impactTitle: {
    color: colors.tealDark,
    fontSize: 20,
    fontWeight: "900"
  },
  impactCopy: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 4,
    marginBottom: spacing.sm
  },
  impactRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: spacing.sm,
    borderRadius: radii.md,
    paddingVertical: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: "#CFEFE7"
  },
  impactLabel: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "800",
    flex: 1
  },
  impactValue: {
    color: colors.slate,
    fontSize: 14,
    fontWeight: "900",
    textAlign: "right",
    flex: 1
  },
  arrowText: {
    color: colors.gold
  },
  pendingPanel: {
    borderRadius: radii.lg,
    padding: spacing.md,
    backgroundColor: colors.cream,
    borderWidth: 1,
    borderColor: colors.creamStrong
  },
  pendingTitle: {
    color: colors.slate,
    fontSize: 16,
    fontWeight: "900"
  },
  achievementIcon: {
    color: colors.gold,
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 0.7,
    textTransform: "uppercase",
    marginBottom: spacing.xs
  },
  cardTitle: {
    color: colors.slate,
    fontSize: 17,
    lineHeight: 23,
    fontWeight: "900"
  },
  bodyText: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 4
  },
  bodyTextOnDark: {
    color: "#E5FFF5",
    fontSize: 14,
    lineHeight: 21,
    marginTop: 4,
    fontWeight: "800"
  }
});
