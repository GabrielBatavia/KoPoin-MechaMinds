import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Modal } from "react-native";
import { useFonts, Geist_900Black } from "@expo-google-fonts/geist";

import { DemoState, mainMissionId } from "./src/data/kopoinSeed";
import { createTeamWrap } from "./src/services/teamWrap";
import {
  getInitialDemoState,
  joinPemudaSukamajuTeam,
  resetDemoState,
  submitVote,
  submitProductMission
} from "./src/services/demoState";
import { CommunityHubScreen } from "./src/screens/CommunityHubScreen";
import { HomeDashboardScreen } from "./src/screens/HomeDashboardScreen";
import { JudgeWizardScreen } from "./src/screens/JudgeWizardScreen";
import { MissionHubScreen } from "./src/screens/MissionHubScreen";
import { NotificationsScreen } from "./src/screens/NotificationsScreen";
import { ProductionQRFeedbackTone } from "./src/screens/ProductionQRScreen";
import { ProfileControlScreen } from "./src/screens/ProfileControlScreen";
import { AuthScreen } from "./src/screens/AuthScreen";
import { RedeemPointsScreen } from "./src/screens/RedeemPointsScreen";
import { QRCodeMemberScreen } from "./src/screens/QRCodeMemberScreen";
import { ReferralPromoScreen } from "./src/screens/ReferralPromoScreen";
import { Home, Target, Scan, TrendingUp, User } from "lucide-react-native";
import { colors, spacing } from "./src/theme";

type TabId = "home" | "mission" | "community" | "notifications" | "profile" | "redeem" | "referral";

const demoStateStorageKey = "kopoin-demo-state-v2";
const wizardSeenStorageKey = "kopoin-wizard-seen-v2";
const validDemoCode = "KOPI-SUKAMAJU-001";

const tabs: { id: TabId; label: string }[] = [
  { id: "home", label: "Beranda" },
  { id: "mission", label: "Misi" },
  { id: "community", label: "Qr Code" },
  { id: "notifications", label: "Riwayat" },
  { id: "profile", label: "Profil" }
];

