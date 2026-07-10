import {
  GalleryVerticalEnd,
  LayoutDashboard,
  Megaphone,
  Activity,
  Target,
} from "lucide-react"

export const sidebarConfig = {
  teams: [
    {
      name: "Koperasi Sukamaju",
      logo: GalleryVerticalEnd,
      plan: "Campaign Console",
    },
  ],
  navGroups: [
    {
      label: "Koperasi",
      items: [
        {
          title: "Ringkasan Dasbor",
          url: "/admin/dashboard",
          icon: LayoutDashboard,
        },
        {
          title: "Daftar Kampanye",
          url: "/admin/campaigns",
          icon: Megaphone,
        },
      ],
    },
    {
      label: "Anggota",
      items: [
        {
          title: "Aktivitas Anggota",
          url: "/admin/activities",
          icon: Activity,
        },
      ],
    },
    {
      label: "Statistik & Data",
      items: [
        {
          title: "Kinerja Misi",
          url: "/admin/missions",
          icon: Target,
        },
      ],
    },
  ],
}
