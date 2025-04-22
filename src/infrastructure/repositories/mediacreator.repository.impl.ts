import { MediaCreatorDatasource } from "../../domain/datasources/mediacrator.datasource";
import { GetAllAudiosDto } from "../../domain/dtos/mediacreator/all-audios.dto";
import { AudiogenerationDto } from "../../domain/dtos/mediacreator/audio-generation.dto";
import { TextProofreaderDto } from "../../domain/dtos/mediacreator/text-proofreader.dto";
import { AudioEntity } from "../../domain/entities/audio.entity";
import { TextEntity } from "../../domain/entities/text.entity";
import { MediaCreatorRepository } from "../../domain/repositories/mediacreator.repository";

export class MediaCreatorRepositoryImpl implements MediaCreatorRepository{
    constructor(
        private readonly mediacreatorDataSource:MediaCreatorDatasource
    ){}
    textProofreader(textProofreaderDto: TextProofreaderDto): Promise<TextEntity> {
        return this.mediacreatorDataSource.textProofreader(textProofreaderDto)

    }
    audioGeneration(audioGenerationDto: AudiogenerationDto): Promise<AudioEntity> {
        return this.mediacreatorDataSource.audioGeneration(audioGenerationDto)
    }
    getAllAudios(getAllAudioDto: GetAllAudiosDto): Promise<AudioEntity[]> {
        return this.mediacreatorDataSource.getAllAudios(getAllAudioDto)
    }
}