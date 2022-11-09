import { Request, Response } from "express"
import { RegisterProductCase } from "./registerProductCase"

class RegisterProductController{
    async handle(req: Request, resp: Response){
        const {price ,name,image,brand,brandImage,description} = req.body

        const registerProductCase = new RegisterProductCase()

        const user = await registerProductCase.execute({
            price,
            name,
            image,
            brand,
            brandImage,
            description
        })

        return resp.json(user)
    }
}

export {RegisterProductController}