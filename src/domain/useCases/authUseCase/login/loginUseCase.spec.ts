import { badRequest } from "../../../../presentation/helpers/httpError";
import { ILoginUseCase, ILoginUserDTO } from "./ILoginUseCase";

class LoginUseCases implements ILoginUseCase{
    async login(user: ILoginUserDTO): Promise<any>{
        for (const [key, value] of Object.entries(user)) {
            if (!value) {
                throw badRequest(key);
            }
        }
        
    }
}


describe('LoginUseCase', () => {
    test("should return badRequest error if email if not provided",async () => {
        const sut = new LoginUseCases();
        let throwError 
        const user = {
            email : "",
            password : ""
        }
        try {
            await sut.login(user)
        } catch (error) {
            throwError = error
        }
        expect(throwError).toEqual(badRequest('email'))
    })

})