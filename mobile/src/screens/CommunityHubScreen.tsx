import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  TextInput,
  Modal,
  ActivityIndicator,
  SafeAreaView,
  Dimensions
} from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  ChevronLeft,
  Search,
  MoreHorizontal,
  Calendar,
  MapPin,
  Users,
  CheckCircle,
  HelpCircle,
  Plus
} from "lucide-react-native";
import { colors, radii, shadows, spacing } from "../theme";
import { formatNumber } from "../utils/formatters";

type Community = {
  id: string;
  name: string;
  formedDate: string;
  formedTime: string;
  membersCount: number;
  about: string;
  locationName: string;
  locationAddress: string;
  avatarUris: string[];
  tag: string;
};

const COMMUNITIES: Community[] = [
  {
    id: "pemuda_sukamaju_hijau",
    name: "Pemuda Sukamaju Hijau",
    formedDate: "Thursday, January 09, 2020",
    formedTime: "07:00 AM GMT +7",
    membersCount: 37,
    tag: "Gotong Royong",
    about: "Komunitas Pemuda Sukamaju Hijau didirikan untuk menghimpun pemuda-pemudi desa dalam gerakan gotong-royong pelestarian lingkungan, penanaman pohon, dan digitalisasi Koperasi Desa Merah Putih. Bersama-sama kita menjaga keasrian dusun.",
    locationName: "Koperasi Merah Putih",
    locationAddress: "Dusun Krajan Tengah, Desa Sukamaju",
    avatarUris: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60"
    ]
  },
  {
    id: "tani_makmur_organik",
    name: "Tani Makmur Organik",
    formedDate: "Wednesday, March 15, 2021",
    formedTime: "08:30 AM GMT +7",
    membersCount: 24,
    tag: "Pertanian",
    about: "Himpunan petani muda dan pemerhati pangan Desa Sukamaju yang berfokus pada pengembangan pupuk organik mandiri, hidroponik koperasi, dan peningkatan nilai jual beras merah lokal.",
    locationName: "Gudang Tani Sukamaju",
    locationAddress: "Jl. Pertanian No. 88, Sukamaju",
    avatarUris: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=60"
    ]
  },
  {
    id: "srikandi_umkm_kreatif",
    name: "Srikandi UMKM Kreatif",
    formedDate: "Sunday, November 12, 2022",
    formedTime: "10:00 AM GMT +7",
    membersCount: 41,
    tag: "Koperasi & UMKM",
    about: "Komunitas pengrajin wanita Desa Sukamaju yang memproduksi tas anyaman bambu, batik khas merah putih, dan camilan lokal untuk dipasarkan melalui aplikasi Kopoin.",
    locationName: "Pusat Kreatif Srikandi",
    locationAddress: "RT 04 / RW 02, Desa Sukamaju",
    avatarUris: [
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60"
    ]
  }
];

type CommunityHubScreenProps = {
  user: any;
  onClose: () => void;
  onJoinCommunitySuccess: () => void;
  hasJoinedCommunity?: boolean;
};

