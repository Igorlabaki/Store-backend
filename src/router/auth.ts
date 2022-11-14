import { Router } from "express"
import { ensureAutheticate } from "../middleware/ensureAuthenticate"
import { registerUserFactory } from "../useCases/auth/registerUser/registerUserFactory"
import { recoveryUserFactory } from "../useCases/auth/recoveryUser/recoveryUserFactory"
import { updateUserFactory } from "../useCases/auth/updateUserPassword/updateUserPasswordFactory"
import { authenticateUserFactory } from "../useCases/auth/authenticateUser/authenticateUserFactory"

const authRoutes = Router()
// Register
    authRoutes.post("/registerUser",(request,response) => {
        return registerUserFactory().handle(request,response)
    })
//

// Sign in
    authRoutes.post("/authenticateUser",(request,response) => {
        return authenticateUserFactory().handle(request,response)
    })
//

// Recovery user data
    authRoutes.get("/recoveryUser",(request,response) => {
        return recoveryUserFactory().handle(request,response)
    })
//

// Edit user password
    authRoutes.put("/updateUserPassword",ensureAutheticate,(request,response) => {
        return updateUserFactory().handle(request,response)
     })
//

export {authRoutes}