import { User } from "@prisma/client"
import { Request, Response } from "express"
import {  UpdateUserUsernameCase } from "./updateUserUsernameCase"

class UpdateUserUsernameController{
    constructor(private updateUserUsernameCase: UpdateUserUsernameCase) {}
    
    async handle(req: Request, resp: Response){
        const {userId} = req.params

        const {username} = req.body

        const userSelected  = await this.updateUserUsernameCase.execute(
            username,userId
        )

        return resp.json(userSelected)
    }
}

export {UpdateUserUsernameController}