import { IRegisterUserDTO } from "../../interfaces/IRegisterUseCase"
import { RegisterUseCase } from './registerUseCase'
import { badRequest } from '../../errors/httpError'

const makeEmailValidator = () => {
    class EmailValidatorSpy{
        isEmailIsvalid = true
        public isValid(email: string): Boolean{
            return this.isEmailIsvalid
        }
    }
    return new EmailValidatorSpy()
}


const makeSut = () => {
    const user : IRegisterUserDTO = {
        email : "",
        username : "",
        password : "",
        repeatPassword : ""
    }
    const emailValidatorSpy = makeEmailValidator()
    const sut = new RegisterUseCase(emailValidatorSpy)
    return {
        sut, 
        user,
        emailValidatorSpy
    }
}


describe('RegisterUseCase', () => {
    let thrownError : any;
    test('should return Error if email is empty',async () => {
        const { sut, user } = makeSut()
        
        try {
            const res = await sut.register(user)
        } catch (error) {
            thrownError = error
        }
        expect(thrownError).toEqual(badRequest("email is empty"))
    })

    test('should return Error if username is empty',async () => {
        const { sut, user }  = makeSut()
        user.email = "any_email"
        try {
            const res = await sut.register(user)
        } catch (error) {
            thrownError = error
        }
        expect(thrownError).toEqual(badRequest("username is empty"))
    })
    test('should return Error if password is empty',async () => {
        const { sut, user } = makeSut()
        user.email = "any_email"
        user.username = "any_username"
        try {
            const res = await sut.register(user)
        } catch (error) {
            thrownError = error
        }
        expect(thrownError).toEqual(badRequest("password is empty"))
    })

    test('should return Error if repeatPassword is empty',async () => {
        const { sut, user }  = makeSut()
        user.email = "any_email"
        user.username = "any_username"
        user.password = "any_password"
        try {
            const res = await sut.register(user)
        } catch (error) {
            thrownError = error
        }
        expect(thrownError).toEqual(badRequest("repeatPassword is empty"))
    })

    test('should return Error if email is invalid',async () => {
        const { sut, user, emailValidatorSpy }  = makeSut()
        user.email = "invalid_email"
        user.username = "any_username"
        user.password = "any_password"
        user.repeatPassword = "any_repeatPassword"
        emailValidatorSpy.isEmailIsvalid = false
        try {
            const res = await sut.register(user)
        } catch (error) {
            thrownError = error
        }
        expect(thrownError).toEqual(badRequest("email is not valid"))
    })
})






