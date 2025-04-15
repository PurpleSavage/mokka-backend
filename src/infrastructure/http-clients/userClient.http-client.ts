import { TextProofreaderDto } from "../../domain/dtos/user/text-proofreader.dto"
import { clientOpenIA,clientAnthropicIa,clientGoogleIa,clientElevenLabs } from "../../config/clientia";
import { AudiogenerationDto } from "../../domain/dtos/user/audio-generation.dto";
import { ResponseTextProofreader } from "../responseclientinterface/textproofreaderResponse.interface";
import { ResponseAudio } from "../responseclientinterface/audioResponse.interface";
import { supabase } from "../../config/supabaseclient";
import { generateId } from "../../utils/generateId";

export class UserClient{

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

    async audioGeneration(audioGenerationDto:AudiogenerationDto): Promise<ResponseAudio> {
        const {prompt,userId} = audioGenerationDto
        const audio = await clientElevenLabs.textToSpeech.convert("JBFqnCBsd6RMkjVDRZzb",{
            text: prompt,
            model_id: "eleven_multilingual_v2",
            output_format: "mp3_44100_128",
        })
        const {error} = await supabase.storage
        .from('mokkaaudios')
        .upload(`${userId}-${generateId()}`,audio,{
            contentType: 'audio/mpeg',
            cacheControl: '3600',
            upsert: true // Si quieres reemplazar el archivo si ya existe
        })
        if (error) {
            throw new Error(error.message);  // Lanza el error si ocurre un fallo
        }
        const { data: publicUrlData } = supabase.storage
        .from('mokkaaudios')
        .getPublicUrl(`${userId}-${generateId()}`);
        return {
            content:prompt,
            userId,
            url:publicUrlData.publicUrl  
        }
    } 
}