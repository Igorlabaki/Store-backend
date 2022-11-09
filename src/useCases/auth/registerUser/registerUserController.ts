import { Request, Response } from "express"
import { RegisterUserCase } from "./registerUserCase"

class RegisterUserController{
    async handle(req: Request, resp: Response){
        const {email ,username,password} = req.body

        const registerUserCase = new RegisterUserCase()

        const token = await registerUserCase.execute({
            email,
            username,
            password
        })

        return resp.json(token)
    }
}

export {RegisterUserController}