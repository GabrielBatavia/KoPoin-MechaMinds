import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
  Modal,
  TextInput
} from "react-native";
import {
  Search,
  X,
  ArrowLeft,
  ChevronDown,
  Check,
  LayoutGrid,
  Tag,
  Coffee,
  Smile,
  Sparkles,
  Activity,
  Shirt,
  MoreHorizontal,
  HelpCircle,
  SlidersHorizontal,
  ShoppingBag
} from "lucide-react-native";
import { colors, radii, shadows, spacing } from "../theme";
import { formatNumber } from "../utils/formatters";
import type { Coupon, User } from "../data/kopoinSeed";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - spacing.md * 3) / 2;

type CouponItem = Coupon;

const MOCK_COUPONS: CouponItem[] = [
  {
    id: "coupon_happy_a_idm",
    title: "Tebus Murah Paket Happy A - Eat And Go IDM",
    originalPrice: "Rp 40.700",
    promoPrice: "Rp 25.000",
    points: 30,
    merchant: "Eat And Go",
    emoji: "🍱",
    category: "Penawaran Khusus",
    tags: ["Toy Story 5", "Makanan"]
  },
  {
    id: "coupon_happy_a",
    title: "Tebus Murah Paket Happy A - Eat And Go",
    originalPrice: "Rp 56.800",
    promoPrice: "Rp 35.000",
    points: 35,
    merchant: "Eat And Go",
    emoji: "🍛",
    category: "Makanan & Minuman",
    tags: ["Perawatan Diri", "Makanan"]
  },
  {
    id: "coupon_happy_b",
    title: "Tebus Murah Paket Happy B - Eat And Go",
    originalPrice: "Rp 56.800",
    promoPrice: "Rp 35.000",
    points: 35,
    merchant: "Eat And Go",
    emoji: "🍚",
    category: "Makanan & Minuman",
    tags: ["MLBB M...", "Makanan"]
  },
  {
    id: "coupon_happy_b_idm",
    title: "Tebus Murah Paket Happy B - Eat And Go IDM",
    originalPrice: "Rp 61.000",
    promoPrice: "Rp 35.000",
    points: 40,
    merchant: "Eat And Go",
    emoji: "🍲",
    category: "Penawaran Khusus",
    tags: ["Toy Story 5", "Makanan"]
  }
];

type CategoryDetails = {
  id: string;
  label: string;
  icon: (color: string) => React.ReactNode;
};

type RedeemPointsScreenProps = {
  user: User;
  redeemedCoupons: string[];
  coupons?: CouponItem[];
  onRedeemCoupon: (couponId: string, points: number) => void;
  onClose: () => void;
};

