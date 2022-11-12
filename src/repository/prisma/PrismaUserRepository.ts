
import { PrismaClient, User } from "@prisma/client";
import { IRegisterUserRequest, IUpdateEmailRequest, IUpdatePasswordRequest, IUpdateUsernameRequest, IUserRepository } from "../IUserRepositories";


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

 
 async updatePassword ({id,password}: IUpdatePasswordRequest): Promise<User> {
  return await this.prisma.user.update({
   where:{
    id: id
   },
   data:{
    password: password
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

async updateEmail ({id,email}: IUpdateEmailRequest): Promise<User> {
  return await this.prisma.user.update({
   where:{
    id: id
   },
   data:{
    email: email
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

async updateUsername ({id,username}: IUpdateUsernameRequest): Promise<User> {
  return await this.prisma.user.update({
    where:{
      id: id
    },
    data:{
      username: username
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