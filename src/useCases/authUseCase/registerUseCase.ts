import { IRegisterUseCase, IRegisterUserDTO } from "../../interfaces/IRegisterUseCase";
import { IComparePassword } from '../../interfaces/IComparePassword'
import { IEmailValidator } from '../../interfaces/IEmailValidator'
import { IUserRepository } from "../../infra/IUserRepository";
import { badRequest, serverError } from '../../errors/httpError'
import { IEncrypter } from "../../interfaces/IEncrypter";
import { IUserModel } from "../../interfaces/IUserModel";

export class RegisterUseCase implements IRegisterUseCase {
    constructor(
        private readonly emailValidator : IEmailValidator,
        private readonly comparePassword : IComparePassword,
        private readonly userRepository : IUserRepository,
        private readonly encrypter : IEncrypter
    ){}
    async register (data : IRegisterUserDTO) {
        for (const [key, value] of Object.entries(data)) {
            if(!value){
                throw badRequest(`${key} is empty`)
            }
        }
        if(!this.emailValidator.isValid(data.email)){
            throw badRequest("email is not valid")
        }
        if(!this.comparePassword.isMatch(data.password, data.repeatPassword)){
            throw badRequest("passwords not match")
        }
        if(await this.userRepository.load(data.email)){
            throw badRequest("user already exist")
        }
        const passwordHash = await this.encrypter.hash(data.password, 10)
        const user : IUserModel = {
            username : data.username,
            email : data.email, 
            password : passwordHash
        }
        const userSave = await this.userRepository.save(user)
        if(!userSave){
            throw serverError("issue with user register ")
        }

    }
}