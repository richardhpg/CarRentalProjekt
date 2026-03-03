import {
    getUsers,
    createUser,
    deleteUser
} from "../controllers/userControllers.js"
import { Router } from "express"

const router = Router();

router.get("/",getUsers)
router.post("/", createUser)
router.patch("/:id",deleteUser)

export default router;