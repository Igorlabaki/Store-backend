import { hash } from "bcryptjs"
import {client} from "../../../prisma/client"
import { IUpdatePasswordRequest } from "../../../repository/IUserRepositories"
import { PrismaUserRepository } from "../../../repository/prisma/PrismaUserRepository"


class UpdateUserPasswordCase{

    async execute(password:string,id:string){

        // Import repository
            const userRepo = new PrismaUserRepository(client)
        //

        // Validate if user exists
            const userAlreadyExists = await userRepo.getById(id)

            if(!userAlreadyExists){
                throw new Error("User not found")
            }
        //

        // Update password user
            const passwordHash = await hash(password, 8)

            const userInput: IUpdatePasswordRequest = {
                id,         
                password: passwordHash
            }

            const user = await userRepo.updatePassword(userInput)
        //

        return {user}
    }
}

export {UpdateUserPasswordCase}