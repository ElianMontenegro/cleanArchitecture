import { IHttpRequest , IHttpResponse } from '../../interfaces/IHttp';
import { MissingParamater } from '../../errors/clientError'


export class RegisterUser {
    handle(httpRequest: IHttpRequest) {
        const requiredProperties = ["username", "email", "password"];
        for (let props of requiredProperties) {
            if(!httpRequest.body[props]){
                return {
                    statusCode: 400,
                    body: new MissingParamater(props)
                }
            }
        }
    }
}
