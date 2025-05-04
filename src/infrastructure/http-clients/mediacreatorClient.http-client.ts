import { TextProofreaderDto } from "../../domain/dtos/mediacreator/text-proofreader.dto"
import { clientOpenIA,clientAnthropicIa,clientGoogleIa,clientElevenLabs } from "../../config/clientia";
import { AudiogenerationDto } from "../../domain/dtos/mediacreator/audio-generation.dto";
import { ResponseTextProofreader } from "../responseclientinterface/textproofreaderResponse.interface";
import { ResponseAudio } from "../responseclientinterface/audioResponse.interface";
import { supabase } from "../../config/supabaseclient";
import { generateId } from "../../utils/generateId";


export class MediaCreatorClient{

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
        const {prompt,userId,modelId} = audioGenerationDto
        const audio = await clientElevenLabs.textToSpeech.convert(modelId,{
            text: prompt,
            model_id: "eleven_multilingual_v2",
            output_format: "mp3_44100_128",
        })
     
        const chunks: Uint8Array[] = [];
        for await (const chunk of audio) {
            chunks.push(chunk);
        }
        const audioBuffer = Buffer.concat(chunks);

        const filename =`${userId}-${generateId()}`
        const filePath = `audios-generated/${filename}`;
        const {error} = await supabase.storage
        .from('mokkaaudios')
        .upload(filePath,audioBuffer,{
            contentType: 'audio/mpeg',
            cacheControl: '3600',
            upsert: true // Si quieres reemplazar el archivo si ya existe
        })
       
        if (error) {
            console.log("error supbase: ",error)
            throw new Error(error.message);  // Lanza el error si ocurre un fallo
        }
        const {data } = await supabase.storage
        .from('mokkaaudios')
        .getPublicUrl(filePath)
        if(!data) throw new Error('Mokka cant create a public url')
        return {
            content:prompt,
            userId,
            url:data?.publicUrl,
            modelId
        }
    } 
}