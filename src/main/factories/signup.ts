import { RegisterUseCase } from "../../domain/useCases/authUseCase/register/registerUseCase"
import { userModel } from "../../infra/model/userSchema"
import { MongoUserRepository } from "../../infra/repositories/mongoUserRepository"
import { RegisterUserController } from "../../presentation/controllers/register/registerUserController"
import { ComparePassword } from "../../utils/comparePassword"
import { EmailValidator } from "../../utils/emailValidator"
import { Bcrypt } from "../../utils/Encrypter"
import { TokenGenerator } from "../../utils/tokenGenerator"


export const makeSignUpController = (): RegisterUserController =>{
    const secret = 'secreto'
    const expiresIn = 3000
    const salt = 10
    const jwt = new TokenGenerator(secret, expiresIn)
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
        jwt
    )
    const registerUserController = new RegisterUserController(registerUseCase)
    return registerUserController
}