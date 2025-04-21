import { ModelIa } from "../../domain/dtos/mediacreator/text-proofreader.dto";

export interface ResponseTextProofreader {
    response:string,
    model: ModelIa,
    userId:string
}
