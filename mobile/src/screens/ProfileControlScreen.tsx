import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  Wallet,
  Award,
  ChevronRight,
  Gift,
  TrendingUp,
  Users,
  Star,
  Flame,
  Shield,
  RotateCcw,
  Play,
  UserPlus,
  CheckCircle,
  Clock,
  Plus,
  CreditCard,
  BadgeCheck,
  Vote,
  ShoppingBag
} from "lucide-react-native";

import type { CompletionSummary, Cooperative, Team, User, UserVote } from "../data/kopoinSeed";
import { colors, radii, shadows, spacing } from "../theme";
import { formatKopoin, formatRupiah } from "../utils/formatters";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

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
  redeemedCoupons,
}: ProfileControlScreenProps) {
  const initial = user.name ? user.name.charAt(0).toUpperCase() : "T";

  return (
    <View style={styles.container}>

      {/* ── 1. Gradient Header (full-bleed, same as Home) ── */}
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
            <Text style={styles.headerMeta}>Profil Anggota</Text>
          </View>
          <View style={styles.headerBadge}>
            <Text style={styles.headerBadgeText}>Level {user.level}</Text>
          </View>
        </View>

        {/* Profile Identity Card (inside gradient) */}
        <View style={styles.profileIdentityCard}>
          <View style={styles.identityTop}>
            <LinearGradient
              colors={["#FFE082", "#FFB300"]}
              style={styles.avatarGradient}
            >
              <Text style={styles.avatarInitial}>{initial}</Text>
            </LinearGradient>
            <View style={styles.identityInfo}>
              <Text style={styles.identityName}>{user.name || "Tamu"}</Text>
              <Text style={styles.identityMemberNo}>{user.memberNo}</Text>
              <View style={styles.identityCoopRow}>
                <Text style={styles.identityCoop}>{cooperative.name}</Text>
              </View>
            </View>
            {user.achievementUnlocked && (
              <View style={styles.verifiedBadge}>
                <BadgeCheck size={14} color="#FFFFFF" />
              </View>
            )}
          </View>

          {/* Team status */}
          {hasJoinedTeam && (
            <View style={styles.teamStrip}>
              <Users size={13} color={colors.teal} />
              <Text style={styles.teamStripText}>{team.name}</Text>
              <View style={styles.teamStripDot} />
              <Text style={styles.teamStripStatus}>{user.status}</Text>
            </View>
          )}
        </View>
      </LinearGradient>

      {/* ── 2. Balance Card (floating overlap, same as Home) ── */}
      <View style={styles.balanceCard}>
        <View style={styles.balanceLeft}>
          <View style={styles.walletIconBox}>
            <Wallet size={22} color={colors.teal} />
          </View>
          <View style={styles.balanceInfo}>
            <Text style={styles.balanceLabel}>KoPoin Balance</Text>
            <View style={styles.balanceRow}>
              <Text style={styles.balanceAmount}>{formatKopoin(user.kopoinBalance)}</Text>
            </View>
          </View>
        </View>
        <View style={styles.balanceDivider} />
        <View style={styles.balanceRight}>
          <Text style={styles.savingLabel}>Hemat</Text>
          <Text style={styles.savingAmount}>{formatRupiah(user.monthlySaving)}</Text>
          <Text style={styles.savingPeriod}>bulan ini</Text>
        </View>
      </View>

      {/* ── 3. Quick Stats Grid (4-icon grid like Home services) ── */}
      <View style={styles.gridContainer}>
        <TouchableOpacity style={styles.gridItem} activeOpacity={0.7}>
          <View style={styles.iconBoxContainer}>
            <View style={[styles.iconBox, { backgroundColor: "#FFFFFF" }]}>
              <TrendingUp size={22} color={colors.teal} />
            </View>
          </View>
          <Text style={styles.gridValue}>{formatRupiah(user.monthlySaving)}</Text>
          <Text style={styles.gridLabel}>Hemat/bln</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.gridItem} activeOpacity={0.7}>
          <View style={styles.iconBoxContainer}>
            <View style={[styles.iconBox, { backgroundColor: "#FFFFFF" }]}>
              <ShoppingBag size={22} color="#7C3AED" />
            </View>
          </View>
          <Text style={styles.gridValue}>{formatRupiah(184000)}</Text>
          <Text style={styles.gridLabel}>Total hemat</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.gridItem} activeOpacity={0.7}>
          <View style={styles.iconBoxContainer}>
            <View style={[styles.iconBox, { backgroundColor: "#FFFFFF" }]}>
              <Gift size={22} color={colors.gold} />
            </View>
            <View style={[styles.gridBadge, { backgroundColor: colors.turquoise }]}>
              <Text style={styles.gridBadgeText}>4</Text>
            </View>
          </View>
          <Text style={styles.gridValue}>4 kali</Text>
          <Text style={styles.gridLabel}>Reward</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.gridItem} activeOpacity={0.7}>
          <View style={styles.iconBoxContainer}>
            <View style={[styles.iconBox, { backgroundColor: "#FFFFFF" }]}>
              <Vote size={22} color={userVote ? colors.turquoise : colors.muted} />
            </View>
            {userVote && (
              <View style={[styles.gridBadge, { backgroundColor: colors.turquoise }]}>
                <Text style={styles.gridBadgeText}>✓</Text>
              </View>
            )}
          </View>
          <Text style={styles.gridValue}>{userVote ? "Sudah" : "Belum"}</Text>
          <Text style={styles.gridLabel}>Voting</Text>
        </TouchableOpacity>
      </View>

      {/* ── 4. Active Coupon Card (green promo style like Home) ── */}
      <View style={styles.couponCard}>
        <View style={styles.couponLeft}>
          <View style={styles.couponTag}>
            <Text style={styles.couponTagText}>KUPON AKTIF</Text>
          </View>
          <Text style={styles.couponTitle}>Voucher Kopi Sukamaju</Text>
          <Text style={styles.couponSub}>Diskon 10% · Berlaku 2 hari lagi · Est. hemat Rp12.000</Text>
        </View>
        <View style={styles.couponRight}>
          <View style={styles.couponChevronCircle}>
            <ChevronRight size={18} color={colors.gold} />
          </View>
        </View>
      </View>

      {/* ── Redeemed Coupons ── */}
      {redeemedCoupons.map((couponId, index) => {
        const coupon = COUPON_DETAILS[couponId];
        if (!coupon) return null;
        return (
          <View key={`${couponId}-${index}`} style={styles.redeemedCard}>
            <View style={styles.redeemedIconBox}>
              <CheckCircle size={18} color="#059669" />
            </View>
            <View style={styles.redeemedInfo}>
              <Text style={styles.redeemedTag}>KUPON DITUKAR</Text>
              <Text style={styles.redeemedTitle} numberOfLines={1}>{coupon.title}</Text>
              <Text style={styles.redeemedSub}>Tunjukkan ke kasir Eat & Go</Text>
            </View>
          </View>
        );
      })}

      {/* ── 5. Reward Progress Section ── */}
      <Text style={styles.sectionTitleText}>Reward Progress</Text>
      <View style={styles.rewardCard}>
        <RewardItem
          icon={<CheckCircle size={18} color="#059669" />}
          title="Voucher Belanja"
          state="Terbuka"
          bgColor="#ECFDF5"
          borderColor="#6EE7B7"
          stateColor="#059669"
        />
        <RewardItem
          icon={<Flame size={18} color="#D97706" />}
          title="Badge Tim Eksklusif"
          state="Sedang Dikejar"
          bgColor="#FFFBEB"
          borderColor="#FDE68A"
          stateColor="#D97706"
        />
        <RewardItem
          icon={<Shield size={18} color={colors.muted} />}
          title="Diskon UMKM Lokal"
          state="Terkunci"
          bgColor={colors.background}
          borderColor={colors.line}
          stateColor={colors.muted}
        />
      </View>

      {/* ── 6. Achievement + Streak Carousel Card (like Home pilihan buat kamu) ── */}
      <Text style={styles.sectionTitleText}>Achievement & Streak</Text>
      <View style={styles.achievementRow}>
        {/* Achievement card */}
        <View style={styles.achieveCard}>
          <LinearGradient
            colors={user.achievementUnlocked ? [colors.teal, colors.tealDark] : ["#6B7280", "#374151"]}
            style={styles.achieveGraphic}
          >
            <Award size={28} color="#FFFFFF" />
            <View style={styles.achievePointsBadge}>
              <Text style={styles.achievePointsText}>{user.achievementUnlocked ? "UNLOCKED" : "LOCKED"}</Text>
            </View>
          </LinearGradient>
          <View style={styles.achieveBody}>
            <Text style={styles.achieveTag}>{user.achievementUnlocked ? "TERBUKA" : "TERKUNCI"}</Text>
            <Text style={styles.achieveTitleText} numberOfLines={2}>
              {user.achievementUnlocked ? "Anak Lokal, Selera Global" : "Achievement hampir terbuka"}
            </Text>
            <Text style={styles.achieveSubText} numberOfLines={2}>
              {user.achievementUnlocked
                ? `Validasi ${completionSummary?.productName ?? "produk lokal"} berhasil.`
                : `Validasi produk lokal untuk membukanya.`}
            </Text>
          </View>
        </View>

        {/* Streak card */}
        <View style={styles.achieveCard}>
          <LinearGradient
            colors={["#F59E0B", "#B45309"]}
            style={styles.achieveGraphic}
          >
            <Flame size={28} color="#FFFFFF" />
            <View style={styles.achievePointsBadge}>
              <Text style={styles.achievePointsText}>3 MINGGU</Text>
            </View>
          </LinearGradient>
          <View style={styles.achieveBody}>
            <Text style={styles.achieveTag}>STREAK AKTIF</Text>
            <Text style={styles.achieveTitleText}>{user.streakLabel}</Text>
            <Text style={styles.achieveSubText} numberOfLines={2}>
              Dijaga lewat voting atau belajar, bukan belanja saja.
            </Text>
          </View>
        </View>
      </View>

      {/* ── 7. Referral Card (green promo card style) ── */}
      <TouchableOpacity style={styles.referralPromoCard} activeOpacity={0.8}>
        <View style={styles.referralPromoLeft}>
          <View style={styles.referralTag}>
            <Text style={styles.referralTagText}>REFERRAL AKTIF</Text>
          </View>
          <Text style={styles.referralTitle}>3 Teman Diajak</Text>
          <Text style={styles.referralSub}>2 sudah onboarding · 1 menunggu transaksi pertama</Text>
          <View style={styles.referralAvatarRow}>
            <ReferralDot icon={<CheckCircle size={12} color="#FFFFFF" />} bg="#059669" />
            <ReferralDot icon={<CheckCircle size={12} color="#FFFFFF" />} bg="#059669" />
            <ReferralDot icon={<Clock size={12} color="#FFFFFF" />} bg="#F59E0B" />
            <ReferralDot icon={<Plus size={12} color="rgba(255,255,255,0.5)" />} bg="rgba(255,255,255,0.2)" />
            <ReferralDot icon={<Plus size={12} color="rgba(255,255,255,0.5)" />} bg="rgba(255,255,255,0.2)" />
          </View>
        </View>
        <View style={styles.referralPromoRight}>
          <View style={styles.referralChevronCircle}>
            <UserPlus size={18} color={colors.teal} />
          </View>
        </View>
      </TouchableOpacity>

      {/* ── 8. Member ID Card ── */}
      <Text style={styles.sectionTitleText}>Kartu Anggota</Text>
      <View style={styles.memberIdCard}>
        <LinearGradient
          colors={[colors.tealDark, colors.teal]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.memberIdGradient}
        >
          <View style={styles.memberIdTop}>
            <Image source={require("../assets/images/white-logo.png")} style={styles.memberIdLogo} resizeMode="contain" />
            <Text style={styles.memberIdBrand}>KoPoin Member</Text>
          </View>
          <View style={styles.memberIdBody}>
            <LinearGradient colors={["#FFE082", "#FFB300"]} style={styles.memberIdAvatar}>
              <Text style={styles.memberIdInitial}>{initial}</Text>
            </LinearGradient>
            <View style={styles.memberIdInfo}>
              <Text style={styles.memberIdName}>{user.name}</Text>
              <Text style={styles.memberIdMeta}>{user.memberNo}</Text>
              <Text style={styles.memberIdMeta}>{cooperative.name} · {cooperative.location}</Text>
              <View style={styles.memberIdTeamPill}>
                <Text style={styles.memberIdTeamText}>
                  {hasJoinedTeam ? team.name : "Belum bergabung"}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.memberIdFooter}>
            <View style={styles.memberIdQr}>
              <CreditCard size={16} color="rgba(255,255,255,0.6)" />
            </View>
            <Text style={styles.memberIdFooterText}>Level {user.level} · {user.status}</Text>
          </View>
        </LinearGradient>
      </View>

      {/* ── 9. Demo Control (subtle, bottom) ── */}
      <View style={styles.controlCard}>
        <View style={styles.controlRow}>
          <View style={styles.controlIconBox}>
            <RotateCcw size={16} color={colors.muted} />
          </View>
          <View style={styles.controlInfo}>
            <Text style={styles.controlTitle}>Kontrol Simulasi</Text>
            <Text style={styles.controlSub}>
              State {persisted ? "tersimpan" : "memuat"} · Reset ke progress 73/100, saldo 1.730, rank #3
            </Text>
          </View>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.primaryButton} onPress={onResetDemo} activeOpacity={0.8}>
            <RotateCcw size={14} color="#FFFFFF" />
            <Text style={styles.primaryButtonText}>Reset Demo State</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton} onPress={onReplayWizard} activeOpacity={0.8}>
            <Play size={14} color={colors.teal} />
            <Text style={styles.secondaryButtonText}>Ulangi Simulasi Terpandu</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.controlNote}>
          {scanCompleted
            ? "Misi sudah tercatat. Duplicate guard tetap aktif."
            : "KoPoin bukan dompet digital dan tidak menyimpan dana."}
        </Text>
      </View>
    </View>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function RewardItem({
  icon,
  title,
  state,
  bgColor,
  borderColor,
  stateColor,
}: {
  icon: React.ReactNode;
  title: string;
  state: string;
  bgColor: string;
  borderColor: string;
  stateColor: string;
}) {
  return (
    <View style={[styles.rewardRow, { backgroundColor: bgColor, borderColor }]}>
      <View style={[styles.rewardIconBox, { backgroundColor: bgColor, borderColor }]}>
        {icon}
      </View>
      <Text style={styles.rewardTitle}>{title}</Text>
      <View style={[styles.rewardStatePill, { borderColor }]}>
        <Text style={[styles.rewardStateText, { color: stateColor }]}>{state}</Text>
      </View>
    </View>
  );
}

