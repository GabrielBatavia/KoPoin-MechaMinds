import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, Dimensions } from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  ShoppingBag,
  Coins,
  ArrowDownLeft,
  ArrowUpRight,
  ChevronRight,
  TrendingDown,
  Gift
} from "lucide-react-native";
import { colors, radii, shadows, spacing } from "../theme";
import { formatRupiah } from "../utils/formatters";
import type { Campaign, CompletionSummary, User, UserVote } from "../data/kopoinSeed";

type HistorysScreenProps = {
  campaign: Campaign;
  completionSummary: CompletionSummary | null;
  hasJoinedTeam: boolean;
  onJoinTeam: () => void;
  onOpenCommunity: () => void;
  onOpenMission: () => void;
  onOpenProfile: () => void;
  rank: number;
  scanCompleted: boolean;
  user: User;
  userVote: UserVote | null;
};

type Transaction = {
  id: string;
  title: string;
  date: string;
  type: "grocery" | "points_redemption" | "points_earn";
  amountText: string;
  amountColor: string;
  pointsBadge?: string;
  iconName: "grocery" | "points" | "rewards";
  subtitle: string;
};

export function HistorysScreen({
  user,
  scanCompleted
}: HistorysScreenProps) {
  
  // Real-time dynamic mock transactions that integrate scanning state!
  const transactions: Transaction[] = [
    ...(scanCompleted ? [
      {
        id: "scan_completed_reward",
        title: "Kopoin Scan Code Misi Sukamaju",
        subtitle: "Bonus validasi produk lokal",
        date: "Hari ini, 14:30 WIB",
        type: "points_earn" as const,
        amountText: "+120 Poin",
        amountColor: "#10B981",
        iconName: "rewards" as const
      }
    ] : []),
    {
      id: "tx_1",
      title: "fresh tomato hybrid",
      subtitle: "Belanja Kopoin Mart • 1 kg",
      date: "10 Jul 2026, 17:42 WIB",
      type: "grocery",
      amountText: "-Rp32.000",
      amountColor: colors.text,
      pointsBadge: "+32 Poin",
      iconName: "grocery"
    },
    {
      id: "tx_2",
      title: "roti tawar gandum kampung",
      subtitle: "Belanja Kopoin Mart • 1 pack",
      date: "09 Jul 2026, 11:20 WIB",
      type: "grocery",
      amountText: "-Rp15.000",
      amountColor: colors.text,
      pointsBadge: "+15 Poin",
      iconName: "grocery"
    },
    {
      id: "tx_3",
      title: "Voucher Kopi Sukamaju 10%",
      subtitle: "Penukaran Loyalty Points",
      date: "08 Jul 2026, 09:15 WIB",
      type: "points_redemption",
      amountText: "-30 Poin",
      amountColor: "#EF4444",
      iconName: "points"
    },
    {
      id: "tx_4",
      title: "Koperasi Sukamaju Join Reward",
      subtitle: "Bonus anggota baru terverifikasi",
      date: "07 Jul 2026, 08:00 WIB",
      type: "points_earn",
      amountText: "+120 Poin",
      amountColor: "#10B981",
      iconName: "rewards"
    }
  ];

  // Calculations
  const totalCashSpent = 47000;
  const totalPointsRedeemed = 30;
  const totalPointsEarned = scanCompleted ? 287 : 167; // initial points check

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />

      {/* Header Row */}
      <View style={styles.headerRow}>
        <View style={{ alignItems: "flex-start" }}>
          <Image source={require("../assets/images/logo.png")} style={styles.logo} resizeMode="contain" />
          <Text style={styles.headerMeta}>Riwayat Transaksi</Text>
        </View>
        <View style={styles.unreadBadge}>
          <Text style={styles.unreadText}>Kopoin Mart</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Quick Stats Banner */}
        <View style={styles.statsCard}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>BELANJA CASH</Text>
            <Text style={styles.statValue}>{formatRupiah(totalCashSpent)}</Text>
            <Text style={styles.statSub}>2 transaksi</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>POIN DITUKAR</Text>
            <Text style={[styles.statValue, { color: "#EF4444" }]}>-{totalPointsRedeemed} Poin</Text>
            <Text style={styles.statSub}>1 voucher</Text>
          </View>
        </View>

        {/* Transaction list container */}
        <Text style={styles.sectionTitle}>Semua Transaksi</Text>

        <View style={styles.listContainer}>
          {transactions.map((tx) => (
            <View key={tx.id} style={styles.txRow}>
              
              {/* Left Column: Icon */}
              <View style={styles.txLeft}>
                <View style={[
                  styles.iconCircle,
                  tx.type === "grocery" && { backgroundColor: "#E6F0FA" },
                  tx.type === "points_redemption" && { backgroundColor: "#FEE2E2" },
                  tx.type === "points_earn" && { backgroundColor: "#E6F8F5" }
                ]}>
                  {tx.iconName === "grocery" && <ShoppingBag size={20} color="#1E90FF" />}
                  {tx.iconName === "points" && <Coins size={20} color="#EF4444" />}
                  {tx.iconName === "rewards" && <Gift size={20} color="#10B981" />}
                </View>

                {/* Middle Column: Details */}
                <View style={styles.txDetails}>
                  <Text style={styles.txTitleText}>{tx.title}</Text>
                  <Text style={styles.txSubtitleText}>{tx.subtitle}</Text>
                  <Text style={styles.txDateText}>{tx.date}</Text>
                </View>
              </View>

              {/* Right Column: Amount & Badges */}
              <View style={styles.txRight}>
                <View style={styles.amountBadgeRow}>
                  {tx.type === "points_redemption" && <Coins size={14} color="#EF4444" style={{ marginRight: 3 }} />}
                  {tx.type === "points_earn" && <Coins size={14} color="#10B981" style={{ marginRight: 3 }} />}
                  <Text style={[styles.amountText, { color: tx.amountColor }]}>
                    {tx.amountText}
                  </Text>
                </View>
                {tx.pointsBadge && (
                  <View style={styles.pointsEarnedBadge}>
                    <Text style={styles.pointsEarnedText}>{tx.pointsBadge}</Text>
                  </View>
                )}
              </View>

            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    padding: spacing.md
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16
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
  unreadBadge: {
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: "#E6F8F5",
    borderWidth: 1,
    borderColor: "#A3E635"
  },
  unreadText: {
    color: "#0F6B63",
    fontSize: 12,
    fontWeight: "900"
  },
  scrollView: {
    flex: 1
  },
  statsCard: {
    flexDirection: "row",
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    marginTop: 8,
    ...shadows.card
  },
  statBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  statLabel: {
    fontSize: 10,
    fontWeight: "900",
    color: colors.muted,
    letterSpacing: 0.5
  },
  statValue: {
    fontSize: 18,
    fontWeight: "900",
    color: colors.text,
    marginTop: 4
  },
  statSub: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.muted,
    marginTop: 2
  },
  statDivider: {
    width: 1.5,
    backgroundColor: "#E5E7EB",
    marginHorizontal: 12
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: colors.text,
    marginTop: 24,
    marginBottom: 12
  },
  listContainer: {
    backgroundColor: colors.white,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    paddingHorizontal: 16,
    overflow: "hidden"
  },
  txRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1.2,
    borderBottomColor: "#F3F4F6"
  },
  txLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 12
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center"
  },
  txDetails: {
    marginLeft: 12,
    flex: 1
  },
  txTitleText: {
    fontSize: 14,
    fontWeight: "900",
    color: colors.text
  },
  txSubtitleText: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.muted,
    marginTop: 2
  },
  txDateText: {
    fontSize: 10,
    color: "#9CA3AF",
    fontWeight: "700",
    marginTop: 4
  },
  txRight: {
    alignItems: "flex-end"
  },
  amountBadgeRow: {
    flexDirection: "row",
    alignItems: "center"
  },
  amountText: {
    fontSize: 14,
    fontWeight: "900"
  },
  pointsEarnedBadge: {
    backgroundColor: "#E6F8F5",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 0.8,
    borderColor: "#A3E635",
    marginTop: 6
  },
  pointsEarnedText: {
    color: "#10B981",
    fontSize: 9,
    fontWeight: "900"
  }
});
