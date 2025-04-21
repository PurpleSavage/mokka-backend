import { AudioModel } from "../../data/mongodb/models/audio.model";
import { TextModel } from "../../data/mongodb/models/text.model";
import { MediaCreatorDatasource } from "../../domain/datasources/mediacrator.datasource";
import { AudiogenerationDto } from "../../domain/dtos/mediacreator/audio-generation.dto";
import { TextProofreaderDto } from "../../domain/dtos/mediacreator/text-proofreader.dto";
import { AudioEntity } from "../../domain/entities/audio.entity";
import { TextEntity } from "../../domain/entities/text.entity";
import { CustomError } from "../../domain/errors/custom.error";
import { MediaCreatorClient } from "../http-clients/mediacreatorClient.http-client";
import { audioMapper } from "../mappers/audio.mapper";
import { textMapper } from "../mappers/text.mapper";
export class MediaCreatorDatasourceImpl implements MediaCreatorDatasource{
    constructor(
        private readonly mediacreatorClient:MediaCreatorClient
    ){}
    async textProofreader(textProofreaderDto: TextProofreaderDto): Promise<TextEntity> {
            try {
                const responseModel = await this.mediacreatorClient.getTextProofreader(textProofreaderDto)
                const textModel = await TextModel.create(
                    {
                        content:responseModel.response,
                        userId:responseModel.userId,
                        model:responseModel.model
                    }
                )
                await textModel.save()
                return textMapper.textEntityFromObject(textModel)
                
            } catch (error) {
                if(error instanceof CustomError){
                    throw error;
                }
                throw CustomError.internalServer()
            }
        }
        
    async audioGeneration(audioGenerationDto:AudiogenerationDto): Promise<AudioEntity> {
            try {
                const responseModel = await this.mediacreatorClient.audioGeneration(audioGenerationDto)
                const audioModel = await AudioModel.create({
                    content:responseModel.content,
                    userId:responseModel.userId,
                    url:responseModel.url,
                    modelId:responseModel.modelId
                })
                await audioModel.save()
                return audioMapper.audioEntityFromObject(audioModel)
            } catch (error) {
                if(error instanceof CustomError){
                    throw error;
                }
                throw CustomError.internalServer()
            }
    }
}