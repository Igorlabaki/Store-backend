import { Request, Response } from "express"
import {  UpdateUserEmailCase } from "./updateUserEmailCase"

class UpdateUserEmailController{
    async handle(req: Request, resp: Response){

        const {userId} = req.params

        const {email} = req.body

        const updateUserDataCase = new UpdateUserEmailCase()

        const userSelected = await updateUserDataCase.execute(
            email,userId
        )
           
        return resp.json(userSelected)
    }
}

export {UpdateUserEmailController}