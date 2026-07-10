import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import type { Campaign, CompletionSummary, User, UserVote } from "../data/kopoinSeed";
import { colors, radii, shadows, spacing } from "../theme";
import { formatKopoin, formatRupiah } from "../utils/formatters";

type NotificationsScreenProps = {
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

export function NotificationsScreen({
  campaign,
  completionSummary,
  hasJoinedTeam,
  onJoinTeam,
  onOpenCommunity,
  onOpenMission,
  onOpenProfile,
  rank,
  scanCompleted,
  user,
  userVote
}: NotificationsScreenProps) {
  const remainingActions = campaign.targetValue - campaign.currentValue;
  const mainAction = !hasJoinedTeam
    ? {
        cta: "Gabung Tim",
        label: "Perlu tindakan",
        onPress: onJoinTeam,
        title: "Gabung Tim Pemuda Sukamaju",
        body: "Aksi misi baru bisa dihitung ke progress tim setelah Gabriel bergabung."
      }
    : scanCompleted
      ? {
          cta: "Cek Dampak",
          label: "Update tim",
          onPress: onOpenCommunity,
          title: "Kontribusi sudah masuk",
          body: `+120 Kopoin, progress ${completionSummary?.progressBefore ?? 73} -> ${completionSummary?.progressAfter ?? 74}, rank tim #${rank}.`
        }
      : {
          cta: "Validasi Sekarang",
          label: "Perlu tindakan",
          onPress: onOpenMission,
          title: "Validasi aksi misi",
          body: "Scan QR atau pakai kode demo untuk membuka reward journey tim."
        };

  return (
    <View style={styles.screen}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.logo}>kopoin</Text>
          <Text style={styles.headerMeta}>Notifikasi</Text>
        </View>
        <View style={styles.unreadBadge}>
          <Text style={styles.unreadText}>{userVote ? "2 aktif" : "3 aktif"}</Text>
        </View>
      </View>

      <View style={styles.heroCard}>
        <Text style={styles.heroKicker}>Action inbox</Text>
        <Text style={styles.heroTitle}>Yang perlu Gabriel cek hari ini</Text>
        <Text style={styles.heroCopy}>Notifikasi Kopoin diprioritaskan sebagai tindakan, bukan timeline pasif.</Text>
      </View>

      <View style={styles.actionStack}>
        <ActionCard {...mainAction} tone="teal" />
        {!userVote ? (
          <ActionCard
            body="Pilih reward komunitas berikutnya. Voting ini bukan keputusan RAT formal."
            cta="Pilih Reward"
            label="Perlu tindakan"
            onPress={onOpenCommunity}
            title="Ikut voting komunitas"
            tone="mint"
          />
        ) : null}
        <ActionCard
          body={`Voucher Kopi Sukamaju 10% berakhir 2 hari lagi. Hemat bulan ini ${formatRupiah(user.monthlySaving)}.`}
          cta="Lihat Benefit"
          label="Benefit"
          onPress={onOpenProfile}
          title="Kupon hampir kedaluwarsa"
          tone="gold"
        />
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionKicker}>Update tim</Text>
        <InboxItem
          body={`${remainingActions} aksi lagi menuju ${campaign.rewardTitle}.`}
          status="Misi"
          title="Gerakan Belanja Lokal masih aktif"
        />
        <InboxItem
          body={scanCompleted ? "Aksi Gabriel masuk ke skor tim dan leaderboard berubah." : "Selesaikan satu aksi untuk membantu tim naik peringkat."}
          status="Leaderboard"
          title={scanCompleted ? "Tim naik ke peringkat baru" : "Tim bisa naik peringkat"}
        />
        {userVote ? <InboxItem body={`Pilihan kamu: ${userVote.optionLabel}.`} status="Voting" title="Voting tersimpan" /> : null}
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionKicker}>Benefit & pencapaian</Text>
        <InboxItem body={`${formatKopoin(user.kopoinBalance)} tersedia sebagai poin reward, bukan saldo uang.`} status="Kopoin" title="Saldo Kopoin terbaru" />
        <InboxItem body="Streak bisa dijaga lewat voting atau belajar, bukan belanja saja." status="Streak" title={user.streakLabel} />
        <InboxItem
          body={user.achievementUnlocked ? "Anak Lokal, Selera Global sudah terbuka." : "Achievement akan terbuka setelah validasi produk lokal."}
          status="Achievement"
          title={user.achievementUnlocked ? "Achievement terbuka" : "Achievement hampir terbuka"}
        />
      </View>
    </View>
  );
}

