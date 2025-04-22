import { GetAllAudiosDto } from "../../dtos/mediacreator/all-audios.dto";
import { AudioEntity } from "../../entities/audio.entity";
import { MediaCreatorRepository } from "../../repositories/mediacreator.repository";

interface GetAudiosUseCase{
    execute(getAllAudioDto:GetAllAudiosDto):Promise<AudioEntity[]>
}

export class GetAudios implements GetAudiosUseCase{
    constructor(
        private readonly mediacreatorRepository:MediaCreatorRepository
    ){}
    async execute(getAllAudioDto: GetAllAudiosDto): Promise<AudioEntity[]> {
        const allAudios = await this.mediacreatorRepository.getAllAudios(getAllAudioDto)
        return allAudios
    }
}