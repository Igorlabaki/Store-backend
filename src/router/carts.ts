import { Router } from "express";
import { ensureAutheticate } from "../middleware/ensureAuthenticate"
import { ListCartsController } from "../useCases/Cart/listCarts/listCartsController";
import { RegisterCartController } from "../useCases/Cart/registerCart/registerCartController"
import { ResetCartController } from "../useCases/Cart/resetCart/resetCartController";
import { SelectCartByIdController } from "../useCases/Cart/selectCartById/selectCartByIdController"
import { SelectCartByUserIdController } from "../useCases/Cart/selectCartByUserId/selectCartByIdController";

const cartsRoutes = Router()

const  listCartsController           = new ListCartsController()  
const  resetCartController           = new ResetCartController()
const  registerCartController        = new RegisterCartController()
const  selectCartByIdController      = new SelectCartByIdController()
const  selectCartByUserIdController  = new SelectCartByUserIdController()

// List carts
    cartsRoutes.get("/listCarts",ensureAutheticate,listCartsController.handle)
//

// Register cart
    cartsRoutes.post("/registerCart",ensureAutheticate,registerCartController.handle)
//

// Reset cart
    cartsRoutes.delete("/resetCart/:cartId",ensureAutheticate,resetCartController.handle)
//

// Get cart by Id
    cartsRoutes.get("/selectCartById/:cartId",ensureAutheticate,selectCartByIdController.handle)
//

// Get cart by userId
    cartsRoutes.get("/selectCartByUserId/:userId",ensureAutheticate,selectCartByUserIdController.handle)
//

export {cartsRoutes}