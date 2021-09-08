const { MongoClient } = require("mongodb");
import { LoadUserByRepostitory } from './loadUserByRepository'
let client: any;
let db : any;


const makeSut = () => {
    const userModel = db.collection('user')
    const sut = new LoadUserByRepostitory(userModel)
    return {
        sut,
        userModel
    }
}

describe('LoadUserByRepostitory', () => {
    beforeAll(async () => {
        client = await MongoClient.connect(process.env.MONGO_URL, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        });
        db = await client.db();
    });

    beforeEach(async () => {
        await db.collection('user').deleteMany()
    })
    
    afterAll(async () => {
        await client.close();
    });

    test('should return null if user not found', async () => {
        const { sut } = makeSut()
        const user = await sut.load("emailDontExist@gmail.com")
        expect(user).toBeNull()
    })
    

    test('should return an user if user is found', async () => {
        const { sut,userModel } = makeSut()
        const fakeUser = await userModel.insertOne({
            email : "emailExist@gmail.com"
        })
        const user = await sut.load("emailExist@gmail.com")
        expect(user._id).toEqual(fakeUser.insertedId)
    })
})
