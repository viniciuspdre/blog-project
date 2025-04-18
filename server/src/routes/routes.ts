import { Router } from "express";
import multer from 'multer';
import { registerUserController } from "../controllers/userController/registerUserController";

export const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
// queries

// inserts

router.post("/api/register/user", upload.single('profilePicture'), registerUserController)