export function CommunityHubScreen({
  user,
  onClose,
  onJoinCommunitySuccess,
  hasJoinedCommunity = false
}: CommunityHubScreenProps) {
  const [viewState, setViewState] = useState<"list" | "detail">("list");
  const [selectedComm, setSelectedComm] = useState<Community>(COMMUNITIES[0] as Community);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [joinReason, setJoinReason] = useState("");
  const [joinStatus, setJoinStatus] = useState<"idle" | "submitting" | "approved">("idle");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCommunities = COMMUNITIES.filter(comm =>
    comm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    comm.tag.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendRequest = () => {
    setJoinStatus("submitting");
    setTimeout(() => {
      setJoinStatus("approved");
    }, 2000);
  };

  const handleFinishJoin = () => {
    setShowJoinModal(false);
    setJoinStatus("idle");
    setJoinReason("");
    onJoinCommunitySuccess(); // triggers parent state to update and inject community missions!
  };

  if (viewState === "detail") {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />

        {/* Detail Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => setViewState("list")} activeOpacity={0.7}>
            <ChevronLeft size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerDetailTitle}>Community Details</Text>
          <TouchableOpacity style={styles.moreBtn} activeOpacity={0.7}>
            <MoreHorizontal size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView} contentContainerStyle={styles.detailScrollContent}>
          {/* Community Name */}
          <Text style={styles.detailName}>{selectedComm.name}</Text>

          {/* Date Formed Card */}
          <View style={styles.metaRow}>
            <View style={styles.calendarIconCircle}>
              <Calendar size={22} color="#00AA13" />
            </View>
            <View style={styles.metaTextContainer}>
              <Text style={styles.metaDateText}>{selectedComm.formedDate}</Text>
              <Text style={styles.metaTimeText}>{selectedComm.formedTime}</Text>
            </View>
          </View>

          {/* Members Avatars Row & Join Button */}
          <View style={styles.membersActionRow}>
            <View style={styles.avatarStackContainer}>
              {selectedComm.avatarUris.map((uri, index) => (
                <Image
                  key={index}
                  source={{ uri }}
                  style={[styles.stackedAvatar, { left: index * 20, zIndex: 10 - index }]}
                />
              ))}
              <View style={[styles.avatarCountBadge, { left: selectedComm.avatarUris.length * 20 }]}>
                <Text style={styles.avatarCountText}>+{selectedComm.membersCount - selectedComm.avatarUris.length}</Text>
              </View>
            </View>

            {hasJoinedCommunity ? (
              <View style={styles.joinedBadge}>
                <CheckCircle size={14} color="#10B981" />
                <Text style={styles.joinedBadgeText}>Joined</Text>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.joinBtnBlue}
                onPress={() => setShowJoinModal(true)}
                activeOpacity={0.8}
              >
                <Text style={styles.joinBtnBlueText}>Gabung Komunitas</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* About section */}
          <Text style={styles.sectionHeading}>About this Community</Text>
          <Text style={styles.aboutParagraph}>{selectedComm.about}</Text>

          {/* Location section */}
          <Text style={styles.sectionHeading}>Location</Text>

          {/* Custom Stylized Street Map Mockup exactly matching screen */}
          <View style={styles.mapContainer}>
            {/* Street Grid background illustration */}
            <View style={styles.mapGridBackground}>
              {/* Vertical streets grid */}
              <View style={[styles.mapLineVertical, { left: "15%" }]} />
              <View style={[styles.mapLineVertical, { left: "55%" }]} />
              <View style={[styles.mapLineVertical, { left: "85%" }]} />
              {/* Horizontal streets grid */}
              <View style={[styles.mapLineHorizontal, { top: "20%" }]} />
              <View style={[styles.mapLineHorizontal, { top: "50%" }]} />
              <View style={[styles.mapLineHorizontal, { top: "80%" }]} />

              {/* Street labels */}
              <Text style={[styles.streetLabel, { top: "8%", left: "20%" }]}>E Roy St</Text>
              <Text style={[styles.streetLabel, { top: "72%", left: "30%" }]}>E Thomas St</Text>
              <Text style={[styles.streetLabel, { top: "40%", left: "6%" }, styles.streetLabelRotated]}>15th Ave E</Text>
            </View>

            {/* Blue Map Marker Pin */}
            <View style={styles.mapMarkerContainer}>
              <View style={styles.markerCirclePulse} />
              <MapPin size={34} color="#00AA13" style={styles.markerIcon} />
            </View>

            {/* Floating marker details speech bubble */}
            <View style={styles.markerSpeechBubble}>
              <Text style={styles.bubbleTitle}>{selectedComm.locationName}</Text>
              <Text style={styles.bubbleSub} numberOfLines={1}>{selectedComm.locationAddress}</Text>
              <View style={styles.bubbleTail} />
            </View>
          </View>
        </ScrollView>

        {/* Join Community Bottom Dialog Sheet Modal */}
        <Modal visible={showJoinModal} transparent animationType="slide">
          <View style={styles.modalBackdrop}>
            <View style={styles.modalCard}>
              {joinStatus === "idle" && (
                <>
                  <Text style={styles.modalTitle}>Gabung {selectedComm.name}</Text>
                  <Text style={styles.modalDesc}>
                    Silakan tulis alasan Anda ingin bergabung dengan komunitas ini untuk ditinjau oleh Ketua Komunitas.
                  </Text>
                  <TextInput
                    value={joinReason}
                    onChangeText={setJoinReason}
                    style={styles.reasonInput}
                    placeholder="Contoh: Saya ingin berkontribusi dalam gotong royong penanaman pohon desa..."
                    multiline
                  />
                  <View style={styles.modalBtnRow}>
                    <TouchableOpacity
                      style={[styles.modalCloseBtn, { flex: 1, backgroundColor: "#E5E7EB" }]}
                      onPress={() => setShowJoinModal(false)}
                    >
                      <Text style={[styles.modalCloseBtnText, { color: "#4B5563" }]}>BATAL</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.modalCloseBtn, { flex: 1, backgroundColor: "#00AA13" }]}
                      onPress={handleSendRequest}
                    >
                      <Text style={styles.modalCloseBtnText}>KIRIM PERMOHONAN</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}

              {joinStatus === "submitting" && (
                <View style={styles.loaderContainer}>
                  <ActivityIndicator size="large" color="#00AA13" />
                  <Text style={styles.loaderText}>Mengirim permohonan ke Ketua Komunitas...</Text>
                  <Text style={styles.loaderSub}>Menunggu verifikasi instan tim.</Text>
                </View>
              )}

              {joinStatus === "approved" && (
                <View style={styles.successContainer}>
                  <View style={styles.successIconHeader}>
                    <CheckCircle size={54} color="#10B981" />
                  </View>
                  <Text style={styles.successTitle}>Permohonan Disetujui!</Text>
                  <Text style={styles.successDesc}>
                    Ketua Komunitas telah menyetujui alasan bergabung Anda. Misi kolaboratif tim sekarang tersedia di tab Misi Anda!
                  </Text>
                  <TouchableOpacity
                    style={[styles.modalCloseBtn, { backgroundColor: "#10B981", width: "100%" }]}
                    onPress={handleFinishJoin}
                  >
                    <Text style={styles.modalCloseBtnText}>MULAI MISI BERSAMA</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }

  // Browse Communities List Layout
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      {/* List Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={onClose} activeOpacity={0.7}>
          <ChevronLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Komunitas Desa</Text>
          <Text style={styles.headerSub}>Desa Sukamaju Mandiri</Text>
        </View>
        <View style={{ width: 36 }} />
      </View>

      {/* Communities list ScrollView */}
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>

        {/* Search bar widget */}
        <View style={styles.searchBarWrapper}>
          <View style={styles.searchBar}>
            <Search size={20} color="#9CA3AF" />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Cari nama komunitas..."
              style={styles.searchInput}
            />
          </View>
        </View>

        {/* List content */}
        <View style={styles.listContainer}>
          {filteredCommunities.length > 0 ? (
            filteredCommunities.map((comm) => (
              <TouchableOpacity
                key={comm.id}
                style={styles.communityCard}
                onPress={() => {
                  setSelectedComm(comm);
                  setViewState("detail");
                }}
                activeOpacity={0.9}
              >
                <View style={styles.cardHeader}>
                  <View style={styles.tagBadge}>
                    <Text style={styles.tagText}>{comm.tag}</Text>
                  </View>
                  <Text style={styles.cardDate}>{comm.formedDate}</Text>
                </View>

                <Text style={styles.cardTitleText}>{comm.name}</Text>
                <Text style={styles.cardDescText} numberOfLines={2}>
                  {comm.about}
                </Text>

                <View style={styles.cardFooter}>
                  <View style={styles.memberStatRow}>
                    <Users size={16} color="#6B7280" />
                    <Text style={styles.memberStatText}>{comm.membersCount} Anggota Terdaftar</Text>
                  </View>
                  <Text style={styles.openDetailText}>Lihat Detail →</Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <HelpCircle size={44} color="#9CA3AF" />
              <Text style={styles.emptyText}>Komunitas tidak ditemukan.</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB"
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    backgroundColor: colors.white
  },
  backBtn: {
    padding: 6,
    borderRadius: 999,
    backgroundColor: "#F3F4F6"
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
  headerDetailTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: colors.text,
    textAlign: "center"
  },
  moreBtn: {
    padding: 6
  },
  scrollView: {
    flex: 1
  },
  searchBarWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.white
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1.2,
    borderColor: "#E5E7EB"
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: colors.text,
    fontWeight: "700"
  },
  listContainer: {
    padding: 16,
    gap: 16
  },
  communityCard: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 2
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  tagBadge: {
    backgroundColor: "#E6F0FA",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6
  },
  tagText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#00AA13"
  },
  cardDate: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.muted
  },
  cardTitleText: {
    fontSize: 17,
    fontWeight: "900",
    color: colors.text,
    marginTop: 12
  },
  cardDescText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#6B7280",
    lineHeight: 18,
    marginTop: 6
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    paddingTop: 12,
    marginTop: 14
  },
  memberStatRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6
  },
  memberStatText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#6B7280"
  },
  openDetailText: {
    fontSize: 12,
    fontWeight: "900",
    color: "#00AA13"
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: 80,
    gap: 8
  },
  emptyText: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.muted
  },

  // Details screen styles
  detailScrollContent: {
    padding: 20,
    backgroundColor: colors.white,
    minHeight: Dimensions.get("window").height
  },
  detailName: {
    fontSize: 26,
    fontWeight: "900",
    color: colors.text,
    lineHeight: 32,
    marginBottom: 16
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 20
  },
  calendarIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#E6F0FA",
    alignItems: "center",
    justifyContent: "center"
  },
  metaTextContainer: {
    marginLeft: 12
  },
  metaDateText: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.text
  },
  metaTimeText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.muted,
    marginTop: 2
  },
  membersActionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24
  },
  avatarStackContainer: {
    flexDirection: "row",
    position: "relative",
    width: 140,
    height: 40
  },
  stackedAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.white,
    position: "absolute"
  },
  avatarCountBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#00AA13",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors.white,
    position: "absolute"
  },
  avatarCountText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: "900"
  },
  joinBtnBlue: {
    backgroundColor: "#00AA13",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    shadowColor: "#00AA13",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3
  },
  joinBtnBlueText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "900"
  },
  joinedBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#E6F8F5",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#A3E635"
  },
  joinedBadgeText: {
    color: "#10B981",
    fontSize: 14,
    fontWeight: "900"
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: "900",
    color: colors.text,
    marginTop: 12,
    marginBottom: 8
  },
  aboutParagraph: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 22,
    fontWeight: "700",
    marginBottom: 20
  },

  // Map Mockup styling
  mapContainer: {
    width: "100%",
    height: 240,
    borderRadius: 20,
    backgroundColor: "#E5E7EB",
    overflow: "hidden",
    position: "relative",
    borderWidth: 1.5,
    borderColor: "#D1D5DB"
  },
  mapGridBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#F3F4F6"
  },
  mapLineVertical: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 24,
    backgroundColor: "#FFFFFF",
    opacity: 0.7
  },
  mapLineHorizontal: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 24,
    backgroundColor: "#FFFFFF",
    opacity: 0.7
  },
  streetLabel: {
    position: "absolute",
    fontSize: 9,
    color: "#9CA3AF",
    fontWeight: "800"
  },
  streetLabelRotated: {
    transform: [{ rotate: "-90deg" }]
  },
  mapMarkerContainer: {
    position: "absolute",
    left: "48%",
    top: "55%",
    alignItems: "center",
    justifyContent: "center"
  },
  markerCirclePulse: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#93C5FD",
    position: "absolute",
    opacity: 0.6
  },
  markerIcon: {
    marginTop: -16
  },
  markerSpeechBubble: {
    position: "absolute",
    left: "24%",
    top: "22%",
    backgroundColor: colors.white,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB"
  },
  bubbleTitle: {
    fontSize: 13,
    fontWeight: "900",
    color: "#00AA13"
  },
  bubbleSub: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.muted,
    marginTop: 2,
    width: 130,
    textAlign: "center"
  },
  bubbleTail: {
    width: 12,
    height: 12,
    backgroundColor: colors.white,
    transform: [{ rotate: "45deg" }],
    position: "absolute",
    bottom: -6,
    alignSelf: "center",
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#E5E7EB"
  },

  // Modal styling
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
    width: "100%",
    alignItems: "center"
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: colors.text,
    marginBottom: 8,
    alignSelf: "flex-start"
  },
  modalDesc: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.muted,
    lineHeight: 18,
    marginBottom: 16,
    alignSelf: "flex-start"
  },
  reasonInput: {
    width: "100%",
    height: 100,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    padding: 12,
    textAlignVertical: "top",
    color: colors.text,
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 16
  },
  modalBtnRow: {
    flexDirection: "row",
    gap: 12,
    width: "100%"
  },
  modalCloseBtn: {
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center"
  },
  modalCloseBtnText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "900"
  },
  loaderContainer: {
    paddingVertical: 30,
    alignItems: "center",
    gap: 12
  },
  loaderText: {
    fontSize: 14,
    fontWeight: "900",
    color: colors.text
  },
  loaderSub: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.muted
  },
  successContainer: {
    alignItems: "center",
    width: "100%",
    paddingVertical: 12
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
  successTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: colors.text,
    textAlign: "center"
  },
  successDesc: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.muted,
    textAlign: "center",
    lineHeight: 18,
    marginTop: 8,
    marginBottom: 20
  }
});
