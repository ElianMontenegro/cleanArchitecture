import { IUserRepository } from "../IUserRepository"
import { mongoHelper } from "../helpers/mongoHelper"
import { IUserModel } from "../../presentation/interfaces/IUserModel"


export class UserRepostitory implements IUserRepository{
    
    public async load(email: string): Promise<IUserModel>{
        const userCollection = mongoHelper.getCollection("user")
        const user : IUserModel = await userCollection.findOne({email}, {projection : { "username": 0}})
        return user
    }

    public async save(user : IUserModel): Promise<any> {
        const userCollection  = mongoHelper.getCollection("user")
        const userNew = await userCollection.insertOne(user)
        return userNew
    }

}