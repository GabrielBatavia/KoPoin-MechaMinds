import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Animated, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Modal, Platform, StatusBar as RNStatusBar } from "react-native";
import { useFonts, Geist_900Black } from "@expo-google-fonts/geist";

import { DemoState, mainMissionId } from "./src/data/kopoinSeed";
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
  submitMemberCheckoutRemote,
  submitMissionRemote,
  submitVoteRemote
} from "./src/services/mobileApi";
import type { MemberCheckoutRequest, MemberCheckoutResult } from "./src/services/mobileApi";
import {
  advanceGuidedDemo,
  createInitialGuidedDemoState,
  exitGuidedDemo,
  finishGuidedDemo,
  getGuidedCheckpoint,
  goBackGuidedDemo,
  GUIDED_DEMO_TOTAL_CHECKPOINTS,
  normalizeGuidedDemoState,
  startGuidedDemo,
  syncGuidedDemoState
} from "./src/services/guidedDemo";
import { createAdminDashboard } from "./src/services/adminDashboard";
import { createTeamWrap } from "./src/services/teamWrap";
import { GuidedTargetProvider, GuidedTooltip, type SpotlightRect } from "./src/components/guided/GuidedOverlay";
import { CommunityHubScreen } from "./src/screens/CommunityHubScreen";
import { CampaignConsoleDashboardScreen } from "./src/screens/CampaignConsoleDashboardScreen";
import { HomeDashboardScreen } from "./src/screens/HomeDashboardScreen";
import { MissionHubScreen } from "./src/screens/MissionHubScreen";
import { HistorysScreen } from "./src/screens/HistorysScreen";
import { ProductionQRFeedbackTone } from "./src/screens/ProductionQRScreen";
import { ProfileControlScreen } from "./src/screens/ProfileControlScreen";
import { AuthScreen } from "./src/screens/AuthScreen";
import { RedeemPointsScreen } from "./src/screens/RedeemPointsScreen";
import { QRCodeMemberScreen } from "./src/screens/QRCodeMemberScreen";
import { ReferralPromoScreen } from "./src/screens/ReferralPromoScreen";
import { GroceryScreen } from "./src/screens/GroceryScreen";
import { TeamWrapScreen } from "./src/screens/TeamWrapScreen";
import { MotionPressable } from "./src/components/ui/MotionPressable";
import { Reveal } from "./src/components/ui/Reveal";
import { useReduceMotion } from "./src/hooks/use-reduce-motion";
import { motion } from "./src/motion";
import { Home, Target, Scan, TrendingUp, User } from "lucide-react-native";
import { colors, spacing } from "./src/theme";

type TabId = "home" | "mission" | "community" | "notifications" | "profile" | "redeem" | "referral" | "grocery" | "community_hub" | "team_wrap" | "console";

