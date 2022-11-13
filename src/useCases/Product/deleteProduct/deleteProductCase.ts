import { IProductRepository } from "../../../repository/IProductRepositories"
class DeleteProductCase{
    constructor(private productRepository: IProductRepository) {}
    
    async execute(id: string){
        // Validate if product exists
            const productExists = await this.productRepository.getById(id)

            if(!productExists){
                throw new Error("Product do not exists.")
            }
        //

        // Delete product
            const deletedProduct = this.productRepository.delete(id)
        //
        
        return deletedProduct
    }
}

export {DeleteProductCase}