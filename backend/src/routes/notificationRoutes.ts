import { Router } from "express"
import {
  createNotification,
  getNotificationCenter,
  updateNotificationStatus
} from "../controllers/notificationController.js"

const router = Router()

router.post("/", createNotification)
router.get("/", getNotificationCenter)
router.patch("/:id/status", updateNotificationStatus)

export default router
