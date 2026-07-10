import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
  Modal,
  Switch,
  StatusBar
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import {
  Eye,
  EyeOff,
  Gift,
  ChevronRight
} from "lucide-react-native";
import { colors, radii, spacing } from "../theme";
import { formatNumber } from "../utils/formatters";
import type { User } from "../data/kopoinSeed";

type QRCodeMemberScreenProps = {
  user: User;
  onClose: () => void;
  onOpenReferral: () => void;
};

export function QRCodeMemberScreen({ user, onClose, onOpenReferral }: QRCodeMemberScreenProps) {
  const [poinCashActive, setPoinCashActive] = useState(false);
  const [showBalances, setShowBalances] = useState(true);
  
  // Payment methods states
  const [isakuLinked, setIsakuLinked] = useState(false);
  const [ovoLinked, setOvoLinked] = useState(false);
  const [gopayActive, setGopayActive] = useState(false);
  const [binadigitalActive, setBinadigitalActive] = useState(false);

  // Success Payment Modal
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);

  const canPay = gopayActive || binadigitalActive || isakuLinked || ovoLinked;

  const handlePay = () => {
    if (!canPay) return;
    setShowPaymentSuccess(true);
  };

  return (
    <View style={styles.container}>
      {/* 1. Header (Premium flat matching the design) */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>QR Code Member</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* 2. QR Code Card Container (Full width, flat styling) */}
        <View style={styles.qrCard}>
          <View style={styles.qrFrame}>
            {/* Dynamic QR Code from library using user's member number */}
            <QRCode
              value={user.memberNo || "KMP-SKM-0001"}
              size={180}
              color={colors.text}
              backgroundColor={colors.white}
            />
          </View>

          <Text style={styles.qrDescription}>
            Tunjukkan QR Code ke kasir sebelum transaksi untuk mendapatkan semua promo khusus member Koperasi.
          </Text>
        </View>

        {/* NEW: Ajak Teman CTA Banner (Polished Gradient Promo Card) */}
        <TouchableOpacity
          style={styles.referralCtaBanner}
          onPress={onOpenReferral}
          activeOpacity={0.8}
        >
          <View style={styles.referralCtaLeft}>
            <View style={styles.referralCtaIconCircle}>
              <Gift size={20} color={colors.white} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.referralCtaTitle}>Ajak Teman & Dapatkan Hadiah!</Text>
              <Text style={styles.referralCtaSub}>Dapatkan 25.000 Poin Cash gratis 🎁</Text>
            </View>
          </View>
          <ChevronRight size={18} color={colors.teal} />
        </TouchableOpacity>

        {/* 3. Gunakan Poin Cash (Full width flat layout) */}
        <View style={styles.sectionPoin}>
          <View style={styles.sectionLabelWrapper}>
            <Text style={styles.sectionLabel}>Gunakan Poin Cash Untuk Pembayaran</Text>
          </View>
          <View style={styles.poinRowCard}>
            <View style={styles.poinCardLeft}>
              <View style={styles.coinBadge}>
                <Text style={styles.coinEmoji}>🪙</Text>
              </View>
              <Text style={styles.poinText}>
                Poin Cash: <Text style={styles.poinValue}>{poinCashActive ? formatNumber(user.kopoinBalance) : 0}</Text>
              </Text>
            </View>
            <TouchableOpacity
              style={[styles.aktifkanBtn, poinCashActive && styles.aktifkanBtnActive]}
              onPress={() => setPoinCashActive(!poinCashActive)}
            >
              <Text style={[styles.aktifkanBtnText, poinCashActive && styles.aktifkanBtnTextActive]}>
                {poinCashActive ? "Aktif" : "Aktifkan"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 4. Pilih Metode Pembayaran (Full width flat list style exactly like screenshot) */}
        <View style={styles.sectionPayment}>
          <View style={styles.sectionPaymentHeader}>
            <Text style={styles.sectionTitle}>Pilih Metode Pembayaran</Text>
            <TouchableOpacity style={styles.saldoToggle} onPress={() => setShowBalances(!showBalances)}>
              {showBalances ? (
                <Eye size={16} color={colors.muted} />
              ) : (
                <EyeOff size={16} color={colors.muted} />
              )}
              <Text style={styles.saldoToggleText}>Saldo</Text>
            </TouchableOpacity>
          </View>

          {/* Payment List - Flat design spanning 100% width */}
          <View style={styles.paymentList}>
            {/* i.saku */}
            <View style={styles.paymentRow}>
              <View style={styles.paymentRowLeft}>
                <View style={[styles.paymentLogoCircle, { backgroundColor: "#E6F3FF" }]}>
                  <Text style={[styles.logoText, { color: "#007AFF" }]}>i</Text>
                </View>
                <View>
                  <Text style={styles.paymentName}>i.saku</Text>
                  {isakuLinked && (
                    <Text style={styles.paymentBalance}>
                      {showBalances ? "Rp 24.500" : "••••••"}
                    </Text>
                  )}
                </View>
              </View>
              <TouchableOpacity
                style={[styles.linkBtn, isakuLinked && styles.linkBtnActive]}
                onPress={() => setIsakuLinked(!isakuLinked)}
              >
                <Text style={[styles.linkBtnText, isakuLinked && styles.linkBtnTextActive]}>
                  {isakuLinked ? "Terhubung" : "Hubungkan"}
                </Text>
              </TouchableOpacity>
            </View>

            {/* OVO */}
            <View style={styles.paymentRow}>
              <View style={styles.paymentRowLeft}>
                <View style={[styles.paymentLogoCircle, { backgroundColor: "#F3EFFF" }]}>
                  <Text style={[styles.logoText, { color: "#7F3FBF" }]}>O</Text>
                </View>
                <View>
                  <Text style={styles.paymentName}>OVO</Text>
                  {ovoLinked && (
                    <Text style={styles.paymentBalance}>
                      {showBalances ? "Rp 150.000" : "••••••"}
                    </Text>
                  )}
                </View>
              </View>
              <TouchableOpacity
                style={[styles.linkBtn, ovoLinked && styles.linkBtnActive]}
                onPress={() => setOvoLinked(!ovoLinked)}
              >
                <Text style={[styles.linkBtnText, ovoLinked && styles.linkBtnTextActive]}>
                  {ovoLinked ? "Terhubung" : "Hubungkan"}
                </Text>
              </TouchableOpacity>
            </View>

            {/* gopay */}
            <View style={styles.paymentRow}>
              <View style={styles.paymentRowLeft}>
                <View style={[styles.paymentLogoCircle, { backgroundColor: "#EAFBF7" }]}>
                  <Text style={[styles.logoText, { color: colors.teal }]}>g</Text>
                </View>
                <View>
                  <Text style={styles.paymentName}>gopay</Text>
                  <Text style={styles.paymentBalance}>
                    {showBalances ? "Rp 85.000" : "••••••"}
                  </Text>
                </View>
              </View>
              <Switch
                trackColor={{ false: "#D1D5DB", true: colors.teal }}
                thumbColor={colors.white}
                onValueChange={setGopayActive}
                value={gopayActive}
              />
            </View>

            {/* Binadigital */}
            <View style={styles.paymentRow}>
              <View style={styles.paymentRowLeft}>
                <View style={[styles.paymentLogoCircle, { backgroundColor: "#FDF0F0" }]}>
                  <Text style={[styles.logoText, { color: colors.danger }]}>B</Text>
                </View>
                <View>
                  <Text style={styles.paymentName}>Binadigital</Text>
                  <Text style={styles.paymentBalance}>
                    {showBalances ? "Rp 200.000" : "••••••"}
                  </Text>
                </View>
              </View>
              <Switch
                trackColor={{ false: "#D1D5DB", true: colors.teal }}
                thumbColor={colors.white}
                onValueChange={setBinadigitalActive}
                value={binadigitalActive}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* 5. Footer (Edge-to-edge blue pay button) */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.payBtn, canPay ? styles.payBtnActive : styles.payBtnDisabled]}
          disabled={!canPay}
          onPress={handlePay}
        >
          <Text style={[styles.payBtnText, canPay ? styles.payBtnTextActive : styles.payBtnTextDisabled]}>
            BAYAR
          </Text>
        </TouchableOpacity>
      </View>

      {/* 6. Success Payment Modal */}
      <Modal visible={showPaymentSuccess} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.successCard}>
            <View style={styles.successIconCircle}>
              <Text style={styles.successIconEmoji}>✅</Text>
            </View>
            <Text style={styles.successTitle}>Pembayaran Berhasil!</Text>
            <Text style={styles.successBody}>
              Transaksi member Anda berhasil diproses oleh kasir.
            </Text>
            <View style={styles.successDetailBox}>
              <View style={{ flex: 1, gap: 4 }}>
                <Text style={styles.successDetailTitle}>Metode Pembayaran</Text>
                <Text style={styles.successDetailSub}>
                  {gopayActive && "Gopay"}
                  {!gopayActive && binadigitalActive && "Binadigital"}
                  {!gopayActive && !binadigitalActive && isakuLinked && "i.saku"}
                  {!gopayActive && !binadigitalActive && !isakuLinked && ovoLinked && "OVO"}
                </Text>
              </View>
              {poinCashActive && (
                <View style={{ alignItems: "flex-end", gap: 4 }}>
                  <Text style={styles.successDetailTitle}>Poin Cash Terpakai</Text>
                  <Text style={[styles.successDetailSub, { color: colors.teal, fontWeight: "900" }]}>
                    -{formatNumber(user.kopoinBalance)} Poin
                  </Text>
                </View>
              )}
            </View>
            <TouchableOpacity style={styles.successCloseBtn} onPress={() => setShowPaymentSuccess(false)}>
              <Text style={styles.successCloseText}>Kembali</Text>
            </TouchableOpacity>
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
    paddingHorizontal: spacing.md,
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 12 : 36,
    paddingBottom: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderColor: colors.line
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: colors.text,
    marginLeft: 4
  },
  scrollContent: {
    paddingBottom: 110
  },
  qrCard: {
    backgroundColor: colors.white,
    paddingTop: 40,
    paddingBottom: 28,
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: colors.line,
    width: "100%"
  },
  qrFrame: {
    padding: 16,
    backgroundColor: colors.white,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.lineStrong,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 24
  },
  qrDescription: {
    fontSize: 13,
    color: colors.muted,
    textAlign: "center",
    lineHeight: 19,
    fontWeight: "700",
    paddingHorizontal: 28
  },
  referralCtaBanner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#EAFBF7",
    marginHorizontal: spacing.md,
    marginTop: 16,
    padding: 14,
    borderRadius: radii.md,
    borderWidth: 1.5,
    borderColor: colors.teal,
    borderStyle: "dashed"
  },
  referralCtaLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1
  },
  referralCtaIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.teal,
    alignItems: "center",
    justifyContent: "center"
  },
  referralCtaTitle: {
    fontSize: 13,
    fontWeight: "900",
    color: colors.text
  },
  referralCtaSub: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.teal,
    marginTop: 1
  },
  sectionPoin: {
    marginTop: 16,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.line,
    width: "100%",
    paddingBottom: 4
  },
  sectionLabelWrapper: {
    paddingHorizontal: spacing.md,
    paddingTop: 14,
    paddingBottom: 6
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: "800",
    color: colors.muted
  },
  poinRowCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    paddingVertical: 12
  },
  poinCardLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  coinBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#FFF6DA",
    alignItems: "center",
    justifyContent: "center"
  },
  coinEmoji: {
    fontSize: 18
  },
  poinText: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.slate
  },
  poinValue: {
    color: colors.teal,
    fontWeight: "900"
  },
  aktifkanBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1.5,
    borderColor: colors.teal,
    backgroundColor: colors.white
  },
  aktifkanBtnActive: {
    backgroundColor: colors.teal,
    borderColor: colors.teal
  },
  aktifkanBtnText: {
    fontSize: 12,
    fontWeight: "900",
    color: colors.teal
  },
  aktifkanBtnTextActive: {
    color: colors.white
  },
  sectionPayment: {
    marginTop: 16,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.line,
    width: "100%"
  },
  sectionPaymentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderColor: colors.line
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "900",
    color: colors.text
  },
  saldoToggle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6
  },
  saldoToggleText: {
    fontSize: 12,
    fontWeight: "800",
    color: colors.muted
  },
  paymentList: {
    width: "100%"
  },
  paymentRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: colors.line
  },
  paymentRowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },
  paymentLogoCircle: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center"
  },
  logoText: {
    fontSize: 20,
    fontWeight: "900"
  },
  paymentName: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.text
  },
  paymentBalance: {
    fontSize: 11,
    fontWeight: "800",
    color: colors.muted,
    marginTop: 1
  },
  linkBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "#F2F4F3"
  },
  linkBtnActive: {
    backgroundColor: "#EAFBF7"
  },
  linkBtnText: {
    fontSize: 12,
    fontWeight: "900",
    color: colors.teal
  },
  linkBtnTextActive: {
    color: colors.teal
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.md,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderColor: colors.line
  },
  payBtn: {
    width: "100%",
    paddingVertical: 16,
    borderRadius: radii.sm,
    alignItems: "center",
    justifyContent: "center"
  },
  payBtnDisabled: {
    backgroundColor: "#E2ECE8"
  },
  payBtnActive: {
    backgroundColor: colors.teal
  },
  payBtnText: {
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 0.5
  },
  payBtnTextDisabled: {
    color: colors.muted
  },
  payBtnTextActive: {
    color: colors.white
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.md
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
  successDetailTitle: {
    fontSize: 11,
    fontWeight: "800",
    color: colors.muted,
    textTransform: "uppercase"
  },
  successDetailSub: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.text,
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
  }
});
