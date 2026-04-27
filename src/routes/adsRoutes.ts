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
router.post("/",createAd)
router.patch("/:id/update",updateAd)
router.patch("/:id/delete",deleteAd)
router.get("/:id",getAdsById)
router.get("/car/:id",getAdsByCarId)

export default router