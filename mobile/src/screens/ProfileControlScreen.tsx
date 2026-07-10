import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";

import type { CompletionSummary, Cooperative, Team, User, UserVote } from "../data/kopoinSeed";
import { colors, radii, shadows, spacing } from "../theme";
import { formatKopoin, formatRupiah } from "../utils/formatters";

type ProfileControlScreenProps = {
  completionSummary: CompletionSummary | null;
  cooperative: Cooperative;
  hasJoinedTeam: boolean;
  onReplayWizard: () => void;
  onResetDemo: () => void;
  persisted: boolean;
  scanCompleted: boolean;
  team: Team;
  user: User;
  userVote: UserVote | null;
  redeemedCoupons: string[];
};

export function ProfileControlScreen({
  completionSummary,
  cooperative,
  hasJoinedTeam,
  onReplayWizard,
  onResetDemo,
  persisted,
  scanCompleted,
  team,
  user,
  userVote,
  redeemedCoupons
}: ProfileControlScreenProps) {
  return (
    <View style={styles.screen}>
      <View style={styles.headerRow}>
        <View style={{ alignItems: "flex-start" }}>
          <Image source={require("../assets/images/logo.png")} style={styles.logo} resizeMode="contain" />
        </View>
        <View style={styles.memberBadge}>
          <Text style={styles.memberBadgeText}>{user.status}</Text>
        </View>
      </View>

      <View style={styles.walletHero}>
        <View style={styles.walletOrb} />
        <Text style={styles.walletKicker}>Benefit {user.name || "Tamu"}</Text>
        <Text style={styles.walletBalance}>{formatKopoin(user.kopoinBalance)}</Text>
        <Text style={styles.walletCopy}>Poin reward, kupon, dan penghematan dari aktivitas komunitas. Bukan saldo uang.</Text>
        <View style={styles.walletStats}>
          <WalletStat label="Hemat bulan ini" value={formatRupiah(user.monthlySaving)} />
          <WalletStat label="Level" value={`Level ${user.level}`} />
          <WalletStat label="Streak" value="3 minggu" />
        </View>
      </View>

      <View style={styles.couponCard}>
        <View style={styles.couponIcon}>
          <Text style={styles.couponIconText}>10%</Text>
        </View>
        <View style={styles.flexOne}>
          <Text style={styles.cardKicker}>Kupon aktif</Text>
          <Text style={styles.cardTitle}>Voucher Kopi Sukamaju</Text>
          <Text style={styles.cardCopy}>2 hari lagi. Estimasi hemat Rp12.000.</Text>
        </View>
      </View>

      {redeemedCoupons.map((couponId, index) => {
        const coupon = COUPON_DETAILS[couponId];
        if (!coupon) return null;
        return (
          <View key={`${couponId}-${index}`} style={styles.couponCard}>
            <View style={styles.couponIconCircle}>
              <Text style={styles.couponIconEmoji}>{coupon.emoji}</Text>
            </View>
            <View style={styles.flexOne}>
              <Text style={styles.cardKicker}>Kupon Aktif (Loyalty)</Text>
              <Text style={styles.cardTitle}>{coupon.title}</Text>
              <Text style={styles.cardCopy}>Berhasil ditukar! Tunjukkan ke kasir Eat & Go.</Text>
            </View>
          </View>
        );
      })}

      <View style={styles.savingsGrid}>
        <BenefitStat label="Hemat bulan ini" value={formatRupiah(user.monthlySaving)} />
        <BenefitStat label="Hemat sejak gabung" value={formatRupiah(184000)} />
        <BenefitStat label="Reward dipakai" value="4" />
        <BenefitStat label="Voting" value={userVote ? "Sudah ikut" : "Belum ikut"} />
      </View>

      <View style={styles.rewardCard}>
        <Text style={styles.cardKicker}>Reward progress</Text>
        <Text style={styles.cardTitle}>Benefit yang dibuka tim</Text>
        <RewardRow state="Terbuka" title="Voucher Belanja" tone="done" />
        <RewardRow state="Dikejar" title="Badge Tim" tone="current" />
        <RewardRow state="Terkunci" title="Diskon UMKM Lokal" tone="locked" />
      </View>

      <View style={styles.achievementCard}>
        <Text style={styles.cardKicker}>Achievement & streak</Text>
        <Text style={styles.achievementTitle}>{user.achievementUnlocked ? "Anak Lokal, Selera Global" : "Achievement hampir terbuka"}</Text>
        <Text style={styles.cardCopy}>
          {user.achievementUnlocked
            ? `Terbuka setelah validasi ${completionSummary?.productName ?? "produk lokal"}. Siap dibagikan sebagai pencapaian tim.`
            : `Validasi produk lokal untuk membuka achievement pertama ${user.name || "Tamu"}.`}
        </Text>
        <View style={styles.streakBox}>
          <Text style={styles.streakTitle}>{user.streakLabel}</Text>
          <Text style={styles.streakCopy}>Streak bisa dijaga lewat voting atau belajar, bukan belanja saja.</Text>
        </View>
      </View>

      <View style={styles.referralCard}>
        <Text style={styles.cardKicker}>Referral aktif</Text>
        <Text style={styles.cardTitle}>3 teman diajak</Text>
        <Text style={styles.cardCopy}>2 sudah onboarding. 1 menunggu transaksi pertama. Reward referral terbuka setelah temanmu aktif.</Text>
      </View>

      <View style={styles.memberCard}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarText}>{user.name ? user.name.charAt(0).toUpperCase() : "T"}</Text>
        </View>
        <View style={styles.flexOne}>
          <Text style={styles.memberName}>{user.name}</Text>
          <Text style={styles.memberMeta}>{user.memberNo}</Text>
          <Text style={styles.memberMeta}>{cooperative.name} - {cooperative.location}</Text>
          <Text style={styles.memberTeam}>{hasJoinedTeam ? team.name : "Belum bergabung ke tim"}</Text>
        </View>
      </View>

      <View style={styles.controlCard}>
        <Text style={styles.controlTitle}>Kontrol demo</Text>
        <Text style={styles.controlCopy}>State lokal {persisted ? "tersimpan" : "memuat"}. Reset mengulang flow dari progress 73/100, saldo 1.730, rank #3.</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.primaryButton} onPress={onResetDemo}>
            <Text style={styles.primaryButtonText}>Reset Demo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton} onPress={onReplayWizard}>
            <Text style={styles.secondaryButtonText}>Replay Wizard</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.limitNote}>{scanCompleted ? "Misi sudah tercatat. Duplicate guard tetap aktif." : "Kopoin bukan dompet digital dan tidak menyimpan dana."}</Text>
      </View>
    </View>
  );
}

