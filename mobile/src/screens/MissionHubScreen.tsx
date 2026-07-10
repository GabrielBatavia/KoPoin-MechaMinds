import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import Svg, { Circle as SvgCircle, Path } from "react-native-svg";

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

  return (
    <View style={styles.screen}>
      <View style={styles.headerRow}>
        <View style={{ alignItems: "flex-start" }}>
          <Image source={require("../assets/images/logo.png")} style={styles.logo} resizeMode="contain" />
        </View>
        <View style={styles.headerBadge}>
          <Text style={styles.headerBadgeText}>{team.name}</Text>
        </View>
      </View>

      {/* Curved Ranking Track Card */}
      <View style={styles.rankingCard}>

        {/* Curved Track visualization */}
        <View style={styles.trackContainer}>
          <Svg height="130" width="100%" viewBox="0 0 340 130" style={StyleSheet.absoluteFillObject}>
            <Path
              d="M 35,35 Q 170,120 305,35"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="2"
              strokeDasharray="4,4"
            />
          </Svg>

          {/* Avatar 1 (Far-Left, Rank #4) */}
          <View style={[styles.avatarPositioner, { left: "4%", top: 15, width: 40, height: 40 }]}>
            <Image
              source={{ uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60" }}
              style={styles.trackAvatarRank4}
            />
            <View style={[styles.avatarBadge, { backgroundColor: "#E5E7EB" }]}>
              <Text style={[styles.avatarBadgeText, { color: "#4B5563" }]}>4</Text>
            </View>
          </View>

          {/* Avatar 2 (Mid-Left, Rank #2) */}
          <View style={[styles.avatarPositioner, { left: "24%", top: 44, width: 48, height: 48 }]}>
            <Image
              source={{ uri: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=60" }}
              style={styles.trackAvatarRank2}
            />
            <View style={[styles.avatarBadge, { backgroundColor: "#9CA3AF" }]}>
              <Text style={[styles.avatarBadgeText, { color: "#FFFFFF" }]}>2</Text>
            </View>
          </View>

          {/* Avatar 3 (Center, Rank #1) */}
          <View style={[styles.avatarPositioner, { left: "42.5%", top: 60, width: 58, height: 58 }]}>
            <View style={styles.crownWrapper}>
              <Text style={styles.crownEmoji}>👑</Text>
            </View>
            <Image
              source={{ uri: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60" }}
              style={[styles.trackAvatarRank1, styles.currentUserAvatar]}
            />
            <View style={[styles.avatarBadge, { backgroundColor: "#FBBF24" }]}>
              <Text style={[styles.avatarBadgeText, { color: "#FFFFFF" }]}>1</Text>
            </View>
          </View>

          {/* Avatar 4 (Mid-Right, Rank #3) */}
          <View style={[styles.avatarPositioner, { left: "64%", top: 44, width: 48, height: 48 }]}>
            <Image
              source={{ uri: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=60" }}
              style={styles.trackAvatarRank3}
            />
            <View style={[styles.avatarBadge, { backgroundColor: "#D97706" }]}>
              <Text style={[styles.avatarBadgeText, { color: "#FFFFFF" }]}>3</Text>
            </View>
          </View>

          {/* Avatar 5 (Far-Right, Rank #5) */}
          <View style={[styles.avatarPositioner, { left: "84%", top: 15, width: 40, height: 40 }]}>
            <Image
              source={{ uri: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=60" }}
              style={styles.trackAvatarRank5}
            />
            <View style={[styles.avatarBadge, { backgroundColor: "#E5E7EB" }]}>
              <Text style={[styles.avatarBadgeText, { color: "#4B5563" }]}>5</Text>
            </View>
          </View>
        </View>

        {/* Footer info text inside card */}
        <Text style={styles.rankingFooterText}>Weekly Member Peringkat Keaktifan Tim</Text>
      </View>

      <TouchableOpacity style={styles.redeemBanner} onPress={onOpenRedeem} activeOpacity={0.8}>
        <View style={styles.redeemBannerLeft}>
          <View style={styles.redeemIconCircle}>
            <Text style={styles.redeemGiftIcon}>🎁</Text>
          </View>
          <View style={styles.flexOne}>
            <Text style={styles.redeemKicker}>Poin Loyalty Kamu</Text>
            <Text style={styles.redeemTitle}>{formatNumber(user.kopoinBalance)} Poin</Text>
            <Text style={styles.redeemSubtitle}>Tukar dengan kupon diskon makan & belanja</Text>
          </View>
        </View>
        <View style={styles.redeemBannerRight}>
          <View style={styles.redeemArrowCircle}>
            <Text style={styles.redeemArrowText}>→</Text>
          </View>
        </View>
      </TouchableOpacity>

      <View style={styles.milestoneCard}>
        <View style={styles.sectionTopline}>
          <View>
            <Text style={styles.cardKicker}>Milestone reward</Text>
            <Text style={styles.cardTitle}>Perjalanan benefit tim</Text>
          </View>
          <Text style={styles.cardPercent}>{progressPercent}%</Text>
        </View>
        <Milestone label="5.000 poin" title="Voucher Belanja" state="Terbuka" tone="done" />
        <Milestone label="8.000 poin" title="Badge Tim" state="Dikejar" tone="current" />
        <Milestone label="10.000 poin" title="Diskon UMKM Lokal" state="Terkunci" tone="locked" />
      </View>

      <View style={styles.taskCard}>
        <Text style={styles.cardKicker}>Tugas misi</Text>
        <Text style={styles.cardTitle}>Banyak cara berkontribusi</Text>
        <MissionTask
          current={mission?.completed ? mission.target ?? 1 : mission?.current ?? (scanCompleted ? 1 : 0)}
          description={mission?.description ?? "Beli Kopi Sukamaju dan validasi kode transaksi."}
          points={mission?.points ?? 120}
          target={mission?.target ?? 1}
          title={mission?.title ?? "Beli produk lokal"}
          tone="live"
        />
        <MissionTask current={inviteMission?.current ?? 0} description={inviteMission?.description ?? "Undang teman sampai aktif, bukan sekadar daftar."} points={inviteMission?.points ?? 80} target={inviteMission?.target ?? 5} title={inviteMission?.title ?? "Ajak anggota aktif"} tone="soft" />
        <MissionTask current={checkinMission?.current ?? 0} description={checkinMission?.description ?? "Check-in mingguan di koperasi atau booth desa."} points={checkinMission?.points ?? 60} target={checkinMission?.target ?? 1} title={checkinMission?.title ?? "Check-in koperasi"} tone="soft" />
        <MissionTask current={learningMission?.completed ? learningMission.target ?? 1 : learningMission?.current ?? 0} description={learningMission?.description ?? "Tuntaskan modul edukasi ringan."} points={learningMission?.points ?? 60} target={learningMission?.target ?? 1} title={learningMission?.title ?? "Belajar koperasi 5 menit"} tone="soft" />
        <MissionTask current={voteMission?.completed || user.achievementUnlocked ? 1 : voteMission?.current ?? 0} description={voteMission?.description ?? "Ikut voting reward komunitas."} points={voteMission?.points ?? 30} target={voteMission?.target ?? 1} title={voteMission?.title ?? "Pilih reward berikutnya"} tone="soft" />
      </View>

      {!hasJoinedTeam ? (
        <View style={styles.joinGate}>
          <Text style={styles.joinTitle}>Gabung tim dulu sebelum validasi</Text>
          <Text style={styles.joinCopy}>Kopoin menghitung aksi pribadi sebagai kontribusi untuk progress tim.</Text>
          <TouchableOpacity style={styles.joinButton} onPress={onJoinTeam}>
            <Text style={styles.joinButtonText}>Gabung Tim Pemuda Sukamaju</Text>
          </TouchableOpacity>
        </View>
      ) : null}

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

      <View style={scanCompleted ? styles.impactCardDone : styles.impactCard}>
        <Text style={scanCompleted ? styles.impactKickerDone : styles.cardKicker}>{scanCompleted ? "Dampak setelah validasi" : "Dampak akan terbuka"}</Text>
        {completionSummary ? (
          <View style={styles.impactGrid}>
            <ImpactStat label="Kopoin" value={`${formatNumber(completionSummary.balanceBefore)} -> ${formatNumber(completionSummary.balanceAfter)}`} />
            <ImpactStat label="Progress" value={`${completionSummary.progressBefore} -> ${completionSummary.progressAfter}`} />
            <ImpactStat label="Rank" value={`#${completionSummary.rankBefore} -> #${completionSummary.rankAfter}`} />
            <ImpactStat label="Badge" value={completionSummary.achievementTitle} />
          </View>
        ) : (
          <Text style={styles.cardCopy}>Scan kode demo untuk membuka +120 Kopoin, achievement, perubahan leaderboard, dan reward progress.</Text>
        )}
      </View>

      <View style={styles.shareCard}>
        <Text style={styles.cardKicker}>Share progress</Text>
        <Text style={styles.shareTitle}>{scanCompleted ? "Tim Pemuda Sukamaju naik ke #2" : "Aksi berikutnya bisa menaikkan peringkat tim"}</Text>
        <Text style={styles.cardCopy}>{scanCompleted ? "Card ini siap jadi materi demo shareable untuk juri." : "Selesaikan validasi untuk membuka team wrap."}</Text>
        <TouchableOpacity style={styles.shareButton} onPress={onOpenCommunity}>
          <Text style={styles.shareButtonText}>Lihat Leaderboard & Team Wrap</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function HeroMetric({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.heroMetric}>
      <Text style={styles.heroMetricLabel}>{label}</Text>
      <Text style={styles.heroMetricValue}>{value}</Text>
    </View>
  );
}

function Milestone({ label, state, title, tone }: { label: string; state: string; title: string; tone: "done" | "current" | "locked" }) {
  return (
    <View style={styles.milestoneRow}>
      <View style={[styles.milestoneDot, milestoneToneStyles[tone]]} />
      <View style={styles.flexOne}>
        <Text style={styles.milestoneLabel}>{label}</Text>
        <Text style={styles.milestoneTitle}>{title}</Text>
      </View>
      <Text style={tone === "locked" ? styles.milestoneStateLocked : styles.milestoneState}>{state}</Text>
    </View>
  );
}

function MissionTask({ current, description, points, target, title, tone }: { current: number; description: string; points: number; target: number; title: string; tone: "live" | "soft" }) {
  const percent = Math.round((current / target) * 100);

  return (
    <View style={tone === "live" ? styles.taskRowLive : styles.taskRow}>
      <View style={styles.taskTopline}>
        <View style={styles.flexOne}>
          <Text style={styles.taskTitle}>{title}</Text>
          <Text style={styles.taskCopy}>{description}</Text>
        </View>
        <Text style={styles.taskReward}>+{points}</Text>
      </View>
      <View style={styles.taskTrack}>
        <View style={[styles.taskFill, { width: `${percent}%` }]} />
      </View>
      <Text style={styles.taskMeta}>{current}/{target} selesai</Text>
    </View>
  );
}

function ImpactStat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.impactStat}>
      <Text style={styles.impactLabel}>{label}</Text>
      <Text style={styles.impactValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    gap: spacing.md
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md
  },
  logo: {
    width: 30,
    height: 30,
    marginBottom: 10,
    alignSelf: "flex-start"
  },
  headerMeta: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "900",
    marginTop: -3
  },
  headerBadge: {
    flexShrink: 1,
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line
  },
  headerBadgeText: {
    color: colors.teal,
    fontSize: 12,
    fontWeight: "900"
  },
  heroCard: {
    position: "relative",
    overflow: "hidden",
    borderRadius: 34,
    padding: spacing.lg,
    backgroundColor: colors.surfaceGold,
    borderWidth: 1,
    borderColor: "#F1D98D",
    ...shadows.card
  },
  rewardOrb: {
    position: "absolute",
    right: -62,
    top: -72,
    width: 220,
    height: 220,
    borderRadius: 150,
    backgroundColor: "rgba(244,180,0,0.22)"
  },
  badgeGold: {
    alignSelf: "flex-start",
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: "#F1D98D"
  },
  badgeGoldText: {
    color: colors.tealDark,
    fontSize: 12,
    fontWeight: "900"
  },
  heroTitle: {
    color: colors.text,
    fontSize: 32,
    lineHeight: 38,
    fontWeight: "900",
    marginTop: spacing.md,
    maxWidth: 270
  },
  heroCopy: {
    color: colors.slate,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "800",
    marginTop: spacing.sm,
    maxWidth: 290
  },
  heroMetricRow: {
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.lg
  },
  heroMetric: {
    flex: 1,
    borderRadius: radii.md,
    padding: spacing.sm,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: "#F1D98D"
  },
  heroMetricLabel: {
    color: colors.muted,
    fontSize: 10,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  heroMetricValue: {
    color: colors.teal,
    fontSize: 18,
    fontWeight: "900",
    marginTop: 2
  },
  progressTrack: {
    height: 11,
    borderRadius: 999,
    backgroundColor: colors.white,
    overflow: "hidden",
    marginTop: spacing.md
  },
  progressFill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: colors.teal
  },
  progressCopy: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 19,
    fontWeight: "800",
    marginTop: spacing.sm
  },
  milestoneCard: {
    borderRadius: radii.lg,
    padding: spacing.md,
    gap: spacing.sm,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line
  },
  sectionTopline: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.md,
    marginBottom: spacing.xs
  },
  cardKicker: {
    color: colors.teal,
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  cardTitle: {
    color: colors.text,
    fontSize: 19,
    lineHeight: 25,
    fontWeight: "900",
    marginTop: 3
  },
  cardPercent: {
    color: colors.gold,
    fontSize: 30,
    fontWeight: "900"
  },
  milestoneRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    borderRadius: radii.md,
    padding: spacing.md,
    backgroundColor: colors.background
  },
  milestoneDot: {
    width: 18,
    height: 18,
    borderRadius: 999
  },
  milestoneLabel: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: "900"
  },
  milestoneTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "900",
    marginTop: 2
  },
  milestoneState: {
    color: colors.teal,
    fontSize: 12,
    fontWeight: "900"
  },
  milestoneStateLocked: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "900"
  },
  taskCard: {
    borderRadius: radii.lg,
    padding: spacing.md,
    gap: spacing.sm,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line
  },
  taskRowLive: {
    borderRadius: radii.md,
    padding: spacing.md,
    backgroundColor: colors.surfaceMint,
    borderWidth: 1,
    borderColor: colors.line
  },
  taskRow: {
    borderRadius: radii.md,
    padding: spacing.md,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.line
  },
  taskTopline: {
    flexDirection: "row",
    gap: spacing.md
  },
  taskTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "900"
  },
  taskCopy: {
    color: colors.muted,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "800",
    marginTop: 2
  },
  taskReward: {
    color: colors.teal,
    fontSize: 14,
    fontWeight: "900"
  },
  taskTrack: {
    height: 8,
    borderRadius: 999,
    backgroundColor: colors.white,
    overflow: "hidden",
    marginTop: spacing.sm
  },
  taskFill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: colors.turquoise
  },
  taskMeta: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: "900",
    marginTop: spacing.xs
  },
  joinGate: {
    borderRadius: radii.lg,
    padding: spacing.md,
    backgroundColor: colors.surfaceGold,
    borderWidth: 1,
    borderColor: "#F1D98D"
  },
  joinTitle: {
    color: colors.tealDark,
    fontSize: 18,
    fontWeight: "900"
  },
  joinCopy: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 20,
    fontWeight: "800",
    marginTop: 4
  },
  joinButton: {
    marginTop: spacing.md,
    borderRadius: radii.md,
    paddingVertical: 14,
    alignItems: "center",
    backgroundColor: colors.teal
  },
  joinButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "900"
  },
  impactCard: {
    borderRadius: radii.lg,
    padding: spacing.md,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line
  },
  impactCardDone: {
    borderRadius: radii.lg,
    padding: spacing.md,
    backgroundColor: colors.teal,
    borderWidth: 1,
    borderColor: colors.turquoise
  },
  impactKickerDone: {
    color: "#D8FFF5",
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  impactGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    marginTop: spacing.md
  },
  impactStat: {
    minWidth: "47%",
    flex: 1,
    borderRadius: radii.md,
    padding: spacing.md,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.16)"
  },
  impactLabel: {
    color: "#D8FFF5",
    fontSize: 11,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  impactValue: {
    color: colors.white,
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "900",
    marginTop: 3
  },
  cardCopy: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 20,
    fontWeight: "800",
    marginTop: spacing.xs
  },
  shareCard: {
    borderRadius: radii.lg,
    padding: spacing.md,
    backgroundColor: colors.surfaceMint,
    borderWidth: 1,
    borderColor: colors.line
  },
  shareTitle: {
    color: colors.text,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "900",
    marginTop: 4
  },
  shareButton: {
    marginTop: spacing.md,
    borderRadius: radii.md,
    paddingVertical: 14,
    alignItems: "center",
    backgroundColor: colors.teal
  },
  shareButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "900"
  },
  flexOne: {
    flex: 1
  },
  redeemBanner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: radii.lg,
    padding: spacing.md,
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.line,
    ...shadows.card
  },
  redeemBannerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    flex: 1
  },
  redeemIconCircle: {
    width: 44,
    height: 44,
    borderRadius: radii.sm,
    backgroundColor: "#FFF6DA",
    alignItems: "center",
    justifyContent: "center"
  },
  redeemGiftIcon: {
    fontSize: 22
  },
  redeemKicker: {
    color: colors.muted,
    fontSize: 10,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  redeemTitle: {
    color: colors.teal,
    fontSize: 20,
    fontWeight: "900",
    marginTop: 1
  },
  redeemSubtitle: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: "700",
    marginTop: 2
  },
  redeemBannerRight: {
    justifyContent: "center",
    alignItems: "center"
  },
  redeemArrowCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surfaceMint,
    alignItems: "center",
    justifyContent: "center"
  },
  redeemArrowText: {
    color: colors.teal,
    fontSize: 15,
    fontWeight: "900"
  },
  rankingCard: {
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: 16,
    borderWidth: 1.5,
    borderColor: "#F3F4F6",
    position: "relative",
    overflow: "hidden",
    ...shadows.card,
    alignItems: "center"
  },
  rankingTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: colors.text,
    textAlign: "center"
  },
  statusBadgeRow: {
    flexDirection: "row",
    gap: 6,
    justifyContent: "center",
    marginTop: 6,
    marginBottom: 12
  },
  statusIndicatorCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  statusIndicatorText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "900"
  },
  trackContainer: {
    height: 140,
    width: "100%",
    position: "relative",
    marginTop: 8
  },
  avatarPositioner: {
    position: "absolute",
    width: 44,
    height: 44
  },
  trackAvatarRank1: {
    width: 58,
    height: 58,
    borderRadius: 29,
    borderWidth: 3,
    borderColor: "#FBBF24"
  },
  trackAvatarRank2: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2.5,
    borderColor: "#9CA3AF"
  },
  trackAvatarRank3: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2.5,
    borderColor: "#D97706"
  },
  trackAvatarRank4: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "#FFFFFF"
  },
  trackAvatarRank5: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "#FFFFFF"
  },
  crownWrapper: {
    position: "absolute",
    top: -18,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 20
  },
  crownEmoji: {
    fontSize: 16
  },
  currentUserAvatar: {
    borderColor: "#8B5CF6",
    borderWidth: 2.5
  },
  avatarBadge: {
    position: "absolute",
    bottom: -2,
    right: -2,
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#FFFFFF"
  },
  avatarBadgeText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "900",
    lineHeight: 11
  },
  rankingFooterText: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.muted,
    marginTop: 12,
    textAlign: "center"
  }
});

const milestoneToneStyles = StyleSheet.create({
  done: {
    backgroundColor: colors.teal
  },
  current: {
    backgroundColor: colors.gold
  },
  locked: {
    backgroundColor: colors.lineStrong
  }
});
