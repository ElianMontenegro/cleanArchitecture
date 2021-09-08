import { IRegisterUseCase, IRegisterUserDTO } from "../../interfaces/IRegisterUseCase";
import { IComparePassword } from '../../interfaces/IComparePassword'
import { IEmailValidator } from '../../interfaces/IEmailValidator'
import { IUserRepository } from "../../interfaces/IUserRepository";
import { badRequest } from '../../errors/httpError'

export class RegisterUseCase implements IRegisterUseCase {
    constructor(
        private readonly emailValidator : IEmailValidator,
        private readonly comparePassword : IComparePassword,
        private readonly userRepository : IUserRepository

    ){}
    async register (user : IRegisterUserDTO) {
        for (const [key, value] of Object.entries(user)) {
            if(!value){
                throw badRequest(`${key} is empty`)
            }
        }
        if(!this.emailValidator.isValid(user.email)){
            throw badRequest("email is not valid")
        }
        if(!this.comparePassword.isMatch(user.password, user.repeatPassword)){
            throw badRequest("passwords not match")
        }
        if(await this.userRepository.load(user.email)){
            throw badRequest("user already exist")
        }
      
    }
}