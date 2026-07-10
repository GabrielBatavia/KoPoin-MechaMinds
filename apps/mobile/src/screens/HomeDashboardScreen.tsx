import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import type { Campaign, CompletionSummary, Cooperative, Team, User, UserVote } from "../data/kopoinSeed";
import { colors, radii, shadows, spacing } from "../theme";
import { formatKopoin, formatRupiah } from "../utils/formatters";

type HomeDashboardScreenProps = {
  campaign: Campaign;
  completionSummary: CompletionSummary | null;
  cooperative: Cooperative;
  hasJoinedTeam: boolean;
  onJoinTeam: () => void;
  onOpenCommunity: () => void;
  onOpenMission: () => void;
  onOpenProfile: () => void;
  rank: number;
  scanCompleted: boolean;
  team: Team;
  user: User;
  userVote: UserVote | null;
};

export function HomeDashboardScreen({
  campaign,
  completionSummary,
  cooperative,
  hasJoinedTeam,
  onJoinTeam,
  onOpenCommunity,
  onOpenMission,
  onOpenProfile,
  rank,
  scanCompleted,
  team,
  user,
  userVote
}: HomeDashboardScreenProps) {
  const progressPercent = Math.round((campaign.currentValue / campaign.targetValue) * 100);
  const remainingActions = campaign.targetValue - campaign.currentValue;
  const primaryAction = !hasJoinedTeam ? onJoinTeam : scanCompleted ? onOpenCommunity : onOpenMission;
  const primaryLabel = !hasJoinedTeam ? "Gabung Tim" : scanCompleted ? "Lihat Dampak" : "Ikut Misi";
  const impactCopy = completionSummary
    ? `Pembelianmu membantu progress tim naik ke ${completionSummary.progressAfter}% dan mendukung 2 UMKM lokal.`
    : "Aksi berikutnya membantu target Kopi Sukamaju mendekati 100 aksi.";

  return (
    <View style={styles.screen}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.logo}>kopoin</Text>
          <Text style={styles.headerMeta}>Selamat datang, {user.name}</Text>
        </View>
        <View style={styles.headerBadge}>
          <Text style={styles.headerBadgeText}>Level {user.level}</Text>
        </View>
      </View>

      <View style={styles.heroCard}>
        <View style={styles.heroOrb} />
        <View style={styles.heroTopline}>
          <View style={styles.badgeMint}>
            <Text style={styles.badgeMintText}>Misi Tim Aktif</Text>
          </View>
          <Text style={styles.heroPercent}>{progressPercent}%</Text>
        </View>
        <Text style={styles.heroTitle}>Gerakan Belanja Lokal</Text>
        <Text style={styles.heroCopy}>Tim Pemuda Sukamaju mengejar 100 aksi untuk membuka reward bersama.</Text>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
        </View>
        <Text style={styles.progressCopy}>{campaign.currentValue}/{campaign.targetValue} aksi selesai. {remainingActions} aksi menuju {campaign.rewardTitle}.</Text>
        <View style={styles.illustrationSlot}>
          <View style={styles.storeRoof} />
          <View style={styles.storeBody}>
            <Text style={styles.storeText}>UMKM</Text>
          </View>
          <View style={styles.coinOne} />
          <View style={styles.coinTwo} />
        </View>
        <View style={styles.heroActions}>
          <TouchableOpacity style={styles.primaryButton} onPress={primaryAction}>
            <Text style={styles.primaryButtonText}>{primaryLabel}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton} onPress={onOpenProfile}>
            <Text style={styles.secondaryButtonText}>Lihat Benefit</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.statGrid}>
        <MiniStat label="Kopoin" value={formatKopoin(user.kopoinBalance)} tone="teal" />
        <MiniStat label="Streak" value="3 minggu" tone="mint" />
        <MiniStat label="Hemat" value={formatRupiah(user.monthlySaving)} tone="gold" />
        <MiniStat label="Rank tim" value={`#${rank}`} tone="white" />
      </View>

      <View style={styles.teamCard}>
        <View style={styles.cardTopline}>
          <View>
            <Text style={styles.cardKicker}>Tim kamu</Text>
            <Text style={styles.cardTitle}>{team.name}</Text>
          </View>
          <Text style={styles.rankBubble}>#{rank}</Text>
        </View>
        <Text style={styles.cardCopy}>
          {scanCompleted
            ? `Aksi ${user.name} masuk ke skor tim. Tim naik dan makin dekat ke reward bersama.`
            : `${team.members} anggota, ${team.activeMembers} aktif minggu ini di ${cooperative.location}.`}
        </Text>
        <TouchableOpacity style={styles.textButton} onPress={onOpenCommunity}>
          <Text style={styles.textButtonText}>Lihat Komunitas</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.couponCard}>
        <View style={styles.couponIcon}>
          <Text style={styles.couponIconText}>10%</Text>
        </View>
        <View style={styles.flexOne}>
          <Text style={styles.cardKicker}>Kupon aktif</Text>
          <Text style={styles.cardTitle}>Voucher Kopi Sukamaju</Text>
          <Text style={styles.cardCopy}>2 hari lagi. Hemat bulan ini {formatRupiah(user.monthlySaving)}.</Text>
        </View>
      </View>

      <View style={styles.impactCard}>
        <Text style={styles.cardKicker}>Impact receipt</Text>
        <Text style={styles.impactTitle}>{scanCompleted ? "+120 Kopoin masuk" : "Aksi berikutnya punya dampak"}</Text>
        <Text style={styles.cardCopy}>{impactCopy}</Text>
      </View>

      <View style={styles.teaserCard}>
        <Text style={styles.cardKicker}>{userVote ? "Voting tersimpan" : "Suara komunitas"}</Text>
        <Text style={styles.cardTitle}>{userVote ? userVote.optionLabel : "Pilih reward komunitas berikutnya"}</Text>
        <Text style={styles.cardCopy}>{userVote ? "Pilihanmu ikut membentuk campaign berikutnya." : "Voting aktif membuat anggota muda ikut menentukan reward bersama."}</Text>
      </View>
    </View>
  );
}

