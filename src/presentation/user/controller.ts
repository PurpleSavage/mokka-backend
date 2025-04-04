import { CustomError } from "../../domain/errors/custom.error"
import { Request, Response } from "express"

export class UserController{
    constructor(

    ){}
    private handlerError =(error:unknown,res:Response)=>{
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({error:error.message})
        }
        res.status(500).json({error:'Internal Server error'})
    }
}