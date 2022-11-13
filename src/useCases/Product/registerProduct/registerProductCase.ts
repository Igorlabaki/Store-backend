import { validateInput } from "../../../util/validateInput"
import { IProductRepository } from "../../../repository/IProductRepositories"
import { IProductRequest } from "../../../repository/prisma/PrismaProductRepository"
class RegisterProductCase{
    constructor(private productRepository: IProductRepository) {}
    
    async execute({name,price,productImage,brand,brandImage,description}: IProductRequest){
        // Validate inputs
            validateInput([!!name, !!price, !!productImage, !!brand, !!brandImage, !!description])
        //

        // Validate price as a number
            if(typeof(price) === 'string'){
                throw new Error("Price must be a number.")
            }
        //

        // Validate if user existis
            const productAlreadyExists = await this.productRepository.getByName(name)
        
            if(productAlreadyExists){
                throw new Error("Product already exists.")
            }
        //
       
        // Register user
            const prodcutInput: IProductRequest = {
                brand,
                brandImage,
                description,
                productImage,
                name,
                price        
            }

            const product = await this.productRepository.register(prodcutInput)
        //

        return product
    }
}

export {RegisterProductCase}