import {
    getCars,
    getCarById,
    createCar,
    updateCar,
} from '../controllers/carController.js'
import { Router } from "express"

const router = Router();

router.get("/", getCars)
router.get("/:id", getCarById)
router.post("/", createCar)
router.patch("/:id/update", updateCar)

export default router;