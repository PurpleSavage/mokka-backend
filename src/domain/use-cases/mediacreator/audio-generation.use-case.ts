import { AudiogenerationDto } from "../../dtos/mediacreator/audio-generation.dto";
import { AudioEntity } from "../../entities/audio.entity";
import { MediaCreatorRepository } from "../../repositories/mediacreator.repository";


interface AudioGenerationUseCase{
    execute(audiogenerationDto:AudiogenerationDto):Promise<AudioEntity>
}

export class AudioGeneration implements AudioGenerationUseCase{
    constructor(
        private readonly mediacreatorRepository:MediaCreatorRepository
    ){}
    async execute(audiogenerationDto: AudiogenerationDto): Promise<AudioEntity> {
        const responseModel = await this.mediacreatorRepository.audioGeneration(audiogenerationDto)
        return {
            content:responseModel.content,
            id:responseModel.id,
            userId:responseModel.userId,
            url:responseModel.url
        }
    }
}