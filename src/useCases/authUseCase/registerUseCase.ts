import { IRegisterUseCase, IRegisterUserDTO } from "../../presentation/interfaces/IRegisterUseCase";
import { IUserRepository } from "../../infra/IUserRepository";
import { badRequest, serverError } from '../../presentation/errors/httpError'
import { IUserModel, IEncrypter, IEmailValidator, IComparePassword, IJwt } from '../../presentation/interfaces'
export class RegisterUseCase implements IRegisterUseCase {
    constructor(
        private readonly emailValidator : IEmailValidator,
        private readonly comparePassword : IComparePassword,
        private readonly userRepository : IUserRepository,
        private readonly encrypter : IEncrypter,
        private readonly jwt: IJwt
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
       
        try {
            const userSave = await this.userRepository.save(user)
            const accessToken = this.jwt.accessToken(userSave._id!);
            return accessToken
        } catch (error) {
            console.log(error);
        }

    }
}