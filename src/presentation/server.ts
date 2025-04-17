import express, { Router } from 'express'
import cors,{ CorsOptions } from 'cors' 
import cookieParser from 'cookie-parser';

interface Options{
    port?:number
    routes:Router
}
const whitelist =[process.env.URL_FRONTEND] 

const corsOptions:CorsOptions={
    origin:function(origin,callback){
        if(origin!==undefined && whitelist.includes(origin)){
            // puedede consultar la api
            callback(null,true)
        }else{
            // no esta permitido
            callback(new  Error("Error de Cors"))
        }
    },
    credentials: true
    
}

export class Server{
    public readonly app = express()
    private readonly port:number
    private readonly routes:Router


    constructor(options:Options){
        const {port=3100,routes}=options
        this.port=port
        this.routes=routes
    }


    async start(){
        this.app.use(cors(corsOptions))
        this.app.use(express.json())
        this.app.use(cookieParser());
        this.app.use( express.urlencoded({ extended: true }) ); 
        
        this.app.use(this.routes)
        this.app.listen(this.port,()=>{
            console.log(`Server runing on port: ${this.port} `)
        })
    }
}