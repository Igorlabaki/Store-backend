import { Router } from "express";
import { ensureAutheticate } from "../middleware/ensureAuthenticate"
import { listProductFactory } from "../useCases/Product/listProduct/listProductFactory";
import { deleteProductFactory } from "../useCases/Product/deleteProduct/deleteProductFactory";
import { getProductByIdFactory } from "../useCases/Product/getProductById/getProductByIdFactory";
import { registerProductFactory } from "../useCases/Product/registerProduct/registerProductFactory";
import { updateProductNameFactory } from "../useCases/Product/updateProductName/updateProductNameFactory";

const productsRoutes = Router()

// Register product
    productsRoutes.post("/registerProduct",ensureAutheticate,(request,response) => {
        return registerProductFactory().handle(request,response)
     })
//

// List products
    productsRoutes.get("/listProducts",ensureAutheticate,(request,response) => {
        return listProductFactory().handle(request,response)
     })
//

// Get product by Id
    productsRoutes.get("/getProductById/:productId",ensureAutheticate,(request,response) => {
        return getProductByIdFactory().handle(request,response)
    })
//

// Delete product
    productsRoutes.delete("/deleteProduct/:productId",ensureAutheticate,(request,response) => {
        return deleteProductFactory().handle(request,response)
     })
//

// Update product name
    productsRoutes.put("/updateProductName/:productId",ensureAutheticate,(request,response) => {
        return updateProductNameFactory().handle(request,response)
    })
//

export {productsRoutes}