function WalletStat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.walletStat}>
      <Text style={styles.walletStatLabel}>{label}</Text>
      <Text style={styles.walletStatValue}>{value}</Text>
    </View>
  );
}

function BenefitStat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.benefitStat}>
      <Text style={styles.benefitLabel}>{label}</Text>
      <Text style={styles.benefitValue}>{value}</Text>
    </View>
  );
}

function RewardRow({ state, title, tone }: { state: string; title: string; tone: "done" | "current" | "locked" }) {
  return (
    <View style={styles.rewardRow}>
      <View style={[styles.rewardDot, rewardToneStyles[tone]]} />
      <Text style={styles.rewardTitle}>{title}</Text>
      <Text style={tone === "locked" ? styles.rewardStateLocked : styles.rewardState}>{state}</Text>
    </View>
  );
}

const COUPON_DETAILS: Record<string, { title: string; emoji: string }> = {
  coupon_happy_a_idm: {
    title: "Tebus Murah Paket Happy A - Eat And Go IDM",
    emoji: "🍱"
  },
  coupon_happy_a: {
    title: "Tebus Murah Paket Happy A - Eat And Go",
    emoji: "🍛"
  },
  coupon_happy_b: {
    title: "Tebus Murah Paket Happy B - Eat And Go",
    emoji: "🍚"
  },
  coupon_happy_b_idm: {
    title: "Tebus Murah Paket Happy B - Eat And Go IDM",
    emoji: "🍲"
  }
};

