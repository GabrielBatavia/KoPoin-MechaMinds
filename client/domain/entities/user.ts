export interface User {
  id: string
  name: string
  email: string
  avatar: string
  nik?: string
  phone?: string
  province?: string
}

export interface AuthSession {
  accessToken: string
  refreshToken: string
  user: User
}
