import { Request, Response } from "express"
import {  GetCartByUserIdCase } from "./getCartByUserIdCase"

class GetCartByUserIdController{
    constructor(private getCartByIdCase : GetCartByUserIdCase){}
    async handle(req: Request, resp: Response){
        const {userId} = req.params

        const cartSelected = await this.getCartByIdCase.execute(
            userId
        )

        return resp.json(cartSelected)
    }
}

export {GetCartByUserIdController}