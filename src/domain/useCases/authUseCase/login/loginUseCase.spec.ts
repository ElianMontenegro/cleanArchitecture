import { badRequest } from "../../../../presentation/helpers/httpError";
import { LoginUseCases } from './loginUseCase'

const makeEmailValidator = () => {
    class EmailValidatorSpy{
        valid : any
        isValid(email: string){
            return this.valid
        }
    }
    return new EmailValidatorSpy()
}

const makeSut = () => {
    const user = {
        email : "any_email",
        password : "any_password"
    }
    const emailValidatorSpy = makeEmailValidator()
    const sut = new LoginUseCases(emailValidatorSpy)
    return {
        user,
        sut
    }
}



describe('LoginUseCase', () => {
    test("should return badRequest error if email if not provided",async () => {
        const { sut, user} = makeSut();
        let throwError 
        user.email = ""
        try {
            await sut.login(user)
        } catch (error) {
            throwError = error
        }
        expect(throwError).toEqual(badRequest('email'))
    })

    test("should return badRequest error if email if not provided",async () => {
        const { sut, user} = makeSut();
        let throwError 
        user.password = ""
        try {
            await sut.login(user)
        } catch (error) {
            throwError = error
        }
        expect(throwError).toEqual(badRequest('password'))
    })

    test("should return badRequest error if email is invalid",async () => {
        const { sut, user} = makeSut();
        let throwError 
        try {
            await sut.login(user)
        } catch (error) {
            throwError = error
        }
        expect(throwError).toEqual(badRequest('email is not valid'))
    })

})