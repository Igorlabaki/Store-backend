import {client} from "../../../prisma/client"
import { IProductRepository } from "../../../repository/IProductRepositories"
import { PrismaProductRepository } from "../../../repository/prisma/PrismaProductRepository"

class GetProductByIdCase{
    constructor(private productRepository: IProductRepository) {}
    
    async execute(id: string){
        // Get product
            const product = await this.productRepository.getById(id)

            if(!product){
                throw new Error("Product not found.")
            }
        //

        return {product}
    }
}

export {GetProductByIdCase}