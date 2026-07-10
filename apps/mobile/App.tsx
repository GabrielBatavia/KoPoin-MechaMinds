import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
import { colors, spacing } from "./src/theme";

type TabId = "home" | "mission" | "community" | "notifications" | "profile";

const demoStateStorageKey = "kopoin-demo-state-v2";
const wizardSeenStorageKey = "kopoin-wizard-seen-v2";
const validDemoCode = "KOPI-SUKAMAJU-001";

const tabs: { id: TabId; label: string }[] = [
  { id: "home", label: "Beranda" },
  { id: "mission", label: "Misi" },
  { id: "community", label: "Komunitas" },
  { id: "notifications", label: "Notifikasi" },
  { id: "profile", label: "Profil" }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>("home");
  const [demoState, setDemoState] = useState<DemoState>(() => getInitialDemoState());
  const [feedback, setFeedback] = useState("Gabung tim, lalu scan QR atau pakai kode demo untuk menyelesaikan misi.");
  const [feedbackTone, setFeedbackTone] = useState<ProductionQRFeedbackTone>("info");
  const [isHydrated, setIsHydrated] = useState(false);
  const [manualCode, setManualCode] = useState(validDemoCode);
  const [showWizard, setShowWizard] = useState(true);
  const [voteFeedback, setVoteFeedback] = useState("Pilih reward berikutnya agar suara anggota muda terlihat di Campaign Console.");

  const mainMission = demoState.missions.find((mission) => mission.id === mainMissionId);
  const pemudaRank = demoState.leaderboard.find((entry) => entry.teamId === demoState.team.id)?.rank ?? 3;
  const teamWrap = createTeamWrap(demoState);

  useEffect(() => {
    let isMounted = true;

    async function hydrate() {
      try {
        const [storedState, wizardSeen] = await Promise.all([
          AsyncStorage.getItem(demoStateStorageKey),
          AsyncStorage.getItem(wizardSeenStorageKey)
        ]);

        if (!isMounted) {
          return;
        }

        if (storedState) {
          setDemoState(JSON.parse(storedState) as DemoState);
        }

        setShowWizard(wizardSeen !== "true");
      } catch {
        if (isMounted) {
          setDemoState(getInitialDemoState());
          setShowWizard(true);
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
    setActiveTab("home");
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
        <CommunityHubScreen
          campaign={demoState.campaign}
          completionSummary={demoState.latestCompletion}
          currentTeamId={demoState.team.id}
          hasJoinedTeam={demoState.hasJoinedTeam}
          leaderboard={demoState.leaderboard}
          onJoinTeam={handleJoinTeam}
          onOpenMission={() => setActiveTab("mission")}
          onVote={handleSubmitVote}
          scanCompleted={demoState.scanCompleted}
          team={demoState.team}
          teamWrap={teamWrap}
          userVote={demoState.userVote}
          voteFeedback={voteFeedback}
          votePoll={demoState.votePoll}
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
        onReplayWizard={() => setShowWizard(true)}
        onResetDemo={handleResetDemo}
        persisted={isHydrated}
        scanCompleted={demoState.scanCompleted}
        team={demoState.team}
        user={demoState.user}
        userVote={demoState.userVote}
      />
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

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.page} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        {renderActiveScreen()}
      </ScrollView>
      <View style={styles.bottomNav}>
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
            return (
            <TouchableOpacity key={tab.id} onPress={() => setActiveTab(tab.id)} style={isActive ? styles.navItemActive : styles.navItem}>
              <Text style={isActive ? styles.navLabelActive : styles.navLabel}>{tab.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
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
    left: spacing.md,
    right: spacing.md,
    bottom: spacing.md,
    flexDirection: "row",
    gap: spacing.xs,
    padding: spacing.xs,
    backgroundColor: "rgba(255,255,255,0.96)",
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.line,
    shadowColor: "#24413D",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 8
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    paddingVertical: 11,
    paddingHorizontal: 4
  },
  navItemActive: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    paddingVertical: 11,
    paddingHorizontal: 4,
    backgroundColor: colors.teal
  },
  navLabelActive: {
    color: colors.white,
    fontSize: 10,
    fontWeight: "900"
  },
  navLabel: {
    color: colors.muted,
    fontSize: 10,
    fontWeight: "900"
  }
});
