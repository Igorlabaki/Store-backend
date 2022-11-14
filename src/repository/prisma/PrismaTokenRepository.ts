import dayjs from "dayjs";
import { PrismaClient } from "@prisma/client";
import { refreshToken } from "../../Interfaces";
import { ITokenRepository } from "../ITokenRepositories";
export class PrismaTokenRepository implements ITokenRepository {
  constructor (private readonly prisma: PrismaClient){}

  async create (reference: string): Promise<refreshToken> {

    const expireIn = dayjs().add(1,'day').unix()

    return await this.prisma.refreshToken.create({
      data:{
        user:{
          connect:{
            id: reference
          }
        },
        expireIn: expireIn
      }
    })

  }

  async get (reference: string): Promise<refreshToken> {
    return await this.prisma.refreshToken.findFirst({
      where:{
        userId: reference
      }
    })
  }

  async delete (reference: string): Promise<refreshToken> {
    return await this.prisma.refreshToken.delete({
      where:{
          userId: reference
      }
    })
  }
}