import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
  Image,
  Modal
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Svg, { Circle, Path } from "react-native-svg";
import {
  ChevronLeft,
  Plus,
  Minus,
  ArrowRight,
  Search,
  CheckCircle2
} from "lucide-react-native";
import { colors, radii, spacing } from "../theme";
import { formatRupiah } from "../utils/formatters";

// Mock Svg illustration components for Shutterstock-like clean styling
const TomatoSvg = () => (
  <Svg width="70" height="70" viewBox="0 0 60 60">
    <Circle cx="30" cy="33" r="18" fill="#EF4444" />
    <Path d="M30 15 C28 10 32 10 30 15" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />
    <Path d="M26 14 C28 17 32 17 34 14" fill="none" stroke="#10B981" strokeWidth="2.5" />
    <Circle cx="24" cy="28" r="3" fill="#FF8A8A" opacity="0.6" />
  </Svg>
);

const LemonSvg = () => (
  <Svg width="70" height="70" viewBox="0 0 60 60">
    <Path d="M 18 30 C 18 20, 42 20, 42 30 C 42 40, 18 40, 18 30" fill="#FBBF24" />
    <Path d="M 15 30 C 13 30, 15 28, 18 30 Z" fill="#FBBF24" />
    <Path d="M 42 30 C 45 30, 43 32, 42 30 Z" fill="#FBBF24" />
    <Path d="M 33 22 C 34 18, 38 18, 35 22" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" />
    <Circle cx="32" cy="27" r="2" fill="#FFE082" opacity="0.8" />
  </Svg>
);

const GarlicSvg = () => (
  <Svg width="70" height="70" viewBox="0 0 60 60">
    <Path d="M 20 38 C 20 28, 25 24, 30 20 C 35 24, 40 28, 40 38 C 40 45, 20 45, 20 38 Z" fill="#F3F4F6" stroke="#E5E7EB" strokeWidth="1" />
    <Path d="M 30 20 Q 30 35 30 43" fill="none" stroke="#E5E7EB" strokeWidth="1.5" />
    <Path d="M 30 20 Q 25 35 23 41" fill="none" stroke="#E5E7EB" strokeWidth="1.5" />
    <Path d="M 30 20 Q 35 35 37 41" fill="none" stroke="#E5E7EB" strokeWidth="1.5" />
    <Path d="M 28 44 Q 30 46 32 44" fill="none" stroke="#D1D5DB" strokeWidth="2" />
  </Svg>
);

const OnionSvg = () => (
  <Svg width="70" height="70" viewBox="0 0 60 60">
    <Path d="M 20 36 C 20 25, 30 16, 30 16 C 30 16, 40 25, 40 36 C 40 44, 20 44, 20 36 Z" fill="#A855F7" />
    <Path d="M 30 16 Q 30 10 30 8" fill="none" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" />
    <Path d="M 29 16 Q 26 12 24 10" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" />
    <Path d="M 31 16 Q 34 12 36 10" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" />
    <Path d="M 27 43 Q 30 45 33 43" fill="none" stroke="#F59E0B" strokeWidth="2" />
  </Svg>
);

const PotatoSvg = () => (
  <Svg width="70" height="70" viewBox="0 0 60 60">
    <Path d="M 18 30 C 18 22, 42 24, 42 30 C 42 37, 18 38, 18 30 Z" fill="#D97706" />
    <Circle cx="24" cy="27" r="1.5" fill="#78350F" opacity="0.6" />
    <Circle cx="35" cy="33" r="1" fill="#78350F" opacity="0.6" />
    <Circle cx="29" cy="34" r="1.2" fill="#78350F" opacity="0.6" />
    <Circle cx="32" cy="26" r="1.5" fill="#78350F" opacity="0.6" />
  </Svg>
);

