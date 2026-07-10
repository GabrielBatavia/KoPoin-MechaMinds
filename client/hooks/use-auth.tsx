import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { loginUseCase, registerUseCase } from "@/lib/dependencies"
import axios from "axios"
import toast from "react-hot-toast"

export interface Province {
    code: string
    name: string
}

export function useAuthForm(mode: "login" | "register") {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [nik, setNik] = useState("")
    const [fullName, setFullName] = useState("")
    const [phone, setPhone] = useState("")
    const [province, setProvince] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    // Dynamic states
    const [provinces, setProvinces] = useState<Province[]>([])
    const [nikValidating, setNikValidating] = useState(false)
    const [nikValid, setNikValid] = useState<boolean | null>(null)
    const [detectedOperator, setDetectedOperator] = useState("")
    const [phoneValid, setPhoneValid] = useState<boolean | null>(null)

    // Check token on mount
    useEffect(() => {
        if (typeof window !== "undefined" && localStorage.getItem("token")) {
            router.replace("/admin/dashboard")
        }
    }, [router])

    // Fetch provinces if mode is register
    useEffect(() => {
        if (mode === "register") {
            const getProvinces = async () => {
                try {
                    const res = await axios.get("https://nusakit.my.id/v1/wilayah/provinces")
                    if (res.data?.success && Array.isArray(res.data?.data)) {
                        setProvinces(res.data.data)
                    }
                } catch (error) {
                    console.error("Gagal memuat data provinsi", error)
                }
            }
            getProvinces()
        }
    }, [mode])

    // Validate NIK dynamically
    useEffect(() => {
        if (mode === "register" && nik.length === 16) {
            const validateNik = async () => {
                setNikValidating(true)
                try {
                    const res = await axios.get(`https://nusakit.my.id/v1/nik/validate?nik=${nik}`)
                    if (res.data?.success && res.data?.data?.valid) {
                        setNikValid(true)
                        const provName = res.data.data.info.province
                        if (provName) {
                            setProvince(provName)
                        }
                        toast.success(`NIK Terverifikasi! (${res.data.data.info.gender === 'L' ? 'Laki-laki' : 'Perempuan'}, ${res.data.data.info.age} tahun)`)
                    } else {
                        setNikValid(false)
                        toast.error("NIK tidak valid atau tidak terdaftar")
                    }
                } catch {
                    setNikValid(false)
                } finally {
                    setNikValidating(false)
                }
            }
            validateNik()
        } else {
            setNikValid(null)
        }
    }, [nik, mode])

    // Detect Operator dynamically
    useEffect(() => {
        if (mode === "register" && phone.length >= 4) {
            const checkOperator = async () => {
                try {
                    const res = await axios.get(`https://nusakit.my.id/v1/phone/operator?phone=${phone}`)
                    if (res.data?.success && res.data?.data?.valid) {
                        setDetectedOperator(res.data.data.operator)
                        setPhoneValid(true)
                    } else {
                        setDetectedOperator("")
                        setPhoneValid(false)
                    }
                } catch {
                    setDetectedOperator("")
                    setPhoneValid(false)
                }
            }
            checkOperator()
        } else {
            setDetectedOperator("")
            setPhoneValid(null)
        }
    }, [phone, mode])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            if (mode === "login") {
                if (!email || !password) throw new Error("Silakan isi email dan kata sandi")
                const res = await loginUseCase.execute(email, password)
                localStorage.setItem("token", res.accessToken)
                localStorage.setItem("refreshToken", res.refreshToken)
                localStorage.setItem("user", JSON.stringify(res.user))
                toast.success(`Selamat datang, ${res.user.name}!`)
                window.location.href = "/admin/dashboard"
            } else {
                if (!email || !password || !nik || !fullName || !phone || !province) {
                    throw new Error("Silakan lengkapi semua kolom")
                }
                if (nik.length !== 16 || nikValid === false) {
                    throw new Error("NIK tidak valid")
                }
                await registerUseCase.execute({
                    email,
                    password,
                    nik,
                    name: fullName,
                    phone,
                    province,
                })
                toast.success("Registrasi berhasil! Silakan masuk.")
                router.push("/login")
            }
        } catch (err: any) {
            toast.error(err.message || "Terjadi kesalahan")
        } finally {
            setLoading(false)
        }
    }

    return {
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
        phoneValid,
        handleSubmit,
    }
}
