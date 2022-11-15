import { Cart } from "@prisma/client"

export interface ICartRegisterRequest{
  cartId : string,
  userId : string
}

export interface ICartRepository {
    register:(reference:string) => Promise<Cart>
    getById:(reference: string) => Promise<Cart>
    getByUserId:(reference: string) => Promise<Cart>
    delete:(reference: string) => Promise<void>
    list:() => Promise<Cart[]>
  }