export default function App() {
  const [fontsLoaded] = useFonts({
    Geist_900Black
  });
  const [activeTab, setActiveTab] = useState<TabId>("home");
  const [demoState, setDemoState] = useState<DemoState>(() => getInitialDemoState());
  const [feedback, setFeedback] = useState("Gabung tim, lalu scan QR atau pakai kode demo untuk menyelesaikan misi.");
  const [feedbackTone, setFeedbackTone] = useState<ProductionQRFeedbackTone>("info");
  const [isHydrated, setIsHydrated] = useState(false);
  const [manualCode, setManualCode] = useState(validDemoCode);
  const [showWizard, setShowWizard] = useState(true);
  const [showAuth, setShowAuth] = useState(false);
  const [voteFeedback, setVoteFeedback] = useState("Pilih reward berikutnya agar suara anggota muda terlihat di Campaign Console.");

  const mainMission = demoState.missions.find((mission) => mission.id === mainMissionId);
  const pemudaRank = demoState.leaderboard.find((entry) => entry.teamId === demoState.team.id)?.rank ?? 3;
  const teamWrap = createTeamWrap(demoState);

  useEffect(() => {
    let isMounted = true;

    async function hydrate() {
      try {
        const [storedState, wizardSeen, loggedIn] = await Promise.all([
          AsyncStorage.getItem(demoStateStorageKey),
          AsyncStorage.getItem(wizardSeenStorageKey),
          AsyncStorage.getItem("kopoin-logged-in-v2")
        ]);

        if (!isMounted) {
          return;
        }

        if (storedState) {
          setDemoState(JSON.parse(storedState) as DemoState);
        }

        const hasSeenWizard = wizardSeen === "true";
        const hasLoggedIn = loggedIn === "true";

        setShowWizard(!hasSeenWizard);
        setShowAuth(!hasLoggedIn);
      } catch {
        if (isMounted) {
          setDemoState(getInitialDemoState());
          setShowWizard(true);
          setShowAuth(true);
        }
      } finally {
        if (isMounted) {
          setIsHydrated(true);
        }
      }
    }

    hydrate();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    AsyncStorage.setItem(demoStateStorageKey, JSON.stringify(demoState)).catch(() => undefined);
  }, [demoState, isHydrated]);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    AsyncStorage.setItem(wizardSeenStorageKey, showWizard ? "false" : "true").catch(() => undefined);
  }, [isHydrated, showWizard]);

  function handleFinishWizard() {
    setShowWizard(false);
    setShowAuth(true);
  }

  function handleAuthSuccess() {
    setShowAuth(false);
    AsyncStorage.setItem("kopoin-logged-in-v2", "true").catch(() => undefined);
    setActiveTab("home");
  }

  function handleJoinTeam() {
    setDemoState((currentState) => joinPemudaSukamajuTeam(currentState));
    setFeedback("Gabriel sudah bergabung. Sekarang scan kode demo untuk menyelesaikan misi.");
    setFeedbackTone("success");
    setActiveTab("mission");
  }

  function handleSubmitMission() {
    submitMissionCode(manualCode);
  }

  function handleDemoScan() {
    setManualCode(validDemoCode);
    submitMissionCode(validDemoCode);
  }

  function handleScannedCode(code: string) {
    setManualCode(code);
    submitMissionCode(code);
  }

  function submitMissionCode(code: string) {
    const result = submitProductMission(demoState, code);
    setDemoState(result.state);
    setFeedback(result.message);
    setFeedbackTone(result.status === "success" ? "success" : result.status === "duplicate" ? "warning" : "error");

    if (result.status === "success") {
      setActiveTab("mission");
    }
  }

  function handleResetDemo() {
    setDemoState(resetDemoState());
    setManualCode(validDemoCode);
    setFeedback("State demo kembali ke awal: progress 73/100, saldo 1.730, rank 3.");
    setFeedbackTone("info");
    setVoteFeedback("Pilih reward berikutnya agar suara anggota muda terlihat di Campaign Console.");
    AsyncStorage.removeItem("kopoin-logged-in-v2").catch(() => undefined);
    setShowAuth(true);
    setActiveTab("home");
  }

  function handleRedeemCoupon(couponId: string, points: number) {
    setDemoState((currentState) => {
      const currentRedeemed = currentState.redeemedCoupons || [];
      return {
        ...currentState,
        user: {
          ...currentState.user,
          kopoinBalance: Math.max(0, currentState.user.kopoinBalance - points)
        },
        redeemedCoupons: [...currentRedeemed, couponId]
      };
    });
  }

  function handleSubmitVote(optionId: string) {
    const result = submitVote(demoState, optionId);
    setDemoState(result.state);
    setVoteFeedback(result.message);
  }

  function renderActiveScreen() {
    if (activeTab === "home") {
      return (
        <HomeDashboardScreen
          campaign={demoState.campaign}
          completionSummary={demoState.latestCompletion}
          cooperative={demoState.cooperative}
          hasJoinedTeam={demoState.hasJoinedTeam}
          onJoinTeam={handleJoinTeam}
          onOpenCommunity={() => setActiveTab("community")}
          onOpenMission={() => setActiveTab("mission")}
          onOpenProfile={() => setActiveTab("profile")}
          rank={pemudaRank}
          scanCompleted={demoState.scanCompleted}
          team={demoState.team}
          user={demoState.user}
          userVote={demoState.userVote}
        />
      );
    }

    if (activeTab === "mission") {
      return (
        <MissionHubScreen
          campaign={demoState.campaign}
          completionSummary={demoState.latestCompletion}
          feedback={feedback}
          feedbackTone={feedbackTone}
          hasJoinedTeam={demoState.hasJoinedTeam}
          manualCode={manualCode}
          mission={mainMission}
          missions={demoState.missions}
          onDemoScan={handleDemoScan}
          onJoinTeam={handleJoinTeam}
          onManualCodeChange={setManualCode}
          onOpenCommunity={() => setActiveTab("community")}
          onOpenRedeem={() => setActiveTab("redeem")}
          onScanCode={handleScannedCode}
          onSubmitMission={handleSubmitMission}
          scanCompleted={demoState.scanCompleted}
          team={demoState.team}
          user={demoState.user}
          usedQrCodes={demoState.usedQrCodes}
          verificationLogs={demoState.verificationLogs}
        />
      );
    }

    if (activeTab === "community") {
      return (
        <QRCodeMemberScreen
          user={demoState.user}
          onClose={() => setActiveTab("home")}
          onOpenReferral={() => setActiveTab("referral")}
        />
      );
    }

    if (activeTab === "notifications") {
      return (
        <NotificationsScreen
          campaign={demoState.campaign}
          completionSummary={demoState.latestCompletion}
          hasJoinedTeam={demoState.hasJoinedTeam}
          onJoinTeam={handleJoinTeam}
          onOpenCommunity={() => setActiveTab("community")}
          onOpenMission={() => setActiveTab("mission")}
          onOpenProfile={() => setActiveTab("profile")}
          rank={pemudaRank}
          scanCompleted={demoState.scanCompleted}
          user={demoState.user}
          userVote={demoState.userVote}
        />
      );
    }

    return (
      <ProfileControlScreen
        completionSummary={demoState.latestCompletion}
        cooperative={demoState.cooperative}
        hasJoinedTeam={demoState.hasJoinedTeam}
        onReplayWizard={() => {
          AsyncStorage.removeItem("kopoin-logged-in-v2").catch(() => undefined);
          setShowAuth(true);
          setShowWizard(true);
        }}
        onResetDemo={handleResetDemo}
        persisted={isHydrated}
        scanCompleted={demoState.scanCompleted}
        team={demoState.team}
        user={demoState.user}
        userVote={demoState.userVote}
        redeemedCoupons={demoState.redeemedCoupons || []}
      />
    );
  }

  function renderBottomNav() {
    return (
      <View style={styles.bottomNav}>
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          
          if (tab.id === "community") {
            return (
              <TouchableOpacity
                key={tab.id}
                onPress={() => setActiveTab(tab.id)}
                style={styles.navFabContainer}
                activeOpacity={0.8}
              >
                <View style={styles.navFabCircle}>
                  <Scan size={26} color="#FFFFFF" strokeWidth={2.5} />
                </View>
              </TouchableOpacity>
            );
          }

          return (
            <TouchableOpacity
              key={tab.id}
              onPress={() => setActiveTab(tab.id)}
              style={styles.navItem}
              activeOpacity={0.7}
            >
              {tab.id === "home" && (
                <Home size={22} color={isActive ? colors.teal : colors.muted} strokeWidth={isActive ? 2.5 : 2} style={styles.navIcon} />
              )}
              {tab.id === "mission" && (
                <Target size={22} color={isActive ? colors.teal : colors.muted} strokeWidth={isActive ? 2.5 : 2} style={styles.navIcon} />
              )}
              {tab.id === "notifications" && (
                <TrendingUp size={22} color={isActive ? colors.teal : colors.muted} strokeWidth={isActive ? 2.5 : 2} style={styles.navIcon} />
              )}
              {tab.id === "profile" && (
                <User size={22} color={isActive ? colors.teal : colors.muted} strokeWidth={isActive ? 2.5 : 2} style={styles.navIcon} />
              )}

              <Text style={isActive ? styles.navLabelActive : styles.navLabel}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  if (!isHydrated) {
    return (
      <SafeAreaView style={styles.loadingScreen}>
        <StatusBar style="dark" />
        <ActivityIndicator color={colors.turquoise} size="large" />
        <Text style={styles.loadingText}>Menyiapkan Kopoin MVP...</Text>
      </SafeAreaView>
    );
  }

  if (showWizard) {
    return <JudgeWizardScreen onFinish={handleFinishWizard} onSkip={handleFinishWizard} />;
  }

  if (showAuth) {
    return <AuthScreen onSuccess={handleAuthSuccess} />;
  }

  if (activeTab === "redeem") {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="dark" />
        <RedeemPointsScreen
          user={demoState.user}
          redeemedCoupons={demoState.redeemedCoupons || []}
          onRedeemCoupon={handleRedeemCoupon}
          onClose={() => setActiveTab("mission")}
        />
      </SafeAreaView>
    );
  }

  if (activeTab === "community") {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="dark" />
        <View style={{ flex: 1 }}>
          <QRCodeMemberScreen
            user={demoState.user}
            onClose={() => setActiveTab("home")}
            onOpenReferral={() => setActiveTab("referral")}
          />
        </View>
        {renderBottomNav()}
      </SafeAreaView>
    );
  }

  if (activeTab === "referral") {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="dark" />
        <ReferralPromoScreen
          user={demoState.user}
          onClose={() => setActiveTab("community")}
          onNavigateToProfile={() => setActiveTab("profile")}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.page} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        {renderActiveScreen()}
      </ScrollView>
      {renderBottomNav()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background
  },
  page: {
    padding: spacing.md,
    paddingBottom: 112
  },
  loadingScreen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
    gap: spacing.md
  },
  loadingText: {
    color: colors.teal,
    fontSize: 15,
    fontWeight: "900"
  },
  bottomNav: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 80,
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1.5,
    borderTopColor: "#E5E9F0",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 10
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    gap: 2
  },
  navIcon: {
    marginBottom: 2
  },
  navLabelActive: {
    color: colors.teal,
    fontSize: 9.5,
    fontWeight: "800",
    textAlign: "center"
  },
  navLabel: {
    color: colors.muted,
    fontSize: 9.5,
    fontWeight: "600",
    textAlign: "center"
  },
  navFabContainer: {
    width: 68,
    alignItems: "center",
    justifyContent: "center",
    height: 60
  },
  navFabCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.tealDark,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.tealDark,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
    borderWidth: 3,
    borderColor: "#FFFFFF",
    marginTop: -30
  }
});
