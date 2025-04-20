import { HttpResponse } from "../../models/http-response-models";
import { deleteUserRepo } from "../../repositories/userRepositories/deleteUserRepo";
import { badRequest, internalServerError, ok } from "../../utils/http-helper";

const deleteUserService = async (id: number): Promise<HttpResponse> => {

  let response: HttpResponse | null = null;
  if (isNaN(id) || id < 0) {
    response = await badRequest();
    return response;
  }

  try {
    const deletedUser = deleteUserRepo(id);

    response = await ok(deletedUser)
    return response;
  } catch (error) {
    console.error("There's an error in service :", error);
    response = await internalServerError("There's an error in our server.");
    return response;
  }
} 

export { deleteUserService };