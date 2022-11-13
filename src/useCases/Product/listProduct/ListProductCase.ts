import { IProductRepository } from "../../../repository/IProductRepositories"

class ListProductCase{
    constructor(private productRepository: IProductRepository) {}
    
    async execute(){
        // Get product list
            const listProduct = await this.productRepository.list()
        //

        // No users registered
         if(listProduct?.length === 0){
            throw new Error("No product register yet!")  
          }
        //  

        return listProduct
    }
}

export {ListProductCase}