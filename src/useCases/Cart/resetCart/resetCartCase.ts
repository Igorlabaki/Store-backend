import { ICartRegisterRequest, ICartRepository } from "../../../repository/ICartRepositories"
import { IUserRepository } from "../../../repository/IUserRepositories"
class ResetCartCase{
    constructor(private cartRepository: ICartRepository,private userRepository: IUserRepository) {}

    async execute({cartId,userId}: ICartRegisterRequest){
        // Validate if user exitis
            const userAlreadyExists = await this.userRepository.getById(userId)

            if(!userAlreadyExists){
                throw new Error("User not found.")
            }
        //

        // Validate if cart exitis
            const cartAlreadyExists = await this.cartRepository.getByUserId(userId)

            if(cartAlreadyExists){
                await this.cartRepository.delete(cartId)
            }
        //
     
        // Register new cart
            const newCart = await this.cartRepository.register(userId)
        //

        return newCart
    }
}

export {ResetCartCase}