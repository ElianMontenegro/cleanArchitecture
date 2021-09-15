import { IHttpResponse } from '../interfaces/IHttp';
import { RegisterUserController } from './registerUserController'
import { IRegisterUseCase, IRegisterUserDTO } from '../interfaces/IRegisterUseCase'
import { badRequest } from '../helpers/httpError';

const makeSut = () => {
    const  user = {
        username : "any_username",
        email: "any_email",
        password : "any_password",
        repeatPassword: "any_repeatPassword"
    }
    class RegisterUseCaseSpy implements IRegisterUseCase {
        //mock
        user = {
            username : "any_username",
            email: "any_email",
            password : "any_password",
            repeatPassword: "any_repeatPassword"
        }
        register (user : IRegisterUserDTO) {
            this.user.username = user.username
            this.user.email = user.email
            this.user.password = user.password
            this.user.repeatPassword = user.repeatPassword
        }
    }
    const registerUseCaseSpy = new RegisterUseCaseSpy()
    const sut = new RegisterUserController(registerUseCaseSpy);
    return {
        registerUseCaseSpy,
        sut,
        user
    }
}


describe('Register user', () => {
    test('should return 400 if params  are not provided', () => {
        const { sut , user} = makeSut()
        user.username = ''
        const httpRequest = { body: user}
        const httpResponse : IHttpResponse = sut.handle(httpRequest)!
        expect(httpResponse).toEqual(badRequest('username'))
        
    }),

    test('should return 400 if email is not provided', () => {
        const { sut, user } = makeSut()
        user.email = ''
        const httpRequest = { body: user }
        const httpResponse : IHttpResponse = sut.handle(httpRequest)!
        expect(httpResponse).toEqual(badRequest('email'))
    })

    test('should return 400 if password is not provided', () => {
        const { sut, user } = makeSut()
        user.password = ''
        const httpRequest = { body: user }
        const httpResponse : IHttpResponse = sut.handle(httpRequest)!
        expect(httpResponse).toEqual(badRequest('password'))
    })

    test('should return 400 if repeatPassword is not provided', () => {
        const { sut, user } = makeSut()
        user.repeatPassword = ''
        const httpRequest = { body: user }
        const httpResponse : IHttpResponse = sut.handle(httpRequest)!
        expect(httpResponse).toEqual(badRequest('repeatPassword'))
    })

    test('should call RegisterUseCase with correct params', () => {
        const { sut, registerUseCaseSpy, user } = makeSut()
        const httpRequest = {
            body: { user }
        }
        sut.handle(httpRequest)!
        expect(registerUseCaseSpy.user.username).toEqual(httpRequest.body.user.username)
        expect(registerUseCaseSpy.user.email).toEqual(httpRequest.body.user.email)
        expect(registerUseCaseSpy.user.password).toEqual(httpRequest.body.user.password)
        expect(registerUseCaseSpy.user.repeatPassword).toEqual(httpRequest.body.user.repeatPassword)
    })

  
    
})
