
import { TokenGenerator } from './tokenGenerator'

class TokenGeneratorSpy {
    jwtToken = null
    token(id : string): String | null{
        return this.jwtToken
    }
}


describe('tokenGenerator', () => {
    test('should return null if token if null', () => {
        const sut = new TokenGeneratorSpy();
        const token = sut.token('id_user')
        expect(token).toBeNull()
    })
})
