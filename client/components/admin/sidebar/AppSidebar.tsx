"use client"

import * as React from "react"
import Image from "next/image"
import { NavMain } from "@/components/admin/sidebar/NavMain"
import { NavUser } from "@/components/admin/sidebar/NavUser"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import { sidebarConfig } from "@/components/admin/sidebar/sidebarConfig"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar()
  const [user, setUser] = React.useState({
    name: "Admin",
    email: "admin@kopoin.id",
    avatar: "https://api.dicebear.com/9.x/lorelei/svg?seed=admin",
  })

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user")
      if (storedUser) {
        try {
          const parsed = JSON.parse(storedUser)
          setUser({
            name: parsed.name || "Admin",
            email: parsed.email || "admin@kopoin.id",
            avatar: parsed.avatar || `https://api.dicebear.com/9.x/lorelei/svg?seed=${parsed.name || 'admin'}`,
          })
        } catch (e) {
          console.error("Gagal parse data user", e)
        }
      }
    }
  }, [])

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="flex items-center justify-center py-4 border-b border-gray-100/50">
        {state === "expanded" ? (
          <div className="px-2 w-full flex items-center">
            <Image
              src="/simkopdes.png"
              alt="Simkopdes Logo"
              width={180}
              height={45}
              className="h-10 w-auto object-contain"
              priority
            />
          </div>
        ) : (
          <div className="flex h-8 w-8 items-center justify-center">
            <Image
              src="/simkopdes-symbol.png"
              alt="Simkopdes Symbol"
              width={32}
              height={32}
              className="h-7 w-7 object-contain"
              priority
            />
          </div>
        )}
      </SidebarHeader>
      <SidebarContent>
        <NavMain groups={sidebarConfig.navGroups} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
