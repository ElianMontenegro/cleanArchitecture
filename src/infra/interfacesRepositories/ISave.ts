import { IUserModel } from '../model/IUserModel'

export interface IUserSave {
    _id?: string;
    username: string;
    email: string;
    password: string
}


export interface ISave {
    save(user : IUserSave): Promise<IUserSave>
}