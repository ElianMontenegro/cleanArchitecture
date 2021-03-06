import { IRegisterUserDTO } from "./IRegisterUseCase"
import { RegisterUseCase } from './registerUseCase'
import { badRequest, serverError } from '../../../../presentation/helpers/httpError'
import { IUserModel } from "../../../../infra/model/IUserModel"
import { ISave, ILoadUserByEmail } from "../../../../infra/interfacesRepositories"
import { IAccessToken, ICryptography, IRefreshToken } from "../../../../presentation/interfaces"


export const makeTokenGenerator = () => {
    class TokenGeneratorSpy implements IRefreshToken, IAccessToken{
        userId : any
        Token: any
        public token(userId: string, email?:string): string{
            this.userId = userId
            return this.Token
        }
    }
    const tokenGenerator = new TokenGeneratorSpy()
    tokenGenerator.Token = {
        userId : "any_id",
        email: 'any_email'
    }
    return tokenGenerator
}

const makeEncrypter = () => {
    class EncrypterSpy implements ICryptography{
        password : any
        hashedPassword : any
        isValid : any
        public async encrypt(value: string){
            this.password = value
            return this.password
        }
    }
    return new EncrypterSpy()
}

const makeUserRepository = () => {
    class UserRepositorySpy implements ILoadUserByEmail, ISave{
        res : any
        username: any
        user: any
        public async loadUserByEmail(email: string): Promise<IUserModel> {
            return this.res
        }
        public async save(user : IUserModel): Promise<IUserModel>{
            this.username = user.username
            return this.user
        }
        
    }
    const userRepositorySpy = new UserRepositorySpy()
    userRepositorySpy.user = {
        id: 'any_id',
        email: 'any_email'   
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
        userRepository,
        encrypterSpy,
        tokenGeneratorSpy,
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
        const { sut, encrypterSpy, userRepository, user } = makeSut()
        const password = "any_password"
        await sut.register(user)
        userRepository.res = null
        expect(encrypterSpy.password).toBe(password)
    }) 

    test('should call userRepository save() with correct values',async () => {
        const { sut, userRepository, user }= makeSut()
        await sut.register(user);
        expect(userRepository.username).toBe(user.username)
    }) 

    test('should call TokenGenerator call with correct userId',async () => {
        const { sut, tokenGeneratorSpy, user, userRepository }= makeSut()
        await sut.register(user);
        expect(tokenGeneratorSpy.Token.userId).toBe(userRepository.user.id)
        expect(tokenGeneratorSpy.Token.email).toBe(userRepository.user.email)
    }) 


    test('should return an accessToken id corrent credential provided',async () => {
        const { sut, user, tokenGeneratorSpy }= makeSut()
        const { accessToken } : any  = await sut.register(user);
        expect(tokenGeneratorSpy.Token.userId).toBe(accessToken.userId)
    }) 

    test('should return an refreshToken id, email corrent credential provided',async () => {
        const { sut, user, tokenGeneratorSpy }= makeSut()
        const{ refreshToken } : any  = await sut.register(user);
        expect(tokenGeneratorSpy.Token.userId).toBe(refreshToken.userId)
        expect(tokenGeneratorSpy.Token.email).toBe(refreshToken.email)
    })
  
    // test('should return serverError if user if not created', async () => {
    //     const { sut, user, userRepository } = makeSut()
    //     userRepository.user = null
    //     try {
    //         await sut.register(user)
    //     } catch (error) {
    //         thrownError = error
    //     }
    //     expect(thrownError).toEqual(serverError(new Error()))
    // })

    test('should return serverError if user if not created', async () => {
        const { sut, user, userRepository } = makeSut()
        jest.spyOn(userRepository, 'save').mockImplementationOnce(() => {
            throw new Error()
        })
        const res = await sut.register(user)
        expect(res).toEqual(serverError(new Error()))
    })
    
})






