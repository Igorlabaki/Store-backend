import { User } from "@prisma/client"
import { IUserRepository } from "../../../repository/IUserRepositories"

class GetUserByIdCase{

    constructor(private usersRepository: IUserRepository) {}

    async execute(id: string){

        // Get User By Id
            const user  = await  this.usersRepository.getById(id)
        //

        if(!user){
            throw  new Error("User not found")
        }

        return {user}
    }
}

export {GetUserByIdCase}
