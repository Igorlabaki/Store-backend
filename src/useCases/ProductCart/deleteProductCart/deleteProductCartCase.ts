import { Cart, ProductCart } from "@prisma/client"
import { ICartRepository } from "../../../repository/ICartRepositories"
import { IDeleteProductCase, IProductCartRepository, IsProductInCartProps } from "../../../repository/IProductCartRepositories"
class DeleteProductCartCase{
    constructor(private cartRepository: ICartRepository, private productCartRepository: IProductCartRepository){}
    async execute({productId, cartId}: IDeleteProductCase){
        // Descobrir se tem esse produto no carrinho
            const reqGetById : IsProductInCartProps = {
                productId,
                cartId
            }

            const productCart : ProductCart = await this.productCartRepository.isProductInCart(reqGetById)

            if(!productCart){
                throw new Error("Sorry, error occour")
            }
        //

        // Encontrar o carrinho
            const cart : Cart = await this.cartRepository.getById(cartId)
        //

        // Delete o ProductCart
            await this.productCartRepository.delete(productCart.id)
        //

        return cart
    }
}

export {DeleteProductCartCase}