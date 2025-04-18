import { Request, Response } from "express";
import { authUserService } from "../../services/userServices/authUserService";


const authUserController = async (req: Request, res: Response) => {
  const {email, password_hash} = req.body;

  const response = await authUserService(email, password_hash);
  res.status(response.statusCode).json(response.body);
}

export { authUserController }