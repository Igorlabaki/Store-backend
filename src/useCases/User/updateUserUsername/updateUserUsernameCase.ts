import { User } from "@prisma/client"
import {client} from "../../../prisma/client"
import { IUpdateUsernameRequest, IUserRepository } from "../../../repository/IUserRepositories"
import { PrismaUserRepository } from "../../../repository/prisma/PrismaUserRepository"


class UpdateUserUsernameCase{

    constructor(private userRepository: IUserRepository) {}

    async execute(username: string,userId:string){
        // Validate inputs
            if(!username){
                throw new Error("Username is necessary.")
            }
        //

        // Validate if user exists
            const user : User = await this.userRepository.getById(userId)

            if(!user){
                throw new Error("User not found.")
            }
        //

        // Update user username
            const userInput: IUpdateUsernameRequest = {
                id: userId,
                username,          
            }
            
            const userUpdated : User = await this.userRepository.updateUsername(userInput)
        //

        return {userUpdated}         
    }
}

export {UpdateUserUsernameCase}