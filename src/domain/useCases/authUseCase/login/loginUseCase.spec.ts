import { ILoadUserByEmail } from '../../../../infra/interfacesRepositories'
import { IUserModel } from '../../../../infra/model/IUserModel';
import { badRequest, notFound } from "../../../../presentation/helpers/httpError";
import { LoginUseCases } from './loginUseCase'


const makeUserRepository = () => {
    class MongoUserRepositorySpy implements ILoadUserByEmail {
        user : any
        async loadUserByEmail(email: string): Promise<IUserModel> {
            return this.user
        }
    
    }
    const mongoUserRepositorySpy = new MongoUserRepositorySpy()
    return mongoUserRepositorySpy
}
  
const makeEmailValidator = () => {
    class EmailValidatorSpy{
        valid : any
        isValid(email: string): Boolean{
            return this.valid
        }
    }
    const emailValidatorSpy = new EmailValidatorSpy()
    return new EmailValidatorSpy()
}

const makeSut = () => {
    const user = {
        email : "any_email",
        password : "any_password"
    }
    const mongoUserRepositorySpy = makeUserRepository()
    const emailValidatorSpy = makeEmailValidator()
    const sut = new LoginUseCases(emailValidatorSpy, mongoUserRepositorySpy)
    return {
        user,
        sut,
        emailValidatorSpy,
        mongoUserRepositorySpy
    }
}



describe('LoginUseCase', () => {
    test("should return badRequest error if email if not provided", async () => {
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

    test("should return badRequest error if email if not provided", async () => {
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

    test("should return badRequest error if email is invalid", async () => {
        const { sut, user, emailValidatorSpy} = makeSut();
        let throwError 
        emailValidatorSpy.valid = false
        try {
            await sut.login(user)
        } catch (error) {
            throwError = error
        }
        expect(throwError).toEqual(badRequest('email is not valid'))
    })


    test("should return error 404 if user is not found ", async () => {
        const { sut, user , mongoUserRepositorySpy, emailValidatorSpy} = makeSut();
        let throwError 
        emailValidatorSpy.valid = true
        mongoUserRepositorySpy.user = null
        try {
            await sut.login(user)
        } catch (error) {
            throwError = error
        }
        expect(throwError).toEqual(notFound("user not found"))
    })

})