import { Request, Response } from "express"
import { DeleteProductCase } from "./deleteProductCase"



class DeleteProductController{
    async handle(req: Request, resp: Response){

        const {productId} = req.params

        const deleteProductCase = new DeleteProductCase()

        const productDeleted = await deleteProductCase.execute(
            productId
        )

        return resp.json(productDeleted)
    }
}

export {DeleteProductController}