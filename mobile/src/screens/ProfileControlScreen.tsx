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
  redeemedCoupons,
}: ProfileControlScreenProps) {
  const initial = user.name ? user.name.charAt(0).toUpperCase() : "T";

  return (
    <View style={styles.screen}>

      {/* ── Header Row ── */}
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <Image source={require("../assets/images/logo.png")} style={styles.logo} resizeMode="contain" />
          <View>
            <Text style={styles.headerGreeting}>Profil Anggota</Text>
            <Text style={styles.headerTitle}>KoPoin</Text>
          </View>
        </View>
        <View style={styles.statusPill}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>{user.status}</Text>
        </View>
      </View>

      {/* ── Profile Hero Card ── */}
      <View style={styles.profileHero}>
        {/* Decorative blobs */}
        <View style={styles.heroBlob1} />
        <View style={styles.heroBlob2} />
        <View style={styles.heroBlob3} />

        {/* Avatar + identity */}
        <View style={styles.heroTop}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatarRing}>
              <View style={styles.avatarCircle}>
                <Text style={styles.avatarInitial}>{initial}</Text>
              </View>
            </View>
            {user.achievementUnlocked && (
              <View style={styles.avatarBadge}>
                <Text style={styles.avatarBadgeEmoji}>🏅</Text>
              </View>
            )}
          </View>
          <View style={styles.heroIdentity}>
            <Text style={styles.heroName}>{user.name || "Tamu"}</Text>
            <Text style={styles.heroMemberNo}>{user.memberNo}</Text>
            <View style={styles.heroCoopRow}>
              <Text style={styles.heroCoop}>📍 {cooperative.name}</Text>
            </View>
            {hasJoinedTeam && (
              <View style={styles.heroTeamPill}>
                <Text style={styles.heroTeamText}>👥 {team.name}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Balance display */}
        <View style={styles.heroBalanceSection}>
          <View style={styles.heroBalanceRow}>
            <View>
              <Text style={styles.heroBalanceKicker}>Total KoPoin</Text>
              <Text style={styles.heroBalance}>{formatKopoin(user.kopoinBalance)}</Text>
            </View>
            <View style={styles.levelBadge}>
              <Text style={styles.levelBadgeLabel}>LEVEL</Text>
              <Text style={styles.levelBadgeValue}>{user.level}</Text>
            </View>
          </View>
          <Text style={styles.heroBalanceSub}>
            Poin reward dari aktivitas komunitas. Bukan saldo uang.
          </Text>
        </View>

        {/* Stats strip */}
        <View style={styles.heroStatsStrip}>
          <HeroStat icon="💰" label="Hemat bulan ini" value={formatRupiah(user.monthlySaving)} />
          <View style={styles.heroStatDivider} />
          <HeroStat icon="🔥" label="Streak" value="3 minggu" />
          <View style={styles.heroStatDivider} />
          <HeroStat icon="🗳️" label="Voting" value={userVote ? "Sudah" : "Belum"} />
        </View>
      </View>

      {/* ── Default Coupon (always shown) ── */}
      <CouponTicket
        emoji="☕"
        discount="10%"
        title="Voucher Kopi Sukamaju"
        subtitle="Berlaku 2 hari lagi"
        note="Est. hemat Rp12.000 per transaksi"
        tone="default"
      />

      {/* ── Redeemed Coupons ── */}
      {redeemedCoupons.map((couponId, index) => {
        const coupon = COUPON_DETAILS[couponId];
        if (!coupon) return null;
        return (
          <CouponTicket
            key={`${couponId}-${index}`}
            emoji={coupon.emoji}
            discount="✓"
            title={coupon.title}
            subtitle="Kupon Aktif — sudah ditukar"
            note="Tunjukkan ke kasir Eat & Go"
            tone="redeemed"
          />
        );
      })}

      {/* ── Savings Stats Grid ── */}
      <View style={styles.sectionLabel}>
        <Text style={styles.sectionLabelText}>📊 Ringkasan Benefit</Text>
      </View>
      <View style={styles.statsGrid}>
        <StatCell icon="💸" label="Hemat bulan ini" value={formatRupiah(user.monthlySaving)} accent={colors.teal} />
        <StatCell icon="🏦" label="Hemat sejak gabung" value={formatRupiah(184000)} accent="#7C3AED" />
        <StatCell icon="🎟️" label="Reward dipakai" value="4 kali" accent={colors.gold} />
        <StatCell icon="🗳️" label="Status voting" value={userVote ? "Sudah ikut" : "Belum ikut"} accent={userVote ? colors.turquoise : colors.muted} />
      </View>

      {/* ── Reward Progress Card ── */}
      <View style={styles.rewardCard}>
        <Text style={styles.cardKicker}>🎯 Reward Progress</Text>
        <Text style={styles.cardTitle}>Benefit yang dibuka tim</Text>
        <View style={styles.rewardList}>
          <RewardRow icon="✅" title="Voucher Belanja" state="Terbuka" tone="done" />
          <RewardRow icon="🔥" title="Badge Tim Eksklusif" state="Sedang Dikejar" tone="current" />
          <RewardRow icon="🔒" title="Diskon UMKM Lokal" state="Terkunci" tone="locked" />
        </View>
      </View>

      {/* ── Achievement Card ── */}
      <View style={styles.achievementCard}>
        <View style={styles.achievementTop}>
          <View style={styles.achievementBadgeBox}>
            <Text style={styles.achievementBadgeEmoji}>
              {user.achievementUnlocked ? "🏅" : "🎖️"}
            </Text>
          </View>
          <View style={styles.flexOne}>
            <Text style={styles.cardKicker}>✨ Achievement & Streak</Text>
            <Text style={styles.achievementTitle}>
              {user.achievementUnlocked ? "Anak Lokal, Selera Global" : "Achievement hampir terbuka"}
            </Text>
            <Text style={styles.cardCopy}>
              {user.achievementUnlocked
                ? `Terbuka setelah validasi ${completionSummary?.productName ?? "produk lokal"}. Siap dibagikan ke juri.`
                : `Validasi produk lokal untuk membuka achievement pertama ${user.name || "Tamu"}.`}
            </Text>
          </View>
        </View>

        <View style={styles.streakBox}>
          <View style={styles.streakRow}>
            <Text style={styles.streakEmoji}>🔥</Text>
            <View style={styles.flexOne}>
              <Text style={styles.streakTitle}>{user.streakLabel}</Text>
              <Text style={styles.streakCopy}>
                Streak bisa dijaga lewat voting atau belajar, bukan belanja saja.
              </Text>
            </View>
            <View style={styles.streakWeeks}>
              <Text style={styles.streakWeeksNum}>3</Text>
              <Text style={styles.streakWeeksLabel}>minggu</Text>
            </View>
          </View>
          {/* Streak bar */}
          <View style={styles.streakBarRow}>
            {[1, 2, 3, 4, 5, 6, 7].map((d) => (
              <View key={d} style={[styles.streakBarDot, d <= 3 && styles.streakBarDotFilled]} />
            ))}
          </View>
        </View>
      </View>

      {/* ── Referral Card ── */}
      <View style={styles.referralCard}>
        <View style={styles.referralTop}>
          <View style={styles.referralIconBox}>
            <Text style={styles.referralIcon}>🤝</Text>
          </View>
          <View style={styles.flexOne}>
            <Text style={styles.cardKicker}>🔗 Referral Aktif</Text>
            <Text style={styles.cardTitle}>3 teman diajak</Text>
          </View>
          <View style={styles.referralCountBubble}>
            <Text style={styles.referralCountNum}>3</Text>
            <Text style={styles.referralCountLabel}>invited</Text>
          </View>
        </View>
        <Text style={styles.cardCopy}>
          2 sudah onboarding · 1 menunggu transaksi pertama
        </Text>
        {/* Referral progress */}
        <View style={styles.referralProgressRow}>
          <ReferralFriend label="Budi S." state="active" />
          <ReferralFriend label="Ani R." state="active" />
          <ReferralFriend label="Hendra" state="pending" />
          <ReferralFriend label="+" state="empty" />
          <ReferralFriend label="+" state="empty" />
        </View>
        <Text style={styles.referralNote}>
          Reward referral terbuka setelah teman kamu aktif bertransaksi.
        </Text>
      </View>

      {/* ── Member Identity Card ── */}
      <View style={styles.memberCard}>
        <View style={styles.memberCardHeader}>
          <Text style={styles.memberCardKicker}>🪪 Kartu Anggota</Text>
        </View>
        <View style={styles.memberCardBody}>
          <View style={styles.memberAvatarMini}>
            <Text style={styles.memberAvatarInitial}>{initial}</Text>
          </View>
          <View style={styles.flexOne}>
            <Text style={styles.memberName}>{user.name}</Text>
            <Text style={styles.memberMeta}>{user.memberNo}</Text>
            <Text style={styles.memberMeta}>{cooperative.name} · {cooperative.location}</Text>
            <View style={styles.memberTeamRow}>
              <Text style={styles.memberTeam}>
                {hasJoinedTeam ? `👥 ${team.name}` : "Belum bergabung ke tim"}
              </Text>
            </View>
          </View>
          <View style={styles.memberQrPlaceholder}>
            <Text style={styles.memberQrIcon}>▦</Text>
            <Text style={styles.memberQrLabel}>ID</Text>
          </View>
        </View>
      </View>

      {/* ── Demo Control Card ── */}
      <View style={styles.controlCard}>
        <View style={styles.controlHeader}>
          <Text style={styles.controlIcon}>⚙️</Text>
          <View style={styles.flexOne}>
            <Text style={styles.controlTitle}>Kontrol Demo</Text>
            <Text style={styles.controlCopy}>
              State lokal {persisted ? "tersimpan" : "memuat"}. Reset mengulang flow dari progress 73/100, saldo 1.730, rank #3.
            </Text>
          </View>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.primaryButton} onPress={onResetDemo} activeOpacity={0.85}>
            <Text style={styles.primaryButtonText}>↺ Reset Demo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton} onPress={onReplayWizard} activeOpacity={0.85}>
            <Text style={styles.secondaryButtonText}>▷ Replay Wizard</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.limitNote}>
          {scanCompleted
            ? "✓ Misi sudah tercatat. Duplicate guard tetap aktif."
            : "ℹ KoPoin bukan dompet digital dan tidak menyimpan dana."}
        </Text>
      </View>
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

