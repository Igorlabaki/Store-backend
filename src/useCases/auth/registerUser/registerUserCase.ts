import {hash} from "bcryptjs"
import {client} from "../../../prisma/client"
import { validateInput } from "../../../util/validateInput"
import { GenerateRefreshToken } from "../../../provider/GenerateRfreshToken"
import { PrismaUserRepository } from "../../../repository/prisma/PrismaUserRepository"
import { GenerateTokenProvider } from "../../../provider/GenerateTokenProvider"
import { IRegisterUserRequest, IUserRepository } from "../../../repository/IUserRepositories"
import { ITokenRepository } from "../../../repository/ITokenRepositories"


class RegisterUserCase{
    constructor(private userRepository: IUserRepository, private tokenRepository: ITokenRepository) {}

    async execute({username,password,email}: IRegisterUserRequest){
        // Validate input
            validateInput([!!username,!!password,!!email])
        //

        // Validate if user exists
            const userAlreadyExists = await this.userRepository.getByEmail(email)

            if(userAlreadyExists){
                throw new Error("User already exists.")
            }
        //

        // criptografar teh password
            const passwordHash = await hash(password, 8)
        //

        // Register new user
            const userInput: IRegisterUserRequest = {
                username,
                password: passwordHash,
                email,          
            }

            const user = await this.userRepository.register(userInput)
        //

        // Provide token to user
            const generateTokenProvider = new GenerateTokenProvider()
            const token = await generateTokenProvider.execute(user)

            const generateRefreshToke = new GenerateRefreshToken(this.tokenRepository)
            const refreshToken = await generateRefreshToke.execute(user?.id)
        //

        return {token,refreshToken}
    }
}

export {RegisterUserCase}