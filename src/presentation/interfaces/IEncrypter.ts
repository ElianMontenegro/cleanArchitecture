
export interface ICryptography {
    encrypt: (value: string) => Promise<string>
  }
  
export interface IDcryptography {
    dencrypt: (value: string, compary: string) => Promise<Boolean>
}