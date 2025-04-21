

export class AudiogenerationDto{
    constructor(
        public prompt:string,
        public userId:string
    ){}
    static create( object: { [ key: string ]: any; } ): [ string?, AudiogenerationDto?]{
        const { prompt,userId} = object;
        if ( !prompt) return [ 'Missing prompt' ];

        if ( !userId) return ['Missing refrenece user'];

        return [
            undefined,
            new AudiogenerationDto(prompt,userId)
        ];
    }
}