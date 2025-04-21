import { CustomError } from "../../domain/errors/custom.error"
import { UserEntity } from "../../domain/entities/user.entity"

export class UserMapper {
    static userEntityFromObject (object:{[key:string]:any}){
        const {id,_id,email,password,credits,typePlan,subscriptionExpiresAt, refreshToken} =object
        if(!_id || !id) throw CustomError.badRequest(' Missing id')
        

        if(!email) throw CustomError.badRequest(' Missing email')

        if(!password) throw CustomError.badRequest(' Missing password')
        
        if(!typePlan) throw CustomError.badRequest('Missing typePlan')

        if(typePlan !== "PRO" && typePlan!== "FREE") throw CustomError.badRequest('unrecognized plan type')

        return new UserEntity(
            _id || id, 
            email,
            password,
            credits,
            typePlan,
            subscriptionExpiresAt,
            refreshToken
        )    
    }
}