import "reflect-metadata";
import "express-async-errors";
import createConnection from "../typeorm";
import "../../container/index";

import express, { Request, Response, NextFunction } from "express";
import swaggerUi from "swagger-ui-express";
import { router } from "./routes";

import swaggerFile from "../../../swagger.json";

import { AppError } from "../../errors/AppError";

createConnection();
const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) =>{
    if(err instanceof AppError){
        return response.status(err.statusCode).json({
            message: err.message
        })
    }

    return response.status(500).json({
        status: "error",
        messsage: `Internal server error: ${err.message}`
    })
}) 

export { app }