import { Request, Response } from "express"
import { DeleteProductCase } from "./deleteProductCase"



class DeleteProductController{
    constructor(private deleteProductCase: DeleteProductCase) {}
    
    async handle(req: Request, resp: Response){
        const {productId} = req.params

        const productDeleted = await this.deleteProductCase.execute(
            productId
        )

        return resp.json(productDeleted)
    }
}

export {DeleteProductController}