
export interface IUserRepository {
    load (email: string) : Promise<any>
}