import {client} from "../../../prisma/client"
import { PrismaProductCartRepository } from "../../../repository/prisma/PrismaProductCartRepository"

class ListProductCartCase{

    async execute(){

        // Import repository
            const productCartRepo = new PrismaProductCartRepository(client)
        //

        // Get user list 
            const usersList = await productCartRepo.list()
        //

        return usersList
    }
}

export {ListProductCartCase}