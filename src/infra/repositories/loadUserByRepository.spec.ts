
class LoadUserByRepostitory {
    public async load(email: string){
        return null
    }
}

describe('LoadUserByRepostitory', () => {
    test('should return null if user not found', async () => {
        const sut = new LoadUserByRepostitory()
        const user = await sut.load("emailDontExist@gmail.com")
        expect(user).toBeNull()
    })

})
