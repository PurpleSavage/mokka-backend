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


export class AuthDatasourceImpl implements AuthDataSource{

    constructor(
        private readonly hashPassword:HashFunction=BcryptAdapter.hash,
        private readonly comparePassword:CompareFunction=BcryptAdapter.compare,
        private readonly signToken: SignToken = JWT.generateToken,
    ){}

    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        const { email, password, typePlan } = registerUserDto;
    
        try {
            const userExist = await UserModel.findOne({ email });
    
            if (userExist) throw CustomError.badRequest('Could not create user, already exists');
    
            // Crear usuario sin token aún
            const user = await UserModel.create({
                email,
                password: this.hashPassword(password),
                credits: typePlan === "FREE" ? 100 : null,
                typePlan: typePlan,
                subscriptionExpiresAt: typePlan === "PRO" ? calculateExpirationDate(new Date(), 30) : null,
            });
    
            // Firmar token usando el ID de Mongo
            const refresh_token = await this.signToken({ id: user._id.toString() }, '48h'); 
    
            if (!refresh_token) throw CustomError.badRequest('Could not create refresh token');
    
            user.refreshToken = refresh_token;
            await user.save();
    
            return UserMapper.userEntityFromObject(user);
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer();
        }
    }
    async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
        const { email, password } = loginUserDto;
    
        try {

            const user = await UserModel.findOne({ email });
    
            if (!user) throw CustomError.badRequest('User does not exist - email');

            const isMatching = this.comparePassword(password, user.password);
            if (!isMatching) throw CustomError.badRequest('Password is not valid');

            const refresh_token = await this.signToken({ id: user._id.toString() }, '48h');
            if (!refresh_token) throw CustomError.badRequest('Could not create refresh token');

            user.refreshToken = refresh_token;
            await user.save();

            return UserMapper.userEntityFromObject(user);
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer();
        }
    }
    
    
    async getAccessToken(getAccessTokenDto:GetAccessTokenDto): Promise<AccessTokenEntity> {
        const {id}=getAccessTokenDto
        try {
            
            const new_token = await this.signToken({ id: id}, '5m');

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