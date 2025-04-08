export type ModelIa = "GPT" | "GEMINI" | "CLAUDE"


export class TextProofreaderDto{
    constructor(
        public prompt:string,
        public model:ModelIa,
        public userId:string
    ){}
    static create( object: { [ key: string ]: any; } ): [ string?, TextProofreaderDto?]{
        const { prompt,model,userId} = object;
        if ( !prompt) return [ 'Missing prompt' ];

        if ( !model ) return ['Missing model'];
        if ( !userId) return ['Missing refrenece user'];

        return [
            undefined,
            new TextProofreaderDto(prompt, model,userId)
        ];
    }
}