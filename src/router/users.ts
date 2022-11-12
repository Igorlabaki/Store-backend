import { Router } from "express"
import { ensureAutheticate } from "../middleware/ensureAuthenticate"
import { listUserFactory } from "../useCases/User/listUser/listUserFactory"
import { getUserByIdFactory } from "../useCases/User/getUserById/getUserByIdFactory"
import { updateUserEmail } from "../useCases/User/updateUserEmail/updateUserEmailFactory"
import { updateUserUsername } from "../useCases/User/updateUserUsername/updateUserUsernameFactory"


const usersRoutes = Router()

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
    .put(ensureAutheticate,(request,response) => {
        return updateUserUsername().handle(request,response)
    })
//

// Update user email
    usersRoutes.route('/updateUserEmail/:userId')
    .put(ensureAutheticate,(request,response) => {
        return updateUserEmail().handle(request,response)
     })
//

export {usersRoutes}