import {
    getUsers,
    getUserById,
    createUser,
    deleteUser
} from "../controllers/userControllers.js"
import { Router } from "express"

const router = Router();

router.get("/",getUsers)
router.get("/:id",getUserById)
router.post("/", createUser)
router.patch("/:id",deleteUser)

export default router;