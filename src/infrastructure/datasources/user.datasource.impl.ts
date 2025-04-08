import { UserDataSource } from "../../domain/datasources/user.datasource";
import { TextProofreaderDto } from "../../domain/dtos/user/text-proofreader.dto";
import { TextEntity } from "../../domain/entities/text.entity";
import { TextProofreaderClient } from "../http-clients/TextProofreaderClient.http-client";

export class UserDatasourceImpl implements UserDataSource{
    constructor(
        private readonly textProofreaderClient:TextProofreaderClient
    ){}
    async textProofreader(textProofreaderDto: TextProofreaderDto): Promise<TextEntity> {
        const responseModel = await this.textProofreaderClient.getTextProofreader(textProofreaderDto)
        return {
            id:"",
            content:responseModel,
            userId:"",
            modelName:"GPT"
        }
    }
    async audioGeneration(): Promise<string> {
        return ""
    }
}