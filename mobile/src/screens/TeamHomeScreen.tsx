import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Section } from "../components/ui/Section";
import type { Team } from "../data/kopoinSeed";
import { colors, radii, spacing } from "../theme";

type TeamHomeScreenProps = {
  hasJoinedTeam: boolean;
  onJoinTeam: () => void;
  rank: number;
  team: Team;
};

export function TeamHomeScreen({ hasJoinedTeam, onJoinTeam, rank, team }: TeamHomeScreenProps) {
  return (
    <Section title="Team Home" eyebrow="Step 2">
      <View style={styles.teamHeader}>
        <View style={styles.teamBadge}>
          <Text style={styles.teamBadgeText}>#{rank}</Text>
        </View>
        <View style={styles.flexOne}>
          <Text style={styles.cardTitle}>{team.name}</Text>
          <Text style={styles.bodyText}>
            {team.activeMembers}/{team.members} anggota aktif minggu ini.
          </Text>
        </View>
      </View>

      {!hasJoinedTeam ? (
        <TouchableOpacity style={styles.primaryButton} onPress={onJoinTeam}>
          <Text style={styles.primaryButtonText}>Gabung Tim Pemuda Sukamaju</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.successStrip}>
          <Text style={styles.successStripText}>Anda sudah bergabung di Tim Pemuda Sukamaju.</Text>
        </View>
      )}
    </Section>
  );
}

const styles = StyleSheet.create({
  teamHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    marginBottom: spacing.md
  },
  teamBadge: {
    width: 58,
    height: 58,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.teal
  },
  teamBadgeText: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "900"
  },
  flexOne: {
    flex: 1
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
  primaryButton: {
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
    backgroundColor: colors.teal,
    alignItems: "center",
    justifyContent: "center"
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "900"
  },
  successStrip: {
    borderRadius: radii.md,
    padding: spacing.md,
    backgroundColor: "#E5F8EF",
    borderWidth: 1,
    borderColor: "#BEE8D2"
  },
  successStripText: {
    color: colors.success,
    fontSize: 14,
    fontWeight: "900"
  }
});
