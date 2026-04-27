import {
    getAds,
    getAdsById,
    createAd,
    updateAd,
    deleteAd,
    getAdsByCarId
} from "../controllers/adsController.js"
import { Router } from "express"

const router = Router();

router.get("/", getAds)
router.get("/:id",getAdsById)
router.get("/car/:id",getAdsByCarId)
router.post("/",createAd)
router.patch("/:id/update",updateAd)
router.patch("/:id/delete",deleteAd)

export default router