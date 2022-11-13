import { User } from "@prisma/client"

export interface IUpdateRequest {
    reference : string,
    id: string 
}
export interface IRegisterUserRequest{
    username: string,
    password: string,
    email   : string
}
  
interface IUserRepository {
    list:() => Promise<User[]>
    getById:(reference: string) => Promise<User>
    delete: (reference: string) => Promise<User[] | User> 
    getByEmail:(reference: string) => Promise<User>
    register:(reference:IRegisterUserRequest) => Promise<User>
    updateEmail :(reference: IUpdateRequest) => Promise<User>
    updatePassword:(reference: IUpdateRequest) => Promise<User>
    updateUsername: (reference: IUpdateRequest) => Promise<User> 
}

export { IUserRepository };