import { Router } from "express";
import multer from 'multer';
import { registerUserController } from "../controllers/userController/registerUserController";
import { authUserController } from "../controllers/userController/authUserController";
import { getUserController } from "../controllers/userController/getUserController";
import { checkToken } from "../utils/check-jwt";
import { createPostController } from "../controllers/postsController/createPostController";
import { getAllPostsController } from "../controllers/postsController/getAllPostsController";
import { getPostByIdController } from "../controllers/postsController/getPostByIdController";
import { updateUserController } from "../controllers/userController/updateUserController";

export const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// user routes
router.get("/user/:id", checkToken, getUserController);
router.post("/auth/register", upload.single('profilePicture'), registerUserController);
router.post("/auth/login", authUserController);
router.put("/user/:id", upload.single('profilePicture'), updateUserController);
// add in future route to delete user (deactivate account) it will maybe change auth logic, but we can see soon


// post routes
router.post("/post/create", checkToken, upload.single('coverImage'), createPostController);
router.get("/posts", getAllPostsController);
router.get("/post/:id", getPostByIdController);
