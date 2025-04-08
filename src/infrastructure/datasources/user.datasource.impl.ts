
import { TextModel } from "../../data/mongodb/models/text.model";
import { UserDataSource } from "../../domain/datasources/user.datasource";
import { TextProofreaderDto } from "../../domain/dtos/user/text-proofreader.dto";
import { TextEntity } from "../../domain/entities/text.entity";
import { CustomError } from "../../domain/errors/custom.error";
import { TextProofreaderClient } from "../http-clients/TextProofreaderClient.http-client";
import { textMapper } from "../mappers/text.mapper";

export class UserDatasourceImpl implements UserDataSource{
    constructor(
        private readonly textProofreaderClient:TextProofreaderClient
    ){}
    async textProofreader(textProofreaderDto: TextProofreaderDto): Promise<TextEntity> {
        try {
            const responseModel = await this.textProofreaderClient.getTextProofreader(textProofreaderDto)
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
    async audioGeneration(): Promise<string> {
        return ""
    }
}