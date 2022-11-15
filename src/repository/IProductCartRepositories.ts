import { ProductCart } from "@prisma/client";

export interface RegisterProductCartProps{
    productId: string;
    cartId: string;
    quantity: number
}
  
export interface IsProductInCartProps{
    productId: string;
    cartId: string;
}
  
export interface UpdateQuantityProps{
    productCart: ProductCart;
    quantity: number;
}

export interface IDeleteProductCase{
    productId:string,
    cartId:string,
}
  
export interface IProductCartRepository {
    register:(reference:RegisterProductCartProps) => Promise<ProductCart>
    getById:(reference: string) => Promise<ProductCart>
    isProductInCart:(reference: IsProductInCartProps) => Promise<ProductCart>
    updateQuantity:(reference: UpdateQuantityProps) => Promise<ProductCart>
    delete:(reference: string) => Promise<void>
    list:() => Promise<ProductCart[]>
}
  