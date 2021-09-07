
class EmailValidator {
    public isValid(email: string): boolean{
        const emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
        if (!email)
            return false;
    
        if(email.length>254)
            return false;
    
        let valid = emailRegex.test(email);
        if(!valid)
            return false;
    
        let parts = email.split("@");
        if(parts[0].length>64)
            return false;
        
        return true;
    }
}


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
