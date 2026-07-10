import Image from "next/image";

const AVATAR_SEEDS = ["aidan", "caleb", "avery", "brian"];

export function LoginBanner() {
  return (
    <div className="hidden bg-muted lg:block relative overflow-hidden h-full min-h-screen">
      <div className="absolute inset-0 bg-[#0F6B63]">
        <Image
          src="/auth.png"
          alt="Factory"
          width={1920}
          height={1080}
          className="h-full w-full object-cover opacity-70 mix-blend-overlay grayscale contrast-125"
          style={{ objectPosition: "center" }}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>

      <div className="absolute bottom-12 left-12 right-12 text-white z-20">
        <div className="flex -space-x-3 mb-2">
          {AVATAR_SEEDS.map((seed) => (
            <div
              key={seed}
              className="w-10 h-10 rounded-full border-2 border-[#0F6B63] bg-gray-200 overflow-hidden relative"
            >
              <Image
                src={`https://api.dicebear.com/9.x/lorelei/svg?seed=${seed}`}
                alt={`Avatar ${seed}`}
                width={40}
                height={40}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
          <div className="h-10 px-3 rounded-full border-2 border-[#0F6B63] bg-white/10 backdrop-blur-sm flex items-center text-xs font-semibold">
            Dipercaya 10rb+ Anggota
          </div>
        </div>
        <h2 className="text-5xl font-medium tracking-tight mb-2 leading-tight">
          Sinergi Bersama,
          <br /> Membangun Ekonomi Desa.
        </h2>
        <p className="text-gray-300 font-medium text-md max-w-lg">
          Koperasi Desa Merah Putih berkomitmen meningkatkan kesejahteraan warga melalui transparansi, kemandirian usaha, dan asas gotong royong.
        </p>
      </div>
    </div>
  );
}
