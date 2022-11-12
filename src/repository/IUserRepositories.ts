import { User } from "@prisma/client"

export interface IUpdateEmailRequest {
    id    : string,
    email : string
}
  
export interface IUpdatePasswordRequest {
    id      : string,
    password: string
}
  
export interface IUpdateUsernameRequest {
    id      : string,
    username: string
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
    updateEmail :(reference: IUpdateEmailRequest) => Promise<User>
    updatePassword:(reference: IUpdatePasswordRequest) => Promise<User>
    updateUsername: (reference: IUpdateUsernameRequest) => Promise<User> 
}

export { IUserRepository };