import { client } from "../prisma/client"
import dayjs from 'dayjs'
import { PrismaTokenRepository } from "../repository/PrismaTokenRepository"

class GenerateRefreshToken{

    async execute(userId: string){

        const tokenRepo = new PrismaTokenRepository(client)

        const generateRefreshToke = await tokenRepo.create(userId)

        return generateRefreshToke
    }
}

export {GenerateRefreshToken}