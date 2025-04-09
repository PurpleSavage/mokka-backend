import { UserDataSource } from "../../domain/datasources/user.datasource";
import { TextProofreaderDto } from "../../domain/dtos/user/text-proofreader.dto";
import { TextEntity } from "../../domain/entities/text.entity";
import { UserRepository } from "../../domain/repositories/user.repository";

export class UserRepositoryImpl implements UserRepository{
    constructor(
        private readonly userDataSource:UserDataSource
    ){}
    textProofreader(textProofreaderDto: TextProofreaderDto): Promise<TextEntity> {
        return this.userDataSource.textProofreader(textProofreaderDto)
    }
    audioGeneration(): Promise<string> {
        return this.userDataSource.audioGeneration()
    }
}