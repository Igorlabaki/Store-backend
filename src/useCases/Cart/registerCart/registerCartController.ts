import { Request, Response } from "express"
import { RegisterCartCase } from "./registerCartCase"

class RegisterCartController{
    constructor(private registerCartCase: RegisterCartCase) {}

    async handle(req: Request, resp: Response){
        const {userId, } = req.body

        const cart = await this.registerCartCase.execute(
            userId,
        )

        return resp.json(cart)
    }
}

export {RegisterCartController}