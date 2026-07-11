import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Animated,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  Trophy,
  Zap,
  ShoppingBag,
  Users,
  MapPin,
  BookOpen,
  CheckSquare,
  ChevronRight,
  ArrowRight,
  Target,
  Gift,
  TrendingUp,
  CheckCircle,
  Lock,
  Flame,
  Share2,
  Star,
  Wallet,
} from "lucide-react-native";
import Svg, { Path, Defs, LinearGradient as SvgLinearGradient, Stop } from "react-native-svg";

import type {
  Campaign,
  CompletionSummary,
  Mission,
  Team,
  User,
  UserVote,
  VerificationLog,
  VotePoll,
} from "../data/kopoinSeed";
import { AnimatedNumber } from "../components/ui/AnimatedNumber";
import { AnimatedProgressFill } from "../components/ui/AnimatedProgressFill";
import { MotionPressable } from "../components/ui/MotionPressable";
import { RewardFeedback } from "../components/ui/RewardFeedback";
import { useAppActive } from "../hooks/use-app-active";
import { useReduceMotion } from "../hooks/use-reduce-motion";
import { getStaggerDelay, motion } from "../motion";
import { colors, shadows, spacing } from "../theme";
import { formatNumber } from "../utils/formatters";
import { SpotlightTarget } from "../components/guided/GuidedOverlay";
import { ProductionQRFeedbackTone, ProductionQRScreen } from "./ProductionQRScreen";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

type MissionHubScreenProps = {
  campaign: Campaign;
  completionSummary: CompletionSummary | null;
  feedback: string;
  feedbackTone: ProductionQRFeedbackTone;
  hasJoinedTeam: boolean;
  manualCode: string;
  mission?: Mission;
  missions: Mission[];
  onDemoScan: () => void;
  onJoinTeam: () => void;
  onManualCodeChange: (value: string) => void;
  onOpenCommunity: () => void;
  onOpenProfile: () => void;
  onOpenRedeem: () => void;
  onScanCode: (code: string) => void;
  onSubmitMission: () => void;
  onVote: (optionId: string) => void;
  scanCompleted: boolean;
  team: Team;
  user: User;
  userVote: UserVote | null;
  usedQrCodes: string[];
  voteFeedback: string;
  votePoll: VotePoll;
  verificationLogs: VerificationLog[];
};

