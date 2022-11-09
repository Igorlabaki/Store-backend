import { Request, Response } from "express"
import { ListProductCartCase } from "./listProductCartCase"


class ListProductCartController{

    async handle(req: Request, resp: Response){

        const listProductCartCase = new ListProductCartCase()

        const user = await listProductCartCase.execute()

        return resp.json(user)
    }
}

export {ListProductCartController}