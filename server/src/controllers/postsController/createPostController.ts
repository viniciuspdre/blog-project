import { Request, Response } from "express";
import { AuthenticatedRequest } from "../../models/AuthenticatedRequest";
import { createPostService } from "../../services/postsServices/createPostService";


const createPostController = async (req: AuthenticatedRequest, res: Response) => {
  const {title, excerpt, content, categoryId, tags} = req.body;
  const coverImageFile = req.file;
  const id = req.user?.id;

  const postDataToService = {
    title,
    excerpt,
    content,
    coverImageFile,
    authorId: id!,
    categoryId: parseInt(categoryId),
    tags: typeof tags === 'string' ? tags.split(',').map(tag => tag.trim()) : tags
  };

  let response = await createPostService(postDataToService);
  res.status(response.statusCode).json(response.body);
} 

export { createPostController }