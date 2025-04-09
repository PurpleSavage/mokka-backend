import { Router } from "express";

import { UserDatasourceImpl } from "../../infrastructure/datasources/user.datasource.impl";
import { UserClient } from "../../infrastructure/http-clients/TextProofreaderClient.http-client";
export class UserRoutes{
    static get routes():Router{
        const router = Router()
        const client =new UserClient()
        const datasource = new UserDatasourceImpl(client)

        return router
    }
}