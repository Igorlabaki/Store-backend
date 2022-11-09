import {Router} from "express"
import { RefreshTokenUserController } from "../useCases/token/refreshTokenUserController"

const tokenRoutes = Router()

// Provide token
    const refreshTokenUserController    = new RefreshTokenUserController()
//

// Provide refreshToken
    tokenRoutes.post("/refresh-token",refreshTokenUserController.handle)
//

export {tokenRoutes}