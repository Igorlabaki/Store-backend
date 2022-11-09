import { Request, Response } from "express"
import { SelectUserByIdCase } from "../../User/selectUserById/selectUserByIdCase"
import { RegisterCartCase } from "./registerCartCase"

class RegisterCartController{
    async handle(req: Request, resp: Response){
        const {userId, } = req.body

        const registerCartUseCase = new RegisterCartCase()

        const cart = await registerCartUseCase.execute({
            userId,
        })

        return resp.json(cart)
    }
}

export {RegisterCartController}