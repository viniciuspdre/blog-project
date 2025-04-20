import { Request, Response } from "express";
import { updateUserService } from "../../services/userServices/updateUserServices";


const updateUserController = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const {name, bio} = req.body;
  const file = req.file;

  const response = await updateUserService(id, name, bio, file);
  res.status(response.statusCode).json(response.body);
}

export { updateUserController }