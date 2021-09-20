import request from "supertest";
import { mongooseHelper } from "../../infra/helpers/mongooseHelper";
import { Bcrypt } from "../../utils/Encrypter";
import app from "../config/app";
let userModel : any
describe('Route login', () => {
    beforeAll(async () => {
        await mongooseHelper.connect("mongodb+srv://elianMontenegro:elianMontenegro@cluster0.ngt7y.mongodb.net/mockMongoose?retryWrites=true&w=majority")
        userModel = await mongooseHelper.getCollection('users')
    });

    // afterEach(async () => {
        
    // })

    afterAll(async () => {
        await userModel.deleteMany({})
        await mongooseHelper.disconnect()
    },3000);
    
    test('should return 200 when valid credentials are provided', async () => {
        const bcript = new Bcrypt(10)
        await userModel.insertOne({
            email: 'valid_email@gmail.com',
            password: await bcript.encrypt('hashed_password')
          })
        await request(app)
            .post("/api/login")
            .expect("Content-Type", /json/)
            .send({email : "valid_email@gmail.com" ,  password : "hashed_password" })
            .expect(200)
    })
    
})
