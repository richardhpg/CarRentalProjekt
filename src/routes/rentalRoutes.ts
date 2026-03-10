import {
    getRentals,
    createRental,
    updateRental,
    deleteRental
} from "../controllers/rentalController.js"
import { Router } from "express"

const router = Router();

router.get("/",getRentals)
router.post("/",createRental)
router.patch("/:id/update", updateRental)
router.patch("/:id/delete", deleteRental)

export default router;