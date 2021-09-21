import { badRequest, catchException, serverError, success, Unauthorized } from "../../helpers/httpError";
import { IController, ILoginUserDTO, ILoginUseCase, IHttpRequest, IHttpResponse } from './loginProtocols'

export class LoginUserController implements IController {
    constructor(private readonly loginUseCase : ILoginUseCase){}
    async handle(httpRequest: IHttpRequest): Promise<IHttpResponse>{
        const requiredProperties = ["email", "password"];
        try {
            for (const props of requiredProperties) {
                if (!httpRequest.body[props]) {
                    return badRequest(props)
                }
            }
            const { email, password } = httpRequest.body
            const tokens = await this.loginUseCase.login({email, password})
            if (!tokens) {
                return Unauthorized()
            }
            return success(tokens)
        } catch (error:any) {
           return catchException(error)
        }
    }
}
