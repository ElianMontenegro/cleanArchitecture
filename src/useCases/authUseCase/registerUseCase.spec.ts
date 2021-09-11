import { IRegisterUserDTO } from "../../presentation/interfaces/IRegisterUseCase"
import { RegisterUseCase } from './registerUseCase'
import { badRequest } from '../../presentation/errors/httpError'
import { IUserModel } from "../../presentation/interfaces/IUserModel"


const makeTokenGenerator = () => {
    class TokenGeneratorSpy{
        userId : any
        token: any
        public accessToken(userId: string): string{
            this.userId = userId
            return this.token
        }
    }
    const tokenGenerator = new TokenGeneratorSpy()
    tokenGenerator.token = {
        userId : "any_id"
    }
    return tokenGenerator
}

const makeEncrypter = () => {
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
    return new EncrypterSpy()
}

const makeUserRepository = () => {
    
    class UserRepositorySpy{
       
        res : any
        username: any
        user: any
        public async load(email: string): Promise<IUserModel> {
            return this.res
        }
        public async save(user : IUserModel): Promise<IUserModel>{
            this.username = user.username
            return this.user
        }
        
    }
    const userRepositorySpy =new UserRepositorySpy()
    userRepositorySpy.user = {
        id: 'any_id'
    }
    return userRepositorySpy


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
    const tokenGeneratorSpy = makeTokenGenerator()
    const encrypterSpy = makeEncrypter()
    const userRepository = makeUserRepository()
    const comparePasswordSpy = makeComparePassword()
    const emailValidatorSpy = makeEmailValidator()
    
    const sut = new RegisterUseCase(
        emailValidatorSpy, 
        comparePasswordSpy, 
        userRepository,
        encrypterSpy,
        tokenGeneratorSpy
    )
    return {
        sut, 
        user,
        emailValidatorSpy,
        comparePasswordSpy,
        encrypterSpy,
        userRepository,
        tokenGeneratorSpy
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
        const { sut, user, userRepository } = makeSut()
        userRepository.res = user
        try {
            await sut.register(user)
        } catch (error) {
            thrownError = error
        }
        expect(thrownError).toEqual(badRequest("user already exist"))
    })
    
    test('should call Encrypter hash() with correct values',async () => {
        const { sut, encrypterSpy, userRepository, user }= makeSut()
        const password = "any_password"
        const salt = 10
        await sut.register(user)
        userRepository.res = null
        expect(encrypterSpy.password).toBe(password)
        expect(encrypterSpy.salt).toBe(salt)
    }) 

    test('should call userRepository save() with correct values',async () => {
        const { sut, userRepository, user }= makeSut()
        await sut.register(user);
        expect(userRepository.username).toBe(user.username)
    }) 

    test('should call TokenGenerator call with correct userId',async () => {
        const { sut, tokenGeneratorSpy, user, userRepository }= makeSut()
        await sut.register(user);
        expect(tokenGeneratorSpy.token.userId).toBe(userRepository.user.id)
    }) 
   

   
    
    
})






