import { HttpResponse } from "../../models/http-response-models"
import { getPostByIdRepo } from "../../repositories/postsRepositories/getPostByIdRepo"
import { badRequest, internalServerError, noContent, ok } from "../../utils/http-helper";


const getPostByIdService = async (id: number): Promise<HttpResponse> => {
  const post = await getPostByIdRepo(id);
  let response: HttpResponse | null = null

  try {
    if (!post) {
      response = await noContent();
      return response;
    }

    if (isNaN(id) || id < 0) {
      response = await badRequest("O id passado foi inválido");
      return response;
    }

    response = await ok(post);
    return response;
  } catch (error) {
    console.error("There's an error in service: ",error);
    response = await internalServerError();
    return response;
  }
}

export { getPostByIdService }