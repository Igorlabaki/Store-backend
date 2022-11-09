import { Request, Response } from "express"
import { ListCartsCase } from "./listCartsCase"

class ListCartsController{
    async handle(req: Request, resp: Response){

        const listCartsUseCase = new ListCartsCase()

        const listCart = await listCartsUseCase.execute()

        return resp.json(listCart)
    }
}

export {ListCartsController}