

import { UserDataSource } from "../../domain/datasources/user.datasource";

import { UserEntity } from "../../domain/entities/user.entity";
import { CustomError } from "../../domain/errors/custom.error";



import { GetProfileDto } from "../../domain/dtos/user/get-profile.dto";
import { UserModel } from "../../data/mongodb/models/user.model";
import { UserMapper } from "../mappers/user.mapper";

export class UserDatasourceImpl implements UserDataSource{
   
    
    async getProfile(getProfileDto: GetProfileDto): Promise<UserEntity> {
        const {id}=getProfileDto
        try {
            const user = await UserModel.findById(id)

            if (!user) {
                throw CustomError.notFound('User not found');
            }
            return UserMapper.userEntityFromObject(user);
        } catch (error) {
            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer()
        }
    }
}