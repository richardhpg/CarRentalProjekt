import {
    getUsers,
    createUser
} from "../controllers/userControllers.js"
import { Router } from "express"

const router = Router();

router.get("/",getUsers)
router.post("/",createUser)

export default router;