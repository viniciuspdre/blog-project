import { Request, Response } from "express";
import { deleteUserService } from "../../services/userServices/deleteUserService";
import { HttpResponse } from "../../models/http-response-models";

const deleteUserController = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  let response: HttpResponse = await deleteUserService(id);
  res.status(response.statusCode).json(response.body);
};

export { deleteUserController };
