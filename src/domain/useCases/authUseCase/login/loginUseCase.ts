import { badRequest } from "../../../../presentation/helpers/httpError";
import { IEmailValidator } from "../../../../presentation/interfaces";
import { ILoginUseCase, ILoginUserDTO } from "./ILoginUseCase";


export class LoginUseCases implements ILoginUseCase{
    constructor(private readonly emailValidator : IEmailValidator){}
    async login(user: ILoginUserDTO): Promise<any>{
        for (const [key, value] of Object.entries(user)) {
            if (!value) {
                throw badRequest(key);
            }
        }
        if(!this.emailValidator.isValid(user.email)){
            throw badRequest("email is not valid")
        }
        
    }
}