import {client} from "../../../prisma/client"
import { IUpdateProductNameRequest, PrismaProductRepository } from "../../../repository/prisma/PrismaProductRepository"

class UpdateProductNameCase{

    async execute(name: string,productId:string){

        // Import repository
          const productRepo = new PrismaProductRepository(client)
        //

        // Validate if prodcut exists
            const productDb = await productRepo.getById(productId)

            if(!productDb){
                throw new Error("Product not found")
            }
        //

        // Update product name
            const productInput: IUpdateProductNameRequest = {
                name,
                id: productId        
            }

            const product = await productRepo.updateName(productInput)
        //

        return {product}
    }
}

export {UpdateProductNameCase}