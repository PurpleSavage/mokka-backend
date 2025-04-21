
import { response } from "express";
import { AudioModel } from "../../data/mongodb/models/audio.model";
import { TextModel } from "../../data/mongodb/models/text.model";
import { UserDataSource } from "../../domain/datasources/user.datasource";
import { AudiogenerationDto } from "../../domain/dtos/user/audio-generation.dto";
import { TextProofreaderDto } from "../../domain/dtos/user/text-proofreader.dto";
import { TextEntity } from "../../domain/entities/text.entity";
import { UserEntity } from "../../domain/entities/user.entity";
import { CustomError } from "../../domain/errors/custom.error";
import { UserClient } from "../http-clients/userClient.http-client";

import { textMapper } from "../mappers/text.mapper";
import { audioMapper } from "../mappers/audio.mapper";
import { AudioEntity } from "../../domain/entities/audio.entity";
import { GetProfileDto } from "../../domain/dtos/user/get-profile.dto";
import { UserModel } from "../../data/mongodb/models/user.model";
import { UserMapper } from "../mappers/user.mapper";

export class UserDatasourceImpl implements UserDataSource{
    constructor(
        private readonly userClient:UserClient
    ){}
    async textProofreader(textProofreaderDto: TextProofreaderDto): Promise<TextEntity> {
        try {
            const responseModel = await this.userClient.getTextProofreader(textProofreaderDto)
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
            const responseModel = await this.userClient.audioGeneration(audioGenerationDto)
            const audioModel = await AudioModel.create({
                content:responseModel.content,
                userId:responseModel.userId,
                url:responseModel.url
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
    async getProfile(getProfileDto: GetProfileDto): Promise<UserEntity> {
        const {id}=getProfileDto
        try {
            const user = await UserModel.findById(id)

            if (!user) {
                throw CustomError.notFound('User not found');
            }
            return UserMapper.userEntityFromObject(user);
        } catch (error) {
            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer()
        }
    }
}