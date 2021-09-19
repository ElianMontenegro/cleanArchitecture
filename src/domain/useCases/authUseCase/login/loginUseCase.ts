import { ILoadUserByEmail } from '../../../../infra/interfacesRepositories'
import { badRequest, notFound } from "../../../../presentation/helpers/httpError";
import { IEmailValidator } from "../../../../presentation/interfaces";
import { ILoginUseCase, ILoginUserDTO } from "./ILoginUseCase";


export class LoginUseCases implements ILoginUseCase{
    constructor(
        private readonly emailValidator : IEmailValidator,
        private LoadUserByEmail : ILoadUserByEmail

    ){}
    async login(data: ILoginUserDTO): Promise<any>{
        for (const [key, value] of Object.entries(data)) {
            if (!value) {
                throw badRequest(key);
            }
        }
        if(!this.emailValidator.isValid(data.email)){
            throw badRequest("email is not valid")
        }
        
        const user = await this.LoadUserByEmail.loadUserByEmail(data.email)
        if(!user){
            throw notFound("user not found")
        }
    }
}