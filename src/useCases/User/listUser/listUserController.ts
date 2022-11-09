import { Request, Response } from "express"
import { ListUserCase } from "./listUserCase"


class ListUserController{
    async handle(req: Request, resp: Response){

        const listUserCase = new ListUserCase()

        const user = await listUserCase.execute()

        return resp.json(user)
    }
}

export {ListUserController}