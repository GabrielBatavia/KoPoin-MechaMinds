import { StyleSheet, Text, View } from "react-native";

import { colors, radii, spacing } from "../../theme";

type MetricProps = {
  label: string;
  value: string;
};

export function Metric({ label, value }: MetricProps) {
  return (
    <View style={styles.metricCard}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  metricCard: {
    flex: 1,
    borderRadius: radii.md,
    padding: spacing.md,
    backgroundColor: colors.cream,
    borderWidth: 1,
    borderColor: colors.creamStrong
  },
  metricLabel: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "800"
  },
  metricValue: {
    color: colors.slate,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "900",
    marginTop: 4
  }
});
