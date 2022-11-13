
import { PrismaClient, User } from "@prisma/client";
import { IRegisterUserRequest,IUpdateRequest, IUserRepository } from "../IUserRepositories";


export class PrismaUserRepository implements IUserRepository {

  constructor (private readonly prisma: PrismaClient){}

  async register ({email,password,username}: IRegisterUserRequest): Promise<User> {

    return await this.prisma.user.create({
      data:{
          username: username,
          email   : email,
          password: password,
      }
  })
  }

  async getById (reference: string): Promise<User> {
     return await this.prisma.user.findUnique({
      where:{
        id: reference
      },
      include:{
        Cart: {
            include:{
                ProductCart:{
                    include:{
                        product: true
                    }
                }
            }
        }
      }
    })
  }

  async delete(reference: string): Promise<User> {
    return await this.prisma.user.delete({
      where:{
        id: reference
      }
    })
  }

  async getByEmail (reference: string): Promise<User> {
    return await this.prisma.user.findUnique({
     where:{
       email: reference
     },
     include:{
       Cart: {
           include:{
               ProductCart:{
                   include:{
                       product: true
                   }
               }
           }
       }
     }
   })
 }

 
 async updatePassword ({id,reference}: IUpdateRequest): Promise<User> {
  return await this.prisma.user.update({
   where:{
     id
   },
   data:{
    password: reference
   },
   include:{
     Cart: {
         include:{
             ProductCart:{
                 include:{
                     product: true
                 }
             }
         }
     }
   }
 })
}

async updateEmail ({id,reference}: IUpdateRequest): Promise<User> {
  return await this.prisma.user.update({
   where:{
    id
   },
   data:{
    email: reference
   },
   include:{
     Cart: {
         include:{
             ProductCart:{
                 include:{
                     product: true
                 }
             }
         }
     }
   }
 })
}

async updateUsername ({id,reference}: IUpdateRequest): Promise<User> {
  return await this.prisma.user.update({
    where:{
      id
    },
    data:{
      username: reference
    },
    include:{
      Cart: {
          include:{
              ProductCart:{
                  include:{
                      product: true
                  }
              }
          }
      }
    }
  })
}


  async list (): Promise<User[]> {
    return await this.prisma.user.findMany({
      include:{
        Cart: {
            include:{
                ProductCart:{
                    include:{
                        product: true
                    }
                }
            }
        }
      }
    })
  }
  
}