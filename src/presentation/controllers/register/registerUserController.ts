import { badRequest, catchException, serverError, success } from '../../helpers/httpError';
import { IController, IHttpRequest, IHttpResponse, IRegisterUseCase } from './registerProtocols'

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

            return success(tokens)
        } catch (error : any) {
            return catchException(error)
        }
    }
}
