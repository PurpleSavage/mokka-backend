
export class GetProfileDto{
    constructor(
        public id:string
    ){}
    static create( object: { [ key: string ]: any; } ): [ string?, GetProfileDto?]{
        const {id}= object

    
        if(!id) return ['Missing id']
        return [
            undefined,
            new GetProfileDto(id)
        ];
    }
}