import { Request, Response } from "express"
import {   DeleteProductCartCase } from "./deleteProductCartCase"

class DeleteProductCartController{
    constructor(private deleteProductCartCase: DeleteProductCartCase){}
    async handle(req: Request, resp: Response){
        const { productId,cartId } = req.body

        const cart = await this.deleteProductCartCase.execute({
            productId,
            cartId
        })

        return resp.json(cart)
    }
}

export {DeleteProductCartController}