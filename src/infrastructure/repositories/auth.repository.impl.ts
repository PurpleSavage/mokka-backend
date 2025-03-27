
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";
import { AuthDataSource } from "../../domain/datasources/auth.datasource";
import { RegisterUserDto } from "../../domain/dtos/auth/register-user.dto";
import { UserEntity } from "../../domain/entities/user.entity";
import { AuthRepository } from "../../domain/repositories/auth.respository";

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

}