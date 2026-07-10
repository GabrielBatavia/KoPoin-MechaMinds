import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  Dimensions,
  Image,
  Modal
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  Search,
  Wallet,
  PlusCircle,
  ArrowUp,
  FileText,
  Grid,
  Coffee,
  Book,
  CheckSquare,
  Users,
  Tag,
  Trophy,
  UserPlus,
  MoreHorizontal,
  ChevronRight,
  ArrowRight,
  Zap,
  Scan,
  ChevronDown,
  Circle,
  X
} from "lucide-react-native";

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
  | "flash"
  | "coffee";

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
      return <Search size={size} color={color} style={containerStyle} />;
    case "wallet":
      return <Wallet size={size} color={color} style={containerStyle} />;
    case "add-circle":
      return <PlusCircle size={size} color={color} style={containerStyle} />;
    case "arrow-up":
      return <ArrowUp size={size} color={color} style={containerStyle} />;
    case "document-text":
      return <FileText size={size} color={color} style={containerStyle} />;
    case "grid":
      return <Grid size={size} color={color} style={containerStyle} />;
    case "cafe":
    case "cafe-outline":
    case "coffee":
      return <Coffee size={size} color={color} style={containerStyle} />;
    case "book":
    case "book-outline":
      return <Book size={size} color={color} style={containerStyle} />;
    case "checkbox":
    case "checkbox-outline":
      return <CheckSquare size={size} color={color} style={containerStyle} />;
    case "people-outline":
      return <Users size={size} color={color} style={containerStyle} />;
    case "pricetag-outline":
      return <Tag size={size} color={color} style={containerStyle} />;
    case "trophy-outline":
      return <Trophy size={size} color={color} style={containerStyle} />;
    case "person-add-outline":
      return <UserPlus size={size} color={color} style={containerStyle} />;
    case "ellipsis-horizontal-outline":
      return <MoreHorizontal size={size} color={color} style={containerStyle} />;
    case "chevron-right":
      return <ChevronRight size={size} color={color} style={containerStyle} />;
    case "arrow-right":
      return <ArrowRight size={size} color={color} style={containerStyle} />;
    case "flash":
      return <Zap size={size} color={color} style={containerStyle} />;
    default:
      return null;
  }
}

import type { Campaign, CompletionSummary, Cooperative, Team, User, UserVote } from "../data/kopoinSeed";
import { colors, radii, shadows, spacing } from "../theme";
import { formatKopoin, formatRupiah } from "../utils/formatters";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const OUTLETS = [
  {
    name: "Raffles Square Juanda Jakarta",
    address: "Raffles Square Juanda Jakarta, Jalan Veteran 2A 8 1, RT.2/RW.2, Gambir, Jakarta Pusat"
  },
  {
    name: "Koperasi Desa Sukamaju",
    address: "Jalan Veteran RT 01/RW 02, Desa Sukamaju, Kec. Kenangan"
  },
  {
    name: "Koperasi Unit Desa Merah Putih",
    address: "Jalan Raya Sukamaju No. 45, Desa Sukamaju, Kec. Kenangan"
  }
];

const promoImages = [
  require("../assets/images/promo/image1.png"),
  require("../assets/images/promo/image2.png")
];

