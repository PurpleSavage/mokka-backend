export type TypePlan = "PRO" | "FREE"


export class UserEntity{
    constructor(
        public id :string,
        public email:string,
        public password:string,
        public credits:number | null,
        public typePlan: TypePlan,
        public subscriptionExpiresAt:Date | null,
        public refresh_token:string
    ){}

}