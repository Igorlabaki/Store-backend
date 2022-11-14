import { Request, Response } from "express"
import { ListCartsCase } from "./listCartsCase"

class ListCartsController{
    constructor(private listCartCase: ListCartsCase) {}

    async handle(req: Request, resp: Response){
        const listCart = await this.listCartCase.execute()

        return resp.json(listCart)
    }
}

export {ListCartsController}