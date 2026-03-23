import {
    getUsers,
    getUserById,
    createUser,
    deleteUser,
    updateUser
} from "../controllers/userControllers.js"
import { Router } from "express"

const router = Router();

router.get("/",getUsers)
router.get("/:id",getUserById)
router.post("/", createUser)
router.patch("/:id/delete",deleteUser)
router.patch("/:id/update",updateUser)

export default router;