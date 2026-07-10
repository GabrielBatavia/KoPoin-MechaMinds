"use client";

import React from "react";
import { Users, CheckCircle2, Award } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatItem {
  badgeText: string;
  icon: React.ReactNode;
  value: string;
  boldText: string;
  description: string;
}

interface StatsSectionProps {
  className?: string;
  title?: string;
  subtitle?: string;
  stats?: StatItem[];
}

export function StatsSection({ className, stats }: StatsSectionProps) {
  const defaultStats: StatItem[] = [
    {
      badgeText: "Partisipasi Anggota",
      icon: <Users className="size-3.5 text-slate-600" />,
      value: "128",
      boldText: "128 Anggota Aktif",
      description:
        " terdiri dari Gen Z & Gen Alpha desa yang berpartisipasi langsung dalam campaign.",
    },
    {
      badgeText: "Penyelesaian Misi",
      icon: <CheckCircle2 className="size-3.5 text-slate-600" />,
      value: "342",
      boldText: "342 Misi Sukses",
      description:
        " diselesaikan melalui verifikasi transaksi produk lokal dan kunjungan fisik.",
    },
    {
      badgeText: "Poin Terdistribusi",
      icon: <Award className="size-3.5 text-slate-600" />,
      value: "18.4K",
      boldText: "18.450 Kopoin",
      description:
        " loyalitas terdistribusi ke seluruh tim untuk mendukung ekonomi lokal.",
    },
  ];

  const displayStats = stats || defaultStats;

  return (
    <section className={cn("w-full py-16 md:py-24 bg-white", className)}>
      <div className="max-w-5xl mx-auto px-6 flex flex-col items-center">
        <div className="mx-auto mb-10 max-w-2xl space-y-2 text-center">
          <h2 className="mb-5 text-center font-medium text-foreground text-xl tracking-tight md:text-3xl">
            <span className="text-muted-foreground">
              Dampak & Keaktifan
            </span>{" "}
            <span className="font-semibold">Komunitas</span>
          </h2>

          <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
            Statistik pencapaian campaign koperasi Sukamaju oleh anggota muda.
          </p>
        </div>

        <div className="w-full flex flex-col md:flex-row items-stretch md:items-end justify-center gap-6 md:gap-8 min-h-[420px]">
          {displayStats.map((item, idx) => {
            const minHeightClass = idx === 1 
              ? "min-h-[330px] md:min-h-[360px]" 
              : "min-h-[380px] md:min-h-[410px]";

            return (
              <div
                key={idx}
                className={cn(
                  "flex-1 bg-white border border-slate-200/70 rounded-2xl p-8 flex flex-col items-start justify-between shadow-[0_4px_25px_rgba(0,0,0,0.015)] hover:shadow-md hover:border-slate-300 transition-all duration-300",
                  minHeightClass
                )}
              >
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-slate-200 bg-transparent text-xs font-normal text-slate-700">
                  {item.icon}
                  <span>{item.badgeText}</span>
                </div>
                <div className="text-[72px] md:text-[80px] font-light tracking-tighter text-slate-950 my-6 leading-none select-none">
                  {item.value}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed text-left">
                  <strong className="font-bold text-slate-900">
                    {item.boldText}
                  </strong>
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
