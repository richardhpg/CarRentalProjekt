import {
  createNotification,
  getNotifications,
  updateNotificationStatus,
} from "../controllers/notificationController.js";

import { Router } from "express";
import refreshToken from "../middlewares/userValidator.js";

const router = Router();

router.post("/", refreshToken, createNotification);

router.get("/:id", refreshToken, getNotifications);

router.patch("/:id/status", refreshToken, updateNotificationStatus);

export default router;