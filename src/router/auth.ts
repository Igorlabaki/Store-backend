import { Router } from "express"
import { ensureAutheticate } from "../middleware/ensureAuthenticate"
import { RecoveryUserController } from "../useCases/auth/recoveryUser/recoveryUserController"
import { RegisterUserController } from "../useCases/auth/registerUser/registerUserController"
import {  AuthenticateUserController } from "../useCases/auth/authenticateUser/authenticateUserController"
import { UpdateUserPasswordController } from "../useCases/auth/updateUserPassword/updateUserPaswordController"

const authRoutes = Router()

const recoveryUserController        = new RecoveryUserController()

const registerUserController        = new RegisterUserController()
const authenticateUserController    = new AuthenticateUserController()
const updateUserPassword            = new UpdateUserPasswordController()

// Register
    authRoutes.post("/registerUser",registerUserController.handle)
//

// Sign in
    authRoutes.post("/login",authenticateUserController.handle)
//

// Recovery user data
    authRoutes.get("/recoveryUser",recoveryUserController.handle)
//

// Edit user password
    authRoutes.put("/updateUserPassword",ensureAutheticate,updateUserPassword.handle)
//

export {authRoutes}