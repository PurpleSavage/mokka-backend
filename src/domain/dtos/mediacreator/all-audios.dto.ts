export class GetAllAudiosDto{
    constructor(
        public userId:string
    ){}
    static create( object: { [ key: string ]: any; } ): [ string?, GetAllAudiosDto?]{
        const {userId} = object
        if(!userId) return ['Missing userId']
        return[
            undefined,
            new GetAllAudiosDto(userId)
        ]
    }
}