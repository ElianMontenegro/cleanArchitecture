export interface IJwt {
    token(value: string, email?:string ): string
}