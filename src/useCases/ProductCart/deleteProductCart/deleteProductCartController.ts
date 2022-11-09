import { Request, Response } from "express"
import {   DeleteProductCartCase } from "./deleteProductCartCase"

class DeleteProductCartController{
    async handle(req: Request, resp: Response){

        const { productId,cartId } = req.body

        const deleteProductCart = new DeleteProductCartCase()

        const cart = await deleteProductCart.execute({
            productId,
            cartId
        })

        return resp.json(cart)
    }
}

export {DeleteProductCartController}