"use client"

import React from "react"
import { AppSidebar } from "@/components/admin/sidebar/AppSidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { useDemoState } from "@/data/kopoinAdminMockData"
import { DemoControlToggle } from "@/components/admin/DemoControlToggle"

export interface BreadcrumbLinkData {
  label: string
  href: string
}

export interface AdminShellProps {
  children: React.ReactNode
  breadcrumbPage: string
  breadcrumbLinks?: BreadcrumbLinkData[]
  loadingText?: string
}

export function AdminShell({
  children,
  breadcrumbPage,
  breadcrumbLinks = [],
  loadingText = "Memuat...",
}: AdminShellProps) {
  const { isMounted } = useDemoState()

  if (!isMounted) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center bg-gray-50 text-gray-400 font-medium gap-4">
        <div className="relative flex items-center justify-center">
          <div className="absolute w-24 h-24 rounded-full border border-gray-100 border-t-[#0F6B63] animate-spin" style={{ animationDuration: '1.5s' }} />
          <img
            src="/simkopdes-symbol.png"
            alt="Simkopdes Loader"
            className="w-16 h-16 animate-pulse duration-1000 object-contain"
          />
        </div>
        <span className="text-xs font-semibold text-gray-400 tracking-wide mt-2 animate-pulse">{loadingText}</span>
      </div>
    )
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-gray-100 bg-white px-4 transition-[width,height] ease-linear">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1 text-gray-500 hover:text-gray-900" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4 bg-gray-200"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink render={<Link href="/admin/dashboard" />}>
                    Konsol Admin
                  </BreadcrumbLink>
                </BreadcrumbItem>
                
                {breadcrumbLinks.map((link, index) => (
                  <React.Fragment key={link.href + index}>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink render={<Link href={link.href} />}>
                        {link.label}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  </React.Fragment>
                ))}
                
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-semibold text-gray-900">
                    {breadcrumbPage}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6 bg-gray-50/30">
          <DemoControlToggle />
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
