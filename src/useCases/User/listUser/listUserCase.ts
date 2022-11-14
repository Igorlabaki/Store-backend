import { IUserRepository } from "../../../repository/IUserRepositories"
class ListUserCase{
    constructor(private usersRepository: IUserRepository) {}

    async execute(){
        // Get user list 
            const users = await this.usersRepository.list()
        //

        // No users registered
            if(users?.length === 0){
              throw new Error("No user register yet!")
            }
        //  

        return users
    }
}

export {ListUserCase}