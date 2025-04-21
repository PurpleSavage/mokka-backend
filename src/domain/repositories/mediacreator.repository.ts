import { AudiogenerationDto } from "../dtos/mediacreator/audio-generation.dto";
import { TextProofreaderDto } from "../dtos/mediacreator/text-proofreader.dto";
import { AudioEntity } from "../entities/audio.entity";
import { TextEntity } from "../entities/text.entity";


export abstract class MediaCreatorRepository{
    abstract textProofreader(textProofreaderDto: TextProofreaderDto):Promise<TextEntity>
    abstract audioGeneration(audioGenerationDto:AudiogenerationDto):Promise<AudioEntity> 
}