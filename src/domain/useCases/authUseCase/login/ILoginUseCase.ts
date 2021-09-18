
export interface ILoginUserDTO {
    email: string;
    password: string;
}

export interface ILoginUseCase {
    login: (user : ILoginUserDTO) => Promise<any>
}