function MiniStat({ label, tone, value }: { label: string; tone: "teal" | "gold" | "mint" | "white"; value: string }) {
  return (
    <View style={[styles.statCard, statToneStyles[tone]]}>
      <Text style={tone === "teal" ? styles.statLabelDark : styles.statLabel}>{label}</Text>
      <Text style={tone === "teal" ? styles.statValueDark : styles.statValue}>{value}</Text>
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
    justifyContent: "space-between"
  },
  logo: {
    color: colors.teal,
    fontSize: 34,
    fontWeight: "900",
    letterSpacing: -1.5
  },
  headerMeta: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "800",
    marginTop: -3
  },
  headerBadge: {
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surfaceMint,
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
    backgroundColor: colors.surfaceMint,
    borderWidth: 1,
    borderColor: colors.line,
    ...shadows.card
  },
  heroOrb: {
    position: "absolute",
    right: -70,
    top: -58,
    width: 210,
    height: 210,
    borderRadius: 140,
    backgroundColor: "#D9F8EF"
  },
  heroTopline: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  badgeMint: {
    alignSelf: "flex-start",
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line
  },
  badgeMintText: {
    color: colors.teal,
    fontSize: 12,
    fontWeight: "900"
  },
  heroPercent: {
    color: colors.gold,
    fontSize: 34,
    fontWeight: "900"
  },
  heroTitle: {
    color: colors.text,
    fontSize: 32,
    lineHeight: 38,
    fontWeight: "900",
    marginTop: spacing.md,
    maxWidth: 250
  },
  heroCopy: {
    color: colors.slate,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "800",
    marginTop: spacing.sm,
    maxWidth: 270
  },
  progressTrack: {
    height: 11,
    borderRadius: 999,
    backgroundColor: colors.white,
    overflow: "hidden",
    marginTop: spacing.lg
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
    marginTop: spacing.sm,
    maxWidth: 290
  },
  illustrationSlot: {
    position: "absolute",
    right: spacing.lg,
    bottom: 92,
    width: 104,
    height: 92
  },
  storeRoof: {
    width: 90,
    height: 28,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    backgroundColor: colors.gold,
    transform: [{ rotate: "-4deg" }]
  },
  storeBody: {
    width: 94,
    height: 52,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
    marginTop: -3
  },
  storeText: {
    color: colors.teal,
    fontSize: 13,
    fontWeight: "900"
  },
  coinOne: {
    position: "absolute",
    right: 0,
    top: 4,
    width: 28,
    height: 28,
    borderRadius: 999,
    backgroundColor: colors.gold,
    borderWidth: 3,
    borderColor: colors.white
  },
  coinTwo: {
    position: "absolute",
    right: 12,
    bottom: 0,
    width: 20,
    height: 20,
    borderRadius: 999,
    backgroundColor: colors.turquoise,
    borderWidth: 3,
    borderColor: colors.white
  },
  heroActions: {
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.lg
  },
  primaryButton: {
    flex: 1,
    borderRadius: radii.md,
    paddingVertical: 15,
    alignItems: "center",
    backgroundColor: colors.teal
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "900"
  },
  secondaryButton: {
    flex: 1,
    borderRadius: radii.md,
    paddingVertical: 15,
    alignItems: "center",
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line
  },
  secondaryButtonText: {
    color: colors.teal,
    fontSize: 14,
    fontWeight: "900"
  },
  statGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm
  },
  statCard: {
    minWidth: "47%",
    flex: 1,
    borderRadius: radii.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.line
  },
  statLabel: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  statLabelDark: {
    color: "#D8FFF5",
    fontSize: 11,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  statValue: {
    color: colors.text,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "900",
    marginTop: 4
  },
  statValueDark: {
    color: colors.white,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "900",
    marginTop: 4
  },
  teamCard: {
    borderRadius: radii.lg,
    padding: spacing.md,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
    ...shadows.card
  },
  cardTopline: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.md
  },
  cardKicker: {
    color: colors.teal,
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  cardTitle: {
    color: colors.text,
    fontSize: 18,
    lineHeight: 24,
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
  rankBubble: {
    color: colors.teal,
    fontSize: 28,
    fontWeight: "900"
  },
  textButton: {
    alignSelf: "flex-start",
    marginTop: spacing.md,
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surfaceMint
  },
  textButtonText: {
    color: colors.teal,
    fontSize: 13,
    fontWeight: "900"
  },
  couponCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    borderRadius: radii.lg,
    padding: spacing.md,
    backgroundColor: colors.surfaceGold,
    borderWidth: 1,
    borderColor: "#F1D98D"
  },
  couponIcon: {
    width: 58,
    height: 58,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.gold
  },
  couponIconText: {
    color: colors.tealDark,
    fontSize: 18,
    fontWeight: "900"
  },
  flexOne: {
    flex: 1
  },
  impactCard: {
    borderRadius: radii.lg,
    padding: spacing.md,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line
  },
  impactTitle: {
    color: colors.text,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "900",
    marginTop: 4
  },
  teaserCard: {
    borderRadius: radii.lg,
    padding: spacing.md,
    backgroundColor: colors.surfaceMint,
    borderWidth: 1,
    borderColor: colors.line
  }
});

const statToneStyles = StyleSheet.create({
  teal: {
    backgroundColor: colors.teal,
    borderColor: colors.teal
  },
  gold: {
    backgroundColor: colors.surfaceGold,
    borderColor: "#F1D98D"
  },
  mint: {
    backgroundColor: colors.surfaceMint,
    borderColor: colors.line
  },
  white: {
    backgroundColor: colors.white,
    borderColor: colors.line
  }
});
