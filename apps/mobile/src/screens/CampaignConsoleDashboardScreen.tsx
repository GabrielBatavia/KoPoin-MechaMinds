import { StyleSheet, Text, View } from "react-native";

import { ProgressBar } from "../components/ui/ProgressBar";
import { Section } from "../components/ui/Section";
import type { AdminDashboardData } from "../services/adminDashboard";
import { colors, radii, spacing } from "../theme";
import { formatNumber } from "../utils/formatters";

type CampaignConsoleDashboardScreenProps = {
  dashboard: AdminDashboardData;
};

export function CampaignConsoleDashboardScreen({ dashboard }: CampaignConsoleDashboardScreenProps) {
  return (
    <Section title="Campaign Console" eyebrow="Sprint 2 P0">
      <View style={styles.adminHeader}>
        <View style={styles.headerCopy}>
          <Text style={styles.kicker}>Mock API SIMKOPDES</Text>
          <Text style={styles.headerTitle}>{dashboard.campaignTitle}</Text>
          <Text style={styles.bodyText}>Dashboard ini memakai state demo yang sama dengan flow anggota.</Text>
        </View>
        <View style={styles.statusPill}>
          <Text style={styles.statusPillText}>{dashboard.campaignStatus}</Text>
        </View>
      </View>

      <View style={styles.kpiGrid}>
        {dashboard.kpis.map((kpi) => (
          <View key={kpi.label} style={styles.kpiCard}>
            <Text style={styles.kpiLabel}>{kpi.label}</Text>
            <Text style={styles.kpiValue}>{kpi.value}</Text>
            <Text style={styles.kpiHelper}>{kpi.helper}</Text>
          </View>
        ))}
      </View>

      <View style={styles.progressPanel}>
        <View style={styles.progressTopline}>
          <View style={styles.progressCopy}>
            <Text style={styles.panelTitle}>Progress reward bersama</Text>
            <Text style={styles.bodyText}>{dashboard.rewardTitle}</Text>
          </View>
          <Text style={styles.progressValue}>{dashboard.progressPercent}%</Text>
        </View>
        <ProgressBar percent={dashboard.progressPercent} />
        <Text style={styles.bodyText}>
          {dashboard.progressCurrent}/{dashboard.progressTarget} transaksi produk lokal · {dashboard.remainingActions} aksi lagi.
        </Text>
      </View>

      <View style={styles.feedPanel}>
        <Text style={styles.panelTitle}>Performa tim</Text>
        {dashboard.teamPerformance.map((team) => (
          <View key={team.teamId} style={team.isCurrentTeam ? styles.teamRowActive : styles.teamRow}>
            <Text style={styles.rankText}>#{team.rank}</Text>
            <View style={styles.rowBody}>
              <Text style={styles.cardTitle}>{team.teamName}</Text>
              <Text style={styles.bodyText}>{team.scoreBreakdown}</Text>
            </View>
            <Text style={styles.scoreText}>{formatNumber(team.score)}</Text>
          </View>
        ))}
      </View>

      <View style={styles.feedPanel}>
        <Text style={styles.panelTitle}>Kinerja misi</Text>
        {dashboard.missionPerformance.map((mission) => (
          <View key={mission.missionTitle} style={styles.missionRow}>
            <View style={styles.rowBody}>
              <Text style={styles.cardTitle}>{mission.missionTitle}</Text>
              <Text style={styles.bodyText}>Aksi terbaru: {mission.latestUser}</Text>
            </View>
            <Text style={styles.scoreText}>{mission.completions}x · {formatNumber(mission.pointsIssued)}</Text>
          </View>
        ))}
      </View>

      <View style={styles.feedPanel}>
        <Text style={styles.panelTitle}>Activity ledger</Text>
        {dashboard.activityFeed.map((activity) => (
          <View key={activity.id} style={activity.userName === "Gabriel" ? styles.activityRowActive : styles.activityRow}>
            <View style={styles.activityHeader}>
              <Text style={styles.cardTitle}>{activity.userName} · {activity.status}</Text>
              <Text style={styles.timeText}>{activity.timestamp.slice(11)}</Text>
            </View>
            <Text style={styles.bodyText}>
              {activity.missionTitle} · {activity.productName} · +{activity.pointsEarned} Kopoin
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.feedPanel}>
        <Text style={styles.panelTitle}>QR verification log</Text>
        {dashboard.verificationLogs.length > 0 ? (
          dashboard.verificationLogs.map((log) => (
            <View key={log.id} style={styles.verificationRow}>
              <Text style={statusStyles[log.status]}>{log.status.toUpperCase()}</Text>
              <View style={styles.rowBody}>
                <Text style={styles.codeText}>{log.qrCode}</Text>
                <Text style={styles.bodyText}>{log.reason}</Text>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.bodyText}>Belum ada percobaan QR dari Gabriel.</Text>
        )}
      </View>

      <View style={styles.syncNote}>
        <Text style={styles.syncText}>{dashboard.syncNote}</Text>
      </View>
    </Section>
  );
}

const styles = StyleSheet.create({
  adminHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.md,
    borderRadius: radii.lg,
    padding: spacing.md,
    backgroundColor: colors.teal,
    borderWidth: 1,
    borderColor: colors.tealDark
  },
  headerCopy: {
    flex: 1
  },
  kicker: {
    color: colors.mint,
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 0.8,
    textTransform: "uppercase"
  },
  headerTitle: {
    color: colors.white,
    fontSize: 20,
    lineHeight: 26,
    fontWeight: "900",
    marginTop: 4
  },
  statusPill: {
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.gold
  },
  statusPillText: {
    color: colors.tealDark,
    fontSize: 12,
    fontWeight: "900"
  },
  bodyText: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 4
  },
  kpiGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    marginTop: spacing.md
  },
  kpiCard: {
    minWidth: "47%",
    flex: 1,
    borderRadius: radii.md,
    padding: spacing.md,
    backgroundColor: colors.cream,
    borderWidth: 1,
    borderColor: colors.creamStrong
  },
  kpiLabel: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "900"
  },
  kpiValue: {
    color: colors.slate,
    fontSize: 24,
    fontWeight: "900",
    marginTop: 3
  },
  kpiHelper: {
    color: colors.muted,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 4
  },
  progressPanel: {
    marginTop: spacing.md,
    borderRadius: radii.lg,
    padding: spacing.md,
    backgroundColor: "#ECFFFA",
    borderWidth: 1,
    borderColor: "#BDEEE3"
  },
  progressTopline: {
    flexDirection: "row",
    gap: spacing.md,
    justifyContent: "space-between"
  },
  progressCopy: {
    flex: 1
  },
  progressValue: {
    color: colors.teal,
    fontSize: 28,
    fontWeight: "900"
  },
  feedPanel: {
    marginTop: spacing.md,
    borderRadius: radii.lg,
    padding: spacing.md,
    backgroundColor: colors.cream,
    borderWidth: 1,
    borderColor: colors.creamStrong,
    gap: spacing.sm
  },
  panelTitle: {
    color: colors.slate,
    fontSize: 15,
    fontWeight: "900"
  },
  teamRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    borderRadius: radii.md,
    padding: spacing.md,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line
  },
  teamRowActive: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    borderRadius: radii.md,
    padding: spacing.md,
    backgroundColor: "#E5F8EF",
    borderWidth: 1,
    borderColor: "#A9DFC5"
  },
  missionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    borderRadius: radii.md,
    padding: spacing.md,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line
  },
  rankText: {
    color: colors.teal,
    fontSize: 20,
    fontWeight: "900",
    width: 42
  },
  rowBody: {
    flex: 1
  },
  cardTitle: {
    color: colors.slate,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "900"
  },
  scoreText: {
    color: colors.slate,
    fontSize: 14,
    fontWeight: "900",
    textAlign: "right"
  },
  activityRow: {
    borderRadius: radii.md,
    padding: spacing.md,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line
  },
  activityRowActive: {
    borderRadius: radii.md,
    padding: spacing.md,
    backgroundColor: "#ECFFFA",
    borderWidth: 1,
    borderColor: "#BDEEE3"
  },
  activityHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.sm
  },
  timeText: {
    color: colors.teal,
    fontSize: 12,
    fontWeight: "900"
  },
  verificationRow: {
    flexDirection: "row",
    gap: spacing.sm,
    borderRadius: radii.md,
    padding: spacing.sm,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line
  },
  codeText: {
    color: colors.slate,
    fontSize: 13,
    fontWeight: "900"
  },
  syncNote: {
    marginTop: spacing.md,
    borderRadius: radii.md,
    padding: spacing.md,
    backgroundColor: colors.teal,
    borderWidth: 1,
    borderColor: colors.tealDark
  },
  syncText: {
    color: colors.white,
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "900"
  }
});

const statusStyles = StyleSheet.create({
  verified: {
    color: colors.success,
    fontSize: 11,
    fontWeight: "900",
    width: 68
  },
  rejected: {
    color: colors.danger,
    fontSize: 11,
    fontWeight: "900",
    width: 68
  },
  blocked: {
    color: colors.tealDark,
    fontSize: 11,
    fontWeight: "900",
    width: 68
  }
});
