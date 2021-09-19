import { IUserModel } from '../model/IUserModel'

export interface ILoadUserByEmail {
    loadUserByEmail(email: string): Promise<IUserModel>
}