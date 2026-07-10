"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { usePathname } from "next/navigation";

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isHome = pathname === "/";

    return (
        <div 
            className={`min-h-screen flex flex-col justify-between transition-colors duration-300 ${
                isHome 
                    ? "bg-[linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4)),url('/bg.png')] bg-no-repeat bg-center bg-cover text-white" 
                    : "bg-white text-slate-900"
            }`}
        >
            <Navbar />
            <main className="flex-grow w-full flex flex-col">
                {children}
            </main>
            <Footer />
        </div>
    );
}
