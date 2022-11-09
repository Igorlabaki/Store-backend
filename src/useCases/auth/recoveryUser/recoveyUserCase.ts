import {client} from "../../../prisma/client"
import jwt_decode from "jwt-decode";
import { PrismaUserRepository } from "../../../repository/PrismaUserRepository";

class RecoveyUserCase{

    async execute(token:string){
        
         // Import repository
            const userRepo = new PrismaUserRepository(client)
        //
        
        // Decode token
            const decoded:any = jwt_decode(token);
        //

        // Get user by Id 
            const user = await userRepo.getById(decoded.id)
        //
        
        return user
    }
}

export {RecoveyUserCase}