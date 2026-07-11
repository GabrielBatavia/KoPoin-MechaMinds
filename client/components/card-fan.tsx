import { ArrowUpRight, Download, Monitor } from "lucide-react";

export function CardFan() {
  const cards = [
    {
      title: "Via Install Aplikasi",
      subtitle: "Mobile App (Android)",
      description: "Unduh dan instal langsung file APK di smartphone Anda untuk pengalaman mobile optimal.",
      ctaText: "Download APK",
      ctaHref: "/download",
      qrData: "https://kopoin.vercel.app/download",
      icon: <Download className="w-5 h-5 text-[#0F6B63]" />,
      badge: "Android App"
    },
    {
      title: "Via Web Aplikasi",
      subtitle: "Web App (PWA)",
      description: "Akses langsung melalui peramban web di perangkat desktop atau smartphone Anda.",
      ctaText: "Buka Web App",
      ctaHref: "https://dist-self-six-92.vercel.app/",
      qrData: "https://dist-self-six-92.vercel.app/",
      icon: <Monitor className="w-5 h-5 text-[#0F6B63]" />,
      badge: "Multi-Platform"
    }
  ];

  return (
    <div className="w-full flex flex-col md:flex-row justify-center items-stretch gap-6 px-4 py-8 max-w-4xl mx-auto">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="flex-1 bg-white border border-gray-100 hover:border-[#0F6B63]/40 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(15,107,99,0.12)] group"
        >
          <div>
            {/* Header Badge */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#0F6B63] bg-[#0F6B63]/10 px-2.5 py-1 rounded-full border border-[#0F6B63]/20">
                {card.badge}
              </span>
              <div className="p-2 rounded-lg bg-gray-50 border border-gray-100 group-hover:bg-[#0F6B63]/10 group-hover:border-[#0F6B63]/30 transition-all duration-300">
                {card.icon}
              </div>
            </div>

            {/* Title & Description */}
            <h3 className="text-xl font-semibold text-gray-950 leading-tight">
              {card.title}
            </h3>
            <p className="text-xs text-[#0F6B63] font-semibold mt-1 mb-3">
              {card.subtitle}
            </p>
            <p className="text-sm text-gray-600 leading-relaxed mb-6 min-h-[40px]">
              {card.description}
            </p>

            {/* QR Code Section */}
            <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl border border-gray-100 mb-6 group-hover:bg-gray-100/70 transition-colors">
              <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-100 hover:scale-105 transition-transform duration-300">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&color=0F6B63&data=${encodeURIComponent(card.qrData)}`}
                  alt={`QR Code ${card.title}`}
                  width={140}
                  height={140}
                  className="w-[140px] h-[140px] object-contain block"
                  loading="lazy"
                />
              </div>
              <span className="text-[11px] text-gray-500 mt-3 font-medium">
                Pindai untuk mengakses demo
              </span>
            </div>
          </div>

          {/* CTA Button */}
          <a
            href={card.ctaHref}
            target={card.ctaHref.startsWith("http") ? "_blank" : undefined}
            rel={card.ctaHref.startsWith("http") ? "noopener noreferrer" : undefined}
            className="w-full h-11 rounded-xl bg-[#0F6B63] hover:bg-[#0c5c55] text-white text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-teal-900/10 cursor-pointer active:scale-[0.98]"
          >
            {card.ctaText}
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      ))}
    </div>
  );
}


