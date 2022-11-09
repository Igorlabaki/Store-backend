import {Router} from "express"
import { ensureAutheticate } from "../middleware/ensureAuthenticate"
import { ListUserController } from "../useCases/User/listUser/listUserController"
import { UpdateUserEmailController } from "../useCases/User/updateUserEmail/updateUserEmailController"
import { SelectUserByIdController } from "../useCases/User/selectUserById/selectUserByIdController"
import { UpdateUserUsernameController } from "../useCases/User/updateUserUsername/updateUsernameController"

const usersRoutes = Router()

const listUserController            = new ListUserController()
const selectUserByIdController      = new SelectUserByIdController()
const updateUserEmailController     = new UpdateUserEmailController()
const updateUserUsernameController  = new UpdateUserUsernameController()


// List users
    usersRoutes.get("/userList",ensureAutheticate,listUserController.handle)
//

// Find User By Id
    usersRoutes.route('/:userId')
    .get(ensureAutheticate,selectUserByIdController.handle)
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