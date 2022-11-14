import { Request, Response } from "express"
import { AuthenticateUserCase } from "./authenticateUserCase"

class AuthenticateUserController{
    constructor(private authenticateUserCase: AuthenticateUserCase) {}

    async handle(req: Request, resp: Response){
        const {email ,password} = req.body

        const token = await this.authenticateUserCase.execute({
            email,
            password
        })

        return resp.json(token)
    }
}

export {AuthenticateUserController}