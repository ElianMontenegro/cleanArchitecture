import { badRequest } from "../helpers/httpError";
import { LoginUserController } from './loginUserController'

const makeSut = () => {
    const user = { 
        email : 'any_email',
        password : 'any_password'
    }
    const sut = new LoginUserController()
    return {
        sut,
        user
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
  
    
})
