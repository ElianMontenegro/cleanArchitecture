

export class LoadUserByRepostitory {
    constructor(public userModel: any){}
    public async load(email: string){
        const user = await this.userModel.findOne({email})
        return user
    }
}