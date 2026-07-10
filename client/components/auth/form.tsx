"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { useAuthForm } from "@/hooks/use-auth";
import { Eye, EyeOff, Check, X, Loader2 } from "lucide-react";

interface AuthFormProps {
  mode: "login" | "register";
}

export function AuthForm({ mode }: AuthFormProps) {
  const isRegister = mode === "register";
  const {
    email,
    setEmail,
    password,
    setPassword,
    nik,
    setNik,
    fullName,
    setFullName,
    phone,
    setPhone,
    province,
    setProvince,
    showPassword,
    setShowPassword,
    loading,
    provinces,
    nikValidating,
    nikValid,
    detectedOperator,
    handleSubmit,
  } = useAuthForm(mode);

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-white h-full w-full">
      <div
        className={`mx-auto grid w-full gap-6 ${isRegister ? "max-w-[550px]" : "max-w-[400px]"}`}
      >
        <div className="grid gap-2 text-left">
          <div className="flex items-center gap-2 mb-2 h-18 bg-gray-100 rounded-lg p-2 w-36">
            <Image
              src="/kopoin.png"
              alt="kopoin Logo"
              width={120}
              height={30}
              className="w-32 h-auto"
            />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {isRegister ? "Daftar Akun" : "Selamat Datang"}
          </h1>
          <p className="text-balance text-gray-500">
            {isRegister
              ? "Lengkapi data Anda untuk mendaftar layanan Koperasi-Point."
              : "Selamat datang kembali! Silakan masukkan detail Anda."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4">
          {isRegister && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="nik">NIK (16 Digit)</Label>
                    {nikValidating && (
                      <span className="flex items-center text-xs text-blue-500 gap-1">
                        <Loader2 className="w-3 h-3 animate-spin" /> Validasi...
                      </span>
                    )}
                    {nikValid === true && (
                      <span className="flex items-center text-xs text-[#0F6B63] gap-0.5 font-medium">
                        <Check className="w-3.5 h-3.5" /> Valid
                      </span>
                    )}
                    {nikValid === false && (
                      <span className="flex items-center text-xs text-red-500 gap-0.5 font-medium">
                        <X className="w-3.5 h-3.5" /> Tidak Valid
                      </span>
                    )}
                  </div>
                  <Input
                    id="nik"
                    type="text"
                    maxLength={16}
                    placeholder="Masukkan 16 digit NIK"
                    value={nik}
                    onChange={(e) => setNik(e.target.value.replace(/\D/g, ""))}
                    disabled={loading || nikValidating}
                    className={`bg-gray-50 border-gray-200 focus-visible:ring-offset-0 ${
                      nikValid === true
                        ? "border-[#0F6B63] focus-visible:ring-[#0F6B63] focus-visible:border-[#0F6B63]"
                        : nikValid === false
                          ? "border-red-500 focus-visible:ring-red-500 focus-visible:border-red-500"
                          : ""
                    }`}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="fullName">Nama Lengkap</Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Nama lengkap sesuai KTP"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    disabled={loading}
                    className="bg-gray-50 border-gray-200"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="phone">Nomor HP</Label>
                    {detectedOperator && (
                      <span className="text-xs text-[#0F6B63] font-semibold bg-[#0F6B63]/50 px-2 py-0.5 rounded border border-[#0F6B63]/20">
                        {detectedOperator}
                      </span>
                    )}
                  </div>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Contoh: 081234567890"
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value.replace(/[^0-9+]/g, ""))
                    }
                    disabled={loading}
                    className="bg-gray-50 border-gray-200"
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="province">Provinsi</Label>
                  <select
                    id="province"
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    disabled={loading || provinces.length === 0}
                    className="flex h-11 w-full rounded-md border border-gray-200 bg-gray-50 px-3.5 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    required
                  >
                    <option value="" disabled>
                      {provinces.length === 0
                        ? "Memuat Provinsi..."
                        : "Pilih Provinsi"}
                    </option>
                    {provinces.map((prov) => (
                      <option key={prov.code} value={prov.name}>
                        {prov.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </>
          )}

          <div
            className={
              isRegister
                ? "grid grid-cols-1 sm:grid-cols-2 gap-4"
                : "grid gap-4"
            }
          >
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="bg-gray-50 border-gray-200"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Kata Sandi</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  className="bg-gray-50 border-gray-200 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer flex items-center justify-center"
                  aria-label={
                    showPassword
                      ? "Sembunyikan kata sandi"
                      : "Tampilkan kata sandi"
                  }
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading || (isRegister && nikValidating)}
            className="w-full bg-[#0F6B63] hover:bg-[#0c5c55] h-11 font-medium cursor-pointer mt-2"
          >
            {loading
              ? "Memproses..."
              : isRegister
                ? "Daftar Sekarang"
                : "Masuk"}
          </Button>
        </form>

        <div className="text-center text-sm text-gray-500">
          {isRegister ? (
            <>
              Sudah memiliki akun?{" "}
              <Link
                href="/login"
                className="font-semibold text-[#0F6B63] hover:underline"
              >
                Masuk disini
              </Link>
            </>
          ) : (
            <>
              Belum memiliki akun?{" "}
              <Link
                href="/register"
                className="font-semibold text-green-700 hover:underline"
              >
                Daftar disini
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
