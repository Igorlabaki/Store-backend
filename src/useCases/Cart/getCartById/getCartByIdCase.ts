import { ICartRepository } from "../../../repository/ICartRepositories"
class GetCartByIdCase{
    constructor(private cartRepository: ICartRepository){}
    async execute(cartId: string){     
        // Get cart by cartId
            const cart = await this.cartRepository.getById(cartId)

            if(!cart){
                throw new Error("Cart not found.")
            }
        //

        return {cart}
    }
}

export {GetCartByIdCase}