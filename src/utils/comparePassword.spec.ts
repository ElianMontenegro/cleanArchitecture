import { IComparePassword } from '../interfaces/IComparePassword'
class ComparePassword implements IComparePassword{
    isMatch(password: string, repeatPassword: string): Boolean{
        if (password !== repeatPassword){
            return false
        }
        return true
    }
}

describe('comparePassword', () => {
    test('should return false if passwords not match', () => {
        let password = "any_password";
        let repeatPassword = "different_password"
        const sut = new ComparePassword()
        const match = sut.isMatch(password, repeatPassword);
        expect(match).toBe(false)
    })

    test('should return true if passwords match', () => {
        let password = "same_password";
        let repeatPassword = "same_password"
        const sut = new ComparePassword()
        const match = sut.isMatch(password, repeatPassword);
        expect(match).toBe(true)
    })
    
})
