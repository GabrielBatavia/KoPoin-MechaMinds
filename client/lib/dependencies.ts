import { AuthRepositoryImpl } from "@/data/repositories/auth.repository.impl"
import { LoginUseCase } from "@/domain/usecases/auth/login.usecase"
import { RegisterUseCase } from "@/domain/usecases/auth/register.usecase"
import { LogoutUseCase } from "@/domain/usecases/auth/logout.usecase"

const authRepository = new AuthRepositoryImpl()

export const loginUseCase = new LoginUseCase(authRepository)
export const registerUseCase = new RegisterUseCase(authRepository)
export const logoutUseCase = new LogoutUseCase(authRepository)
