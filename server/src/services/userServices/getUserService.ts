import { HttpResponse } from "../../models/http-response-models"
import { getUserRepo } from "../../repositories/userRepositories/getUserRepo";
import { badRequest, internalServerError, notFound, ok } from "../../utils/http-helper";


const getUserService = async (id: number): Promise<HttpResponse> => {

  try {
    let response: HttpResponse | null = null;
    if (!id) {
      response = await badRequest("ID não foi enviado corretamente no parâmetro da requisição");
      return response;
    }

    const user = await getUserRepo(id);
    if (!user) {
      response = await notFound("Usuário não encontrado.");
      return response;
    }

    response = await ok(user);
    return response;
  } catch (error) {
    console.error(error);
    return internalServerError("Aconteceu um erro no servidor");
  }
}

export { getUserService };