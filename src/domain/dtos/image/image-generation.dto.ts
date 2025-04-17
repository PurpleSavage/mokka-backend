export class ImageGenerationDto{
    constructor(
        public prompt:string,
        public userId:string
    ){}
    static create( object: { [ key: string ]: any; } ): [ string?, ImageGenerationDto?]{
        const { prompt,userId} = object;
        if ( !prompt) return [ 'Missing prompt' ];

        if ( !userId) return ['Missing refrenece user'];

        return [
            undefined,
            new ImageGenerationDto(prompt,userId)
        ];
    }
}