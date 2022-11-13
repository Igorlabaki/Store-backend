import { Request, Response } from "express"
import { RegisterUserCase } from "./registerUserCase"

class RegisterUserController{
    constructor(private registerUserCase: RegisterUserCase) {}

    async handle(req: Request, resp: Response){
        const {email ,username,password} = req.body

        const token = await this.registerUserCase.execute({
            email,
            username,
            password
        })

        return resp.json(token)
    }
}

export {RegisterUserController}