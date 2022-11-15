import { Request, Response } from "express"
import { ListProductCartCase } from "./listProductCartCase"
class ListProductCartController{
    constructor(private listProductCartCase : ListProductCartCase){}
    async handle(req: Request, resp: Response){

        const user = await this.listProductCartCase.execute()

        return resp.json(user)
    }
}

export {ListProductCartController}