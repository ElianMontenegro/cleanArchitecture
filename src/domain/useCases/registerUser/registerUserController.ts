import { IHttpRequest, IHttpResponse } from '../../../presentation/interfaces/IHttp';
import { IRegisterUseCase } from '../../../presentation/interfaces/IRegisterUseCase'
import { badRequest } from '../../../presentation/helpers/httpError';

export class RegisterUserController {
    constructor(private readonly registerUseCase : IRegisterUseCase){
    }
    handle(httpRequest: IHttpRequest): IHttpResponse {
        
        const requiredProperties = ["username", "email", "password", "repeatPassword"];
        for (let props of requiredProperties) {
            if(!httpRequest.body[props]){
                return badRequest(props)
            }
        }
        const { username, email, password, repeatPassword } = httpRequest.body
        try {
            const tokens = this.registerUseCase.register({username, email , password, repeatPassword})
            return {
                statusCode:201,
                body: tokens
            }
        } catch (error) {
            return {
                statusCode: 400,
                body: error
            }
        }
    }
}
