import { mongooseHelper } from "../helpers/mongooseHelper";
import { userModel } from "../model/userSchema"
import { MongoUserRepository } from "./mongoUserRepository"


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
        const sut = new MongoUserRepository(userModel);
        const user = await sut.loadUserByEmail("emailDontExist@gmail.com");
        expect(user).toBeNull();
    })

    
    
    
})
