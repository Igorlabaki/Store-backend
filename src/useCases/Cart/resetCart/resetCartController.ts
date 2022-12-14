import { Request, Response } from "express"
import { ICartRegisterRequest } from "../../../repository/ICartRepositories"
import { ResetCartCase } from "./resetCartCase"
class ResetCartController{
    constructor(private resetCartCase: ResetCartCase) {}

    async handle(req: Request, resp: Response){
        const {cartId}   = req.params
        const {userId, } = req.body

        const registercartRequest : ICartRegisterRequest  = {
            cartId,
            userId
        }

        const cart = await this.resetCartCase.execute(
            registercartRequest
        )

        return resp.json(cart)
    }
}

export {ResetCartController}