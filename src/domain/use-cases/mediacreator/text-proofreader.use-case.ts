import { TextProofreaderDto } from "../../dtos/mediacreator/text-proofreader.dto"
import { TextEntity } from "../../entities/text.entity"
import { MediaCreatorRepository } from "../../repositories/mediacreator.repository"



interface TextProofreaderUseCase{
    execute(registerUserDto:TextProofreaderDto):Promise<TextEntity>
}


export class TextProofreader implements TextProofreaderUseCase{
    constructor(
        private readonly mediacreatorRepository:MediaCreatorRepository
    ){}
    async execute(textProofreaderDto: TextProofreaderDto): Promise<TextEntity> {
        const responseModel = await this.mediacreatorRepository.textProofreader(textProofreaderDto)
        return {
            content:responseModel.content,
            id:responseModel.id,
            userId:responseModel.userId,
            model:responseModel.model
        }
    }
}