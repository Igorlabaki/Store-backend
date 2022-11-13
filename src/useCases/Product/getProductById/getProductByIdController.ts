import { Request, Response } from "express"
import { GetProductByIdCase } from "./getProductByIdCase"

class GetProductByIdController{
    constructor(private getProductByIdCase: GetProductByIdCase) {}
    
    async handle(req: Request, resp: Response){

        const {productId} = req.params

        const productSelected = await this.getProductByIdCase.execute(
            productId
        )

        return resp.json(productSelected)
    }
}

export {GetProductByIdController}