function HeroStat({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <View style={styles.heroStatItem}>
      <Text style={styles.heroStatIcon}>{icon}</Text>
      <Text style={styles.heroStatValue}>{value}</Text>
      <Text style={styles.heroStatLabel}>{label}</Text>
    </View>
  );
}

function CouponTicket({
  emoji,
  discount,
  title,
  subtitle,
  note,
  tone,
}: {
  emoji: string;
  discount: string;
  title: string;
  subtitle: string;
  note: string;
  tone: "default" | "redeemed";
}) {
  const isRedeemed = tone === "redeemed";
  return (
    <View style={[styles.couponOuter, isRedeemed && styles.couponOuterRedeemed]}>
      {/* Left discount circle */}
      <View style={styles.couponLeftNotch} />
      <View style={[styles.couponLeft, isRedeemed && styles.couponLeftRedeemed]}>
        <Text style={styles.couponEmoji}>{emoji}</Text>
        <Text style={[styles.couponDiscount, isRedeemed && styles.couponDiscountRedeemed]}>
          {discount}
        </Text>
        <Text style={styles.couponDiscountLabel}>
          {isRedeemed ? "DIPAKAI" : "DISKON"}
        </Text>
      </View>
      {/* Dashed separator */}
      <View style={styles.couponSeparator}>
        {Array.from({ length: 8 }).map((_, i) => (
          <View key={i} style={styles.couponDash} />
        ))}
      </View>
      {/* Right content */}
      <View style={styles.couponRight}>
        <View style={styles.couponKickerRow}>
          <View style={[styles.couponKickerDot, isRedeemed && styles.couponKickerDotRedeemed]} />
          <Text style={[styles.couponKicker, isRedeemed && styles.couponKickerRedeemed]}>
            {isRedeemed ? "Kupon Aktif (Loyalty)" : "Kupon Aktif"}
          </Text>
        </View>
        <Text style={styles.couponTitle} numberOfLines={2}>{title}</Text>
        <Text style={styles.couponSubtitle}>{subtitle}</Text>
        <Text style={styles.couponNote}>{note}</Text>
      </View>
      <View style={styles.couponRightNotch} />
    </View>
  );
}

