import { IUserModel } from '../../presentation/interfaces/IUserModel'

export interface IUserRepository {
    loadUserByEmail(email: string): Promise<IUserModel>
    save(user : IUserModel): Promise<IUserModel>
}
