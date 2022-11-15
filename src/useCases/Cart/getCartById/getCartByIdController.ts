import { Request, Response } from "express"
import {  GetCartByIdCase } from "./getCartByIdCase"

class GetCartByIdController{
    constructor(private getCartByIdCase: GetCartByIdCase){}
    async handle(req: Request, resp: Response){

        const {cartId} = req.params

        const cartSelected = await this.getCartByIdCase.execute(
            cartId
        )

        return resp.json(cartSelected)
    }
}

export {GetCartByIdController}