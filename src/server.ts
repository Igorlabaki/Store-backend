import cors from "cors"
import "express-async-errors"
import { usersRoutes } from "./router/users"
import { tokenRoutes } from "./router/token"
import { productsRoutes } from "./router/products"
import { cartsRoutes } from "./router/carts"
import { authRoutes } from "./router/auth"
/* import {saweggerJsDoc} from "swagger-jsdoc"
const swaggerUI = require("swagger-ui-express") */
import express, { NextFunction, Request, Response } from "express"
import { productCartsRoutes } from "./router/productCarts"

const app = express()

app.use(cors({
    origin: '*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}))

/* const options = {
    definition:{
        openapi: "3.0.0",
        info:{
            title: "Library",
            version: "1.0.0",
            description: "Store api"
        },
        server:[
            {
                url: "http://localhost:3333"
            }
        ],
    },
    apis: ["./routes/*.ts"]
}


const specs = saweggerJsDoc(options) */

app.use(express.json())


/* app.use('/api-docs', swaggerUI.server) */

app.use('/auth', authRoutes)
app.use('/users', usersRoutes)
app.use('/token', tokenRoutes)
app.use('/products',productsRoutes)
app.use('/carts', cartsRoutes)
app.use('/productCart', productCartsRoutes)

app.use(
    (error: Error, req: Request,resp:  Response, next: NextFunction) => {
    return resp.json({
        status: 'Error',
        message: error.message
    })
})


app.listen(3333,() => console.log("Server is running on port 3333"))