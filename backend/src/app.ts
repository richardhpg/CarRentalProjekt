import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import session from "express-session";
import userRoutes from "./routes/userRoutes.js";
import carRoutes from "./routes/carRoutes.js";
import adsRoutes from "./routes/adsRoutes.js";
import rentalRoutes from "./routes/rentalRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import refreshToken from "./middlewares/userValidator.js";
import notificationRoutes from "./routes/notificationRoutes.js"

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: 'lax'
    },
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/notifications", notificationRoutes);
app.use("/api/account", authRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/advertisements", adsRoutes);

// Minden további /api route auth-ot igényel
app.use("/api", refreshToken);

app.use("/api/users", userRoutes);
app.use("/api/rentals", rentalRoutes);


export default app;
