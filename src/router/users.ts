import { Router } from "express"
import { ensureAutheticate } from "../middleware/ensureAuthenticate"
import { getUserByIdFactory } from "../useCases/User/getUserById/getUserByIdFactory"
import { listUserFactory } from "../useCases/User/listUser/listUserFactory"
import { UpdateUserEmailController } from "../useCases/User/updateUserEmail/updateUserEmailController"
import { UpdateUserUsernameController } from "../useCases/User/updateUserUsername/updateUsernameController"


const usersRoutes = Router()

const updateUserEmailController     = new UpdateUserEmailController()
const updateUserUsernameController  = new UpdateUserUsernameController()

// List users
    usersRoutes.get("/listUsers",ensureAutheticate,(request,response) => {
       return listUserFactory().handle(request,response)
    })
//

// Get User By Id
    usersRoutes.route('/:userId')
   .get(ensureAutheticate,(request,response) => {
       return getUserByIdFactory().handle(request,response)
    })
//

//  Update user username
    usersRoutes.route('/updateUsername/:userId')
    .put(ensureAutheticate,updateUserUsernameController.handle)
//

// Update user email
    usersRoutes.route('/updateEmail/:userId')
    .put(ensureAutheticate,updateUserEmailController.handle)
//

export {usersRoutes}