import jwt from 'jsonwebtoken'
import { IAccessToken, IRefreshToken } from "../presentation/interfaces";

export class TokenGenerator implements IAccessToken, IRefreshToken{
    private readonly secret : string
    private readonly  expiresIn : any
    constructor(secret : string, expiresIn : any){
        this.secret = secret
        this.expiresIn = expiresIn
    }
    token(id : string, email? : string): string{
        const token = jwt.sign({id : id, email: email}, this.secret, { expiresIn: this.expiresIn });
        console.log(token);
        
        return token
    }
}

