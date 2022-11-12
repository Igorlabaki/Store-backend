import { User } from "@prisma/client"
import { IUpdateEmailRequest, IUserRepository } from "../../../repository/IUserRepositories"
class UpdateUserEmailCase{
    constructor(private userRepository: IUserRepository) {}

    async execute(email: string,userId:string){
        // Validate inputs
            if(!email){
                throw new Error("Email is necessary.")
            }
        //

       // Validate if user exists
            const user : User = await this.userRepository.getById(userId)

            if(!user){
                throw new Error("User not found.")
            }
        //

        // Update user email
            const userInput: IUpdateEmailRequest = {
                id: userId,
                email,          
            }
            
            const userUpdated: User = await this.userRepository.updateEmail(userInput)
        //
        
        return {userUpdated}
    }
}

export {UpdateUserEmailCase}