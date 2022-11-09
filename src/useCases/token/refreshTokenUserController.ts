import { Request, Response } from "express"
import { RefreshTokenUserCase } from "./refreshTokenUserCase"

class RefreshTokenUserController{
    async handle(req: Request, resp: Response){
        const {refresh_token} = req.body

        const RefreshTokenUserUseCase = new RefreshTokenUserCase()

        const token = await RefreshTokenUserUseCase.execute(refresh_token)

        return resp.json(token)
    }
}

export {RefreshTokenUserController}