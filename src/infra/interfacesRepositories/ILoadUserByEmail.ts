import { IUserModel } from '../model/IUserModel'

export interface ILoadUserByEmail {
    loadUserByEmail(email: string): Promise<Pick<IUserModel, "email" | "_id" | "password">>
}