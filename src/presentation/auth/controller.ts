import { CustomError } from "../../domain/errors/custom.error";
import { AuthRepository } from "../../domain/repositories/auth.respository";
import { Request, Response } from "express"
import { RegisterUser } from "../../domain/use-cases/auth/register-user.use-case";
import { LoginUser } from "../../domain/use-cases/auth/login-user.use-case";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";
import { RegisterUserDto } from "../../domain/dtos/auth/register-user.dto";


export class AuthController{
    constructor(
        private readonly authRepository:AuthRepository
    ){
    }
    private handlerError =(error:unknown,res:Response)=>{
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({error:error.message})
        }
        console.log(error)
        res.status(500).json({error:'Internal Server error'})
    }
    registerUser=(req:Request,res:Response)=>{
        const [error,registerUserDto] =  RegisterUserDto.create(req.body)
        if(error) {
            return res.status(400).json({error})
        }
        new RegisterUser(this.authRepository)
        .execute(registerUserDto!)
        .then((data)=>res.json(data))
        .catch(error=>this.handlerError(error, res))
        
    }

    loginUser=(req:Request,res:Response)=>{
        const [error, loginUserDto] = LoginUserDto.create(req.body);
        if ( error ) return res.status(400).json({ error });
        new LoginUser(this.authRepository)
        .execute( loginUserDto! )
        .then( data => res.json(data) )
        .catch( error => this.handlerError(error, res) );
        
    }

}