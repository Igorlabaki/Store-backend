import { Request, Response } from "express"
import {  SelectCartByUserIdCase } from "./selectCartByIdCase"

class SelectCartByUserIdController{
    async handle(req: Request, resp: Response){

        const {userId} = req.params

        const selectCartByUserIdCase = new SelectCartByUserIdCase()
        
        const cartSelected = await selectCartByUserIdCase.execute(
            userId
        )

        return resp.json(cartSelected)
    }
}

export {SelectCartByUserIdController}