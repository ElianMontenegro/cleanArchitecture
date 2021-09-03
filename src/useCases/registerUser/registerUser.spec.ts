
class registerUser {
    handle(httpRequest: any) {
        if(!httpRequest.body.email || !httpRequest.body.username){
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
                username: 'any_username',
                password: 'any_password'
            }
        }
        const httpResponse : any = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
    }),

    test('should return 400 if username is not provided', () => {
        const sut = new registerUser()
        const httpRequest = {
            body: {
                email: 'any_email',
                password: 'any_password'
            }
        }
        const httpResponse : any = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
    })
    
})
