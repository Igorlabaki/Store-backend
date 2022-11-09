import { Request, Response } from "express"
import { UpdateUserPasswordCase } from "./updateUserPasswordCase"


class UpdateUserPasswordController{
    async handle(req: Request, resp: Response){

        const {password,id} = req.body

        const updateUserPasswordCase = new UpdateUserPasswordCase()

        const userSelected = await updateUserPasswordCase.execute(
            password,id
        )

        return resp.json(userSelected)
    }
}

export {UpdateUserPasswordController}