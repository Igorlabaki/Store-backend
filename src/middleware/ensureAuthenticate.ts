import { NextFunction, Request, Response } from "express";
import {verify} from "jsonwebtoken"

export function ensureAutheticate(req: Request,resp: Response,next: NextFunction){
    const authToken = req.headers.authorization

    if(!authToken){
        return resp.status(401).json({
            message: "Token is missing"
        })
    }

    const [, token]  = authToken.split(' ')

    
    try {
        verify(token, 'b3aa4f1a-d1fe-427e-9daf-fcce5167b27e')
        return next();
    } catch (error) {
        return resp.status(401).json({
            message: "Token invalid"
        })
    }

}