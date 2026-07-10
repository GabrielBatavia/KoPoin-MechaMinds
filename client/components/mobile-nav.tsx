import { cn } from "@/lib/utils";
import React from "react";
import { Button } from "@/components/ui/button";
import { Portal, PortalBackdrop } from "@/components/ui/portal";
import { navLinks } from "@/components/navbar";
import { XIcon, MenuIcon, LayoutDashboard, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface MobileNavProps {
  user: { name: string; email: string; avatar?: string } | null;
  onLogout: () => void;
}

export function MobileNav({ user, onLogout }: MobileNavProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="md:hidden">
      <Button
        aria-controls="mobile-menu"
        aria-expanded={open}
        aria-label="Toggle menu"
        className="md:hidden"
        onClick={() => setOpen(!open)}
        size="icon"
        variant="outline"
      >
        {open ? (
          <XIcon className="size-4.5" />
        ) : (
          <MenuIcon className="size-4.5" />
        )}
      </Button>
      {open && (
        <Portal className="top-14" id="mobile-menu">
          <PortalBackdrop />
          <div
            className={cn(
              "data-[slot=open]:zoom-in-97 ease-out data-[slot=open]:animate-in",
              "size-full p-4",
            )}
            data-slot={open ? "open" : "closed"}
          >
            <div className="grid gap-y-2">
              {navLinks.map((link) => (
                <Button
                  className="justify-start"
                  key={link.label}
                  variant="ghost"
                >
                  <a href={link.href}>{link.label}</a>
                </Button>
              ))}
            </div>
            <div className="mt-12 flex flex-col gap-2 border-t border-gray-100 pt-4">
              {user ? (
                <>
                  <div className="flex items-center gap-3 px-3 py-2 text-left mb-2">
                    <Avatar className="h-10 w-10 rounded-full border border-gray-200">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="bg-teal-100 text-teal-800 font-bold">
                        {user.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 leading-tight">
                      <span className="truncate font-semibold text-gray-900">{user.name}</span>
                      <span className="truncate text-xs text-gray-500">{user.email}</span>
                    </div>
                  </div>
                  <Button
                    className="w-full justify-start gap-2 bg-gray-50 text-gray-800 border border-gray-200 hover:bg-gray-100 cursor-pointer"
                    variant="outline"
                    onClick={() => {
                      setOpen(false);
                      window.location.href = "/admin/dashboard";
                    }}
                  >
                    <LayoutDashboard className="size-4 text-teal-600" />
                    <span>Dashboard</span>
                  </Button>
                  <Button
                    className="w-full justify-start gap-2 bg-rose-50 text-rose-700 border border-rose-100 hover:bg-rose-100 cursor-pointer"
                    variant="outline"
                    onClick={() => {
                      setOpen(false);
                      onLogout();
                    }}
                  >
                    <LogOut className="size-4 text-rose-500" />
                    <span>Keluar</span>
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    className="w-full cursor-pointer"
                    variant="outline"
                    onClick={() => {
                      setOpen(false);
                      window.location.href = "/login";
                    }}
                  >
                    Sign In
                  </Button>
                  <Button
                    className="w-full bg-[#0F6B63] hover:bg-[#0c5c55] cursor-pointer text-white font-medium"
                    onClick={() => {
                      setOpen(false);
                      window.location.href = "/register";
                    }}
                  >
                    Daftar Anggota
                  </Button>
                </>
              )}
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
}
