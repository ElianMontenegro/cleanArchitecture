import { IComparePassword } from "../presentation/interfaces/IComparePassword"


export class ComparePassword implements IComparePassword{
    isMatch(password: string, repeatPassword: string): Boolean{
        if (password !== repeatPassword){
            return false
        }
        return true
    }
}
