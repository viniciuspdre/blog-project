import { Request, Response } from "express";
import { registerUserService } from "../../services/userServices/registerUserService";

const registerUserController = async (req: Request, res: Response) => {

    const { name, email, password } = req.body;
    const profilePicture = req.file;

    const response = await registerUserService(name, email, password, profilePicture);
    res.status(response.statusCode).json(response.body);

}

export { registerUserController };