export function RedeemPointsScreen({
  user,
  redeemedCoupons,
  coupons,
  onRedeemCoupon,
  onClose
}: RedeemPointsScreenProps) {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [activeTag, setActiveTag] = useState("Semua");
  const [selectedCoupon, setSelectedCoupon] = useState<CouponItem | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successCoupon, setSuccessCoupon] = useState<CouponItem | null>(null);

  // Search States
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<TextInput>(null);

  // Category Bottom Sheet State
  const [showCategorySheet, setShowCategorySheet] = useState(false);

  const subTagsMap: Record<string, string[]> = {
    "Semua": ["Semua", "Toy Story 5", "Perawatan Diri", "MLBB M..."],
    "Penawaran Khusus": ["Semua", "Toy Story 5"],
    "Makanan & Minuman": ["Semua", "Makanan", "Yummy Choice", "Merchant"],
    "Lainnya": ["Semua"]
  };

  const currentSubTags = subTagsMap[activeCategory] || ["Semua"];
  const availableCoupons = coupons && coupons.length > 0 ? coupons : MOCK_COUPONS;

  // Filter coupons based on Category, Tags, and Search Query
  const filteredCoupons = availableCoupons.filter((coupon) => {
    const matchesCat =
      activeCategory === "Semua" ||
      coupon.category === activeCategory;
    const matchesTag =
      activeTag === "Semua" ||
      coupon.tags.includes(activeTag) ||
      (activeTag === "Makanan" && coupon.tags.includes("Makanan"));
    const matchesSearch =
      searchQuery.trim() === "" ||
      coupon.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coupon.merchant.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCat && matchesTag && matchesSearch;
  });

  const handleRedeemClick = (coupon: CouponItem) => {
    setSelectedCoupon(coupon);
  };

  const confirmRedeem = () => {
    if (!selectedCoupon) return;
    onRedeemCoupon(selectedCoupon.id, selectedCoupon.points);
    setSuccessCoupon(selectedCoupon);
    setSelectedCoupon(null);
    setShowSuccess(true);
  };

  // Categories with matching Lucide icons
  const sheetCategories: CategoryDetails[] = [
    {
      id: "Semua",
      label: "Semua",
      icon: (color) => <LayoutGrid size={20} color={color} />
    },
    {
      id: "Penawaran Khusus",
      label: "Penawaran Khusus",
      icon: (color) => <Tag size={20} color={color} />
    },
    {
      id: "Makanan & Minuman",
      label: "Makanan & Minuman",
      icon: (color) => <Coffee size={20} color={color} />
    },
    {
      id: "Hiburan",
      label: "Hiburan",
      icon: (color) => <Smile size={20} color={color} />
    },
    {
      id: "Perawatan Diri",
      label: "Perawatan Diri",
      icon: (color) => <Sparkles size={20} color={color} />
    },
    {
      id: "Kesehatan",
      label: "Kesehatan",
      icon: (color) => <Activity size={20} color={color} />
    },
    {
      id: "Fashion",
      label: "Fashion",
      icon: (color) => <Shirt size={20} color={color} />
    },
    {
      id: "Lainnya",
      label: "Lainnya",
      icon: (color) => <MoreHorizontal size={20} color={color} />
    }
  ];

  return (
    <View style={styles.container}>
      {/* 1. Header (Includes search trigger & Text input toggling) */}
      <View style={styles.header}>
        {isSearching ? (
          <View style={styles.searchBarHeader}>
            <TouchableOpacity
              onPress={() => {
                setIsSearching(false);
                setSearchQuery("");
              }}
              style={styles.backButton}
            >
              <ArrowLeft size={24} color={colors.text} />
            </TouchableOpacity>
            <TextInput
              ref={searchInputRef}
              style={styles.searchInputField}
              placeholder="Cari kupon, merchant..."
              placeholderTextColor="#A0B0AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus
            />
            {searchQuery !== "" && (
              <TouchableOpacity onPress={() => setSearchQuery("")} style={styles.clearSearchBtn}>
                <X size={20} color={colors.text} />
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <>
            <TouchableOpacity style={styles.backButton} onPress={onClose}>
              <ArrowLeft size={24} color={colors.text} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Tukarkan Poin Loyalty</Text>
            <View style={styles.headerRightActions}>
              <TouchableOpacity
                style={styles.headerIconBtn}
                onPress={() => {
                  setIsSearching(true);
                  setTimeout(() => searchInputRef.current?.focus(), 150);
                }}
              >
                <Search size={22} color={colors.text} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerIconBtn}>
                <HelpCircle size={22} color={colors.text} />
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* 2. Category Tab Filter Bar */}
        <View style={styles.categoryContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
            {["Semua", "Penawaran Khusus", "Makanan & Minuman", "Lainnya"].map((cat) => {
              const isActive = cat === activeCategory;
              return (
                <TouchableOpacity
                  key={cat}
                  style={isActive ? styles.categoryTabActive : styles.categoryTab}
                  onPress={() => {
                    setActiveCategory(cat);
                    setActiveTag("Semua");
                  }}
                >
                  {cat === "Semua" && (
                    <LayoutGrid size={14} color={isActive ? colors.teal : colors.muted} style={{ marginRight: 6 }} />
                  )}
                  {cat === "Penawaran Khusus" && (
                    <Tag size={14} color={isActive ? colors.teal : colors.muted} style={{ marginRight: 6 }} />
                  )}
                  {cat === "Makanan & Minuman" && (
                    <Coffee size={14} color={isActive ? colors.teal : colors.muted} style={{ marginRight: 6 }} />
                  )}
                  <Text style={isActive ? styles.categoryTabTextActive : styles.categoryTabText}>{cat}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          <TouchableOpacity style={styles.dropdownBtn} onPress={() => setShowCategorySheet(true)}>
            <ChevronDown size={16} color={colors.teal} />
          </TouchableOpacity>
        </View>

        {/* 3. Sub-filter tags bar */}
        <View style={styles.tagsContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tagsScroll}>
            {currentSubTags.map((tag) => {
              const isActive = tag === activeTag;
              return (
                <TouchableOpacity
                  key={tag}
                  style={isActive ? styles.tagActive : styles.tag}
                  onPress={() => setActiveTag(tag)}
                >
                  <Text style={isActive ? styles.tagTextActive : styles.tagText}>{tag}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* 4. Points Card (Loyalty balance container) */}
        <View style={styles.pointsCard}>
          <View style={styles.medalCircle}>
            <Text style={styles.medalEmoji}>🏅</Text>
          </View>
          <View style={styles.pointsInfo}>
            <Text style={styles.pointsLabel}>Kamu punya:</Text>
            <Text style={styles.pointsValue}>{formatNumber(user.kopoinBalance)} Poin Loyalty</Text>
          </View>
        </View>

        {/* 5. Section Title & Sort Button */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Tukar Poin Loyalty ke Kupon-Kupon Ini</Text>
          <TouchableOpacity style={styles.sortButton}>
            <SlidersHorizontal size={14} color={colors.teal} style={{ marginRight: 6 }} />
            <Text style={styles.sortText}>Urutkan</Text>
          </TouchableOpacity>
        </View>

        {/* 6. Coupons Two-Column Grid */}
        <View style={styles.gridContainer}>
          {filteredCoupons.length > 0 ? (
            filteredCoupons.map((item) => {
              const hasEnough = user.kopoinBalance >= item.points;
              const isRedeemed = redeemedCoupons.includes(item.id);

              return (
                <View key={item.id} style={styles.couponCard}>
                  {/* Image / Graphic Area */}
                  <View style={styles.cardImageArea}>
                    <Text style={styles.cardEmoji}>{item.emoji}</Text>
                    
                    {/* Sticker brand/merchant label */}
                    <View style={styles.brandSticker}>
                      <Text style={styles.brandStickerText}>Eat & Go</Text>
                    </View>
                  </View>

                  {/* Content Area */}
                  <View style={styles.cardContent}>
                    {/* Prices */}
                    <View style={styles.priceRow}>
                      <Text style={styles.originalPrice}>{item.originalPrice}</Text>
                      <Text style={styles.promoPrice}>{item.promoPrice} <Text style={styles.nett}>nett</Text></Text>
                    </View>

                    {/* Title */}
                    <Text style={styles.couponTitle} numberOfLines={2}>
                      {item.title}
                    </Text>

                    {/* Merchant Badge */}
                    <View style={styles.merchantBadge}>
                      <ShoppingBag size={12} color="#6C7A79" style={{ marginRight: 4 }} />
                      <Text style={styles.merchantText}>{item.merchant}</Text>
                    </View>

                    {/* Points requirement */}
                    <View style={styles.pointsPill}>
                      <Text style={styles.pointsPillText}>{item.points} Poin</Text>
                    </View>

                    {/* Action Button */}
                    <TouchableOpacity
                      style={[
                        isRedeemed
                          ? styles.redeemBtnSuccess
                          : hasEnough
                          ? styles.redeemBtn
                          : styles.redeemBtnDisabled
                      ]}
                      disabled={isRedeemed || !hasEnough}
                      onPress={() => handleRedeemClick(item)}
                    >
                      <Text
                        style={[
                          isRedeemed
                            ? styles.redeemBtnTextSuccess
                            : hasEnough
                            ? styles.redeemBtnText
                            : styles.redeemBtnTextDisabled
                        ]}
                      >
                        {isRedeemed ? "Sudah Ditukar" : "Tukar Poin"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })
          ) : (
            <View style={styles.noResultsBox}>
              <Text style={styles.noResultsEmoji}>🔍</Text>
              <Text style={styles.noResultsText}>Kupon tidak ditemukan</Text>
              <Text style={styles.noResultsSub}>Coba cari dengan kata kunci lain.</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* 7. Dialog Confirmation Modal */}
      <Modal visible={selectedCoupon !== null} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.dialogCard}>
            <Text style={styles.dialogTitle}>Konfirmasi Penukaran</Text>
            <Text style={styles.dialogBody}>
              Apakah kamu yakin ingin menukarkan{" "}
              <Text style={{ fontWeight: "900", color: colors.teal }}>
                {selectedCoupon?.points} Poin Loyalty
              </Text>{" "}
              untuk kupon:
            </Text>
            <View style={styles.dialogCouponBox}>
              <Text style={styles.dialogCouponEmoji}>{selectedCoupon?.emoji}</Text>
              <Text style={styles.dialogCouponTitle}>{selectedCoupon?.title}</Text>
            </View>
            <View style={styles.dialogButtons}>
              <TouchableOpacity style={styles.dialogCancelBtn} onPress={() => setSelectedCoupon(null)}>
                <Text style={styles.dialogCancelText}>Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dialogConfirmBtn} onPress={confirmRedeem}>
                <Text style={styles.dialogConfirmText}>Tukar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* 8. Success Feedback Modal */}
      <Modal visible={showSuccess} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.successCard}>
            <View style={styles.successIconCircle}>
              <Text style={styles.successIconEmoji}>🎉</Text>
            </View>
            <Text style={styles.successTitle}>Berhasil Ditukarkan!</Text>
            <Text style={styles.successBody}>
              Kupon kamu telah ditambahkan ke "Kupon aktif" di menu profil.
            </Text>
            <View style={styles.successDetailBox}>
              <Text style={styles.successDetailEmoji}>{successCoupon?.emoji}</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.successDetailTitle}>{successCoupon?.title}</Text>
                <Text style={styles.successDetailSub}>Potongan harga berhasil diaktifkan</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.successCloseBtn} onPress={() => setShowSuccess(false)}>
              <Text style={styles.successCloseText}>Lihat Kupon</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* 9. Category Bottom Sheet (Dialog Modal) */}
      <Modal
        visible={showCategorySheet}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowCategorySheet(false)}
      >
        <View style={styles.bottomSheetOverlay}>
          <TouchableOpacity
            style={styles.bottomSheetBackdrop}
            activeOpacity={1}
            onPress={() => setShowCategorySheet(false)}
          />
          <View style={styles.bottomSheetContainer}>
            {/* Grabber indicator */}
            <View style={styles.bottomSheetGrabber} />

            {/* Header */}
            <View style={styles.bottomSheetHeader}>
              <Text style={styles.bottomSheetTitle}>Kategori</Text>
              <TouchableOpacity onPress={() => setShowCategorySheet(false)} style={styles.bottomSheetCloseBtn}>
                <X size={20} color={colors.text} />
              </TouchableOpacity>
            </View>

            {/* Divider */}
            <View style={styles.bottomSheetDivider} />

            {/* Categories List */}
            <ScrollView contentContainerStyle={styles.bottomSheetList} showsVerticalScrollIndicator={false}>
              {sheetCategories.map((cat) => {
                const isSelected = activeCategory === cat.id;
                return (
                  <TouchableOpacity
                    key={cat.id}
                    style={[styles.bottomSheetItem, isSelected && styles.bottomSheetItemActive]}
                    onPress={() => {
                      setActiveCategory(cat.id);
                      setActiveTag("Semua");
                      setShowCategorySheet(false);
                    }}
                  >
                    <View style={[styles.bottomSheetItemIconCircle, isSelected && styles.bottomSheetItemIconCircleActive]}>
                      {cat.icon(isSelected ? colors.teal : colors.muted)}
                    </View>
                    <Text style={[styles.bottomSheetItemLabel, isSelected && styles.bottomSheetItemLabelActive]}>
                      {cat.label}
                    </Text>
                    {isSelected && (
                      <Check size={20} color={colors.teal} style={styles.checkIcon} />
                    )}
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
    backgroundColor: "#F4F7F6"
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    paddingTop: 48,
    paddingBottom: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderColor: colors.line,
    height: 98
  },
  searchBarHeader: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F4F3",
    borderRadius: 999,
    paddingLeft: 4,
    paddingRight: 10,
    height: 44
  },
  searchInputField: {
    flex: 1,
    height: "100%",
    fontSize: 14,
    fontWeight: "800",
    color: colors.text,
    paddingHorizontal: 8
  },
  clearSearchBtn: {
    padding: 6
  },
  backButton: {
    padding: 6
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: colors.text,
    flex: 1,
    marginLeft: 12
  },
  headerRightActions: {
    flexDirection: "row",
    gap: 12
  },
  headerIconBtn: {
    padding: 4
  },
  scrollContent: {
    paddingBottom: 40
  },
  categoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    paddingVertical: 12,
    paddingLeft: spacing.md,
    borderBottomWidth: 1,
    borderColor: colors.line
  },
  categoryScroll: {
    flexDirection: "row",
    gap: 10,
    paddingRight: 50
  },
  categoryTab: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "#F2F4F3"
  },
  categoryTabActive: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.teal
  },
  categoryTabText: {
    fontSize: 13,
    fontWeight: "800",
    color: colors.muted
  },
  categoryTabTextActive: {
    fontSize: 13,
    fontWeight: "900",
    color: colors.teal
  },
  dropdownBtn: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: 44,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    borderLeftWidth: 1,
    borderColor: colors.line,
    shadowColor: "#000",
    shadowOffset: { width: -4, height: 0 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2
  },
  tagsContainer: {
    paddingVertical: 12,
    paddingHorizontal: spacing.md,
    backgroundColor: "#F4F7F6"
  },
  tagsScroll: {
    flexDirection: "row",
    gap: 8
  },
  tag: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "#EAEDED"
  },
  tagActive: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "#E2ECE8",
    borderWidth: 1,
    borderColor: colors.teal
  },
  tagText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.muted
  },
  tagTextActive: {
    fontSize: 12,
    fontWeight: "900",
    color: colors.teal
  },
  pointsCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 999,
    marginHorizontal: spacing.md,
    marginTop: 6,
    marginBottom: 16,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderWidth: 1.5,
    borderColor: colors.line,
    shadowColor: "#24413D",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2
  },
  medalCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#FFF6DA",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12
  },
  medalEmoji: {
    fontSize: 20
  },
  pointsInfo: {
    flex: 1
  },
  pointsLabel: {
    fontSize: 11,
    color: colors.muted,
    fontWeight: "700"
  },
  pointsValue: {
    fontSize: 15,
    fontWeight: "900",
    color: colors.text,
    marginTop: 1
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    marginBottom: 12
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "900",
    color: colors.text,
    flex: 1,
    marginRight: 8
  },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1.5,
    borderColor: colors.teal,
    backgroundColor: colors.white
  },
  sortText: {
    fontSize: 12,
    fontWeight: "900",
    color: colors.teal
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: spacing.md,
    gap: spacing.md,
    justifyContent: "space-between"
  },
  couponCard: {
    width: CARD_WIDTH,
    backgroundColor: colors.white,
    borderRadius: 22,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.line,
    shadowColor: "#24413D",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 3,
    marginBottom: 4
  },
  cardImageArea: {
    height: CARD_WIDTH * 0.85,
    backgroundColor: "#F2F5F4",
    alignItems: "center",
    justifyContent: "center",
    position: "relative"
  },
  cardEmoji: {
    fontSize: 54
  },
  brandSticker: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "#202E2D",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6
  },
  brandStickerText: {
    color: colors.white,
    fontSize: 9,
    fontWeight: "900"
  },
  cardContent: {
    padding: 12,
    gap: 6
  },
  priceRow: {
    gap: 1
  },
  originalPrice: {
    fontSize: 10,
    color: colors.muted,
    textDecorationLine: "line-through",
    fontWeight: "700"
  },
  promoPrice: {
    fontSize: 14,
    fontWeight: "900",
    color: colors.text
  },
  nett: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.muted
  },
  couponTitle: {
    fontSize: 12,
    fontWeight: "800",
    color: colors.slate,
    lineHeight: 16,
    height: 32
  },
  merchantBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#F2F5F4",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 2
  },
  merchantText: {
    fontSize: 9,
    fontWeight: "800",
    color: colors.muted
  },
  pointsPill: {
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: colors.lineStrong,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 6,
    marginTop: 4
  },
  pointsPillText: {
    fontSize: 10,
    fontWeight: "800",
    color: colors.muted
  },
  redeemBtn: {
    marginTop: 8,
    width: "100%",
    paddingVertical: 10,
    backgroundColor: "#E4ECE9",
    borderRadius: 12,
    alignItems: "center"
  },
  redeemBtnDisabled: {
    marginTop: 8,
    width: "100%",
    paddingVertical: 10,
    backgroundColor: "#F2F4F3",
    borderRadius: 12,
    alignItems: "center",
    opacity: 0.6
  },
  redeemBtnSuccess: {
    marginTop: 8,
    width: "100%",
    paddingVertical: 10,
    backgroundColor: colors.teal,
    borderRadius: 12,
    alignItems: "center"
  },
  redeemBtnText: {
    fontSize: 12,
    fontWeight: "900",
    color: colors.teal
  },
  redeemBtnTextDisabled: {
    fontSize: 12,
    fontWeight: "900",
    color: colors.muted
  },
  redeemBtnTextSuccess: {
    fontSize: 12,
    fontWeight: "900",
    color: colors.white
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.md
  },
  dialogCard: {
    width: "90%",
    backgroundColor: colors.white,
    borderRadius: radii.lg,
    padding: spacing.lg,
    alignItems: "center",
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 14,
    elevation: 10
  },
  dialogTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: colors.text
  },
  dialogBody: {
    fontSize: 14,
    color: colors.muted,
    textAlign: "center",
    lineHeight: 20
  },
  dialogCouponBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F5F4",
    padding: 12,
    borderRadius: radii.md,
    gap: 10,
    width: "100%",
    marginTop: 8
  },
  dialogCouponEmoji: {
    fontSize: 32
  },
  dialogCouponTitle: {
    flex: 1,
    fontSize: 13,
    fontWeight: "800",
    color: colors.text
  },
  dialogButtons: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
    marginTop: 16
  },
  dialogCancelBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: radii.md,
    borderWidth: 1.5,
    borderColor: colors.lineStrong
  },
  dialogCancelText: {
    fontSize: 14,
    fontWeight: "900",
    color: colors.muted
  },
  dialogConfirmBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: radii.md,
    backgroundColor: colors.teal
  },
  dialogConfirmText: {
    fontSize: 14,
    fontWeight: "900",
    color: colors.white
  },
  successCard: {
    width: "90%",
    backgroundColor: colors.white,
    borderRadius: radii.lg,
    padding: spacing.lg,
    alignItems: "center",
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 14,
    elevation: 10
  },
  successIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#EAFBF7",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8
  },
  successIconEmoji: {
    fontSize: 32
  },
  successTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: colors.teal
  },
  successBody: {
    fontSize: 14,
    color: colors.muted,
    textAlign: "center",
    lineHeight: 20
  },
  successDetailBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EAFBF7",
    padding: 12,
    borderRadius: radii.md,
    gap: 10,
    width: "100%",
    marginTop: 8
  },
  successDetailEmoji: {
    fontSize: 32
  },
  successDetailTitle: {
    fontSize: 13,
    fontWeight: "900",
    color: colors.text
  },
  successDetailSub: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.turquoise,
    marginTop: 2
  },
  successCloseBtn: {
    width: "100%",
    paddingVertical: 14,
    alignItems: "center",
    borderRadius: radii.md,
    backgroundColor: colors.teal,
    marginTop: 16
  },
  successCloseText: {
    fontSize: 14,
    fontWeight: "900",
    color: colors.white
  },
  noResultsBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 48,
    width: "100%"
  },
  noResultsEmoji: {
    fontSize: 48,
    marginBottom: 12
  },
  noResultsText: {
    fontSize: 16,
    fontWeight: "900",
    color: colors.text
  },
  noResultsSub: {
    fontSize: 13,
    color: colors.muted,
    marginTop: 4
  },
  // Bottom Sheet (Dialog Modal) Styles
  bottomSheetOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end"
  },
  bottomSheetBackdrop: {
    ...StyleSheet.absoluteFillObject
  },
  bottomSheetContainer: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: spacing.md,
    paddingBottom: 40,
    maxHeight: "80%"
  },
  bottomSheetGrabber: {
    width: 40,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: "#D0DED9",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 14
  },
  bottomSheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 14
  },
  bottomSheetTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: colors.text
  },
  bottomSheetCloseBtn: {
    padding: 4
  },
  bottomSheetDivider: {
    height: 1,
    backgroundColor: colors.line,
    marginHorizontal: -spacing.md
  },
  bottomSheetList: {
    paddingVertical: 8
  },
  bottomSheetItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 14,
    marginVertical: 2
  },
  bottomSheetItemActive: {
    backgroundColor: "#EAFBF7" // Highlight row matching category selection
  },
  bottomSheetItemIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#F2F4F3",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14
  },
  bottomSheetItemIconCircleActive: {
    backgroundColor: colors.white
  },
  bottomSheetItemLabel: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.slate,
    flex: 1
  },
  bottomSheetItemLabelActive: {
    color: colors.teal,
    fontWeight: "900"
  },
  checkIcon: {
    marginLeft: 10
  }
});
