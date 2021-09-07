import { IRegisterUseCase, IRegisterUserDTO } from "../../interfaces/IRegisterUseCase"

export class RegisterUseCase implements IRegisterUseCase {
    async register (user : IRegisterUserDTO) {
        for (const [key, value] of Object.entries(user)) {
            if(!value){
                return Error(key)
            }
        }
    }
}



const makeSut = () => {
    const user : IRegisterUserDTO = {
        email : "",
        username : "",
        password : "",
        repeatPassword : ""
    }
    const sut = new RegisterUseCase()
    return {
        sut, 
        user
    }
}


describe('RegisterUseCase', () => {
    test('should return Error if email is empty',async () => {
        const { sut, user } = makeSut()
        const  res = await sut.register(user)
        expect(res).toEqual(new Error("email"))
    })

    test('should return Error if username is empty',async () => {
        const { sut, user }  = makeSut()
        user.email = "any_email"
        const  res = await sut.register(user)
        expect(res).toEqual(new Error("username"))
    })
    test('should return Error if password is empty',async () => {
        const { sut, user } = makeSut()
        user.email = "any_email"
        user.username = "any_username"
        const  res = await sut.register(user)
        expect(res).toEqual(new Error("password"))
    })
    test('should return Error if repeatPassword is empty',async () => {
        const { sut, user }  = makeSut()
        user.email = "any_email"
        user.username = "any_username"
        user.password = "any_password"
        const  res = await sut.register(user)
        expect(res).toEqual(new Error("repeatPassword"))
    })
    
})






