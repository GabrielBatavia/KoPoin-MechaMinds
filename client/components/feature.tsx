import { cn } from "@/lib/utils";
import type React from "react";
import {
  UsersRound,
  Medal,
  BadgeCheck,
} from "lucide-react";

type FeatureType = {
  title: string;
  icon: React.ReactNode;
  description: string;
};

export function FeatureSection() {
  return (
    <div className="bg-white mt-20 rounded-t-[70px]">
      <div className="mx-auto flex w-full max-w-5xl flex-col justify-center gap-12 px-4 py-12 md:px-8">
          <div className="mx-auto mt-10 max-w-2xl space-y-2 text-center">
            <h2 className="mb-5 text-center font-medium text-foreground text-xl tracking-tight md:text-3xl">
              <span className="text-muted-foreground">Tiga Mekanisme yang <br></br> membuat</span> <span className="font-semibold">Kopoin</span> <span className="text-muted-foreground">hidup</span> 
            </h2>

            <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
              Bukan sekedar fitur, tapi setiap mekanisme mengubah   anggota pasif
              <br /> 
              menjadi komunitas yang aktif
            </p>
          </div>
  
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <FeatureCard key={feature.title} feature={feature} />
            ))}
          </div>
        </div>
    </div>
  );
}

function FeatureCard({
  feature,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  feature: FeatureType;
}) {
  return (
    <div
      className={cn(
        "relative flex flex-col justify-between gap-6 bg-white px-6 pt-6 pb-6 shadow-xs",
        "dark:bg-[radial-gradient(50%_80%_at_25%_0%,--theme(--color-foreground/.1),transparent)]",
        className,
      )}
      {...props}
    >
      <div className="absolute -inset-y-4 -left-px w-px bg-border" />
      <div className="absolute -inset-y-4 -right-px w-px bg-border" />
      <div className="absolute -inset-x-4 -top-px h-px bg-border" />
      <div className="absolute -right-4 -bottom-px -left-4 h-px bg-border" />

      <div
        className={cn(
          "relative z-10 flex w-fit items-center justify-center rounded-lg border bg-muted/20 p-3",
          "[&_svg]:size-5 [&_svg]:stroke-[1.5] [&_svg]:text-foreground",
        )}
      >
        {feature.icon}
      </div>

      <div className="relative z-10 space-y-2">
        <h3 className="text-base font-medium text-foreground">
          {feature.title}
        </h3>

        <p className="text-muted-foreground text-xs leading-relaxed">
          {feature.description}
        </p>
      </div>
    </div>
  );
}

const features: FeatureType[] = [
  {
    title: "Tim & Leaderboard",
    icon: <UsersRound />,
    description: "Membangun identitas tim, mendorong kompetisi yang sehat, berkontribusi, dan mencapai pencapaian terbaik bersama.",
  },
  {
    title: "Misi & Reward",
    icon: <Medal />,
    description: "Memberi alasan untuk kembali, berkontribusi, dan membuka manfaat yang dirasakan bersama",
  },
  {
    title: "Voting Anggota",
    icon: <BadgeCheck />,
    description: "Membuat anggota merasa suaranya berpengaruh terhadap misi, produk dan reward komunitas",
  },
];
