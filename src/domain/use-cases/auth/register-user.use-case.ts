import { JWT } from "../../../config/jwt";
import { RegisterUserDto } from "../../dtos/auth/register-user.dto";
import { CustomError } from "../../errors/custom.error";
import { AuthRepository } from "../../repositories/auth.respository";
import { TypePlan } from "../../entities/user.entity";

type SignTokenFunction=(payload:Object,duration?:string)=>Promise<string | null>

interface UserToken{
    token:string,
    user:{
        id:string,
        email:string,
        credits:number | null,
        typePlan: TypePlan,
        subscriptionExpiresAt:Date | null
    }
}

interface RegisterUserUseCase{
    execute(registerUserDto:RegisterUserDto):Promise<UserToken>
}
export class RegisterUser implements RegisterUserUseCase{
    constructor(
        private readonly authRepository:AuthRepository,
        private readonly signToken:SignTokenFunction =JWT.generateToken 
    ){}
    async execute(registerUserDto: RegisterUserDto): Promise<UserToken> {
        const user = await this.authRepository.register(registerUserDto)


        const token = await this.signToken({id:user.id},'2h')
        if(!token) throw CustomError.internalServer('Error generating token')

        return {
            token:token,
            user:{
                id:user.id,
                email:user.email,
                credits: user.credits,
                typePlan:user.typePlan,
                subscriptionExpiresAt:user.subscriptionExpiresAt
            }
        }
    }
  
}   