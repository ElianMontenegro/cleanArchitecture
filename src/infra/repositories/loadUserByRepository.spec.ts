const { MongoClient } = require("mongodb");
let client: any;
let db : any;

class LoadUserByRepostitory {
    constructor(public userModel: any){}
    public async load(email: string){
        const user = await this.userModel.findOne({email})
        return user
    }
}

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
        const fakeUser = {
            email : "emailExist@gmail.com"
        }
        await userModel.insertOne(fakeUser)
        const user = await sut.load("emailExist@gmail.com")
        expect(user.email).toBe("emailExist@gmail.com")
    })
})
