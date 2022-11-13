import {hash} from "bcryptjs"
import {client} from "../../../prisma/client"
import { validateInput } from "../../../util/validateInput"
import { GenerateRefreshToken } from "../../../provider/GenerateRfreshToken"
import { PrismaUserRepository } from "../../../repository/prisma/PrismaUserRepository"
import { GenerateTokenProvider } from "../../../provider/GenerateTokenProvider"
import { IRegisterUserRequest, IUserRepository } from "../../../repository/IUserRepositories"


class RegisterUserCase{
    constructor(private userRepository: IUserRepository) {}

    async execute({username,password,email}: IRegisterUserRequest){
        // Validate input
            validateInput([!!username,!!password,!!email])
        //

        // Validate if user exists
            const userAlreadyExists = await this.userRepository.getByEmail(email)

            if(userAlreadyExists){
                throw new Error("User already exists")
            }
        //

        // Register new user
            const passwordHash = await hash(password, 8)

            const userInput: IRegisterUserRequest = {
                username,
                password: passwordHash,
                email,          
            }

            const user = await this.userRepository.register(userInput)
        //

        // Povide token to user
            const generateTokenProvider = new GenerateTokenProvider()
            const token = await generateTokenProvider.execute(user)

            const generateRefreshToke =     new GenerateRefreshToken()
            const refreshToken = await generateRefreshToke.execute(user?.id)
        //

        return {token,refreshToken}
    }
}

export {RegisterUserCase}