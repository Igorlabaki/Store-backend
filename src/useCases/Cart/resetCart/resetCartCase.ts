import {client} from "../../../prisma/client"
import { PrismaCartRepository } from "../../../repository/prisma/PrismaCartRepository"

class ResetCartCase{

    async execute(cartId:string,userId:string){

        // Import repository
            const cartRepo = new PrismaCartRepository(client)
        //

        // Validate if cart exists
            const cart = cartRepo.getById(cartId)

            if(!cart){
                throw new Error("Cart dont exists")
            }
        //

        // Delete product
            await cartRepo.delete(cartId)
        //

        // Register a new cart
            const newCart = await cartRepo.register(userId)
        //
        
        return newCart
    }
}

export {ResetCartCase}