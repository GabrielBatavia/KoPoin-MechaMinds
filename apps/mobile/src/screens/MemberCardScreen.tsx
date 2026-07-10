import { StyleSheet, Text, View } from "react-native";

import { Metric } from "../components/ui/Metric";
import { Section } from "../components/ui/Section";
import type { Cooperative, User } from "../data/kopoinSeed";
import { colors, radii, spacing } from "../theme";
import { formatKopoin, formatRupiah } from "../utils/formatters";

type MemberCardScreenProps = {
  cooperative: Cooperative;
  user: User;
};

export function MemberCardScreen({ cooperative, user }: MemberCardScreenProps) {
  return (
    <Section title="Kartu Anggota" eyebrow="Step 1">
      <View style={styles.memberCard}>
        <View>
          <Text style={styles.memberLabel}>{user.name}</Text>
          <Text style={styles.memberMeta}>{user.memberNo}</Text>
          <Text style={styles.memberMeta}>{cooperative.name}</Text>
        </View>
        <View style={styles.statusPill}>
          <Text style={styles.statusPillText}>{user.status}</Text>
        </View>
      </View>
      <View style={styles.statGrid}>
        <Metric label="Saldo" value={formatKopoin(user.kopoinBalance)} />
        <Metric label="Hemat bulan ini" value={formatRupiah(user.monthlySaving)} />
        <Metric label="Streak" value={user.streakLabel} />
      </View>
    </Section>
  );
}

const styles = StyleSheet.create({
  memberCard: {
    borderRadius: radii.lg,
    padding: spacing.md,
    backgroundColor: colors.cream,
    borderWidth: 1,
    borderColor: colors.creamStrong,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: spacing.md
  },
  memberLabel: {
    color: colors.slate,
    fontSize: 27,
    fontWeight: "900"
  },
  memberMeta: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 20,
    fontWeight: "700"
  },
  statusPill: {
    borderRadius: 999,
    backgroundColor: colors.mint,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm
  },
  statusPillText: {
    color: colors.tealDark,
    fontSize: 12,
    fontWeight: "900"
  },
  statGrid: {
    gap: spacing.sm,
    marginTop: spacing.sm
  }
});
