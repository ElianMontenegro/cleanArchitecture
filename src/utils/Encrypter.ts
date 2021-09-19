import bcrypt from 'bcrypt'
import { ICryptography, IDcryptography } from '../presentation/interfaces/IEncrypter';

export class Bcrypt implements ICryptography {
    constructor(private salt : number){
        this.salt = salt
    }
    async encrypt(value: string): Promise<string> {
        const valueHash = await bcrypt.hash(value, this.salt)
        return valueHash
    }
}

export class Dcrypt implements IDcryptography {
    async dencrypt (value: string, compareSync: string): Promise<Boolean> {
        const comparyHash = await bcrypt.compare(value, compareSync)
        return comparyHash
    }
}