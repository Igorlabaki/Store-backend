import { Request, Response } from "express"
import { ListProductCase } from "./ListProductCase"

class ListProductController{
    constructor(private listProductCase: ListProductCase) {}

    async handle(req: Request, resp: Response){

        const listProduct = await this.listProductCase.execute()

        return resp.json(listProduct)
    }
}

export {ListProductController}