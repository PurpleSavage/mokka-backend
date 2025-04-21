import { UserDataSource } from "../../domain/datasources/user.datasource";
import { GetProfileDto } from "../../domain/dtos/user/get-profile.dto";
import { UserEntity } from "../../domain/entities/user.entity";
import { UserRepository } from "../../domain/repositories/user.repository";

export class UserRepositoryImpl implements UserRepository{
    constructor(
        private readonly userDataSource:UserDataSource
    ){}
    
    getProfile(getProfileDto: GetProfileDto): Promise<UserEntity> {
        return this.userDataSource.getProfile(getProfileDto)
    }
}