import { UserDataSource } from "../../domain/datasources/user.datasource";
import { AudiogenerationDto } from "../../domain/dtos/user/audio-generation.dto";
import { TextProofreaderDto } from "../../domain/dtos/user/text-proofreader.dto";
import { AudioEntity } from "../../domain/entities/audio.entity";
import { TextEntity } from "../../domain/entities/text.entity";
import { UserRepository } from "../../domain/repositories/user.repository";

export class UserRepositoryImpl implements UserRepository{
    constructor(
        private readonly userDataSource:UserDataSource
    ){}
    textProofreader(textProofreaderDto: TextProofreaderDto): Promise<TextEntity> {
        return this.userDataSource.textProofreader(textProofreaderDto)
    }
    audioGeneration(audioGenerationDto:AudiogenerationDto): Promise<AudioEntity> {
        return this.userDataSource.audioGeneration(audioGenerationDto)
    }
}