import { Request, Response } from "express"
import {  SelectUserByIdCase } from "./selectUserByIdCase"

class SelectUserByIdController{
    async handle(req: Request, resp: Response){

        const {userId} = req.params

        const selectUserByIdCase = new SelectUserByIdCase()

        const userSelected = await selectUserByIdCase.execute(
            userId
        )

        return resp.json(userSelected)
    }
}

export {SelectUserByIdController}
