
import { TextProofreaderDto } from "../dtos/user/text-proofreader.dto";
import { TextEntity } from "../entities/text.entity";



export abstract class UserDataSource{
    abstract textProofreader(textProofreaderDto: TextProofreaderDto):Promise<TextEntity>
    abstract audioGeneration():Promise<string>  
}