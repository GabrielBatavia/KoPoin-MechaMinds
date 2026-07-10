import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  Dimensions
} from "react-native";
import Svg, { Path, Circle, Rect } from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";

type IconName =
  | "search"
  | "wallet"
  | "add-circle"
  | "arrow-up"
  | "document-text"
  | "grid"
  | "cafe"
  | "cafe-outline"
  | "book"
  | "book-outline"
  | "checkbox"
  | "checkbox-outline"
  | "people-outline"
  | "pricetag-outline"
  | "trophy-outline"
  | "person-add-outline"
  | "ellipsis-horizontal-outline"
  | "chevron-right"
  | "arrow-right"
  | "coffee"
  | "flash";

type CustomIconProps = {
  name: IconName;
  size?: number;
  color: string;
  style?: any;
};

function CustomIcon({ name, size = 24, color, style }: CustomIconProps) {
  const containerStyle = style ? style : {};
  switch (name) {
    case "search":
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={containerStyle}>
          <Circle cx="11" cy="11" r="8" stroke={color} strokeWidth={2} />
          <Path d="M21 21l-4.3-4.3" stroke={color} strokeWidth={2} strokeLinecap="round" />
        </Svg>
      );
    case "wallet":
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={containerStyle}>
          <Rect x="2" y="4" width="20" height="16" rx="3" stroke={color} strokeWidth={2} />
          <Path d="M12 11h6v2h-6z" stroke={color} strokeWidth={2} strokeLinecap="round" />
        </Svg>
      );
    case "add-circle":
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={containerStyle}>
          <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth={2} />
          <Path d="M12 8v8M8 12h8" stroke={color} strokeWidth={2} strokeLinecap="round" />
        </Svg>
      );
    case "arrow-up":
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={containerStyle}>
          <Path d="M12 19V5M5 12l7-7 7 7" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
      );
    case "document-text":
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={containerStyle}>
          <Rect x="3" y="3" width="18" height="18" rx="2" stroke={color} strokeWidth={2} />
          <Path d="M7 8h10M7 12h10M7 16h6" stroke={color} strokeWidth={2} strokeLinecap="round" />
        </Svg>
      );
    case "grid":
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={containerStyle}>
          <Rect x="3" y="3" width="7" height="7" rx="1.5" stroke={color} strokeWidth={2} />
          <Rect x="14" y="3" width="7" height="7" rx="1.5" stroke={color} strokeWidth={2} />
          <Rect x="14" y="14" width="7" height="7" rx="1.5" stroke={color} strokeWidth={2} />
          <Rect x="3" y="14" width="7" height="7" rx="1.5" stroke={color} strokeWidth={2} />
        </Svg>
      );
    case "cafe":
    case "cafe-outline":
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={containerStyle}>
          <Path d="M17 8h1a3 3 0 013 3v2a3 3 0 01-3 3h-1M3 8h14v5a4 4 0 01-4 4H7a4 4 0 01-4-4V8z" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          <Path d="M1 21h20" stroke={color} strokeWidth={2} strokeLinecap="round" />
          <Path d="M6 3v2M10 3v2M14 3v2" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
        </Svg>
      );
    case "book":
    case "book-outline":
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={containerStyle}>
          <Path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2V3zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7V3z" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
      );
    case "checkbox":
    case "checkbox-outline":
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={containerStyle}>
          <Rect x="3" y="3" width="18" height="18" rx="2" stroke={color} strokeWidth={2} />
          <Path d="M9 11l2 2 4-4" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
      );
    case "people-outline":
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={containerStyle}>
          <Circle cx="9" cy="7" r="4" stroke={color} strokeWidth={2} />
          <Path d="M2 21a7 7 0 0114 0" stroke={color} strokeWidth={2} strokeLinecap="round" />
          <Path d="M16 3.13a4 4 0 010 7.75M22 21a7 7 0 00-6-7" stroke={color} strokeWidth={2} strokeLinecap="round" />
        </Svg>
      );
    case "pricetag-outline":
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={containerStyle}>
          <Path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          <Circle cx="7" cy="7" r="1.5" fill={color} />
        </Svg>
      );
    case "trophy-outline":
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={containerStyle}>
          <Path d="M6 9H4.5a2.5 2.5 0 010-5H6M18 9h1.5a2.5 2.5 0 000-5H18" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          <Path d="M4 22h16M10 14.66V17c0 .55-.45 1-1 1H4v4h16v-4h-5c-.55 0-1-.45-1-1v-2.34M12 2a6 6 0 00-6 6v3a6 6 0 0012 0V8a6 6 0 00-6-6z" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
      );
    case "person-add-outline":
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={containerStyle}>
          <Circle cx="9" cy="7" r="4" stroke={color} strokeWidth={2} />
          <Path d="M2 21a7 7 0 0110.5 0M16 11h6M19 8v6" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
      );
    case "ellipsis-horizontal-outline":
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={containerStyle}>
          <Circle cx="12" cy="12" r="2" fill={color} />
          <Circle cx="5" cy="12" r="2" fill={color} />
          <Circle cx="19" cy="12" r="2" fill={color} />
        </Svg>
      );
    case "chevron-right":
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={containerStyle}>
          <Path d="M9 18l6-6-6-6" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
      );
    case "arrow-right":
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={containerStyle}>
          <Path d="M5 12h14M12 5l7 7-7 7" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
      );
    case "flash":
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={containerStyle}>
          <Path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
      );
    case "coffee":
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={containerStyle}>
          <Path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          <Path d="M6 2v2M10 2v2M14 2v2" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
        </Svg>
      );
    default:
      return null;
  }
}

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
  const [searchQuery, setSearchQuery] = useState("");
  const [seconds, setSeconds] = useState(24 * 60 + 8); // 24 minutes, 8 seconds

  // Live ticking countdown for Flash Vote banner
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : 24 * 60 + 8));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const progressPercent = Math.round((campaign.currentValue / campaign.targetValue) * 100);
  const remainingActions = campaign.targetValue - campaign.currentValue;
  const initial = user.name ? user.name.charAt(0).toUpperCase() : "G";

  // Grid services array mapping to Gojek services style
  const services = [
    {
      id: "beli_kopi",
      label: "Beli Kopi",
      icon: "cafe-outline" as const,
      badge: "+120",
      badgeBg: colors.text,
      bg: "#EAFBF7",
      iconColor: colors.teal,
      action: onOpenMission
    },
    {
      id: "belajar",
      label: "Belajar",
      icon: "book-outline" as const,
      badge: "P1",
      badgeBg: colors.gold,
      bg: "#FFF6DA",
      iconColor: "#B58400",
      action: onOpenMission
    },
    {
      id: "vote_reward",
      label: "Vote Reward",
      icon: "checkbox-outline" as const,
      badge: "+30",
      badgeBg: colors.turquoise,
      bg: "#E6F8F5",
      iconColor: colors.turquoise,
      action: onOpenCommunity
    },
    {
      id: "ajak_teman",
      label: "Ajak Teman",
      icon: "people-outline" as const,
      badge: "Hot",
      badgeBg: colors.danger,
      bg: "#FDF0F0",
      iconColor: colors.danger,
      action: onOpenCommunity
    },
    {
      id: "kupon",
      label: "Kupon Ku",
      icon: "pricetag-outline" as const,
      badge: "10%",
      badgeBg: colors.gold,
      bg: "#FFF6DA",
      iconColor: "#B58400",
      action: onOpenProfile
    },
    {
      id: "rank_tim",
      label: "Rank Tim",
      icon: "trophy-outline" as const,
      badge: `#${rank}`,
      badgeBg: colors.teal,
      bg: "#EAFBEE",
      iconColor: "#0E8A38",
      action: onOpenCommunity
    },
    {
      id: "gabung_tim",
      label: hasJoinedTeam ? "Tim Saya" : "Gabung Tim",
      icon: "person-add-outline" as const,
      badge: hasJoinedTeam ? "Aktif" : "Mulai",
      badgeBg: hasJoinedTeam ? colors.success : colors.gold,
      bg: hasJoinedTeam ? "#EAFBF7" : "#FFF9E6",
      iconColor: hasJoinedTeam ? colors.teal : colors.gold,
      action: hasJoinedTeam ? onOpenCommunity : onJoinTeam
    },
    {
      id: "lainnya",
      label: "Lainnya",
      icon: "ellipsis-horizontal-outline" as const,
      badge: "",
      badgeBg: "",
      bg: "#F2F4F7",
      iconColor: colors.muted,
      action: onOpenProfile
    }
  ];

  return (
    <View style={styles.container}>
      {/* 1. Header Gradient Section (Full bleed via negative margins) */}
      <LinearGradient
        colors={[colors.tealDark, colors.teal]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.headerGradient}
      >
        {/* Brand row with Logo Text and Level Badge */}
        <View style={styles.brandRow}>
          <View>
            <Text style={styles.logoText}>kopoin</Text>
            <Text style={styles.headerMeta}>Selamat datang, {user.name}</Text>
          </View>
          <View style={styles.headerBadge}>
            <Text style={styles.headerBadgeText}>Level {user.level}</Text>
          </View>
        </View>

        {/* Search row with circular Profile Avatar */}
        <View style={styles.searchRow}>
          <View style={styles.searchContainer}>
            <CustomIcon name="search" size={20} color={colors.muted} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Cari kopi, misi, UMKM..."
              placeholderTextColor="#A0B0AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity style={styles.avatarButton} onPress={onOpenProfile} activeOpacity={0.8}>
            <LinearGradient
              colors={["#FFE082", "#FFB300"]}
              style={styles.avatarGradient}
            >
              <Text style={styles.avatarText}>{initial}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Hero Promo Banner (Starbucks style) */}
        <View style={styles.heroPromoCard}>
          <View style={styles.heroPromoLeft}>
            <View style={styles.promoBadge}>
              <Text style={styles.promoBadgeText}>COFFEE DAY SPECIAL</Text>
            </View>
            <Text style={styles.promoTitle}>Discount up to 60%*</Text>
            <Text style={styles.promoSub}>Beli Kopi Sukamaju dapat cashback Kopoin & bantu tim naik peringkat.</Text>
            <TouchableOpacity style={styles.promoLink} onPress={onOpenMission}>
              <Text style={styles.promoLinkText}>Ikut Misi Sekarang</Text>
              <CustomIcon name="arrow-right" size={14} color={colors.white} style={{ marginLeft: 4 }} />
            </TouchableOpacity>
          </View>
          <View style={styles.heroPromoRight}>
            <CustomIcon name="coffee" size={70} color="#F8F1DE" style={styles.coffeeIconBack} />
            <View style={styles.coffeeCupFloating}>
              <CustomIcon name="cafe" size={32} color={colors.gold} />
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* 2. GoPay-style Balance Card (Floating overlapping) */}
      <View style={styles.balanceCard}>
        <View style={styles.balanceLeft}>
          <View style={styles.walletIconBox}>
            <CustomIcon name="wallet" size={24} color={colors.teal} />
          </View>
          <View style={styles.balanceInfo}>
            <View style={styles.balanceRow}>
              <Text style={styles.balanceAmount}>{formatRupiah(user.monthlySaving)}</Text>
              <TouchableOpacity onPress={onOpenProfile}>
                <CustomIcon name="add-circle" size={18} color={colors.teal} style={{ marginLeft: 6 }} />
              </TouchableOpacity>
            </View>
            <Text style={styles.coinsAmount}>{formatKopoin(user.kopoinBalance)} coins</Text>
          </View>
        </View>

        <View style={styles.balanceDivider} />

        <View style={styles.balanceActions}>
          {/* Bayar Action */}
          <TouchableOpacity style={styles.balanceActionItem} onPress={onOpenMission} activeOpacity={0.7}>
            <View style={styles.actionIconCircle}>
              <CustomIcon name="arrow-up" size={20} color={colors.white} />
            </View>
            <Text style={styles.actionItemLabel}>Bayar</Text>
          </TouchableOpacity>

          {/* Riwayat Action */}
          <TouchableOpacity style={styles.balanceActionItem} onPress={onOpenProfile} activeOpacity={0.7}>
            <View style={styles.actionIconCircle}>
              <CustomIcon name="document-text" size={20} color={colors.white} />
            </View>
            <Text style={styles.actionItemLabel}>Riwayat</Text>
          </TouchableOpacity>

          {/* Lainnya Action */}
          <TouchableOpacity style={styles.balanceActionItem} onPress={onOpenCommunity} activeOpacity={0.7}>
            <View style={styles.actionIconCircle}>
              <CustomIcon name="grid" size={20} color={colors.white} />
              {/* Notification Badge */}
              <View style={styles.redBadge}>
                <Text style={styles.redBadgeText}>8</Text>
              </View>
            </View>
            <Text style={styles.actionItemLabel}>Lainnya</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 3. Service Grid (8 elements arranged beautifully) */}
      <View style={styles.gridContainer}>
        {services.map((svc) => (
          <TouchableOpacity
            key={svc.id}
            style={styles.gridItem}
            onPress={svc.action}
            activeOpacity={0.7}
          >
            <View style={styles.iconBoxContainer}>
              <View style={[styles.iconBox, { backgroundColor: svc.bg }]}>
                <CustomIcon name={svc.icon} size={24} color={svc.iconColor} />
              </View>
              {svc.badge ? (
                <View style={[styles.gridBadge, { backgroundColor: svc.badgeBg }]}>
                  <Text style={styles.gridBadgeText}>{svc.badge}</Text>
                </View>
              ) : null}
            </View>
            <Text style={styles.gridLabel} numberOfLines={1}>
              {svc.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 4. Bright Green Promo Card (Kojek7an-style) */}
      <TouchableOpacity
        style={styles.greenPromoCard}
        onPress={!hasJoinedTeam ? onJoinTeam : onOpenMission}
        activeOpacity={0.8}
      >
        <View style={styles.greenPromoLeft}>
          <View style={styles.promoGreenTag}>
            <Text style={styles.promoGreenTagText}>MISI AKTIF</Text>
          </View>
          <Text style={styles.greenPromoTitle}>Dukung {cooperative.name}</Text>
          <Text style={styles.greenPromoSub}>
            {!hasJoinedTeam
              ? "Gabung Tim Sukamaju sekarang untuk membuka misi belanja bersama!"
              : `Tim Pemuda Sukamaju sudah selesai ${progressPercent}% target campaign.`}
          </Text>
          <View style={styles.greenProgressWrapper}>
            <View style={styles.greenProgressTrack}>
              <View style={[styles.greenProgressFill, { width: `${progressPercent}%` }]} />
            </View>
            <Text style={styles.greenProgressText}>
              {campaign.currentValue}/{campaign.targetValue} Aksi ({progressPercent}%)
            </Text>
          </View>
        </View>
        <View style={styles.greenPromoRight}>
          <View style={styles.greenChevronCircle}>
            <CustomIcon name="chevron-right" size={20} color="#00AA13" />
          </View>
        </View>
      </TouchableOpacity>

      {/* 5. Horizontal Carousel ("Pilihan buat kamu") */}
      <View style={styles.carouselSection}>
        <Text style={styles.sectionTitleText}>Pilihan buat kamu</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carouselContainer}
        >
          {/* Card 1 */}
          <TouchableOpacity
            style={styles.carouselCard}
            onPress={onOpenMission}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={["#0F6B63", "#082B2D"]}
              style={styles.cardHeaderGraphic}
            >
              <CustomIcon name="cafe" size={32} color={colors.white} />
              <View style={styles.cardPointsBadge}>
                <Text style={styles.cardPointsText}>+120 Kopoin</Text>
              </View>
            </LinearGradient>
            <View style={styles.cardBody}>
              <Text style={styles.cardTag}>MISI UTAMA</Text>
              <Text style={styles.cardTitleText}>Beli Kopi Sukamaju</Text>
              <Text style={styles.cardSubText}>Input QR transaksi untuk menyumbang skor tim.</Text>
            </View>
          </TouchableOpacity>

          {/* Card 2 */}
          <TouchableOpacity
            style={styles.carouselCard}
            onPress={onOpenMission}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={["#B58400", "#543C00"]}
              style={styles.cardHeaderGraphic}
            >
              <CustomIcon name="book" size={32} color={colors.white} />
              <View style={styles.cardPointsBadge}>
                <Text style={styles.cardPointsText}>+60 Kopoin</Text>
              </View>
            </LinearGradient>
            <View style={styles.cardBody}>
              <Text style={styles.cardTag}>BELAJAR</Text>
              <Text style={styles.cardTitleText}>Edukasi Simpan Pinjam</Text>
              <Text style={styles.cardSubText}>Pelajari cara kerja koperasi desa secara adil.</Text>
            </View>
          </TouchableOpacity>

          {/* Card 3 */}
          <TouchableOpacity
            style={styles.carouselCard}
            onPress={onOpenCommunity}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={["#19A88E", "#0B4C40"]}
              style={styles.cardHeaderGraphic}
            >
              <CustomIcon name="checkbox" size={32} color={colors.white} />
              <View style={styles.cardPointsBadge}>
                <Text style={styles.cardPointsText}>+30 Kopoin</Text>
              </View>
            </LinearGradient>
            <View style={styles.cardBody}>
              <Text style={styles.cardTag}>VOTING</Text>
              <Text style={styles.cardTitleText}>Pilih Reward Bersama</Text>
              <Text style={styles.cardSubText}>Suara anggota muda menentukan benefit selanjutnya.</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* 6. Floating Ticking Flash Sale / Flash Vote Banner */}
      <TouchableOpacity
        style={styles.floatingFlashBanner}
        onPress={onOpenCommunity}
        activeOpacity={0.85}
      >
        <View style={styles.flashBannerLeft}>
          <View style={styles.flashIconBox}>
            <CustomIcon name="flash" size={16} color={colors.white} />
          </View>
          <View style={styles.flashInfo}>
            <View style={styles.flashRow}>
              <Text style={styles.flashKicker}>Flash Vote</Text>
              <View style={styles.timerBadge}>
                <Text style={styles.timerText}>{formatTime(seconds)}</Text>
              </View>
            </View>
            <Text style={styles.flashDesc}>Tinggal sedikit waktu! Tentukan reward komunitas sekarang.</Text>
          </View>
        </View>
        <View style={styles.flashBannerRight}>
          <View style={styles.arrowFlashBtn}>
            <CustomIcon name="arrow-right" size={14} color="#C2185B" />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  headerGradient: {
    marginHorizontal: -spacing.md,
    marginTop: -spacing.md,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md + 14,
    paddingBottom: 48,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.md,
    marginTop: 4
  },
  logoText: {
    fontFamily: "Geist_900Black",
    color: colors.white,
    fontSize: 28,
    letterSpacing: -1.2
  },
  headerMeta: {
    color: "#EAFBF7",
    fontSize: 12,
    fontWeight: "700",
    marginTop: -2
  },
  headerBadge: {
    borderRadius: 999,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    backgroundColor: "rgba(255, 255, 255, 0.18)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)"
  },
  headerBadgeText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: "900"
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.md
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 999,
    height: 44,
    paddingHorizontal: spacing.sm,
    marginRight: spacing.sm,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2
  },
  searchIcon: {
    marginRight: 6
  },
  searchInput: {
    flex: 1,
    height: "100%",
    fontSize: 14,
    color: colors.text,
    fontWeight: "600"
  },
  avatarButton: {
    borderRadius: 999,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  avatarGradient: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 21,
    borderWidth: 1.5,
    borderColor: colors.white
  },
  avatarText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "900"
  },
  heroPromoCard: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    borderRadius: 20,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)"
  },
  heroPromoLeft: {
    flex: 1,
    justifyContent: "center"
  },
  promoBadge: {
    alignSelf: "flex-start",
    backgroundColor: colors.gold,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 6
  },
  promoBadgeText: {
    color: colors.tealDark,
    fontSize: 9,
    fontWeight: "900"
  },
  promoTitle: {
    color: colors.white,
    fontSize: 22,
    fontWeight: "900",
    lineHeight: 26,
    marginBottom: 4
  },
  promoSub: {
    color: "#E2ECE8",
    fontSize: 12,
    lineHeight: 17,
    fontWeight: "600",
    marginBottom: 8
  },
  promoLink: {
    flexDirection: "row",
    alignItems: "center"
  },
  promoLinkText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "900",
    textDecorationLine: "underline"
  },
  heroPromoRight: {
    width: 80,
    alignItems: "center",
    justifyContent: "center",
    position: "relative"
  },
  coffeeIconBack: {
    opacity: 0.2,
    transform: [{ rotate: "-15deg" }]
  },
  coffeeCupFloating: {
    position: "absolute",
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4
  },
  balanceCard: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: spacing.sm,
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
    borderColor: colors.line
  },
  balanceLeft: {
    flex: 1.1,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 4
  },
  walletIconBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#EAFBF7",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8
  },
  balanceInfo: {
    flex: 1
  },
  balanceRow: {
    flexDirection: "row",
    alignItems: "center"
  },
  balanceAmount: {
    fontSize: 15,
    fontWeight: "900",
    color: colors.text
  },
  coinsAmount: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.muted,
    marginTop: 2
  },
  balanceDivider: {
    width: 1,
    height: 36,
    backgroundColor: colors.line,
    marginHorizontal: 8
  },
  balanceActions: {
    flex: 1.4,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  balanceActionItem: {
    alignItems: "center",
    justifyContent: "center"
  },
  actionIconCircle: {
    position: "relative",
    width: 32,
    height: 32,
    borderRadius: 12,
    backgroundColor: colors.turquoise,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4
  },
  actionItemLabel: {
    fontSize: 11,
    fontWeight: "900",
    color: colors.text
  },
  redBadge: {
    position: "absolute",
    top: -5,
    right: -7,
    backgroundColor: colors.danger,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 3,
    borderWidth: 1.5,
    borderColor: colors.white
  },
  redBadgeText: {
    color: colors.white,
    fontSize: 8,
    fontWeight: "900"
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 24,
    marginHorizontal: 2
  },
  gridItem: {
    width: "23%",
    alignItems: "center",
    marginBottom: 20
  },
  iconBoxContainer: {
    position: "relative",
    marginBottom: 6
  },
  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.line
  },
  gridBadge: {
    position: "absolute",
    top: -6,
    right: -8,
    borderRadius: 999,
    paddingHorizontal: 5,
    paddingVertical: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  gridBadgeText: {
    color: colors.white,
    fontSize: 8,
    fontWeight: "900"
  },
  gridLabel: {
    color: colors.text,
    fontSize: 11,
    fontWeight: "800",
    textAlign: "center"
  },
  greenPromoCard: {
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
    elevation: 2
  },
  greenPromoLeft: {
    flex: 1
  },
  promoGreenTag: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginBottom: 6
  },
  promoGreenTagText: {
    color: colors.white,
    fontSize: 9,
    fontWeight: "900"
  },
  greenPromoTitle: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "900",
    marginBottom: 2
  },
  greenPromoSub: {
    color: "#E2FFE5",
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "600",
    marginBottom: 10
  },
  greenProgressWrapper: {
    flexDirection: "row",
    alignItems: "center"
  },
  greenProgressTrack: {
    flex: 1,
    height: 8,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.3)",
    overflow: "hidden",
    marginRight: 8
  },
  greenProgressFill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: colors.white
  },
  greenProgressText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: "900"
  },
  greenPromoRight: {
    paddingLeft: 12
  },
  greenChevronCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center"
  },
  carouselSection: {
    marginTop: 24
  },
  sectionTitleText: {
    fontSize: 16,
    fontWeight: "900",
    color: colors.text,
    marginHorizontal: 2,
    marginBottom: 12
  },
  carouselContainer: {
    paddingLeft: 2,
    paddingRight: 20,
    gap: 12
  },
  carouselCard: {
    width: 190,
    backgroundColor: colors.white,
    borderRadius: 18,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.line,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1
  },
  cardHeaderGraphic: {
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    position: "relative"
  },
  cardPointsBadge: {
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
    elevation: 1
  },
  cardPointsText: {
    color: colors.teal,
    fontSize: 10,
    fontWeight: "900"
  },
  cardBody: {
    padding: 12
  },
  cardTag: {
    color: colors.turquoise,
    fontSize: 9,
    fontWeight: "900",
    marginBottom: 2
  },
  cardTitleText: {
    fontSize: 13,
    fontWeight: "900",
    color: colors.text,
    marginBottom: 4
  },
  cardSubText: {
    fontSize: 11,
    color: colors.muted,
    lineHeight: 15,
    fontWeight: "600"
  },
  floatingFlashBanner: {
    backgroundColor: "#FDF2F4",
    borderColor: "#FCE4EC",
    borderWidth: 1,
    borderRadius: 18,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 24,
    marginBottom: 8,
    marginHorizontal: 2,
    shadowColor: "#24413D",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2
  },
  flashBannerLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  flashIconBox: {
    width: 28,
    height: 28,
    borderRadius: 9,
    backgroundColor: "#D81B60",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10
  },
  flashInfo: {
    flex: 1
  },
  flashRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2
  },
  flashKicker: {
    color: "#C2185B",
    fontSize: 13,
    fontWeight: "900",
    marginRight: 8
  },
  timerBadge: {
    backgroundColor: "#D81B60",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2
  },
  timerText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: "900"
  },
  flashDesc: {
    color: "#880E4F",
    fontSize: 11,
    fontWeight: "600",
    lineHeight: 15
  },
  flashBannerRight: {
    paddingLeft: 8
  },
  arrowFlashBtn: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#F8BBD0",
    alignItems: "center",
    justifyContent: "center"
  }
});
