
export class GetAccessTokenDto{
    constructor(
        public refresh_token:string,

    ){}
    static create( object: { [ key: string ]: any; } ): [ string?, GetAccessTokenDto?]{
      const { refresh_token,access_token } = object;
      if ( !refresh_token ) return [ 'Missing aaccess-token' ];
      if ( !access_token ) return [ 'Missing aaccess-token' ];
      return [
        undefined,
        new GetAccessTokenDto(refresh_token)
      ];
    }
}