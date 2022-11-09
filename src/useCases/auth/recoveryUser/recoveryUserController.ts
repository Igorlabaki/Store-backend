import { Request, Response } from "express"
import { RecoveyUserCase } from "./recoveyUserCase"

class RecoveryUserController{
    async handle(req: Request, resp: Response){

        const authHeader = req.headers.authorization

        const recoveyUserCase = new RecoveyUserCase()

        const [,token] = authHeader.split(" ")

        const user = await recoveyUserCase.execute(
            token
        )

        return resp.json(user)
    }
}

export {RecoveryUserController}