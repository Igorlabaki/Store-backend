import {client} from "../../../prisma/client"
import { PrismaCartRepository } from "../../../repository/PrismaCartRepository"

class SelectCartByIdCase{

    async execute(cartId: string){

        // Import repository
            const cartRepo = new PrismaCartRepository(client)
        //
        
        // Get cart by cartId
            const cart = await cartRepo.getById(cartId)

            if(!cart){
                throw new Error("Cart not found")
            }
        //

        return {cart}
    }
}

export {SelectCartByIdCase}