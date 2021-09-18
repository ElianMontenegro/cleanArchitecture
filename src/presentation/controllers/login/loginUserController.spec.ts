import { badRequest } from "../../helpers/httpError";
import { LoginUserController } from './loginUserController'

const makeLoginUseCase = () => {
    class LoginUseCaseSpy {
        email = ''
        password = ''
        login(email: string, password : string){
            this.email = email
            this.password = password
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
        
    })
  
    
})
