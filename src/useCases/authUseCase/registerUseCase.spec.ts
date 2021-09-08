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

const makeComparePassword = () => {
    class ComparePasswordSpy{
        isPasswordMatch = true
        public isMatch(password : string, repeatPassword : string): Boolean{
            if (password !== repeatPassword){
                return this.isPasswordMatch
            }
            return true
        }
    }
    return new ComparePasswordSpy()
}



const makeSut = () => {
    const user : IRegisterUserDTO = {
        email : "",
        username : "",
        password : "",
        repeatPassword : ""
    }
    const comparePasswordSpy = makeComparePassword()
    const emailValidatorSpy = makeEmailValidator()
    const sut = new RegisterUseCase(emailValidatorSpy, comparePasswordSpy)
    return {
        sut, 
        user,
        emailValidatorSpy,
        comparePasswordSpy
    }
}


describe('RegisterUseCase', () => {
    let thrownError : any;
    test('should return Error if email is empty',async () => {
        const { sut, user } = makeSut()
        try {
            await sut.register(user)
        } catch (error) {
            thrownError = error
        }
        expect(thrownError).toEqual(badRequest("email is empty"))
    })

    test('should return Error if username is empty',async () => {
        const { sut, user }  = makeSut()
        user.email = "any_email"
        try {
            await sut.register(user)
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
            await sut.register(user)
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
            await sut.register(user)
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
            await sut.register(user)
        } catch (error) {
            thrownError = error
        }
        expect(thrownError).toEqual(badRequest("email is not valid"))
    })

    test('should return error if the isMatch return false', async () => {
        const { user, sut,  comparePasswordSpy}  = makeSut()
        user.email = "invalid_email"
        user.username = "any_username"
        user.password = "any_password"
        user.repeatPassword = "any_repeatPassword"
        comparePasswordSpy.isPasswordMatch = false
        try {
            await sut.register(user)
        } catch (error) {
            thrownError = error
        }
        expect(thrownError).toEqual(badRequest("passwords not match"))
    })
    
})






