import "reflect-metadata";
import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { registerControllers } from "./utils/router-loader";
import { CustomerController } from "./controllers/customer.controller";
import { errorHandler } from './middlewares/errorHandler.middleware';

const app: Express = express();

// Core Middlewares
app.use(cors()); // Enable CORS
app.use(helmet()); // Set security headers
app.use(express.json()); // Body parser for JSON
app.use(express.urlencoded({ extended: true })); // Body parser for URL-encoded data

// API Routes
const apiRouter = registerControllers([
    CustomerController
])
app.use('/api', apiRouter);

// Central Error Handler
app.use(errorHandler);

export default app;