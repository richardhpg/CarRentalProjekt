import { getUsers, getUserById, deleteUser, updateUser, getMe } from "../controllers/userControllers.js";
import { Router } from "express";
const router = Router();
router.get("/", getUsers);
router.get("/me", getMe);
router.get("/:id", getUserById);
router.patch("/:id/delete", deleteUser);
router.patch("/:id/update", updateUser);
export default router;
