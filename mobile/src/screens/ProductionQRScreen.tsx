import { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text, TextInput, View } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import type { BarcodeScanningResult } from "expo-camera";

import type { VerificationLog } from "../data/kopoinSeed";
import { MotionPressable } from "../components/ui/MotionPressable";
import { SpotlightTarget } from "../components/guided/GuidedOverlay";
import { useAppActive } from "../hooks/use-app-active";
import { useReduceMotion } from "../hooks/use-reduce-motion";
import { motion } from "../motion";
import { colors, radii, spacing } from "../theme";

export type ProductionQRFeedbackTone = "info" | "success" | "warning" | "error";

type ProductionQRScreenProps = {
  feedback: string;
  feedbackTone: ProductionQRFeedbackTone;
  manualCode: string;
  onDemoScan: () => void;
  onManualCodeChange: (value: string) => void;
  onScanCode: (code: string) => void;
  onSubmitMission: () => void;
  scanCompleted: boolean;
  usedQrCodes: string[];
  verificationLogs: VerificationLog[];
};

export function ProductionQRScreen({
  feedback,
  feedbackTone,
  manualCode,
  onDemoScan,
  onManualCodeChange,
  onScanCode,
  onSubmitMission,
  scanCompleted,
  usedQrCodes,
  verificationLogs
}: ProductionQRScreenProps) {
  const appActive = useAppActive();
  const reduceMotion = useReduceMotion();
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraOpen, setCameraOpen] = useState(false);
  const [scanLocked, setScanLocked] = useState(false);
  const scanLine = useRef(new Animated.Value(0)).current;
  const unlockTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const recentLogs = verificationLogs.slice(0, 3);
  const canShowCamera = cameraOpen && permission?.granted;

  useEffect(() => {
    if (!appActive || !canShowCamera || scanCompleted || reduceMotion) {
      scanLine.stopAnimation();
      scanLine.setValue(0);
      return;
    }

    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(scanLine, {
          toValue: 1,
          duration: motion.duration.celebration,
          easing: motion.easing.enter,
          useNativeDriver: true,
        }),
        Animated.timing(scanLine, {
          toValue: 0,
          duration: motion.duration.celebration,
          easing: motion.easing.exit,
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [appActive, canShowCamera, reduceMotion, scanCompleted, scanLine]);

  useEffect(() => () => {
    if (unlockTimer.current) {
      clearTimeout(unlockTimer.current);
    }
  }, []);

  function handleBarcodeScanned(result: BarcodeScanningResult) {
    if (scanLocked || scanCompleted) {
      return;
    }

    setScanLocked(true);
    onScanCode(result.data);
    if (unlockTimer.current) {
      clearTimeout(unlockTimer.current);
    }
    unlockTimer.current = setTimeout(() => setScanLocked(false), 1600);
  }

  return (
    <View style={styles.card}>
      <View style={styles.topline}>
        <View style={styles.flexOne}>
          <Text style={styles.kicker}>QR verification</Text>
          <Text style={styles.title}>Scan transaksi produk lokal</Text>
        </View>
        <View style={scanCompleted ? styles.statusPillDone : styles.statusPill}>
          <Text style={scanCompleted ? styles.statusTextDone : styles.statusText}>{scanCompleted ? "Verified" : "Ready"}</Text>
        </View>
      </View>

      <Text style={styles.copy}>
        Kamera dipakai jika tersedia di Expo Go. Untuk simulasi terpandu yang stabil, tombol Scan Kode Demo tetap menjalankan validasi yang sama.
      </Text>

      {canShowCamera ? (
        <View style={styles.cameraShell}>
          <CameraView
            barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
            onBarcodeScanned={handleBarcodeScanned}
            style={styles.camera}
          />
          <View style={[styles.scanFrame, scanCompleted && styles.scanFrameDone]} />
          {!scanCompleted && !reduceMotion ? (
            <Animated.View
              pointerEvents="none"
              style={[
                styles.scanLine,
                {
                  transform: [
                    { translateY: scanLine.interpolate({ inputRange: [0, 1], outputRange: [0, 160] }) },
                  ],
                },
              ]}
            />
          ) : null}
          <Text style={styles.cameraHint}>Arahkan kamera ke QR Kopoin</Text>
        </View>
      ) : (
        <View style={styles.cameraPlaceholder}>
          <Text style={styles.placeholderTitle}>Camera-ready path</Text>
          <Text style={styles.placeholderCopy}>
            Beri izin kamera untuk scan QR sungguhan, atau gunakan kode demo jika perangkat tidak memberi izin.
          </Text>
        </View>
      )}

      <View style={styles.actionGrid}>
        {permission?.granted ? (
          <MotionPressable style={styles.secondaryButton} onPress={() => setCameraOpen((current) => !current)}>
            <Text style={styles.secondaryButtonText}>{cameraOpen ? "Tutup Kamera" : "Buka Kamera"}</Text>
          </MotionPressable>
        ) : (
          <MotionPressable style={styles.secondaryButton} onPress={requestPermission}>
            <Text style={styles.secondaryButtonText}>Izinkan Kamera</Text>
          </MotionPressable>
        )}
        <SpotlightTarget targetKey="mission.scan" style={styles.actionTarget}>
          <MotionPressable style={styles.primaryButton} onPress={onDemoScan}>
            <Text style={styles.primaryButtonText}>Scan Kode Demo</Text>
          </MotionPressable>
        </SpotlightTarget>
      </View>

      <View style={styles.manualBox}>
        <Text style={styles.manualLabel}>Fallback manual</Text>
        <TextInput
          autoCapitalize="characters"
          autoCorrect={false}
          onChangeText={onManualCodeChange}
          placeholder="KOPI-SUKAMAJU-001"
          placeholderTextColor="#8AA5A0"
          style={styles.input}
          value={manualCode}
        />
        <MotionPressable style={styles.submitButton} onPress={onSubmitMission}>
          <Text style={styles.submitButtonText}>Validasi Kode Manual</Text>
        </MotionPressable>
      </View>

      <View style={[styles.feedbackBox, feedbackToneStyles[feedbackTone]]}>
        <Text style={[styles.feedbackText, feedbackTextToneStyles[feedbackTone]]}>{feedback}</Text>
      </View>

      <View style={styles.guardBox}>
        <Text style={styles.guardTitle}>Duplicate guard</Text>
        <Text style={styles.guardCopy}>
          {usedQrCodes.length > 0
            ? `Kode terpakai: ${usedQrCodes.join(", ")}. Submit ulang akan diblokir.`
            : "Belum ada kode yang dipakai. Kode valid pertama akan masuk ledger."}
        </Text>
      </View>

      {recentLogs.length > 0 ? (
        <View style={styles.logBox}>
          <Text style={styles.guardTitle}>Log terbaru</Text>
          {recentLogs.map((log) => (
            <View key={log.id} style={styles.logRow}>
              <Text style={statusStyles[log.status]}>{log.status.toUpperCase()}</Text>
              <View style={styles.flexOne}>
                <Text style={styles.logCode}>{log.qrCode}</Text>
                <Text style={styles.logReason}>{log.reason}</Text>
              </View>
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 30,
    padding: spacing.md,
    backgroundColor: colors.white,
    gap: spacing.md
  },
  topline: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.md
  },
  flexOne: {
    flex: 1
  },
  kicker: {
    color: colors.teal,
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 1,
    textTransform: "uppercase"
  },
  title: {
    color: colors.slate,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "900",
    marginTop: 3
  },
  copy: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "700"
  },
  statusPill: {
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.cream
  },
  statusPillDone: {
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.teal
  },
  statusText: {
    color: colors.teal,
    fontSize: 12,
    fontWeight: "900"
  },
  statusTextDone: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "900"
  },
  cameraShell: {
    position: "relative",
    overflow: "hidden",
    height: 280,
    borderRadius: 26,
    backgroundColor: colors.ink
  },
  camera: {
    ...StyleSheet.absoluteFillObject
  },
  scanFrame: {
    position: "absolute",
    left: "17%",
    right: "17%",
    top: 54,
    bottom: 54,
    borderRadius: 24,
    borderWidth: 3,
    borderColor: colors.turquoise,
    backgroundColor: "rgba(25,168,142,0.08)"
  },
  scanFrameDone: {
    borderColor: colors.success,
    backgroundColor: "rgba(18,128,92,0.16)"
  },
  scanLine: {
    position: "absolute",
    left: "20%",
    right: "20%",
    top: 66,
    height: 2,
    borderRadius: 999,
    backgroundColor: colors.gold,
    shadowColor: colors.gold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 6,
    elevation: 3
  },
  cameraHint: {
    position: "absolute",
    alignSelf: "center",
    bottom: spacing.md,
    color: colors.white,
    fontSize: 13,
    fontWeight: "900"
  },
  cameraPlaceholder: {
    minHeight: 210,
    borderRadius: 26,
    padding: spacing.lg,
    justifyContent: "center",
    backgroundColor: colors.inkSoft,
    borderWidth: 1,
    borderColor: "rgba(25,168,142,0.38)"
  },
  placeholderTitle: {
    color: colors.white,
    fontSize: 24,
    fontWeight: "900"
  },
  placeholderCopy: {
    color: "#D6F7EE",
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "700",
    marginTop: spacing.sm
  },
  actionGrid: {
    flexDirection: "row",
    gap: spacing.sm
  },
  actionTarget: {
    flex: 1
  },
  primaryButton: {
    flex: 1,
    borderRadius: radii.md,
    paddingVertical: 14,
    paddingHorizontal: spacing.sm,
    backgroundColor: colors.turquoise,
    alignItems: "center"
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: "900"
  },
  secondaryButton: {
    flex: 1,
    borderRadius: radii.md,
    paddingVertical: 14,
    paddingHorizontal: spacing.sm,
    backgroundColor: colors.cream,
    alignItems: "center"
  },
  secondaryButtonText: {
    color: colors.teal,
    fontSize: 13,
    fontWeight: "900"
  },
  manualBox: {
    borderRadius: radii.lg,
    padding: spacing.md,
    backgroundColor: colors.cream
  },
  manualLabel: {
    color: colors.teal,
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  input: {
    marginTop: spacing.sm,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.creamStrong,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    color: colors.slate,
    backgroundColor: colors.white,
    fontSize: 15,
    fontWeight: "900"
  },
  submitButton: {
    marginTop: spacing.sm,
    borderRadius: radii.md,
    paddingVertical: 13,
    backgroundColor: colors.teal,
    alignItems: "center"
  },
  submitButtonText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: "900"
  },
  feedbackBox: {
    borderRadius: radii.md,
    padding: spacing.md,
    borderWidth: 1
  },
  feedbackText: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "900"
  },
  guardBox: {
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
  guardCopy: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 20,
    fontWeight: "800",
    marginTop: 3
  },
  logBox: {
    gap: spacing.sm,
    borderRadius: radii.md,
    padding: spacing.md,
    backgroundColor: colors.cream,
    borderWidth: 1,
    borderColor: colors.creamStrong
  },
  logRow: {
    flexDirection: "row",
    gap: spacing.sm
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
    fontWeight: "700"
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
    color: colors.white
  },
  warning: {
    color: colors.tealDark
  },
  error: {
    color: colors.danger
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
