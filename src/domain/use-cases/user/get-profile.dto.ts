import { JWT } from "../../../config/jwt"
import { GetProfileDto } from "../../dtos/user/get-profile.dto"
import { TypePlan } from "../../entities/user.entity"
import { CustomError } from "../../errors/custom.error"
import { UserRepository } from "../../repositories/user.repository"




interface UserToken{
    token:string,
    user:{
        id:string,
        email:string,
        credits:number | null,
        typePlan: TypePlan,
        subscriptionExpiresAt:Date | null,

    }
}

type SignToken = (payload: Object, duration?: string) => Promise<string | null>;
interface GetProfileUseCase{
    execute(getProfileDto:GetProfileDto):Promise<UserToken>
}

export class GetProfile implements GetProfileUseCase{
    constructor(
        private readonly userRepository:UserRepository,
        private readonly signToken: SignToken = JWT.generateToken,
    ){}
    async execute(getProfileDto:GetProfileDto): Promise<UserToken> {
        const user = await this.userRepository.getProfile(getProfileDto);
        const token = await this.signToken({ id: user.id }, '2h');
        if ( !token ) throw CustomError.internalServer('Error generating token');
        return {
            token:token,
            user:{
                id:user.id,
                email:user.email,
                credits: user.credits,
                typePlan:user.typePlan,
                subscriptionExpiresAt:user.subscriptionExpiresAt,
            }
        }
    }
}