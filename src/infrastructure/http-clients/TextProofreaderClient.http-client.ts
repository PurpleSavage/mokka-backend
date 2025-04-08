import { TextProofreaderDto } from "../../domain/dtos/user/text-proofreader.dto"
import OpenAI from "openai";
import { envs } from "../../config/envs";
import { GoogleGenAI } from "@google/genai";





export class TextProofreaderClient{

    async getTextProofreader(textProofreaderDto: TextProofreaderDto):Promise<string>{
        const {model,prompt} = textProofreaderDto
        let response=""

        if(model==="GPT"){

            const client = new OpenAI({apiKey:envs.OPEN_AI_API_KEY});
            const completionsGPT = await client.responses.create({
                model: "gpt-4o",
                input: prompt
            });
            response = completionsGPT.output_text

        } else if(model === "GEMINI"){
            const ai = new GoogleGenAI({ apiKey:envs.GOOGLE_AI_API_KEY});
            const completionsGoogle = await ai.models.generateContent({
                model: "gemini-2.0-flash",
                contents: prompt
            });
            response = completionsGoogle.text || ""

        }else{
            //aqui va optro modelo de claude pero aun no obtengo accveso a la apikey 
        }
        return response
    }
}