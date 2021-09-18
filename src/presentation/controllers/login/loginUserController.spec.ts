import { ILoginUseCase, ILoginUserDTO } from "../../../domain/useCases/authUseCase/login/ILoginUseCase";
import { badRequest } from "../../helpers/httpError";
import { LoginUserController } from './loginUserController'

const makeLoginUseCase = () => {
    class LoginUseCaseSpy implements ILoginUseCase {
        userParams = {
            email: '',
            password: ''
        }
        async login(user: ILoginUserDTO): Promise<any>{
            this.userParams.email = user.email
            this.userParams.password = user.password
            return this.userParams.email
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

    test('Should call LoginUseCase with correct params', async () => {
        const { sut, user, loginUseCaseSpy }= makeSut()
        const httpRequest = { 
            body : user 
        }
        const res = await sut.handle(httpRequest)
        expect(res.body).toEqual(loginUseCaseSpy.userParams.email)
    })
  
    
})
