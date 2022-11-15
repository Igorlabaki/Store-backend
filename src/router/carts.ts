import { Router } from "express";
import { ensureAutheticate } from "../middleware/ensureAuthenticate"
import { listCartFactory } from "../useCases/Cart/listCarts/listCartFactory";
import { resetCartFactory } from "../useCases/Cart/resetCart/resetCartFactory";
import { registerCartFactory } from "../useCases/Cart/registerCart/registerCartFactory";
import { getCartByUserIdFactory } from "../useCases/Cart/getCartByUserId/getCartByUserIdFactory";
import { getCartByIdFactory } from "../useCases/Cart/getCartById/getCartByIdFactory";

const cartsRoutes = Router()

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
    cartsRoutes.delete("/resetCart/:cartId",ensureAutheticate,(request,response) => {
        return resetCartFactory().handle(request,response)
    })
//

// Get cart by Id
    cartsRoutes.get("/:cartId",ensureAutheticate,(request,response) => {
        return getCartByIdFactory().handle(request,response)
    })
//

// Get cart by userId
    cartsRoutes.get("/getCartByUserId/:userId",ensureAutheticate,(request,response) => {
        return getCartByUserIdFactory().handle(request,response)
    })
//

export {cartsRoutes}