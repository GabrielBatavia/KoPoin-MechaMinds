import { User, AuthSession } from "../entities/user"

export interface AuthRepository {
  login(email: string, password: string): Promise<AuthSession>
  register(userData: {
    email: string
    password?: string
    nik: string
    name: string
    phone: string
    province: string
  }): Promise<void>
  logout(): Promise<void>
}
