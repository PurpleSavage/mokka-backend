import { TextProofreaderDto } from "../../domain/dtos/user/text-proofreader.dto"
import { clientOpenIA,clientAnthropicIa,clientGoogleIa } from "../../config/clientia";
import { ModelIa } from "../../domain/dtos/user/text-proofreader.dto";


export interface ResponseTextProofreader {
    response:string,
    model: ModelIa,
    userId:string
}

export class TextProofreaderClient{

    async getTextProofreader(textProofreaderDto: TextProofreaderDto):Promise<ResponseTextProofreader>{
        const {model,prompt,userId} = textProofreaderDto
        let response=""

        if(model==="GPT"){

            const completionsGPT = await clientOpenIA.responses.create({
                model: "gpt-4o",
                input: prompt
            });
            response = completionsGPT.output_text

        } else if(model === "GEMINI"){
            const completionsGoogle = await clientGoogleIa.models.generateContent({
                model: "gemini-2.0-flash",
                contents: prompt
            });
            response = completionsGoogle.text || ""

        }else{
            const msg = await clientAnthropicIa.messages.create({
                model: "claude-3-7-sonnet-20250219",
                max_tokens: 1024,
                messages: [{ role: "user", content: "Hello, Claude" }],
            });

            response = msg.content.map(block =>
                typeof block === "object" && "text" in block ? block.text : ""
            ).join(" ");
        }
        return {
            response,
            model,
            userId
        }
    }
}