import { CustomError } from "../../domain/errors/custom.error";
import { MediaCreatorRepository } from "../../domain/repositories/mediacreator.repository";
import { Request, Response } from "express"
import { AudioGeneration } from "../../domain/use-cases/mediacreator/audio-generation.use-case";
import { AudiogenerationDto } from "../../domain/dtos/mediacreator/audio-generation.dto";
import { TextProofreader } from "../../domain/use-cases/mediacreator/text-proofreader.use-case";
import { TextProofreaderDto } from "../../domain/dtos/mediacreator/text-proofreader.dto";
import { GetAllAudiosDto } from "../../domain/dtos/mediacreator/all-audios.dto";
import { GetAudios } from "../../domain/use-cases/mediacreator/get-audios.use-case";



export class MediaCreatorController{
    constructor(
        private readonly mediacreatorRepository:MediaCreatorRepository
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
            new TextProofreader(this.mediacreatorRepository)
            .execute(textProofreaderDto!)
            .then(data=>res.json(data))
            .catch(error=>this.handlerError(error, res))
        }
    
    audioGeneration=(req:Request,res:Response)=>{
        const [error,audioGenerationDto]=AudiogenerationDto.create(req.body)
        
            if(error){
                return res.status(400).json({error})
            } 
        new AudioGeneration(this.mediacreatorRepository)
        .execute(audioGenerationDto!)
        .then(data=>res.json(data))
        .catch(error=>this.handlerError(error, res))
    }
    getAduios=(req:Request,res:Response)=>{
        const [error,getAllAduiosDto]=GetAllAudiosDto.create(req.params)
        if(error){
            return res.status(400).json({error})
        }
        new GetAudios(this.mediacreatorRepository)
        .execute(getAllAduiosDto!)
        .then(data=>res.json(data))
        .catch(error=>this.handlerError(error, res))
    }
}