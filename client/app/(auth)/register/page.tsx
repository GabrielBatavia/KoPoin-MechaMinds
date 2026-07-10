import { AuthForm } from "@/components/auth/form"
import { LoginBanner } from "@/components/auth/banner"

export default function RegisterPage() {
    return (
        <div className="w-full min-h-screen grid lg:grid-cols-2">
            <AuthForm mode="register" />
            <LoginBanner />
        </div>
    )
}
