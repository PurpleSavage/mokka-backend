import { Router } from "express";

import { UserDatasourceImpl } from "../../infrastructure/datasources/user.datasource.impl";

import { UserController } from "./controller";
import { UserRepositoryImpl } from "../../infrastructure/repositories/user.repository.impl";
import { AuthMiddleware } from "../middleware/auth.middleware";
import { RefreshTokenMiddleware } from "../middleware/refreshToken.middleware";
export class UserRoutes{
    static get routes():Router{
        
        const router = Router()
     
        const datasource = new UserDatasourceImpl()
        const userRepository = new UserRepositoryImpl(datasource)
        const controller = new UserController(userRepository)

        
        router.get(
            '/getProfile',
            [RefreshTokenMiddleware.ValidateRefreshToke],
            controller.getProfile
        )
        return router
    }
}