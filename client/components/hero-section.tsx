import { CardFan } from "@/components/card-fan";
import { SignupForm } from "@/components/signup-form";

export function HeroSection() {
  return (
    <section
      className="w-full flex flex-col items-center"
      aria-labelledby="hero-headline"
    >
      <div className="w-full max-w-4xl mx-auto px-6 pt-20 sm:pt-28 md:pt-32 flex flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1
            id="hero-headline"
            className="text-4xl sm:text-5xl md:text-6xl font-medium leading-tight text-balance max-w-2xl text-white"
          >
            Belanja di koperasi jadi lebih seru 
          </h1>

          <p className="text-base sm:text-md text-white leading-relaxed max-w-lg text-balance">
            Selesaikan misi, kumpulkan poin, dan tukarkan dengan hadiah menarik
            setiap kali bertransaksi.
          </p>
        </div>

        <SignupForm />

        <div className="w-full mt-4">
          <CardFan />
        </div>
      </div>
    </section>
  );
}
