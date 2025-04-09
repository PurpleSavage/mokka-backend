import { BcryptAdapter } from "../../config/bcrypt";
import { UserModel } from "../../data/mongodb/models/user.model";
import { RegisterUserDto } from "../../domain/dtos/auth/register-user.dto";
import { UserEntity } from "../../domain/entities/user.entity";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";
import { AuthDataSource } from "../../domain/datasources/auth.datasource";
import { CustomError} from "../../domain/errors/custom.error";
import { UserMapper } from "../mappers/user.mapper";
import { calculateExpirationDate } from "../../utils/calculateDateExpires";
import { JWT } from "../../config/jwt";
import { GetAccessTokenDto } from "../../domain/dtos/auth/get-accesToken.dto";
import { AccessTokenEntity } from "../../domain/entities/accessToken.entity";

type HashFunction =(password: string)=>string
type CompareFunction=(password: string, hashed: string)=>boolean
type SignToken = (payload: Object, duration?: string) => Promise<string | null>;
type ValidateToken=<T>(token: string)=> Promise<T | null>

export class AuthDatasourceImpl implements AuthDataSource{

    constructor(
        private readonly hashPassword:HashFunction=BcryptAdapter.hash,
        private readonly comparePassword:CompareFunction=BcryptAdapter.compare,
        private readonly signToken: SignToken = JWT.generateToken,
        private readonly validateToken:ValidateToken= JWT.validateToken
    ){}

    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        const {email,password,typePlan,}=registerUserDto

        try {
            const emailExist = await UserModel.findOne({email:email})

            
            if(emailExist) throw CustomError.badRequest('Could not create user , exists')
            
            const refresh_token = await this.signToken({ email:email}, '168h') 

            if(!refresh_token) throw CustomError.badRequest('Could not create user')

            const user =await UserModel.create({
                email,
                password:this.hashPassword(password),
                credits:typePlan === "FREE" ? 100:null ,
                typePlan: typePlan,
                subscriptionExpiresAt: typePlan === "PRO" ? calculateExpirationDate(new Date(),30): null,
                refreshToken: refresh_token  
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
            
            const user = await UserModel.findOneAndUpdate(
                { email }, // Buscar por email
                { $set: { refreshToken: await this.signToken({ email }, '168h') } }, 
                { new: true } 
            );
    
            if (!user) throw CustomError.badRequest('User does not exist - email');
    
           
            const isMatching = this.comparePassword(password, user.password);
            if (!isMatching) throw CustomError.badRequest('Password is not valid');
    
            return UserMapper.userEntityFromObject(user);
    
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer();
        }
    }
    
    async getAccessToken(getAccessTokenDto:GetAccessTokenDto): Promise<AccessTokenEntity> {
        const {refresh_token}=getAccessTokenDto
        try {
            const payload = await this.validateToken<{id:string}>(refresh_token)
            if(!payload) throw  CustomError.badRequest("Missing token")
            
            const userExist = await UserModel.findById(payload.id)

            if(userExist?.refreshToken!==refresh_token) throw CustomError.unauthorized('Error generating token');

            const new_token = await this.signToken({ id: payload.id }, '2h');

            if ( !new_token ) throw CustomError.internalServer('Error generating token');
            return {
                access_token:new_token
            }
        } catch (error) {
            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer()
        }
    }
  
}