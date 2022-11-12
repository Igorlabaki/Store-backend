import {client} from "../../../prisma/client"
import { PrismaCartRepository } from "../../../repository/prisma/PrismaCartRepository"

class ListCartsCase{

    async execute(){
        
        // Import repository
            const cartRepo = new PrismaCartRepository(client)
        //

        // List users
            const listCarts = cartRepo.list()
        //
        
        return listCarts
    }
}

export {ListCartsCase}