function ActionCard({ body, cta, label, onPress, title, tone }: { body: string; cta: string; label: string; onPress: () => void; title: string; tone: "teal" | "mint" | "gold" }) {
  const isTeal = tone === "teal";

  return (
    <View style={[styles.actionCard, actionToneStyles[tone]]}>
      <Text style={isTeal ? styles.actionLabelDark : styles.actionLabel}>{label}</Text>
      <Text style={isTeal ? styles.actionTitleDark : styles.actionTitle}>{title}</Text>
      <Text style={isTeal ? styles.actionBodyDark : styles.actionBody}>{body}</Text>
      <TouchableOpacity style={isTeal ? styles.actionButtonDark : styles.actionButton} onPress={onPress}>
        <Text style={isTeal ? styles.actionButtonTextDark : styles.actionButtonText}>{cta}</Text>
      </TouchableOpacity>
    </View>
  );
}

function InboxItem({ body, status, title }: { body: string; status: string; title: string }) {
  return (
    <View style={styles.inboxItem}>
      <View style={styles.inboxIcon}>
        <Text style={styles.inboxIconText}>{status.slice(0, 1)}</Text>
      </View>
      <View style={styles.flexOne}>
        <View style={styles.inboxTopline}>
          <Text style={styles.inboxTitle}>{title}</Text>
          <Text style={styles.inboxStatus}>{status}</Text>
        </View>
        <Text style={styles.inboxBody}>{body}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    gap: spacing.md
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  logo: {
    color: colors.teal,
    fontSize: 32,
    fontWeight: "900",
    letterSpacing: -1.4
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
    backgroundColor: colors.surfaceMint,
    borderWidth: 1,
    borderColor: colors.line
  },
  unreadText: {
    color: colors.teal,
    fontSize: 12,
    fontWeight: "900"
  },
  heroCard: {
    borderRadius: 34,
    padding: spacing.lg,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
    ...shadows.card
  },
  heroKicker: {
    color: colors.teal,
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  heroTitle: {
    color: colors.text,
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "900",
    marginTop: spacing.sm
  },
  heroCopy: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "800",
    marginTop: spacing.sm
  },
  actionStack: {
    gap: spacing.sm
  },
  actionCard: {
    borderRadius: radii.lg,
    padding: spacing.md,
    borderWidth: 1
  },
  actionLabel: {
    color: colors.teal,
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  actionLabelDark: {
    color: "#D8FFF5",
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  actionTitle: {
    color: colors.text,
    fontSize: 20,
    lineHeight: 26,
    fontWeight: "900",
    marginTop: 3
  },
  actionTitleDark: {
    color: colors.white,
    fontSize: 20,
    lineHeight: 26,
    fontWeight: "900",
    marginTop: 3
  },
  actionBody: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 20,
    fontWeight: "800",
    marginTop: spacing.xs
  },
  actionBodyDark: {
    color: "#D8FFF5",
    fontSize: 13,
    lineHeight: 20,
    fontWeight: "800",
    marginTop: spacing.xs
  },
  actionButton: {
    alignSelf: "flex-start",
    marginTop: spacing.md,
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.teal
  },
  actionButtonDark: {
    alignSelf: "flex-start",
    marginTop: spacing.md,
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.white
  },
  actionButtonText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: "900"
  },
  actionButtonTextDark: {
    color: colors.teal,
    fontSize: 13,
    fontWeight: "900"
  },
  sectionCard: {
    borderRadius: radii.lg,
    padding: spacing.md,
    gap: spacing.sm,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line
  },
  sectionKicker: {
    color: colors.teal,
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  inboxItem: {
    flexDirection: "row",
    gap: spacing.md,
    borderRadius: radii.md,
    padding: spacing.md,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.line
  },
  inboxIcon: {
    width: 42,
    height: 42,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surfaceMint
  },
  inboxIconText: {
    color: colors.teal,
    fontSize: 16,
    fontWeight: "900"
  },
  inboxTopline: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.sm
  },
  inboxTitle: {
    flex: 1,
    color: colors.text,
    fontSize: 14,
    fontWeight: "900"
  },
  inboxStatus: {
    color: colors.gold,
    fontSize: 11,
    fontWeight: "900"
  },
  inboxBody: {
    color: colors.muted,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "800",
    marginTop: 3
  },
  flexOne: {
    flex: 1
  }
});

const actionToneStyles = StyleSheet.create({
  teal: {
    backgroundColor: colors.teal,
    borderColor: colors.teal
  },
  mint: {
    backgroundColor: colors.surfaceMint,
    borderColor: colors.line
  },
  gold: {
    backgroundColor: colors.surfaceGold,
    borderColor: "#F1D98D"
  }
});
