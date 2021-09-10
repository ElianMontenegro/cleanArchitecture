import { IRegisterUserDTO } from "../../interfaces/IRegisterUseCase"
import { RegisterUseCase } from './registerUseCase'
import { badRequest } from '../../errors/httpError'


const makeLoadUserByEmailRepository = () => {
    class LoadUserByEmailRepositorySpy{
        user = {}
        public async load(email: string) {
            return this.user
        }
        
    }
    return new LoadUserByEmailRepositorySpy()
}

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
        email : "any_email",
        username : "any_username",
        password : "any_password",
        repeatPassword : "any_repeatPassword"
    }
    const loadUserByEmailRepositorySpy = makeLoadUserByEmailRepository()
    const comparePasswordSpy = makeComparePassword()
    const emailValidatorSpy = makeEmailValidator()
    const sut = new RegisterUseCase(
        emailValidatorSpy, 
        comparePasswordSpy, 
        loadUserByEmailRepositorySpy
    )
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
        user.email = ""
        try {
            await sut.register(user)
        } catch (error) {
            thrownError = error
        }
        expect(thrownError).toEqual(badRequest("email is empty"))
    })

    test('should return Error if username is empty',async () => {
        const { sut, user }  = makeSut()
        user.username = ""
        try {
            await sut.register(user)
        } catch (error) {
            thrownError = error
        }
        expect(thrownError).toEqual(badRequest("username is empty"))
    })
    test('should return Error if password is empty',async () => {
        const { sut, user } = makeSut()
        user.password = ""
        try {
            await sut.register(user)
        } catch (error) {
            thrownError = error
        }
        expect(thrownError).toEqual(badRequest("password is empty"))
    })

    test('should return Error if repeatPassword is empty',async () => {
        const { sut, user }  = makeSut()
        user.repeatPassword = ""
        try {
            await sut.register(user)
        } catch (error) {
            thrownError = error
        }
        expect(thrownError).toEqual(badRequest("repeatPassword is empty"))
    })

    test('should return Error if email is invalid',async () => {
        const { sut, user, emailValidatorSpy }  = makeSut()
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
        comparePasswordSpy.isPasswordMatch = false
        try {
            await sut.register(user)
        } catch (error) {
            thrownError = error
        }
        expect(thrownError).toEqual(badRequest("passwords not match"))
    })

    test('should return error if makeLoadUserByEmailRepository return a user', async () => {
        const { sut, user } = makeSut()
        user.email = "email_Exist"
        try {
            await sut.register(user)
        } catch (error) {
            thrownError = error
        }
        expect(thrownError).toEqual(badRequest("user already exist"))
    })
    
    
})






