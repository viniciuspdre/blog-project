import { Request, Response } from "express";
import { HttpResponse } from "../../models/http-response-models";
import { getPostByIdService } from "../../services/postsServices/getPostByIdService";


const getPostByIdController = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  const response: HttpResponse = await getPostByIdService(id);
  res.status(response.statusCode).json(response.body)


}

export { getPostByIdController }