import { Request, Response } from "express"
import {  SelectCartByIdCase } from "./selectCartByIdCase"

class SelectCartByIdController{
    async handle(req: Request, resp: Response){

        const {cartId} = req.params

        const selectCartByIdCase = new SelectCartByIdCase()
        const cartSelected = await selectCartByIdCase.execute(
            cartId
        )

        return resp.json(cartSelected)
    }
}

export {SelectCartByIdController}