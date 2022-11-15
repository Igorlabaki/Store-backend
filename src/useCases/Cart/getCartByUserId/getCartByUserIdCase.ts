import { ICartRepository } from "../../../repository/ICartRepositories"

class GetCartByUserIdCase{
    constructor(private cartRepository: ICartRepository){}

    async execute(userId: string){
        // Get cart by id
            const cart = await this.cartRepository.getByUserId(userId)

            if(!cart){
                throw new Error("Cart not found.")
            }
        //
        return {cart}
    }
}

export {GetCartByUserIdCase}