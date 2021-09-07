export interface IRegisterUserDTO {
    username: string;
    email: string;
    password: string;
    repeatPassword: string;
}

export interface IRegisterUseCase{
    register(user: IRegisterUserDTO): any
}