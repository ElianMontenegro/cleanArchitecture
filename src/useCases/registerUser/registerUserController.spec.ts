import { IHttpResponse } from '../../interfaces/IHttp';
import { MissingParamater } from '../../errors/clientError'
import { RegisterUser } from './registerUserController'




describe('Register user', () => {
    test('should return 400 if email is not provided', () => {
        const sut = new RegisterUser()
        const httpRequest = {
            body: {
                username: 'any_username',
                password: 'any_password'
            }
        }
        const httpResponse : IHttpResponse = sut.handle(httpRequest)!
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamater('email'))
    }),

    test('should return 400 if username is not provided', () => {
        const sut = new RegisterUser()
        const httpRequest = {
            body: {
                email: 'any_email',
                password: 'any_password'
            }
        }
        const httpResponse : IHttpResponse = sut.handle(httpRequest)!
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamater('username'))
    })

    test('should return 400 if password is not provided', () => {
        const sut = new RegisterUser()
        const httpRequest = {
            body: {
                username: 'any_username',
                email: 'any_email'
            }
        }
        const httpResponse : IHttpResponse = sut.handle(httpRequest)!
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamater('password'))
    })
    
})
