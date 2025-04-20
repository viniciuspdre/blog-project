import { HttpResponse } from "../../models/http-response-models";
import { getAllPlayersRepo } from "../../repositories/postsRepositories/getAllPostsRepo";
import { internalServerError, noContent, ok } from "../../utils/http-helper";

const getAllPostsService = async(): Promise<HttpResponse> => {
  let response: HttpResponse | null = null;
  try {

    const posts = await getAllPlayersRepo();
    
    if (!posts) {
      response = await noContent();
      return response
    }

    response = await ok(posts);
    return response;

  } catch (error) {
    console.error("There's an error in service");
    response = await internalServerError("There's an error in server");
    return response;
  }
}

export { getAllPostsService };