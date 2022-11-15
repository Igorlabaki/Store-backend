import { Router } from "express";
import { ensureAutheticate } from "../middleware/ensureAuthenticate"
import { listCartFactory } from "../useCases/Cart/listCarts/listCartFactory";
import { deleteProductCartFactory } from "../useCases/ProductCart/deleteProductCart/deleteProductCartFactory";
import { registerProductCartFactory } from "../useCases/ProductCart/registerProductCart/registerProductCartFactory";

const productCartsRoutes = Router()

// List carts
    productCartsRoutes.get("/listProductCarts",ensureAutheticate,(request,response) => {
        return listCartFactory().handle(request,response)
    })
//

// Register cart
    productCartsRoutes.post("/registerProductCart",ensureAutheticate,(request,response) => {
        return registerProductCartFactory().handle(request,response)
    })
//

/* // Select cart by Id
productCartsRoutes.get("/selectCartById/:cartId",ensureAutheticate,selectCartByIdController.handle)*/
//

// Remove product
    productCartsRoutes.delete("/deleteProductCart",ensureAutheticate,(request,response) => {
        return deleteProductCartFactory().handle(request,response)
    }) 
//
export {productCartsRoutes}