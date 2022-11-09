import { User } from "@prisma/client"
import {client} from "../../../prisma/client"
import { PrismaUserRepository } from "../../../repository/PrismaUserRepository"

class SelectUserByIdCase{

    async execute(id: string){

        // Import repository
            const userRepo = new PrismaUserRepository(client)
        //

        // Validate if user exists
            const user : User = await userRepo.getById(id)

            if(!user){
                throw new Error("User not found")
            }
        //

        return {user}
    }
}

export {SelectUserByIdCase}
