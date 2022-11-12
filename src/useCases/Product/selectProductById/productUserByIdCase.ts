import {client} from "../../../prisma/client"
import { PrismaProductRepository } from "../../../repository/prisma/PrismaProductRepository"

class SelectProductByIdCase{

    async execute(id: string){

        // Import repository
            const productRepo = new PrismaProductRepository(client)
        //

        // Get product
            const product = await productRepo.getById(id)

            if(!product){
                throw new Error("Product not found")
            }
        //

        return {product}
    }
}

export {SelectProductByIdCase}