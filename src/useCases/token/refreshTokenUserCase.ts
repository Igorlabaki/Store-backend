import dayjs from "dayjs"
import {client} from "../../prisma/client"
import { GenerateRefreshToken } from "../../provider/GenerateRfreshToken"
import { GenerateTokenProvider } from "../../provider/GenerateTokenProvider"
import { PrismaUserRepository } from "../../repository/prisma/PrismaUserRepository"
import { ITokenRepository, PrismaTokenRepository } from "../../repository/prisma/PrismaTokenRepository"
import { IUserRepository } from "../../repository/IUserRepositories"

class RefreshTokenUserCase{
    constructor(private userRepository: IUserRepository, private tokenRepository: ITokenRepository) {}

    async execute(refresh_token: string){ 
        // Validate if token exists
            const refreshTokenFind = await this.tokenRepository.get(refresh_token)

            if(!refreshTokenFind){
                throw new Error("Refresh token is invalid")
            }
        //

        // Validate if user exists
            const userAlreadyExists = await this.userRepository.getById(refresh_token)

            if(!userAlreadyExists){
                throw new Error("User is invalid")
            }
        //

        // Provide token to user
            const refreshTokenExpired = dayjs().isAfter(dayjs.unix(refreshTokenFind.expireIn))
            
            const generateTokenProvider = new GenerateTokenProvider()
            const token = await generateTokenProvider.execute(userAlreadyExists)
            
            if(refreshTokenExpired){

                await this.tokenRepository.delete(refreshTokenFind.id)

                const generateRefreshTokenProvider = new GenerateRefreshToken()
                const refreshToken = await generateRefreshTokenProvider.execute(refreshTokenFind.userId)

                return {token, refreshToken}
            }
        //

        return {token}
    }
}

export {RefreshTokenUserCase}