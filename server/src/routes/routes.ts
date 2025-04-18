import { Router } from "express";
import multer from 'multer';
import { registerUserController } from "../controllers/userController/registerUserController";
import { authUserController } from "../controllers/userController/authUserController";
import { getUserController } from "../controllers/userController/getUserController";
import { checkToken } from "../utils/check-jwt";

export const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
// queries
router.get("/user/:id", checkToken, getUserController)

// inserts

router.post("/auth/register", upload.single('profilePicture'), registerUserController)
router.post("/auth/login", authUserController)