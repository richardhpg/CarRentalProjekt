import express from 'express';
import cors from 'cors';
import itemRoutes from './routes/itemRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import userRoutes from './routes/userRoutes.js' 
import carRoutes from './routes/carRoutes.js'
import adsRoutes from './routes/adsRoutes.js'
import rentalRoutes from './routes/rentalRoutes.js'
import authRoutes from './routes/authRoutes.js'
 
const app = express();

app.use(cors());
app.use(express.json());

// Routes

// app.use('/api/items', itemRoutes);
app.use('/api/users', userRoutes);
app.use("/api/cars",carRoutes);
app.use("/api/advertisements", adsRoutes)
app.use("/api/rentals", rentalRoutes)
app.use("/api/account", authRoutes)

// Global error handler (should be after routes)
//app.use(errorHandler);

export default app;