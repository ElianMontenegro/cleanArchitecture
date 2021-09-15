import { IUserModel } from "../../presentation/interfaces";
import { userModel } from "../model/userSchema";
import { IUserRepository } from "./IUserRepository";
import { Model } from "mongoose";

export class MongoUserRepository implements IUserRepository {

    constructor(private readonly entity : typeof Model){}
    async loadUserByEmail(email: string): Promise<IUserModel> {
        const user = await this.entity.findOne({email}, {'username' : 0 , 'updatedAt' : 0, 'createdAt' : 0, 'password' : 0, 'role' : 0})
        return user
    }
    async save(user: IUserModel): Promise<IUserModel> {
        const newUser = await this.entity.create(user)
        return newUser
    }

}