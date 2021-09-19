import { ILoadUserByEmail } from '../../../../infra/interfacesRepositories'
import { IUserModel } from '../../../../infra/model/IUserModel';
import { badRequest, notFound, Unauthorized } from "../../../../presentation/helpers/httpError";
import { IDcryptography } from '../../../../presentation/interfaces';
import { LoginUseCases } from './loginUseCase'
import { makeTokenGenerator } from '../register/registerUseCase.spec'

const makeEncripter = () => {
    class DcryptSpy implements IDcryptography {
        match = true
        async dencrypt(value: string, valueHash: string): Promise<Boolean> {
            return this.match
        }
    }
    const dcrypt = new DcryptSpy()
    return dcrypt
}

const makeUserRepository = () => {

    class MongoUserRepositorySpy implements ILoadUserByEmail {
        user : any
        async loadUserByEmail(email: string): Promise<Pick<IUserModel, "_id" | "email" | "password">> {
            return this.user
        }
    }
    const mongoUserRepositorySpy = new MongoUserRepositorySpy()
    return mongoUserRepositorySpy
}
  
const makeEmailValidator = () => {
    class EmailValidatorSpy{
        valid = true
        isValid(email: string): Boolean{
            return this.valid
        }
    }
    const emailValidatorSpy = new EmailValidatorSpy()
    return new EmailValidatorSpy()
}

const makeSut = () => {
    const user = {
        _id : "any_id",
        email : "any_email",
        password : "any_password"
    }
    const tokenGeneratorSpy = makeTokenGenerator()
    const dcryptSpy = makeEncripter()
    let throwError : any
    const mongoUserRepositorySpy = makeUserRepository()
    const emailValidatorSpy = makeEmailValidator()
    const sut = new LoginUseCases(emailValidatorSpy, mongoUserRepositorySpy, dcryptSpy, tokenGeneratorSpy, tokenGeneratorSpy)
    return {
        user,
        sut,
        emailValidatorSpy,
        mongoUserRepositorySpy,
        throwError,
        dcryptSpy,
        tokenGeneratorSpy
    }
}

describe('LoginUseCase', () => {
    test("should return badRequest error if email if not provided", async () => {
        let { sut, user, throwError} = makeSut();
        user.email = ""
        try {
            await sut.login(user)
        } catch (error) {
            throwError = error
        }
        expect(throwError).toEqual(badRequest('email'))
    })

    test("should return badRequest error if email if not provided", async () => {
        let { sut, user, throwError} = makeSut();
        user.password = ""
        try {
            await sut.login(user)
        } catch (error) {
            throwError = error
        }
        expect(throwError).toEqual(badRequest('password'))
    })

    test("should return badRequest error if email is invalid", async () => {
        let { sut, user, emailValidatorSpy, throwError } = makeSut();
        emailValidatorSpy.valid = false
        try {
            await sut.login(user)
        } catch (error) {
            throwError = error
        }
        expect(throwError).toEqual(badRequest('email is not valid'))
    })


    test("should return error 404 if user is not found ", async () => {
        let { sut, user , mongoUserRepositorySpy, throwError} = makeSut();
        mongoUserRepositorySpy.user = null
        try {
            await sut.login(user)
        } catch (error) {
            throwError = error
        }
        expect(throwError).toEqual(notFound("user not found"))
    })

    test("should  return 401 error if password dont match", async () => {
        let { sut, user , dcryptSpy , mongoUserRepositorySpy, throwError} = makeSut()
        mongoUserRepositorySpy.user = user
        dcryptSpy.match = false
        try {
            await sut.login(user)
        } catch (error) {
            throwError = error
        }
        expect(throwError).toEqual(Unauthorized())
    })

    test("should call TokenGenerator call with correct params", async () => {
        const { sut, tokenGeneratorSpy, user, mongoUserRepositorySpy }= makeSut()
        mongoUserRepositorySpy.user = user
        await sut.login(user);
        expect(tokenGeneratorSpy.Token.userId).toBe(mongoUserRepositorySpy.user._id)
        expect(tokenGeneratorSpy.Token.email).toBe(mongoUserRepositorySpy.user.email)
    })
})