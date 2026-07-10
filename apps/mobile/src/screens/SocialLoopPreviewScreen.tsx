import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Section } from "../components/ui/Section";
import type { UserVote, VotePoll } from "../data/kopoinSeed";
import { colors, radii, spacing } from "../theme";

type SocialLoopPreviewScreenProps = {
  onVote: (optionId: string) => void;
  userVote: UserVote | null;
  voteFeedback: string;
  votePoll: VotePoll;
};

export function SocialLoopPreviewScreen({
  onVote,
  userVote,
  voteFeedback,
  votePoll
}: SocialLoopPreviewScreenProps) {
  return (
    <Section title="Voting Reward Komunitas" eyebrow="Step 7">
      <View style={styles.pollCard}>
        <View style={styles.pollHeader}>
          <View style={styles.pollTitleWrap}>
            <Text style={styles.cardTitle}>{votePoll.title}</Text>
            <Text style={styles.bodyText}>{votePoll.note}</Text>
          </View>
          <View style={styles.voteStatusPill}>
            <Text style={styles.voteStatusText}>{userVote ? "Sudah vote" : "P1"}</Text>
          </View>
        </View>

        {votePoll.options.map((option) => {
          const isSelected = userVote?.optionId === option.id;

          return (
            <TouchableOpacity
              activeOpacity={0.82}
              key={option.id}
              onPress={() => onVote(option.id)}
              style={isSelected ? styles.voteRowSelected : styles.voteRow}
            >
              <View style={styles.voteTopline}>
                <Text style={styles.voteLabel}>{option.label}</Text>
                {isSelected ? <Text style={styles.selectedPill}>Pilihan kamu</Text> : null}
              </View>
              <View style={styles.voteBarTrack}>
                <View style={[isSelected ? styles.voteBarFillSelected : styles.voteBarFill, { width: `${option.percent}%` }]} />
              </View>
              <View style={styles.voteMetaRow}>
                <Text style={styles.votePercent}>{option.percent}%</Text>
                <Text style={styles.voteCount}>{option.votes} suara demo</Text>
              </View>
            </TouchableOpacity>
          );
        })}

        <View style={userVote ? styles.voteFeedbackSuccess : styles.voteFeedbackBox}>
          <Text style={userVote ? styles.voteFeedbackSuccessText : styles.voteFeedbackText}>{voteFeedback}</Text>
        </View>
      </View>

    </Section>
  );
}

const styles = StyleSheet.create({
  pollCard: {
    borderRadius: radii.lg,
    padding: spacing.md,
    backgroundColor: colors.cream,
    borderWidth: 1,
    borderColor: colors.creamStrong
  },
  pollHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.sm
  },
  pollTitleWrap: {
    flex: 1
  },
  voteStatusPill: {
    borderRadius: 999,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    backgroundColor: colors.gold
  },
  voteStatusText: {
    color: colors.tealDark,
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
  voteRow: {
    marginTop: spacing.md,
    borderRadius: radii.md,
    padding: spacing.md,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line
  },
  voteRowSelected: {
    marginTop: spacing.md,
    borderRadius: radii.md,
    padding: spacing.md,
    backgroundColor: "#ECFFFA",
    borderWidth: 1,
    borderColor: "#BDEEE3"
  },
  voteTopline: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm
  },
  voteLabel: {
    color: colors.slate,
    fontSize: 14,
    fontWeight: "900",
    flex: 1
  },
  selectedPill: {
    overflow: "hidden",
    borderRadius: 999,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    backgroundColor: colors.teal,
    color: colors.white,
    fontSize: 11,
    fontWeight: "900"
  },
  voteBarTrack: {
    height: 9,
    borderRadius: 999,
    backgroundColor: colors.creamStrong,
    overflow: "hidden",
    marginTop: spacing.sm
  },
  voteBarFill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: colors.turquoise
  },
  voteBarFillSelected: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: colors.gold
  },
  voteMetaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: spacing.xs
  },
  votePercent: {
    color: colors.teal,
    fontSize: 12,
    fontWeight: "900"
  },
  voteCount: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "800"
  },
  voteFeedbackBox: {
    marginTop: spacing.md,
    borderRadius: radii.md,
    padding: spacing.md,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line
  },
  voteFeedbackText: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "800"
  },
  voteFeedbackSuccess: {
    marginTop: spacing.md,
    borderRadius: radii.md,
    padding: spacing.md,
    backgroundColor: colors.teal,
    borderWidth: 1,
    borderColor: colors.tealDark
  },
  voteFeedbackSuccessText: {
    color: colors.white,
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "900"
  }
});
