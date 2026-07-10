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
  loadingText: _loadingText = "Memuat...",
}: AdminShellProps) {
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
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
