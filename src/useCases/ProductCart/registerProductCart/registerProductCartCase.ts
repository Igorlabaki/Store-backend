import { Cart, ProductCart } from "@prisma/client"
import { ICartRepository } from "../../../repository/ICartRepositories"
import { IProductCartRepository, IsProductInCartProps, RegisterProductCartProps, UpdateQuantityProps } from "../../../repository/IProductCartRepositories"
interface iProductCartRequest{
    productId:string,
    userId:string,
    quantity: number
}
class RegisterProductCartCase{
    constructor(private cartRepository:ICartRepository,private productCartRepository: IProductCartRepository){}
    
    async execute({productId, userId,quantity}: iProductCartRequest){
        // Procura carrinho
            const cartAlreadyExists : Cart = await this.cartRepository.getByUserId(userId)
        //
 
        // Valida se o produto ja nao esta no carrinho
            const reqGetById : IsProductInCartProps = {
                productId,
                cartId: cartAlreadyExists.id
            }
            const productAlreadyInCart : ProductCart = await this.productCartRepository.isProductInCart(reqGetById)
        //
 
        // Se ja existir esse produto no carrinho adiciona mais unidades
            if (productAlreadyInCart) {
                const reqRegisterProduct : UpdateQuantityProps = {
                    productCart: productAlreadyInCart,
                    quantity
                }
                await this.productCartRepository.updateQuantity(reqRegisterProduct)
                return cartAlreadyExists;
            }
        //
 
        // Se ja houver um carrinho registra o produto
            if(cartAlreadyExists){
                const inputProductCart : RegisterProductCartProps = {
                    productId,
                    quantity,
                    cartId: cartAlreadyExists.id
                }
                await this.productCartRepository.register(inputProductCart)
                return cartAlreadyExists 
            }
        //
 
        // Cria novo carrinho
            const newCart : Cart = await this.cartRepository.register(userId)
        //

        // Registra productCart no novo carrinho 
            const inputProductCart : RegisterProductCartProps = {
                productId,
                quantity,
                cartId: newCart.id
            }
            await this.productCartRepository.register(inputProductCart)
        //

        /* const newCartUpdated : Cart = await cartRepo.getByUserId(userId) */
        return newCart 
    }
}

export {RegisterProductCartCase}