type Model = "GPT" | "GEMINI" | "CLAUDE"


export class TextProofreaderDto{
    constructor(
        public prompt:string,
        public model:Model
    ){}
    static create( object: { [ key: string ]: any; } ): [ string?, TextProofreaderDto?]{
        const { prompt,model} = object;
        if ( !prompt) return [ 'Missing email' ];

        if ( !model ) return ['Missing password'];

        return [
            undefined,
            new TextProofreaderDto(prompt, model)
        ];
    }
}