import { badRequest, serverError } from "../helpers/httpError";
import { IController } from "../interfaces/IController";
import { IHttpRequest, IHttpResponse } from "../interfaces/IHttp";


class LoginUserController implements IController {
 
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



describe('LoginUserController', () => {
    test('should return 400 if email is empty', async () => {
        const sut = new LoginUserController();
        const httpRequest = { body : { email : ''} }
        const res = await sut.handle(httpRequest)
        expect(res).toStrictEqual(badRequest('email'))
    })
    test('should return 400 if password is empty', async () => {
        const sut = new LoginUserController();
        const httpRequest = { 
            body : { 
                email : 'any_email',
                password : ''
            } 
        }
        const res = await sut.handle(httpRequest)
        expect(res).toStrictEqual(badRequest('password'))
    })
    
})
