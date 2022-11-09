import { Request, Response } from "express"
import { UpdateProductNameCase } from "./updateProductNameCase"


class UpdateProductNameDataController{
    async handle(req: Request, resp: Response){
        const {productId} = req.params
        const {name} = req.body

        const updateProductNameCase = new UpdateProductNameCase()

        const userSelected = await updateProductNameCase.execute(
            name,productId
        )

        return resp.json(userSelected)
    }
}

export {UpdateProductNameDataController}