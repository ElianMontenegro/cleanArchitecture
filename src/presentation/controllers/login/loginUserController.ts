import { badRequest, serverError } from "../../helpers/httpError";
import { IController } from "../../interfaces/IController";
import { IHttpRequest, IHttpResponse } from "../../interfaces/IHttp";

export class LoginUserController implements IController {
    constructor(private readonly loginuseCase: ){}
    async handle(httpRequest: IHttpRequest): Promise<IHttpResponse>{
        const requiredProperties = ["email", "password"];
        try {
            for (const props of requiredProperties) {
                if (!httpRequest.body[props]) {
                    return badRequest(props)
                }
            }
            return {
                statusCode: 200,
                body: ""
            }
        } catch (error:any) {
           return serverError(error)
        }
    }
}
