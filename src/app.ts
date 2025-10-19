import "reflect-metadata";
import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import apiRoutes from './routes';
import { errorHandler } from './middlewares/errorHandler.middleware';

const app: Express = express();

// Core Middlewares
app.use(cors()); // Enable CORS
app.use(helmet()); // Set security headers
app.use(express.json()); // Body parser for JSON
app.use(express.urlencoded({ extended: true })); // Body parser for URL-encoded data

// API Routes
app.use('/api', apiRoutes);

// Central Error Handler
app.use(errorHandler);

export default app;