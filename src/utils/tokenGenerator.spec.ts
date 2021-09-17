
import { TokenGenerator } from './tokenGenerator'

class TokenGeneratorSpy {
    jwtToken : any
    token(id : string): String{
        return this.jwtToken
    }
}


describe('tokenGenerator', () => {
    test('should return null if token if null', () => {
        const sut = new TokenGeneratorSpy();
        const token = sut.token('id_user');
        sut.jwtToken = null
        expect(token).toBeNull()
    })

})
