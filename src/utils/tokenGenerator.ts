import jwt from 'jsonwebtoken'
import { IJwt } from "../presentation/interfaces";

export class TokenGenerator implements IJwt{

    private readonly secret : string
    private readonly  expiresIn : any
    constructor(secret : string, expiresIn : any){
        this.secret = secret
        this.expiresIn = expiresIn
    }

    token(id : string): string{
        const token = jwt.sign(id, this.secret, { expiresIn: this.expiresIn });
        return token
    }
}