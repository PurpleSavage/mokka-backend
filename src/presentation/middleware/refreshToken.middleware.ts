import { Response,Request, NextFunction } from "express";
import { JWT } from "../../config/jwt";
import { UserModel } from "../../data/mongodb/models/user.model";

export class RefreshTokenMiddleware{
    static ValidateRefreshToke =async (req:Request,res:Response,next:NextFunction)=>{
        const refreshToken=req.cookies.refresh_token
        try {
            if(!refreshToken) return res.status(404).json({error:"not session available"})
            const payload =await JWT.validateToken<{email:string}>(refreshToken )
            if(!payload) return res.status(403).json({error:'Invalid session', redirectTo: '/auth'})
            const user = await UserModel.findOne({email:payload.email})
            if(user?.refreshToken !== refreshToken) return res.status(403).json({error:'Invalid session', redirectTo: '/auth'})
            req.body=user
            next() 
        } catch (error) {
            console.log(error)
            res.status(500).json({error:'Internal server error'})
        }
    }
}