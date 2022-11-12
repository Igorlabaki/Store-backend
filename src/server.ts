import cors from "cors"
import "express-async-errors"
import swaggerDocs from './swagger.json'
import swaggerUi from 'swagger-ui-express'
import { authRoutes } from "./router/auth"
import { usersRoutes } from "./router/users"
import { tokenRoutes } from "./router/token"
import { cartsRoutes } from "./router/carts"
import { productsRoutes } from "./router/products"
import express, { NextFunction, Request, Response } from "express"
import { productCartsRoutes } from "./router/productCarts"

const app = express()

app.use(cors({
    origin: '*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}))

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.use(express.json())

app.use('/auth', authRoutes)
app.use('/users', usersRoutes)
app.use('/token', tokenRoutes)
app.use('/products',productsRoutes)
app.use('/carts', cartsRoutes)
app.use('/productCart', productCartsRoutes)

app.use(
  (error: Error, req: Request,resp:  Response, next: NextFunction) => {
  return resp.json({
      status: "Error",
      message: error.message
  })
}) 

/* app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
      if (err instanceof Error) {
        return response.status(400).json({
          message: err.message,
        });
      }
      return response.status(500).json({
        status: "error",
        message: `Internal server error - ${err}`,
      });
    }
  ) */

app.listen(3333,() => console.log("Server is running on port 3333"))