export function MissionHubScreen({
  campaign,
  completionSummary,
  feedback,
  feedbackTone,
  hasJoinedTeam,
  manualCode,
  mission,
  missions,
  onDemoScan,
  onJoinTeam,
  onManualCodeChange,
  onOpenCommunity,
  onOpenProfile,
  onOpenRedeem,
  onScanCode,
  onSubmitMission,
  onVote,
  scanCompleted,
  team,
  user,
  userVote,
  usedQrCodes,
  voteFeedback,
  votePoll,
  verificationLogs,
}: MissionHubScreenProps) {
  const appActive = useAppActive();
  const reduceMotion = useReduceMotion();
  const progressPercent = Math.round((campaign.currentValue / campaign.targetValue) * 100);
  const remainingActions = campaign.targetValue - campaign.currentValue;
  const primaryMissionCurrent = mission?.completed ? mission.target ?? 1 : mission?.current ?? (scanCompleted ? 1 : 0);
  const primaryMissionTarget = mission?.target ?? 1;
  const primaryMissionProgress = Math.min(primaryMissionCurrent / primaryMissionTarget, 1);
  const learningMission = missions.find((m) => m.actionType === "learning");
  const voteMission = missions.find((m) => m.actionType === "vote");
  const inviteMission = missions.find((m) => m.id === "comm_mission_1");
  const checkinMission = missions.find((m) => m.id === "comm_mission_2");
  const initial = user.name ? user.name.charAt(0).toUpperCase() : "A";

  // Pulse animation for LIVE dot
  const pulseAnim = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    if (reduceMotion || !appActive) {
      pulseAnim.setValue(1);
      return;
    }

    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.35, duration: 760, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 760, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [appActive, pulseAnim, reduceMotion]);

  return (
    <View style={styles.container}>

      {/* ── 1. Gradient Header (identical to Home) ── */}
      <LinearGradient
        colors={[colors.tealDark, colors.teal]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.headerGradient}
      >
        {/* Brand row */}
        <View style={styles.brandRow}>
          <View style={{ alignItems: "flex-start" }}>
            <Image source={require("../assets/images/white-logo.png")} style={styles.dashboardLogo} resizeMode="contain" />
            <Text style={styles.headerMeta}>Hub Misi Aktif</Text>
          </View>
          <View style={styles.headerActions}>
            <View style={styles.headerBadge}>
              <Animated.View style={[styles.liveDot, { transform: [{ scale: pulseAnim }] }]} />
              <Text style={styles.headerBadgeText}>LIVE</Text>
            </View>
            <TouchableOpacity onPress={onOpenProfile} activeOpacity={0.8} style={styles.avatarButton}>
              <LinearGradient colors={["#FFE082", "#FFB300"]} style={styles.avatarGradient}>
                <Text style={styles.avatarText}>{initial}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {/* Mission Promo Card inside gradient (glassmorphism) */}
        <View style={styles.heroPromoCard}>
          <View style={styles.heroPromoLeft}>
            <View style={styles.promoBadge}>
              <Text style={styles.promoBadgeText}>MISI AKTIF</Text>
            </View>
            <Text style={styles.promoTitle}>
              {mission?.title ?? "Beli produk lokal"}
            </Text>
            <Text style={styles.promoSub}>
              {mission?.description ?? "Beli Kopi Sukamaju dan validasi kode transaksi kamu."}
            </Text>
            <TouchableOpacity style={styles.promoLink} onPress={onOpenRedeem} activeOpacity={0.7}>
              <Text style={styles.promoLinkText}>Lihat reward →</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.heroPromoRight}>
            <View style={styles.coffeeCupFloating}>
              <ShoppingBag size={26} color={colors.teal} />
            </View>
            <View style={styles.pointsBadge}>
              <Text style={styles.pointsBadgeText}>+{mission?.points ?? 120}</Text>
              <Text style={styles.pointsBadgeUnit}>poin</Text>
            </View>
          </View>
        </View>

        {/* Promo image slider replaced by promo banner */}
        <SpotlightTarget targetKey="mission.campaign">
        <View style={styles.sliderBanner}>
          <View style={styles.sliderBannerLeft}>
            <Text style={styles.sliderBannerTag}>🎯 CAMPAIGN</Text>
            <Text style={styles.sliderBannerTitle}>{campaign.title ?? "Dukung UMKM Lokal"}</Text>
            <View style={styles.sliderProgressTrack}>
              <AnimatedProgressFill progress={progressPercent / 100} style={styles.sliderProgressFill} />
            </View>
            <Text style={styles.sliderProgressText}>
              {campaign.currentValue}/{campaign.targetValue} Aksi · {progressPercent}% tercapai
            </Text>
          </View>
          <View style={styles.sliderBannerRight}>
            <Text style={styles.sliderBannerPercent}>{progressPercent}%</Text>
          </View>
        </View>
        </SpotlightTarget>
      </LinearGradient>

      {/* ── 2. KoPoin Balance Card (floating overlap like Home) ── */}
      <TouchableOpacity style={styles.balanceCard} onPress={onOpenRedeem} activeOpacity={0.8}>
        <View style={styles.balanceLeft}>
          <View style={styles.walletIconBox}>
            <Wallet size={22} color={colors.teal} />
          </View>
          <View style={styles.balanceInfo}>
            <Text style={styles.balanceLabel}>KoPoin Balance</Text>
            <AnimatedNumber formatter={formatNumber} style={styles.balanceAmount} value={user.kopoinBalance} />
          </View>
        </View>
        <View style={styles.balanceDivider} />
        <View style={styles.balanceRight}>
          <Text style={styles.balanceRightLabel}>Sisa Aksi</Text>
          <Text style={styles.balanceRightValue}>{remainingActions}</Text>
        </View>
        <View style={styles.balanceDivider} />
        <View style={styles.balanceRight}>
          <Text style={styles.balanceRightLabel}>Tim</Text>
          <Text style={styles.balanceRightTeam} numberOfLines={1}>{team.name.split(" ").slice(-1)[0]}</Text>
        </View>
      </TouchableOpacity>

      {/* ── 3. Mission Quick-Action Grid (same as Home services grid) ── */}
      <View style={styles.gridContainer}>
        <MissionGridItem
          icon={<ShoppingBag size={22} color={colors.teal} />}
          label="Beli Produk"
          points={120}
          bg="#EAFBF7"
          isLive={!scanCompleted}
        />
        <MissionGridItem
          icon={<Users size={22} color="#7C3AED" />}
          label="Ajak Teman"
          points={80}
          bg="#EEF2FF"
          isLive={false}
        />
        <MissionGridItem
          icon={<MapPin size={22} color="#D97706" />}
          label="Check-in"
          points={60}
          bg="#FFFBEB"
          isLive={false}
        />
        <MissionGridItem
          icon={<BookOpen size={22} color="#059669" />}
          label="Belajar"
          points={60}
          bg="#ECFDF5"
          isLive={false}
        />
      </View>

      {/* ── 4. Leaderboard Track Card (green promo card width, upgraded) ── */}
      <SpotlightTarget targetKey="mission.leaderboard">
      <View style={styles.leaderCard}>
        <View style={styles.leaderHeader}>
          <View>
            <View style={styles.leaderTitleRow}>
              <Trophy size={14} color={colors.gold} />
              <Text style={styles.leaderKicker}>Peringkat Keaktifan</Text>
            </View>
            <Text style={styles.leaderTitle}>Posisi tim minggu ini</Text>
          </View>
          <View style={styles.leaderLivePill}>
            <Animated.View style={[styles.leaderLiveDot, { transform: [{ scale: pulseAnim }] }]} />
            <Text style={styles.leaderLiveText}>LIVE</Text>
          </View>
        </View>

        {/* Arc SVG track */}
        <View style={styles.trackContainer}>
          <Svg height="130" width="100%" viewBox="0 0 340 130" style={StyleSheet.absoluteFillObject}>
            <Defs>
              <SvgLinearGradient id="trackGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <Stop offset="0%" stopColor="#0F6B63" stopOpacity="0.10" />
                <Stop offset="50%" stopColor="#19A88E" stopOpacity="0.30" />
                <Stop offset="100%" stopColor="#0F6B63" stopOpacity="0.10" />
              </SvgLinearGradient>
            </Defs>
            <Path d="M 35,35 Q 170,120 305,35" fill="none" stroke="#E2ECE8" strokeWidth="12" strokeLinecap="round" />
            <Path d="M 35,35 Q 170,120 305,35" fill="none" stroke="url(#trackGrad)" strokeWidth="4" strokeLinecap="round" />
            <Path d="M 35,35 Q 170,120 305,35" fill="none" stroke="#19A88E" strokeWidth="1.5" strokeDasharray="5,7" strokeLinecap="round" />
          </Svg>

          {/* Rank #4 */}
          <View style={[styles.avatarPos, { left: "2%", top: 8 }]}>
            <View style={styles.avatarSmRing}>
              <Image source={{ uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60" }} style={styles.avatarSm} />
            </View>
            <View style={[styles.rankBadge, { backgroundColor: "#9CA3AF" }]}><Text style={styles.rankNum}>4</Text></View>
          </View>

          {/* Rank #2 */}
          <View style={[styles.avatarPos, { left: "23%", top: 36 }]}>
            <View style={styles.avatarMdRing}>
              <Image source={{ uri: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=60" }} style={styles.avatarMd} />
            </View>
            <View style={[styles.rankBadge, { backgroundColor: "#C0C0C0" }]}><Text style={styles.rankNum}>2</Text></View>
          </View>

          {/* Rank #1 – YOU */}
          <View style={[styles.avatarPos, { left: "42%", top: 50 }]}>
            <View style={styles.crownWrap}><Text style={styles.crownText}>👑</Text></View>
            <LinearGradient colors={["#FFE082", "#FFB300"]} style={styles.avatarLgRing}>
              <Image source={{ uri: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60" }} style={styles.avatarLg} />
            </LinearGradient>
            <View style={[styles.rankBadge, { backgroundColor: "#FBBF24" }]}><Text style={styles.rankNum}>1</Text></View>
          </View>

          {/* Rank #3 */}
          <View style={[styles.avatarPos, { left: "63%", top: 36 }]}>
            <View style={styles.avatarMdRing}>
              <Image source={{ uri: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=60" }} style={styles.avatarMd} />
            </View>
            <View style={[styles.rankBadge, { backgroundColor: "#CD7F32" }]}><Text style={styles.rankNum}>3</Text></View>
          </View>

          {/* Rank #5 */}
          <View style={[styles.avatarPos, { left: "84%", top: 8 }]}>
            <View style={styles.avatarSmRing}>
              <Image source={{ uri: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=60" }} style={styles.avatarSm} />
            </View>
            <View style={[styles.rankBadge, { backgroundColor: "#9CA3AF" }]}><Text style={styles.rankNum}>5</Text></View>
          </View>
        </View>

        <View style={styles.leaderFooter}>
          <Star size={12} color={colors.gold} fill={colors.gold} />
          <Text style={styles.leaderFooterText}>Tim Pemuda Sukamaju memimpin minggu ini</Text>
        </View>
      </View>
      </SpotlightTarget>

      {/* ── 5. Milestone Progress (same section title + card pattern as Home) ── */}
      <SpotlightTarget targetKey="mission.reward">
      <Text style={styles.sectionTitle}>Milestone Reward</Text>
      <View style={styles.milestoneCard}>
        {/* Progress bar header */}
        <View style={styles.milestoneBarRow}>
          <View style={styles.milestoneBarTrack}>
            <AnimatedProgressFill progress={progressPercent / 100} style={styles.milestoneBarFill}>
              <LinearGradient
                colors={[colors.turquoise, colors.teal]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={StyleSheet.absoluteFillObject}
              />
            </AnimatedProgressFill>
          </View>
          <Text style={styles.milestoneBarPercent}>{progressPercent}%</Text>
        </View>

        <MilestoneItem
          icon={<CheckCircle size={18} color="#059669" />}
          poin="5.000 poin"
          title="Voucher Belanja"
          state="Terbuka"
          tone="done"
        />
        <View style={styles.milestoneLine} />
        <MilestoneItem
          icon={<Flame size={18} color="#D97706" />}
          poin="8.000 poin"
          title="Badge Tim Eksklusif"
          state="Sedang Dikejar"
          tone="current"
        />
        <View style={styles.milestoneLine} />
        <MilestoneItem
          icon={<Lock size={18} color={colors.muted} />}
          poin="10.000 poin"
          title="Diskon UMKM Lokal"
          state="Terkunci"
          tone="locked"
        />
      </View>
      </SpotlightTarget>

      {/* ── 6. Pre-mission reward vote ── */}
      <SpotlightTarget targetKey="mission.vote">
      <Text style={styles.sectionTitle}>Pilih reward misi berikutnya</Text>
      <RewardVoteCard
        poll={votePoll}
        selectedOptionId={userVote?.optionId ?? null}
        feedback={voteFeedback}
        teamName={team.name}
        onVote={onVote}
      />
      </SpotlightTarget>

      {/* ── 7. Mission Task Cards (carousel-style like Home "pilihan buat kamu") ── */}
      <Text style={styles.sectionTitle}>Tugas Misi Aktif</Text>

      {/* Primary Live Mission — full width green card */}
      <LinearGradient
        colors={[colors.teal, colors.tealDark]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.liveMissionCard}
      >
        <View style={styles.liveMissionTop}>
          <View style={styles.liveMissionTag}>
            <Zap size={10} color={colors.teal} />
            <Text style={styles.liveMissionTagText}>MISI UTAMA</Text>
          </View>
          <View style={styles.livePill}>
            <Animated.View style={[styles.livePillDot, { transform: [{ scale: pulseAnim }] }]} />
            <Text style={styles.livePillText}>AKTIF</Text>
          </View>
        </View>
        <View style={styles.liveMissionBody}>
          <View style={styles.liveMissionLeft}>
            <Text style={styles.liveMissionTitle}>
              {mission?.title ?? "Beli produk lokal"}
            </Text>
            <Text style={styles.liveMissionDesc} numberOfLines={2}>
              {mission?.description ?? "Beli Kopi Sukamaju dan validasi kode transaksi."}
            </Text>
            {/* Progress bar */}
            <View style={styles.missionProgressTrack}>
              <AnimatedProgressFill progress={primaryMissionProgress} style={styles.missionProgressFill}>
                <LinearGradient
                  colors={[colors.turquoise, colors.teal]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={StyleSheet.absoluteFillObject}
                />
              </AnimatedProgressFill>
            </View>
            <Text style={styles.missionProgressText}>
              {mission?.completed ? mission.target ?? 1 : mission?.current ?? (scanCompleted ? 1 : 0)}/
              {mission?.target ?? 1} selesai
            </Text>
          </View>
          <View style={styles.liveMissionRight}>
            <LinearGradient colors={[colors.teal, colors.tealDark]} style={styles.liveMissionPointBox}>
              <ShoppingBag size={18} color="#FFFFFF" />
              <Text style={styles.liveMissionPoints}>+{mission?.points ?? 120}</Text>
              <Text style={styles.liveMissionPointsUnit}>poin</Text>
            </LinearGradient>
          </View>
        </View>
      </LinearGradient>

      {/* Secondary missions as 2-col grid cards */}
      <View style={styles.secondaryMissionsGrid}>
        <SecondaryMissionCard
          icon={<Users size={20} color="#7C3AED" />}
          iconBg="#EEF2FF"
          title={inviteMission?.title ?? "Ajak anggota aktif"}
          points={inviteMission?.points ?? 80}
          current={inviteMission?.current ?? 0}
          target={inviteMission?.target ?? 5}
          tag="KOMUNITAS"
          tagColor="#7C3AED"
        />
        <SecondaryMissionCard
          icon={<MapPin size={20} color="#D97706" />}
          iconBg="#FFFBEB"
          title={checkinMission?.title ?? "Check-in koperasi"}
          points={checkinMission?.points ?? 60}
          current={checkinMission?.current ?? 0}
          target={checkinMission?.target ?? 1}
          tag="LOKASI"
          tagColor="#D97706"
        />
        <SecondaryMissionCard
          icon={<BookOpen size={20} color="#059669" />}
          iconBg="#ECFDF5"
          title={learningMission?.title ?? "Belajar koperasi"}
          points={learningMission?.points ?? 60}
          current={learningMission?.completed ? learningMission.target ?? 1 : learningMission?.current ?? 0}
          target={learningMission?.target ?? 1}
          tag="BELAJAR"
          tagColor="#059669"
        />
        <SecondaryMissionCard
          icon={<CheckSquare size={20} color={colors.turquoise} />}
          iconBg="#EAFBF7"
          title={voteMission?.title ?? "Pilih reward berikutnya"}
          points={voteMission?.points ?? 30}
          current={voteMission?.completed || user.achievementUnlocked ? 1 : voteMission?.current ?? 0}
          target={voteMission?.target ?? 1}
          tag="VOTING"
          tagColor={colors.turquoise}
        />
      </View>

      {/* ── 8. Join Team Gate (styled like Home green promo card) ── */}
      {!hasJoinedTeam && (
        <TouchableOpacity style={styles.joinCard} onPress={onJoinTeam} activeOpacity={0.85}>
          <View style={styles.joinLeft}>
            <View style={styles.joinTag}>
              <Text style={styles.joinTagText}>GABUNG TIM</Text>
            </View>
            <Text style={styles.joinTitle}>Gabung tim sebelum validasi</Text>
            <Text style={styles.joinSub}>
              KoPoin menghitung aksi pribadi sebagai kontribusi untuk progress tim.
            </Text>
          </View>
          <View style={styles.joinRight}>
            <View style={styles.joinChevron}>
              <ArrowRight size={18} color={colors.teal} />
            </View>
          </View>
        </TouchableOpacity>
      )}

      {/* ── 9. QR Scanner Section ── */}
      <ProductionQRScreen
        feedback={feedback}
        feedbackTone={feedbackTone}
        manualCode={manualCode}
        onDemoScan={onDemoScan}
        onManualCodeChange={onManualCodeChange}
        onScanCode={onScanCode}
        onSubmitMission={onSubmitMission}
        scanCompleted={scanCompleted}
        usedQrCodes={usedQrCodes}
        verificationLogs={verificationLogs}
      />

      {/* ── 10. Impact Card ── */}
      <SpotlightTarget targetKey="mission.impact">
      <RewardFeedback active={scanCompleted} points={completionSummary?.pointsEarned}>
      {scanCompleted ? (
        <LinearGradient colors={[colors.teal, colors.tealDark]} style={styles.impactCardDone}>
          <View style={styles.impactTopRow}>
            <Text style={styles.impactKickerDone}>Dampak setelah validasi</Text>
            <View style={styles.impactSuccessPill}>
              <CheckCircle size={11} color="#FFFFFF" />
              <Text style={styles.impactSuccessText}>Berhasil!</Text>
            </View>
          </View>
          {completionSummary && (
            <View style={styles.impactGrid}>
              <ImpactCell icon={<Wallet size={14} color="rgba(255,255,255,0.7)" />} label="KoPoin" value={`${formatNumber(completionSummary.balanceBefore)} → ${formatNumber(completionSummary.balanceAfter)}`} />
              <ImpactCell icon={<TrendingUp size={14} color="rgba(255,255,255,0.7)" />} label="Progress" value={`${completionSummary.progressBefore} → ${completionSummary.progressAfter}`} />
              <ImpactCell icon={<Trophy size={14} color="rgba(255,255,255,0.7)" />} label="Peringkat" value={`#${completionSummary.rankBefore} → #${completionSummary.rankAfter}`} />
              <ImpactCell icon={<Star size={14} color="rgba(255,255,255,0.7)" />} label="Badge" value={completionSummary.achievementTitle} />
            </View>
          )}
        </LinearGradient>
      ) : (
        <View style={styles.impactCardPending}>
          <View style={styles.impactPendingRow}>
            <View style={styles.impactPendingIconBox}>
              <Target size={20} color={colors.muted} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.impactPendingTitle}>Dampak akan terbuka</Text>
              <Text style={styles.impactPendingText}>
                Scan kode demo untuk membuka +120 KoPoin, achievement, perubahan leaderboard, dan reward progress tim.
              </Text>
            </View>
          </View>
        </View>
      )}

      {/* ── 11. Share / Leaderboard Card (Flash banner style) ── */}
      </RewardFeedback>
      </SpotlightTarget>
      <MotionPressable style={styles.shareBanner} onPress={onOpenCommunity}>
        <View style={styles.shareBannerLeft}>
          <View style={styles.shareIconBox}>
            <Share2 size={16} color="#FFFFFF" />
          </View>
          <View style={styles.shareInfo}>
            <View style={styles.shareRow}>
              <Text style={styles.shareKicker}>Share Progress</Text>
              {scanCompleted && (
                <View style={styles.shareSuccessBadge}>
                  <Text style={styles.shareSuccessText}>+Rank</Text>
                </View>
              )}
            </View>
            <Text style={styles.shareDesc}>
              {scanCompleted
                ? "Tim Pemuda Sukamaju naik ke #2! Bagikan ke juri sekarang."
                : "Selesaikan validasi untuk membuka team wrap eksklusif."}
            </Text>
          </View>
        </View>
        <View style={styles.shareBannerRight}>
          <View style={styles.shareArrowBtn}>
            <ArrowRight size={14} color={colors.teal} />
          </View>
        </View>
      </MotionPressable>
    </View>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function MissionGridItem({
  icon,
  label,
  points,
  bg,
  isLive,
}: {
  icon: React.ReactElement<{ color?: string }>;
  label: string;
  points: number;
  bg: string;
  isLive: boolean;
}) {
  return (
    <View style={styles.gridItem}>
      <View style={styles.gridIconContainer}>
        <View style={[styles.gridIconBox, { backgroundColor: bg }]}>{icon}</View>
        {isLive && (
          <View style={styles.gridLiveBadge}>
            <Text style={styles.gridLiveBadgeText}>LIVE</Text>
          </View>
        )}
      </View>
      <Text style={styles.gridLabel}>{label}</Text>
      <Text style={styles.gridPoints}>+{points} poin</Text>
    </View>
  );
}

function MilestoneItem({
  icon,
  poin,
  title,
  state,
  tone,
}: {
  icon: React.ReactNode;
  poin: string;
  title: string;
  state: string;
  tone: "done" | "current" | "locked";
}) {
  const isDone = tone === "done";
  const isCurrent = tone === "current";
  return (
    <View style={[styles.milestoneRow, isCurrent && styles.milestoneRowCurrent]}>
      <View style={[styles.milestoneIconBox, isDone && styles.milestoneIconDone, isCurrent && styles.milestoneIconCurrent]}>
        {icon}
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.milestonePoin}>{poin}</Text>
        <Text style={[styles.milestoneTitle, tone === "locked" && styles.milestoneTitleLocked]}>{title}</Text>
      </View>
      <View style={[styles.milestoneStatePill, isDone && styles.milestoneStateDone, isCurrent && styles.milestoneStateCurrent]}>
        <Text style={[styles.milestoneStateText, isDone && styles.milestoneStateDoneText, isCurrent && styles.milestoneStateCurrentText]}>
          {state}
        </Text>
      </View>
    </View>
  );
}

function SecondaryMissionCard({
  icon,
  iconBg,
  title,
  points,
  current,
  target,
  tag,
  tagColor,
}: {
  icon: React.ReactElement<{ color?: string }>;
  iconBg: string;
  title: string;
  points: number;
  current: number;
  target: number;
  tag: string;
  tagColor: string;
}) {
  const percent = Math.min(Math.round((current / target) * 100), 100);
  const isDone = current >= target;
  return (
    <View style={[styles.secondaryCard, isDone && styles.secondaryCardDone]}>
      <View style={styles.secondaryCardHeader}>
        <LinearGradient
          colors={isDone ? [colors.teal, colors.tealDark] : ["#F9FAFB", "#F3F4F6"]}
          style={styles.secondaryGraphic}
        >
          {React.cloneElement(icon, {
            color: isDone ? "#FFFFFF" : tagColor,
          })}
          <View style={[styles.secondaryPointsBadge, { borderColor: `${tagColor}30` }]}>
            <Text style={[styles.secondaryPointsText, { color: isDone ? "#FFFFFF" : tagColor }]}>+{points}</Text>
          </View>
        </LinearGradient>
      </View>
      <View style={styles.secondaryCardBody}>
        <Text style={[styles.secondaryTag, { color: tagColor }]}>{tag}</Text>
        <Text style={styles.secondaryTitle} numberOfLines={2}>{title}</Text>
        <View style={styles.secondaryTrack}>
          <View style={[styles.secondaryFill, { width: `${percent}%`, backgroundColor: isDone ? colors.turquoise : tagColor }]} />
        </View>
        <Text style={styles.secondaryMeta}>{current}/{target} selesai</Text>
      </View>
    </View>
  );
}

function RewardVoteCard({
  poll,
  selectedOptionId,
  feedback,
  teamName,
  onVote,
}: {
  poll: VotePoll;
  selectedOptionId: string | null;
  feedback: string;
  teamName: string;
  onVote: (optionId: string) => void;
}) {
  const reduceMotion = useReduceMotion();
  const cardReveal = useRef(new Animated.Value(0)).current;
  const totalVotes = poll.options.reduce((total, option) => total + option.votes, 0);
  const hasVoted = Boolean(selectedOptionId);

  useEffect(() => {
    if (reduceMotion) {
      cardReveal.setValue(1);
      return;
    }

    const animation = Animated.spring(cardReveal, {
      toValue: 1,
      ...motion.spring,
      useNativeDriver: true,
    });
    animation.start();
    return () => animation.stop();
  }, [cardReveal, reduceMotion]);

  return (
    <Animated.View
      style={[
        styles.rewardVoteCard,
        {
          opacity: cardReveal,
          transform: [
            {
              translateY: cardReveal.interpolate({ inputRange: [0, 1], outputRange: [18, 0] }),
            },
          ],
        },
      ]}
    >
      <View style={styles.rewardVoteHeader}>
        <LinearGradient colors={[colors.gold, "#FFD76A"]} style={styles.rewardVoteIcon}>
          <Gift size={20} color={colors.tealDark} />
        </LinearGradient>
        <View style={styles.rewardVoteHeaderCopy}>
          <View style={styles.rewardVoteEyebrowRow}>
            <Text style={styles.rewardVoteEyebrow}>VOTING TIM</Text>
            <View style={styles.rewardVoteOpenPill}>
              <View style={styles.rewardVoteOpenDot} />
              <Text style={styles.rewardVoteOpenText}>TERBUKA</Text>
            </View>
          </View>
          <Text style={styles.rewardVoteTitle}>Reward mana yang mau dikejar?</Text>
          <Text style={styles.rewardVoteCopy}>
            Sebelum misi dimulai, suara {teamName} menentukan hadiah yang dibawa pulang.
          </Text>
        </View>
      </View>

      <View style={styles.rewardVoteMetaRow}>
        <View style={styles.rewardVoteMetaItem}>
          <Users size={13} color={colors.teal} />
          <Text style={styles.rewardVoteMetaText}>{totalVotes} suara masuk</Text>
        </View>
        <Text style={styles.rewardVoteRule}>1 anggota · 1 suara</Text>
      </View>

      <View style={styles.rewardVoteOptions}>
        {poll.options.map((option, index) => (
          <RewardVoteOption
            key={option.id}
            option={option}
            index={index}
            isSelected={selectedOptionId === option.id}
            onVote={onVote}
          />
        ))}
      </View>

      <View style={styles.rewardVoteBottom}>
        <View style={styles.rewardVoteBottomIcon}>
          <CheckCircle size={14} color={hasVoted ? colors.success : colors.muted} />
        </View>
        <Text style={styles.rewardVoteBottomText} numberOfLines={2}>
          {hasVoted ? `Pilihanmu tersimpan · ${feedback}` : "Pilih satu reward untuk ikut menentukan misi berikutnya."}
        </Text>
      </View>
    </Animated.View>
  );
}

function RewardVoteOption({
  option,
  index,
  isSelected,
  onVote,
}: {
  option: VotePoll["options"][number];
  index: number;
  isSelected: boolean;
  onVote: (optionId: string) => void;
}) {
  const reduceMotion = useReduceMotion();
  const entry = useRef(new Animated.Value(0)).current;
  const pressScale = useRef(new Animated.Value(1)).current;
  const accent = [colors.gold, colors.turquoise, "#8B5CF6"][index % 3];

  useEffect(() => {
    if (reduceMotion) {
      entry.setValue(1);
      return;
    }

    const animation = Animated.sequence([
      Animated.delay(getStaggerDelay(index)),
      Animated.spring(entry, { toValue: 1, ...motion.spring, useNativeDriver: true }),
    ]);
    animation.start();
    return () => animation.stop();
  }, [entry, index, reduceMotion]);

  function handlePress() {
    if (reduceMotion) {
      onVote(option.id);
      return;
    }

    Animated.sequence([
      Animated.timing(pressScale, { toValue: motion.scale.press, duration: motion.duration.instant, useNativeDriver: true }),
      Animated.spring(pressScale, { toValue: 1, ...motion.spring, useNativeDriver: true }),
    ]).start();
    onVote(option.id);
  }

  return (
    <Animated.View
      style={{
        opacity: entry,
        transform: [
          { translateX: entry.interpolate({ inputRange: [0, 1], outputRange: [16, 0] }) },
          { scale: pressScale },
        ],
      }}
    >
      <TouchableOpacity
        style={[styles.rewardVoteOption, isSelected && styles.rewardVoteOptionSelected]}
        onPress={handlePress}
        activeOpacity={0.9}
      >
        <View style={styles.rewardVoteOptionTop}>
          <View style={[styles.rewardVoteRadio, { borderColor: isSelected ? colors.teal : accent }]}>
            {isSelected && <View style={styles.rewardVoteRadioSelected} />}
          </View>
          <View style={styles.rewardVoteOptionNameRow}>
            <Text style={styles.rewardVoteOptionName} numberOfLines={1}>{option.label}</Text>
            {isSelected && <Text style={styles.rewardVoteSelectedLabel}>PILIHANMU</Text>}
          </View>
          <Text style={styles.rewardVotePercent}>{option.percent}%</Text>
        </View>
        <View style={styles.rewardVoteTrack}>
          <AnimatedProgressFill
            progress={option.percent / 100}
            style={[styles.rewardVoteFill, { backgroundColor: isSelected ? colors.teal : accent }]}
          />
        </View>
        <View style={styles.rewardVoteOptionFooter}>
          <Text style={styles.rewardVoteVotes}>{option.votes} anggota memilih</Text>
          <ChevronRight size={14} color={isSelected ? colors.teal : colors.muted} />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

function ImpactCell({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <View style={styles.impactCell}>
      {icon}
      <Text style={styles.impactCellLabel}>{label}</Text>
      <Text style={styles.impactCellValue}>{value}</Text>
    </View>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // ── Header Gradient (identical to Home) ──
  headerGradient: {
    marginHorizontal: -spacing.md,
    marginTop: -spacing.md,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md + 14,
    paddingBottom: 54,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.md,
    marginTop: 4,
  },
  dashboardLogo: {
    width: 30,
    height: 30,
    marginBottom: 8,
    alignSelf: "flex-start",
  },
  headerMeta: {
    color: "#EAFBF7",
    fontSize: 12,
    fontWeight: "700",
    marginTop: -2,
  },
  headerBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderRadius: 999,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    backgroundColor: "rgba(255, 255, 255, 0.18)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  liveDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: "#EF4444",
  },
  headerBadgeText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
  avatarButton: {
    borderRadius: 999,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarGradient: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 21,
    borderWidth: 1.5,
    borderColor: colors.white,
  },
  avatarText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "900",
  },

  // ── Hero Promo Card (glassmorphism inside gradient) ──
  heroPromoCard: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    borderRadius: 20,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    marginBottom: spacing.md,
  },
  heroPromoLeft: {
    flex: 1,
    justifyContent: "center",
  },
  promoBadge: {
    alignSelf: "flex-start",
    backgroundColor: colors.gold,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 6,
  },
  promoBadgeText: {
    color: colors.tealDark,
    fontSize: 9,
    fontWeight: "900",
  },
  promoTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "900",
    lineHeight: 23,
    marginBottom: 4,
  },
  promoSub: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 12,
    lineHeight: 17,
    fontWeight: "600",
    marginBottom: 8,
  },
  promoLink: {
    flexDirection: "row",
    alignItems: "center",
  },
  promoLinkText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "900",
    textDecorationLine: "underline",
  },
  heroPromoRight: {
    width: 88,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  coffeeCupFloating: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  pointsBadge: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.18)",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
  },
  pointsBadgeText: {
    color: colors.gold,
    fontSize: 16,
    fontWeight: "900",
    lineHeight: 18,
  },
  pointsBadgeUnit: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 9,
    fontWeight: "800",
    textTransform: "uppercase",
  },

  // ── Slider Banner (replaces image slider for mission context) ──
  sliderBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.10)",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },
  sliderBannerLeft: {
    flex: 1,
  },
  sliderBannerTag: {
    color: colors.gold,
    fontSize: 10,
    fontWeight: "900",
    marginBottom: 4,
  },
  sliderBannerTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "900",
    marginBottom: 8,
  },
  sliderProgressTrack: {
    height: 6,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.2)",
    overflow: "hidden",
    marginBottom: 5,
  },
  sliderProgressFill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: "#FFFFFF",
  },
  sliderProgressText: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 10,
    fontWeight: "700",
  },
  sliderBannerRight: {
    paddingLeft: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  sliderBannerPercent: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "900",
  },

  // ── Balance Card (floating overlap — identical to Home) ──
  balanceCard: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    marginTop: -28,
    marginHorizontal: 2,
    shadowColor: "#24413D",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 14,
    elevation: 4,
    borderWidth: 1,
    borderColor: colors.line,
  },
  balanceLeft: {
    flex: 1.2,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 4,
  },
  walletIconBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#EAFBF7",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  balanceInfo: {
    flex: 1,
  },
  balanceLabel: {
    fontSize: 10,
    fontWeight: "800",
    color: colors.muted,
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  balanceAmount: {
    fontSize: 17,
    fontWeight: "900",
    color: colors.text,
  },
  balanceDivider: {
    width: 1,
    height: 36,
    backgroundColor: colors.line,
    marginHorizontal: 10,
  },
  balanceRight: {
    alignItems: "center",
    minWidth: 50,
  },
  balanceRightLabel: {
    fontSize: 10,
    fontWeight: "800",
    color: colors.muted,
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  balanceRightValue: {
    fontSize: 17,
    fontWeight: "900",
    color: colors.teal,
    marginTop: 1,
  },
  balanceRightTeam: {
    fontSize: 13,
    fontWeight: "900",
    color: colors.text,
    marginTop: 1,
  },

  // ── Service Grid (identical to Home) ──
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 24,
    marginHorizontal: 2,
  },
  gridItem: {
    width: "23%",
    alignItems: "center",
    marginBottom: 20,
  },
  gridIconContainer: {
    position: "relative",
    marginBottom: 6,
  },
  gridIconBox: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.line,
  },
  gridLiveBadge: {
    position: "absolute",
    top: -6,
    right: -8,
    borderRadius: 999,
    paddingHorizontal: 5,
    paddingVertical: 1,
    backgroundColor: "#EF4444",
  },
  gridLiveBadgeText: {
    color: "#FFFFFF",
    fontSize: 7,
    fontWeight: "900",
  },
  gridLabel: {
    color: colors.text,
    fontSize: 11,
    fontWeight: "800",
    textAlign: "center",
  },
  gridPoints: {
    color: colors.muted,
    fontSize: 10,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 1,
  },

  // ── Leaderboard Card ──
  leaderCard: {
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: spacing.md,
    marginHorizontal: 2,
    borderWidth: 1,
    borderColor: colors.line,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  leaderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  leaderTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  leaderKicker: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "900",
  },
  leaderTitle: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "700",
    marginTop: 2,
  },
  leaderLivePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: "#FEF2F2",
    borderWidth: 1,
    borderColor: "#FCA5A5",
  },
  leaderLiveDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: "#EF4444",
  },
  leaderLiveText: {
    color: "#EF4444",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
  trackContainer: {
    height: 150,
    width: "100%",
    position: "relative",
    marginTop: 4,
  },
  avatarPos: {
    position: "absolute",
    alignItems: "center",
  },
  avatarSmRing: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: "#E5E7EB",
    overflow: "hidden",
  },
  avatarSm: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  avatarMdRing: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 2.5,
    borderColor: "#9CA3AF",
    overflow: "hidden",
  },
  avatarMd: {
    width: 47,
    height: 47,
    borderRadius: 24,
  },
  avatarLgRing: {
    width: 66,
    height: 66,
    borderRadius: 33,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
  },
  avatarLg: {
    width: 58,
    height: 58,
    borderRadius: 29,
  },
  crownWrap: {
    position: "absolute",
    top: -20,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 20,
  },
  crownText: {
    fontSize: 18,
  },
  rankBadge: {
    position: "absolute",
    bottom: -3,
    right: -3,
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  rankNum: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "900",
    lineHeight: 11,
  },
  leaderFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    marginTop: 8,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.line,
  },
  leaderFooterText: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "700",
    textAlign: "center",
  },

  // ── Section Title (matches Home) ──
  sectionTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: colors.text,
    marginHorizontal: 2,
    marginBottom: 12,
    marginTop: 24,
  },

  // ── Milestone Card ──
  milestoneCard: {
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 14,
    marginHorizontal: 2,
    gap: 0,
    borderWidth: 1,
    borderColor: colors.line,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  rewardVoteCard: {
    backgroundColor: "#FFF9EC",
    borderRadius: 22,
    padding: 16,
    marginHorizontal: 2,
    borderWidth: 1,
    borderColor: "#F1DFB7",
    shadowColor: "#8C6A2C",
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.1,
    shadowRadius: 14,
    elevation: 3,
  },
  rewardVoteHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  rewardVoteIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 2,
  },
  rewardVoteHeaderCopy: {
    flex: 1,
  },
  rewardVoteEyebrowRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    marginBottom: 4,
  },
  rewardVoteEyebrow: {
    color: colors.gold,
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 0.7,
  },
  rewardVoteOpenPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderRadius: 999,
    paddingHorizontal: 7,
    paddingVertical: 3,
    backgroundColor: "#E8F8F4",
    borderWidth: 1,
    borderColor: "#B8E8DB",
  },
  rewardVoteOpenDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.success,
  },
  rewardVoteOpenText: {
    color: colors.success,
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 0.4,
  },
  rewardVoteTitle: {
    color: colors.ink,
    fontSize: 17,
    lineHeight: 21,
    fontWeight: "900",
  },
  rewardVoteCopy: {
    color: colors.muted,
    fontSize: 11,
    lineHeight: 16,
    fontWeight: "600",
    marginTop: 4,
  },
  rewardVoteMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 14,
    marginBottom: 10,
    paddingTop: 11,
    borderTopWidth: 1,
    borderTopColor: "#F0E4C9",
  },
  rewardVoteMetaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  rewardVoteMetaText: {
    color: colors.teal,
    fontSize: 10,
    fontWeight: "900",
  },
  rewardVoteRule: {
    color: colors.muted,
    fontSize: 10,
    fontWeight: "800",
  },
  rewardVoteOptions: {
    gap: 9,
  },
  rewardVoteOption: {
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: 12,
    borderWidth: 1,
    borderColor: "#EEE8DB",
  },
  rewardVoteOptionSelected: {
    backgroundColor: "#EAFBF7",
    borderColor: "#74D8C1",
    shadowColor: colors.turquoise,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.13,
    shadowRadius: 7,
    elevation: 2,
  },
  rewardVoteOptionTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  rewardVoteRadio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    backgroundColor: colors.white,
  },
  rewardVoteRadioSelected: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.teal,
  },
  rewardVoteOptionNameRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  rewardVoteOptionName: {
    flexShrink: 1,
    color: colors.ink,
    fontSize: 12,
    fontWeight: "900",
  },
  rewardVoteSelectedLabel: {
    color: colors.teal,
    fontSize: 7,
    fontWeight: "900",
    letterSpacing: 0.3,
  },
  rewardVotePercent: {
    color: colors.teal,
    fontSize: 13,
    fontWeight: "900",
  },
  rewardVoteTrack: {
    height: 6,
    borderRadius: 999,
    backgroundColor: "#F1F2EE",
    overflow: "hidden",
    marginTop: 9,
  },
  rewardVoteFill: {
    height: "100%",
    borderRadius: 999,
  },
  rewardVoteOptionFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 6,
  },
  rewardVoteVotes: {
    color: colors.muted,
    fontSize: 9,
    fontWeight: "700",
  },
  rewardVoteBottom: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#F0E4C9",
  },
  rewardVoteBottomIcon: {
    width: 22,
    height: 22,
    borderRadius: 7,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E7DECA",
  },
  rewardVoteBottomText: {
    flex: 1,
    color: colors.muted,
    fontSize: 10,
    lineHeight: 14,
    fontWeight: "700",
  },
  milestoneBarRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 14,
  },
  milestoneBarTrack: {
    flex: 1,
    height: 8,
    borderRadius: 999,
    backgroundColor: "#F0F4F3",
    overflow: "hidden",
  },
  milestoneBarFill: {
    height: "100%",
    borderRadius: 999,
  },
  milestoneBarPercent: {
    color: colors.teal,
    fontSize: 13,
    fontWeight: "900",
    minWidth: 32,
    textAlign: "right",
  },
  milestoneRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderRadius: 12,
    padding: 12,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: "transparent",
  },
  milestoneRowCurrent: {
    backgroundColor: "#FFFBEB",
    borderColor: "#FDE68A",
  },
  milestoneLine: {
    width: 1.5,
    height: 10,
    backgroundColor: colors.line,
    marginLeft: 22,
  },
  milestoneIconBox: {
    width: 36,
    height: 36,
    borderRadius: 11,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.line,
  },
  milestoneIconDone: {
    backgroundColor: "#ECFDF5",
    borderColor: "#6EE7B7",
  },
  milestoneIconCurrent: {
    backgroundColor: "#FFFBEB",
    borderColor: "#FDE68A",
  },
  milestonePoin: {
    color: colors.muted,
    fontSize: 10,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  milestoneTitle: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "900",
    marginTop: 1,
  },
  milestoneTitleLocked: {
    color: colors.muted,
  },
  milestoneStatePill: {
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 3,
    backgroundColor: "#F3F4F6",
    borderWidth: 1,
    borderColor: colors.line,
  },
  milestoneStateDone: {
    backgroundColor: "#ECFDF5",
    borderColor: "#6EE7B7",
  },
  milestoneStateCurrent: {
    backgroundColor: "#FFFBEB",
    borderColor: "#FDE68A",
  },
  milestoneStateText: {
    color: colors.muted,
    fontSize: 10,
    fontWeight: "900",
  },
  milestoneStateDoneText: {
    color: "#059669",
  },
  milestoneStateCurrentText: {
    color: "#D97706",
  },

  // ── Live Mission Card (primary — full width green promo) ──
  liveMissionCard: {
    borderRadius: 18,
    padding: 16,
    marginHorizontal: 2,
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.2)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  liveMissionTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  liveMissionTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(255,255,255,0.16)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.24)",
  },
  liveMissionTagText: {
    color: colors.white,
    fontSize: 9,
    fontWeight: "900",
  },
  livePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 3,
    backgroundColor: "#EF4444",
  },
  livePillDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: "#FFFFFF",
  },
  livePillText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
  liveMissionBody: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  liveMissionLeft: {
    flex: 1,
  },
  liveMissionTitle: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "900",
    marginBottom: 4,
  },
  liveMissionDesc: {
    color: "rgba(255,255,255,0.76)",
    fontSize: 12,
    lineHeight: 17,
    fontWeight: "600",
    marginBottom: 10,
  },
  missionProgressTrack: {
    height: 6,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.2)",
    overflow: "hidden",
    marginBottom: 5,
  },
  missionProgressFill: {
    height: "100%",
    borderRadius: 999,
  },
  missionProgressText: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 11,
    fontWeight: "700",
  },
  liveMissionRight: {
    alignItems: "center",
  },
  liveMissionPointBox: {
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    alignItems: "center",
    gap: 2,
  },
  liveMissionPoints: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "900",
    lineHeight: 18,
    marginTop: 4,
  },
  liveMissionPointsUnit: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 9,
    fontWeight: "800",
    textTransform: "uppercase",
  },

  // ── Secondary Mission Cards (2-col carousel) ──
  secondaryMissionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginHorizontal: 2,
  },
  secondaryCard: {
    width: (SCREEN_WIDTH - 32 - 12) / 2,
    backgroundColor: colors.white,
    borderRadius: 18,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.line,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  secondaryCardDone: {
    borderColor: "#A7F3D0",
  },
  secondaryCardHeader: {
    height: 80,
  },
  secondaryGraphic: {
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  secondaryPointsBadge: {
    position: "absolute",
    bottom: 8,
    right: 8,
    backgroundColor: colors.white,
    borderRadius: 999,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderWidth: 1,
  },
  secondaryPointsText: {
    fontSize: 10,
    fontWeight: "900",
  },
  secondaryCardBody: {
    padding: 12,
  },
  secondaryTag: {
    fontSize: 9,
    fontWeight: "900",
    marginBottom: 2,
  },
  secondaryTitle: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "900",
    marginBottom: 8,
    lineHeight: 17,
  },
  secondaryTrack: {
    height: 4,
    borderRadius: 999,
    backgroundColor: "#F0F4F3",
    overflow: "hidden",
    marginBottom: 5,
  },
  secondaryFill: {
    height: "100%",
    borderRadius: 999,
  },
  secondaryMeta: {
    color: colors.muted,
    fontSize: 10,
    fontWeight: "700",
  },

  // ── Join Team Card (green promo style) ──
  joinCard: {
    backgroundColor: "#00AA13",
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 6,
    marginHorizontal: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  joinLeft: {
    flex: 1,
  },
  joinTag: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginBottom: 6,
  },
  joinTagText: {
    color: colors.white,
    fontSize: 9,
    fontWeight: "900",
  },
  joinTitle: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "900",
    marginBottom: 2,
  },
  joinSub: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 11,
    lineHeight: 16,
    fontWeight: "600",
  },
  joinRight: {
    paddingLeft: 12,
  },
  joinChevron: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },

  // ── Impact Cards ──
  impactCardDone: {
    borderRadius: 18,
    padding: 16,
    marginHorizontal: 2,
  },
  impactTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  impactKickerDone: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  impactSuccessPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: "rgba(255,255,255,0.18)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  impactSuccessText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "900",
  },
  impactGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  impactCell: {
    minWidth: "47%",
    flex: 1,
    borderRadius: 12,
    padding: 12,
    backgroundColor: "rgba(255,255,255,0.10)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.14)",
    gap: 3,
  },
  impactCellLabel: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 10,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  impactCellValue: {
    color: colors.white,
    fontSize: 13,
    fontWeight: "900",
    lineHeight: 17,
  },
  impactCardPending: {
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 14,
    marginHorizontal: 2,
    borderWidth: 1,
    borderColor: colors.line,
  },
  impactPendingRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  impactPendingIconBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.line,
  },
  impactPendingTitle: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "900",
    marginBottom: 4,
  },
  impactPendingText: {
    color: colors.muted,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: "600",
  },

  // ── Share Banner (Flash banner style from Home) ──
  shareBanner: {
    backgroundColor: "#EFF6FF",
    borderColor: "#BFDBFE",
    borderWidth: 1,
    borderRadius: 18,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 6,
    marginBottom: 8,
    marginHorizontal: 2,
    shadowColor: "#24413D",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  shareBannerLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  shareIconBox: {
    width: 28,
    height: 28,
    borderRadius: 9,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  shareInfo: {
    flex: 1,
  },
  shareRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  shareKicker: {
    color: "#1D4ED8",
    fontSize: 13,
    fontWeight: "900",
    marginRight: 8,
  },
  shareSuccessBadge: {
    backgroundColor: colors.teal,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  shareSuccessText: {
    color: colors.white,
    fontSize: 9,
    fontWeight: "900",
  },
  shareDesc: {
    color: "#1E40AF",
    fontSize: 11,
    fontWeight: "600",
    lineHeight: 15,
  },
  shareBannerRight: {
    paddingLeft: 8,
  },
  shareArrowBtn: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#BFDBFE",
    alignItems: "center",
    justifyContent: "center",
  },
});
