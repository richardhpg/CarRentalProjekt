import {
    getCars,
    getCarById,
    createCar,
    updateCar,
    deleteCar
} from '../controllers/carController.js'
import { Router } from "express"
import refreshToken from '../middlewares/userValidator.js';

const router = Router();

router.get("/", getCars)
router.post("/", refreshToken, createCar)
router.get("/:id", getCarById)
router.patch("/:id/update", refreshToken, updateCar)
router.patch("/:id/delete", refreshToken, deleteCar)

export default router;