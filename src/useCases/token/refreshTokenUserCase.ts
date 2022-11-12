import dayjs from "dayjs"
import {client} from "../../prisma/client"
import { GenerateRefreshToken } from "../../provider/GenerateRfreshToken"
import { GenerateTokenProvider } from "../../provider/GenerateTokenProvider"
import { PrismaUserRepository } from "../../repository/prisma/PrismaUserRepository"
import { PrismaTokenRepository } from "../../repository/prisma/PrismaTokenRepository"

class RefreshTokenUserCase{

    async execute(refresh_token: string){

        // Import repository
            const tokenRepo = new PrismaTokenRepository(client)
            const userRepo  = new PrismaUserRepository(client)
        //
        
        // Validate if token exists
            const refreshTokenFind = await tokenRepo.get(refresh_token)

            if(!refreshTokenFind){
                throw new Error("Refresh token is invalid")
            }
        //

        // Validate if user exists
            const userAlreadyExists = await userRepo.getById(refresh_token)

            if(!userAlreadyExists){
                throw new Error("User is invalid")
            }
        //

        // Provide token to user
            const refreshTokenExpired = dayjs().isAfter(dayjs.unix(refreshTokenFind.expireIn))
            
            const generateTokenProvider = new GenerateTokenProvider()
            const token = await generateTokenProvider.execute(userAlreadyExists)
            
            if(refreshTokenExpired){

                await tokenRepo.delete(refreshTokenFind.id)

                const generateRefreshTokenProvider = new GenerateRefreshToken()
                const refreshToken = await generateRefreshTokenProvider.execute(refreshTokenFind.userId)

                return {token, refreshToken}
            }
        //

        return {token}
    }
}

export {RefreshTokenUserCase}