import { RegisterUseCase } from "../../domain/useCases/authUseCase/register/registerUseCase"
import { userModel } from "../../infra/model/userSchema"
import { MongoUserRepository } from "../../infra/repositories/mongoUserRepository"
import { RegisterUserController } from "../../presentation/controllers/register/registerUserController"
import { ComparePassword } from "../../utils/comparePassword"
import { EmailValidator } from "../../utils/emailValidator"
import { Bcrypt } from "../../utils/Encrypter"
import { TokenGenerator } from "../../utils/tokenGenerator"


export const makeSignUpController = (): RegisterUserController =>{
    const secretAccessToken = 'secreto_accessToken'
    const secretRefreshToken = 'secreto_accessToken'
    const expiresInAccess = 3000
    const expiresInRefresh = 10000
    const salt = 10
    const JWTAccess = new TokenGenerator(secretAccessToken, expiresInAccess)
    const JWTRefresh = new TokenGenerator(secretRefreshToken, expiresInRefresh)
    const encrypter = new Bcrypt(salt)
    const userRepository = new MongoUserRepository(userModel)
    const comparePassword = new ComparePassword()
    const emailValidator = new EmailValidator();

    const registerUseCase = new RegisterUseCase(
        emailValidator, 
        comparePassword,
        userRepository,
        userRepository,
        encrypter,
        JWTAccess,
        JWTRefresh
    )
    const registerUserController = new RegisterUserController(registerUseCase)
    return registerUserController
}