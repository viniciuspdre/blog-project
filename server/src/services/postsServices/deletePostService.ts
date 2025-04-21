import { HttpResponse } from "../../models/http-response-models";
import { deletePostRepo } from "../../repositories/postsRepositories/deletePostRepo";
import { badRequest, internalServerError, ok } from "../../utils/http-helper";


const deletePostService = async (id: number) => {
  let response: HttpResponse | null = null;
  if (isNaN(id) || id < 0) {
    response = await badRequest();
    return response;
  }

  try {
    const deletedUser = deletePostRepo(id);

    response = await ok(deletedUser)
    return response;
  } catch (error) {
    console.error("There's an error in service :", error);
    response = await internalServerError("There's an error in our server.");
    return response;
  }
}

export { deletePostService };