import { register, login, checkUser, logout } from "../controllers/authController.js";
import { Router } from "express";
import refreshToken from "../middlewares/userValidator.js";
const router = Router();
router.post("/register", register);
router.post("/login", login);
router.get("/check-user", refreshToken, checkUser);
router.post("/logout", refreshToken, logout);
export default router;
