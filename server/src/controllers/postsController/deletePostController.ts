import { Request, Response } from "express"
import { HttpResponse } from "../../models/http-response-models";
import { deletePostService } from "../../services/postsServices/deletePostService";


const deletePostController = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  let response: HttpResponse = await deletePostService(id);
  res.status(response.statusCode).json(response.body);
}

export { deletePostController }