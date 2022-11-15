import {client} from "../../../prisma/client"
import { ICartRepository } from "../../../repository/ICartRepositories"
import { IUserRepository } from "../../../repository/IUserRepositories"
import { PrismaCartRepository } from "../../../repository/prisma/PrismaCartRepository"
import { PrismaUserRepository } from "../../../repository/prisma/PrismaUserRepository"
class RegisterCartCase{
    constructor(private cartRepository: ICartRepository,private userRepository: IUserRepository) {}

    async execute(userId: string){
        // Validate if user exitis
            const userAlreadyExists = await this.userRepository.getById(userId)

            if(!userAlreadyExists){
                throw new Error("User not found.")
            }
        //

        // Validate if cart exitis
            const cartAlreadyExists = await this.cartRepository.getByUserId(userId)

            if(cartAlreadyExists){
                return cartAlreadyExists
            }
        //
        
        // Register new cart
            const newCart = await this.cartRepository.register(userId)
        //

        return newCart
    }
}

export {RegisterCartCase}