function StatCell({
  icon,
  label,
  value,
  accent,
}: {
  icon: string;
  label: string;
  value: string;
  accent: string;
}) {
  return (
    <View style={styles.statCell}>
      <View style={[styles.statCellIcon, { backgroundColor: `${accent}18` }]}>
        <Text style={styles.statCellIconText}>{icon}</Text>
      </View>
      <Text style={styles.statCellLabel}>{label}</Text>
      <Text style={[styles.statCellValue, { color: accent }]}>{value}</Text>
    </View>
  );
}

function RewardRow({
  icon,
  title,
  state,
  tone,
}: {
  icon: string;
  title: string;
  state: string;
  tone: "done" | "current" | "locked";
}) {
  const isDone = tone === "done";
  const isCurrent = tone === "current";
  return (
    <View style={[styles.rewardRow, isCurrent && styles.rewardRowCurrent]}>
      <View style={[styles.rewardIconBox, isDone && styles.rewardIconBoxDone, isCurrent && styles.rewardIconBoxCurrent]}>
        <Text style={styles.rewardIcon}>{icon}</Text>
      </View>
      <Text style={[styles.rewardTitle, tone === "locked" && styles.rewardTitleLocked]}>{title}</Text>
      <View style={[
        styles.rewardStatePill,
        isDone && styles.rewardStatePillDone,
        isCurrent && styles.rewardStatePillCurrent,
      ]}>
        <Text style={[
          styles.rewardStateText,
          isDone && styles.rewardStateTextDone,
          isCurrent && styles.rewardStateTextCurrent,
        ]}>{state}</Text>
      </View>
    </View>
  );
}

