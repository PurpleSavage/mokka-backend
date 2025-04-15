import { AudiogenerationDto } from "../../dtos/user/audio-generation.dto";
import { AudioEntity } from "../../entities/audio.entity";
import { UserRepository } from "../../repositories/user.repository";

interface AudioGenerationUseCase{
    execute(audiogenerationDto:AudiogenerationDto):Promise<AudioEntity>
}

export class AudioGeneration implements AudioGenerationUseCase{
    constructor(
        private readonly userRepository:UserRepository
    ){}
    async execute(audiogenerationDto: AudiogenerationDto): Promise<AudioEntity> {
        const responseModel = await this.userRepository.audioGeneration(audiogenerationDto)
        return {
            content:responseModel.content,
            id:responseModel.id,
            userId:responseModel.userId,
            url:responseModel.url
        }
    }
}