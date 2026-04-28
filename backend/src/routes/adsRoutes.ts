import {
    getAds,
    getAdsById,
    createAd,
    updateAd,
    deleteAd,
    getAdsByCarId
} from "../controllers/adsController.js"
import { Router } from "express"
import refreshToken from "../middlewares/userValidator.js";

const router = Router();

router.get("/", getAds)
router.post("/", refreshToken, createAd)
router.patch("/:id/update", refreshToken, updateAd)
router.patch("/:id/delete", refreshToken, deleteAd)
router.get("/:id", getAdsById)
router.get("/car/:id" ,getAdsByCarId)

export default router