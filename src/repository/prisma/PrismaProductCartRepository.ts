import { PrismaClient, ProductCart } from "@prisma/client";
import { IProductCartRepository, IsProductInCartProps, RegisterProductCartProps, UpdateQuantityProps } from "../IProductCartRepositories";
export class PrismaProductCartRepository implements IProductCartRepository {
  constructor (private readonly prisma: PrismaClient){}

  async register (reference: RegisterProductCartProps): Promise<ProductCart> {
    return await this.prisma.productCart.create({
      data:{
        fk_id_cart: reference.cartId,
        fk_id_product: reference.productId,
        quantity: reference.quantity
      }
    })
  }

  async isProductInCart (reference: IsProductInCartProps): Promise<ProductCart> {
    return await this.prisma.productCart.findFirst({
      where: {
        fk_id_cart: reference.cartId,
        fk_id_product: reference.productId,
      },
    });
  }

  async getById(reference: string):Promise<ProductCart>{
    return await this.prisma.productCart.findFirst({
      where: {
        id: reference
      },
    });
  }

  async updateQuantity (reference: UpdateQuantityProps): Promise<ProductCart> {
    return await this.prisma.productCart.update({
      where:{
        id: reference.productCart.id
      },
      data:{
        quantity: reference.quantity + reference.productCart.quantity
      }
    })
  }

  async delete (reference: string): Promise<void> {
    await this.prisma.productCart.delete({
      where:{
        id: reference
      },
    })
  }

  async list (): Promise<ProductCart[]> {
    return await this.prisma.productCart.findMany({
      include:{
        cart: true,
        product:true
      },
    })
  }
}


/*        // Importar repositorios necessarios
       const cartRepo          = new PrismaCartRepository(client)
       const productCartRepo   = new PrismaProductCartRepository(client)

       // Procura carrinho
           const cartAlreadyExists = await cartRepo.getByUserId(userId)
       //

       // Valida se o produto ja nao esta no carrinho
           const inputGetById : GetByIdProductCartProps = {
               productId,
               cartId: cartAlreadyExists.id
           }
           const productAlreadyInCart = productCartRepo.getById(inputGetById)
       //

       // Se ja existir esse produto no carrinho adiciona mais unidades
           if (productAlreadyInCart) {
               const updateProductCart = await productCartRepo.updateQuantity(productAlreadyInCart,quantity)
               return updateProductCart;
           }
       //

       // Se ja houver um carrinho registra o produto
           if(cartAlreadyExists){
               const inputProductCart : RegisterProductCartProps = {
                   productId,
                   quantity,
                   cartId: cartAlreadyExists.id
               }
               const productCart = await productCartRepo.register(inputProductCart)
               return cartAlreadyExists 
           }
       //

       // Cria novo carrinho
           const newCart = await cartRepo.register(userId)
       //

       // Registra productCart no novo carrinho 
           const inputProductCart : RegisterProductCartProps = {
               productId,
               quantity,
               cartId: newCart.id
           }
           const cartUpdated = await productCartRepo.register(inputProductCart)
       //
       
       return cartUpdated */