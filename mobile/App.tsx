import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Modal, Platform, StatusBar as RNStatusBar } from "react-native";
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
import {
  fetchMobileState,
  joinCommunityRemote,
  joinTeamRemote,
  leaveCommunityRemote,
  redeemCouponRemote,
  submitMissionRemote,
  submitVoteRemote
} from "./src/services/mobileApi";
import { CommunityHubScreen } from "./src/screens/CommunityHubScreen";
import { HomeDashboardScreen } from "./src/screens/HomeDashboardScreen";
import { JudgeWizardScreen } from "./src/screens/JudgeWizardScreen";
import { MissionHubScreen } from "./src/screens/MissionHubScreen";
import { HistorysScreen } from "./src/screens/HistorysScreen";
import { ProductionQRFeedbackTone } from "./src/screens/ProductionQRScreen";
import { ProfileControlScreen } from "./src/screens/ProfileControlScreen";
import { AuthScreen } from "./src/screens/AuthScreen";
import { RedeemPointsScreen } from "./src/screens/RedeemPointsScreen";
import { QRCodeMemberScreen } from "./src/screens/QRCodeMemberScreen";
import { ReferralPromoScreen } from "./src/screens/ReferralPromoScreen";
import { GroceryScreen } from "./src/screens/GroceryScreen";
import { Home, Target, Scan, TrendingUp, User } from "lucide-react-native";
import { colors, spacing } from "./src/theme";

type TabId = "home" | "mission" | "community" | "notifications" | "profile" | "redeem" | "referral" | "grocery" | "community_hub";

