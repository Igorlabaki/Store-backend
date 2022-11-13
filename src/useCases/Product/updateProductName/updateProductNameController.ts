import { Request, Response } from "express"
import { UpdateProductNameCase } from "./updateProductNameCase"
class UpdateProductNameController{
    constructor(private updateProductNameCase: UpdateProductNameCase) {}

    async handle(req: Request, resp: Response){
        const {productId} = req.params

        const {name} = req.body

        const userSelected = await this.updateProductNameCase.execute(
            name,productId
        )

        return resp.json(userSelected)
    }
}

export {UpdateProductNameController}