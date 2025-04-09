import { TextProofreaderDto } from "../../dtos/user/text-proofreader.dto"
import { TextEntity } from "../../entities/text.entity"

import { UserRepository } from "../../repositories/user.repository"


interface TextProofreaderUseCase{
    execute(registerUserDto:TextProofreaderDto):Promise<TextEntity>
}


export class TextProofreader implements TextProofreaderUseCase{
    constructor(
        private readonly userRepository:UserRepository
    ){}
    async execute(textProofreaderDto: TextProofreaderDto): Promise<TextEntity> {
        const responseModel = await this.userRepository.textProofreader(textProofreaderDto)
        return {
            content:responseModel.content,
            id:responseModel.id,
            userId:responseModel.userId,
            model:responseModel.model
        }
    }
}