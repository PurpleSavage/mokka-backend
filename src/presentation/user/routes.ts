import { Router } from "express";

import { UserDatasourceImpl } from "../../infrastructure/datasources/user.datasource.impl";
import { UserClient } from "../../infrastructure/http-clients/userClient.http-client";
import { UserController } from "./controller";
import { UserRepositoryImpl } from "../../infrastructure/repositories/user.repository.impl";
import { AuthMiddleware } from "../middleware/auth.middleware";
import { RefreshTokenMiddleware } from "../middleware/refreshToken.middleware";
export class UserRoutes{
    static get routes():Router{
        
        const router = Router()
        const client =new UserClient()
        const datasource = new UserDatasourceImpl(client)
        const userRepository = new UserRepositoryImpl(datasource)
        const controller = new UserController(userRepository)

        router.post(
            '/textProofreader',
            [AuthMiddleware.validateJWT],
            controller.textProofreader
        )

        router.post(
            '/audioGeneration',
            [AuthMiddleware.validateJWT],
            controller.audioGeneration
        )
        router.get(
            '/getProfile',
            [RefreshTokenMiddleware.ValidateRefreshToke],
            controller.getProfile
        )
        return router
    }
}