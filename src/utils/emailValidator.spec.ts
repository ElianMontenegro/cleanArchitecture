
class EmailValidator {
    public isValid(email: string){
        return true
    }
}


describe('Email Validator', () => {
    test('should return true if validator return true', () => {
        const sut = new EmailValidator()
        const isEmailValid = sut.isValid("email_valid@gmail.com")
        expect(isEmailValid).toBe(true)
    })
    
})
