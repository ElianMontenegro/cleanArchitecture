import { IHttpResponse } from '../../../presentation/interfaces/IHttp';
import { MissingParamater, UnauthorizedError } from '../../../presentation/errors/clientError'
import { RegisterUserController } from './registerUserController'
import { IRegisterUseCase, IRegisterUserDTO } from '../../../presentation/interfaces/IRegisterUseCase'

const makeSut = () => {
    class RegisterUseCaseSpy implements IRegisterUseCase {
        //mock
        user = {
            username : "",
            email: "",
            password : "",
            repeatPassword: ""
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
        sut
    }
}


describe('Register user', () => {
    test('should return 400 if email is not provided', () => {
        const { sut } = makeSut()
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
        const { sut } = makeSut()
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
        const { sut } = makeSut()
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

    test('should return 400 if repeatPassword is not provided', () => {
        const { sut } = makeSut()
        const httpRequest = {
            body: {
                username: 'any_username',
                email: 'any_email',
                password: 'any_repeatPassword'
            }
        }
        const httpResponse : IHttpResponse = sut.handle(httpRequest)!
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamater('repeatPassword'))
    })

    test('should call RegisterUseCase with correct params', () => {
        const { sut, registerUseCaseSpy } = makeSut()
        const httpRequest = {
            body: {
                username: 'any_username',
                email: 'any_email',
                password: 'any_password',
                repeatPassword: 'any_repeatPassword'
            }
        }
        sut.handle(httpRequest)!
        expect(registerUseCaseSpy.user.username).toEqual(httpRequest.body.username)
        expect(registerUseCaseSpy.user.email).toEqual(httpRequest.body.email)
        expect(registerUseCaseSpy.user.password).toEqual(httpRequest.body.password)
        expect(registerUseCaseSpy.user.repeatPassword).toEqual(httpRequest.body.repeatPassword)
    })

  
    
})
