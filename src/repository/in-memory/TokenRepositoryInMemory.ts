import dayjs from "dayjs";
import { v4 as uuid } from "uuid";
import { refreshToken } from "../../Interfaces";
import { updateFunctionDeclaration } from "typescript";
import { ITokenRepository } from "../ITokenRepositories";

export class TokenRepositoryInMemory implements ITokenRepository {
  private refreshTokens: refreshToken[] = [];

  async create (reference: string): Promise<refreshToken> {
    const expireIn = dayjs().add(1,'day').unix()

    const token : refreshToken= {
        id: uuid(),
        userId: reference,
        expireIn: expireIn
    }

    this.refreshTokens.push(token)

    const newUser = this.refreshTokens.find((refreshToken) => refreshToken.userId = reference)

    return newUser
  }

  async get (reference: string): Promise<refreshToken> {
    const user = this.refreshTokens.find((refreshToken) => refreshToken.userId = reference)
    return user
  }

  async delete (reference: string): Promise<refreshToken> {
    const userfind = this.refreshTokens.find((refreshToken) => refreshToken.userId = reference)
    this.refreshTokens.filter((refreshToken) => refreshToken.userId != reference)
    return userfind
  }
}