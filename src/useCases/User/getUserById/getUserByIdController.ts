import { Request, Response } from "express"
import {  GetUserByIdCase } from "./getUserByIdCase"

class GetUserByIdController{
    constructor(private getUserByIdCase: GetUserByIdCase) {}

    async handle(req: Request, resp: Response){
        const {userId} = req.params

        const userSelected = await this.getUserByIdCase.execute(
            userId
        )

        return resp.json(userSelected)
    }
}

export {GetUserByIdController}
