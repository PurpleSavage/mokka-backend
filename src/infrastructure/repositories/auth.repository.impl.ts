
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";
import { AuthDataSource } from "../../domain/datasources/auth.datasource";
import { RegisterUserDto } from "../../domain/dtos/auth/register-user.dto";
import { UserEntity } from "../../domain/entities/user.entity";
import { AuthRepository } from "../../domain/repositories/auth.respository";
import { GetAccessTokenDto } from "../../domain/dtos/auth/get-accesToken.dto";
import { AccessTokenEntity } from "../../domain/entities/accessToken.entity";

export class AuthRepositoryImpl implements AuthRepository{
    constructor(
        private readonly authDatasource:AuthDataSource
    ){}
    register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        return this.authDatasource.register(registerUserDto)
    }
    login(loginUserDto: LoginUserDto): Promise<UserEntity> {
        return this.authDatasource.login(loginUserDto)
    }

    getAccessToken(getAccessTokenDto: GetAccessTokenDto): Promise<AccessTokenEntity> {
        return this.authDatasource.getAccessToken(getAccessTokenDto)
    }
}