function ReferralDot({ icon, bg }: { icon: React.ReactNode; bg: string }) {
  return (
    <View style={[styles.referralDot, { backgroundColor: bg }]}>
      {icon}
    </View>
  );
}

// ─── Data ────────────────────────────────────────────────────────────────────

const COUPON_DETAILS: Record<string, { title: string; emoji: string }> = {
  coupon_happy_a_idm: { title: "Tebus Murah Paket Happy A - Eat And Go IDM", emoji: "🍱" },
  coupon_happy_a: { title: "Tebus Murah Paket Happy A - Eat And Go", emoji: "🍛" },
  coupon_happy_b: { title: "Tebus Murah Paket Happy B - Eat And Go", emoji: "🍚" },
  coupon_happy_b_idm: { title: "Tebus Murah Paket Happy B - Eat And Go IDM", emoji: "🍲" },
};

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // ── Header Gradient (matches Home exactly) ──
  headerGradient: {
    marginHorizontal: -spacing.md,
    marginTop: -spacing.md,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md + 14,
    paddingBottom: 48,
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
    borderRadius: 999,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    backgroundColor: "rgba(255, 255, 255, 0.18)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  headerBadgeText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: "900",
  },

  // ── Profile Identity Card (inside gradient) ──
  profileIdentityCard: {
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    borderRadius: 20,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  identityTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  avatarGradient: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  avatarInitial: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "900",
  },
  identityInfo: {
    flex: 1,
  },
  identityName: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "900",
  },
  identityMemberNo: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 11,
    fontWeight: "700",
    marginTop: 2,
  },
  identityCoopRow: {
    marginTop: 2,
  },
  identityCoop: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 11,
    fontWeight: "600",
  },
  verifiedBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.turquoise,
    alignItems: "center",
    justifyContent: "center",
  },
  teamStrip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.12)",
  },
  teamStripText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "900",
    flex: 1,
  },
  teamStripDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#34D399",
  },
  teamStripStatus: {
    color: "#34D399",
    fontSize: 11,
    fontWeight: "900",
  },

  // ── Balance Card (floating, matches Home) ──
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
  balanceRow: {
    flexDirection: "row",
    alignItems: "center",
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
    marginHorizontal: 12,
  },
  balanceRight: {
    alignItems: "flex-end",
  },
  savingLabel: {
    fontSize: 10,
    fontWeight: "800",
    color: colors.muted,
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  savingAmount: {
    fontSize: 15,
    fontWeight: "900",
    color: colors.teal,
    marginTop: 1,
  },
  savingPeriod: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.muted,
    marginTop: 1,
  },

  // ── Grid (matches Home services grid) ──
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
  iconBoxContainer: {
    position: "relative",
    marginBottom: 6,
  },
  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.line,
  },
  gridBadge: {
    position: "absolute",
    top: -6,
    right: -8,
    borderRadius: 999,
    paddingHorizontal: 5,
    paddingVertical: 1,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 16,
    height: 16,
  },
  gridBadgeText: {
    color: colors.white,
    fontSize: 8,
    fontWeight: "900",
  },
  gridValue: {
    color: colors.text,
    fontSize: 12,
    fontWeight: "900",
    textAlign: "center",
  },
  gridLabel: {
    color: colors.muted,
    fontSize: 10,
    fontWeight: "800",
    textAlign: "center",
    marginTop: 1,
  },

  // ── Coupon Card (green promo style) ──
  couponCard: {
    backgroundColor: colors.surfaceGold,
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 2,
    borderWidth: 1,
    borderColor: "#F1D98D",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  couponLeft: {
    flex: 1,
  },
  couponTag: {
    alignSelf: "flex-start",
    backgroundColor: colors.gold,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 6,
  },
  couponTagText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "900",
  },
  couponTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "900",
    marginBottom: 2,
  },
  couponSub: {
    color: colors.muted,
    fontSize: 11,
    lineHeight: 16,
    fontWeight: "600",
  },
  couponRight: {
    paddingLeft: 12,
  },
  couponChevronCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#FFF6DA",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#F1D98D",
  },

  // ── Redeemed coupon cards ──
  redeemedCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 14,
    marginHorizontal: 2,
    marginTop: spacing.sm,
    borderWidth: 1,
    borderColor: "#6EE7B7",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  redeemedIconBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#ECFDF5",
    alignItems: "center",
    justifyContent: "center",
  },
  redeemedInfo: {
    flex: 1,
  },
  redeemedTag: {
    color: "#059669",
    fontSize: 9,
    fontWeight: "900",
    marginBottom: 2,
  },
  redeemedTitle: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "900",
  },
  redeemedSub: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: "600",
    marginTop: 2,
  },

  // ── Section Title (matches Home) ──
  sectionTitleText: {
    fontSize: 16,
    fontWeight: "900",
    color: colors.text,
    marginHorizontal: 2,
    marginBottom: 12,
    marginTop: 24,
  },

  // ── Reward Card ──
  rewardCard: {
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 14,
    marginHorizontal: 2,
    gap: 8,
    borderWidth: 1,
    borderColor: colors.line,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  rewardRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
  },
  rewardIconBox: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  rewardTitle: {
    flex: 1,
    color: colors.text,
    fontSize: 13,
    fontWeight: "900",
  },
  rewardStatePill: {
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
  },
  rewardStateText: {
    fontSize: 10,
    fontWeight: "900",
  },

  // ── Achievement Cards (carousel style like Home) ──
  achievementRow: {
    flexDirection: "row",
    gap: 12,
    marginHorizontal: 2,
  },
  achieveCard: {
    flex: 1,
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
  achieveGraphic: {
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  achievePointsBadge: {
    position: "absolute",
    bottom: 8,
    right: 8,
    backgroundColor: colors.white,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  achievePointsText: {
    color: colors.teal,
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 0.3,
  },
  achieveBody: {
    padding: 12,
  },
  achieveTag: {
    color: colors.turquoise,
    fontSize: 9,
    fontWeight: "900",
    marginBottom: 2,
  },
  achieveTitleText: {
    fontSize: 13,
    fontWeight: "900",
    color: colors.text,
    marginBottom: 4,
  },
  achieveSubText: {
    fontSize: 11,
    color: colors.muted,
    lineHeight: 15,
    fontWeight: "600",
  },

  // ── Referral Promo Card (green promo style) ──
  referralPromoCard: {
    backgroundColor: colors.teal,
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 24,
    marginHorizontal: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  referralPromoLeft: {
    flex: 1,
  },
  referralTag: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginBottom: 6,
  },
  referralTagText: {
    color: colors.white,
    fontSize: 9,
    fontWeight: "900",
  },
  referralTitle: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "900",
    marginBottom: 2,
  },
  referralSub: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 11,
    lineHeight: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  referralAvatarRow: {
    flexDirection: "row",
    gap: 6,
  },
  referralDot: {
    width: 26,
    height: 26,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  referralPromoRight: {
    paddingLeft: 12,
  },
  referralChevronCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },

  // ── Member ID Card ──
  memberIdCard: {
    marginHorizontal: 2,
    borderRadius: 18,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  memberIdGradient: {
    padding: spacing.md,
  },
  memberIdTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 14,
  },
  memberIdLogo: {
    width: 20,
    height: 20,
  },
  memberIdBrand: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  memberIdBody: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  memberIdAvatar: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  memberIdInitial: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "900",
  },
  memberIdInfo: {
    flex: 1,
  },
  memberIdName: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "900",
  },
  memberIdMeta: {
    color: "rgba(255,255,255,0.55)",
    fontSize: 11,
    fontWeight: "600",
    marginTop: 2,
  },
  memberIdTeamPill: {
    alignSelf: "flex-start",
    marginTop: 6,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  memberIdTeamText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "900",
  },
  memberIdFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.12)",
  },
  memberIdQr: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: "rgba(255,255,255,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  memberIdFooterText: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 11,
    fontWeight: "800",
  },

  // ── Control Card ──
  controlCard: {
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 16,
    marginTop: 24,
    marginHorizontal: 2,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.line,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  controlRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    marginBottom: 12,
  },
  controlIconBox: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.line,
  },
  controlInfo: {
    flex: 1,
  },
  controlTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "900",
  },
  controlSub: {
    color: colors.muted,
    fontSize: 11,
    lineHeight: 16,
    fontWeight: "600",
    marginTop: 2,
  },
  buttonRow: {
    gap: spacing.sm,
  },
  primaryButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    borderRadius: 12,
    paddingVertical: 12,
    backgroundColor: colors.teal,
    shadowColor: "#24413D",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 2,
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: "900",
  },
  secondaryButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    borderRadius: 12,
    paddingVertical: 12,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
  },
  secondaryButtonText: {
    color: colors.teal,
    fontSize: 13,
    fontWeight: "900",
  },
  controlNote: {
    color: colors.muted,
    fontSize: 11,
    lineHeight: 16,
    fontWeight: "600",
    marginTop: 10,
  },
});
