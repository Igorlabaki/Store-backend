import { User } from "@prisma/client"
import { Request, Response } from "express"
import {  UpdateUserUsernameCase } from "./updateUserUsernameCase"

class UpdateUserUsernameController{
    async handle(req: Request, resp: Response){

        const {userId} = req.params

        const {username} = req.body

        const updateUserUsernameCase = new UpdateUserUsernameCase()

        const userSelected  = await updateUserUsernameCase.execute(
            username,userId
        )

        return resp.json(userSelected)
    }
}

export {UpdateUserUsernameController}