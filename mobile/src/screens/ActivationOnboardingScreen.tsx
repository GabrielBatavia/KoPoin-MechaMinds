import type { ComponentProps } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Animated, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import type { StyleProp, ViewStyle } from "react-native";
import * as Location from "expo-location";

import type { NearbyTeam } from "../data/kopoinSeed";
import type { CompleteOnboardingInput } from "../services/demoState";
import { OpenStreetMapViewer } from "../components/OpenStreetMapViewer";
import { colors, radii, shadows, spacing } from "../theme";

type ActivationStep = "account" | "address" | "scan" | "join" | "success";

type ActivationOnboardingScreenProps = {
  nearbyTeams: NearbyTeam[];
  onComplete: (input: CompleteOnboardingInput) => void;
};

const activationSteps: { id: ActivationStep; label: string }[] = [
  { id: "account", label: "Akun" },
  { id: "address", label: "Alamat" },
  { id: "scan", label: "Scan" },
  { id: "join", label: "Gabung" },
  { id: "success", label: "Aktif" }
];

export function ActivationOnboardingScreen({ nearbyTeams, onComplete }: ActivationOnboardingScreenProps) {
  const [step, setStep] = useState<ActivationStep>("account");
  const [fullName, setFullName] = useState("Gabriel Batavia");
  const [email, setEmail] = useState("gabriel@kopoin.id");
  const [phone, setPhone] = useState("081234567890");
  const [address, setAddress] = useState("Jl. Koperasi Muda No. 17");
  const [areaLabel, setAreaLabel] = useState("Desa Sukamaju, Malang");
  const [latitude, setLatitude] = useState(-7.9666);
  const [longitude, setLongitude] = useState(112.6326);
  const [isLocating, setIsLocating] = useState(false);
  const [selectedTeamId, setSelectedTeamId] = useState(nearbyTeams[0]?.id ?? "");
  const [referralCode, setReferralCode] = useState("");
  const [joinReason, setJoinReason] = useState("Saya ingin ikut misi tim dan membantu koperasi sekitar.");
  const [scanRevealed, setScanRevealed] = useState(false);
  const radarScale = useRef(new Animated.Value(0.72)).current;
  const radarOpacity = useRef(new Animated.Value(0.92)).current;

  const selectedTeam = useMemo(
    () => nearbyTeams.find((team) => team.id === selectedTeamId) ?? nearbyTeams[0],
    [nearbyTeams, selectedTeamId]
  );
  const stepIndex = activationSteps.findIndex((item) => item.id === step);

  useEffect(() => {
    if (step !== "scan") {
      return;
    }

    setScanRevealed(false);
    const revealTimer = setTimeout(() => setScanRevealed(true), 850);
    const loop = Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(radarScale, { duration: 900, toValue: 1.12, useNativeDriver: true }),
          Animated.timing(radarScale, { duration: 900, toValue: 0.72, useNativeDriver: true })
        ]),
        Animated.sequence([
          Animated.timing(radarOpacity, { duration: 900, toValue: 0.28, useNativeDriver: true }),
          Animated.timing(radarOpacity, { duration: 900, toValue: 0.92, useNativeDriver: true })
        ])
      ])
    );

    loop.start();

    return () => {
      clearTimeout(revealTimer);
      loop.stop();
    };
  }, [radarOpacity, radarScale, step]);

  function goNext() {
    if (step === "account") {
      setStep("address");
      return;
    }

    if (step === "address") {
      setStep("scan");
      return;
    }

    if (step === "scan") {
      setStep("join");
      return;
    }

    if (step === "join") {
      setStep("success");
      return;
    }

    onComplete({
      fullName,
      email,
      phone,
      address,
      areaLabel,
      latitude,
      longitude,
      selectedTeamId: selectedTeam?.id ?? selectedTeamId,
      referralCode,
      joinReason
    });
  }

  async function handleUseCurrentLocation() {
    setIsLocating(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
        setLatitude(location.coords.latitude);
        setLongitude(location.coords.longitude);
        setAreaLabel(`GPS Aktual (${location.coords.latitude.toFixed(4)}, ${location.coords.longitude.toFixed(4)})`);
      } else {
        setLatitude(-7.9666);
        setLongitude(112.6326);
        setAreaLabel("Desa Sukamaju, Malang");
      }
    } catch {
      setLatitude(-7.9666);
      setLongitude(112.6326);
      setAreaLabel("Desa Sukamaju, Malang");
    } finally {
      setIsLocating(false);
    }
  }

  function goBack() {
    if (step === "address") {
      setStep("account");
    }

    if (step === "scan") {
      setStep("address");
    }

    if (step === "join") {
      setStep("scan");
    }

    if (step === "success") {
      setStep("join");
    }
  }

  const canGoNext =
    step === "account"
      ? fullName.trim().length > 2 && email.trim().length > 5 && phone.trim().length > 6
      : step === "address"
        ? address.trim().length > 4 && areaLabel.trim().length > 3
        : step === "scan"
          ? Boolean(selectedTeam)
          : true;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.page} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
          <View>
            <Text style={styles.logo}>kopoin</Text>
            <Text style={styles.topMeta}>Aktivasi akun komunitas</Text>
          </View>
          <View style={styles.stepBadge}>
            <Text style={styles.stepBadgeText}>{stepIndex + 1}/5</Text>
          </View>
        </View>

        <View style={styles.stepRail}>
          {activationSteps.map((item, index) => {
            const isActive = item.id === step;
            const isDone = index < stepIndex;
            return (
              <View key={item.id} style={styles.stepItem}>
                <View style={isActive ? styles.stepDotActive : isDone ? styles.stepDotDone : styles.stepDot} />
                <Text style={isActive ? styles.stepTextActive : isDone ? styles.stepTextDone : styles.stepText}>{item.label}</Text>
              </View>
            );
          })}
        </View>

        {step === "account" ? (
          <View style={styles.heroCard}>
            <View style={styles.heroOrb} />
            <Text style={styles.kicker}>Langkah pertama</Text>
            <Text style={styles.heroTitle}>Buat akun Kopoin dulu.</Text>
            <Text style={styles.heroCopy}>Akun ini dipakai untuk gabung tim, menampilkan QR member, riwayat kontribusi, dan reward setelah misi aktif.</Text>
            <Input label="Nama lengkap" onChangeText={setFullName} value={fullName} />
            <Input autoCapitalize="none" keyboardType="email-address" label="Email" onChangeText={setEmail} value={email} />
            <Input keyboardType="phone-pad" label="Nomor HP" onChangeText={setPhone} value={phone} />
          </View>
        ) : null}

        {step === "address" ? (
          <View style={styles.cardStack}>
            <View style={styles.interactiveMapWrap}>
              <OpenStreetMapViewer
                latitude={latitude}
                longitude={longitude}
                onLocationSelect={(lat, lng) => {
                  setLatitude(lat);
                  setLongitude(lng);
                  setAreaLabel(`Titik Peta (${lat.toFixed(4)}, ${lng.toFixed(4)})`);
                }}
                height={235}
              />
              <View style={styles.mapCardFloatingOverlay}>
                <Text style={styles.mapFloatingLabel}>Titik Peta Terpilih</Text>
                <Text style={styles.mapFloatingValue}>{areaLabel}</Text>
              </View>
            </View>

            <View style={styles.whiteCard}>
              <Text style={styles.kicker}>Alamat dan titik lokasi</Text>
              <Text style={styles.cardTitle}>Pilih titik kamu di peta.</Text>
              <Text style={styles.cardCopy}>Peta OpenStreetMap interaktif aktif! Kamu bisa geser/klik peta untuk memilih titik atau gunakan sensor GPS untuk langsung mendeteksi lokasimu.</Text>
              <Input label="Alamat" onChangeText={setAddress} value={address} />
              <Input label="Area" onChangeText={setAreaLabel} value={areaLabel} />
              <TouchableOpacity
                disabled={isLocating}
                style={[styles.locationButton, isLocating && { opacity: 0.7 }]}
                onPress={handleUseCurrentLocation}
              >
                <Text style={styles.locationButtonText}>
                  {isLocating ? "Mendeteksi GPS..." : "Pakai Titik Saat Ini (GPS)"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}

        {step === "scan" ? (
          <View style={styles.cardStack}>
            <View style={styles.scanHero}>
              <Animated.View style={[styles.radarRing, { opacity: radarOpacity, transform: [{ scale: radarScale }] }]} />
              <View style={styles.radarCore}>
                <Text style={styles.radarText}>SCAN</Text>
              </View>
              <MapPop label="100 m" style={styles.popOne} title="Sukamaju" visible={scanRevealed} />
              <MapPop label="200 m" style={styles.popTwo} title="Bangko" visible={scanRevealed} />
              <MapPop label="1,2 km" style={styles.popThree} title="Kampus" visible={scanRevealed} />
            </View>

            <View style={styles.whiteCard}>
              <Text style={styles.kicker}>Komunitas sekitar</Text>
              <Text style={styles.cardTitle}>Pilih tim utama pertama kamu.</Text>
              <Text style={styles.cardCopy}>Kamu mulai dari satu tim utama. Nanti kamu bisa masuk komunitas tambahan seiring waktu.</Text>
              <View style={styles.teamList}>
                {nearbyTeams.map((team) => (
                  <TeamOption key={team.id} selected={team.id === selectedTeamId} team={team} onPress={() => setSelectedTeamId(team.id)} />
                ))}
              </View>
            </View>
          </View>
        ) : null}

        {step === "join" ? (
          <View style={styles.cardStack}>
            <View style={styles.selectedTeamCard}>
              <View style={styles.teamLogoLarge}>
                <Text style={styles.teamLogoLargeText}>{selectedTeam?.logoInitials ?? "KP"}</Text>
              </View>
              <View style={styles.flexOne}>
                <Text style={styles.kicker}>Tim yang dipilih</Text>
                <Text style={styles.selectedTeamTitle}>{selectedTeam?.name ?? "Tim Kopoin"}</Text>
                <Text style={styles.selectedTeamCopy}>{selectedTeam?.cooperativeName ?? "Koperasi sekitar"}</Text>
              </View>
            </View>

            <View style={styles.whiteCard}>
              <Text style={styles.kicker}>Form gabung singkat</Text>
              <Text style={styles.cardTitle}>Konfirmasi data komunitas.</Text>
              <InfoRow label="Akses" value={selectedTeam?.accessNote ?? "Terbuka untuk anggota sekitar."} />
              <InfoRow label="Misi aktif" value={selectedTeam?.missionTitle ?? "Misi komunitas"} />
              <InfoRow label="Reward" value={selectedTeam?.rewardTitle ?? "Reward bersama"} />
              <Input autoCapitalize="characters" label="Kode referral (opsional)" onChangeText={setReferralCode} placeholder="KOP-GABUNG" value={referralCode} />
              <Input label="Alasan gabung" multiline onChangeText={setJoinReason} value={joinReason} />
            </View>
          </View>
        ) : null}

        {step === "success" ? (
          <View style={styles.successCard}>
            <View style={styles.successBadge}>
              <Text style={styles.successBadgeText}>AKTIF</Text>
            </View>
            <Text style={styles.successTitle}>Akun siap dipakai.</Text>
            <Text style={styles.successCopy}>
              {fullName} sudah masuk ke {selectedTeam?.name ?? "tim utama"}. Seluruh fitur Kopoin terbuka: beranda tim, misi, leaderboard, reward, QR member, dan riwayat kontribusi.
            </Text>
            <View style={styles.futureCard}>
              <Text style={styles.futureTitle}>Komunitas tambahan menyusul</Text>
              <Text style={styles.futureCopy}>Untuk sekarang, kontribusi utama masuk ke satu tim. Nanti kamu bisa bergabung ke kampus, organisasi, atau komunitas UMKM lain.</Text>
            </View>
          </View>
        ) : null}

        <View style={styles.footerRow}>
          {stepIndex > 0 ? (
            <TouchableOpacity style={styles.backButton} onPress={goBack}>
              <Text style={styles.backButtonText}>Kembali</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.backButtonGhost} />
          )}
          <TouchableOpacity disabled={!canGoNext} style={canGoNext ? styles.primaryButton : styles.primaryButtonDisabled} onPress={goNext}>
            <Text style={styles.primaryButtonText}>{step === "success" ? "Masuk Beranda" : step === "scan" ? "Lanjut Form Gabung" : "Lanjut"}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Input({ label, ...props }: ComponentProps<typeof TextInput> & { label: string }) {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput placeholderTextColor="#8AA5A0" style={[styles.input, props.multiline ? styles.inputMultiline : null]} {...props} />
    </View>
  );
}

