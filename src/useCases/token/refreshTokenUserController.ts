import { Request, Response } from "express"
import { RefreshTokenUserCase } from "./refreshTokenUserCase"

class RefreshTokenUserController{
    constructor(private refreshTokenUserCase: RefreshTokenUserCase) {}

    async handle(req: Request, resp: Response){
        const {refresh_token} = req.body

        const token = await this.refreshTokenUserCase.execute(refresh_token)

        return resp.json(token)
    }
}

export {RefreshTokenUserController}