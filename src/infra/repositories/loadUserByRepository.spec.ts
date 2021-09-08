const { MongoClient } = require("mongodb");
class LoadUserByRepostitory {
    constructor(public userModel: any){}
    public async load(email: string){
        const user = await this.userModel.findOne({email})
        return user
    }
}

describe('LoadUserByRepostitory', () => {
    let client: any;
    let db : any;

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
        const userModel = db.collection('user')
        const sut = new LoadUserByRepostitory(userModel)
        const user = await sut.load("emailDontExist@gmail.com")
        expect(user).toBeNull()
    })
    

    test('should return an user if user is found', async () => {
        const userModel = db.collection('user')
        const fakeUser = {
            email : "emailExist@gmail.com"
        }
        await userModel.insertOne(fakeUser)
        const sut = new LoadUserByRepostitory(userModel)
        const user = await sut.load("emailExist@gmail.com")
        expect(user.email).toBe("emailExist@gmail.com")
    })
})
