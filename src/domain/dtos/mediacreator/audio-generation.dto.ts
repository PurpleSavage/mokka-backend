

export class AudiogenerationDto{
    constructor(
        public prompt:string,
        public userId:string,
        public modelId:string
    ){}
    static create( object: { [ key: string ]: any; } ): [ string?, AudiogenerationDto?]{
        const { prompt,userId,modelId} = object;
        if ( !prompt) return [ 'Missing prompt' ];

        if ( !userId) return ['Missing refrenece user'];

        if(!modelId) return ['Missing model']
        return [
            undefined,
            new AudiogenerationDto(prompt,userId,modelId)
        ];
    }
}