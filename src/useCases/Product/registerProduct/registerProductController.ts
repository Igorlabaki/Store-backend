import { Request, Response } from "express"
import { RegisterProductCase } from "./registerProductCase"

class RegisterProductController{
    constructor(private registerProductCase: RegisterProductCase) {}

    async handle(req: Request, resp: Response){
        const {price ,name,productImage,brand,brandImage,description} = req.body

        const product = await this.registerProductCase.execute({
            price,
            name,
            productImage,
            brand,
            brandImage,
            description
        })

        return resp.json(product)
    }
}

export {RegisterProductController}