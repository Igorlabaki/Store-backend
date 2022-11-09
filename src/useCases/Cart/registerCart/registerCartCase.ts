import {client} from "../../../prisma/client"
import { PrismaCartRepository } from "../../../repository/PrismaCartRepository"
import { PrismaUserRepository } from "../../../repository/PrismaUserRepository"

interface ICartRequest{
    userId:string,
}

class RegisterCartCase{

    async execute({userId}: ICartRequest){

        // Import repository
            const userRepo = new PrismaUserRepository(client)
            const cartRepo = new PrismaCartRepository(client)
        //

        // Validate if user exitis
            const userAlreadyExists = await userRepo.getById(userId)

            if(!userAlreadyExists){
                throw new Error("User not founded")
            }
        //

        // Validate if cart exitis
            const cartAlreadyExists = await cartRepo.getByUserId(userId)

            if(cartAlreadyExists){
                return cartAlreadyExists
            }
        //
        
        // Register new cart
            const newCart = await cartRepo.register(userId)
        //

        return newCart
    }
}

export {RegisterCartCase}