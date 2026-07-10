import { StyleSheet, Text, View } from "react-native";

import { colors, radii, shadows, spacing } from "../../theme";

export function HeroCard() {
  return (
    <View style={styles.heroCard}>
      <View style={styles.heroOrb} />
      <Text style={styles.kicker}>Kopoin MVP</Text>
      <Text style={styles.heroTitle}>Setiap Aksi Punya Nilai</Text>
      <Text style={styles.heroCopy}>
        Gabung tim, jalankan misi koperasi, dapat Kopoin, naikkan progres, dan tunjukkan dampaknya ke Campaign Console.
      </Text>
      <View style={styles.mockPill}>
        <Text style={styles.mockPillText}>Mock API SIMKOPDES · Demo Sukamaju</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heroCard: {
    position: "relative",
    overflow: "hidden",
    borderRadius: radii.xl,
    padding: spacing.xl,
    backgroundColor: colors.teal,
    marginBottom: spacing.md,
    ...shadows.card
  },
  heroOrb: {
    position: "absolute",
    right: -52,
    top: -40,
    width: 170,
    height: 170,
    borderRadius: 100,
    backgroundColor: colors.gold,
    opacity: 0.26
  },
  kicker: {
    color: colors.mint,
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 1.4,
    textTransform: "uppercase"
  },
  heroTitle: {
    color: colors.white,
    fontSize: 34,
    lineHeight: 39,
    fontWeight: "900",
    marginTop: spacing.sm,
    maxWidth: 280
  },
  heroCopy: {
    color: "#E5FFF5",
    fontSize: 15,
    lineHeight: 23,
    marginTop: spacing.md
  },
  mockPill: {
    alignSelf: "flex-start",
    marginTop: spacing.lg,
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: "rgba(255, 255, 255, 0.14)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)"
  },
  mockPillText: {
    color: colors.white,
    fontWeight: "800",
    fontSize: 12
  }
});
