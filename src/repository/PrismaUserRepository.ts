
import { PrismaClient, User } from "@prisma/client";

export interface IUserRepository {
  list:() => Promise<User[]>
  register:(client:User)         => Promise<User>
  getById:(reference: string)    => Promise<User>
  getByEmail:(reference: string) => Promise<User>
}

export interface IUpdateEmailRequest {
  id    : string,
  email : string
}

export interface IUpdatePasswordRequest {
  id      : string,
  password: string
}

export interface IUpdateUsernameRequest {
  id      : string,
  username: string
}

export interface IRegisterUserRequest{
  username: string,
  password: string,
  email   : string
}

export class PrismaUserRepository implements IUserRepository {

  constructor (private readonly prisma: PrismaClient){}

  async register (reference: IRegisterUserRequest): Promise<User> {
    return await this.prisma.user.create({
      data:{
          username: reference.username,
          email: reference.email,
          password: reference.password,
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

 
 async updatePassword (reference: IUpdatePasswordRequest): Promise<User> {
  return await this.prisma.user.update({
   where:{
    id: reference.id
   },
   data:{
    password: reference.password
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

async updateEmail (reference: IUpdateEmailRequest): Promise<User> {
  return await this.prisma.user.update({
   where:{
    id: reference.id
   },
   data:{
    email: reference.email
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

async updateUsername (reference: IUpdateUsernameRequest): Promise<User> {
  return await this.prisma.user.update({
    where:{
      id: reference.id
    },
    data:{
      username: reference.username
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
    return await this.prisma.user.findMany()
  }
  
}