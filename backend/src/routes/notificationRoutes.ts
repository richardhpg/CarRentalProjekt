import {
  getNotifications,
  updateNotificationStatus,
} from "../controllers/notificationController.js";
import { Router } from "express";
import refreshToken from "../middlewares/userValidator.js";

const router = Router();


router.get("/", refreshToken, getNotifications);
router.patch("/:id/status", refreshToken, updateNotificationStatus);

export default router;