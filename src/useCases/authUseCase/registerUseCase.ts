import { IRegisterUseCase, IRegisterUserDTO } from "../../interfaces/IRegisterUseCase";
import { IEmailValidator } from '../../interfaces/IEmailValidator'
export class RegisterUseCase implements IRegisterUseCase {
    constructor(private emailValidator : IEmailValidator ){}
    async register (user : IRegisterUserDTO) {
        for (const [key, value] of Object.entries(user)) {
            if(!value){
                return Error(key)
            }
        }
        if(!this.emailValidator.isValid(user.email)){
            return Error("email is not valid")
        }
    }
}