import { Request, Response } from "express"
import {  UpdateUserEmailCase } from "./updateUserEmailCase"

class UpdateUserEmailController{
    constructor(private updateUserEmailCase: UpdateUserEmailCase) {}

    async handle(req: Request, resp: Response){

        const {userId} = req.params

        const {email} = req.body

        const userSelected = await this.updateUserEmailCase.execute(
            email,userId
        )
           
        return resp.json(userSelected)
    }
}

export {UpdateUserEmailController}