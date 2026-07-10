import { StyleSheet, Text, TouchableOpacity, View, Image, Animated } from "react-native";
import { useEffect, useRef } from "react";
import Svg, { Path, Defs, LinearGradient as SvgLinearGradient, Stop } from "react-native-svg";

import type { Campaign, CompletionSummary, Mission, Team, User, VerificationLog } from "../data/kopoinSeed";
import { colors, radii, shadows, spacing } from "../theme";
import { formatNumber } from "../utils/formatters";
import { ProductionQRFeedbackTone, ProductionQRScreen } from "./ProductionQRScreen";

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
  onOpenRedeem: () => void;
  onScanCode: (code: string) => void;
  onSubmitMission: () => void;
  scanCompleted: boolean;
  team: Team;
  user: User;
  usedQrCodes: string[];
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
  onOpenRedeem,
  onScanCode,
  onSubmitMission,
  scanCompleted,
  team,
  user,
  usedQrCodes,
  verificationLogs
}: MissionHubScreenProps) {
  const progressPercent = Math.round((campaign.currentValue / campaign.targetValue) * 100);
  const remainingActions = campaign.targetValue - campaign.currentValue;
  const learningMission = missions.find((item) => item.actionType === "learning");
  const voteMission = missions.find((item) => item.actionType === "vote");
  const inviteMission = missions.find((item) => item.id === "comm_mission_1");
  const checkinMission = missions.find((item) => item.id === "comm_mission_2");

  const pulseAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.04, duration: 1200, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1200, useNativeDriver: true }),
      ])
    ).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, { toValue: 1, duration: 2000, useNativeDriver: true }),
        Animated.timing(glowAnim, { toValue: 0, duration: 2000, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.screen}>
      {/* ── Header ── */}
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <Image source={require("../assets/images/logo.png")} style={styles.logo} resizeMode="contain" />
          <View>
            <Text style={styles.headerGreeting}>Selamat datang 👋</Text>
            <Text style={styles.headerName}>{user.name ?? "Anggota"}</Text>
          </View>
        </View>
        <View style={styles.headerBadge}>
          <View style={styles.headerBadgeDot} />
          <Text style={styles.headerBadgeText}>{team.name}</Text>
        </View>
      </View>

      {/* ── Poin Balance Hero Card ── */}
      <TouchableOpacity style={styles.heroCard} onPress={onOpenRedeem} activeOpacity={0.93}>
        {/* Decorative blobs */}
        <View style={styles.heroBlob1} />
        <View style={styles.heroBlob2} />
        <View style={styles.heroBlob3} />

        <View style={styles.heroInner}>
          <View style={styles.heroLeft}>
            <View style={styles.heroKickerRow}>
              <View style={styles.heroKickerDot} />
              <Text style={styles.heroKicker}>Poin Loyalty Aktif</Text>
            </View>
            <Text style={styles.heroBalance}>{formatNumber(user.kopoinBalance)}</Text>
            <Text style={styles.heroUnit}>KoPoin</Text>
            <Text style={styles.heroSub}>Tukar kupon makan & belanja lokal</Text>
          </View>
          <View style={styles.heroRight}>
            <View style={styles.heroGiftCircle}>
              <Text style={styles.heroGiftEmoji}>🎁</Text>
            </View>
            <View style={styles.heroChevron}>
              <Text style={styles.heroChevronText}>↗</Text>
            </View>
          </View>
        </View>

        {/* Metrics strip */}
        <View style={styles.heroMetricStrip}>
          <View style={styles.heroMetricItem}>
            <Text style={styles.heroMetricVal}>{progressPercent}%</Text>
            <Text style={styles.heroMetricLbl}>Progress Tim</Text>
          </View>
          <View style={styles.heroMetricDivider} />
          <View style={styles.heroMetricItem}>
            <Text style={styles.heroMetricVal}>#1</Text>
            <Text style={styles.heroMetricLbl}>Peringkat</Text>
          </View>
          <View style={styles.heroMetricDivider} />
          <View style={styles.heroMetricItem}>
            <Text style={styles.heroMetricVal}>{remainingActions}</Text>
            <Text style={styles.heroMetricLbl}>Sisa Aksi</Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* ── Leaderboard Track Card ── */}
      <View style={styles.leaderCard}>
        <View style={styles.leaderHeader}>
          <View>
            <Text style={styles.leaderKicker}>🏆 Peringkat Keaktifan</Text>
            <Text style={styles.leaderTitle}>Posisi tim minggu ini</Text>
          </View>
          <View style={styles.leaderLivePill}>
            <Animated.View style={[styles.leaderLiveDot, { transform: [{ scale: pulseAnim }] }]} />
            <Text style={styles.leaderLiveText}>LIVE</Text>
          </View>
        </View>

        {/* Arc track */}
        <View style={styles.trackContainer}>
          <Svg height="130" width="100%" viewBox="0 0 340 130" style={StyleSheet.absoluteFillObject}>
            <Defs>
              <SvgLinearGradient id="trackGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <Stop offset="0%" stopColor="#0F6B63" stopOpacity="0.12" />
                <Stop offset="50%" stopColor="#0F6B63" stopOpacity="0.28" />
                <Stop offset="100%" stopColor="#0F6B63" stopOpacity="0.12" />
              </SvgLinearGradient>
            </Defs>
            {/* Track shadow */}
            <Path
              d="M 35,35 Q 170,120 305,35"
              fill="none"
              stroke="#E2ECE8"
              strokeWidth="10"
              strokeLinecap="round"
            />
            {/* Track fill */}
            <Path
              d="M 35,35 Q 170,120 305,35"
              fill="none"
              stroke="url(#trackGrad)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* Dashed guide */}
            <Path
              d="M 35,35 Q 170,120 305,35"
              fill="none"
              stroke="#19A88E"
              strokeWidth="1.5"
              strokeDasharray="5,7"
              strokeLinecap="round"
            />
          </Svg>

          {/* Rank #4 */}
          <View style={[styles.avatarPositioner, { left: "2%", top: 10 }]}>
            <Image
              source={{ uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60" }}
              style={styles.trackAvatarSm}
            />
            <View style={[styles.rankBadge, styles.rankBadgeGray]}>
              <Text style={styles.rankBadgeText}>4</Text>
            </View>
          </View>

          {/* Rank #2 */}
          <View style={[styles.avatarPositioner, { left: "23%", top: 38 }]}>
            <Image
              source={{ uri: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=60" }}
              style={styles.trackAvatarMd}
            />
            <View style={[styles.rankBadge, styles.rankBadgeSilver]}>
              <Text style={styles.rankBadgeText}>2</Text>
            </View>
          </View>

          {/* Rank #1 – YOU */}
          <View style={[styles.avatarPositioner, { left: "42%", top: 54 }]}>
            <View style={styles.crownWrapper}>
              <Text style={styles.crownEmoji}>👑</Text>
            </View>
            <View style={styles.avatarRing}>
              <Image
                source={{ uri: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60" }}
                style={styles.trackAvatarLg}
              />
            </View>
            <View style={[styles.rankBadge, styles.rankBadgeGold]}>
              <Text style={styles.rankBadgeText}>1</Text>
            </View>
          </View>

          {/* Rank #3 */}
          <View style={[styles.avatarPositioner, { left: "63%", top: 38 }]}>
            <Image
              source={{ uri: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=60" }}
              style={styles.trackAvatarMd}
            />
            <View style={[styles.rankBadge, styles.rankBadgeBronze]}>
              <Text style={styles.rankBadgeText}>3</Text>
            </View>
          </View>

          {/* Rank #5 */}
          <View style={[styles.avatarPositioner, { left: "84%", top: 10 }]}>
            <Image
              source={{ uri: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=60" }}
              style={styles.trackAvatarSm}
            />
            <View style={[styles.rankBadge, styles.rankBadgeGray]}>
              <Text style={styles.rankBadgeText}>5</Text>
            </View>
          </View>
        </View>

        <View style={styles.leaderFooterRow}>
          <Text style={styles.leaderFooterText}>Tim Pemuda Sukamaju memimpin minggu ini 🎉</Text>
        </View>
      </View>

      {/* ── Milestone Timeline Card ── */}
      <View style={styles.milestoneCard}>
        <View style={styles.cardHeaderRow}>
          <View>
            <Text style={styles.cardKicker}>🎯 Milestone Reward</Text>
            <Text style={styles.cardTitle}>Perjalanan benefit tim</Text>
          </View>
          <View style={styles.percentBubble}>
            <Text style={styles.percentValue}>{progressPercent}%</Text>
            <Text style={styles.percentLabel}>tercapai</Text>
          </View>
        </View>

        {/* Progress bar */}
        <View style={styles.milestoneProgressTrack}>
          <View style={[styles.milestoneProgressFill, { width: `${progressPercent}%` }]} />
          <View style={[styles.milestoneProgressThumb, { left: `${Math.min(progressPercent, 96)}%` }]} />
        </View>

        <View style={styles.milestoneList}>
          <MilestoneRow
            icon="✅"
            label="5.000 poin"
            title="Voucher Belanja"
            state="Terbuka"
            tone="done"
          />
          <View style={styles.milestoneLine} />
          <MilestoneRow
            icon="🔥"
            label="8.000 poin"
            title="Badge Tim Eksklusif"
            state="Sedang Dikejar"
            tone="current"
          />
          <View style={styles.milestoneLine} />
          <MilestoneRow
            icon="🔒"
            label="10.000 poin"
            title="Diskon UMKM Lokal"
            state="Terkunci"
            tone="locked"
          />
        </View>
      </View>

      {/* ── Mission Tasks Card ── */}
      <View style={styles.taskCard}>
        <View style={styles.cardHeaderRow}>
          <View>
            <Text style={styles.cardKicker}>⚡ Tugas Misi</Text>
            <Text style={styles.cardTitle}>Banyak cara berkontribusi</Text>
          </View>
        </View>

        <MissionTask
          icon="🛒"
          current={mission?.completed ? mission.target ?? 1 : mission?.current ?? (scanCompleted ? 1 : 0)}
          description={mission?.description ?? "Beli Kopi Sukamaju dan validasi kode transaksi."}
          points={mission?.points ?? 120}
          target={mission?.target ?? 1}
          title={mission?.title ?? "Beli produk lokal"}
          tone="live"
        />
        <MissionTask
          icon="👥"
          current={inviteMission?.current ?? 0}
          description={inviteMission?.description ?? "Undang teman sampai aktif, bukan sekadar daftar."}
          points={inviteMission?.points ?? 80}
          target={inviteMission?.target ?? 5}
          title={inviteMission?.title ?? "Ajak anggota aktif"}
          tone="soft"
        />
        <MissionTask
          icon="📍"
          current={checkinMission?.current ?? 0}
          description={checkinMission?.description ?? "Check-in mingguan di koperasi atau booth desa."}
          points={checkinMission?.points ?? 60}
          target={checkinMission?.target ?? 1}
          title={checkinMission?.title ?? "Check-in koperasi"}
          tone="soft"
        />
        <MissionTask
          icon="📚"
          current={learningMission?.completed ? learningMission.target ?? 1 : learningMission?.current ?? 0}
          description={learningMission?.description ?? "Tuntaskan modul edukasi ringan."}
          points={learningMission?.points ?? 60}
          target={learningMission?.target ?? 1}
          title={learningMission?.title ?? "Belajar koperasi 5 menit"}
          tone="soft"
        />
        <MissionTask
          icon="🗳️"
          current={voteMission?.completed || user.achievementUnlocked ? 1 : voteMission?.current ?? 0}
          description={voteMission?.description ?? "Ikut voting reward komunitas."}
          points={voteMission?.points ?? 30}
          target={voteMission?.target ?? 1}
          title={voteMission?.title ?? "Pilih reward berikutnya"}
          tone="soft"
        />
      </View>

      {/* ── Join Team Gate ── */}
      {!hasJoinedTeam ? (
        <View style={styles.joinGate}>
          <View style={styles.joinIconRow}>
            <Text style={styles.joinIcon}>🤝</Text>
          </View>
          <Text style={styles.joinTitle}>Gabung tim dulu sebelum validasi</Text>
          <Text style={styles.joinCopy}>
            KoPoin menghitung aksi pribadi sebagai kontribusi untuk progress tim kamu.
          </Text>
          <TouchableOpacity style={styles.joinButton} onPress={onJoinTeam} activeOpacity={0.85}>
            <Text style={styles.joinButtonText}>Gabung Tim Pemuda Sukamaju →</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {/* ── QR Scan Section ── */}
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

      {/* ── Impact Card ── */}
      <View style={scanCompleted ? styles.impactCardDone : styles.impactCard}>
        <View style={styles.impactHeaderRow}>
          <Text style={scanCompleted ? styles.impactKickerDone : styles.cardKicker}>
            {scanCompleted ? "✨ Dampak setelah validasi" : "💡 Dampak akan terbuka"}
          </Text>
          {scanCompleted && <View style={styles.impactSuccessPill}><Text style={styles.impactSuccessText}>Berhasil!</Text></View>}
        </View>
        {completionSummary ? (
          <View style={styles.impactGrid}>
            <ImpactStat icon="💰" label="KoPoin" value={`${formatNumber(completionSummary.balanceBefore)} → ${formatNumber(completionSummary.balanceAfter)}`} />
            <ImpactStat icon="📈" label="Progress" value={`${completionSummary.progressBefore} → ${completionSummary.progressAfter}`} />
            <ImpactStat icon="🏅" label="Peringkat" value={`#${completionSummary.rankBefore} → #${completionSummary.rankAfter}`} />
            <ImpactStat icon="🎖️" label="Badge" value={completionSummary.achievementTitle} />
          </View>
        ) : (
          <Text style={styles.cardCopy}>
            Scan kode demo untuk membuka +120 KoPoin, achievement, perubahan leaderboard, dan reward progress tim.
          </Text>
        )}
      </View>

      {/* ── Share / Community Card ── */}
      <View style={styles.shareCard}>
        <View style={styles.shareIconRow}>
          <Text style={styles.shareIconEmoji}>🚀</Text>
        </View>
        <Text style={styles.cardKicker}>Share Progress</Text>
        <Text style={styles.shareTitle}>
          {scanCompleted ? "Tim Pemuda Sukamaju naik ke #2! 🎉" : "Aksi berikutnya bisa menaikkan peringkat tim"}
        </Text>
        <Text style={styles.cardCopy}>
          {scanCompleted
            ? "Card ini siap jadi materi demo shareable untuk juri."
            : "Selesaikan validasi untuk membuka team wrap eksklusif."}
        </Text>
        <TouchableOpacity style={styles.shareButton} onPress={onOpenCommunity} activeOpacity={0.85}>
          <Text style={styles.shareButtonText}>Lihat Leaderboard & Team Wrap →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

function MilestoneRow({
  icon,
  label,
  state,
  title,
  tone,
}: {
  icon: string;
  label: string;
  state: string;
  title: string;
  tone: "done" | "current" | "locked";
}) {
  const isDone = tone === "done";
  const isCurrent = tone === "current";

  return (
    <View style={[styles.milestoneRow, isCurrent && styles.milestoneRowCurrent]}>
      <View style={[styles.milestoneIconBox, isDone && styles.milestoneIconBoxDone, isCurrent && styles.milestoneIconBoxCurrent]}>
        <Text style={styles.milestoneIcon}>{icon}</Text>
      </View>
      <View style={styles.flexOne}>
        <Text style={styles.milestoneLabel}>{label}</Text>
        <Text style={[styles.milestoneTitle, tone === "locked" && styles.milestoneTitleLocked]}>{title}</Text>
      </View>
      <View style={[styles.milestoneStatePill, isDone && styles.milestoneStatePillDone, isCurrent && styles.milestoneStatePillCurrent]}>
        <Text style={[styles.milestoneStateText, isDone && styles.milestoneStateTextDone, isCurrent && styles.milestoneStateTextCurrent]}>
          {state}
        </Text>
      </View>
    </View>
  );
}

function MissionTask({
  current,
  description,
  icon,
  points,
  target,
  title,
  tone,
}: {
  current: number;
  description: string;
  icon: string;
  points: number;
  target: number;
  title: string;
  tone: "live" | "soft";
}) {
  const percent = Math.min(Math.round((current / target) * 100), 100);
  const isComplete = current >= target;
  const isLive = tone === "live";

  return (
    <View style={[styles.taskRow, isLive && styles.taskRowLive, isComplete && styles.taskRowDone]}>
      {isComplete && (
        <View style={styles.taskCompletedBadge}>
          <Text style={styles.taskCompletedText}>✓ Selesai</Text>
        </View>
      )}
      <View style={styles.taskTopline}>
        <View style={[styles.taskIconBox, isLive && styles.taskIconBoxLive]}>
          <Text style={styles.taskIcon}>{icon}</Text>
        </View>
        <View style={styles.flexOne}>
          <View style={styles.taskTitleRow}>
            <Text style={[styles.taskTitle, isComplete && styles.taskTitleDone]} numberOfLines={1}>{title}</Text>
            {isLive && !isComplete && (
              <View style={styles.taskLivePill}>
                <Text style={styles.taskLivePillText}>AKTIF</Text>
              </View>
            )}
          </View>
          <Text style={styles.taskCopy} numberOfLines={2}>{description}</Text>
        </View>
        <View style={[styles.taskPointsBubble, isLive && styles.taskPointsBubbleLive]}>
          <Text style={[styles.taskPoints, isLive && styles.taskPointsLive]}>+{points}</Text>
          <Text style={[styles.taskPointsUnit, isLive && styles.taskPointsUnitLive]}>poin</Text>
        </View>
      </View>

      {/* Progress bar */}
      <View style={styles.taskTrack}>
        <View
          style={[
            styles.taskFill,
            isLive && styles.taskFillLive,
            isComplete && styles.taskFillDone,
            { width: `${percent}%` },
          ]}
        />
      </View>

      <View style={styles.taskFooter}>
        <Text style={styles.taskMeta}>{current}/{target} selesai</Text>
        <Text style={[styles.taskPercent, isComplete && styles.taskPercentDone]}>{percent}%</Text>
      </View>
    </View>
  );
}

function ImpactStat({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <View style={styles.impactStat}>
      <Text style={styles.impactStatIcon}>{icon}</Text>
      <Text style={styles.impactLabel}>{label}</Text>
      <Text style={styles.impactValue}>{value}</Text>
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  screen: {
    gap: spacing.md,
  },

  // ── Header ──
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  logo: {
    width: 32,
    height: 32,
  },
  headerGreeting: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: "700",
  },
  headerName: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "900",
    marginTop: 1,
  },
  headerBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 7,
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.line,
    ...shadows.card,
  },
  headerBadgeDot: {
    width: 7,
    height: 7,
    borderRadius: 999,
    backgroundColor: colors.turquoise,
  },
  headerBadgeText: {
    color: colors.teal,
    fontSize: 11,
    fontWeight: "900",
  },

  // ── Hero Card ──
  heroCard: {
    borderRadius: 28,
    padding: spacing.lg,
    backgroundColor: colors.teal,
    overflow: "hidden",
    ...shadows.card,
  },
  heroBlob1: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(255,255,255,0.06)",
    top: -80,
    right: -60,
  },
  heroBlob2: {
    position: "absolute",
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "rgba(25,168,142,0.25)",
    bottom: -50,
    left: -30,
  },
  heroBlob3: {
    position: "absolute",
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(244,180,0,0.18)",
    top: 20,
    right: 100,
  },
  heroInner: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  heroLeft: {
    flex: 1,
  },
  heroKickerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  heroKickerDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#B8E986",
  },
  heroKicker: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  heroBalance: {
    color: "#FFFFFF",
    fontSize: 44,
    fontWeight: "900",
    marginTop: 6,
    lineHeight: 50,
  },
  heroUnit: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 14,
    fontWeight: "800",
    marginTop: -2,
    letterSpacing: 1,
  },
  heroSub: {
    color: "rgba(255,255,255,0.55)",
    fontSize: 12,
    fontWeight: "700",
    marginTop: 8,
    lineHeight: 17,
    maxWidth: 200,
  },
  heroRight: {
    alignItems: "flex-end",
    gap: 10,
  },
  heroGiftCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "rgba(255,255,255,0.14)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  heroGiftEmoji: {
    fontSize: 26,
  },
  heroChevron: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.gold,
    alignItems: "center",
    justifyContent: "center",
  },
  heroChevronText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "900",
  },
  heroMetricStrip: {
    flexDirection: "row",
    marginTop: spacing.lg,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.12)",
  },
  heroMetricItem: {
    flex: 1,
    alignItems: "center",
  },
  heroMetricDivider: {
    width: 1,
    backgroundColor: "rgba(255,255,255,0.15)",
    marginVertical: 2,
  },
  heroMetricVal: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "900",
  },
  heroMetricLbl: {
    color: "rgba(255,255,255,0.55)",
    fontSize: 10,
    fontWeight: "700",
    marginTop: 2,
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },

  // ── Leaderboard Card ──
  leaderCard: {
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: spacing.md,
    borderWidth: 1.5,
    borderColor: colors.line,
    ...shadows.card,
  },
  leaderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 4,
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
  avatarPositioner: {
    position: "absolute",
    alignItems: "center",
  },
  trackAvatarSm: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 2,
    borderColor: "#E5E7EB",
  },
  trackAvatarMd: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2.5,
    borderColor: "#9CA3AF",
  },
  trackAvatarLg: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 0,
    borderColor: "transparent",
  },
  avatarRing: {
    width: 66,
    height: 66,
    borderRadius: 33,
    borderWidth: 3,
    borderColor: colors.gold,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(244,180,0,0.1)",
  },
  rankBadge: {
    position: "absolute",
    bottom: -2,
    right: -2,
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  rankBadgeGold: { backgroundColor: "#FBBF24" },
  rankBadgeSilver: { backgroundColor: "#9CA3AF" },
  rankBadgeBronze: { backgroundColor: "#D97706" },
  rankBadgeGray: { backgroundColor: "#D1D5DB" },
  rankBadgeText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "900",
    lineHeight: 11,
  },
  crownWrapper: {
    position: "absolute",
    top: -18,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 20,
  },
  crownEmoji: {
    fontSize: 18,
  },
  leaderFooterRow: {
    marginTop: 8,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.line,
    alignItems: "center",
  },
  leaderFooterText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.muted,
    textAlign: "center",
  },

  // ── Milestone Card ──
  milestoneCard: {
    borderRadius: radii.lg,
    padding: spacing.md,
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.line,
    gap: spacing.sm,
    ...shadows.card,
  },
  milestoneProgressTrack: {
    height: 10,
    borderRadius: 999,
    backgroundColor: "#F0F4F3",
    overflow: "visible",
    marginVertical: 4,
    position: "relative",
  },
  milestoneProgressFill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: colors.turquoise,
  },
  milestoneProgressThumb: {
    position: "absolute",
    top: -3,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.teal,
    borderWidth: 3,
    borderColor: "#FFFFFF",
    ...shadows.card,
    marginLeft: -8,
  },
  milestoneList: {
    gap: 0,
  },
  milestoneRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    borderRadius: radii.md,
    padding: 12,
    backgroundColor: colors.background,
  },
  milestoneRowCurrent: {
    backgroundColor: "#FFFBEB",
    borderWidth: 1,
    borderColor: "#FDE68A",
  },
  milestoneLine: {
    width: 1.5,
    height: 10,
    backgroundColor: colors.line,
    marginLeft: 22,
  },
  milestoneIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.line,
    alignItems: "center",
    justifyContent: "center",
  },
  milestoneIconBoxDone: {
    backgroundColor: "#ECFDF5",
    borderWidth: 1,
    borderColor: "#6EE7B7",
  },
  milestoneIconBoxCurrent: {
    backgroundColor: "#FFFBEB",
    borderWidth: 1,
    borderColor: "#FDE68A",
  },
  milestoneIcon: {
    fontSize: 20,
  },
  milestoneLabel: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  milestoneTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "900",
    marginTop: 2,
  },
  milestoneTitleLocked: {
    color: colors.muted,
  },
  milestoneStatePill: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.line,
  },
  milestoneStatePillDone: {
    backgroundColor: "#ECFDF5",
    borderColor: "#6EE7B7",
  },
  milestoneStatePillCurrent: {
    backgroundColor: "#FFFBEB",
    borderColor: "#FDE68A",
  },
  milestoneStateText: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: "900",
  },
  milestoneStateTextDone: {
    color: "#059669",
  },
  milestoneStateTextCurrent: {
    color: "#D97706",
  },

  // ── Task Card ──
  taskCard: {
    borderRadius: radii.lg,
    padding: spacing.md,
    gap: 10,
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.line,
    ...shadows.card,
  },
  taskRow: {
    borderRadius: radii.md,
    padding: 14,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.line,
  },
  taskRowLive: {
    backgroundColor: "#F0FDF9",
    borderWidth: 1.5,
    borderColor: colors.turquoise,
  },
  taskRowDone: {
    backgroundColor: "#F0FDF9",
    borderWidth: 1.5,
    borderColor: "#6EE7B7",
    opacity: 0.85,
  },
  taskCompletedBadge: {
    alignSelf: "flex-end",
    marginBottom: 8,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: "#ECFDF5",
    borderWidth: 1,
    borderColor: "#6EE7B7",
  },
  taskCompletedText: {
    color: "#059669",
    fontSize: 10,
    fontWeight: "900",
  },
  taskTopline: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  taskIconBox: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.line,
  },
  taskIconBoxLive: {
    backgroundColor: colors.teal,
    borderColor: colors.tealDark,
  },
  taskIcon: {
    fontSize: 20,
  },
  taskTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flexWrap: "wrap",
  },
  taskTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "900",
    flex: 1,
  },
  taskTitleDone: {
    textDecorationLine: "line-through",
    color: colors.muted,
  },
  taskLivePill: {
    borderRadius: 999,
    paddingHorizontal: 7,
    paddingVertical: 2,
    backgroundColor: colors.teal,
  },
  taskLivePillText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
  taskCopy: {
    color: colors.muted,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: "700",
    marginTop: 3,
  },
  taskPointsBubble: {
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
    minWidth: 48,
  },
  taskPointsBubbleLive: {
    backgroundColor: colors.gold,
    borderColor: "#E5A800",
  },
  taskPoints: {
    color: colors.teal,
    fontSize: 14,
    fontWeight: "900",
  },
  taskPointsLive: {
    color: "#FFFFFF",
  },
  taskPointsUnit: {
    color: colors.muted,
    fontSize: 9,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  taskPointsUnitLive: {
    color: "rgba(255,255,255,0.7)",
  },
  taskTrack: {
    height: 6,
    borderRadius: 999,
    backgroundColor: "rgba(0,0,0,0.06)",
    overflow: "hidden",
    marginTop: 12,
  },
  taskFill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: colors.lineStrong,
  },
  taskFillLive: {
    backgroundColor: colors.turquoise,
  },
  taskFillDone: {
    backgroundColor: "#34D399",
  },
  taskFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
  },
  taskMeta: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: "700",
  },
  taskPercent: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: "900",
  },
  taskPercentDone: {
    color: "#059669",
  },

  // ── Join Gate ──
  joinGate: {
    borderRadius: radii.lg,
    padding: spacing.lg,
    backgroundColor: "#FFFBEB",
    borderWidth: 1.5,
    borderColor: "#FDE68A",
    alignItems: "center",
  },
  joinIconRow: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#FEF3C7",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#FDE68A",
  },
  joinIcon: {
    fontSize: 28,
  },
  joinTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: "900",
    textAlign: "center",
  },
  joinCopy: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 20,
    fontWeight: "700",
    marginTop: 6,
    textAlign: "center",
  },
  joinButton: {
    marginTop: spacing.md,
    borderRadius: radii.md,
    paddingVertical: 15,
    paddingHorizontal: spacing.lg,
    alignItems: "center",
    backgroundColor: colors.teal,
    ...shadows.card,
  },
  joinButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "900",
  },

  // ── Impact Card ──
  impactCard: {
    borderRadius: radii.lg,
    padding: spacing.md,
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.line,
    ...shadows.card,
  },
  impactCardDone: {
    borderRadius: radii.lg,
    padding: spacing.md,
    backgroundColor: colors.teal,
    borderWidth: 0,
    ...shadows.card,
  },
  impactHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  impactKickerDone: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  impactSuccessPill: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 3,
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
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  impactStat: {
    minWidth: "47%",
    flex: 1,
    borderRadius: radii.md,
    padding: spacing.sm,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },
  impactStatIcon: {
    fontSize: 18,
    marginBottom: 4,
  },
  impactLabel: {
    color: "rgba(255,255,255,0.65)",
    fontSize: 10,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  impactValue: {
    color: colors.white,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "900",
    marginTop: 2,
  },

  // ── Share Card ──
  shareCard: {
    borderRadius: radii.lg,
    padding: spacing.md,
    backgroundColor: "#F0FDF9",
    borderWidth: 1.5,
    borderColor: "#A7F3D0",
  },
  shareIconRow: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.teal,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.tealDark,
  },
  shareIconEmoji: {
    fontSize: 24,
  },
  shareTitle: {
    color: colors.text,
    fontSize: 20,
    lineHeight: 27,
    fontWeight: "900",
    marginTop: 4,
  },
  shareButton: {
    marginTop: spacing.md,
    borderRadius: radii.md,
    paddingVertical: 15,
    alignItems: "center",
    backgroundColor: colors.teal,
    ...shadows.card,
  },
  shareButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "900",
  },

  // ── Shared ──
  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  cardKicker: {
    color: colors.teal,
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  cardTitle: {
    color: colors.text,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "900",
    marginTop: 3,
  },
  cardCopy: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 20,
    fontWeight: "700",
    marginTop: spacing.xs,
  },
  percentBubble: {
    alignItems: "center",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: colors.surfaceGold,
    borderWidth: 1,
    borderColor: "#FDE68A",
  },
  percentValue: {
    color: colors.gold,
    fontSize: 22,
    fontWeight: "900",
    lineHeight: 26,
  },
  percentLabel: {
    color: colors.muted,
    fontSize: 9,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  flexOne: {
    flex: 1,
  },
});
