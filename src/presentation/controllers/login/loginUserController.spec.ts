import { ILoginUseCase, ILoginUserDTO } from "../../../domain/useCases/authUseCase/login/ILoginUseCase";
import { UnauthorizedError } from "../../errors/clientError";
import { badRequest, Unauthorized } from "../../helpers/httpError";
import { LoginUserController } from './loginUserController'

const makeLoginUseCase = () => {
    class LoginUseCaseSpy implements ILoginUseCase {
        token : any
        async login(user: ILoginUserDTO): Promise<any>{
            return this.token
        }
    }
    return new LoginUseCaseSpy()
}



const makeSut = () => {
    const user = { 
        email : 'any_email',
        password : 'any_password'
    }
    const loginUseCaseSpy = makeLoginUseCase()
    const sut = new LoginUserController(loginUseCaseSpy)
    return {
        sut,
        user,
        loginUseCaseSpy
    }
    
}

describe('LoginUserController', () => {
    test('should return 400 if email is not provided', async () => {
        const { sut, user }= makeSut()
        user.email = ''
        const httpRequest = { 
            body : user 
        }
        const res = await sut.handle(httpRequest)
        expect(res).toStrictEqual(badRequest('email'))
    })
    test('should return 400 if password is not provided', async () => {
        const { sut, user }= makeSut()
        user.password = ''
        const httpRequest = { 
            body : user 
        }
        const res = await sut.handle(httpRequest)
        expect(res).toStrictEqual(badRequest('password'))
    })

    test('Should return Unauthorized if tokens are not valid', async () => {
        const { sut, user, loginUseCaseSpy }= makeSut()
        const httpRequest = { 
            body : user 
        }
        loginUseCaseSpy.token = null
        const res = await sut.handle(httpRequest)
        expect(res).toEqual(Unauthorized())
    })

    test('Should return token if useCase return a tokens', async () => {
        const { sut, user, loginUseCaseSpy }= makeSut()
        const httpRequest = { 
            body : user 
        }
        loginUseCaseSpy.token = "any_token"
        const res = await sut.handle(httpRequest)
        expect(res.body).toBe( "any_token")
    })
    
})
