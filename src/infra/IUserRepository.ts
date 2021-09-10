import { IUserModel } from '../presentation/interfaces/IUserModel'
export interface IUserRepository {
    load(email: string): Promise<IUserModel>
    save(user : IUserModel): Promise<IUserModel>
}
