export interface IJwt {
    generateToken(value: string, email?:string): string
}