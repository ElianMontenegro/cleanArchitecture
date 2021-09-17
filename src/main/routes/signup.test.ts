import request from "supertest";
import { mongooseHelper } from "../../infra/helpers/mongooseHelper";
import app from "../config/app";

describe('Route SingUp', () => {
    beforeAll(async () => {
        await mongooseHelper.connect("mongodb+srv://elianMontenegro:elianMontenegro@cluster0.ngt7y.mongodb.net/mockMongoose?retryWrites=true&w=majority")
    });

    // beforeEach(async () => {
        
    // }, 3000)

    afterAll(async () => {
        await  mongooseHelper.getCollection('users').drop()
        await mongooseHelper.disconnect()
    });
    test('should return 201 when valid credentials are provided', async () => {
        await request(app)
            .post("/api/singup")
            .expect("Content-Type", /json/)
            .send({username: "any_username", email : "elian@gmail.com" ,  password : "12345" , repeatPassword : "12345"})
            .expect(201)
    })
    
})
