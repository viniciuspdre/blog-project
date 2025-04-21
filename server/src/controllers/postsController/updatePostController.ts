import { Request, Response } from "express";
import { updatePostService } from "../../services/postsServices/updatePostService";


const updatePostController = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const {title, content, status} = req.body;
  const file = req.file;

  const response = await updatePostService(id, title, content, file, status);
  res.status(response.statusCode).json(response.body);
}

export { updatePostController }