
class registerUser {
    handle(httpRequest: any) {
        if(!httpRequest.body.email){
            return {
                statusCode: 400
            }
        }
    }
}


describe('Register user', () => {
    test('should return 400 if email is not provided', () => {
        const sut = new registerUser()
        const httpRequest = {
            body: {
                password: 'any_password'
            }
        }
        const httpResponse : any = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
    })
    
})
