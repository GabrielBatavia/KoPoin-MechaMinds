import { AuthRepository } from "../../repositories/auth.repository"

export class LogoutUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute() {
    return this.authRepository.logout()
  }
}
