import {compare} from "bcryptjs"
import {client} from "../../../prisma/client"
import { GenerateRefreshToken } from "../../../provider/GenerateRfreshToken"
import { PrismaUserRepository } from "../../../repository/PrismaUserRepository"
import { GenerateTokenProvider } from "../../../provider/GenerateTokenProvider"

interface IRequest{
    password:string,
    email:string
}

class AuthenticateUserCase{

    async execute({password,email}: IRequest){

       // Import repository
            const userRepo = new PrismaUserRepository(client)
        //

       // Validate if user exists
            const userAlreadyExists = await userRepo.getByEmail(email)

            if(!userAlreadyExists){
                throw new Error("User or password incorrect")
            }
        //

        // Validate if password is correct
            const passwordMatch = await compare(password, userAlreadyExists.password)

            if(!passwordMatch){
                throw new Error("User or password incorrect")
            }
        //

        // Provide token to user
            const generateTokenProvider = new GenerateTokenProvider()
            const token = await generateTokenProvider.execute(userAlreadyExists)

            const generateRefreshToke =     new GenerateRefreshToken()
            const refreshToken = await generateRefreshToke.execute(userAlreadyExists.id)
        //

        return {token,refreshToken}
    }
}

export {AuthenticateUserCase}