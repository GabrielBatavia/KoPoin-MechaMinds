import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
  Modal,
  Clipboard,
  Alert,
  StatusBar
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import {
  ArrowLeft,
  Copy,
  ShoppingBag,
  UserCheck,
  X
} from "lucide-react-native";
import { colors, radii, shadows, spacing } from "../theme";
import type { User } from "../data/kopoinSeed";

type ReferralPromoScreenProps = {
  user: User;
  onClose: () => void;
  onNavigateToProfile: () => void;
};

export function ReferralPromoScreen({ user, onClose, onNavigateToProfile }: ReferralPromoScreenProps) {
  const [showTermsSheet, setShowTermsSheet] = useState(false);
  const [referralCopied, setReferralCopied] = useState(false);
  const [showQRReferralSheet, setShowQRReferralSheet] = useState(false);

  // Generate clean dynamic referral code based on user name
  const referralCode = `R-${user.name.toUpperCase().replace(/\s+/g, "")}500`;

  const handleCopyCode = () => {
    Clipboard.setString(referralCode);
    setReferralCopied(true);
    setTimeout(() => setReferralCopied(false), 2000);
  };

  const handleShareCode = () => {
    Alert.alert(
      "Bagikan Kode",
      `Yuk bergabung di Koperasi Desa Merah Putih menggunakan kode referral saya: ${referralCode} dan dapatkan poin cash gratis!`
    );
  };

  return (
    <View style={styles.refContainer}>
      {/* Modal Header */}
      <View style={styles.refHeader}>
        <TouchableOpacity style={styles.refBackBtn} onPress={onClose}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.refHeaderTitle}>Ajak-Ajak Berhadiah</Text>
      </View>

      <ScrollView style={styles.refScroll} contentContainerStyle={styles.refScrollContent} showsVerticalScrollIndicator={false}>
        {/* Top Gradient Hero Block */}
        <View style={styles.refHeroBlock}>
          <Text style={styles.refHeroSub}>AJAK TEMAN & DAPATKAN</Text>
          <Text style={styles.refHeroTitle}>25.000</Text>
          <Text style={styles.refHeroTitleSub}>POIN CASH</Text>
          <View style={styles.refPeriodPill}>
            <Text style={styles.refPeriodText}>
              Periode Program: <Text style={{ fontWeight: "900" }}>1 Mei 2026 - 31 Juli 2026</Text>
            </Text>
          </View>
        </View>

        {/* Referral Code Card */}
        <View style={styles.refCodeCard}>
          <View style={styles.refCardLabelWrapper}>
            <Text style={styles.refCardLabelText}>Kode Referral</Text>
          </View>
          <Text style={styles.refCardSubtitle}>
            5 orang tercepat yang jadi temanmu akan dapat hadiah menarik dari Koperasi Desa Merah Putih!
          </Text>
          
          {/* Copy Code Box */}
          <View style={styles.refCopyBox}>
            <Text style={styles.refCodeText}>{referralCode}</Text>
            <TouchableOpacity onPress={handleCopyCode} style={styles.copyBtn} activeOpacity={0.7}>
              <Copy size={20} color={colors.teal} />
            </TouchableOpacity>
          </View>

          {/* Copied Feedback Toast */}
          {referralCopied && (
            <View style={styles.copiedFeedback}>
              <Text style={styles.copiedFeedbackText}>Kode referral tersalin ke papan klip!</Text>
            </View>
          )}

          {/* Action Button */}
          <TouchableOpacity style={styles.refShareBtn} onPress={handleShareCode} activeOpacity={0.8}>
            <Text style={styles.refShareBtnText}>Undang Teman</Text>
          </TouchableOpacity>

          {/* QR Invite Code Trigger */}
          <TouchableOpacity onPress={() => setShowQRReferralSheet(true)} style={styles.refQRLink}>
            <Text style={styles.refQRLinkText}>
              Coba undang teman pakai kode QR →
            </Text>
          </TouchableOpacity>
        </View>

        {/* Mission Progress Card */}
        <View style={styles.refMissionCard}>
          <View style={styles.refMissionCardLabelWrapper}>
            <Text style={styles.refMissionCardLabelText}>Selesaikan Misi Untuk Klaim Hadiah</Text>
          </View>

          {/* Row 1: Shopping progress */}
          <View style={styles.refMissionRow}>
            <View style={styles.refMissionRowLeft}>
              <View style={styles.refIconCircle}>
                <ShoppingBag size={18} color={colors.teal} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.refMissionTitle}>Belanja sampai min Rp 100.000 di Koperasi Desa</Text>
                <Text style={styles.refMissionSub}>
                  Lakukan pembelanjaan di toko Koperasi Desa Merah Putih menggunakan layanan Kopoin.
                </Text>
                {/* Visual Progress Bar */}
                <View style={styles.refProgressBarBg}>
                  <View style={[styles.refProgressBarFill, { width: "0%" }]} />
                </View>
                <Text style={styles.refProgressText}>0 / 100.000</Text>
              </View>
            </View>
          </View>

          {/* Divider */}
          <View style={styles.refMissionDivider} />

          {/* Row 2: Profile completion */}
          <View style={styles.refMissionRow}>
            <View style={styles.refMissionRowLeft}>
              <View style={styles.refIconCircle}>
                <UserCheck size={18} color={colors.teal} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.refMissionTitle}>Lengkapi Data Diri di Halaman Profil</Text>
                <Text style={styles.refMissionSub}>
                  Lengkapi profil akun Koperasi Desa Merah Putih Anda.{" "}
                  <Text style={{ color: colors.teal, fontWeight: "900" }} onPress={onNavigateToProfile}>
                    Lengkapi di sini.
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Terms & Conditions preview */}
        <View style={styles.refTermsCard}>
          <Text style={styles.refTermsTitle}>Syarat & Ketentuan</Text>
          
          <View style={styles.refTermItem}>
            <View style={styles.refTermNumber}><Text style={styles.refTermNumText}>1</Text></View>
            <Text style={styles.refTermText}>Program berlaku untuk seluruh Member Koperasi Desa Merah Putih.</Text>
          </View>
          
          <View style={styles.refTermItem}>
            <View style={styles.refTermNumber}><Text style={styles.refTermNumText}>2</Text></View>
            <Text style={styles.refTermText}>
              Seluruh Member bisa mengajak hingga 5 Member Baru dengan cara membagikan Kode Referral.
            </Text>
          </View>

          <View style={styles.refTermItem}>
            <View style={styles.refTermNumber}><Text style={styles.refTermNumText}>3</Text></View>
            <Text style={styles.refTermText}>
              Setiap DOWNLINE berhasil menyelesaikan misi, UPLINE mendapat 5.000 Poin Cash.
            </Text>
          </View>

          <TouchableOpacity style={styles.refTermsBtn} onPress={() => setShowTermsSheet(true)}>
            <Text style={styles.refTermsBtnText}>Lihat Selengkapnya</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* 8. Terms Bottom Sheet Modal */}
      <Modal visible={showTermsSheet} transparent animationType="slide" onRequestClose={() => setShowTermsSheet(false)}>
        <View style={styles.sheetOverlay}>
          <View style={styles.sheetContent}>
            {/* Sheet Header */}
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>Syarat & Ketentuan</Text>
              <TouchableOpacity onPress={() => setShowTermsSheet(false)}>
                <X size={22} color={colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.sheetScroll} showsVerticalScrollIndicator={false}>
              <View style={styles.sheetItem}>
                <View style={styles.sheetNum}><Text style={styles.sheetNumText}>1</Text></View>
                <Text style={styles.sheetText}>Program berlaku untuk seluruh Member Koperasi Desa Merah Putih.</Text>
              </View>

              <View style={styles.sheetItem}>
                <View style={styles.sheetNum}><Text style={styles.sheetNumText}>2</Text></View>
                <Text style={styles.sheetText}>
                  Seluruh Member Koperasi bisa mengajak hingga 5 Member Baru dengan cara membagikan Kode Referral. Member yang mengajak disebut UPLINE, yang diajak disebut DOWNLINE.
                </Text>
              </View>

              <View style={styles.sheetItem}>
                <View style={styles.sheetNum}><Text style={styles.sheetNumText}>3</Text></View>
                <Text style={styles.sheetText}>
                  Untuk setiap DOWNLINE yang sudah berhasil menyelesaikan misi pribadi, UPLINE akan mendapatkan 5.000 Poin Cash (Maksimal yang bisa didapatkan oleh UPLINE yaitu 25.000 Poin Cash). Poin ini baru bisa diklaim oleh UPLINE setelah melakukan transaksi senilai minimal Rp 100.000.
                </Text>
              </View>

              <View style={styles.sheetItem}>
                <View style={styles.sheetNum}><Text style={styles.sheetNumText}>4</Text></View>
                <Text style={styles.sheetText}>
                  Seluruh Member Baru (DOWNLINE) yang sudah mendaftar dan menginput Kode Referral serta melakukan transaksi minimal Rp 50.000 akan mendapatkan Hadiah berupa Kupon Diskon senilai Rp 5.000 untuk transaksi berikutnya minimal Rp 50.000.
                </Text>
              </View>

              <View style={styles.sheetItem}>
                <View style={styles.sheetNum}><Text style={styles.sheetNumText}>5</Text></View>
                <Text style={styles.sheetText}>
                  Seluruh syarat belanja bersifat akumulatif kelipatan Rp 1.000 (bisa dicicil selama periode promo).
                </Text>
              </View>

              <View style={styles.sheetItem}>
                <View style={styles.sheetNum}><Text style={styles.sheetNumText}>6</Text></View>
                <Text style={styles.sheetText}>
                  Seluruh transaksi belanja bisa dilakukan secara langsung di toko Koperasi Desa Merah Putih.
                </Text>
              </View>
            </ScrollView>
            
            <TouchableOpacity style={styles.sheetCloseBtn} onPress={() => setShowTermsSheet(false)}>
              <Text style={styles.sheetCloseBtnText}>Mengerti</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* 9. Referral QR Code Bottom Sheet Modal */}
      <Modal visible={showQRReferralSheet} transparent animationType="slide" onRequestClose={() => setShowQRReferralSheet(false)}>
        <View style={styles.sheetOverlay}>
          <View style={styles.sheetContent}>
            {/* Sheet Header */}
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>Undang Pakai Kode QR</Text>
              <TouchableOpacity onPress={() => setShowQRReferralSheet(false)}>
                <X size={22} color={colors.text} />
              </TouchableOpacity>
            </View>

            <View style={{ alignItems: "center", paddingVertical: 24, gap: 16 }}>
              <QRCode
                value={`https://kopoin.desa.id/register?ref=${referralCode}`}
                size={160}
                color={colors.text}
              />
              <Text style={{ fontSize: 13, color: colors.muted, textAlign: "center", fontWeight: "700", paddingHorizontal: 20, lineHeight: 18 }}>
                Minta temanmu memindai kode QR ini untuk melakukan pendaftaran member secara otomatis dengan kode referral Anda.
              </Text>
            </View>
            
            <TouchableOpacity style={styles.sheetCloseBtn} onPress={() => setShowQRReferralSheet(false)}>
              <Text style={styles.sheetCloseBtnText}>Mengerti</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  refContainer: {
    flex: 1,
    backgroundColor: "#F4F7F6"
  },
  refHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 12 : 36,
    paddingBottom: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderColor: colors.line
  },
  refBackBtn: {
    padding: 6
  },
  refHeaderTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: colors.text,
    marginLeft: 12
  },
  refScroll: {
    flex: 1,
    backgroundColor: "#F4F7F6"
  },
  refScrollContent: {
    paddingBottom: 40
  },
  refHeroBlock: {
    backgroundColor: colors.teal,
    alignItems: "center",
    paddingTop: 28,
    paddingBottom: 36,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28
  },
  refHeroSub: {
    fontSize: 12,
    fontWeight: "900",
    color: "#FFF6DA",
    letterSpacing: 1.5,
    marginBottom: 6
  },
  refHeroTitle: {
    fontSize: 52,
    fontWeight: "900",
    color: colors.white,
    lineHeight: 52
  },
  refHeroTitleSub: {
    fontSize: 24,
    fontWeight: "900",
    color: "#FFF6DA",
    letterSpacing: 2,
    marginTop: 2,
    marginBottom: 16
  },
  refPeriodPill: {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 99
  },
  refPeriodText: {
    fontSize: 11,
    color: colors.white,
    fontWeight: "600"
  },
  refCodeCard: {
    backgroundColor: colors.white,
    borderRadius: radii.md,
    marginHorizontal: spacing.md,
    marginTop: -20,
    padding: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.line,
    ...shadows.card
  },
  refCardLabelWrapper: {
    backgroundColor: "#F4F7F6",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 99,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.lineStrong
  },
  refCardLabelText: {
    fontSize: 11,
    fontWeight: "900",
    color: colors.teal,
    textTransform: "uppercase"
  },
  refCardSubtitle: {
    fontSize: 12,
    color: colors.muted,
    textAlign: "center",
    lineHeight: 18,
    fontWeight: "700",
    marginBottom: 18
  },
  refCopyBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "#EAFBF7",
    borderWidth: 1.5,
    borderColor: colors.teal,
    borderStyle: "dashed",
    borderRadius: radii.sm,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16
  },
  refCodeText: {
    fontSize: 18,
    fontWeight: "900",
    color: colors.teal,
    letterSpacing: 1
  },
  copyBtn: {
    padding: 6
  },
  copiedFeedback: {
    backgroundColor: colors.teal,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 14
  },
  copiedFeedbackText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: "800"
  },
  refShareBtn: {
    backgroundColor: colors.teal,
    width: "100%",
    paddingVertical: 14,
    borderRadius: radii.sm,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12
  },
  refShareBtnText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "900"
  },
  refQRLink: {
    paddingVertical: 6
  },
  refQRLinkText: {
    fontSize: 12,
    fontWeight: "800",
    color: colors.teal
  },
  refMissionCard: {
    backgroundColor: colors.white,
    borderRadius: radii.md,
    marginHorizontal: spacing.md,
    marginTop: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.line
  },
  refMissionCardLabelWrapper: {
    alignSelf: "center",
    backgroundColor: colors.text,
    paddingVertical: 4,
    paddingHorizontal: 14,
    borderRadius: 99,
    marginBottom: 18
  },
  refMissionCardLabelText: {
    fontSize: 11,
    fontWeight: "900",
    color: colors.white,
    textTransform: "uppercase"
  },
  refMissionRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 6
  },
  refMissionRowLeft: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    flex: 1
  },
  refIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#EAFBF7",
    alignItems: "center",
    justifyContent: "center"
  },
  refMissionTitle: {
    fontSize: 13,
    fontWeight: "900",
    color: colors.text,
    lineHeight: 18
  },
  refMissionSub: {
    fontSize: 11,
    color: colors.muted,
    fontWeight: "700",
    lineHeight: 16,
    marginTop: 4
  },
  refProgressBarBg: {
    height: 6,
    backgroundColor: colors.line,
    borderRadius: 99,
    marginTop: 10,
    width: "100%",
    overflow: "hidden"
  },
  refProgressBarFill: {
    height: "100%",
    backgroundColor: colors.teal,
    borderRadius: 99
  },
  refProgressText: {
    fontSize: 10,
    fontWeight: "900",
    color: colors.muted,
    marginTop: 4,
    alignSelf: "flex-end"
  },
  refMissionDivider: {
    height: 1,
    backgroundColor: colors.line,
    marginVertical: 14
  },
  refTermsCard: {
    backgroundColor: colors.white,
    borderRadius: radii.md,
    marginHorizontal: spacing.md,
    marginTop: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.line
  },
  refTermsTitle: {
    fontSize: 14,
    fontWeight: "900",
    color: colors.text,
    marginBottom: 14,
    textAlign: "center"
  },
  refTermItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    marginBottom: 12
  },
  refTermNumber: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#EAFBF7",
    alignItems: "center",
    justifyContent: "center"
  },
  refTermNumText: {
    fontSize: 10,
    fontWeight: "900",
    color: colors.teal
  },
  refTermText: {
    flex: 1,
    fontSize: 11.5,
    color: colors.text,
    lineHeight: 16,
    fontWeight: "700"
  },
  refTermsBtn: {
    alignSelf: "center",
    paddingVertical: 6,
    marginTop: 4
  },
  refTermsBtnText: {
    fontSize: 12,
    fontWeight: "900",
    color: colors.teal
  },

  // Terms Sheet Bottom Modal Styles
  sheetOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end"
  },
  sheetContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: spacing.md,
    paddingTop: 20,
    paddingBottom: 36,
    maxHeight: "80%"
  },
  sheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 14
  },
  sheetTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: colors.text
  },
  sheetScroll: {
    marginVertical: 10
  },
  sheetItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 16
  },
  sheetNum: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#EAFBF7",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2
  },
  sheetNumText: {
    fontSize: 11,
    fontWeight: "900",
    color: colors.teal
  },
  sheetText: {
    flex: 1,
    fontSize: 13,
    color: colors.text,
    lineHeight: 18,
    fontWeight: "700"
  },
  sheetCloseBtn: {
    backgroundColor: colors.teal,
    width: "100%",
    paddingVertical: 14,
    borderRadius: radii.sm,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10
  },
  sheetCloseBtnText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "900"
  }
});
