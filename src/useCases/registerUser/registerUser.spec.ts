import { IHttpRequest , IHttpResponse } from '../../interfaces/IHttp';
 
class registerUser {
    handle(httpRequest: IHttpRequest) {
        const requiredProperties = ["username", "email", "password"];
        for (let props of requiredProperties) {
            if(!httpRequest.body[props]){
                return {
                    statusCode: 400,
                    body: new Error("bad request")
                }
            }
        }
    }
}


describe('Register user', () => {
    test('should return 400 if email is not provided', () => {
        const sut = new registerUser()
        const httpRequest = {
            body: {
                username: 'any_username',
                password: 'any_password'
            }
        }
        const httpResponse : IHttpResponse = sut.handle(httpRequest)!
        expect(httpResponse.statusCode).toBe(400)
    }),

    test('should return 400 if username is not provided', () => {
        const sut = new registerUser()
        const httpRequest = {
            body: {
                email: 'any_email',
                password: 'any_password'
            }
        }
        const httpResponse : IHttpResponse = sut.handle(httpRequest)!
        expect(httpResponse.statusCode).toBe(400)
    })
    
})
