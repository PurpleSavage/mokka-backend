import { Response,Request, NextFunction } from "express";
import { JWT } from "../../config/jwt";

export class RefreshTokenMiddleware{
    static ValidateRefreshToke =async (req:Request,res:Response,next:NextFunction)=>{
        const refreshToken=req.cookies.refreshToken
        try {
            const payload =await JWT.validateToken<{id:string}>(refreshToken )
            if(!payload) return res.status(403).json({error:'Invalid session', redirectTo: '/auth',refresh:true})
            console.log(payload.id)
            next()
        } catch (error) {
            console.log(error)
            res.status(500).json({error:'Internal server error'})
        }
    }
}