function TeamOption({ onPress, selected, team }: { onPress: () => void; selected: boolean; team: NearbyTeam }) {
  return (
    <TouchableOpacity style={selected ? styles.teamOptionSelected : styles.teamOption} onPress={onPress}>
      <View style={selected ? styles.teamLogoSelected : styles.teamLogo}>
        <Text style={selected ? styles.teamLogoTextSelected : styles.teamLogoText}>{team.logoInitials}</Text>
      </View>
      <View style={styles.flexOne}>
        <View style={styles.teamTopline}>
          <Text style={styles.teamName}>{team.name}</Text>
          <Text style={styles.teamDistance}>{team.distanceLabel}</Text>
        </View>
        <Text style={styles.teamMeta}>{team.category} - {team.areaLabel}</Text>
        <Text style={styles.teamCopy}>{team.activeMembers}/{team.members} anggota aktif. {team.missionTitle}</Text>
      </View>
    </TouchableOpacity>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

function MapPop({ label, style, title, visible }: { label: string; style: StyleProp<ViewStyle>; title: string; visible: boolean }) {
  return (
    <View style={[styles.mapPop, style, visible ? styles.mapPopVisible : styles.mapPopHidden]}>
      <Text style={styles.mapPopTitle}>{title}</Text>
      <Text style={styles.mapPopLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.backgroundWarm
  },
  page: {
    flexGrow: 1,
    gap: spacing.md,
    padding: spacing.md,
    paddingBottom: spacing.xl
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  logo: {
    color: colors.teal,
    fontSize: 34,
    fontWeight: "900",
    letterSpacing: -1.5
  },
  topMeta: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "900",
    marginTop: -3
  },
  stepBadge: {
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line
  },
  stepBadgeText: {
    color: colors.teal,
    fontSize: 12,
    fontWeight: "900"
  },
  stepRail: {
    flexDirection: "row",
    gap: spacing.xs,
    borderRadius: 999,
    padding: spacing.xs,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line
  },
  stepItem: {
    flex: 1,
    alignItems: "center",
    gap: 5,
    paddingVertical: spacing.xs
  },
  stepDot: {
    width: 9,
    height: 9,
    borderRadius: 99,
    backgroundColor: colors.lineStrong
  },
  stepDotActive: {
    width: 26,
    height: 9,
    borderRadius: 99,
    backgroundColor: colors.teal
  },
  stepDotDone: {
    width: 9,
    height: 9,
    borderRadius: 99,
    backgroundColor: colors.gold
  },
  stepText: {
    color: colors.muted,
    fontSize: 10,
    fontWeight: "900"
  },
  stepTextActive: {
    color: colors.teal,
    fontSize: 10,
    fontWeight: "900"
  },
  stepTextDone: {
    color: colors.slate,
    fontSize: 10,
    fontWeight: "900"
  },
  heroCard: {
    position: "relative",
    overflow: "hidden",
    borderRadius: 34,
    padding: spacing.lg,
    gap: spacing.md,
    backgroundColor: colors.ink,
    borderWidth: 1,
    borderColor: colors.inkSoft,
    ...shadows.card
  },
  heroOrb: {
    position: "absolute",
    right: -80,
    top: -80,
    width: 240,
    height: 240,
    borderRadius: 160,
    backgroundColor: colors.turquoise,
    opacity: 0.26
  },
  kicker: {
    color: colors.teal,
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 1,
    textTransform: "uppercase"
  },
  heroTitle: {
    color: colors.white,
    fontSize: 34,
    lineHeight: 39,
    fontWeight: "900",
    maxWidth: 270
  },
  heroCopy: {
    color: "#D6F7EE",
    fontSize: 15,
    lineHeight: 23,
    fontWeight: "700"
  },
  cardStack: {
    gap: spacing.md
  },
  whiteCard: {
    borderRadius: 30,
    padding: spacing.lg,
    gap: spacing.md,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
    ...shadows.card
  },
  cardTitle: {
    color: colors.text,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "900"
  },
  cardCopy: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "800"
  },
  inputGroup: {
    gap: spacing.xs
  },
  inputLabel: {
    color: colors.slate,
    fontSize: 12,
    fontWeight: "900"
  },
  input: {
    minHeight: 50,
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    color: colors.text,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.line,
    fontSize: 15,
    fontWeight: "800"
  },
  inputMultiline: {
    minHeight: 94,
    textAlignVertical: "top"
  },
  mapHero: {
    position: "relative",
    overflow: "hidden",
    height: 260,
    borderRadius: 34,
    backgroundColor: colors.surfaceMint,
    borderWidth: 1,
    borderColor: colors.line
  },
  mapGrid: {
    position: "absolute",
    left: -20,
    right: -20,
    top: -20,
    bottom: -20,
    borderWidth: 36,
    borderColor: "rgba(15,107,99,0.08)",
    transform: [{ rotate: "18deg" }]
  },
  mapPinLarge: {
    position: "absolute",
    left: "43%",
    top: 84,
    width: 62,
    height: 62,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(244,180,0,0.22)",
    borderWidth: 2,
    borderColor: colors.gold
  },
  mapPinCore: {
    width: 22,
    height: 22,
    borderRadius: 20,
    backgroundColor: colors.gold
  },
  mapCardFloating: {
    position: "absolute",
    left: spacing.md,
    right: spacing.md,
    bottom: spacing.md,
    borderRadius: radii.lg,
    padding: spacing.md,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line
  },
  mapFloatingLabel: {
    color: colors.teal,
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  mapFloatingValue: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "900",
    marginTop: 4
  },
  locationButton: {
    borderRadius: radii.md,
    paddingVertical: 14,
    alignItems: "center",
    backgroundColor: colors.surfaceMint,
    borderWidth: 1,
    borderColor: colors.line
  },
  locationButtonText: {
    color: colors.teal,
    fontSize: 14,
    fontWeight: "900"
  },
  scanHero: {
    position: "relative",
    overflow: "hidden",
    height: 310,
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.ink,
    borderWidth: 1,
    borderColor: colors.inkSoft
  },
  radarRing: {
    position: "absolute",
    width: 230,
    height: 230,
    borderRadius: 160,
    borderWidth: 2,
    borderColor: colors.turquoise,
    backgroundColor: "rgba(25,168,142,0.08)"
  },
  radarCore: {
    width: 96,
    height: 96,
    borderRadius: 80,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.turquoise,
    borderWidth: 8,
    borderColor: "rgba(255,255,255,0.12)"
  },
  radarText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 1.4
  },
  mapPop: {
    position: "absolute",
    borderRadius: radii.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line
  },
  mapPopVisible: {
    opacity: 1,
    transform: [{ scale: 1 }]
  },
  mapPopHidden: {
    opacity: 0,
    transform: [{ scale: 0.82 }]
  },
  popOne: {
    left: 22,
    top: 68
  },
  popTwo: {
    right: 22,
    top: 92
  },
  popThree: {
    left: 44,
    bottom: 40
  },
  mapPopTitle: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "900"
  },
  mapPopLabel: {
    color: colors.teal,
    fontSize: 12,
    fontWeight: "900",
    marginTop: 2
  },
  teamList: {
    gap: spacing.sm
  },
  teamOption: {
    flexDirection: "row",
    gap: spacing.md,
    borderRadius: radii.lg,
    padding: spacing.md,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.line
  },
  teamOptionSelected: {
    flexDirection: "row",
    gap: spacing.md,
    borderRadius: radii.lg,
    padding: spacing.md,
    backgroundColor: colors.surfaceMint,
    borderWidth: 2,
    borderColor: colors.turquoise
  },
  teamLogo: {
    width: 48,
    height: 48,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line
  },
  teamLogoSelected: {
    width: 48,
    height: 48,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.teal
  },
  teamLogoText: {
    color: colors.teal,
    fontSize: 13,
    fontWeight: "900"
  },
  teamLogoTextSelected: {
    color: colors.white,
    fontSize: 13,
    fontWeight: "900"
  },
  teamTopline: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm
  },
  teamName: {
    flex: 1,
    color: colors.text,
    fontSize: 16,
    fontWeight: "900"
  },
  teamDistance: {
    color: colors.gold,
    fontSize: 13,
    fontWeight: "900"
  },
  teamMeta: {
    color: colors.teal,
    fontSize: 12,
    fontWeight: "900",
    marginTop: 3
  },
  teamCopy: {
    color: colors.muted,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "800",
    marginTop: 4
  },
  selectedTeamCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    borderRadius: 30,
    padding: spacing.lg,
    backgroundColor: colors.teal,
    ...shadows.card
  },
  teamLogoLarge: {
    width: 68,
    height: 68,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.14)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.22)"
  },
  teamLogoLargeText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "900"
  },
  selectedTeamTitle: {
    color: colors.white,
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "900"
  },
  selectedTeamCopy: {
    color: "#D8FFF5",
    fontSize: 13,
    lineHeight: 19,
    fontWeight: "800",
    marginTop: 4
  },
  infoRow: {
    borderRadius: radii.md,
    padding: spacing.md,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.line
  },
  infoLabel: {
    color: colors.teal,
    fontSize: 11,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  infoValue: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "800",
    marginTop: 4
  },
  successCard: {
    flex: 1,
    justifyContent: "center",
    minHeight: 560,
    borderRadius: 36,
    padding: spacing.lg,
    backgroundColor: colors.ink,
    borderWidth: 1,
    borderColor: colors.inkSoft,
    ...shadows.card
  },
  successBadge: {
    alignSelf: "flex-start",
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.gold
  },
  successBadgeText: {
    color: colors.ink,
    fontSize: 12,
    fontWeight: "900"
  },
  successTitle: {
    color: colors.white,
    fontSize: 40,
    lineHeight: 45,
    fontWeight: "900",
    marginTop: spacing.lg
  },
  successCopy: {
    color: "#D6F7EE",
    fontSize: 16,
    lineHeight: 25,
    fontWeight: "800",
    marginTop: spacing.md
  },
  futureCard: {
    borderRadius: radii.lg,
    padding: spacing.md,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.14)",
    marginTop: spacing.lg
  },
  futureTitle: {
    color: colors.gold,
    fontSize: 16,
    fontWeight: "900"
  },
  futureCopy: {
    color: "#D6F7EE",
    fontSize: 13,
    lineHeight: 20,
    fontWeight: "800",
    marginTop: spacing.xs
  },
  footerRow: {
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: "auto"
  },
  backButton: {
    flex: 0.42,
    borderRadius: radii.md,
    paddingVertical: 15,
    alignItems: "center",
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line
  },
  backButtonGhost: {
    flex: 0.2
  },
  backButtonText: {
    color: colors.teal,
    fontSize: 14,
    fontWeight: "900"
  },
  primaryButton: {
    flex: 1,
    borderRadius: radii.md,
    paddingVertical: 15,
    alignItems: "center",
    backgroundColor: colors.teal
  },
  primaryButtonDisabled: {
    flex: 1,
    borderRadius: radii.md,
    paddingVertical: 15,
    alignItems: "center",
    backgroundColor: colors.lineStrong
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "900"
  },
  interactiveMapWrap: {
    position: "relative",
    width: "100%"
  },
  mapCardFloatingOverlay: {
    position: "absolute",
    bottom: 12,
    left: 12,
    right: 12,
    backgroundColor: "rgba(255, 255, 255, 0.94)",
    borderRadius: radii.md,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "rgba(11, 96, 86, 0.16)",
    ...shadows.sm
  },
  flexOne: {
    flex: 1
  }
});
