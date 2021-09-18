import { badRequest } from "../../../../presentation/helpers/httpError";
import { LoginUseCases } from './loginUseCase'

const makeSut = () => {
    const user = {
        email : "any_email",
        password : "any_passworf"
    }
    const sut = new LoginUseCases()
    return {
        user,
        sut
    }
}



describe('LoginUseCase', () => {
    test("should return badRequest error if email if not provided",async () => {
        const sut = new LoginUseCases();
        let throwError 
        const user = {
            email : "",
            password : ""
        }
        try {
            await sut.login(user)
        } catch (error) {
            throwError = error
        }
        expect(throwError).toEqual(badRequest('email'))
    })

    test("should return badRequest error if email if not provided",async () => {
        const sut = new LoginUseCases();
        let throwError 
        const user = {
            email : "any_email",
            password : ""
        }
        try {
            await sut.login(user)
        } catch (error) {
            throwError = error
        }
        expect(throwError).toEqual(badRequest('password'))
    })

})