type HomeDashboardScreenProps = {
  campaign: Campaign;
  completionSummary: CompletionSummary | null;
  cooperative: Cooperative;
  hasJoinedTeam: boolean;
  onJoinTeam: () => void;
  onOpenCommunity: () => void;
  onOpenMission: () => void;
  onOpenProfile: () => void;
  onOpenRedeem?: () => void;
  onOpenPromo?: () => void;
  onOpenCommunityHub?: () => void;
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
  onOpenRedeem,
  onOpenPromo,
  onOpenCommunityHub,
  rank,
  scanCompleted,
  team,
  user,
  userVote
}: HomeDashboardScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [seconds, setSeconds] = useState(24 * 60 + 8); // 24 minutes, 8 seconds
  const [selectedOutlet, setSelectedOutlet] = useState<{ name: string; address: string }>(OUTLETS[0]!);
  const [showOutletModal, setShowOutletModal] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

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
      id: "promo_member",
      label: "Promo Member",
      icon: "coffee" as const,
      imageIcon: require("../assets/images/logo.png"),
      bg: "#FFFFFF",
      iconColor: colors.teal,
      action: onOpenPromo || onOpenMission
    },
    {
      id: "daily_quest",
      label: "Komunitas",
      icon: "people-outline" as const,
      bg: "#FFFFFF",
      iconColor: "#B58400",
      action: onOpenCommunityHub || onOpenMission
    },
    {
      id: "vote_reward",
      label: "Vote Reward",
      icon: "checkbox" as const,
      bg: "#FFFFFF",
      iconColor: colors.turquoise,
      action: onOpenCommunity
    },
    {
      id: "redeem_point",
      label: "Redeem Point",
      icon: "pricetag-outline" as const,
      badge: "Diskon",
      badgeBg: colors.danger,
      bg: "#FFFFFF",
      iconColor: colors.danger,
      action: onOpenRedeem || onOpenProfile
    },
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
          <View style={{ alignItems: "flex-start" }}>
            <Image source={require("../assets/images/white-logo.png")} style={styles.dashboardLogo} resizeMode="contain" />
            <Text style={styles.headerMeta}>Selamat datang, {user.name}</Text>
          </View>
          <View style={styles.headerBadge}>
            <Text style={styles.headerBadgeText}>Level {user.level}</Text>
          </View>
        </View>

        {/* Outlet Selector & Scanner Search Card */}
        <View style={styles.outletSearchCard}>
          <View style={styles.outletRow}>
            {/* Left section: Outlet selection */}
            <TouchableOpacity
              style={styles.outletSelectArea}
              onPress={() => setShowOutletModal(true)}
              activeOpacity={0.7}
            >
              <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
                <View style={{ flex: 1, paddingRight: 8 }}>
                  <Text style={styles.outletNameText} numberOfLines={1}>
                    {selectedOutlet.name}
                  </Text>
                  <Text style={styles.outletAddressText} numberOfLines={1}>
                    {selectedOutlet.address}
                  </Text>
                </View>
                <View style={styles.chevronOutlineCircle}>
                  <ChevronDown size={10} color="#5E7A6B" strokeWidth={4.5} />
                </View>
              </View>
            </TouchableOpacity>

            {/* Vertical Divider */}
            <View style={styles.verticalDivider} />

            {/* Right section: Profile Photo */}
            <TouchableOpacity
              style={styles.avatarButton}
              onPress={onOpenProfile}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={["#FFE082", "#FFB300"]}
                style={styles.avatarGradient}
              >
                <Text style={styles.avatarText}>{initial}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {/* Full-width Image Promo Slider */}
        <View style={styles.sliderContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={(event) => {
              const slide = Math.round(
                event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width
              );
              if (slide !== activeSlide) {
                setActiveSlide(slide);
              }
            }}
            scrollEventThrottle={16}
            style={styles.sliderScrollView}
          >
            {promoImages.map((img, idx) => (
              <TouchableOpacity key={idx} activeOpacity={0.9} style={styles.slideTouch} onPress={onOpenMission}>
                <Image source={img} style={styles.slideImage} resizeMode="cover" />
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Dot Indicators */}
          <View style={styles.dotsContainer}>
            {promoImages.map((_, idx) => (
              <View
                key={idx}
                style={[
                  styles.dot,
                  activeSlide === idx ? styles.activeDot : styles.inactiveDot
                ]}
              />
            ))}
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
                {svc.imageIcon ? (
                  <Image source={svc.imageIcon} style={{ width: 28, height: 28 }} resizeMode="contain" />
                ) : (
                  <CustomIcon name={svc.icon} size={24} color={svc.iconColor} />
                )}
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

      {/* Outlet Selection Bottom Sheet Modal */}
      <Modal visible={showOutletModal} transparent animationType="slide" onRequestClose={() => setShowOutletModal(false)}>
        <View style={styles.outletSheetOverlay}>
          <View style={styles.outletSheetContent}>
            {/* Header */}
            <View style={styles.outletSheetHeader}>
              <Text style={styles.outletSheetTitle}>Pilih Outlet Koperasi</Text>
              <TouchableOpacity onPress={() => setShowOutletModal(false)}>
                <X size={22} color={colors.text} />
              </TouchableOpacity>
            </View>

            {/* List */}
            <ScrollView style={styles.outletSheetScroll} showsVerticalScrollIndicator={false}>
              {OUTLETS.map((outlet, idx) => {
                const isSelected = selectedOutlet.name === outlet.name;
                return (
                  <TouchableOpacity
                    key={idx}
                    style={[styles.outletItem, isSelected && styles.outletItemActive]}
                    onPress={() => {
                      setSelectedOutlet(outlet);
                      setShowOutletModal(false);
                    }}
                  >
                    <Text style={[styles.outletItemName, isSelected && styles.outletItemNameActive]}>
                      {outlet.name}
                    </Text>
                    <Text style={styles.outletItemAddress}>{outlet.address}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>
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
  dashboardLogo: {
    width: 30,
    height: 30,
    marginBottom: 8,
    alignSelf: "flex-start"
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
    flex: 1.2,
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
    borderRadius: 14,
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
  },
  outletSearchCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 12,
    marginTop: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3
  },
  outletRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  outletSelectArea: {
    flex: 1
  },
  outletTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  outletNameText: {
    fontSize: 14,
    fontWeight: "900",
    color: colors.text,
    maxWidth: "85%"
  },
  chevronOutlineCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#5E7A6B",
    backgroundColor: "#5e7a6b3d",
    alignItems: "center",
    justifyContent: "center"
  },
  outletAddressText: {
    fontSize: 11,
    color: colors.muted,
    marginTop: 2,
    fontWeight: "600"
  },
  verticalDivider: {
    width: 1,
    height: 38,
    backgroundColor: colors.line,
    marginHorizontal: 8
  },
  scannerButton: {
    padding: 2
  },
  scannerIconBg: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#FDF0F0",
    alignItems: "center",
    justifyContent: "center"
  },
  horizontalSeparator: {
    height: 1,
    backgroundColor: colors.line,
    marginVertical: 10
  },
  melayaniRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4
  },
  melayaniLabel: {
    fontSize: 11,
    color: colors.muted,
    fontWeight: "800",
    marginRight: 6
  },
  servicePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginRight: 10
  },
  serviceText: {
    fontSize: 11,
    color: colors.slate,
    fontWeight: "800"
  },
  sliderContainer: {
    marginTop: 16,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: colors.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    position: "relative"
  },
  sliderScrollView: {
    width: "100%",
    height: 180
  },
  slideTouch: {
    width: SCREEN_WIDTH - 32, // matching padding spacing.md * 2
    height: 180
  },
  slideImage: {
    width: "100%",
    height: "100%"
  },
  dotsContainer: {
    position: "absolute",
    bottom: 12,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6
  },
  dot: {
    height: 6,
    borderRadius: 3
  },
  activeDot: {
    width: 18,
    backgroundColor: colors.white
  },
  inactiveDot: {
    width: 6,
    backgroundColor: "rgba(255, 255, 255, 0.5)"
  },
  outletSheetOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end"
  },
  outletSheetContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: spacing.md,
    paddingTop: 20,
    paddingBottom: 36,
    maxHeight: "60%"
  },
  outletSheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderColor: colors.line
  },
  outletSheetTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: colors.text
  },
  outletSheetScroll: {
    marginVertical: 10
  },
  outletItem: {
    paddingVertical: 14,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderColor: colors.line
  },
  outletItemActive: {
    backgroundColor: "#EAFBF7",
    borderRadius: 8,
    paddingHorizontal: 8
  },
  outletItemName: {
    fontSize: 14,
    fontWeight: "900",
    color: colors.text
  },
  outletItemNameActive: {
    color: colors.teal
  },
  outletItemAddress: {
    fontSize: 11,
    color: colors.muted,
    marginTop: 4,
    fontWeight: "600"
  }
});
