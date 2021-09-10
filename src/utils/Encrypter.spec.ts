import bcrypt from 'bcrypt'
import { IEncrypter } from '../interfaces/IEncrypter';
class Encrypter implements IEncrypter{
    public async hash(value: string, salt: number): Promise<string> {
        const valueHash = await bcrypt.hash(value , salt)
        return valueHash
    }
    public async compare(value: string, hashValue: string): Promise<Boolean>{
        const isValid = await bcrypt.compare(value, hashValue);
        return isValid
    }
}

describe('Encrypter', () => {
    test('should return value hashed and compare value',async () => {
        const sut = new Encrypter()
        const password = "any_password"
        const salt = 10
        const hashValue = await sut.hash(password, salt);
        const isValid = await sut.compare(password, hashValue);
        expect(isValid).toBe(true)
    })
    
})
