
import { GetAccessTokenDto } from "../../dtos/auth/get-accesToken.dto";
import { AccessTokenEntity } from "../../entities/accessToken.entity";
import { CustomError } from "../../errors/custom.error";
import { AuthRepository } from "../../repositories/auth.respository";






 interface GetAccessTokenUseCase {
    execute( getAccessTokenDto: GetAccessTokenDto): Promise<AccessTokenEntity>;
}
export class GetAccessToken implements GetAccessTokenUseCase {
    constructor(
        private readonly authResository: AuthRepository,
    ){}
    async execute(getAccessTokenDto: GetAccessTokenDto): Promise<AccessTokenEntity> {
        const  data = await this.authResository.getAccessToken(getAccessTokenDto)
        if ( !data ) throw CustomError.internalServer('Error generating access-token');
        return {
            access_token: data.access_token
        }
    }
}