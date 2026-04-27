import {
    getCars,
    getCarById,
    createCar,
    updateCar,
    deleteCar
} from '../controllers/carController.js'
import { Router } from "express"

const router = Router();

router.get("/", getCars)
router.post("/", createCar)
router.get("/:id", getCarById)
router.patch("/:id/update", updateCar)
router.patch("/:id/delete", deleteCar)

export default router;