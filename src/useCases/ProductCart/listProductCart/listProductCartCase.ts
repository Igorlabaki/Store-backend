import { IProductCartRepository } from "../../../repository/IProductCartRepositories"
class ListProductCartCase{
    constructor(private productRepository : IProductCartRepository){}
    async execute(){
        // Get user list 
            const productcarts = await this.productRepository.list()
        //

        // No productCart registered
           if(productcarts?.length === 0){
            throw new Error("No productCart register yet!")  
          }
        //  

        return productcarts
    }
}

export {ListProductCartCase}