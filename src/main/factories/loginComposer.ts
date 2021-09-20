import { LoginUseCases } from "../../domain/useCases/authUseCase/login/loginUseCase"
import { userModel } from "../../infra/model/userSchema"
import { MongoUserRepository } from "../../infra/repositories/mongoUserRepository"
import { LoginUserController } from "../../presentation/controllers/login/loginUserController"
import { EmailValidator } from "../../utils/emailValidator"
import { Dcrypt } from "../../utils/Encrypter"
import { TokenGenerator } from "../../utils/tokenGenerator"


export const makeLoginController = (): LoginUserController => {
    const secretAccessToken = 'secreto_accessToken'
    const secretRefreshToken = 'secreto_accessToken'
    const expiresInAccess = 3000
    const expiresInRefresh = 10000
    const userRepository = new MongoUserRepository(userModel)
    const JWTAccess = new TokenGenerator(secretAccessToken, expiresInAccess)
    const JWTRefresh = new TokenGenerator(secretRefreshToken, expiresInRefresh)
    const dcrypt = new Dcrypt()
    const emailValidator = new EmailValidator()

    const loginUseCases = new LoginUseCases(
        emailValidator, 
        userRepository, 
        dcrypt, 
        JWTAccess, 
        JWTRefresh
    )

    const loginUserController = new LoginUserController(loginUseCases)
    return loginUserController
}