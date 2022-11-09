import { User } from "@prisma/client"
import {client} from "../../../prisma/client"
import { IUpdateUsernameRequest, PrismaUserRepository } from "../../../repository/PrismaUserRepository"

class UpdateUserUsernameCase{

    async execute(username: string,userId:string){

        // Import repository
            const userRepo = new PrismaUserRepository(client)
        //

        // Validate if user exists
            const user : User = await userRepo.getById(userId)

            if(!user){
                throw new Error("User not found")
            }
        //

        // Update user username
            const userInput: IUpdateUsernameRequest = {
                id: userId,
                username,          
            }
            
            const userUpdated : User = await userRepo.updateUsername(userInput)
        //

        return {userUpdated}         
    }
}

export {UpdateUserUsernameCase}