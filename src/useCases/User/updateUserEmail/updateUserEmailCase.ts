import { User } from "@prisma/client"
import {client} from "../../../prisma/client"
import { IUpdateEmailRequest, PrismaUserRepository } from "../../../repository/PrismaUserRepository"

class UpdateUserEmailCase{

    async execute(email: string,userId:string){

        // Import repository
            const userRepo = new PrismaUserRepository(client)
        //

       // Validate if user exists
            const user : User = await userRepo.getById(userId)

            if(!user){
                throw new Error("User not found")
            }
        //

        // Update user email
            const userInput: IUpdateEmailRequest = {
                id: userId,
                email,          
            }
            
            const userUpdated = await userRepo.updateEmail(userInput)
        //
        
        return {userUpdated}
    }
}

export {UpdateUserEmailCase}