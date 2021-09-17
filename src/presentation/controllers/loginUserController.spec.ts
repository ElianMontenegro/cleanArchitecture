import { badRequest } from "../helpers/httpError";
import { LoginUserController } from './loginUserController'



describe('LoginUserController', () => {
    test('should return 400 if email is not provided', async () => {
        const sut = new LoginUserController();
        const httpRequest = { body : { email : ''} }
        const res = await sut.handle(httpRequest)
        expect(res).toStrictEqual(badRequest('email'))
    })
    test('should return 400 if password is not provided', async () => {
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
