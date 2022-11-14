import { client } from "../prisma/client"
import dayjs from 'dayjs'
import { PrismaTokenRepository } from "../repository/prisma/PrismaTokenRepository"
import { ITokenRepository } from "../repository/ITokenRepositories"

class GenerateRefreshToken{
    constructor(private tokenRepository: ITokenRepository) {}

    async execute(userId: string){

        const userAlreadyhasRefreshToken =  await this.tokenRepository.get(userId)

        if(userAlreadyhasRefreshToken){
            await this.tokenRepository.delete(userId)
        }

        const generateRefreshToke = await this.tokenRepository.create(userId)

        return generateRefreshToke
    }
}

export {GenerateRefreshToken}