import { TextProofreaderDto } from "../../domain/dtos/mediacreator/text-proofreader.dto"
import { CustomError } from "../../domain/errors/custom.error"
import { Request, Response } from "express"
import { TextProofreader } from "../../domain/use-cases/mediacreator/text-proofreader.use-case"
import { UserRepository } from "../../domain/repositories/user.repository"
import { AudiogenerationDto } from "../../domain/dtos/mediacreator/audio-generation.dto"
import { AudioGeneration } from "../../domain/use-cases/mediacreator/audio-generation.use-case"
import { GetProfileDto } from "../../domain/dtos/user/get-profile.dto"
import { GetProfile } from "../../domain/use-cases/user/get-profile.dto"

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



    getProfile=(req:Request,res:Response)=>{
     
        const [error,getProfileDto]=GetProfileDto.create({ id: req.body._id })
        console.log(getProfileDto)
        if(error){
            return res.status(400).json({error})
        } 
        new GetProfile(this.userRepository)
        .execute(getProfileDto!)
        .then(data=>res.json(data))
        .catch(error=>this.handlerError(error, res))

    }
}