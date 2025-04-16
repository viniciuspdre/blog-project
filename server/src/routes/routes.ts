import { Router } from "express";
import multer from 'multer';

export const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
// queries

router.get("/api/posts")

// inserts

router.post("api/register/user", upload.single('profilePicture'))