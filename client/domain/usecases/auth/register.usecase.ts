import { AuthRepository } from "../../repositories/auth.repository"

export class RegisterUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(userData: {
    email: string
    password?: string
    nik: string
    name: string
    phone: string
    province: string
  }) {
    return this.authRepository.register(userData)
  }
}
