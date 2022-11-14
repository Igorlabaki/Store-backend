import { v4 as uuid } from "uuid";
import { Cart } from "@prisma/client";
import { ICartRepository } from "../ICartRepositories";

class CartRepositoryInMemory implements ICartRepository {
  private carts: Cart[] = [];

  async register (reference:string): Promise<Cart> {
    const product: Cart = {
      id: uuid(),
      userId: reference
    }

    this.carts.push(product);
    return product;
  }

  async getById( reference:string): Promise<Cart> {
    const cart = this.carts.find((cart) => cart.id === reference);
    return cart;
  }

  async getByUserId( reference:string): Promise<Cart> {
    const cart = this.carts.find((cart) => cart.userId === reference);
    return cart;
  }

  async delete(reference: string): Promise<void> {
    this.carts.filter((cart) => reference != cart.id)
  }

  async list() : Promise<Cart[]>{
    return this.carts
  }
}

export { CartRepositoryInMemory };
