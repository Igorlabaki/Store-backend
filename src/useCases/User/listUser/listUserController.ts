import { Request, Response } from "express"
import { ListUserCase } from "./listUserCase"


class ListUserController{

    constructor(private listUserCase: ListUserCase) {}

    async handle(req: Request, resp: Response){

        const users = await this.listUserCase.execute()

        return resp.json(users)
    }
}

export {ListUserController}