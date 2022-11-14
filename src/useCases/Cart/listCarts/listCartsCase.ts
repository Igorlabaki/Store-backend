import {client} from "../../../prisma/client"
import { ICartRepository } from "../../../repository/ICartRepositories"
import { PrismaCartRepository } from "../../../repository/prisma/PrismaCartRepository"

class ListCartsCase{
    constructor(private cartRepository: ICartRepository) {}

    async execute(){
        // List users
            const carts = await this.cartRepository.list()
        //

        // No users registered
            if(carts?.length === 0){
                throw new Error("No user register yet!")
            }
        //  
        
        return carts
    }
}

export {ListCartsCase}