import {client} from "../../../prisma/client"
import {hash} from "bcryptjs"
import { PrismaProductRepository } from "../../../repository/PrismaProductRepository"


class DeleteProductCase{

    async execute(id: string){

        // Import repository
            const productRepo = new PrismaProductRepository(client)
        //

        // Validate if product exists
            const productExists = await productRepo.getById(id)

            if(!productExists){
                throw new Error("Product dont exists")
            }
        //

        // Delete product
            const deletedProduct = productRepo.delete(id)
        //
        
        return deletedProduct
    }
}

export {DeleteProductCase}