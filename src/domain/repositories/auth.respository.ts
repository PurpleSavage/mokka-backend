import { GetAccessTokenDto } from "../dtos/auth/get-accesToken.dto";
import { LoginUserDto } from "../dtos/auth/login-user.dto";
import { RegisterUserDto } from "../dtos/auth/register-user.dto";
import { UserEntity } from "../entities/user.entity";
import { AccessTokenEntity } from "../entities/accessToken.entity";

export abstract class AuthRepository{
    abstract register(registerUserDto:RegisterUserDto): Promise<UserEntity>
    abstract login(loginUserDto:LoginUserDto): Promise<UserEntity>
    abstract getAccessToken(getAccessTokenDto:GetAccessTokenDto):Promise<AccessTokenEntity>
}