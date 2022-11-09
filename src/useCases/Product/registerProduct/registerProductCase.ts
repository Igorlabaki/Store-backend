import {client} from "../../../prisma/client"
import { validateInput } from "../../../util/validateInput"
import { IProductRequest, PrismaProductRepository } from "../../../repository/PrismaProductRepository"

interface IUserRequest{
    name:string,
    price:string,
    image:string
    brand: string
    brandImage: string
    description:string
}

class RegisterProductCase{

    async execute({name,price,image,brand,brandImage,description}: IUserRequest){

        // Import repository
            const productRepo = new PrismaProductRepository(client)
        //

        // Validate inputs
            validateInput([!!name, !!price, !!image, !!brand, !!brandImage, !!description])
        //

        // Validate if user exists
            const productAlreadyExists = await productRepo.getByName(name)
        
            if(productAlreadyExists){
                throw new Error("Product already exists")
            }
        //
       
        // Register user
            const prodcutInput: IProductRequest = {
                brand,
                brandImage,
                description,
                image,
                name,
                price        
            }

            const product = await productRepo.register(prodcutInput)
        //

        return product
    }
}

export {RegisterProductCase}