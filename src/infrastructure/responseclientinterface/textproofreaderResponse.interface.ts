import { ModelIa } from "../../domain/dtos/user/text-proofreader.dto";

export interface ResponseTextProofreader {
    response:string,
    model: ModelIa,
    userId:string
}
