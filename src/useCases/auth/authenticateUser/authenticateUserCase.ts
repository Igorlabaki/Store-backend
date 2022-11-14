import {compare} from "bcryptjs"
import { IUserRepository } from "../../../repository/IUserRepositories"
import { ITokenRepository } from "../../../repository/ITokenRepositories"
import { GenerateRefreshToken } from "../../../provider/GenerateRefreshToken"
import { GenerateTokenProvider } from "../../../provider/GenerateTokenProvider"
interface IAuthenticateRequest{
    password:string,
    email:string
}
class AuthenticateUserCase{
    constructor(private userRepository: IUserRepository, private tokenRepository: ITokenRepository) {}

    async execute({password,email}: IAuthenticateRequest){
       // Validate if user exists
            const userAlreadyExists = await this.userRepository.getByEmail(email)

            if(!userAlreadyExists){
                throw new Error("User or password incorrect.")
            }
        //

        // Validate if password is correct
            const passwordMatch = await compare(password, userAlreadyExists.password)

            if(!passwordMatch){
                throw new Error("User or password incorrect.")
            }
        //

        // Provide token to user
            const generateTokenProvider = new GenerateTokenProvider()
            const token = await generateTokenProvider.execute(userAlreadyExists)

            const generateRefreshToke =     new GenerateRefreshToken(this.tokenRepository)
            const refreshToken = await generateRefreshToke.execute(userAlreadyExists.id)
        //

        return {token,refreshToken}
    }
}

export {AuthenticateUserCase}