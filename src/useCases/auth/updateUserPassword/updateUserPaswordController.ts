import { Request, Response } from "express"
import { UpdateUserPasswordCase } from "./updateUserPasswordCase"


class UpdateUserPasswordController{
    constructor(private updateUserUsernameCase: UpdateUserPasswordCase) {}

    async handle(req: Request, resp: Response){

        const {password,id} = req.body

        const userSelected = await this.updateUserUsernameCase.execute(
            password,id
        )

        return resp.json(userSelected)
    }
}

export {UpdateUserPasswordController}