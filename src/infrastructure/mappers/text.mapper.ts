import { TextEntity } from "../../domain/entities/text.entity"
import { CustomError } from "../../domain/errors/custom.error"

export class textMapper{
    static textEntityFromObject (object:{[key:string]:any}){
        const {id,_id,userId, content,model} =object

        if(!_id || !id) throw CustomError.badRequest(' Missing id')
                
        
        if(!userId) throw CustomError.badRequest(' Missing reference user')
        
        if(!content) throw CustomError.badRequest(' Missing content')
                
        if(!model) throw CustomError.badRequest('Missing model')
        
        return new TextEntity(
            _id || id, 
            content,
            userId,
            model
        )
    }
}