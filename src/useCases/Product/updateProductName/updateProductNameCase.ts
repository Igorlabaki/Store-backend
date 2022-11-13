import { IUpdateRequest } from "../../../repository/IUserRepositories"
import { IProductRepository } from "../../../repository/IProductRepositories"
class UpdateProductNameCase{
    constructor(private productRepository: IProductRepository) {}
    
    async execute(name: string,productId:string){
        // Validate inputs
          if(!name){
            throw new Error("Name is necessary.")
            }
        //

        // Validate if prodcut exists
            const productDb = await this.productRepository.getById(productId)

            if(!productDb){
                throw new Error("Product not found.")
            }
        //

        // Update product name
            const productInput: IUpdateRequest = {
                reference: name,
                id: productId        
            }

            const product = await this.productRepository.updateName(productInput)
        //

        return {product}
    }
}

export {UpdateProductNameCase}