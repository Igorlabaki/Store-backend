import { Request, Response } from "express"
import {  SelectProductByIdCase } from "./productUserByIdCase"

class SelectProductByIdController{
    async handle(req: Request, resp: Response){

        const {productId} = req.params

        const selectProductByIdCase = new SelectProductByIdCase()
        const productSelected = await selectProductByIdCase.execute(
            productId
        )

        return resp.json(productSelected)
    }
}

export {SelectProductByIdController}