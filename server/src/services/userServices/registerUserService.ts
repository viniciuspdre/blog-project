import { hashPassword, comparePassword } from "../../utils/hash-password-helper"
import { registerUserRepo } from "../../repositories/userRepositories/registerUserRepo";
import { uploadToS3 } from "../../config/aws-sdk-config";
import { badRequest, created } from "../../utils/http-helper";
import { HttpResponse } from "../../models/http-response-models";


const registerUserService = async (name: string, email: string, password_hash: string, profile_picture_url: Express.Multer.File | undefined): Promise<HttpResponse> => {

  let response: HttpResponse | null = null;

  if (!name || !email || !password_hash) { // verifica se falta algum conteúdo obrigatório
    response = await badRequest();
    return response;
  }

  const hashedPassword = await hashPassword(password_hash);

  let profilePictureUrl: string | null = null;
  if (profile_picture_url) {
    profilePictureUrl = await uploadToS3(profile_picture_url);
  }

  const newUser = await registerUserRepo(name, email, hashedPassword, profilePictureUrl);
  response = await created(newUser)
  return response;
}

export { registerUserService }