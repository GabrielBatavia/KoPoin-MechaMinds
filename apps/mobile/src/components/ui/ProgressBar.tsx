import { StyleSheet, View } from "react-native";

import { colors } from "../../theme";

type ProgressBarProps = {
  percent: number;
};

export function ProgressBar({ percent }: ProgressBarProps) {
  const clampedPercent = Math.max(0, Math.min(percent, 100));

  return (
    <View style={styles.progressTrack}>
      <View style={[styles.progressFill, { width: `${clampedPercent}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  progressTrack: {
    height: 12,
    borderRadius: 999,
    backgroundColor: colors.creamStrong,
    overflow: "hidden",
    marginVertical: 16
  },
  progressFill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: colors.gold
  }
});
