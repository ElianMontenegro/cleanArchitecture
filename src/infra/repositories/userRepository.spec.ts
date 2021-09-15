import { IUserModel } from '../../presentation/interfaces/IUserModel'
import { mongoHelper } from '../helpers/mongoHelper'
import { UserRepostitory } from './userRepository'


const makeSut = () => {
    const userModel = mongoHelper.getCollection('user')
    const sut = new UserRepostitory()
    return {
        sut,
        userModel
    }
}

describe.skip('UserRepostitory', () => {
    beforeAll(async () => {
        await mongoHelper.connect(process.env.MONGO_URL!)
    });

    beforeEach(async () => {
        await  mongoHelper.getCollection('user').deleteMany()
    })
    
    afterAll(async () => {
        await mongoHelper.disconnect()
    });

    test('should return null if user not found', async () => {
        const { sut } = makeSut()
        const user = await sut.loadUserByEmail("emailDontExist@gmail.com")
        expect(user).toBeNull()
    })
    

    test('should return an user if user is found', async () => {
        const { sut,userModel } = makeSut()
        const fakeUser = await userModel.insertOne({
            email : "emailExist@gmail.com",
            username : "any_username"
        })
        const user = await sut.loadUserByEmail("emailExist@gmail.com")
        expect(user._id).toEqual(fakeUser.insertedId)
    })

    test('should return an user if UserRepostitory save() return a user', async () => {
        const { sut } = makeSut()
        const fakeUser : IUserModel= {
            email : "any_email@gmail.com",
            username : "any_username",
            password : "any_password"
        }
        const saveUser = await sut.save(fakeUser)
        expect(saveUser.acknowledged).toBe(true)
        
    })
})
