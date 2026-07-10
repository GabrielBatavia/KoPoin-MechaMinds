import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

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

  return (
    <View style={styles.screen}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.logo}>kopoin</Text>
          <Text style={styles.headerMeta}>Misi & Reward</Text>
        </View>
        <View style={styles.headerBadge}>
          <Text style={styles.headerBadgeText}>{team.name}</Text>
        </View>
      </View>

      <View style={styles.heroCard}>
        <View style={styles.rewardOrb} />
        <View style={styles.badgeGold}>
          <Text style={styles.badgeGoldText}>Reward Bersama</Text>
        </View>
        <Text style={styles.heroTitle}>Buka Kupon Produk Lokal</Text>
        <Text style={styles.heroCopy}>Setiap aksi anggota menambah progress Tim Pemuda Sukamaju menuju benefit bersama.</Text>
        <View style={styles.heroMetricRow}>
          <HeroMetric label="Progress" value={`${campaign.currentValue}/${campaign.targetValue}`} />
          <HeroMetric label="Aksi lagi" value={`${remainingActions}`} />
          <HeroMetric label="Anggota" value="34" />
        </View>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
        </View>
        <Text style={styles.progressCopy}>{progressPercent}% selesai. {campaign.deadlineLabel.replace("Berakhir ", "")} jadi batas campaign demo.</Text>
      </View>

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
          current={scanCompleted ? 9 : 8}
          description={mission?.description ?? "Beli Kopi Sukamaju dan validasi kode transaksi."}
          points={mission?.points ?? 120}
          target={10}
          title="Beli produk lokal"
          tone="live"
        />
        <MissionTask current={3} description="Undang teman sampai aktif, bukan sekadar daftar." points={80} target={5} title="Ajak anggota aktif" tone="soft" />
        <MissionTask current={5} description="Check-in mingguan di koperasi atau booth desa." points={60} target={7} title="Check-in koperasi" tone="soft" />
        <MissionTask current={2} description={learningMission?.description ?? "Tuntaskan modul edukasi ringan."} points={learningMission?.points ?? 60} target={4} title="Belajar koperasi 5 menit" tone="soft" />
        <MissionTask current={user.achievementUnlocked ? 1 : 0} description={voteMission?.description ?? "Ikut voting reward komunitas."} points={voteMission?.points ?? 30} target={1} title="Pilih reward berikutnya" tone="soft" />
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
    fontFamily: "Geist_900Black",
    color: colors.teal,
    fontSize: 32,
    letterSpacing: -1.4
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
