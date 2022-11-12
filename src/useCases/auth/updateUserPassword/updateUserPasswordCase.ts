import { hash } from "bcryptjs"
import {client} from "../../../prisma/client"
import { IUpdatePasswordRequest, IUserRepository } from "../../../repository/IUserRepositories"
import { PrismaUserRepository } from "../../../repository/prisma/PrismaUserRepository"


class UpdateUserPasswordCase{
    constructor(private userRepository: IUserRepository) {}

    async execute(password:string,id:string){

        // Validate inputs
          if(!password){
            throw new Error("New password is necessary.")
        }
    //

        // Validate if user exists
            const userAlreadyExists = await this.userRepository.getById(id)

            if(!userAlreadyExists){
                throw new Error("User not found.")
            }
        //

        // Update password user
            const passwordHash = await hash(password, 8)

            const userInput: IUpdatePasswordRequest = {
                id,         
                password: passwordHash
            }

            const user = await this.userRepository.updatePassword(userInput)
        //

        return {user}
    }
}

export {UpdateUserPasswordCase}