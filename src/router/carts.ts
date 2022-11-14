import { Router } from "express";
import { ensureAutheticate } from "../middleware/ensureAuthenticate"
import { listCartFactory } from "../useCases/Cart/listCarts/listCartFactory";
import { registerCartFactory } from "../useCases/Cart/registerCart/registerCartFactory";
import { ResetCartController } from "../useCases/Cart/resetCart/resetCartController";
import { SelectCartByIdController } from "../useCases/Cart/selectCartById/selectCartByIdController"
import { SelectCartByUserIdController } from "../useCases/Cart/selectCartByUserId/selectCartByIdController";

const cartsRoutes = Router()

const  resetCartController           = new ResetCartController()
const  selectCartByIdController      = new SelectCartByIdController()
const  selectCartByUserIdController  = new SelectCartByUserIdController()

// List carts
    cartsRoutes.get("/listCarts",ensureAutheticate,(request,response) => {
        return listCartFactory().handle(request,response)
    })
//

// Register cart
    cartsRoutes.post("/registerCart",ensureAutheticate,(request,response) => {
        return registerCartFactory().handle(request,response)
    })
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