const demoStateStorageKey = "kopoin-demo-state-v2";
const wizardSeenStorageKey = "kopoin-wizard-seen-v2";
const validDemoCode = "KOPI-SUKAMAJU-001";
const defaultDemoUserId = "00000000-0000-4000-8000-000000000001";
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

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

  function getCurrentUserId() {
    return uuidPattern.test(demoState.user.id) ? demoState.user.id : defaultDemoUserId;
  }

  useEffect(() => {
    let isMounted = true;

    async function hydrate() {
      try {
        const [storedState, wizardSeen, loggedIn, dbUserData] = await Promise.all([
          AsyncStorage.getItem(demoStateStorageKey),
          AsyncStorage.getItem(wizardSeenStorageKey),
          AsyncStorage.getItem("kopoin-logged-in-v2"),
          AsyncStorage.getItem("kopoin-user-data")
        ]);

        if (!isMounted) {
          return;
        }

        let parsedState: DemoState = getInitialDemoState();
        if (storedState) {
          parsedState = JSON.parse(storedState) as DemoState;
        }

        if (dbUserData) {
          const dbUser = JSON.parse(dbUserData);
          parsedState.user = {
            ...parsedState.user,
            id: dbUser.id,
            name: dbUser.name,
            memberNo: dbUser.nik ? `NIK-${dbUser.nik.substring(0, 6)}` : parsedState.user.memberNo
          };
        }

        const remoteUserId = uuidPattern.test(parsedState.user.id) ? parsedState.user.id : defaultDemoUserId;

        try {
          const remoteState = await fetchMobileState(remoteUserId);
          parsedState = remoteState;
        } catch {
          // Keep local demo state when backend is not ready.
        }

        setDemoState(parsedState);

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

    AsyncStorage.getItem("kopoin-user-data").then((data) => {
      if (data) {
        const dbUser = JSON.parse(data);
        fetchMobileState(dbUser.id)
          .then((remoteState) => setDemoState(remoteState))
          .catch(() => {
            setDemoState((prev) => ({
              ...prev,
              user: {
                ...prev.user,
                id: dbUser.id,
                name: dbUser.name,
                memberNo: dbUser.nik ? `NIK-${dbUser.nik.substring(0, 6)}` : prev.user.memberNo
              }
            }));
          });
      }
    }).catch(() => undefined);

    setActiveTab("home");
  }

  async function handleJoinTeam() {
    try {
      const remoteState = await joinTeamRemote(getCurrentUserId());
      setDemoState(remoteState);
      setFeedback("Kamu sudah bergabung. Sekarang scan kode demo untuk menyelesaikan misi.");
      setFeedbackTone("success");
    } catch {
      setDemoState((currentState) => joinPemudaSukamajuTeam(currentState));
      setFeedback("Kamu sudah bergabung secara lokal. Backend belum tersinkron.");
      setFeedbackTone("warning");
    } finally {
      setActiveTab("mission");
    }
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

  async function submitMissionCode(code: string) {
    try {
      const result = await submitMissionRemote(getCurrentUserId(), code);
      setDemoState(result.state);
      setFeedback(result.message || "Misi berhasil disinkronkan.");
      setFeedbackTone("success");
      setActiveTab("mission");
    } catch (error: any) {
      const result = submitProductMission(demoState, code);
      setDemoState(result.state);
      setFeedback(error?.message || result.message);
      setFeedbackTone(result.status === "success" ? "success" : result.status === "duplicate" ? "warning" : "error");

      if (result.status === "success") {
        setActiveTab("mission");
      }
    }
  }

  function handleResetDemo() {
    setDemoState(resetDemoState());
    setManualCode(validDemoCode);
    setFeedback("State demo kembali ke awal: progress 73/100, saldo 1.730, rank 3.");
    setFeedbackTone("info");
    setVoteFeedback("Pilih reward berikutnya agar suara anggota muda terlihat di Campaign Console.");
    AsyncStorage.removeItem("kopoin-logged-in-v2").catch(() => undefined);
    AsyncStorage.removeItem("kopoin-user-token").catch(() => undefined);
    AsyncStorage.removeItem("kopoin-user-refresh-token").catch(() => undefined);
    AsyncStorage.removeItem("kopoin-user-data").catch(() => undefined);
    setShowAuth(true);
    setActiveTab("home");
  }

  async function handleRedeemCoupon(couponId: string, points: number) {
    try {
      const remoteState = await redeemCouponRemote(getCurrentUserId(), couponId);
      setDemoState(remoteState);
    } catch {
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
  }

  async function handleSubmitVote(optionId: string) {
    try {
      const result = await submitVoteRemote(getCurrentUserId(), optionId);
      setDemoState(result.state);
      setVoteFeedback(result.message || "Voting tersimpan.");
    } catch {
      const result = submitVote(demoState, optionId);
      setDemoState(result.state);
      setVoteFeedback(result.message);
    }
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
          onOpenRedeem={() => setActiveTab("redeem")}
          onOpenPromo={() => setActiveTab("grocery")}
          onOpenCommunityHub={() => setActiveTab("community_hub")}
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
        <HistorysScreen
          campaign={demoState.campaign}
          completionSummary={demoState.latestCompletion}
          hasJoinedTeam={demoState.hasJoinedTeam}
          onJoinTeam={handleJoinTeam}
          onOpenCommunity={() => setActiveTab("community")}
          onOpenMission={() => setActiveTab("mission")}
          onOpenProfile={() => setActiveTab("profile")}
          rank={pemudaRank}
          scanCompleted={demoState.scanCompleted}
          transactions={demoState.transactions}
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
          AsyncStorage.removeItem("kopoin-user-token").catch(() => undefined);
          AsyncStorage.removeItem("kopoin-user-refresh-token").catch(() => undefined);
          AsyncStorage.removeItem("kopoin-user-data").catch(() => undefined);
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
          coupons={demoState.coupons}
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

  if (activeTab === "grocery") {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="dark" />
        <GroceryScreen
          user={demoState.user}
          onClose={() => setActiveTab("home")}
        />
      </SafeAreaView>
    );
  }

  if (activeTab === "community_hub") {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="dark" />
        <CommunityHubScreen
          user={demoState.user}
          onClose={() => setActiveTab("home")}
          hasJoinedCommunity={demoState.hasJoinedCommunity}
          communities={demoState.communities}
          onLeaveCommunity={(communityId) => {
            leaveCommunityRemote(getCurrentUserId(), communityId)
              .then((remoteState) => setDemoState(remoteState))
              .catch(() => setDemoState((prev) => ({ ...prev, hasJoinedCommunity: false })));
          }}
          onJoinCommunitySuccess={(communityId, reason) => {
            joinCommunityRemote(getCurrentUserId(), communityId, reason)
              .then((remoteState) => setDemoState(remoteState))
              .catch(() => {
                setDemoState((prev) => ({
                  ...prev,
                  hasJoinedCommunity: true
                }));
              })
              .finally(() => setActiveTab("mission"));
          }}
        />
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
    backgroundColor: colors.background,
    paddingTop: Platform.OS === "android" ? RNStatusBar.currentHeight : 0
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
