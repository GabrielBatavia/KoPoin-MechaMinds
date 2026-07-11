"use client";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useScroll } from "@/hooks/use-scroll";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/mobile-nav";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, LayoutDashboard, LogOut } from "lucide-react";
import { logoutUseCase } from "@/lib/dependencies";
import toast from "react-hot-toast";

export const navLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Ranking",
    href: "/ranking",
  },
  {
    label: "About Us",
    href: "#",
  },
  {
    label: "Fitur",
    href: "#",
  },
  {
    label: "Download Aplikasi",
    href: "/download",
  },
];

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const scrolled = useScroll(10);
  const [user, setUser] = useState<{ name: string; email: string; avatar?: string } | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const stored = localStorage.getItem("user");
      if (token && stored) {
        try {
          setUser(JSON.parse(stored));
        } catch (e) {
          console.error("Gagal membaca data session user", e);
        }
      }
    }
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUseCase.execute();
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
      }
      setUser(null);
      toast.success("Berhasil keluar!");
      window.location.href = "/";
    } catch (e: any) {
      toast.error(e.message || "Gagal keluar");
    }
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 mx-auto w-full max-w-4xl border-transparent border-b md:rounded-md md:border md:transition-all md:ease-out",
        isHome
          ? {
              "border-border bg-transparent backdrop-blur-sm supports-backdrop-filter:bg-transparent md:top-2 md:max-w-3xl md:shadow":
                scrolled,
            }
          : "border-border bg-white md:top-2 md:max-w-3xl md:shadow"
      )}
    >
      <nav
        className={cn(
          "flex h-14 rounded-lg w-full items-center justify-between px-4 md:h-12 md:transition-all md:ease-out",
          isHome
            ? scrolled
              ? "md:px-2 bg-white text-black"
              : "text-white bg-transparent"
            : "md:px-2 bg-white text-black"
        )}
      >
        <Link
          className="rounded-md p-1 hover:bg-muted dark:hover:bg-muted/50 flex items-center"
          href="/"
        >
          <Image
            src={isHome && !scrolled ? "/white-logo.png" : "/logo.png"}
            alt="Kopoin Logo"
            width={120}
            height={32}
            className="w-auto object-contain transition-all duration-300"
            style={{ 
              height: (isHome && !scrolled) ? "32px" : "24px"
            }}
          />
        </Link>
        <div className="hidden items-center gap-2 md:flex" >
          <div className="mr-2">
            {navLinks.map((link) => (
              <Button key={link.label} size="sm" variant="ghost" className="cursor-pointer">
                <Link href={link.href}>{link.label}</Link>
              </Button>
            ))}
          </div>
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <button
                    className={cn(
                      "flex items-center gap-2 px-3 py-1.5 rounded-full border cursor-pointer transition-all outline-none",
                      (isHome && !scrolled)
                        ? "bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30"
                        : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 shadow-xs"
                    )}
                  />
                }
              >
                <Avatar className="h-6 w-6 rounded-full border border-white/20 shrink-0">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="text-[9px] bg-teal-100 text-teal-800 font-bold">
                    {user.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs font-bold max-w-[110px] truncate transition-colors">
                  {user.name}
                </span>
                <ChevronDown className="size-3.5 opacity-80" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 mt-2 rounded-lg" align="end" sideOffset={4}>
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-2 py-1.5 text-left text-sm">
                      <Avatar className="h-8 w-8 rounded-full border border-gray-100">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="bg-teal-100 text-teal-800 font-bold">
                          {user.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold text-gray-900">{user.name}</span>
                        <span className="truncate text-xs text-gray-500">{user.email}</span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem className="cursor-pointer" onClick={() => window.location.href = "/admin/dashboard"}>
                    <LayoutDashboard className="size-4 text-teal-600" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer text-red-500 font-medium focus:text-red-500 focus:bg-red-50/50 dark:focus:bg-red-950/20"
                >
                  <LogOut className="size-4 text-red-500" />
                  <span>Keluar</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login" className="cursor-pointer">
              <Button size="sm" className="bg-[#0F6B63] hover:bg-[#0c5c55] cursor-pointer text-white font-medium">
                Login
              </Button>
            </Link>
          )}
        </div>
        <MobileNav user={user} onLogout={handleLogout} />
      </nav>
    </header>
  );
}
