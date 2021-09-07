import { IRegisterUseCase, IRegisterUserDTO } from "../../interfaces/IRegisterUseCase";

export class RegisterUseCase implements IRegisterUseCase {
    async register (user : IRegisterUserDTO) {
        for (const [key, value] of Object.entries(user)) {
            if(!value){
                return Error(key)
            }
        }
    }
}