import { cn } from "@/lib/utils";
import { GithubIcon } from "@/components/icons/github-icon";
import { Button } from "@/components/ui/button";
import { FullWidthDivider } from "@/components/ui/full-width-divider";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative w-full lg:border-x bg-white border-t border-slate-200 text-slate-800">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-6 gap-6 p-6">
          <div className="col-span-6 flex flex-col gap-4 pt-5 md:col-span-4">
            <a className="w-max flex items-center" href="/">
              <Image
                src="/simkopdes.png"
                alt="Simkopdes Logo"
                width={130}
                height={35}
                className="h-9 w-auto object-contain"
              />
            </a>
            <p className="max-w-sm text-balance text-xs leading-relaxed text-slate-500">
              Sistem Informasi Manajemen Koperasi Desa Merah Putih. Mewujudkan kemandirian ekonomi warga berasaskan gotong royong.
            </p>
            <div className="flex gap-2">
              {socialLinks.map((item, index) => (
                <Button
                  key={`social-${item.link}-${index}`}
                  size="icon"
                  variant="outline"
                  className="cursor-pointer border-slate-200 hover:bg-slate-100 text-slate-700"
                >
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    {item.icon}
                  </a>
                </Button>
              ))}
            </div>
          </div>
          <div className="col-span-3 w-full md:col-span-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Team
            </span>
            <div className="mt-2 flex flex-col gap-2">
              {team.map(({ href, title }) => (
                <a
                  className="w-max text-sm hover:underline text-slate-600 hover:text-slate-950 transition-colors"
                  href={href}
                  key={title}
                >
                  {title}
                </a>
              ))}
            </div>
          </div>
          <div className="col-span-3 w-full md:col-span-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Company
            </span>
            <div className="mt-2 flex flex-col gap-2">
              {company.map(({ href, title }) => (
                <a
                  className="w-max text-sm hover:underline text-slate-600 hover:text-slate-950 transition-colors"
                  href={href}
                  key={title}
                >
                  {title}
                </a>
              ))}
            </div>
          </div>
        </div>
        <FullWidthDivider className="border-slate-200" />
        <div className="flex items-center justify-center gap-2 py-4">
          <p className="text-center font-light text-sm text-slate-400">
            &copy; {new Date().getFullYear()} Mechaminds, All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}

const company = [
  {
    title: "About Us",
    href: "#",
  },
  {
    title: "Careers",
    href: "#",
  },
  {
    title: "Brand assets",
    href: "#",
  },
  {
    title: "Privacy Policy",
    href: "#",
  },
  {
    title: "Terms of Service",
    href: "#",
  },
];

const team = [
  {
    title: "Gabriel Batavia",
    href: "#",
  },
  {
    title: "Riovaldo Rahman",
    href: "#",
  },
  {
    title: "Raudhil Firdaus",
    href: "#",
  },
];

const socialLinks = [
  {
    icon: <GithubIcon />,
    link: "https://github.com/GabrielBatavia/KoPoin-MechaMinds",
    target: "_blank"
  },
];