const CarrotSvg = () => (
  <Svg width="70" height="70" viewBox="0 0 60 60">
    <Path d="M 16 16 L 38 38 C 42 42, 45 42, 47 40 C 49 38, 49 35, 45 31 L 23 9 Z" fill="#F97316" />
    <Path d="M 16 16 C 14 14, 10 16, 8 12" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" />
    <Path d="M 16 16 C 15 13, 14 8, 10 6" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" />
    <Path d="M 16 16 C 18 14, 18 10, 16 6" fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" />
    <Path d="M 22 21 Q 25 19 28 22" fill="none" stroke="#EA580C" strokeWidth="1.5" />
    <Path d="M 29 28 Q 32 26 35 29" fill="none" stroke="#EA580C" strokeWidth="1.5" />
  </Svg>
);

const BreadSvg = () => (
  <Svg width="70" height="70" viewBox="0 0 60 60">
    <Path d="M12 35 C12 22, 48 22, 48 35 C48 42, 12 42, 12 35" fill="#D97706" />
    <Path d="M16 28 C20 18, 40 18, 44 28" fill="#F59E0B" />
    <Path d="M22 26 L26 32" stroke="#B45309" strokeWidth="2" strokeLinecap="round" />
    <Path d="M29 25 L33 31" stroke="#B45309" strokeWidth="2" strokeLinecap="round" />
    <Path d="M36 26 L39 31" stroke="#B45309" strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

const MilkSvg = () => (
  <Svg width="70" height="70" viewBox="0 0 60 60">
    <Path d="M22 45 L22 24 L38 24 L38 45 Z" fill="#F3F4F6" stroke="#E5E7EB" strokeWidth="1" />
    <Path d="M24 24 L27 15 L33 15 L36 24 Z" fill="#E5E7EB" />
    <Rect x="28" y="10" width="4" height="5" fill="#EF4444" rx="1" />
    <Path d="M22 30 H38 V36 H22 Z" fill="#3B82F6" />
    <Circle cx="30" cy="33" r="2" fill="#FFFFFF" />
  </Svg>
);

// Svg self-closing Rect helper to prevent react-native-web parser issue
function Rect({ x, y, width, height, fill, rx }: any) {
  return <Path d={`M ${x} ${y} h ${width} v ${height} h -${width} Z`} fill={fill} />;
}

type Product = {
  id: string;
  name: string;
  category: "fruits_veg" | "dairy_bread" | "drinks" | "grains";
  price: number;
  unit: string;
  renderSvg: () => React.ReactNode;
};

const PRODUCTS: Product[] = [
  {
    id: "tomato",
    name: "fresh tomato hybrid",
    category: "fruits_veg",
    price: 32000,
    unit: "1 kg",
    renderSvg: () => <TomatoSvg />
  },
  {
    id: "lemon",
    name: "international fresh organic lemon",
    category: "fruits_veg",
    price: 20000,
    unit: "250 g",
    renderSvg: () => <LemonSvg />
  },
  {
    id: "garlic",
    name: "naturally grown garlic",
    category: "fruits_veg",
    price: 24000,
    unit: "100 g",
    renderSvg: () => <GarlicSvg />
  },
  {
    id: "onion",
    name: "international fresh organic onion",
    category: "fruits_veg",
    price: 30000,
    unit: "1 kg",
    renderSvg: () => <OnionSvg />
  },
  {
    id: "potato",
    name: "fresh produce potato - premium",
    category: "fruits_veg",
    price: 20000,
    unit: "1 kg",
    renderSvg: () => <PotatoSvg />
  },
  {
    id: "carrot",
    name: "fresh red local carrot",
    category: "fruits_veg",
    price: 42000,
    unit: "1 kg",
    renderSvg: () => <CarrotSvg />
  },
  {
    id: "bread",
    name: "roti tawar gandum kampung",
    category: "dairy_bread",
    price: 15000,
    unit: "1 pack",
    renderSvg: () => <BreadSvg />
  },
  {
    id: "milk",
    name: "susu segar murni desa",
    category: "dairy_bread",
    price: 18000,
    unit: "1 L",
    renderSvg: () => <MilkSvg />
  }
];

type GroceryScreenProps = {
  user: any;
  onClose: () => void;
};

export function GroceryScreen({ user, onClose }: GroceryScreenProps) {
  const [screenState, setScreenState] = useState<"browse" | "checkout">("browse");
  const [activeCategory, setActiveCategory] = useState<"fruits_veg" | "dairy_bread" | "drinks" | "grains">("fruits_veg");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [showCheckoutSuccess, setShowCheckoutSuccess] = useState(false);

  const categories = [
    { id: "fruits_veg", label: "fruits & vegetables", emoji: "🥦" },
    { id: "dairy_bread", label: "dairy, eggs & bread", emoji: "🍞" },
    { id: "drinks", label: "cold drinks & juices", emoji: "🥤" },
    { id: "grains", label: "atta, rice & daal", emoji: "🌾" }
  ];

  const filteredProducts = PRODUCTS.filter((p) => p.category === activeCategory);

  const updateCart = (id: string, delta: number) => {
    setCart((prev) => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      const updated = { ...prev };
      if (next === 0) {
        delete updated[id];
      } else {
        updated[id] = next;
      }
      return updated;
    });
  };

  const getCartTotalItems = () => {
    return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  };

  const getCartTotalPrice = () => {
    return PRODUCTS.reduce((sum, p) => {
      const qty = cart[p.id] || 0;
      return sum + qty * p.price;
    }, 0);
  };

  const handleCheckout = () => {
    setShowCheckoutSuccess(true);
  };

  const handleFinishCheckout = () => {
    setCart({});
    setScreenState("browse");
    setShowCheckoutSuccess(false);
    onClose();
  };

  // List of items in the cart
  const cartItems = PRODUCTS.filter((p) => (cart[p.id] || 0) > 0);

  const getCartItemSvgs = (): (() => React.ReactNode)[] => {
    return PRODUCTS.filter((p) => (cart[p.id] || 0) > 0).map((p) => p.renderSvg);
  };

  // If screenState is "checkout", render the checkout screen
  if (screenState === "checkout") {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />
        
        {/* Checkout Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => setScreenState("browse")} activeOpacity={0.7}>
            <ChevronLeft size={24} color={colors.text} />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Checkout</Text>
            <Text style={styles.headerSub}>Desa Merah Putih</Text>
          </View>
          <View style={{ width: 36 }} /> {/* Balance space */}
        </View>

        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView} contentContainerStyle={{ paddingBottom: 120 }}>
          {/* List of checkout items */}
          <View style={styles.checkoutListCard}>
            {cartItems.map((item) => {
              const qty = cart[item.id] || 0;
              return (
                <View key={item.id} style={styles.checkoutItemRow}>
                  <View style={styles.checkoutItemLeft}>
                    <View style={styles.checkoutItemImgBox}>
                      {item.renderSvg()}
                    </View>
                    <View style={styles.checkoutItemDetails}>
                      <Text style={styles.checkoutItemName}>{item.name}</Text>
                      <Text style={styles.checkoutItemUnit}>{item.unit}</Text>
                      <Text style={styles.checkoutItemPrice}>{formatRupiah(item.price)}</Text>
                    </View>
                  </View>
                  <View style={styles.checkoutQtyControl}>
                    <TouchableOpacity style={styles.checkoutQtyBtn} onPress={() => updateCart(item.id, -1)} activeOpacity={0.8}>
                      <Minus size={14} color="#FFFFFF" />
                    </TouchableOpacity>
                    <Text style={styles.checkoutQtyText}>{qty}</Text>
                    <TouchableOpacity style={styles.checkoutQtyBtn} onPress={() => updateCart(item.id, 1)} activeOpacity={0.8}>
                      <Plus size={14} color="#FFFFFF" />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </View>

          {/* Bill details */}
          <View style={styles.billDetailsCard}>
            <Text style={styles.billDetailsTitle}>bill details</Text>
            <View style={styles.billRow}>
              <Text style={[styles.billLabel, { fontWeight: "900", color: colors.text }]}>bill total</Text>
              <Text style={[styles.billValue, { fontWeight: "900", fontSize: 16, color: colors.text }]}>{formatRupiah(getCartTotalPrice())}</Text>
            </View>
          </View>
        </ScrollView>

        {/* Floating bottom Checkout button */}
        <View style={styles.floatingCartContainer}>
          <TouchableOpacity
            style={styles.floatingCartBar}
            onPress={handleCheckout}
            activeOpacity={0.9}
          >
            <View style={styles.checkoutCartLeft}>
              <Text style={styles.cartPriceText}>{formatRupiah(getCartTotalPrice())}</Text>
            </View>
            <View style={[styles.cartMiddle, { alignItems: "center" }]}>
              <Text style={[styles.cartDeliveryText, { color: "#FFFFFF", fontSize: 13, fontWeight: "900" }]}>delivery in 10 minutes</Text>
            </View>
            <View style={styles.cartRight}>
              <ArrowRight size={22} color={colors.white} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Checkout Success Modal */}
        <Modal visible={showCheckoutSuccess} transparent animationType="slide">
          <View style={styles.modalBackdrop}>
            <View style={styles.modalCard}>
              <View style={styles.successIconHeader}>
                <CheckCircle2 size={54} color="#0F6B63" />
              </View>
              <Text style={styles.modalTitle}>Pesanan Berhasil!</Text>
              <Text style={styles.modalSubtitle}>
                Terima kasih, {user?.name || "Tamu"}. Pesanan Anda sedang diproses oleh Koperasi Desa Merah Putih.
              </Text>
              
              <View style={styles.receiptBox}>
                <Text style={styles.receiptTitle}>Ringkasan Belanja</Text>
                <View style={styles.receiptRow}>
                  <Text style={styles.receiptLabel}>Total Belanja</Text>
                  <Text style={styles.receiptValue}>{formatRupiah(getCartTotalPrice())}</Text>
                </View>
                <View style={[styles.receiptRow, { borderTopWidth: 1, borderTopColor: "#E5E7EB", paddingTop: 8, marginTop: 4 }]}>
                  <Text style={[styles.receiptLabel, { fontWeight: "900" }]}>Total Tagihan</Text>
                  <Text style={[styles.receiptValue, { fontWeight: "900" }]}>{formatRupiah(getCartTotalPrice())}</Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.modalCloseBtn}
                onPress={handleFinishCheckout}
                activeOpacity={0.8}
              >
                <Text style={styles.modalCloseBtnText}>KEMBALI KE BERANDA</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }

  // Browse category layout
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      {/* Header bar */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={onClose} activeOpacity={0.7}>
          <ChevronLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Kopoin Mart</Text>
          <Text style={styles.headerSub}>Desa Merah Putih</Text>
        </View>
        <TouchableOpacity style={styles.searchBtn} activeOpacity={0.7}>
          <Search size={22} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Main content ScrollView */}
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Category Horizontal list */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryContainer}
          style={styles.categoryScroll}
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <TouchableOpacity
                key={cat.id}
                style={[styles.categoryItem, isActive && styles.categoryItemActive]}
                onPress={() => {
                  setActiveCategory(cat.id as any);
                }}
                activeOpacity={0.8}
              >
                <View style={[styles.categoryCircle, isActive && styles.categoryCircleActive]}>
                  <Text style={styles.categoryEmoji}>{cat.emoji}</Text>
                </View>
                <Text style={[styles.categoryText, isActive && styles.categoryTextActive]}>
                  {cat.label}
                </Text>
                {isActive && <View style={styles.activeBarIndicator} />}
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Product Grid container */}
        <View style={styles.divider} />
        <View style={styles.gridWrapper}>
          {filteredProducts.length > 0 ? (
            <View style={styles.productGrid}>
              {filteredProducts.map((prod) => {
                const qty = cart[prod.id] || 0;
                return (
                  <View key={prod.id} style={styles.productCard}>
                    <View style={styles.imageBox}>
                      {prod.renderSvg()}
                      {qty === 0 ? (
                        <TouchableOpacity
                          style={styles.addBtnCircle}
                          onPress={() => updateCart(prod.id, 1)}
                          activeOpacity={0.8}
                        >
                          <Plus size={16} color="#0F6B63" />
                        </TouchableOpacity>
                      ) : (
                        <View style={styles.qtyControlBox}>
                          <TouchableOpacity
                            style={styles.qtyBtn}
                            onPress={() => updateCart(prod.id, -1)}
                            activeOpacity={0.8}
                          >
                            <Minus size={12} color="#0F6B63" />
                          </TouchableOpacity>
                          <Text style={styles.qtyText}>{qty}</Text>
                          <TouchableOpacity
                            style={styles.qtyBtn}
                            onPress={() => updateCart(prod.id, 1)}
                            activeOpacity={0.8}
                          >
                            <Plus size={12} color="#0F6B63" />
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                    <View style={styles.productInfo}>
                      <Text style={styles.productPrice}>{formatRupiah(prod.price)}</Text>
                      <Text style={styles.productName} numberOfLines={2}>
                        {prod.name}
                      </Text>
                      <Text style={styles.productUnit}>{prod.unit}</Text>
                    </View>
                  </View>
                );
              })}
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Produk kosong di kategori ini.</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Floating Bottom Cart Bar */}
      {getCartTotalItems() > 0 ? (
        <View style={styles.floatingCartContainer}>
          <TouchableOpacity
            style={styles.floatingCartBar}
            onPress={() => setScreenState("checkout")}
            activeOpacity={0.9}
          >
            <View style={styles.cartLeft}>
              {/* Stacked icons illustration */}
              <View style={styles.cartStackContainer}>
                {getCartItemSvgs().slice(0, 3).map((renderSvg, index) => (
                  <View
                    key={index}
                    style={[
                      styles.cartStackIconCircle,
                      { left: index * 16, zIndex: 10 - index }
                    ]}
                  >
                    {renderSvg()}
                  </View>
                ))}
              </View>
            </View>
            <View style={styles.cartMiddle}>
              <Text style={styles.checkoutCartLeftText}>{formatRupiah(getCartTotalPrice())}</Text>
              <Text style={styles.cartDeliveryText}>pengiriman desa 10 menit • {getCartTotalItems()} barang</Text>
            </View>
            <View style={styles.cartRight}>
              <ArrowRight size={22} color={colors.white} />
            </View>
          </TouchableOpacity>
        </View>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    backgroundColor: colors.white
  },
  backBtn: {
    padding: 6,
    borderRadius: 999,
    backgroundColor: "#F9FAFB"
  },
  headerTitleContainer: {
    alignItems: "center",
    flex: 1
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: colors.text
  },
  headerSub: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.muted
  },
  searchBtn: {
    padding: 8,
    borderRadius: 999,
    backgroundColor: "#F9FAFB"
  },
  scrollView: {
    flex: 1
  },
  categoryScroll: {
    marginVertical: 12
  },
  categoryContainer: {
    paddingHorizontal: 12,
    flexDirection: "row",
    gap: 16
  },
  categoryItem: {
    alignItems: "center",
    width: 76,
    position: "relative"
  },
  categoryItemActive: {
    // Styling active item
  },
  categoryCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6
  },
  categoryCircleActive: {
    backgroundColor: "#E6F8F5"
  },
  categoryEmoji: {
    fontSize: 22
  },
  categoryText: {
    fontSize: 10,
    fontWeight: "700",
    textAlign: "center",
    color: "#6B7280",
    lineHeight: 13
  },
  categoryTextActive: {
    color: "#0F6B63",
    fontWeight: "900"
  },
  activeBarIndicator: {
    height: 3,
    backgroundColor: "#0F6B63",
    position: "absolute",
    bottom: -10,
    width: "100%",
    borderRadius: 99
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginTop: 10,
    marginHorizontal: 16
  },
  gridWrapper: {
    paddingHorizontal: 16,
    paddingBottom: 100,
    marginTop: 16
  },
  productGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },
  productCard: {
    width: "48%",
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#F3F4F6",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
    marginBottom: 12
  },
  imageBox: {
    height: 100,
    borderRadius: 12,
    backgroundColor: "#F9FAFB",
    alignItems: "center",
    justifyContent: "center",
    position: "relative"
  },
  addBtnCircle: {
    position: "absolute",
    bottom: 6,
    right: 6,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2
  },
  qtyControlBox: {
    position: "absolute",
    bottom: 6,
    right: 6,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#0F6B63",
    paddingHorizontal: 4,
    paddingVertical: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2
  },
  qtyBtn: {
    padding: 4
  },
  qtyText: {
    fontSize: 12,
    fontWeight: "900",
    color: "#0F6B63",
    paddingHorizontal: 6
  },
  productInfo: {
    marginTop: 8,
    paddingHorizontal: 2
  },
  productPrice: {
    fontSize: 15,
    fontWeight: "900",
    color: colors.text
  },
  productName: {
    fontSize: 12,
    fontWeight: "700",
    color: "#4B5563",
    marginTop: 2,
    height: 32,
    lineHeight: 16
  },
  productUnit: {
    fontSize: 10,
    fontWeight: "800",
    color: colors.muted,
    marginTop: 2
  },
  emptyContainer: {
    paddingVertical: 60,
    alignItems: "center"
  },
  emptyText: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: "700"
  },
  floatingCartContainer: {
    position: "absolute",
    bottom: 24,
    left: 16,
    right: 16,
    zIndex: 99
  },
  floatingCartBar: {
    backgroundColor: "#000000",
    borderRadius: 999,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8
  },
  cartLeft: {
    width: 65,
    position: "relative"
  },
  cartStackContainer: {
    flexDirection: "row",
    position: "relative"
  },
  cartStackIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: -16,
    borderWidth: 1,
    borderColor: "#FFFFFF"
  },
  cartMiddle: {
    flex: 1,
    paddingLeft: 6
  },
  cartPriceText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "900"
  },
  checkoutCartLeftText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "900"
  },
  cartDeliveryText: {
    color: "#A1A1AA",
    fontSize: 10,
    fontWeight: "700",
    marginTop: 1
  },
  cartRight: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#10B981", // Emerald green color instead of red
    alignItems: "center",
    justifyContent: "center",
    marginRight: 2
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end"
  },
  modalCard: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    alignItems: "center",
    width: "100%"
  },
  successIconHeader: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#E6F8F5",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: colors.text,
    textAlign: "center"
  },
  modalSubtitle: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.muted,
    textAlign: "center",
    marginTop: 8,
    lineHeight: 20
  },
  receiptBox: {
    width: "100%",
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    padding: 16,
    marginVertical: 20
  },
  receiptTitle: {
    fontSize: 14,
    fontWeight: "900",
    color: colors.text,
    marginBottom: 12
  },
  receiptRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8
  },
  receiptLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#4B5563"
  },
  receiptValue: {
    fontSize: 13,
    fontWeight: "900",
    color: colors.text
  },
  modalCloseBtn: {
    backgroundColor: "#0F6B63",
    borderRadius: 999,
    paddingVertical: 16,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12
  },
  modalCloseBtnText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 0.5
  },

  // Checkout Styles
  checkoutListCard: {
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    marginTop: 8
  },
  checkoutItemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1.2,
    borderBottomColor: "#F3F4F6"
  },
  checkoutItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 12
  },
  checkoutItemImgBox: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: "#F9FAFB",
    alignItems: "center",
    justifyContent: "center"
  },
  checkoutItemDetails: {
    marginLeft: 12,
    flex: 1
  },
  checkoutItemName: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.text
  },
  checkoutItemUnit: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.muted,
    marginTop: 2
  },
  checkoutItemPrice: {
    fontSize: 13,
    fontWeight: "900",
    color: colors.text,
    marginTop: 4
  },
  checkoutQtyControl: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#10B981", // Emerald green color instead of red
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 4
  },
  checkoutQtyBtn: {
    padding: 6
  },
  checkoutQtyText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "900",
    marginHorizontal: 10
  },
  billDetailsCard: {
    backgroundColor: colors.white,
    padding: 16,
    marginTop: 12,
    borderTopWidth: 6,
    borderTopColor: "#F3F4F6"
  },
  billDetailsTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: colors.text,
    textTransform: "lowercase",
    marginBottom: 12
  },
  billRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6
  },
  billLabel: {
    fontSize: 14,
    color: colors.muted,
    fontWeight: "700"
  },
  billValue: {
    fontSize: 14,
    color: colors.text,
    fontWeight: "800"
  },
  checkoutCartLeft: {
    minWidth: 125, // Expanded minimum width to completely prevent price wrapping (e.g. Rp128.000 stays in one line)
    justifyContent: "center"
  }
});
