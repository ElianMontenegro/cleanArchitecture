export interface IAccessToken {
    token(value: string): string
}

export interface IRefreshToken {
    token(value: string, email : string): string
}