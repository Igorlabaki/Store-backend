import { v4 as uuid } from "uuid";
import { ProductCart } from "@prisma/client";
import { IProductCartRepository, IsProductInCartProps, RegisterProductCartProps, UpdateQuantityProps } from "../IProductCartRepositories";

class ProductCartRepositoryInMemory implements IProductCartRepository {
  private productCarts: ProductCart[] = [];

  async register (reference:RegisterProductCartProps): Promise<ProductCart> {
    const product: ProductCart = {
      id: uuid(),
      fk_id_cart: reference.cartId,
      fk_id_product: reference.productId,
      quantity: reference.quantity,
      created_at: new Date(),
      updatedAt:  new Date()
    }

    this.productCarts.push(product);
    return product;
  }

  async getById(reference:string): Promise<ProductCart> {
    const productCart = this.productCarts.find((productCart) => productCart.id === reference);
    return productCart;
  }

  async isProductInCart(reference: IsProductInCartProps) {
    const productCart = this.productCarts.find((productCart) => {
      productCart.fk_id_cart === reference.cartId && productCart.fk_id_product === reference.productId
    });
    return productCart;
  }

  async updateQuantity (reference: UpdateQuantityProps): Promise<ProductCart> {
    const productCart = this.productCarts.find((productCart) => productCart.id === reference.productCart.id);
    const updatedProductCart : ProductCart = {
      id: uuid(),
      created_at: productCart.created_at,
      fk_id_cart: productCart.fk_id_cart,
      fk_id_product: productCart.fk_id_product,
      quantity: reference.quantity,
      updatedAt: productCart.updatedAt
    }
    this.productCarts.push(updatedProductCart)
    return updatedProductCart
  }

  async delete(reference: string): Promise<void> {
    this.productCarts.filter((productCart) => productCart.id != reference)
  }

  async list() : Promise<ProductCart[]>{
    return this.productCarts
  }
}

export { ProductCartRepositoryInMemory };
