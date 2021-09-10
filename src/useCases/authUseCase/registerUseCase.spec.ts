import { IRegisterUserDTO } from "../../presentation/interfaces/IRegisterUseCase"
import { RegisterUseCase } from './registerUseCase'
import { badRequest, serverError } from '../../presentation/errors/httpError'
import { IUserModel } from "../../presentation/interfaces/IUserModel"


class EncrypterSpy{
    password : any
    salt : any
    hashedPassword : any
    isValid : any
    public hash(value: string, salt: number){
        this.password = value
        this.salt = salt
        return this.password
    }
    public compare(value: string, hashValue: string){
        this.password = value
        this.hashedPassword = hashValue
        return this.isValid
    }
}

const makeUserRepository = () => {
    
    class UserRepositorySpy{
        user = {
            email : "any_email",
            username : "any_username",
            password : "any_password",
        }
        public async load(email: string): Promise<IUserModel> {
            return this.user
        }
        public async save(user : IUserModel): Promise<IUserModel>{
            return user
        }
        
    }
    return new UserRepositorySpy()
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
    const encrypterSpy = new EncrypterSpy()
    const userRepository = makeUserRepository()
    const comparePasswordSpy = makeComparePassword()
    const emailValidatorSpy = makeEmailValidator()
    const sut = new RegisterUseCase(
        emailValidatorSpy, 
        comparePasswordSpy, 
        userRepository,
        encrypterSpy
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

    test('should return error if userRepository return a user', async () => {
        const { sut, user } = makeSut()
        user.email = "email_Exist"
        try {
            await sut.register(user)
        } catch (error) {
            thrownError = error
        }
        expect(thrownError).toEqual(badRequest("user already exist"))
    })
    
    test('should return Encrypter hash with correct values', () => {
        const sut = new EncrypterSpy();
        const password = "any_password"
        const salt = 10
        sut.hash(password, salt);
        expect(sut.password).toBe(password)
        expect(sut.salt).toBe(salt)
    }) 

    test('should return Encrypter compare with correct values', () => {
        const sut = new EncrypterSpy();
        const password = "any_password"
        const hashedPassword = "any_hashedPassword"
        sut.compare(password, hashedPassword);
        expect(sut.password).toBe(password)
        expect(sut.hashedPassword).toBe(hashedPassword)
    }) 
    
   
    
    
})






