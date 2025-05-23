
export class GetAccessTokenDto{
    constructor(

      public id:string
    ){}
    static create( object: { [ key: string ]: any; } ): [ string?, GetAccessTokenDto?]{
      const { id } = object;


      if ( !id ) return [ 'Missing id' ];
      return [
        undefined,
        new GetAccessTokenDto(id)
      ];
    }
}