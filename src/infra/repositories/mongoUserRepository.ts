import { IUserModel } from "../model/IUserModel";
import { ILoadUserByEmail, ISave } from "../interfacesRepositories"
import { Model } from "mongoose";
// import { IMongoRepository } from "../interfacesRepositories/IMongoRepository"
export class MongoUserRepository implements ILoadUserByEmail, ISave {

    constructor(private readonly entity : typeof Model){}
    async loadUserByEmail(email: string): Promise<IUserModel> {
        const user : IUserModel = await this.entity.findOne({email}, {'username' : 0 , 'updatedAt' : 0, 'createdAt' : 0,'role' : 0})
        return user
    }
    async save(user: IUserModel): Promise<IUserModel> {
        const newUser : IUserModel = await this.entity.create(user)
        return newUser
    }

}