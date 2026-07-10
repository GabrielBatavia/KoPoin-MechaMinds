import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import { Section } from "../components/ui/Section";
import type { VerificationLog } from "../data/kopoinSeed";
import { colors, radii, spacing } from "../theme";

export type FeedbackTone = "info" | "success" | "warning" | "error";

type QRFallbackScreenProps = {
  feedback: string;
  feedbackTone: FeedbackTone;
  manualCode: string;
  onManualCodeChange: (value: string) => void;
  onResetDemo: () => void;
  onSubmitMission: () => void;
  usedQrCodes: string[];
  verificationLogs: VerificationLog[];
};

export function QRFallbackScreen({
  feedback,
  feedbackTone,
  manualCode,
  onManualCodeChange,
  onResetDemo,
  onSubmitMission,
  usedQrCodes,
  verificationLogs
}: QRFallbackScreenProps) {
  const recentLogs = verificationLogs.slice(0, 3);

  return (
    <Section title="QR Fallback Demo" eyebrow="Step 4">
      <Text style={styles.bodyText}>
        Kamera QR bisa ditambahkan nanti. Untuk demo stabil, gunakan kode manual valid.
      </Text>
      <TextInput
        value={manualCode}
        onChangeText={onManualCodeChange}
        autoCapitalize="characters"
        autoCorrect={false}
        style={styles.input}
        placeholder="KOPI-SUKAMAJU-001"
        placeholderTextColor={colors.muted}
      />
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.primaryButton} onPress={onSubmitMission}>
          <Text style={styles.primaryButtonText}>Validasi Kode Demo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton} onPress={onResetDemo}>
          <Text style={styles.secondaryButtonText}>Reset Demo</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.feedbackBox, feedbackToneStyles[feedbackTone]]}>
        <Text style={[styles.feedbackText, feedbackTextToneStyles[feedbackTone]]}>{feedback}</Text>
      </View>

      <View style={styles.guardPanel}>
        <Text style={styles.guardTitle}>Duplicate guard</Text>
        <Text style={styles.bodyText}>
          {usedQrCodes.length > 0
            ? `Kode terpakai: ${usedQrCodes.join(", ")}. Submit ulang akan diblokir dan dicatat di log.`
            : "Belum ada kode yang dipakai. Kode valid pertama akan masuk ledger aksi."}
        </Text>
      </View>

      {recentLogs.length > 0 ? (
        <View style={styles.logPanel}>
          <Text style={styles.guardTitle}>Log verifikasi terbaru</Text>
          {recentLogs.map((log) => (
            <View key={log.id} style={styles.logRow}>
              <Text style={statusStyles[log.status]}>{log.status.toUpperCase()}</Text>
              <View style={styles.logTextWrap}>
                <Text style={styles.logCode}>{log.qrCode}</Text>
                <Text style={styles.logReason}>{log.reason}</Text>
              </View>
            </View>
          ))}
        </View>
      ) : null}
    </Section>
  );
}

const styles = StyleSheet.create({
  bodyText: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 4
  },
  input: {
    marginTop: spacing.md,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.line,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    color: colors.slate,
    backgroundColor: colors.cream,
    fontSize: 16,
    fontWeight: "800"
  },
  buttonRow: {
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.sm
  },
  primaryButton: {
    flex: 1,
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
  secondaryButton: {
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
    backgroundColor: colors.cream,
    borderWidth: 1,
    borderColor: colors.creamStrong,
    alignItems: "center",
    justifyContent: "center"
  },
  secondaryButtonText: {
    color: colors.teal,
    fontSize: 14,
    fontWeight: "900"
  },
  feedbackBox: {
    marginTop: spacing.md,
    borderRadius: radii.md,
    padding: spacing.md,
    borderWidth: 1
  },
  feedbackText: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "800"
  },
  guardPanel: {
    marginTop: spacing.md,
    borderRadius: radii.md,
    padding: spacing.md,
    backgroundColor: "#FFF8E6",
    borderWidth: 1,
    borderColor: "#F1D98D"
  },
  guardTitle: {
    color: colors.slate,
    fontSize: 14,
    fontWeight: "900"
  },
  logPanel: {
    marginTop: spacing.sm,
    gap: spacing.sm,
    borderRadius: radii.md,
    padding: spacing.md,
    backgroundColor: colors.cream,
    borderWidth: 1,
    borderColor: colors.creamStrong
  },
  logRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.sm
  },
  logTextWrap: {
    flex: 1
  },
  logCode: {
    color: colors.slate,
    fontSize: 13,
    fontWeight: "900"
  },
  logReason: {
    color: colors.muted,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 2
  }
});

const feedbackToneStyles = StyleSheet.create({
  info: {
    backgroundColor: colors.cream,
    borderColor: colors.creamStrong
  },
  success: {
    backgroundColor: colors.teal,
    borderColor: colors.tealDark
  },
  warning: {
    backgroundColor: "#FFF8E6",
    borderColor: "#F1D98D"
  },
  error: {
    backgroundColor: "#FFF1EE",
    borderColor: "#F1B2AA"
  }
});

const feedbackTextToneStyles = StyleSheet.create({
  info: {
    color: colors.muted
  },
  success: {
    color: colors.white,
    fontWeight: "900"
  },
  warning: {
    color: colors.tealDark,
    fontWeight: "900"
  },
  error: {
    color: colors.danger,
    fontWeight: "900"
  }
});

const statusStyles = StyleSheet.create({
  verified: {
    color: colors.success,
    fontSize: 11,
    fontWeight: "900",
    width: 68
  },
  rejected: {
    color: colors.danger,
    fontSize: 11,
    fontWeight: "900",
    width: 68
  },
  blocked: {
    color: colors.tealDark,
    fontSize: 11,
    fontWeight: "900",
    width: 68
  }
});