function ReferralFriend({ label, state }: { label: string; state: "active" | "pending" | "empty" }) {
  return (
    <View style={styles.referralFriend}>
      <View style={[
        styles.referralFriendAvatar,
        state === "active" && styles.referralFriendAvatarActive,
        state === "pending" && styles.referralFriendAvatarPending,
        state === "empty" && styles.referralFriendAvatarEmpty,
      ]}>
        <Text style={[styles.referralFriendLabel, state === "empty" && styles.referralFriendLabelEmpty]}>
          {label}
        </Text>
      </View>
      <View style={[
        styles.referralFriendDot,
        state === "active" && styles.referralFriendDotActive,
        state === "pending" && styles.referralFriendDotPending,
      ]} />
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────

const COUPON_DETAILS: Record<string, { title: string; emoji: string }> = {
  coupon_happy_a_idm: { title: "Tebus Murah Paket Happy A - Eat And Go IDM", emoji: "🍱" },
  coupon_happy_a: { title: "Tebus Murah Paket Happy A - Eat And Go", emoji: "🍛" },
  coupon_happy_b: { title: "Tebus Murah Paket Happy B - Eat And Go", emoji: "🍚" },
  coupon_happy_b_idm: { title: "Tebus Murah Paket Happy B - Eat And Go IDM", emoji: "🍲" },
};

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
  headerTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "900",
    marginTop: 1,
  },
  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 7,
    backgroundColor: colors.surfaceMint,
    borderWidth: 1.5,
    borderColor: "#A7F3D0",
    ...shadows.card,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 999,
    backgroundColor: colors.turquoise,
  },
  statusText: {
    color: colors.teal,
    fontSize: 11,
    fontWeight: "900",
  },

  // ── Profile Hero ──
  profileHero: {
    borderRadius: 28,
    padding: spacing.lg,
    backgroundColor: colors.teal,
    overflow: "hidden",
    ...shadows.card,
  },
  heroBlob1: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: "rgba(255,255,255,0.06)",
    top: -80,
    right: -60,
  },
  heroBlob2: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(25,168,142,0.22)",
    bottom: -40,
    left: -20,
  },
  heroBlob3: {
    position: "absolute",
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "rgba(244,180,0,0.16)",
    top: 30,
    right: 110,
  },
  heroTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 14,
  },
  avatarWrapper: {
    position: "relative",
  },
  avatarRing: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 3,
    borderColor: "rgba(255,255,255,0.35)",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarCircle: {
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.25)",
  },
  avatarInitial: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "900",
  },
  avatarBadge: {
    position: "absolute",
    bottom: -2,
    right: -2,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.gold,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors.teal,
  },
  avatarBadgeEmoji: {
    fontSize: 12,
  },
  heroIdentity: {
    flex: 1,
    paddingTop: 2,
  },
  heroName: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "900",
    lineHeight: 26,
  },
  heroMemberNo: {
    color: "rgba(255,255,255,0.55)",
    fontSize: 12,
    fontWeight: "700",
    marginTop: 2,
    letterSpacing: 0.5,
  },
  heroCoopRow: {
    marginTop: 4,
  },
  heroCoop: {
    color: "rgba(255,255,255,0.65)",
    fontSize: 12,
    fontWeight: "700",
  },
  heroTeamPill: {
    marginTop: 6,
    alignSelf: "flex-start",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  heroTeamText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "900",
  },
  heroBalanceSection: {
    marginTop: spacing.lg,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.12)",
  },
  heroBalanceRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  heroBalanceKicker: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  heroBalance: {
    color: "#FFFFFF",
    fontSize: 38,
    fontWeight: "900",
    lineHeight: 44,
    marginTop: 2,
  },
  levelBadge: {
    alignItems: "center",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
  },
  levelBadgeLabel: {
    color: "rgba(255,255,255,0.55)",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  levelBadgeValue: {
    color: colors.gold,
    fontSize: 26,
    fontWeight: "900",
    lineHeight: 30,
  },
  heroBalanceSub: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 12,
    fontWeight: "700",
    marginTop: 6,
    lineHeight: 17,
  },
  heroStatsStrip: {
    flexDirection: "row",
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.10)",
  },
  heroStatItem: {
    flex: 1,
    alignItems: "center",
  },
  heroStatDivider: {
    width: 1,
    backgroundColor: "rgba(255,255,255,0.12)",
    marginVertical: 4,
  },
  heroStatIcon: {
    fontSize: 18,
    marginBottom: 3,
  },
  heroStatValue: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "900",
  },
  heroStatLabel: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 10,
    fontWeight: "700",
    marginTop: 2,
    textTransform: "uppercase",
    letterSpacing: 0.2,
    textAlign: "center",
  },

  // ── Section Label ──
  sectionLabel: {
    marginBottom: -6,
  },
  sectionLabelText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "900",
  },

  // ── Coupon Ticket ──
  couponOuter: {
    flexDirection: "row",
    alignItems: "stretch",
    borderRadius: 18,
    backgroundColor: "#FFFBEB",
    borderWidth: 1.5,
    borderColor: "#FDE68A",
    overflow: "hidden",
    ...shadows.card,
  },
  couponOuterRedeemed: {
    backgroundColor: "#F0FDF9",
    borderColor: "#A7F3D0",
  },
  couponLeftNotch: {
    position: "absolute",
    left: 72,
    top: -8,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.background,
    zIndex: 10,
  },
  couponLeft: {
    width: 76,
    backgroundColor: "#FEF3C7",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.md,
    gap: 2,
  },
  couponLeftRedeemed: {
    backgroundColor: "#ECFDF5",
  },
  couponEmoji: {
    fontSize: 26,
    marginBottom: 4,
  },
  couponDiscount: {
    color: "#D97706",
    fontSize: 22,
    fontWeight: "900",
    lineHeight: 24,
  },
  couponDiscountRedeemed: {
    color: "#059669",
    fontSize: 18,
  },
  couponDiscountLabel: {
    color: colors.muted,
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  couponSeparator: {
    width: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingVertical: spacing.sm,
    gap: 0,
  },
  couponDash: {
    width: 1.5,
    height: 5,
    borderRadius: 1,
    backgroundColor: "#FDE68A",
    marginVertical: 2,
  },
  couponRight: {
    flex: 1,
    padding: 14,
    justifyContent: "center",
  },
  couponKickerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginBottom: 4,
  },
  couponKickerDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#D97706",
  },
  couponKickerDotRedeemed: {
    backgroundColor: "#059669",
  },
  couponKicker: {
    color: "#D97706",
    fontSize: 10,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  couponKickerRedeemed: {
    color: "#059669",
  },
  couponTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "900",
    lineHeight: 19,
  },
  couponSubtitle: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: "700",
    marginTop: 3,
  },
  couponNote: {
    color: colors.muted,
    fontSize: 10,
    fontWeight: "700",
    marginTop: 2,
  },
  couponRightNotch: {
    position: "absolute",
    left: 72,
    bottom: -8,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.background,
    zIndex: 10,
  },

  // ── Stats Grid ──
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  statCell: {
    minWidth: "47%",
    flex: 1,
    borderRadius: 18,
    padding: 14,
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.line,
    ...shadows.card,
  },
  statCellIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  statCellIconText: {
    fontSize: 20,
  },
  statCellLabel: {
    color: colors.muted,
    fontSize: 10,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  statCellValue: {
    fontSize: 17,
    fontWeight: "900",
    marginTop: 3,
    lineHeight: 21,
  },

  // ── Reward Card ──
  rewardCard: {
    borderRadius: radii.lg,
    padding: spacing.md,
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.line,
    gap: spacing.sm,
    ...shadows.card,
  },
  rewardList: {
    gap: 0,
  },
  rewardRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderRadius: radii.md,
    padding: 12,
    backgroundColor: colors.background,
    marginBottom: 4,
  },
  rewardRowCurrent: {
    backgroundColor: "#FFFBEB",
    borderWidth: 1,
    borderColor: "#FDE68A",
  },
  rewardIconBox: {
    width: 38,
    height: 38,
    borderRadius: 11,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  rewardIconBoxDone: {
    backgroundColor: "#ECFDF5",
    borderWidth: 1,
    borderColor: "#6EE7B7",
  },
  rewardIconBoxCurrent: {
    backgroundColor: "#FFFBEB",
    borderWidth: 1,
    borderColor: "#FDE68A",
  },
  rewardIcon: {
    fontSize: 18,
  },
  rewardTitle: {
    flex: 1,
    color: colors.text,
    fontSize: 14,
    fontWeight: "900",
  },
  rewardTitleLocked: {
    color: colors.muted,
  },
  rewardStatePill: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: "#F3F4F6",
    borderWidth: 1,
    borderColor: colors.line,
  },
  rewardStatePillDone: {
    backgroundColor: "#ECFDF5",
    borderColor: "#6EE7B7",
  },
  rewardStatePillCurrent: {
    backgroundColor: "#FFFBEB",
    borderColor: "#FDE68A",
  },
  rewardStateText: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: "900",
  },
  rewardStateTextDone: {
    color: "#059669",
  },
  rewardStateTextCurrent: {
    color: "#D97706",
  },

  // ── Achievement Card ──
  achievementCard: {
    borderRadius: radii.lg,
    padding: spacing.md,
    backgroundColor: "#F0FDF9",
    borderWidth: 1.5,
    borderColor: "#A7F3D0",
    gap: spacing.md,
  },
  achievementTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 14,
  },
  achievementBadgeBox: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: colors.teal,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.tealDark,
  },
  achievementBadgeEmoji: {
    fontSize: 28,
  },
  achievementTitle: {
    color: colors.text,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "900",
    marginTop: 3,
  },
  streakBox: {
    borderRadius: radii.md,
    padding: 14,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: "#A7F3D0",
    gap: 10,
  },
  streakRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  streakEmoji: {
    fontSize: 24,
  },
  streakTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "900",
  },
  streakCopy: {
    color: colors.muted,
    fontSize: 11,
    lineHeight: 16,
    fontWeight: "700",
    marginTop: 2,
  },
  streakWeeks: {
    alignItems: "center",
    width: 44,
  },
  streakWeeksNum: {
    color: colors.teal,
    fontSize: 22,
    fontWeight: "900",
    lineHeight: 26,
  },
  streakWeeksLabel: {
    color: colors.muted,
    fontSize: 9,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  streakBarRow: {
    flexDirection: "row",
    gap: 6,
  },
  streakBarDot: {
    flex: 1,
    height: 6,
    borderRadius: 999,
    backgroundColor: "#D1FAE5",
  },
  streakBarDotFilled: {
    backgroundColor: colors.turquoise,
  },

  // ── Referral Card ──
  referralCard: {
    borderRadius: radii.lg,
    padding: spacing.md,
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.line,
    gap: 10,
    ...shadows.card,
  },
  referralTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  referralIconBox: {
    width: 48,
    height: 48,
    borderRadius: 15,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#C7D2FE",
  },
  referralIcon: {
    fontSize: 24,
  },
  referralCountBubble: {
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: colors.teal,
  },
  referralCountNum: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "900",
    lineHeight: 24,
  },
  referralCountLabel: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 9,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  referralProgressRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 4,
  },
  referralFriend: {
    alignItems: "center",
    gap: 4,
  },
  referralFriendAvatar: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: colors.line,
    backgroundColor: colors.background,
  },
  referralFriendAvatarActive: {
    backgroundColor: "#ECFDF5",
    borderColor: "#6EE7B7",
  },
  referralFriendAvatarPending: {
    backgroundColor: "#FFFBEB",
    borderColor: "#FDE68A",
  },
  referralFriendAvatarEmpty: {
    backgroundColor: colors.background,
    borderStyle: "dashed",
  },
  referralFriendLabel: {
    color: colors.text,
    fontSize: 10,
    fontWeight: "900",
    textAlign: "center",
  },
  referralFriendLabelEmpty: {
    color: colors.muted,
    fontSize: 16,
  },
  referralFriendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.line,
  },
  referralFriendDotActive: {
    backgroundColor: "#34D399",
  },
  referralFriendDotPending: {
    backgroundColor: "#FBBF24",
  },
  referralNote: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: "700",
    lineHeight: 16,
  },

  // ── Member Card ──
  memberCard: {
    borderRadius: radii.lg,
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.line,
    overflow: "hidden",
    ...shadows.card,
  },
  memberCardHeader: {
    backgroundColor: colors.teal,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
  },
  memberCardKicker: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  memberCardBody: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    padding: spacing.md,
  },
  memberAvatarMini: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: colors.teal,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#A7F3D0",
  },
  memberAvatarInitial: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "900",
  },
  memberName: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "900",
  },
  memberMeta: {
    color: colors.muted,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "700",
    marginTop: 1,
  },
  memberTeamRow: {
    marginTop: 4,
  },
  memberTeam: {
    color: colors.teal,
    fontSize: 12,
    fontWeight: "900",
  },
  memberQrPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.line,
  },
  memberQrIcon: {
    color: colors.teal,
    fontSize: 22,
    lineHeight: 26,
  },
  memberQrLabel: {
    color: colors.muted,
    fontSize: 8,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  // ── Control Card ──
  controlCard: {
    borderRadius: radii.lg,
    padding: spacing.md,
    backgroundColor: "#F8FBFA",
    borderWidth: 1.5,
    borderColor: colors.line,
    gap: spacing.sm,
  },
  controlHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  controlIcon: {
    fontSize: 22,
    marginTop: 1,
  },
  controlTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "900",
  },
  controlCopy: {
    color: colors.muted,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "700",
    marginTop: 3,
  },
  buttonRow: {
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: 4,
  },
  primaryButton: {
    flex: 1,
    borderRadius: radii.md,
    paddingVertical: 14,
    alignItems: "center",
    backgroundColor: colors.teal,
    ...shadows.card,
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: "900",
  },
  secondaryButton: {
    flex: 1,
    borderRadius: radii.md,
    paddingVertical: 14,
    alignItems: "center",
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.line,
  },
  secondaryButtonText: {
    color: colors.teal,
    fontSize: 13,
    fontWeight: "900",
  },
  limitNote: {
    color: colors.muted,
    fontSize: 11,
    lineHeight: 17,
    fontWeight: "700",
    marginTop: 2,
  },

  // ── Shared ──
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
  flexOne: {
    flex: 1,
  },
});
