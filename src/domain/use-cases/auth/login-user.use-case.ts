import { AuthRepository } from "../../repositories/auth.respository";
import { LoginUserDto } from "../../dtos/auth/login-user.dto";
import { CustomError } from "../../errors/custom.error";
import { JWT } from "../../../config/jwt";
interface UserToken {
    token: string;
    user: {
      id: string;
      name: string;
      email: string;
      phoneNumber:string,
      photoUrl:string
    };
  }
  
  type SignToken = (payload: Object, duration?: string) => Promise<string | null>;
  interface LoginUserUseCase {
    execute( loginUserDto: LoginUserDto): Promise<UserToken>;
  }

  export class LoginUser implements LoginUserUseCase{
    constructor(
        private readonly authResository: AuthRepository,
        private readonly signToken: SignToken = JWT.generateToken,
      ){}
    async execute(loginUserDto:LoginUserDto): Promise<UserToken> {
        const user = await this.authResository.login(loginUserDto);
        const token = await this.signToken({ id: user.id }, '2h');
        if ( !token ) throw CustomError.internalServer('Error generating token');

        return {
            token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phoneNumber:user.phoneNumber,
                photoUrl:user.photoUrl
            }
        }
    
    }
  }