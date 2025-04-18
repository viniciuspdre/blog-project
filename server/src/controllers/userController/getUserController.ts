import { Request, Response } from "express";
import { badRequest } from "../../utils/http-helper";
import { HttpResponse } from "../../models/http-response-models";
import { getUserService } from "../../services/userServices/getUserService";


const getUserController = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  let response: HttpResponse | null = null;

  if (isNaN(id) || id < 0) {
    response = await badRequest("ID inválido");
    res.status(response.statusCode).json(response.body);
  } else {
    response = await getUserService(id);
    res.status(response.statusCode).json(response.body);
  }
}

export { getUserController }