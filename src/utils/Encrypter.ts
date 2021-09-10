import bcrypt from 'bcrypt'
import { IEncrypter } from '../presentation/interfaces/IEncrypter';
export class Encrypter implements IEncrypter{
    public async hash(value: string, salt: number): Promise<string> {
        const valueHash = await bcrypt.hash(value , salt)
        return valueHash
    }
    public async compare(value: string, hashValue: string): Promise<Boolean>{
        const isValid = await bcrypt.compare(value, hashValue);
        return isValid
    }
}