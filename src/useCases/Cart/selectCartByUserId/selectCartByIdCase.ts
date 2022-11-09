import {client} from "../../../prisma/client"
import { PrismaCartRepository } from "../../../repository/PrismaCartRepository"
import { SelectUserByIdCase } from "../../User/selectUserById/selectUserByIdCase"

class SelectCartByUserIdCase{

    async execute(userId: string){

        // Import repository
            const cartRepo = new PrismaCartRepository(client)
        //

        // Get cart by id
            const cart = await cartRepo.getByUserId(userId)

            if(!cart){
                throw new Error("Cart not found")
            }
        //

        return {cart}
    }
}

export {SelectCartByUserIdCase}