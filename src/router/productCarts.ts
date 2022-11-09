import { Router } from "express";
import { ensureAutheticate } from "../middleware/ensureAuthenticate"
import { ListProductCartController } from "../useCases/ProductCart/listProductCart/listProductCartController";
import { DeleteProductCartController } from "../useCases/ProductCart/deleteProductCart/deleteProductCartController";
import { RegisterProductCartController } from "../useCases/ProductCart/registerProductCart/registerProductCartController";


const productCartsRoutes = Router()

const  registerProductCartController    = new RegisterProductCartController()
const  deleteProductCartController      = new DeleteProductCartController()
const  listProductCartController        = new ListProductCartController()

//// Cart router

// List carts
    productCartsRoutes.get("/listProductCarts",ensureAutheticate,listProductCartController.handle)
//

// Register cart
    productCartsRoutes.post("/registerProductCart",ensureAutheticate,registerProductCartController.handle)
//

/* // Select cart by Id
productCartsRoutes.get("/selectCartById/:cartId",ensureAutheticate,selectCartByIdController.handle)*/
//

// Remove product
    productCartsRoutes.delete("/deleteProductCart",ensureAutheticate,deleteProductCartController.handle) 
//
export {productCartsRoutes}