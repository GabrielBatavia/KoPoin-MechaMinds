import { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { colors, radii, spacing } from "../theme";

type JudgeWizardScreenProps = {
  onFinish: () => void;
  onSkip: () => void;
};

const wizardSteps = [
  {
    eyebrow: "Konteks masalah",
    title: "SIMKOPDES sudah digital. Tantangannya adalah adopsi muda.",
    body:
      "Kopoin tidak membangun ulang koperasi, marketplace, atau pembayaran. Kopoin menjadi lapisan aktivasi agar anggota muda punya alasan untuk datang, aktif, dan kembali.",
    proof: ["Status anggota terlihat", "Manfaat langsung terbaca", "Tidak mengklaim integrasi produksi"]
  },
  {
    eyebrow: "Arah solusi",
    title: "Misi tim membuat kontribusi kecil terasa berdampak.",
    body:
      "Juri bisa mencoba sendiri: Gabriel gabung Tim Pemuda Sukamaju, menyelesaikan misi produk lokal, lalu progress tim, saldo, achievement, dan leaderboard berubah.",
    proof: ["Team-based loyalty", "QR verification", "Reward bersama"]
  },
  {
    eyebrow: "Dampak koperasi",
    title: "Pengurus mendapat data aktivitas, bukan sekadar tampilan poin.",
    body:
      "Setiap aksi terverifikasi masuk ke ledger dan Campaign Console. Pengurus bisa melihat progress campaign, tim aktif, voting, dan bukti bahwa anggota muda ikut bergerak.",
    proof: ["Activity ledger", "Guard duplikasi", "KPI campaign"]
  },
  {
    eyebrow: "Cara mencoba MVP",
    title: "Ikuti CTA utama, atau eksplor tab seperti app sungguhan.",
    body:
      "Gunakan tombol Mulai Misi dari Beranda. Jika kamera QR tidak tersedia, tekan Scan Kode Demo atau pakai input manual KOPI-SUKAMAJU-001.",
    proof: ["Expo Go ready", "Fallback aman", "State tersimpan lokal"]
  }
] as const;

export function JudgeWizardScreen({ onFinish, onSkip }: JudgeWizardScreenProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const step = wizardSteps[stepIndex] ?? wizardSteps[0];
  const isLastStep = stepIndex === wizardSteps.length - 1;

  if (!step) {
    return null;
  }

  function handlePrimaryAction() {
    if (isLastStep) {
      onFinish();
      return;
    }

    setStepIndex((current) => current + 1);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.page} showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
          <Text style={styles.logo}>kopoin</Text>
          <TouchableOpacity onPress={onSkip} style={styles.skipButton}>
            <Text style={styles.skipText}>Lewati</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.heroCard}>
          <View style={styles.orbOne} />
          <View style={styles.orbTwo} />
          <Text style={styles.eyebrow}>{step.eyebrow}</Text>
          <Text style={styles.title}>{step.title}</Text>
          <Text style={styles.body}>{step.body}</Text>

          <View style={styles.proofGrid}>
            {step.proof.map((item, index) => (
              <View key={item} style={styles.proofCard}>
                <Text style={styles.proofNumber}>0{index + 1}</Text>
                <Text style={styles.proofText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.impactCard}>
          <Text style={styles.impactLabel}>Narasi utama untuk juri</Text>
          <Text style={styles.impactCopy}>
            Datang karena manfaat. Kembali karena tim. Bertahan karena merasa memiliki.
          </Text>
        </View>

        <View style={styles.footerRow}>
          <View style={styles.dots}>
            {wizardSteps.map((item, index) => (
              <View key={item.eyebrow} style={index === stepIndex ? styles.dotActive : styles.dot} />
            ))}
          </View>
          <TouchableOpacity onPress={handlePrimaryAction} style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>{isLastStep ? "Masuk ke MVP" : "Lanjut"}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.ink
  },
  page: {
    flexGrow: 1,
    padding: spacing.md,
    paddingBottom: spacing.xl,
    justifyContent: "space-between"
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.lg
  },
  logo: {
    color: colors.white,
    fontSize: 32,
    fontWeight: "900",
    letterSpacing: -1.5
  },
  skipButton: {
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.glass,
    borderWidth: 1,
    borderColor: colors.glassStrong
  },
  skipText: {
    color: "#D6F7EE",
    fontSize: 13,
    fontWeight: "900"
  },
  heroCard: {
    position: "relative",
    overflow: "hidden",
    borderRadius: 34,
    padding: spacing.lg,
    minHeight: 520,
    backgroundColor: colors.inkSoft,
    borderWidth: 1,
    borderColor: "rgba(25,168,142,0.38)"
  },
  orbOne: {
    position: "absolute",
    top: -64,
    right: -72,
    width: 220,
    height: 220,
    borderRadius: 140,
    backgroundColor: colors.turquoise,
    opacity: 0.24
  },
  orbTwo: {
    position: "absolute",
    bottom: -90,
    left: -90,
    width: 220,
    height: 220,
    borderRadius: 140,
    backgroundColor: colors.gold,
    opacity: 0.18
  },
  eyebrow: {
    color: colors.mint,
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 1.3,
    textTransform: "uppercase"
  },
  title: {
    color: colors.white,
    fontSize: 34,
    lineHeight: 39,
    fontWeight: "900",
    marginTop: spacing.md
  },
  body: {
    color: "#D6F7EE",
    fontSize: 16,
    lineHeight: 25,
    fontWeight: "700",
    marginTop: spacing.md
  },
  proofGrid: {
    gap: spacing.sm,
    marginTop: spacing.lg
  },
  proofCard: {
    borderRadius: radii.lg,
    padding: spacing.md,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.14)"
  },
  proofNumber: {
    color: colors.gold,
    fontSize: 12,
    fontWeight: "900"
  },
  proofText: {
    color: colors.white,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "900",
    marginTop: 3
  },
  impactCard: {
    marginTop: spacing.md,
    borderRadius: radii.lg,
    padding: spacing.md,
    backgroundColor: colors.white
  },
  impactLabel: {
    color: colors.teal,
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  impactCopy: {
    color: colors.slate,
    fontSize: 18,
    lineHeight: 25,
    fontWeight: "900",
    marginTop: spacing.xs
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: spacing.lg
  },
  dots: {
    flexDirection: "row",
    gap: spacing.xs
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.24)"
  },
  dotActive: {
    width: 30,
    height: 9,
    borderRadius: 999,
    backgroundColor: colors.turquoise
  },
  primaryButton: {
    borderRadius: 999,
    paddingHorizontal: spacing.lg,
    paddingVertical: 14,
    backgroundColor: colors.turquoise
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "900"
  }
});
