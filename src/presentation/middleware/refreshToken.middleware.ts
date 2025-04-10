import { Response,Request, NextFunction } from "express";
import { JWT } from "../../config/jwt";
import { UserModel } from "../../data/mongodb/models/user.model";

export class RefreshTokenMiddleware{
    static ValidateRefreshToke =async (req:Request,res:Response,next:NextFunction)=>{
        const refreshToken=req.cookies.refresh_token
        try {
            const payload =await JWT.validateToken<{email:string}>(refreshToken )
            if(!payload) return res.status(403).json({error:'Invalid session', redirectTo: '/auth'})
            const user = await UserModel.findOne({email:payload.email})
            if(user?.email !== payload.email) return res.status(403).json({error:'Invalid session', redirectTo: '/auth'})
            next()
        } catch (error) {
            console.log(error)
            res.status(500).json({error:'Internal server error'})
        }
    }
}