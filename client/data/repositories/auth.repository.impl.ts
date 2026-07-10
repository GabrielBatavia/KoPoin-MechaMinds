import { AuthRepository } from "@/domain/repositories/auth.repository"
import { AuthSession } from "@/domain/entities/user"
import { api } from "@/lib/api"

export class AuthRepositoryImpl implements AuthRepository {
  async login(email: string, password: string): Promise<AuthSession> {
    const res = await api.post<any, any>("/api/v1/auth/login", { email, password })
    return {
      accessToken: res.access_token,
      refreshToken: res.refresh_token,
      user: {
        id: res.user.id || res.user.user_id || "",
        name: res.user.name,
        email: res.user.email,
        avatar: res.user.avatar || `https://api.dicebear.com/9.x/lorelei/svg?seed=${res.user.name}`,
        nik: res.user.nik,
        phone: res.user.phone,
        province: res.user.province,
      }
    }
  }

  async register(userData: {
    email: string
    password?: string
    nik: string
    name: string
    phone: string
    province: string
  }): Promise<void> {
    await api.post("/api/v1/auth/register", userData)
  }

  async logout(): Promise<void> {
    await api.post("/api/v1/auth/logout")
  }
}
