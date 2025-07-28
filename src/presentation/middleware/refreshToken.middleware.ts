import { Response,Request, NextFunction } from "express";
import { JWT } from "../../config/jwt";
import { UserModel } from "../../data/mongodb/models/user.model";

export class RefreshTokenMiddleware{
    static ValidateRefreshToke =async (req:Request,res:Response,next:NextFunction)=>{
        const refreshToken=req.cookies.refreshToken
       
        try {
            if(!refreshToken) return res.status(401).json({error:"not session available",renovate:false})
            const payload =await JWT.validateToken<{id:string}>(refreshToken )
            if(!payload) return res.status(403).json({error:'Invalid session',renovate:false})
            const user = await UserModel.findById(payload.id)
            if(user?.refreshToken !== refreshToken) return res.status(403).json({error:'Invalid session', renovate:false})

            req.body=user
            next() 
        } catch (error) {
            console.log(error)
            res.status(500).json({error:'Internal server error'})
        }
    }
}