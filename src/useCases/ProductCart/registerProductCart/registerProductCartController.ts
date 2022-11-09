import { Request, Response } from "express"
import { RegisterProductCartCase } from "./registerProductCartCase"

class RegisterProductCartController{
    async handle(req: Request, resp: Response){

        const { productId,userId,quantity } = req.body

        const registerProductCartCase = new RegisterProductCartCase()

        const cart = await registerProductCartCase.execute({
            productId,
            userId,
            quantity
        })

        return resp.json(cart)
    }
}

export {RegisterProductCartController}