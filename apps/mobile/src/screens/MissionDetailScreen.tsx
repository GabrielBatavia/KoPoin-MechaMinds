import { StyleSheet, Text, View } from "react-native";

import { ProgressBar } from "../components/ui/ProgressBar";
import { Section } from "../components/ui/Section";
import type { Campaign, Mission } from "../data/kopoinSeed";
import { colors, radii, spacing } from "../theme";

type MissionDetailScreenProps = {
  campaign: Campaign;
  mission?: Mission;
};

export function MissionDetailScreen({ campaign, mission }: MissionDetailScreenProps) {
  const progressPercent = Math.round((campaign.currentValue / campaign.targetValue) * 100);
  const actionsLeft = campaign.targetValue - campaign.currentValue;

  return (
    <Section title="Mission Detail" eyebrow="Step 3">
      <View style={styles.progressPanel}>
        <View style={styles.progressTopline}>
          <Text style={styles.cardTitle}>{campaign.title}</Text>
          <Text style={styles.progressValue}>{campaign.currentValue}/{campaign.targetValue}</Text>
        </View>
        <ProgressBar percent={progressPercent} />
        <Text style={styles.bodyText}>
          {actionsLeft} aksi lagi untuk membuka {campaign.rewardTitle}.
        </Text>
      </View>

      {mission ? (
        <View style={styles.missionCard}>
          <View style={styles.priorityPill}>
            <Text style={styles.priorityText}>{mission.priority}</Text>
          </View>
          <Text style={styles.cardTitle}>{mission.title}</Text>
          <Text style={styles.bodyText}>{mission.description}</Text>
          <Text style={styles.rewardText}>+{mission.points} Kopoin · {mission.deadlineLabel}</Text>
        </View>
      ) : (
        <Text style={styles.bodyText}>Misi utama belum tersedia di seed data.</Text>
      )}
    </Section>
  );
}

const styles = StyleSheet.create({
  progressPanel: {
    borderRadius: radii.lg,
    padding: spacing.md,
    backgroundColor: colors.cream
  },
  progressTopline: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.md
  },
  progressValue: {
    color: colors.teal,
    fontSize: 18,
    fontWeight: "900"
  },
  missionCard: {
    marginTop: spacing.md,
    borderRadius: radii.lg,
    padding: spacing.md,
    backgroundColor: "#ECFFFA",
    borderWidth: 1,
    borderColor: "#BDEEE3"
  },
  priorityPill: {
    alignSelf: "flex-start",
    borderRadius: 999,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    backgroundColor: colors.teal,
    marginBottom: spacing.sm
  },
  priorityText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: "900"
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
  rewardText: {
    color: colors.teal,
    fontSize: 14,
    fontWeight: "900",
    marginTop: spacing.sm
  }
});
