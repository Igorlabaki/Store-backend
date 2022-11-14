import { Cart, PrismaClient} from "@prisma/client";
import { ICartRepository } from "../ICartRepositories";
export class PrismaCartRepository implements ICartRepository {

    constructor (private readonly prisma: PrismaClient){}

    async register (reference: string): Promise<Cart> {
        return await this.prisma.cart.create({
           data:{
                user:{
                    connect:{
                    id: reference
                }
            }
          },
            include:{
            ProductCart:{
                include:{
                    product:true,
                }
           }
          }
      })
    }

    async getById (reference: string): Promise<Cart> {
        return await this.prisma.cart.findFirst({
           where:{
             id: reference
           },
           include:{
           ProductCart:{
             include:{
               product:true,
             }
           }
         }
       })
     }

    async getByUserId (reference: string): Promise<Cart> {
        return await this.prisma.cart.findFirst({
           where:{
             userId: reference
           },
           include:{
           ProductCart:{
             include:{
               product:true,
             }
           }
         }
       })
     }

    async delete (reference: string): Promise<void> {
         await this.prisma.cart.delete({
           where:{
             id: reference
           },
         }
       )
     }


    async list (): Promise<Cart[]> {
      return await this.prisma.cart.findMany({
        include:{
          ProductCart:{
            include:{
              product: true
            }
          },
          user: true
        }
      })
     }
  
}