const styles = StyleSheet.create({
  screen: {
    gap: spacing.md
  },
  couponIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EAFBF7"
  },
  couponIconEmoji: {
    fontSize: 32
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
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
  memberBadge: {
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surfaceMint,
    borderWidth: 1,
    borderColor: colors.line
  },
  memberBadgeText: {
    color: colors.teal,
    fontSize: 12,
    fontWeight: "900"
  },
  walletHero: {
    position: "relative",
    overflow: "hidden",
    borderRadius: 34,
    padding: spacing.lg,
    backgroundColor: colors.teal,
    borderWidth: 1,
    borderColor: colors.turquoise,
    ...shadows.card
  },
  walletOrb: {
    position: "absolute",
    right: -70,
    top: -64,
    width: 220,
    height: 220,
    borderRadius: 150,
    backgroundColor: "rgba(244,180,0,0.24)"
  },
  walletKicker: {
    color: "#D8FFF5",
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  walletBalance: {
    color: colors.white,
    fontSize: 36,
    lineHeight: 42,
    fontWeight: "900",
    marginTop: spacing.sm
  },
  walletCopy: {
    color: "#D8FFF5",
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "800",
    marginTop: spacing.sm,
    maxWidth: 300
  },
  walletStats: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    marginTop: spacing.lg
  },
  walletStat: {
    minWidth: "30%",
    flex: 1,
    borderRadius: radii.md,
    padding: spacing.md,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.16)"
  },
  walletStatLabel: {
    color: "#D8FFF5",
    fontSize: 10,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  walletStatValue: {
    color: colors.white,
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "900",
    marginTop: 3
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
    width: 60,
    height: 60,
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
  cardCopy: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 20,
    fontWeight: "800",
    marginTop: spacing.xs
  },
  savingsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm
  },
  benefitStat: {
    minWidth: "47%",
    flex: 1,
    borderRadius: radii.lg,
    padding: spacing.md,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line
  },
  benefitLabel: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  benefitValue: {
    color: colors.text,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "900",
    marginTop: 4
  },
  rewardCard: {
    borderRadius: radii.lg,
    padding: spacing.md,
    gap: spacing.sm,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line
  },
  rewardRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    borderRadius: radii.md,
    padding: spacing.md,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.line
  },
  rewardDot: {
    width: 16,
    height: 16,
    borderRadius: 999
  },
  rewardTitle: {
    flex: 1,
    color: colors.text,
    fontSize: 15,
    fontWeight: "900"
  },
  rewardState: {
    color: colors.teal,
    fontSize: 12,
    fontWeight: "900"
  },
  rewardStateLocked: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "900"
  },
  achievementCard: {
    borderRadius: radii.lg,
    padding: spacing.md,
    backgroundColor: colors.surfaceMint,
    borderWidth: 1,
    borderColor: colors.line
  },
  achievementTitle: {
    color: colors.text,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "900",
    marginTop: 3
  },
  streakBox: {
    marginTop: spacing.md,
    borderRadius: radii.md,
    padding: spacing.md,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line
  },
  streakTitle: {
    color: colors.teal,
    fontSize: 15,
    fontWeight: "900"
  },
  streakCopy: {
    color: colors.muted,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "800",
    marginTop: 3
  },
  referralCard: {
    borderRadius: radii.lg,
    padding: spacing.md,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line
  },
  memberCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    borderRadius: radii.lg,
    padding: spacing.md,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line
  },
  avatarCircle: {
    width: 62,
    height: 62,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.teal
  },
  avatarText: {
    color: colors.white,
    fontSize: 25,
    fontWeight: "900"
  },
  memberName: {
    color: colors.text,
    fontSize: 22,
    fontWeight: "900"
  },
  memberMeta: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 19,
    fontWeight: "800"
  },
  memberTeam: {
    color: colors.teal,
    fontSize: 13,
    lineHeight: 19,
    fontWeight: "900",
    marginTop: 2
  },
  controlCard: {
    borderRadius: radii.lg,
    padding: spacing.md,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.line
  },
  controlTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: "900"
  },
  controlCopy: {
    color: colors.muted,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "800",
    marginTop: 4
  },
  buttonRow: {
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.md
  },
  primaryButton: {
    flex: 1,
    borderRadius: radii.md,
    paddingVertical: 13,
    alignItems: "center",
    backgroundColor: colors.teal
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: "900"
  },
  secondaryButton: {
    flex: 1,
    borderRadius: radii.md,
    paddingVertical: 13,
    alignItems: "center",
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line
  },
  secondaryButtonText: {
    color: colors.teal,
    fontSize: 13,
    fontWeight: "900"
  },
  limitNote: {
    color: colors.muted,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "800",
    marginTop: spacing.md
  },
  flexOne: {
    flex: 1
  }
});

const rewardToneStyles = StyleSheet.create({
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
