import {client} from "../../../prisma/client"
import { PrismaUserRepository } from "../../../repository/PrismaUserRepository"


class ListUserCase{

    async execute(){

        // Import repository
            const userRepo = new PrismaUserRepository(client)
       //

        // Get user list 
            const usersList = await userRepo.list()
        //

        return usersList
    }
}

export {ListUserCase}