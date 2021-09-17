import { IHttpRequest, IHttpResponse } from '../interfaces/IHttp';
import { IRegisterUseCase } from '../interfaces/IRegisterUseCase'
import { badRequest } from '../helpers/httpError';
import { IController } from '../interfaces/IController';

export class RegisterUserController implements IController {
    constructor(private readonly registerUseCase : IRegisterUseCase){
    }
    async handle(httpRequest: IHttpRequest): Promise<IHttpResponse>{
        try {
            const requiredProperties = ["username", "email", "password", "repeatPassword"];
            for (let props of requiredProperties) {
                if(!httpRequest.body[props]){
                    return badRequest(props)
                }
            }
            const { username, email, password, repeatPassword } = httpRequest.body
            const tokens = await this.registerUseCase.register({username, email , password, repeatPassword})
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
