import { AudiogenerationDto } from "../dtos/user/audio-generation.dto";
import { TextProofreaderDto } from "../dtos/user/text-proofreader.dto";
import { AudioEntity } from "../entities/audio.entity";
import { TextEntity } from "../entities/text.entity";

export abstract class UserRepository{
    abstract textProofreader(textProofreaderDto: TextProofreaderDto):Promise<TextEntity>
    abstract audioGeneration(audioGenerationDto:AudiogenerationDto):Promise<AudioEntity>
}