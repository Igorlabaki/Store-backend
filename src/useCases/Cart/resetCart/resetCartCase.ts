import { ICartRegisterRequest, ICartRepository } from "../../../repository/ICartRepositories"
import { IUserRepository } from "../../../repository/IUserRepositories"
class ResetCartCase{
    constructor(private cartRepository: ICartRepository,private userRepository: IUserRepository) {}

    async execute({cartId,userId}: ICartRegisterRequest){
        // Validate if user exists
            const user = this.userRepository.getById(userId)

            if(!user){
                throw new Error("User dont exists.")
            }
        //
        
        // Validate if cart exists
            const cart = this.cartRepository.getById(cartId)

            if(!cart){
                throw new Error("Cart dont exists.")
            }
        //

        // Delete product
            await this.cartRepository.delete(cartId)
        //

        // Register a new cart
            const newCart = await this.cartRepository.register(userId)
        //

        return newCart
    }
}

export {ResetCartCase}