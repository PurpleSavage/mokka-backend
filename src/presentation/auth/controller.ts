import { CustomError } from "../../domain/errors/custom.error";
import { AuthRepository } from "../../domain/repositories/auth.respository";
import { Request, Response } from "express"
import { RegisterUser } from "../../domain/use-cases/auth/register-user.use-case";
import { LoginUser } from "../../domain/use-cases/auth/login-user.use-case";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";
import { RegisterUserDto } from "../../domain/dtos/auth/register-user.dto";
import { GetAccessTokenDto } from "../../domain/dtos/auth/get-accesToken.dto";
import { GetAccessToken } from "../../domain/use-cases/auth/access-token.use-case";


export class AuthController{
    constructor(
        private readonly authRepository:AuthRepository
    ){
    }
    private handlerError =(error:unknown,res:Response)=>{
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({error:error.message})
        }
        res.status(500).json({error:'Internal Server error'})
    }
    registerUser=(req:Request,res:Response)=>{
        const [error,registerUserDto] =  RegisterUserDto.create(req.body)
        if(error) {
            return res.status(400).json({error})
        }
        new RegisterUser(this.authRepository)
        .execute(registerUserDto!)
        .then((data)=>{
            const{token,user}= data
            const {refreshToken,...dataUser} = user
            res.cookie("refreshToken",refreshToken,
                {
                    httpOnly: true,
                    secure: true,         // solo en HTTPS, puedes poner false si estás en localhost
                    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días en milisegundos
                    sameSite: 'strict',   // o 'lax' según tu necesidad
                }
            )
            res.json({token,dataUser})
        })
        .catch(error=>this.handlerError(error, res))
        
    }

    loginUser=(req:Request,res:Response)=>{
        const [error, loginUserDto] = LoginUserDto.create(req.body);
        if ( error ) return res.status(400).json({ error });
        new LoginUser(this.authRepository)
        .execute( loginUserDto! )
        .then( data => {
            const{token,user}= data
            const {refreshToken,...dataUser} = user
            res.cookie("refreshToken",refreshToken,
                {
                    httpOnly: true,
                    secure: true,         // solo en HTTPS, puedes poner false si estás en localhost
                    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días en milisegundos
                    sameSite: 'strict',   // o 'lax' según tu necesidad
                }
            )
            res.json({token,dataUser})
        } )
        .catch( error => this.handlerError(error, res) );
        
    }

    getAccessToken=(req:Request,res:Response)=>{
        const [error,getAccessTokenDto]=GetAccessTokenDto.create({id:req.body.id}) 
        if ( error ) return res.status(400).json({ error });
        new GetAccessToken(this.authRepository)
        .execute(getAccessTokenDto!)
        .then(data => res.json(data))
        .catch( error => this.handlerError(error, res) );
    }
}