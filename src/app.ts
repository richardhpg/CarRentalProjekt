import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser"
import itemRoutes from './routes/itemRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import userRoutes from './routes/userRoutes.js'
import carRoutes from './routes/carRoutes.js'
import adsRoutes from './routes/adsRoutes.js'
import rentalRoutes from './routes/rentalRoutes.js'
import authRoutes from './routes/authRoutes.js'
import refreshToken from "./middlewares/userValidator.js"
import { ref } from 'node:process';

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Routes

// app.use('/api/items', itemRoutes);
app.use('/api/users', refreshToken, userRoutes);
app.use("/api/cars", refreshToken, carRoutes);
app.use("/api/advertisements",refreshToken, adsRoutes)
app.use("/api/rentals",refreshToken, rentalRoutes)
app.use("/api/account", authRoutes)

// Global error handler (should be after routes)
//app.use(errorHandler);

export default app;