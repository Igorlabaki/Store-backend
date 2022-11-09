import { Cart, ProductCart } from "@prisma/client"
import {client} from "../../../prisma/client"
import { PrismaCartRepository } from "../../../repository/PrismaCartRepository"
import { isProductInCartProps, PrismaProductCartRepository } from "../../../repository/PrismaProductCartRepository"

interface IUserRequest{
    productId:string,
    cartId:string,
}

class DeleteProductCartCase{

    async execute({productId, cartId}: IUserRequest){

        // Importar repositorios necessarios
            const productCartRepo   = new PrismaProductCartRepository(client)
            const cartRepo          = new PrismaCartRepository(client)
        //

        // Descobrir se tem esse produto no carrinho
            const reqGetById : isProductInCartProps = {
                productId,
                cartId
            }

            const productCart : ProductCart = await productCartRepo.isProductInCart(reqGetById)

            if(!productCart){
                throw new Error("Sorry, error occour")
            }
        //

        // Encontrar o carrinho
            const cart : Cart = await cartRepo.getById(cartId)
        //

        // Delete o ProductCart
            await productCartRepo.delete(productCart.id)
        //

        return cart
    }
}

export {DeleteProductCartCase}