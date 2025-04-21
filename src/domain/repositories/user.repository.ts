import { AudiogenerationDto } from "../dtos/user/audio-generation.dto";
import { GetProfileDto } from "../dtos/user/get-profile.dto";
import { TextProofreaderDto } from "../dtos/user/text-proofreader.dto";
import { AudioEntity } from "../entities/audio.entity";
import { TextEntity } from "../entities/text.entity";
import { UserEntity } from "../entities/user.entity";

export abstract class UserRepository{
    abstract textProofreader(textProofreaderDto: TextProofreaderDto):Promise<TextEntity>
    abstract audioGeneration(audioGenerationDto:AudiogenerationDto):Promise<AudioEntity>
    abstract getProfile(getProfileDto:GetProfileDto):Promise<UserEntity>
}