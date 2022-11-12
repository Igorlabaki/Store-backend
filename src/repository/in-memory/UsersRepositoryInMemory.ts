import { v4 as uuid } from "uuid";
import { User } from "@prisma/client";
import { IRegisterUserRequest, IUpdateEmailRequest, IUpdatePasswordRequest, IUpdateUsernameRequest, IUserRepository } from "../IUserRepositories";

class UsersRepositoryInMemory implements IUserRepository {
  private users: User[] = [];

  async register ({email,password,username}: IRegisterUserRequest): Promise<User> {
    const user: User = {
      id: uuid(),
      email: email,
      password: password,
      username: username
    }
    this.users.push(user);
    return user;
  }

  async getById( reference:string): Promise<User> {
    const user = this.users.find((user) => user.id === reference);
    return user;
  }

  async getByEmail(reference: string): Promise<User> {
    const user = this.users.find((user) => user.email === reference);
    return user;
  }

  async delete(reference: string): Promise<User[]> {
   return this.users.filter((user) => reference != user.id)
  }

  async list() : Promise<User[]>{
    return this.users
  }

  async updateEmail({email,id}: IUpdateEmailRequest):Promise<User>{
    const user = this.users.find((user) => user.id === id);
    user.email = email
    return user
 
  }

  async updateUsername({id,username}: IUpdateUsernameRequest):Promise<User>{
    const user = this.users.find((user) => user.id === id);
    user.username = username
    return user
  }

  async updatePassword({id,password}: IUpdatePasswordRequest):Promise<User>{
    const user = this.users.find((user) => user.id === id);
    user.password = password
    return user
  }
}

export { UsersRepositoryInMemory };
