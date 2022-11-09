import {client} from "../../../prisma/client"
import { PrismaProductRepository } from "../../../repository/PrismaProductRepository"

class ListProductCase{

    async execute(){
        
        // Import repository
            const productRepo = new PrismaProductRepository(client)
        //
        
        // Get product list
            const listProduct = await productRepo.list()
        //

        return listProduct
    }
}

export {ListProductCase}