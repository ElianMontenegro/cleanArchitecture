import { badRequest } from "../../../../presentation/helpers/httpError";
import { ILoginUseCase, ILoginUserDTO } from "./ILoginUseCase";


export class LoginUseCases implements ILoginUseCase{
    async login(user: ILoginUserDTO): Promise<any>{
        for (const [key, value] of Object.entries(user)) {
            if (!value) {
                throw badRequest(key);
            }
        }
        
    }
}