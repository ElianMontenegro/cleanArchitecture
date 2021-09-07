import { EmailValidator } from './emailValidator'


describe('Email Validator', () => {
    test('should return true if isValid return true', () => {
        const sut = new EmailValidator()
        const isEmailValid = sut.isValid("email_valid@gmail.com")
        expect(isEmailValid).toBe(true)
    })

    test('should return false if isValid return false', () => {
        const sut = new EmailValidator()
        const isEmailValid = sut.isValid("invalid_email")
        expect(isEmailValid).toBe(false)
    })
    
})
