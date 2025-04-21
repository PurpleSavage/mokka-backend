import { AudioEntity } from "../../domain/entities/audio.entity"

import { CustomError } from "../../domain/errors/custom.error"

export class audioMapper{
    static audioEntityFromObject (object:{[key:string]:any}){
        const {id,_id,userId, content,url,modelId} =object

        if(!_id || !id) throw CustomError.badRequest(' Missing id')
                
        
        if(!userId) throw CustomError.badRequest(' Missing reference user')
        
        if(!content) throw CustomError.badRequest(' Missing content')
                
        if(!url) throw CustomError.badRequest('Missing url')


        if(!modelId) throw CustomError.badRequest('Missing model')  
        
        return new AudioEntity(
            _id || id, 
            content,
            userId,
            url,
            modelId
        )
    }
}