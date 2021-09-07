import { IRegisterUserDTO } from "../../interfaces/IRegisterUseCase"
import { RegisterUseCase } from './registerUseCase'

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
    test('should return Error if email is empty',async () => {
        const { sut, user } = makeSut()
        const res = await sut.register(user)
        expect(res).toEqual(new Error("email"))
    })

    test('should return Error if username is empty',async () => {
        const { sut, user }  = makeSut()
        user.email = "any_email"
        const res = await sut.register(user)
        expect(res).toEqual(new Error("username"))
    })
    test('should return Error if password is empty',async () => {
        const { sut, user } = makeSut()
        user.email = "any_email"
        user.username = "any_username"
        const res = await sut.register(user)
        expect(res).toEqual(new Error("password"))
    })
    test('should return Error if repeatPassword is empty',async () => {
        const { sut, user }  = makeSut()
        user.email = "any_email"
        user.username = "any_username"
        user.password = "any_password"
        const res = await sut.register(user)
        expect(res).toEqual(new Error("repeatPassword"))
    })
    test('should return Error if email is invalid',async () => {
        const { sut, user, emailValidatorSpy }  = makeSut()
        user.email = "invalid_email"
        user.username = "any_username"
        user.password = "any_password"
        user.repeatPassword = "any_repeatPassword"
        emailValidatorSpy.isEmailIsvalid = false
        const res = await sut.register(user)
        expect(res).toEqual(new Error("email is not valid"))
    })
})






