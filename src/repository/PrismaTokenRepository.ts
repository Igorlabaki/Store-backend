import { PrismaClient, RefreshToken } from "@prisma/client";
import dayjs from "dayjs";
import { refreshToken } from "../Interfaces";

export interface ITokenRepository {
  create:(reference: string) => Promise<refreshToken>
  get:(reference: string) => Promise<refreshToken>
  delete:(reference: string) => Promise<refreshToken>
}

export class PrismaTokenRepository implements ITokenRepository {

  constructor (private readonly prisma: PrismaClient){}

  

  async create (reference: string): Promise<refreshToken> {

    const expireIn = dayjs().add(1,'day').unix()

    return await this.prisma.refreshToken.create({
      data:{
        userId: reference,
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