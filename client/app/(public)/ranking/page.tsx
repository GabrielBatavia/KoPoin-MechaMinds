"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Trophy, Clock, ArrowLeft, TrendingUp, Sparkles, LogIn } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface LeaderboardUser {
  rank: number;
  name: string;
  username: string;
  followers: string;
  points: string;
  reward: string;
  avatar: string;
}

const DiamondIcon = ({ className = "size-5" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`${className} text-[#0284c7] shrink-0`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2L2 9l10 13 10-13-10-7z" fillOpacity="0.8" />
    <path d="M12 2L6 9l6 13M12 2l6 9-6 13" stroke="rgba(255,255,255,0.45)" strokeWidth="0.5" fill="none" />
    <path d="M2 9h20" stroke="rgba(255,255,255,0.45)" strokeWidth="0.5" fill="none" />
    <path d="M6 9l6-7 6 7-6 13-6-13z" fill="rgba(255,255,255,0.15)" />
  </svg>
);

const dailyTopThree: LeaderboardUser[] = [
  {
    rank: 1,
    name: "Jolie Joie",
    username: "@joliejoie",
    followers: "24,850",
    points: "2,840",
    reward: "100,000",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&h=256&fit=crop"
  },
  {
    rank: 2,
    name: "Brian Ngo",
    username: "@brianngo",
    followers: "15,210",
    points: "2,350",
    reward: "50,000",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&h=256&fit=crop"
  },
  {
    rank: 3,
    name: "David Do",
    username: "@daviddo",
    followers: "12,980",
    points: "2,120",
    reward: "20,000",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&h=256&fit=crop"
  }
];

const dailyOthers: LeaderboardUser[] = [
  {
    rank: 4,
    name: "Henrietta O'Connell",
    username: "@henrietta",
    followers: "12,241",
    points: "2,114,424",
    reward: "1,000",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=256&h=256&fit=crop"
  },
  {
    rank: 5,
    name: "Darrel Bins",
    username: "@darrel",
    followers: "12,241",
    points: "2,114,424",
    reward: "1,000",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256&h=256&fit=crop"
  },
  {
    rank: 6,
    name: "Sarah Connor",
    username: "@sconnor",
    followers: "11,890",
    points: "1,984,300",
    reward: "500",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=256&h=256&fit=crop"
  },
  {
    rank: 7,
    name: "Alex Mercer",
    username: "@amercer",
    followers: "9,940",
    points: "1,850,200",
    reward: "500",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=256&h=256&fit=crop"
  },
  {
    rank: 8,
    name: "Jessica Alba",
    username: "@jalba",
    followers: "8,810",
    points: "1,732,900",
    reward: "200",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256&h=256&fit=crop"
  }
];

const monthlyTopThree: LeaderboardUser[] = [
  {
    rank: 1,
    name: "Michael Scott",
    username: "@mscott",
    followers: "54,200",
    points: "42,800",
    reward: "500,000",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=256&h=256&fit=crop"
  },
  {
    rank: 2,
    name: "Pam Beesly",
    username: "@pamb",
    followers: "38,500",
    points: "35,400",
    reward: "250,000",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256&h=256&fit=crop"
  },
  {
    rank: 3,
    name: "Jim Halpert",
    username: "@jimh",
    followers: "31,900",
    points: "32,100",
    reward: "100,000",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&h=256&fit=crop"
  }
];

const monthlyOthers: LeaderboardUser[] = [
  {
    rank: 4,
    name: "Dwight Schrute",
    username: "@dwights",
    followers: "28,150",
    points: "29,450,200",
    reward: "5,000",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&h=256&fit=crop"
  },
  {
    rank: 5,
    name: "Angela Martin",
    username: "@angelam",
    followers: "15,400",
    points: "25,120,400",
    reward: "5,000",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&h=256&fit=crop"
  },
  {
    rank: 6,
    name: "Stanley Hudson",
    username: "@stanley",
    followers: "12,200",
    points: "22,890,300",
    reward: "2,500",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=256&h=256&fit=crop"
  },
  {
    rank: 7,
    name: "Ryan Howard",
    username: "@tempryan",
    followers: "11,900",
    points: "20,450,100",
    reward: "2,500",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&h=256&fit=crop"
  },
  {
    rank: 8,
    name: "Kelly Kapoor",
    username: "@kkelly",
    followers: "24,300",
    points: "18,920,000",
    reward: "1,000",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=256&h=256&fit=crop"
  }
];

export default function RankingPage() {
  const [period, setPeriod] = useState<"daily" | "monthly">("daily");
  const [timeLeft, setTimeLeft] = useState("");
  const [currentUser, setCurrentUser] = useState<{ name: string; avatar?: string } | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("user");
      if (stored) {
        try {
          setCurrentUser(JSON.parse(stored));
        } catch (e) {
          console.error("Gagal membaca user data", e);
        }
      }
    }
  }, []);

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const end = period === "daily"
        ? new Date(new Date().setHours(23, 59, 59, 999))
        : new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

      const diff = end.getTime() - now.getTime();
      if (diff <= 0) {
        setTimeLeft(period === "daily" ? "00h 00m 00s" : "00d 00h 00m 00s");
        return;
      }

      const totalSecs = Math.floor(diff / 1000);
      const secs = totalSecs % 60;
      const totalMins = Math.floor(totalSecs / 60);
      const mins = totalMins % 60;
      const totalHours = Math.floor(totalMins / 60);
      const hours = totalHours % 24;
      const days = Math.floor(totalHours / 24);

      const pad = (n: number) => n.toString().padStart(2, "0");

      if (period === "daily") {
        setTimeLeft(`${pad(totalHours)}h ${pad(mins)}m ${pad(secs)}s`);
      } else {
        setTimeLeft(`${days}d ${pad(hours)}h ${pad(mins)}m ${pad(secs)}s`);
      }
    };

    calculateTimeRemaining();
    const intervalId = setInterval(calculateTimeRemaining, 1000);
    return () => clearInterval(intervalId);
  }, [period]);

  const currentTopThree = period === "daily" ? dailyTopThree : monthlyTopThree;
  const currentOthers = period === "daily" ? dailyOthers : monthlyOthers;

  const rank1 = currentTopThree.find((u) => u.rank === 1)!;
  const rank2 = currentTopThree.find((u) => u.rank === 2)!;
  const rank3 = currentTopThree.find((u) => u.rank === 3)!;

  return (
    <div className="relative w-full flex-grow overflow-x-hidden pt-8 pb-16 px-4 md:px-8 text-slate-800 bg-white">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[340px] bg-[radial-gradient(ellipse_at_top,rgba(14,165,233,0.08),transparent_55%)] pointer-events-none z-0" />
      
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center">
        <div className="text-center mb-8 mt-10">
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-slate-900">
            Papan Peringkat Koperasi
          </h2>
          <p className="text-xs md:text-sm text-slate-500 mt-2.5 max-w-md mx-auto leading-relaxed">
            Dapatkan poin dengan menyelesaikan misi transaksi koperasi dan rebut hadiah menarik di akhir periode!
          </p>
        </div>

        <div className="flex bg-slate-100 rounded-full p-1 border border-slate-200/80 w-fit mb-12 shadow-sm">
          <button
            onClick={() => setPeriod("daily")}
            className={`relative px-8 py-2 rounded-full text-xs font-bold tracking-wider transition-all duration-300 uppercase cursor-pointer ${
              period === "daily"
                ? "bg-white text-slate-900 border border-slate-200/80 shadow-xs"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Daily
          </button>
          <button
            onClick={() => setPeriod("monthly")}
            className={`relative px-8 py-2 rounded-full text-xs font-bold tracking-wider transition-all duration-300 uppercase cursor-pointer ${
              period === "monthly"
                ? "bg-white text-slate-900 border border-slate-200/80 shadow-xs"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Monthly
          </button>
        </div>

        <div className="w-full grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 items-end mt-4 mb-8">
          <motion.div
            key={`rank2-${period}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col items-center"
          >
            <div className="flex flex-col items-center mb-3 text-center">
              <div className="relative group">
                <div className="absolute inset-0 bg-slate-200 rounded-2xl blur-md opacity-40 group-hover:opacity-75 transition-opacity" />
                <img
                  src={rank2.avatar}
                  alt={rank2.name}
                  className="relative size-12 xs:size-14 sm:size-20 md:size-24 rounded-2xl object-cover border-2 border-slate-300 shadow-lg transition-transform group-hover:scale-105"
                />
              </div>
              <span className="mt-2.5 text-[10px] sm:text-xs md:text-sm font-bold text-slate-800 truncate max-w-[70px] sm:max-w-[120px] md:max-w-none">
                {rank2.name}
              </span>
            </div>

            <div className="relative w-full bg-gradient-to-b from-[#1e293b] to-[#0f172a] border border-slate-800 rounded-t-2xl shadow-xl flex flex-col items-center justify-start p-2 sm:p-4 md:p-6 h-28 sm:h-38 md:h-44 text-center">
              <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-slate-400/30 to-transparent" />
              
              <div className="bg-slate-700/50 text-slate-200 rounded-lg p-1.5 sm:p-2 mb-2 border border-slate-600/30 shadow-sm shrink-0">
                <Trophy className="size-3.5 sm:size-4 md:size-5 text-slate-300" />
              </div>
              
              <span className="text-[7px] sm:text-[10px] md:text-xs text-slate-400 font-medium uppercase tracking-wider">
                Earn 2,000 pts
              </span>
              
              <div className="flex items-center gap-0.5 sm:gap-1.5 mt-1 sm:mt-2">
                <DiamondIcon className="size-3.5 sm:size-4 md:size-6 text-[#56CCF2]" />
                <span className="text-xs sm:text-lg md:text-2xl font-extrabold text-white leading-none">
                  {rank2.reward}
                </span>
              </div>
              <span className="text-[7px] sm:text-[9px] md:text-xs text-slate-500 font-bold uppercase mt-0.5 tracking-widest">
                Prize
              </span>
            </div>
          </motion.div>

          <motion.div
            key={`rank1-${period}`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0 }}
            className="flex flex-col items-center relative z-20"
          >
            <div className="flex flex-col items-center mb-3 text-center">
              <div className="relative group">
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-8 h-8 text-amber-400">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="size-6 sm:size-8 drop-shadow-[0_2px_8px_rgba(234,179,8,0.5)]">
                    <path d="M5 16L3 5l5 5 4-7 4 7 5-5-2 11H5z" />
                  </svg>
                </div>
                <div className="absolute inset-0 bg-amber-400/20 rounded-2xl blur-xl opacity-75 animate-pulse" />
                <img
                  src={rank1.avatar}
                  alt={rank1.name}
                  className="relative size-14 xs:size-16 sm:size-24 md:size-28 rounded-2xl object-cover border-2 border-amber-400 shadow-2xl transition-transform group-hover:scale-105"
                />
              </div>
              <span className="mt-3.5 text-xs sm:text-sm md:text-base font-extrabold text-slate-900 truncate max-w-[80px] sm:max-w-[130px] md:max-w-none">
                {rank1.name}
              </span>
            </div>

            <div className="relative w-full bg-gradient-to-b from-[#0f172a] to-[#020617] border border-blue-500/25 rounded-t-2xl shadow-2xl flex flex-col items-center justify-start p-2 sm:p-4 md:p-6 h-36 sm:h-48 md:h-56 text-center">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />
              
              <div className="bg-amber-400 text-slate-950 rounded-lg p-1.5 sm:p-2.5 mb-2 shadow-[0_4px_12px_rgba(234,179,8,0.4)] shrink-0">
                <Trophy className="size-3.5 sm:size-4 md:size-5 text-slate-950 fill-slate-950" />
              </div>
              
              <span className="text-[7px] sm:text-[10px] md:text-xs text-slate-300 font-semibold uppercase tracking-wider">
                Earn 2,000 pts
              </span>
              
              <div className="flex items-center gap-0.5 sm:gap-1.5 mt-1.5 sm:mt-2.5">
                <DiamondIcon className="size-4 sm:size-5 md:size-7 text-[#56CCF2]" />
                <span className="text-sm sm:text-xl md:text-3xl font-black text-white leading-none tracking-tight">
                  {rank1.reward}
                </span>
              </div>
              <span className="text-[7px] sm:text-[9px] md:text-xs text-slate-400 font-bold uppercase mt-0.5 tracking-widest">
                Prize
              </span>

              <div className="mt-auto pt-2 flex flex-col items-center gap-0.5 sm:gap-1 w-full shrink-0 border-t border-white/5">
                <div className="flex items-center gap-1 text-[7px] sm:text-[9px] md:text-[10px] text-slate-400 font-medium">
                  <Clock className="size-2.5 sm:size-3 text-sky-400 shrink-0" />
                  <span>Ends in</span>
                </div>
                <span className="text-[8px] sm:text-[10px] md:text-sm font-black text-slate-100 tracking-wider font-mono bg-slate-950/60 px-1.5 py-0.5 rounded-md border border-white/5 w-full max-w-[130px] truncate text-center">
                  {timeLeft || "Calculating..."}
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            key={`rank3-${period}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <div className="flex flex-col items-center mb-3 text-center">
              <div className="relative group">
                <div className="absolute inset-0 bg-amber-700/10 rounded-2xl blur-md opacity-40 group-hover:opacity-75 transition-opacity" />
                <img
                  src={rank3.avatar}
                  alt={rank3.name}
                  className="relative size-12 xs:size-14 sm:size-20 md:size-24 rounded-2xl object-cover border-2 border-amber-600/30 shadow-lg transition-transform group-hover:scale-105"
                />
              </div>
              <span className="mt-2.5 text-[10px] sm:text-xs md:text-sm font-bold text-slate-800 truncate max-w-[70px] sm:max-w-[120px] md:max-w-none">
                {rank3.name}
              </span>
            </div>

            <div className="relative w-full bg-gradient-to-b from-[#1e293b] to-[#0f172a] border border-slate-800 rounded-t-2xl shadow-xl flex flex-col items-center justify-start p-2 sm:p-4 md:p-6 h-24 sm:h-34 md:h-38 text-center">
              <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-amber-600/40 to-transparent" />
              
              <div className="bg-amber-900/40 text-amber-500 rounded-lg p-1.5 sm:p-2 mb-2 border border-amber-800/30 shadow-sm shrink-0">
                <Trophy className="size-3.5 sm:size-4 md:size-5 text-amber-500" />
              </div>
              
              <span className="text-[7px] sm:text-[10px] md:text-xs text-slate-400 font-medium uppercase tracking-wider">
                Earn 2,000 pts
              </span>
              
              <div className="flex items-center gap-0.5 sm:gap-1.5 mt-1 sm:mt-2">
                <DiamondIcon className="size-3.5 sm:size-4 md:size-6 text-[#56CCF2]" />
                <span className="text-xs sm:text-lg md:text-2xl font-extrabold text-white leading-none">
                  {rank3.reward}
                </span>
              </div>
              <span className="text-[7px] sm:text-[9px] md:text-xs text-slate-500 font-bold uppercase mt-0.5 tracking-widest">
                Prize
              </span>
            </div>
          </motion.div>
        </div>

        <div className="w-full max-w-3xl mb-8">
          {currentUser ? (
            <div className="w-full bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-3">
                <Avatar className="size-10 rounded-full border border-teal-600/30">
                  <AvatarImage src={currentUser.avatar} />
                  <AvatarFallback className="bg-teal-100 text-teal-800 font-bold">
                    {currentUser.name.slice(0,2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center sm:text-left">
                  <p className="text-sm font-semibold text-slate-800">
                    Halo, <span className="text-[#0F6B63] font-bold">{currentUser.name}</span>!
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Lihat akumulasi kontribusimu di bawah ini.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs md:text-sm font-semibold bg-white px-4 py-2 rounded-xl border border-slate-200 w-full sm:w-auto justify-center shadow-xs">
                <span className="text-slate-600">Kamu mengumpulkan</span>
                <span className="flex items-center gap-1 text-[#0284c7] font-extrabold">
                  <DiamondIcon className="size-4" /> 12
                </span>
                <span className="text-slate-500">hari ini dan berada di peringkat</span>
                <span className="text-[#0F6B63] font-bold">#152</span>
                <span className="text-slate-400">dari 23,141 users</span>
              </div>
            </div>
          ) : (
            <div className="w-full bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
              <div className="flex items-center gap-2 text-xs md:text-sm font-semibold text-slate-600 text-center sm:text-left leading-normal">
                <span>Kamu mendapatkan</span>
                <span className="inline-flex items-center gap-0.5 text-[#0284c7] font-extrabold mx-0.5">
                  <DiamondIcon className="size-3.5" /> 5
                </span>
                <span>hari ini dan berada di peringkat - dari 23,141 users</span>
              </div>
              <Link href="/login" className="shrink-0 w-full sm:w-auto">
                <Button size="sm" className="bg-[#0F6B63] hover:bg-[#0c5c55] text-white flex items-center gap-1.5 cursor-pointer text-xs w-full sm:w-auto font-medium">
                  <LogIn className="size-3.5" />
                  <span>Login untuk Cek Rank</span>
                </Button>
              </Link>
            </div>
          )}
        </div>

        <div className="w-full max-w-3xl flex flex-col">
          <div className="grid grid-cols-12 px-5 py-3 text-slate-500 text-xs font-bold tracking-wider border-b border-slate-100 mb-3 select-none">
            <div className="col-span-2 sm:col-span-1 text-center">Rank</div>
            <div className="col-span-7 sm:col-span-6">User name</div>
            <div className="hidden sm:block col-span-2 text-right">Followers</div>
            <div className="col-span-3 sm:col-span-2 text-right">Point</div>
            <div className="hidden sm:block col-span-1 text-right">Reward</div>
          </div>

          <div className="flex flex-col gap-3">
            <AnimatePresence mode="popLayout">
              {currentOthers.map((item, index) => (
                <motion.div
                  key={`${item.rank}-${period}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="grid grid-cols-12 items-center bg-white border border-slate-100 hover:border-slate-200/80 hover:bg-slate-50/50 hover:shadow-sm transition-all rounded-2xl px-5 py-4 shadow-xs group"
                >
                  <div className="col-span-2 sm:col-span-1 flex justify-center">
                    <span className="size-7 rounded-full bg-slate-100 border border-slate-200/40 flex items-center justify-center text-xs font-black text-slate-600">
                      {item.rank}
                    </span>
                  </div>

                  <div className="col-span-7 sm:col-span-6 flex items-center gap-3">
                    <div className="relative shrink-0">
                      <img
                        src={item.avatar}
                        alt={item.name}
                        className="size-10 rounded-full object-cover border border-slate-200"
                      />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-bold text-slate-900 truncate group-hover:text-[#0F6B63] transition-colors">
                        {item.name}
                      </span>
                      <span className="text-xs text-slate-400 truncate">
                        {item.username}
                      </span>
                    </div>
                  </div>

                  <div className="hidden sm:block col-span-2 text-right text-xs md:text-sm font-semibold text-slate-500 font-mono">
                    {item.followers}
                  </div>

                  <div className="col-span-3 sm:col-span-2 text-right text-xs md:text-sm font-extrabold text-slate-900 font-mono">
                    {item.points}
                  </div>

                  <div className="hidden sm:block col-span-1 text-right">
                    <div className="inline-flex items-center gap-1 bg-sky-50 border border-sky-200 text-[#0284c7] rounded-lg px-2 py-1 text-[11px] font-black font-mono">
                      <DiamondIcon className="size-3" />
                      <span>{item.reward}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="w-full flex justify-center mt-8">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors py-2 px-4 rounded-full border border-slate-200 bg-slate-50 cursor-default shadow-2xs">
              <TrendingUp className="size-3.5 text-[#0F6B63]" />
              <span>Memperbarui secara otomatis setiap jam</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
