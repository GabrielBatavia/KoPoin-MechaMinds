import { InfiniteSlider } from "@/components/ui/infinite-slider";

export function LogoCloud() {
  return (
    <div className="mask-[linear-gradient(to_right,transparent,black,transparent)] overflow-hidden py-4">
      <InfiniteSlider gap={42} reverse speed={80} speedOnHover={25}>
        {logos.map((logo) => (
          <img
            alt={logo.alt}
            className="pointer-events-none h-4 select-none md:h-14 dark:brightness-0 dark:invert"
            height="auto"
            key={`logo-${logo.alt}`}
            loading="lazy"
            src={logo.src}
            width="auto"
          />
        ))}
      </InfiniteSlider>
    </div>
  );
}

const logos = [
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/d/d8/Logo_Kemenko_Pangan.png",
    alt: "Nvidia Logo",
  },
  {
    src: "https://www.kemhan.go.id/wp-content/themes/menhan/images/logo.png",
    alt: "Supabase Logo",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/9/96/Logo_Badan_Gizi_Nasional_%282024%29.png",
    alt: "OpenAI Logo",
  },
  {
    src: "https://assets.zonalogo.com/government/komdigi.go.id/logo-1771041795622-467.svg",
    alt: "Turso Logo",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Logo_Kementerian_Kesehatan_Republik_Indonesia_%282024_rev%29.svg/3840px-Logo_Kementerian_Kesehatan_Republik_Indonesia_%282024_rev%29.svg.png",
    alt: "Vercel Logo",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Logo_Kementerian_PPN-Bappenas_%282023%29.png",
    alt: "GitHub Logo",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/1/11/BPKP_Logo.png",
    alt: "Claude AI Logo",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Logo_of_the_Ministry_of_Law_and_Human_Rights_of_the_Republic_of_Indonesia.svg/1280px-Logo_of_the_Ministry_of_Law_and_Human_Rights_of_the_Republic_of_Indonesia.svg.png",
    alt: "Clerk Logo",
  },
];
