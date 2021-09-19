  
let bcrypt_result : boolean;
let bcrypt_value : string;
let bcrypt_hash : string;
jest.mock('bcrypt', () => ({
    async compare (value: string, hash: string) {
        bcrypt_value = value
        bcrypt_hash = hash
        return bcrypt_result
    }
}))

const bcrypt = require('bcrypt')
import { Encrypter } from './Encrypter'

const makeSut = () => {
    return new Encrypter()
  }

describe('Encrypter', () => {
    test('Should return true if bcrypt returns true', async () => {
        const sut = makeSut()
        bcrypt_result = true
        const isValid = await sut.compare('any_value', 'hashed_value')
        expect(isValid).toBe(true)
    })
    test('Should return false if bcrypt returns false', async () => {
        const sut = makeSut()
        bcrypt_result = false
        const isValid = await sut.compare('any_value', 'hashed_value')
        expect(isValid).toBe(false)
    })
    
    test('Should call bcrypt with correct values', async () => {
        const sut = makeSut()
        await sut.compare('any_value', 'hashed_value')
        expect(bcrypt_value).toBe('any_value')
        expect(bcrypt_hash).toBe('hashed_value')
      })
})


