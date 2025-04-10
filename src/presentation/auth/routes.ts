import { Router } from "express"
import { AuthDatasourceImpl } from "../../infrastructure/datasources/auth.datasource.impl"
import { AuthRepositoryImpl } from "../../infrastructure/repositories/auth.repository.impl"
import { AuthController } from "./controller"
import { RefreshTokenMiddleware } from "../middleware/refreshToken.middleware"

export class AuthRoutes{

    static get routes():Router{
        const router = Router()
        const datasource= new AuthDatasourceImpl()
        const authRepository=new AuthRepositoryImpl(datasource)
        const controller = new AuthController(authRepository)
        router.post('/register', controller.registerUser)
        router.post('/login', controller.loginUser )
        router.get('/accessToken',[RefreshTokenMiddleware.ValidateRefreshToke],controller.getAccessToken)
        return router
    }
} 