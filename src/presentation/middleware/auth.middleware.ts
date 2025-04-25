import { Response,Request, NextFunction } from "express";
import { JWT } from "../../config/jwt";
import { UserModel } from "../../data/mongodb/models/user.model";

export class AuthMiddleware{
    static  validateJWT=async(req:Request,res:Response,next:NextFunction)=>{
        const authrization = req.header('Authorization')
        if(!authrization) return res.status(401).json({error:'No token provider'})
        if(!authrization.startsWith('Bearer')) return res.status(401).json({error:'Invalid bearer token'})
        const token = authrization.split(' ').at(1) || ''
        try {
            const payload =await JWT.validateToken<{id:string}>(token )
            if(!payload) return res.status(403).json({error:'Invalid token',renovate:true})
 
            const user =UserModel.findById(payload.id)
            if(!user) return res.status(400).json({error:'Invalid session '})
            req.body.user= user
            next()
        } catch (error) {
            console.log(error)
            res.status(500).json({error:'Internal server error'})
        }
    }
}