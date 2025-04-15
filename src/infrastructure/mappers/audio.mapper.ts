import { AudioEntity } from "../../domain/entities/audio.entity"

import { CustomError } from "../../domain/errors/custom.error"

export class audioMapper{
    static audioEntityFromObject (object:{[key:string]:any}){
        const {id,_id,userId, content,url} =object

        if(!_id || !id) throw CustomError.badRequest(' Missing id')
                
        
        if(!userId) throw CustomError.badRequest(' Missing reference user')
        
        if(!content) throw CustomError.badRequest(' Missing content')
                
        if(!url) throw CustomError.badRequest('Missing url')
        
        return new AudioEntity(
            _id || id, 
            content,
            userId,
            url
        )
    }
}