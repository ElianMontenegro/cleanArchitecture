import { Encrypter } from './Encrypter'

describe('Encrypter', () => {
    test('should return value hashed and compare value',async () => {
        const sut = new Encrypter()
        const password = "any_password"
        const salt = 10
        const hashValue = await sut.hash(password, salt);
        const isValid = await sut.compare(password, hashValue);
        expect(isValid).toBe(true)
    })
    
}) //TOY PROGRAMANDO CAPA
