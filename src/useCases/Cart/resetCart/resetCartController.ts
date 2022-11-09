import { Request, Response } from "express"
import { ResetCartCase } from "./resetCartCase"



class ResetCartController{
    async handle(req: Request, resp: Response){

        const {cartId}   = req.params
        const {userId, } = req.body

        const resetCartCase = new ResetCartCase()

        const cart = await resetCartCase.execute(
            cartId,
            userId
        )

        return resp.json(cart)
    }
}

export {ResetCartController}