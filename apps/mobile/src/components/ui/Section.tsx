import type { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors, radii, shadows, spacing } from "../../theme";

type SectionProps = {
  children: ReactNode;
  eyebrow: string;
  title: string;
};

export function Section({ children, eyebrow, title }: SectionProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.eyebrow}>{eyebrow}</Text>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    borderRadius: radii.lg,
    padding: spacing.md,
    backgroundColor: colors.white,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.line,
    ...shadows.card
  },
  eyebrow: {
    color: colors.turquoise,
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 1.1,
    textTransform: "uppercase"
  },
  sectionTitle: {
    color: colors.slate,
    fontSize: 23,
    lineHeight: 29,
    fontWeight: "900",
    marginTop: 4,
    marginBottom: spacing.md
  }
});
