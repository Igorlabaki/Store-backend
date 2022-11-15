import { Request, Response } from "express"
import { RegisterProductCartCase } from "./registerProductCartCase"

class RegisterProductCartController{
    constructor(private registerProductCase: RegisterProductCartCase){}
    async handle(req: Request, resp: Response){
        const { productId,userId,quantity } = req.body

        const cart = await this.registerProductCase.execute({
            productId,
            userId,
            quantity
        })

        return resp.json(cart)
    }
}

export {RegisterProductCartController}