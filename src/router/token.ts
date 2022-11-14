import {Router} from "express"
import { refreshTokenFactory } from "../useCases/token/refreshTokenFactory"

const tokenRoutes = Router()

// Provide refreshToken
    tokenRoutes.post("/refresh-token",(request,response) => {
        return refreshTokenFactory().handle(request,response)
     })
//

export {tokenRoutes}