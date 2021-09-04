import { IHttpRequest , IHttpResponse } from '../../interfaces/IHttp';
import { MissingParamater } from '../../errors/clientError'
import { IRegisterUseCase } from '../../interfaces/IRegisterUseCase'

export class RegisterUserController {
    constructor(private readonly registerUseCase : IRegisterUseCase){
    }
    handle(httpRequest: IHttpRequest) {
        const { username, email, password, repeatPassword } = httpRequest.body
        const requiredProperties = ["username", "email", "password", "repeatPassword"];
        for (let props of requiredProperties) {
            if(!httpRequest.body[props]){
                return {
                    statusCode: 400,
                    body: new MissingParamater(props)
                }
            }
        }
        this.registerUseCase.register({username, email , password, repeatPassword})
    }
}
