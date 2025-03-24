import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import logger from "./utils/logger";
import dbConnection from "./config/dbConfig";
import userRoutes from './routes/user.routes';
import authMiddleware from "./middleware/auth.middleware";

dotenv.config();

const app = express();

// Middleware setup
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(cookieParser());


// Logging configuration
import morganMiddleware from "./utils/morganMiddleware";
app.use(morganMiddleware);
  

//getting database connected

(async () => {
  await dbConnection();  
})();

// Routes setup
app.use('/api', userRoutes);

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'UP' });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Not Found' });
});

// Server activation
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});