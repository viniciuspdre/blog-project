import { uploadToS3 } from "../../config/aws-sdk-config";
import { HttpResponse } from "../../models/http-response-models";
import { UpdatePostData } from "../../models/UpdatePostData";
import { updatePostRepo } from "../../repositories/postsRepositories/updatePostRepo";
import { badRequest, internalServerError, ok } from "../../utils/http-helper";


const updatePostService = async (id: number, title?: string, content?: string, coverPicture?: Express.Multer.File | undefined, status?: string): Promise<HttpResponse> => {
  let response: HttpResponse | null = null;

  try {

    if (isNaN(id) || id < 0) {
      response = await badRequest("Please, send an information to update the post or verify the post ID.");
      return response;
    }

    let data: UpdatePostData = {};

    if (title?.length !== 0) {
      data.title = title;
      data.slug = title?.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
    }
    if (content?.length !== 0) data.content = content;
    if (status?.toLowerCase() === "published") {
      data.status = status;
    }

    if (coverPicture) {
      const coverPictureUrl = await uploadToS3(coverPicture, 'posts/cover-images')
      data.cover_image_url = coverPictureUrl;
    }
    
    const updatedUser = await updatePostRepo(id, data);
    response = await ok(updatedUser);
    return response;

  } catch (error) {
    console.error("Erro in service", error);
    response = await internalServerError("There's an issue in our server, please try again.");
    return response;
  }
}

export { updatePostService }