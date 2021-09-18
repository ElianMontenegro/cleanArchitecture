import { badRequest } from "../../../../presentation/helpers/httpError";
import { LoginUseCases } from './loginUseCase'

const makeSut = () => {
    const user = {
        email : "any_email",
        password : "any_password"
    }
    const sut = new LoginUseCases()
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

})