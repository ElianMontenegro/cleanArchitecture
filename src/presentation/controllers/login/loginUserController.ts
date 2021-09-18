import { badRequest, serverError, Unauthorized } from "../../helpers/httpError";
import { IController } from "../../interfaces/IController";
import { IHttpRequest, IHttpResponse } from "../../interfaces/IHttp";
import { ILoginUseCase } from "../../../domain/useCases/authUseCase/login/ILoginUseCase";

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
            return {
                statusCode: 200,
                body: tokens
            }
        } catch (error:any) {
           return serverError(error)
        }
    }
}
