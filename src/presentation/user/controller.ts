import { TextProofreaderDto } from "../../domain/dtos/user/text-proofreader.dto"
import { CustomError } from "../../domain/errors/custom.error"
import { Request, Response } from "express"
import { TextProofreader } from "../../domain/use-cases/user/text-proofreader.use-case"
import { UserRepository } from "../../domain/repositories/user.repository"

export class UserController{
    constructor(
        private readonly userRepository:UserRepository
    ){}
    private handlerError =(error:unknown,res:Response)=>{
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({error:error.message})
        }
        res.status(500).json({error:'Internal Server error'})
    }

    textProofreader=(req:Request,res:Response)=>{
        const [error,textProofreaderDto]=TextProofreaderDto.create(req.body)
        if(error) {
            return res.status(400).json({error})
        }
        new TextProofreader(this.userRepository)
        .execute(textProofreaderDto!)
        .then(data=>res.json(data))
        .catch(error=>this.handlerError(error, res))
    }

    audioGeneration=(req:Request,res:Response)=>{

    }
}