import { Router } from "express"
import { ensureAutheticate } from "../middleware/ensureAuthenticate"
import { RecoveryUserController } from "../useCases/auth/recoveryUser/recoveryUserController"
import { updateUserFactory } from "../useCases/auth/updateUserPassword/updateUserPasswordFactory"
import {  AuthenticateUserController } from "../useCases/auth/authenticateUser/authenticateUserController"
import { registerUserFactory } from "../useCases/auth/registerUser/registerUserFactory"

const authRoutes = Router()

const recoveryUserController        = new RecoveryUserController()
const authenticateUserController    = new AuthenticateUserController()

// Register
    authRoutes.post("/registerUser",(request,response) => {
        return registerUserFactory().handle(request,response)
    })
//

// Sign in
    authRoutes.post("/login",authenticateUserController.handle)
//

// Recovery user data
    authRoutes.get("/recoveryUser",recoveryUserController.handle)
//

// Edit user password
    authRoutes.put("/updateUserPassword",ensureAutheticate,(request,response) => {
        return updateUserFactory().handle(request,response)
     })
//

export {authRoutes}