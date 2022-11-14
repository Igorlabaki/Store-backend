import jwt_decode from "jwt-decode";
import { IUserRepository } from "../../../repository/IUserRepositories";
class RecoveryUserCase{
    constructor(private userRepository: IUserRepository) {}

    async execute(token:string){
        // Decode token
            const decoded:any = jwt_decode(token);
        //

        // Get user by Id 
            const user = await this.userRepository.getById(decoded.id)

            if(!user){
                throw new Error("User not found.")
            }
        //

        return user
    }
}

export {RecoveryUserCase}