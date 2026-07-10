import { Smartphone, Zap, ShieldCheck, Download } from "lucide-react";

export default function DownloadPage() {
  return (
    <main className="relative min-h-screen bg-white overflow-hidden font-sans tracking-tight">
      <div className="absolute inset-0 pointer-events-none z-0 flex justify-center">
        <div className="relative w-[90%] max-w-7xl h-full">
          <div className="absolute top-[-100vh] bottom-[-100vh] left-0 w-[1px] bg-[#0F6B63] opacity-40" />
          <div className="absolute top-[-100vh] bottom-[-100vh] right-0 w-[1px] bg-[#0F6B63] opacity-40" />
          <div className="absolute top-[20%] left-[-100vw] right-[-100vw] h-[1px] bg-[#0F6B63] opacity-30" />
          <div className="absolute bottom-[15%] left-[-100vw] right-[-100vw] h-[1px] bg-[#0F6B63] opacity-30" />
          <div className="absolute top-[20%] left-0 w-3 h-3 border-t-[1.5px] border-l-[1.5px] border-[#0F6B63] -translate-x-px -translate-y-px" />
          <div className="absolute top-[20%] right-0 w-3 h-3 border-t-[1.5px] border-r-[1.5px] border-[#0F6B63] translate-x-px -translate-y-px" />
          <div className="absolute bottom-[15%] left-0 w-3 h-3 border-b-[1.5px] border-l-[1.5px] border-[#0F6B63] -translate-x-px translate-y-px" />
          <div className="absolute bottom-[15%] right-0 w-3 h-3 border-b-[1.5px] border-r-[1.5px] border-[#0F6B63] translate-x-px translate-y-px" />
        </div>
      </div>

      <div className="relative z-20 flex items-center min-h-screen">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="max-w-lg">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#1a1a1a] mb-5">
              Aktivitas Koperasi,{" "}
              <span className="italic font-serif font-medium tracking-normal text-[#0F6B63]">
                Lebih Seru.
              </span>
            </h1>

            <p className="text-sm md:text-base text-[#666666] leading-relaxed max-w-sm mb-8">
              Akses kartu anggota digital, ikuti campaign tim, dan kumpulkan Kopoin langsung dari smartphone Anda.
            </p>

            <ul className="flex flex-col gap-4 mb-10">
              {[
                {
                  icon: <Smartphone size={16} className="text-[#0F6B63]" strokeWidth={1.75} />,
                  title: "Kartu Anggota Digital",
                  desc: "Akses cepat identitas, status keanggotaan, dan saldo Kopoin Anda.",
                },
                {
                  icon: <Zap size={16} className="text-[#0F6B63]" strokeWidth={1.75} />,
                  title: "Misi & Verifikasi QR",
                  desc: "Scan QR transaksi produk lokal koperasi langsung dari aplikasi untuk klaim poin.",
                },
                {
                  icon: <ShieldCheck size={16} className="text-[#0F6B63]" strokeWidth={1.75} />,
                  title: "Progres Tim & Leaderboard",
                  desc: "Pantau kontribusi dan peringkat tim Anda secara real-time kapan saja.",
                },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3.5">
                  <div className="mt-0.5 w-7 h-7 rounded-lg bg-[#0F6B63]/10 flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1a1a1a] leading-snug mb-0.5">
                      {item.title}
                    </p>
                    <p className="text-xs text-[#666666]">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-3">
              <a
                href="/kopoin.apk"
                download="kopoin.apk"
                className="group flex items-center gap-2 rounded-full bg-[#0F6B63] px-6 py-3 text-sm font-medium text-white shadow-md hover:bg-[#0c5c55] transition-all duration-200 hover:shadow-lg"
              >
                <Download size={14} strokeWidth={2.5} />
                Download Aplikasi
              </a>
            </div>

            <p className="text-xs text-[#999] font-medium">
              Khusus Anggota Koperasi Merah Putih Sukamaju
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 z-10 w-[70vw] md:w-[55vw] lg:w-[48vw] xl:w-[42vw] pointer-events-none select-none">
        <img
          src="/mobile-m.png"
          alt="Aplikasi Kopoin di iPhone"
          className="w-full h-auto object-contain object-bottom drop-shadow-[0_-20px_60px_rgba(37,99,235,0.12)]"
        />
      </div>
    </main>
  );
}
