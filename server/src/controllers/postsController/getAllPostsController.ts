import { Request, Response } from "express";
import { getAllPostsService } from "../../services/postsServices/getAllPostsService";


const getAllPostsController = async (req: Request, res: Response) => {
  const response = await getAllPostsService();

  res.status(response.statusCode).json(response.body);
}

export { getAllPostsController };