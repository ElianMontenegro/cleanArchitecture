import { IRegisterUseCase, IRegisterUserDTO } from "../../interfaces/IRegisterUseCase"

export class RegisterUseCase implements IRegisterUseCase {
    async register (user : IRegisterUserDTO) {
        if(!user.email){
            return new Error("email")
        }
        if(!user.username){
            return new Error("username")
        }
        if(!user.password){
            return new Error("password")
        }
        if(!user.repeatPassword){
            return new Error("repeatPassword")
        }
    }
}
describe('RegisterUseCase', () => {
    test('should return Error if email is empty',async () => {
        const sut = new RegisterUseCase()
        let email = ""
        let username = ""
        let password = ""
        let repeatPassword = ""
        const  res = await sut.register({email,username,password, repeatPassword})
        expect(res).toEqual(new Error("email"))
    })

    test('should return Error if username is empty',async () => {
        const sut = new RegisterUseCase()
        let email = "any_email"
        let username = ""
        let password = ""
        let repeatPassword = ""
        const  res = await sut.register({email,username,password, repeatPassword})
        expect(res).toEqual(new Error("username"))
    })
    test('should return Error if password is empty',async () => {
        const sut = new RegisterUseCase()
        let email = "any_email"
        let username = "any_username"
        let password = ""
        let repeatPassword = ""
        const  res = await sut.register({email,username,password, repeatPassword})
        expect(res).toEqual(new Error("password"))
    })
    test('should return Error if repeatPassword is empty',async () => {
        const sut = new RegisterUseCase()
        let email = "any_email"
        let username = "any_username"
        let password = "any_password"
        let repeatPassword = ""
        const  res = await sut.register({email,username,password, repeatPassword})
        expect(res).toEqual(new Error("repeatPassword"))
    })
    
})






