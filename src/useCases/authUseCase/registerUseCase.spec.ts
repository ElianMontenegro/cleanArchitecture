import { IRegisterUseCase, IRegisterUserDTO } from "../../interfaces/IRegisterUseCase"

export class RegisterUseCase implements IRegisterUseCase {
    async register (user : IRegisterUserDTO) {
        if(!user.email){
            return new Error("email")
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
    
})






