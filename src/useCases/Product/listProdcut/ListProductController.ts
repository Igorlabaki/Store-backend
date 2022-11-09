import { Request, Response } from "express"
import { ListProductCase } from "./ListProductCase"

class ListProductController{
    async handle(req: Request, resp: Response){

        const listProductCase = new ListProductCase()

        const listProduct = await listProductCase.execute()

        return resp.json(listProduct)
    }
}

export {ListProductController}