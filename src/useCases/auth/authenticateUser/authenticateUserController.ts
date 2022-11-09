import { Request, Response } from "express"
import { AuthenticateUserCase } from "./authenticateUserCase"

class AuthenticateUserController{
    async handle(req: Request, resp: Response){
        const {email ,password} = req.body

        const AuthenticateUserUseCase = new AuthenticateUserCase

        const token = await AuthenticateUserUseCase.execute({
            email,
            password
        })

        return resp.json(token)
    }
}

export {AuthenticateUserController}