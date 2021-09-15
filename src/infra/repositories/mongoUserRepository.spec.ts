import { mongooseHelper } from "../helpers/mongooseHelper";
import { userModel } from "../model/userSchema"
import { MongoUserRepository } from "./mongoUserRepository"

const makeSut = () => {
    const userFake = new userModel({
        email : "emailExist@gmail.com",
        username : "any_username",
        password: "any_password"
    })
    const sut = new MongoUserRepository(userModel); 
    return {
        sut,
        userFake
    }
}


describe('mongoUserRepository', () => {
    beforeAll(async () => {
        await mongooseHelper.connect("mongodb+srv://elianMontenegro:elianMontenegro@cluster0.ngt7y.mongodb.net/mockMongoose?retryWrites=true&w=majority")
    });

    beforeEach(async () => {
        await  mongooseHelper.getCollection('users').drop()
    })

    afterAll(async () => {
        await mongooseHelper.disconnect()
    });

    test('should return null if user is not found',async () => {
        const { sut } = makeSut()
        const user = await sut.loadUserByEmail("emailDontExist@gmail.com");
        expect(user).toBeNull();
    })

    test('should return an user if user is found',async () => {
        const { sut, userFake } = makeSut()
        const userFakeSave = await userFake.save();
        const user = await sut.loadUserByEmail("emailExist@gmail.com");
        expect(user.email).toBe(userFakeSave.email)
    })
    
    test('should return an user  if user created',async () => {
        const { sut, userFake } = makeSut()
        const user = await sut.save(userFake);
        expect(userFake).toEqual(user);
    })
    
    
})
