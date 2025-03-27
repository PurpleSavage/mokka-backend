import { Validators } from "../../../config/validators";
import { TypePlan } from "../../entities/user.entity";

export class RegisterUserDto{
    private constructor(
        public email:string,
        public password:string,
        public typePlan: TypePlan,
    
    ){}
    static create( object: { [ key: string ]: any; } ): [ string?, RegisterUserDto?]{

        const { email, password,typePlan} = object;

        if(!email) return ['Missing email']
        if(!Validators.email.test(email)) return ['Email is not valid']
        if(!password) return ['Missing password']
        if(password.length<6) return ['Password too short']
        if(!typePlan) return ['Missing plan type']
        if(typePlan !== "PRO" && typePlan !== "FREE") return['unrecognized plan type']
        return [
            undefined, 
            new RegisterUserDto(email,password,typePlan)
        ]
    }


}