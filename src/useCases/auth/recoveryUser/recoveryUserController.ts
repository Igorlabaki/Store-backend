import { Request, Response } from "express"
import { RecoveryUserCase } from "./recoveyUserCase"
class RecoveryUserController{
    constructor(private recoveyUserCase: RecoveryUserCase) {}

    async handle(req: Request, resp: Response){
        const authHeader = req.headers.authorization

        const [,token] = authHeader.split(" ")

        const user = await this.recoveyUserCase.execute(
            token
        )

        return resp.json(user)
    }
}

export {RecoveryUserController}