const demoStateStorageKey = "kopoin-demo-state-v2";
const guidedDemoStorageKey = "kopoin-guided-overlay-v1";
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
  const [guidedDemo, setGuidedDemo] = useState(() => createInitialGuidedDemoState());
  const [showAuth, setShowAuth] = useState(false);
  const [spotlightRect, setSpotlightRect] = useState<SpotlightRect | null>(null);
  const [voteFeedback, setVoteFeedback] = useState("Pilih reward berikutnya agar suara anggota muda terlihat di Campaign Console.");
  const appScrollRef = useRef<ScrollView>(null);

  const mainMission = demoState.missions.find((mission) => mission.id === mainMissionId);
  const pemudaRank = demoState.leaderboard.find((entry) => entry.teamId === demoState.team.id)?.rank ?? 3;
  const activeGuidedCheckpoint = getGuidedCheckpoint(guidedDemo.currentCheckpoint);
  const teamWrap = createTeamWrap(demoState);
  const adminDashboard = createAdminDashboard(demoState);

  function getCurrentUserId() {
    return uuidPattern.test(demoState.user.id) ? demoState.user.id : defaultDemoUserId;
  }

  useEffect(() => {
    let isMounted = true;

    async function hydrate() {
      try {
        const [storedState, storedGuidedDemo, loggedIn, dbUserData] = await Promise.all([
          AsyncStorage.getItem(demoStateStorageKey),
          AsyncStorage.getItem(guidedDemoStorageKey),
          AsyncStorage.getItem("kopoin-logged-in-v2"),
          AsyncStorage.getItem("kopoin-user-data")
        ]);

        if (!isMounted) {
          return;
        }

        let parsedState: DemoState = getInitialDemoState();
        let parsedGuidedDemo = storedGuidedDemo
          ? normalizeGuidedDemoState(JSON.parse(storedGuidedDemo))
          : createInitialGuidedDemoState();
        const hasLoggedIn = loggedIn === "true";

        if (!storedGuidedDemo && hasLoggedIn) {
          parsedGuidedDemo = startGuidedDemo();
        }

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

        if (hasLoggedIn) {
          const remoteUserId = uuidPattern.test(parsedState.user.id) ? parsedState.user.id : defaultDemoUserId;

          try {
            const remoteState = await fetchMobileState(remoteUserId);
            parsedState = remoteState;
          } catch {
            // Keep local demo state when backend is not ready.
          }
        }

        setDemoState(parsedState);
        setGuidedDemo(parsedGuidedDemo);
        setShowAuth(!hasLoggedIn);
      } catch {
        if (isMounted) {
          setDemoState(getInitialDemoState());
          setGuidedDemo(createInitialGuidedDemoState());
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

    AsyncStorage.setItem(guidedDemoStorageKey, JSON.stringify(guidedDemo)).catch(() => undefined);
  }, [guidedDemo, isHydrated]);

  useEffect(() => {
    if (!guidedDemo.isActive) {
      return;
    }

    setGuidedDemo((current) => syncGuidedDemoState(current, demoState));
  }, [demoState, guidedDemo.isActive]);

  useEffect(() => {
    if (!guidedDemo.isActive) {
      return;
    }

    const checkpoint = getGuidedCheckpoint(guidedDemo.currentCheckpoint);
    if (!checkpoint) {
      return;
    }

    setSpotlightRect(null);
    setActiveTab(checkpoint.targetScreen);

    const timer = setTimeout(() => {
      appScrollRef.current?.scrollTo({ y: checkpoint.scrollY, animated: false });
    }, 80);

    return () => clearTimeout(timer);
  }, [guidedDemo.currentCheckpoint, guidedDemo.isActive]);

  function handleStartSimulation() {
    setSpotlightRect(null);
    setGuidedDemo(startGuidedDemo());
  }

  function handleExitSimulation() {
    setGuidedDemo((current) => exitGuidedDemo(current));
    setSpotlightRect(null);
    if (activeTab === "team_wrap" || activeTab === "console") {
      setActiveTab("home");
    }
  }

  function handleAdvanceSimulation() {
    setGuidedDemo((current) => advanceGuidedDemo(current, demoState));
  }

  function handleBackSimulation() {
    setGuidedDemo((current) => goBackGuidedDemo(current, demoState));
  }

  function handleFinishSimulation() {
    setGuidedDemo((current) => finishGuidedDemo(current));
    setSpotlightRect(null);
    setActiveTab("home");
    appScrollRef.current?.scrollTo({ y: 0, animated: false });
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
    setSpotlightRect(null);
    setGuidedDemo(startGuidedDemo());
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
    setGuidedDemo(createInitialGuidedDemoState());
    setManualCode(validDemoCode);
    setFeedback("State demo kembali ke awal: progress 73/100, saldo 1.730, rank 3.");
    setFeedbackTone("info");
    setVoteFeedback("Pilih reward berikutnya agar suara anggota muda terlihat di Campaign Console.");
    setSpotlightRect(null);
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

  async function handleMemberCheckout(checkout: MemberCheckoutRequest): Promise<{ message?: string; checkout: MemberCheckoutResult }> {
    try {
      const result = await submitMemberCheckoutRemote(getCurrentUserId(), checkout);
      setDemoState(result.state);
      return { message: result.message, checkout: result.checkout };
    } catch (error: any) {
      const totalAmount = checkout.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
      const pointsEarned = Math.max(1, Math.floor(totalAmount / 1000));
      const balanceAfter = demoState.user.kopoinBalance + pointsEarned;
      const receiptNo = `LOCAL-${Date.now().toString(36).toUpperCase()}`;
      const itemLabel =
        checkout.items.length > 1
          ? `${checkout.items[0]?.name || "Belanja Kopdes"} +${checkout.items.length - 1} item`
          : checkout.items[0]?.name || "Belanja Kopdes";

      setDemoState((currentState) => ({
        ...currentState,
        user: {
          ...currentState.user,
          kopoinBalance: currentState.user.kopoinBalance + pointsEarned
        },
        transactions: [
          {
            id: `tx_local_member_checkout_${Date.now()}`,
            title: itemLabel,
            subtitle: `${receiptNo} - ${checkout.paymentMethod}`,
            date: new Date().toLocaleString("id-ID", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit"
            }),
            type: "grocery",
            amountText: `-Rp${totalAmount.toLocaleString("id-ID")}`,
            pointsBadge: `+${pointsEarned} Poin`,
            iconName: "grocery"
          },
          ...(currentState.transactions || [])
        ]
      }));

      return {
        message: error?.message || "Backend belum tersinkron. Transaksi tersimpan lokal untuk demo.",
        checkout: {
          receiptNo,
          totalAmount,
          pointsEarned,
          balanceAfter,
          items: checkout.items
        }
      };
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
          onOpenProfile={() => setActiveTab("profile")}
          onOpenRedeem={() => setActiveTab("redeem")}
          onScanCode={handleScannedCode}
          onSubmitMission={handleSubmitMission}
          onVote={handleSubmitVote}
          scanCompleted={demoState.scanCompleted}
          team={demoState.team}
          user={demoState.user}
          userVote={demoState.userVote}
          usedQrCodes={demoState.usedQrCodes}
          voteFeedback={voteFeedback}
          votePoll={demoState.votePoll}
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
          onSubmitMemberCheckout={handleMemberCheckout}
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

    if (activeTab === "team_wrap") {
      return <TeamWrapScreen wrap={teamWrap} />;
    }

    if (activeTab === "console") {
      return <CampaignConsoleDashboardScreen dashboard={adminDashboard} compact />;
    }

    return (
      <ProfileControlScreen
        completionSummary={demoState.latestCompletion}
        cooperative={demoState.cooperative}
        hasJoinedTeam={demoState.hasJoinedTeam}
        onReplayWizard={handleStartSimulation}
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
              <MotionPressable
                key={tab.id}
                onPress={() => setActiveTab(tab.id)}
                style={styles.navFabContainer}
                accessibilityRole="button"
                accessibilityLabel="Buka QR Code"
                pressedScale={0.96}
              >
                <View style={styles.navFabCircle}>
                  <Scan size={26} color="#FFFFFF" strokeWidth={2.5} />
                </View>
              </MotionPressable>
            );
          }

          return (
            <BottomNavItem
              key={tab.id}
              isActive={isActive}
              label={tab.label}
              onPress={() => setActiveTab(tab.id)}
              icon={
                <>
                  {tab.id === "home" && (
                    <Home size={22} color={isActive ? colors.teal : colors.muted} strokeWidth={isActive ? 2.5 : 2} />
                  )}
                  {tab.id === "mission" && (
                    <Target size={22} color={isActive ? colors.teal : colors.muted} strokeWidth={isActive ? 2.5 : 2} />
                  )}
                  {tab.id === "notifications" && (
                    <TrendingUp size={22} color={isActive ? colors.teal : colors.muted} strokeWidth={isActive ? 2.5 : 2} />
                  )}
                  {tab.id === "profile" && (
                    <User size={22} color={isActive ? colors.teal : colors.muted} strokeWidth={isActive ? 2.5 : 2} />
                  )}
                </>
              }
            >
            </BottomNavItem>
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

  if (showAuth) {
    return <AuthScreen onSuccess={handleAuthSuccess} />;
  }

  function renderAppShell() {
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
            onSubmitMemberCheckout={handleMemberCheckout}
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
      <ScrollView
        ref={appScrollRef}
        contentContainerStyle={styles.page}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Reveal key={activeTab} distance={8} style={styles.screenReveal}>
          {renderActiveScreen()}
        </Reveal>
      </ScrollView>
      {activeTab === "team_wrap" || activeTab === "console" ? null : renderBottomNav()}
    </SafeAreaView>
  );
  }

  const appShell = renderAppShell();

  return (
    <View style={styles.appRoot}>
      <GuidedTargetProvider
        activeTargetKey={guidedDemo.isActive ? activeGuidedCheckpoint?.targetKey ?? null : null}
        onTargetLayout={setSpotlightRect}
      >
        {appShell}
      </GuidedTargetProvider>

      {guidedDemo.isActive && activeGuidedCheckpoint ? (
        <GuidedTooltip
          checkpoint={activeGuidedCheckpoint.order}
          total={GUIDED_DEMO_TOTAL_CHECKPOINTS}
          title={activeGuidedCheckpoint.title}
          description={activeGuidedCheckpoint.description}
          actionHint={activeGuidedCheckpoint.actionHint}
          placement={activeGuidedCheckpoint.placement}
          targetRect={spotlightRect}
          canGoBack={activeGuidedCheckpoint.order > 1}
          canAdvance={guidedDemo.isRequiredActionCompleted}
          isLast={activeGuidedCheckpoint.order === GUIDED_DEMO_TOTAL_CHECKPOINTS}
          onBack={handleBackSimulation}
          onClose={handleExitSimulation}
          onNext={
            activeGuidedCheckpoint.order === GUIDED_DEMO_TOTAL_CHECKPOINTS
              ? handleFinishSimulation
              : handleAdvanceSimulation
          }
        />
      ) : null}
    </View>
  );
}

function BottomNavItem({
  icon,
  isActive,
  label,
  onPress,
}: {
  icon: ReactNode;
  isActive: boolean;
  label: string;
  onPress: () => void;
}) {
  const reduceMotion = useReduceMotion();
  const activeProgress = useRef(new Animated.Value(isActive ? 1 : 0)).current;

  useEffect(() => {
    activeProgress.stopAnimation();
    if (reduceMotion) {
      activeProgress.setValue(isActive ? 1 : 0);
      return;
    }

    const animation = Animated.timing(activeProgress, {
      toValue: isActive ? 1 : 0,
      duration: motion.duration.fast,
      easing: motion.easing.enter,
      useNativeDriver: true,
    });
    animation.start();
    return () => animation.stop();
  }, [activeProgress, isActive, reduceMotion]);

  return (
    <MotionPressable
      accessibilityRole="tab"
      accessibilityState={{ selected: isActive }}
      onPress={onPress}
      style={styles.navItem}
    >
      <Animated.View
        style={[
          styles.navIcon,
          {
            transform: [
              { translateY: activeProgress.interpolate({ inputRange: [0, 1], outputRange: [0, -2] }) },
              { scale: activeProgress.interpolate({ inputRange: [0, 1], outputRange: [1, 1.04] }) },
            ],
          },
        ]}
      >
        {icon}
      </Animated.View>
      <Text style={isActive ? styles.navLabelActive : styles.navLabel}>{label}</Text>
      <Animated.View
        style={[
          styles.navActiveDot,
          {
            opacity: activeProgress,
            transform: [{ scaleX: activeProgress }],
          },
        ]}
      />
    </MotionPressable>
  );
}

const styles = StyleSheet.create({
  appRoot: {
    flex: 1,
    backgroundColor: colors.background
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: Platform.OS === "android" ? RNStatusBar.currentHeight : 0
  },
  page: {
    padding: spacing.md,
    paddingBottom: 112
  },
  screenReveal: {
    width: "100%"
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
  navActiveDot: {
    width: 14,
    height: 2,
    marginTop: 1,
    borderRadius: 999,
    backgroundColor: colors.turquoise
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
