
export interface IEncrypter {
    hash(value: string, salt: number): Promise<string>
    compare(value: string, valueHash: string): Promise<Boolean>
}