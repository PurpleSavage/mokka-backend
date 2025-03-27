import { BcryptAdapter } from "../../config/bcrypt";
import { UserModel } from "../../data/mongodb/models/user.model";
import { RegisterUserDto } from "../../domain/dtos/auth/register-user.dto";
import { UserEntity } from "../../domain/entities/user.entity";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";
import { AuthDataSource } from "../../domain/datasources/auth.datasource";
import { CustomError} from "../../domain/errors/custom.error";
import { UserMapper } from "../mappers/user.mapper";
import { calculateExpirationDate } from "../../utils/calculateDateExpires";


type HashFunction =(password: string)=>string
type CompareFunction=(password: string, hashed: string)=>boolean
export class AuthDatasourceImpl implements AuthDataSource{

    constructor(
        private readonly hashPassword:HashFunction=BcryptAdapter.hash,
        private readonly comparePassword:CompareFunction=BcryptAdapter.compare
    ){}

    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        const {email,password,typePlan,}=registerUserDto

        try {
            const emailExist = await UserModel.findOne({email:email})
            
            if(emailExist) throw CustomError.badRequest('Could not create user , exists')
            
            const user =await UserModel.create({
                email,
                password:this.hashPassword(password),
                credits:typePlan === "FREE" ? 100:null ,
                typePlan: typePlan,
                subscriptionExpiresAt: typePlan === "PRO" ? calculateExpirationDate(new Date(),30): null
            })

            await user.save()

            return UserMapper.userEntityFromObject(user)
        } catch (error) {
            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer()
        }
    }
    async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
        const { email, password } = loginUserDto;
        try {
            const user = await UserModel.findOne({ email });
            if ( !user ) throw CustomError.badRequest('User does not exists - email');

            const isMatching = this.comparePassword(password, user.password);
            if ( !isMatching ) throw CustomError.badRequest('Password is not valid');
            return UserMapper.userEntityFromObject(user);
        } catch (error) {
            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer()
        }
    }
  
}