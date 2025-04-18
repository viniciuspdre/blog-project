import { Request, Response } from "express";
import { registerUserService } from "../../services/userServices/registerUserService";

const registerUserController = async (req: Request, res: Response) => {

    const { name, email, password_hash, role } = req.body;
    const profilePicture = req.file;

    const response = await registerUserService(name, email, password_hash, profilePicture, role);
    res.status(response.statusCode).json(response.body);

}

export { registerUserController };