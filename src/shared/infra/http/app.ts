import "reflect-metadata";
import "dotenv/config";
import "express-async-errors";
import cors from "cors";

import createConnection from "../typeorm";
import "../../container/index";

import express, { Request, Response, NextFunction } from "express";
import swaggerUi from "swagger-ui-express";
import { router } from "./routes";
import rateLimiter from '../http/middlewares/rateLimiter'

import swaggerFile from "../../../swagger.json";

import upload from "../../../config/upload";

import { AppError } from "../../errors/AppError";

createConnection();
const app = express();

app.use(rateLimiter);

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));
app.use("/cars", express.static(`${upload.tmpFolder}/cars`))

app.use(cors())
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