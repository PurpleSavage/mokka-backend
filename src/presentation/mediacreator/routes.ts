import { Router } from "express";
import { AuthMiddleware } from "../middleware/auth.middleware";
import { MediaCreatorClient } from "../../infrastructure/http-clients/mediacreatorClient.http-client";
import { MediaCreatorDatasourceImpl } from "../../infrastructure/datasources/mediacreator.datasource.impl";
import { MediaCreatorRepositoryImpl } from "../../infrastructure/repositories/mediacreator.repository.impl";
import { MediaCreatorController } from "./controller";

export class MediaCreatorRoutes{
    static get routes():Router{
        const router = Router()
        const client =new MediaCreatorClient()
        const datasource = new MediaCreatorDatasourceImpl(client)
        const userRepository = new MediaCreatorRepositoryImpl(datasource)
        const controller = new MediaCreatorController(userRepository)
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
        return router
    }
}