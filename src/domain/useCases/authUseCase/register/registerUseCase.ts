import { IRegisterUseCase, IRegisterUserDTO } from "./IRegisterUseCase";
import { IUserSave } from '../../../../infra/interfacesRepositories'
import { badRequest, serverError } from '../../../../presentation/helpers/httpError'
import { ICryptography, IEmailValidator, IComparePassword, IAccessToken, IRefreshToken } from '../../../../presentation/interfaces'
import { ILoadUserByEmail, ISave } from '../../../../infra/interfacesRepositories/index'

export class RegisterUseCase implements IRegisterUseCase {
    constructor(
        private readonly emailValidator : IEmailValidator,
        private readonly comparePassword : IComparePassword,
        private readonly LoadUserByEmail : ILoadUserByEmail,
        private readonly Save : ISave,
        private readonly encrypter : ICryptography,
        private readonly accessToken: IAccessToken,
        private readonly refreshToken: IRefreshToken
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
        if(await this.LoadUserByEmail.loadUserByEmail(data.email)){
            throw badRequest("user already exist")
        }
        const passwordHash = await this.encrypter.encrypt(data.password)
        const user : IUserSave = {
            username : data.username,
            email : data.email, 
            password : passwordHash
        }
       
        try {
            const userNew = await this.Save.save(user)
            return {
                accessToken: this.accessToken.token(userNew._id!),
                refreshToken: this.refreshToken.token(userNew._id!, userNew.email),
            }
        } catch (error: any) {
            return serverError(error);
        }

    }
}