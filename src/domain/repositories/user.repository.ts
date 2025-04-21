import { GetProfileDto } from "../dtos/user/get-profile.dto";
import { UserEntity } from "../entities/user.entity";

export abstract class UserRepository{
    abstract getProfile(getProfileDto:GetProfileDto):Promise<UserEntity>
}